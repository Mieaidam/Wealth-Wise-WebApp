// auth.js
import { auth, db } from './firebase.js';
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js";

// 🔐 Google Auth Provider
const provider = new GoogleAuthProvider();

// 🔄 Google Sign-In & Save Progress
export async function googleSignIn(level = 'Pinjaman') {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem('username', user.displayName || user.email);

    const uid = user.uid;
    const progressRef = ref(db, 'users/' + uid + '/progress');
    const snapshot = await get(progressRef);

    let levelCompleted = level;
    let balance = 0;

    if (snapshot.exists()) {
      // Use existing progress
      const progress = snapshot.val();
      levelCompleted = progress.levelCompleted || level;
      balance = progress.balance || 0;
    } else {
      // Initialize progress if not exists
      await set(progressRef, {
        levelCompleted: level,
        balance: 0
      });
    }

    localStorage.setItem('levelCompleted', levelCompleted);
    localStorage.setItem('balance', balance);

  } catch (error) {
    console.error("Google sign-in failed:", error);
    alert("Google sign-in gagal: " + error.message);
  }
}
