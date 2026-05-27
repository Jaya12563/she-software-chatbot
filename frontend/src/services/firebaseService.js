import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCzr1tki2xsCxkzrhfOYHuTV2XzaPs6oM",
  authDomain: "she-software-chatbot.firebaseapp.com",
  projectId: "she-software-chatbot",
  storageBucket: "she-software-chatbot.firebasestorage.app",
  messagingSenderId: "192404913675",
  appId: "1:192404913675:web:5e63ae6fb0a5371f6e510e"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Save chat session
export const saveChatSession = async (sessionId, messages) => {
  try {
    await addDoc(collection(db, "chats"), {
      sessionId,
      messages,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving chat:", error);
  }
};

// Save lead
export const saveLead = async (leadData) => {
  try {
    await addDoc(collection(db, "leads"), {
      ...leadData,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving lead:", error);
  }
};

// Get all chats
export const getAllChats = async () => {
  const snapshot = await getDocs(collection(db, "chats"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get all leads
export const getAllLeads = async () => {
  const snapshot = await getDocs(collection(db, "leads"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Save FAQ
export const saveFAQ = async (question, answer) => {
  try {
    await addDoc(collection(db, "faqs"), { question, answer, timestamp: serverTimestamp() });
  } catch (error) {
    console.error("Error saving FAQ:", error);
  }
};

// Get all FAQs
export const getAllFAQs = async () => {
  const snapshot = await getDocs(collection(db, "faqs"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};