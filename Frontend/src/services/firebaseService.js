// NextGen Education - Firebase Service Layer
// Orchestrates Firestore reads and writes with graceful fallbacks to the rich local dataset
// when offline or before initial cloud seeding.

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";

// Local dataset fallbacks
import { componentsData } from "../data/componentsData";
import { experimentsData } from "../data/experimentsData";
import { projectsData } from "../data/projectsData";
import { videosData } from "../data/videosData";
import { quizzesData } from "../data/quizzesData";
import { learningTopics } from "../data/learningData";
import { resourcesData } from "../data/resourcesData";
import { expertsData } from "../data/expertsData";

// Generic fetcher with fallback
async function fetchCollectionWithFallback(collectionName, fallbackData) {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const items = [];
      snapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      return items;
    }
  } catch (err) {
    console.warn(`[Firestore] Notice: Using local data for "${collectionName}":`, err.message);
  }
  return fallbackData;
}

// 1. Components
export async function getComponents() {
  return await fetchCollectionWithFallback("components", componentsData);
}

export async function getComponentById(id) {
  try {
    const docRef = doc(db, "components", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (err) {
    console.warn(`[Firestore] Component lookup fallback for ${id}`);
  }
  return componentsData.find(c => c.id === id) || null;
}

// 2. Experiments
export async function getExperiments() {
  return await fetchCollectionWithFallback("experiments", experimentsData);
}

export async function getExperimentById(id) {
  try {
    const docRef = doc(db, "experiments", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (err) {
    console.warn(`[Firestore] Experiment lookup fallback for ${id}`);
  }
  return experimentsData.find(e => e.id === id) || null;
}

// 3. Projects
export async function getProjects() {
  return await fetchCollectionWithFallback("projects", projectsData);
}

export async function getProjectById(id) {
  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (err) {
    console.warn(`[Firestore] Project lookup fallback for ${id}`);
  }
  return projectsData.find(p => p.id === id) || null;
}

// 4. Videos
export async function getVideos() {
  return await fetchCollectionWithFallback("videos", videosData);
}

export async function getVideoById(id) {
  try {
    const docRef = doc(db, "videos", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (err) {
    console.warn(`[Firestore] Video lookup fallback for ${id}`);
  }
  return videosData.find(v => v.id === id) || null;
}

// 5. Quizzes
export async function getQuizzes() {
  return await fetchCollectionWithFallback("quizzes", quizzesData);
}

export async function getQuizById(id) {
  try {
    const docRef = doc(db, "quizzes", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (err) {
    console.warn(`[Firestore] Quiz lookup fallback for ${id}`);
  }
  return quizzesData.find(q => q.id === id) || null;
}

// 6. Lessons / Learning Topics
export async function getLearningTopics() {
  return await fetchCollectionWithFallback("lessons", learningTopics);
}

export async function getLearningTopicById(id) {
  try {
    const docRef = doc(db, "lessons", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (err) {
    console.warn(`[Firestore] Lesson lookup fallback for ${id}`);
  }
  return learningTopics.find(l => l.id === id) || null;
}

// 7. Resources
export async function getResources() {
  return await fetchCollectionWithFallback("resources", resourcesData);
}

// 8. Experts
export async function getExperts() {
  return await fetchCollectionWithFallback("experts", expertsData);
}

// ==============================================================
// Admin CRUD Operations
// ==============================================================

export async function createDocument(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return { id, ...data };
}

export async function updateDocument(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
  return { id, ...data };
}

export async function deleteDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
  return id;
}

// One-click Firestore Data Seeder (for examiner demonstrations)
export async function seedFirestoreDatabase(onProgress) {
  // Ensure the admin session is authenticated in Firebase Auth so Firestore security rules permit writes
  if (!auth.currentUser || auth.currentUser.email !== "admin@nextgen.edu") {
    if (onProgress) onProgress("Authenticating administrator with Firebase...");
    try {
      await signInWithEmailAndPassword(auth, "admin@nextgen.edu", "Admin@NextGen2026!");
    } catch (authErr) {
      console.warn("[Firestore Seeder] Admin auto-auth notice:", authErr.message);
    }
  }

  const seeds = [
    { name: "components", data: componentsData },
    { name: "experiments", data: experimentsData },
    { name: "projects", data: projectsData },
    { name: "videos", data: videosData },
    { name: "quizzes", data: quizzesData },
    { name: "lessons", data: learningTopics },
    { name: "resources", data: resourcesData },
    { name: "experts", data: expertsData }
  ];

  let totalSeeded = 0;
  for (const group of seeds) {
    if (onProgress) onProgress(`Seeding ${group.name}...`);
    for (const item of group.data) {
      try {
        const docRef = doc(db, group.name, item.id);
        await setDoc(docRef, {
          ...item,
          seededAt: serverTimestamp()
        }, { merge: true });
        totalSeeded++;
      } catch (err) {
        console.error(`Error seeding ${group.name}/${item.id}:`, err);
        if (err.code === "permission-denied" || err.message?.includes("insufficient permissions")) {
          throw new Error(`Firestore permission denied: Seeding requires admin authentication (admin@nextgen.edu). Original error: ${err.message}`, { cause: err });
        }
      }
    }
  }
  if (onProgress) onProgress(`Complete! Successfully synced ${totalSeeded} documents.`);
  return totalSeeded;
}
