import React from "react";

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: "10px",
      padding: "0 10px",
    }}>
      {!isUser && (
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "14px",
          marginRight: "8px",
          flexShrink: 0,
        }}>
          S
        </div>
      )}
      <div style={{
        maxWidth: "75%",
        padding: "10px 14px",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        background: isUser
          ? "linear-gradient(135deg, #667eea, #764ba2)"
          : "white",
        color: isUser ? "white" : "#333",
        fontSize: "14px",
        lineHeight: "1.5",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        whiteSpace: "pre-wrap",
      }}>
        {message.content}
        <div style={{
          fontSize: "10px",
          marginTop: "4px",
          opacity: 0.6,
          textAlign: "right",
        }}>
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;