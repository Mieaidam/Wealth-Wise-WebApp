// firebase.js
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-analytics.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAmm1WHSmprAWkf5KiWA6EH6EzRUY3M60A",
  authDomain: "wealth-wise-cdff0.firebaseapp.com",
  projectId: "wealth-wise-cdff0",
  storageBucket: "wealth-wise-cdff0.appspot.com",
  messagingSenderId: "236778243947",
  appId: "1:236778243947:web:1c815a671c487509ecae2e",
  databaseURL: "https://wealth-wise-cdff0-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// ✅ Safe init
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Export Firebase services
const auth = getAuth(app);
const db = getDatabase(app);
getAnalytics(app); // Only call once per app, safe here

export { app, auth, db };
