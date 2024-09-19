// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7TCY9noLHwr_m8PYFBlRCdhJntVMMlqQ",
  authDomain: "netflixgpt-e8ae3.firebaseapp.com",
  projectId: "netflixgpt-e8ae3",
  storageBucket: "netflixgpt-e8ae3.appspot.com",
  messagingSenderId: "171859656852",
  appId: "1:171859656852:web:8452cac91d689c2090b481",
  measurementId: "G-3WGB33HJ7J",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth()
