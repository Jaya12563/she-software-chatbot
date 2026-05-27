import React from "react";

const QuickSuggestions = ({ suggestions, onSelect }) => {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      padding: "8px 10px",
    }}>
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s)}
          style={{
            background: "white",
            border: "1.5px solid #667eea",
            color: "#667eea",
            borderRadius: "20px",
            padding: "6px 14px",
            fontSize: "12px",
            cursor: "pointer",
            fontWeight: "500",
          }}
          onMouseEnter={e => {
            e.target.style.background = "#667eea";
            e.target.style.color = "white";
          }}
          onMouseLeave={e => {
            e.target.style.background = "white";
            e.target.style.color = "#667eea";
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
};

export default QuickSuggestions;