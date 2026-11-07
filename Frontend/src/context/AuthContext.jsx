// NextGen Education - Authentication Context
// Integrates Firebase Authentication & Firestore User Profiles with role enforcement (student vs admin)
// Includes demo credentials for seamless EDI demonstration.

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user profile from Firestore or local cache
  async function loadUserProfile(user) {
    if (!user) {
      setUserProfile(null);
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserProfile(data);
        localStorage.setItem(`nextgen_user_${user.uid}`, JSON.stringify(data));
      } else {
        // Fallback default profile if document doesn't exist yet
        const defaultProfile = {
          uid: user.uid,
          name: user.displayName || user.email.split("@")[0],
          email: user.email,
          college: "Engineering Institute of Technology",
          department: "Electronics & Communication Engineering",
          year: "4th Year (Final Year)",
          role: user.email === "admin@nextgen.edu" ? "admin" : "student",
          createdAt: new Date().toISOString()
        };
        setUserProfile(defaultProfile);
        try {
          await setDoc(userDocRef, { ...defaultProfile, createdAt: serverTimestamp() });
        } catch (e) {
          console.warn("[Auth] Using local profile fallback:", e.message);
        }
      }
    } catch (err) {
      console.warn("[Auth] Firestore profile read error, falling back to local storage:", err.message);
      const cached = localStorage.getItem(`nextgen_user_${user.uid}`);
      if (cached) {
        setUserProfile(JSON.parse(cached));
      } else {
        setUserProfile({
          uid: user.uid,
          name: user.displayName || user.email.split("@")[0],
          email: user.email,
          college: "Engineering College",
          department: "ECE",
          year: "Final Year",
          role: user.email === "admin@nextgen.edu" ? "admin" : "student"
        });
      }
    }
  }

  // Register new student (role is locked to 'student' by security architecture)
  async function register(email, password, extraData = {}) {
    localStorage.removeItem("nextgen_demo_auth");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const profileData = {
      uid: user.uid,
      name: extraData.name || email.split("@")[0],
      email: user.email,
      college: extraData.college || "Engineering College",
      department: extraData.department || "ECE",
      year: extraData.year || "3rd Year",
      role: "student", // Strictly student role; admin cannot be self-assigned
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, "users", user.uid), {
        ...profileData,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.warn("[Auth] Failed to write profile to Firestore, caching locally:", err.message);
    }

    localStorage.setItem(`nextgen_user_${user.uid}`, JSON.stringify(profileData));
    setUserProfile(profileData);
    return user;
  }

  // Login
  async function login(email, password) {
    localStorage.removeItem("nextgen_demo_auth");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  // Demo Login (One-click instant login for viva & examiners)
  async function loginAsDemo(role = "student") {
    // Authenticate with Firebase Auth so Firestore rules recognize admin / student session
    let firebaseUser = null;
    try {
      if (role === "admin") {
        const cred = await signInWithEmailAndPassword(auth, "admin@nextgen.edu", "Admin@NextGen2026!");
        firebaseUser = cred.user;
      } else {
        const cred = await signInWithEmailAndPassword(auth, "student.alex@nextgen.edu", "Student@NextGen2026!");
        firebaseUser = cred.user;
      }
    } catch (err) {
      console.warn("[Auth] Demo Firebase sign-in notice (activating offline demo session):", err.message);
    }

    if (firebaseUser) {
      localStorage.removeItem("nextgen_demo_auth");
      setCurrentUser(firebaseUser);
      await loadUserProfile(firebaseUser);
      return firebaseUser;
    }

    // Fallback: If Firebase sign-in is unreachable, activate explicit offline demo mode
    const demoUser = {
      uid: role === "admin" ? "demo-admin-uid-999" : "demo-student-uid-101",
      email: role === "admin" ? "admin@nextgen.edu" : "student.alex@nextgen.edu",
      displayName: role === "admin" ? "Prof. Vikram (Admin)" : "Alex Johnson",
      isOfflineDemo: true
    };

    const demoProfile = {
      uid: demoUser.uid,
      name: demoUser.displayName,
      email: demoUser.email,
      college: "Institute of Engineering & Technology",
      department: "Electronics & Communication Engineering (ECE)",
      year: "4th Year (EDI Capstone)",
      role: role === "admin" ? "admin" : "student",
      createdAt: "2026-01-15T10:00:00.000Z",
      isOfflineDemo: true
    };

    setCurrentUser(demoUser);
    setUserProfile(demoProfile);
    localStorage.setItem("nextgen_demo_auth", JSON.stringify({ user: demoUser, profile: demoProfile }));
    return demoUser;
  }

  // Logout
  async function logout() {
    localStorage.removeItem("nextgen_demo_auth");
    setUserProfile(null);
    setCurrentUser(null);
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("[Auth] Sign out notice:", err.message);
    }
  }

  // Password reset
  async function resetPassword(email) {
    return await sendPasswordResetEmail(auth, email);
  }

  // Update profile
  async function updateProfileData(data) {
    if (!currentUser) return;
    const updated = { ...userProfile, ...data, role: userProfile.role }; // Role cannot be modified
    setUserProfile(updated);
    localStorage.setItem(`nextgen_user_${currentUser.uid}`, JSON.stringify(updated));

    if (isFirebaseUser) {
      try {
        await setDoc(doc(db, "users", currentUser.uid), updated, { merge: true });
      } catch (err) {
        console.warn("[Auth] Profile update to Firestore skipped:", err.message);
      }
    }
  }

  useEffect(() => {
    // Session resolution via Firebase Authentication listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Genuine Firebase authentication confirmed
        localStorage.removeItem("nextgen_demo_auth");
        setCurrentUser(user);
        await loadUserProfile(user);
      } else {
        // Firebase has no active session. Check for an explicit offline demo session fallback.
        const savedDemo = localStorage.getItem("nextgen_demo_auth");
        if (savedDemo) {
          try {
            const parsed = JSON.parse(savedDemo);
            if (parsed.user && parsed.profile) {
              setCurrentUser({ ...parsed.user, isOfflineDemo: true });
              setUserProfile({ ...parsed.profile, isOfflineDemo: true });
            } else {
              localStorage.removeItem("nextgen_demo_auth");
              setCurrentUser(null);
              setUserProfile(null);
            }
          } catch {
            localStorage.removeItem("nextgen_demo_auth");
            setCurrentUser(null);
            setUserProfile(null);
          }
        } else {
          setCurrentUser(null);
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAdmin = userProfile?.role === "admin" || currentUser?.email === "admin@nextgen.edu";

  const isFirebaseUser = Boolean(
    !loading &&
    currentUser &&
    auth.currentUser &&
    auth.currentUser.uid === currentUser.uid &&
    !currentUser.isOfflineDemo
  );

  const value = {
    currentUser,
    userProfile,
    isAdmin,
    loading,
    isFirebaseUser,
    login,
    register,
    loginAsDemo,
    logout,
    resetPassword,
    updateProfileData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
