import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js";
import { app } from '/Firebase/firebase.js';

const db = getDatabase(app);

export async function saveProgress(userId, progressData) {
  await set(ref(db, 'users/' + userId + '/progress'), progressData);
}

export async function loadProgress(userId) {
  const snapshot = await get(ref(db, 'users/' + userId + '/progress'));
  return snapshot.exists() ? snapshot.val() : null;
}
