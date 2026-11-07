// NextGen Education - Student Progress & Bookmarks Context
// Tracks real learning progress across experiments, projects, lessons, videos, and quizzes.
// Syncs to Firestore progress collection with automatic local storage backup.

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const ProgressContext = createContext();

export function useProgress() {
  return useContext(ProgressContext);
}

export function ProgressProvider({ children }) {
  const { currentUser, isFirebaseUser } = useAuth();

  const [completedExperiments, setCompletedExperiments] = useState(["led-blink", "ohms-law"]);
  const [completedProjects, setCompletedProjects] = useState(["auto-street-light"]);
  const [completedLessons, setCompletedLessons] = useState(["learn-ohms-kirchhoff"]);
  const [watchedVideos, setWatchedVideos] = useState(["vid-resistor-color-code", "vid-ohms-law"]);
  const [quizResults, setQuizResults] = useState([
    { quizId: "quiz-fundamentals", title: "Electronics Fundamentals & Ohm's Law", score: 5, total: 5, percentage: 100, date: "2026-09-28" }
  ]);
  const [bookmarks, setBookmarks] = useState([
    { id: "esp32-wroom", type: "component", title: "ESP32-WROOM-32 Wi-Fi & Bluetooth MCU", category: "BOARDS", link: "/components/esp32-wroom" },
    { id: "smart-dustbin", type: "project", title: "Touchless Smart Dustbin with Servo Lid", category: "ROBOTICS", link: "/projects/smart-dustbin" }
  ]);
  const [recentActivity, setRecentActivity] = useState([
    { type: "quiz", title: "Scored 100% on Electronics Fundamentals Quiz", timestamp: "Yesterday", link: "/quizzes/quiz-fundamentals" },
    { type: "experiment", title: "Completed Ohm's Law Verification Experiment", timestamp: "2 days ago", link: "/experiments/ohms-law" }
  ]);

  // Load progress from local cache and Firestore on user change
  useEffect(() => {
    if (!currentUser?.uid) return;

    // 1. Instant recovery from local cache
    const storageKey = `nextgen_progress_${currentUser.uid}`;
    const localSaved = localStorage.getItem(storageKey);
    if (localSaved) {
      try {
        const parsed = JSON.parse(localSaved);
        if (parsed.completedExperiments) setCompletedExperiments(parsed.completedExperiments);
        if (parsed.completedProjects) setCompletedProjects(parsed.completedProjects);
        if (parsed.completedLessons) setCompletedLessons(parsed.completedLessons);
        if (parsed.watchedVideos) setWatchedVideos(parsed.watchedVideos);
        if (parsed.quizResults) setQuizResults(parsed.quizResults);
        if (parsed.bookmarks) setBookmarks(parsed.bookmarks);
        if (parsed.recentActivity) setRecentActivity(parsed.recentActivity);
      } catch (e) {
        console.warn("[Progress] Failed to parse local progress cache:", e.message);
      }
    }

    // 2. Fetch authenticated cloud progress if user has a verified Firebase session
    if (isFirebaseUser && auth.currentUser && auth.currentUser.uid === currentUser.uid) {
      let isMounted = true;
      async function loadCloudProgress() {
        try {
          const docRef = doc(db, "progress", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && isMounted) {
            const cloudData = docSnap.data();
            if (cloudData.completedExperiments) setCompletedExperiments(cloudData.completedExperiments);
            if (cloudData.completedProjects) setCompletedProjects(cloudData.completedProjects);
            if (cloudData.completedLessons) setCompletedLessons(cloudData.completedLessons);
            if (cloudData.watchedVideos) setWatchedVideos(cloudData.watchedVideos);
            if (cloudData.quizResults) setQuizResults(cloudData.quizResults);
            if (cloudData.bookmarks) setBookmarks(cloudData.bookmarks);
            if (cloudData.recentActivity) setRecentActivity(cloudData.recentActivity);
          }
        } catch (err) {
          console.warn("[Progress] Firestore read fallback to local cache:", err.message);
        }
      }
      loadCloudProgress();
      return () => {
        isMounted = false;
      };
    }
  }, [currentUser, isFirebaseUser]);

  // Sync state to local storage and Firestore
  const persistState = async (newState) => {
    if (!currentUser?.uid) return;
    const storageKey = `nextgen_progress_${currentUser.uid}`;
    try {
      localStorage.setItem(storageKey, JSON.stringify(newState));
    } catch (storageErr) {
      console.warn("[Progress] LocalStorage write error:", storageErr.message);
    }

    // Only attempt Firestore write if genuine authenticated Firebase session
    if (isFirebaseUser && auth.currentUser && auth.currentUser.uid === currentUser.uid) {
      try {
        const docRef = doc(db, "progress", currentUser.uid);
        await setDoc(
          docRef,
          {
            ...newState,
            userId: currentUser.uid,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (e) {
        console.warn("[Progress] Firestore write error (saved to local cache):", e.message);
      }
    }
  };

  // Log activity
  const addActivity = (type, title, link) => {
    const newEntry = {
      type,
      title,
      timestamp: "Just now",
      link: link || "#"
    };
    const updated = [newEntry, ...recentActivity.slice(0, 15)];
    setRecentActivity(updated);
    return updated;
  };

  // Actions
  const toggleBookmark = (item) => {
    const exists = bookmarks.some(b => b.id === item.id);
    let updated;
    if (exists) {
      updated = bookmarks.filter(b => b.id !== item.id);
    } else {
      updated = [...bookmarks, item];
      addActivity("bookmark", `Bookmarked: ${item.title}`, item.link);
    }
    setBookmarks(updated);
    persistState({
      completedExperiments,
      completedProjects,
      completedLessons,
      watchedVideos,
      quizResults,
      bookmarks: updated,
      recentActivity
    });
    return !exists;
  };

  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  const markExperimentComplete = (id, title) => {
    if (!completedExperiments.includes(id)) {
      const updatedExp = [...completedExperiments, id];
      setCompletedExperiments(updatedExp);
      const updatedAct = addActivity("experiment", `Completed Experiment: ${title}`, `/experiments/${id}`);
      persistState({
        completedExperiments: updatedExp,
        completedProjects,
        completedLessons,
        watchedVideos,
        quizResults,
        bookmarks,
        recentActivity: updatedAct
      });
    }
  };

  const markProjectComplete = (id, title) => {
    if (!completedProjects.includes(id)) {
      const updatedProj = [...completedProjects, id];
      setCompletedProjects(updatedProj);
      const updatedAct = addActivity("project", `Finished Capstone Project: ${title}`, `/projects/${id}`);
      persistState({
        completedExperiments,
        completedProjects: updatedProj,
        completedLessons,
        watchedVideos,
        quizResults,
        bookmarks,
        recentActivity: updatedAct
      });
    }
  };

  const markLessonComplete = (id, title) => {
    if (!completedLessons.includes(id)) {
      const updatedLessons = [...completedLessons, id];
      setCompletedLessons(updatedLessons);
      const updatedAct = addActivity("lesson", `Mastered Theory Topic: ${title}`, `/learn/${id}`);
      persistState({
        completedExperiments,
        completedProjects,
        completedLessons: updatedLessons,
        watchedVideos,
        quizResults,
        bookmarks,
        recentActivity: updatedAct
      });
    }
  };

  const markVideoWatched = (id, title) => {
    if (!watchedVideos.includes(id)) {
      const updatedVids = [...watchedVideos, id];
      setWatchedVideos(updatedVids);
      const updatedAct = addActivity("video", `Watched Engineering Video: ${title}`, `/videos/${id}`);
      persistState({
        completedExperiments,
        completedProjects,
        completedLessons,
        watchedVideos: updatedVids,
        quizResults,
        bookmarks,
        recentActivity: updatedAct
      });
    }
  };

  const saveQuizResult = (quizId, score, total, title) => {
    const percentage = Math.round((score / total) * 100);
    const newResult = {
      quizId,
      title: title || quizId,
      score,
      total,
      percentage,
      date: new Date().toISOString().split("T")[0]
    };

    // Replace old attempt or append
    const filtered = quizResults.filter(q => q.quizId !== quizId);
    const updatedQuiz = [newResult, ...filtered];
    setQuizResults(updatedQuiz);
    const updatedAct = addActivity("quiz", `Scored ${percentage}% on ${title}`, `/quizzes/${quizId}`);

    persistState({
      completedExperiments,
      completedProjects,
      completedLessons,
      watchedVideos,
      quizResults: updatedQuiz,
      bookmarks,
      recentActivity: updatedAct
    });
  };

  // Metrics & Knowledge Stats Calculation
  const totalXP = (completedExperiments.length * 150) +
    (completedProjects.length * 300) +
    (completedLessons.length * 100) +
    (watchedVideos.length * 50) +
    quizResults.reduce((acc, q) => acc + (q.score * 40), 0);

  const knowledgeLevel = Math.floor(totalXP / 500) + 1;

  const value = {
    completedExperiments,
    completedProjects,
    completedLessons,
    watchedVideos,
    quizResults,
    bookmarks,
    recentActivity,
    totalXP,
    knowledgeLevel,
    isBookmarked,
    toggleBookmark,
    markExperimentComplete,
    markProjectComplete,
    markLessonComplete,
    markVideoWatched,
    saveQuizResult
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
