import React, { useState, useEffect } from "react";
import { getAllChats } from "../../services/firebaseService";

const ChatLogs = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllChats();
      setChats(data);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return (
    <div style={{ color: "#888", padding: "20px" }}>Loading chat logs...</div>
  );

  if (chats.length === 0) return (
    <div style={{ color: "#888", padding: "20px" }}>No chat sessions yet.</div>
  );

  return (
    <div style={{ display: "flex", gap: "20px", height: "500px" }}>
      {/* Sessions List */}
      <div style={{
        width: "260px",
        overflowY: "auto",
        borderRight: "1px solid #eee",
        paddingRight: "16px",
        flexShrink: 0,
      }}>
        <h3 style={{ marginBottom: "14px", color: "#333", fontSize: "15px" }}>
          💬 Sessions ({chats.length})
        </h3>
        {chats.map((chat, i) => (
          <div
            key={i}
            onClick={() => setSelected(chat)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "8px",
              cursor: "pointer",
              background: selected?.id === chat.id
                ? "linear-gradient(135deg, #667eea22, #764ba222)"
                : "#f9f9f9",
              border: selected?.id === chat.id
                ? "1.5px solid #667eea"
                : "1.5px solid #eee",
            }}
          >
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#333" }}>
              Session {i + 1}
            </div>
            <div style={{ fontSize: "11px", color: "#888", marginTop: "4px" }}>
              {chat.messages?.length || 0} messages
            </div>
            <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>
              {chat.timestamp?.toDate?.()?.toLocaleString() || "N/A"}
            </div>
          </div>
        ))}
      </div>

      {/* Messages View */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {!selected ? (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#bbb",
            fontSize: "14px",
          }}>
            👈 Select a session to view messages
          </div>
        ) : (
          <div>
            <h3 style={{ marginBottom: "16px", color: "#333", fontSize: "15px" }}>
              Messages
            </h3>
            {selected.messages?.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}>
                <div style={{
                  maxWidth: "75%",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #667eea, #764ba2)"
                    : "#f0f0f0",
                  color: msg.role === "user" ? "white" : "#333",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  whiteSpace: "pre-wrap",
                }}>
                  <div style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    marginBottom: "4px",
                    opacity: 0.7,
                    textTransform: "uppercase",
                  }}>
                    {msg.role}
                  </div>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLogs;