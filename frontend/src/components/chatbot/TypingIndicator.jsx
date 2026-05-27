import React from "react";

const TypingIndicator = () => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      padding: "0 10px",
      marginBottom: "10px",
    }}>
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
      <div style={{
        background: "white",
        borderRadius: "18px 18px 18px 4px",
        padding: "12px 16px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        display: "flex",
        gap: "4px",
        alignItems: "center",
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#667eea",
            animation: "bounce 1.2s infinite",
            animationDelay: `${i * 0.2}s`,
          }} />
        ))}
        <style>{`
          @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-6px); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default TypingIndicator;