import React, { useState, useEffect } from "react";
import { getAllFAQs, saveFAQ } from "../../services/firebaseService";

const FAQManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchFAQs = async () => {
    const data = await getAllFAQs();
    setFaqs(data);
    setLoading(false);
  };

  useEffect(() => { fetchFAQs(); }, []);

  const handleAdd = async () => {
    if (!question.trim() || !answer.trim()) return;
    setSaving(true);
    await saveFAQ(question.trim(), answer.trim());
    setQuestion("");
    setAnswer("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    await fetchFAQs();
    setSaving(false);
  };

  return (
    <div>
      <h3 style={{ marginBottom: "20px", color: "#333" }}>❓ FAQ Manager</h3>

      {/* Add FAQ Form */}
      <div style={{
        background: "#f9f9f9",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "24px",
        border: "1px solid #eee",
      }}>
        <h4 style={{ marginBottom: "14px", color: "#555", fontSize: "14px" }}>
          Add New FAQ
        </h4>
        <input
          type="text"
          placeholder="Question (e.g. What services do you offer?)"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1.5px solid #e0e0e0",
            fontSize: "13px",
            marginBottom: "10px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <textarea
          placeholder="Answer..."
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          rows={3}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1.5px solid #e0e0e0",
            fontSize: "13px",
            marginBottom: "12px",
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
        {success && (
          <div style={{
            color: "green",
            fontSize: "13px",
            marginBottom: "10px",
            background: "#f0fff0",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccffcc",
          }}>
            ✅ FAQ added successfully!
          </div>
        )}
        <button
          onClick={handleAdd}
          disabled={saving}
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            border: "none",
            padding: "10px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {saving ? "Adding..." : "Add FAQ"}
        </button>
      </div>

      {/* FAQ List */}
      {loading ? (
        <div style={{ color: "#888" }}>Loading FAQs...</div>
      ) : faqs.length === 0 ? (
        <div style={{ color: "#888" }}>No FAQs added yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              border: "1px solid #eee",
              borderRadius: "12px",
              padding: "16px",
              background: "#fafafa",
            }}>
              <div style={{
                fontWeight: "700",
                color: "#667eea",
                marginBottom: "6px",
                fontSize: "14px",
              }}>
                Q: {faq.question}
              </div>
              <div style={{ color: "#555", fontSize: "13px", lineHeight: "1.5" }}>
                A: {faq.answer}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQManager;