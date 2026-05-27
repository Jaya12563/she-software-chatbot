import React, { useState } from "react";
import { auth } from "../../services/firebaseService";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import ChatLogs from "./ChatLogs";
import FAQManager from "./FAQManager";

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("logs");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (!user) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          width: "360px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔐</div>
            <h2 style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "800",
              fontSize: "22px",
            }}>
              Admin Login
            </h2>
            <p style={{ color: "#888", fontSize: "13px", marginTop: "6px" }}>
              She Software Solutions
            </p>
          </div>

          {error && (
            <div style={{
              background: "#fff0f0",
              border: "1px solid #ffcccc",
              color: "#cc0000",
              padding: "10px 14px",
              borderRadius: "10px",
              fontSize: "13px",
              marginBottom: "16px",
            }}>
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1.5px solid #e0e0e0",
              fontSize: "14px",
              marginBottom: "12px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1.5px solid #e0e0e0",
              fontSize: "14px",
              marginBottom: "20px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: "16px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ color: "white", fontWeight: "800", fontSize: "18px" }}>
          🤖 She Software — Admin Panel
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "rgba(255,255,255,0.2)",
            color: "white",
            border: "none",
            padding: "8px 18px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: "4px",
        padding: "20px 30px 0",
      }}>
        {["logs", "faqs", "leads"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 24px",
              borderRadius: "10px 10px 0 0",
              border: "none",
              background: activeTab === tab
                ? "white"
                : "rgba(102,126,234,0.1)",
              color: activeTab === tab ? "#667eea" : "#888",
              fontWeight: activeTab === tab ? "700" : "500",
              cursor: "pointer",
              fontSize: "14px",
              textTransform: "capitalize",
            }}
          >
            {tab === "logs" ? "💬 Chat Logs" : tab === "faqs" ? "❓ FAQ Manager" : "👥 Leads"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{
        background: "white",
        margin: "0 30px 30px",
        borderRadius: "0 10px 10px 10px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        minHeight: "500px",
      }}>
        {activeTab === "logs" && <ChatLogs />}
        {activeTab === "faqs" && <FAQManager />}
        {activeTab === "leads" && <LeadsView />}
      </div>
    </div>
  );
};

// Leads View Component
const LeadsView = () => {
  const [leads, setLeads] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchLeads = async () => {
      const { getAllLeads } = await import("../../services/firebaseService");
      const data = await getAllLeads();
      setLeads(data);
      setLoading(false);
    };
    fetchLeads();
  }, []);

  if (loading) return <div style={{ color: "#888", padding: "20px" }}>Loading leads...</div>;
  if (leads.length === 0) return <div style={{ color: "#888", padding: "20px" }}>No leads collected yet.</div>;

  return (
    <div>
      <h3 style={{ marginBottom: "20px", color: "#333" }}>👥 Collected Leads ({leads.length})</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {leads.map((lead, i) => (
          <div key={i} style={{
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "16px",
            background: "#f9f9f9",
          }}>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <span><strong>Name:</strong> {lead.name}</span>
              <span><strong>Email:</strong> {lead.email}</span>
              <span><strong>Phone:</strong> {lead.phone}</span>
              <span><strong>Requirement:</strong> {lead.requirement}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;