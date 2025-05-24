import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = window.db;

export async function saveProgress(userId, progressData) {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { progress: progressData }, { merge: true });
}

export async function loadProgress(userId) {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? docSnap.data().progress : null;
}
