import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatWindow from "./components/chatbot/ChatWindow";
import AdminPanel from "./components/admin/AdminPanel";

function Home() {
  return (
    <div>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "16px",
      }}>
        <h1 style={{
          fontSize: "2rem",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "800",
        }}>
          She Software Solutions
        </h1>
        <p style={{ fontSize: "1rem", color: "#888" }}>
          👉 Click the chat button at the bottom right!
        </p>
        <a href="/admin" style={{ color: "#667eea", fontSize: "13px" }}>
          Admin Panel →
        </a>
      </div>
      <ChatWindow />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;