import React, { useState } from "react";

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      padding: "10px 12px",
      borderTop: "1px solid #eee",
      background: "white",
      gap: "8px",
    }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={disabled}
        style={{
          flex: 1,
          border: "1.5px solid #e0e0e0",
          borderRadius: "24px",
          padding: "10px 16px",
          fontSize: "14px",
          outline: "none",
          background: "#f9f9f9",
        }}
        onFocus={e => e.target.style.border = "1.5px solid #667eea"}
        onBlur={e => e.target.style.border = "1.5px solid #e0e0e0"}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: input.trim()
            ? "linear-gradient(135deg, #667eea, #764ba2)"
            : "#e0e0e0",
          border: "none",
          cursor: input.trim() ? "pointer" : "not-allowed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;