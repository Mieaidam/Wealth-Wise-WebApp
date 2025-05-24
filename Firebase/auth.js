// auth.js
import { auth, db } from './firebase.js';
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js";

// 🔐 Google Auth Provider
const provider = new GoogleAuthProvider();

// 🔄 Google Sign-In & Save Progress
export async function googleSignIn(level = 'Pinjaman') {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem('username', user.displayName || user.email);

    // Save progress to Realtime Database
    const uid = user.uid;
    await set(ref(db, 'users/' + uid), {
      username: user.displayName || user.email,
      levelCompleted: level
    });

    localStorage.setItem('levelCompleted', level);
  } catch (error) {
    console.error("Google sign-in failed:", error);
    alert("Google sign-in gagal: " + error.message);
  }
}
