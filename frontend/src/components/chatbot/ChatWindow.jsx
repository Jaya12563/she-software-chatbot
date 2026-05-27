import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import QuickSuggestions from "./QuickSuggestions";
import ChatInput from "./ChatInput";
import { sendMessageToAI } from "../../services/aiService";
import { detectIntent, getQuickReplies } from "../../ai/intentDetector";
import { saveChatSession, saveLead } from "../../services/firebaseService";
import { v4 as uuidv4 } from "uuid";

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "About Company", "Our Services", "Internships", "Contact Us"
  ]);
  const [leadStep, setLeadStep] = useState(null);
  const [leadData, setLeadData] = useState({});
  const [sessionId] = useState(uuidv4());
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "👋 Hello! Welcome to She Software Solutions!\n\nI'm your AI assistant. I can help you with:\n• Company information\n• Our services\n• Internship opportunities\n• Contact details\n\nHow can I help you today?",
      }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    if (leadStep) {
      await handleLeadFlow(text, updatedMessages);
      return;
    }

    const intent = detectIntent(text);

    if (intent === "collect_lead" || text.toLowerCase().includes("apply")) {
      setLeadStep("name");
      setMessages([...updatedMessages, {
        role: "assistant",
        content: "Great! I'd love to connect you with our team. 😊\n\nCould I get your name first?",
      }]);
      setIsTyping(false);
      setSuggestions([]);
      return;
    }

    try {
      const history = updatedMessages.slice(-6);
      const reply = await sendMessageToAI(text, history);
      const finalMessages = [...updatedMessages, { role: "assistant", content: reply }];
      setMessages(finalMessages);
      setSuggestions(getQuickReplies(intent));
      await saveChatSession(sessionId, finalMessages);
    } catch (error) {
      setMessages([...updatedMessages, {
        role: "assistant",
        content: "Sorry, I'm having trouble right now. Please try again!",
      }]);
    }

    setIsTyping(false);
  };

  const handleLeadFlow = async (text, updatedMessages) => {
    const newLeadData = { ...leadData };
    let botReply = "";
    let nextStep = leadStep;

    if (leadStep === "name") {
      newLeadData.name = text;
      botReply = `Nice to meet you, ${text}! 😊\n\nWhat's your email address?`;
      nextStep = "email";
    } else if (leadStep === "email") {
      newLeadData.email = text;
      botReply = `Got it! 📧\n\nWhat's your phone number?`;
      nextStep = "phone";
    } else if (leadStep === "phone") {
      newLeadData.phone = text;
      botReply = `Perfect! 📞\n\nWhat are you looking for?\n(e.g. Frontend Internship, Backend Internship, AI/ML)`;
      nextStep = "requirement";
    } else if (leadStep === "requirement") {
      newLeadData.requirement = text;
      botReply = `Thank you ${newLeadData.name}! 🎉\n\nWe've received your details:\n✅ Name: ${newLeadData.name}\n✅ Email: ${newLeadData.email}\n✅ Phone: ${newLeadData.phone}\n✅ Requirement: ${newLeadData.requirement}\n\nOur team will contact you within 24 hours!`;
      nextStep = null;
      await saveLead(newLeadData);
      setSuggestions(["About Company", "Our Services", "Internships", "Contact Us"]);
    }

    setLeadData(newLeadData);
    setLeadStep(nextStep);
    setMessages([...updatedMessages, { role: "assistant", content: botReply }]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(102,126,234,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: "fixed",
          bottom: "100px",
          right: "24px",
          width: "370px",
          height: "560px",
          background: "#f5f7fb",
          borderRadius: "20px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          zIndex: 999,
          overflow: "hidden",
        }}>

          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <div style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}>
              🤖
            </div>
            <div>
              <div style={{ color: "white", fontWeight: "700", fontSize: "15px" }}>
                She Software Assistant
              </div>
              <div style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}>
                <div style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#4ade80"
                }} />
                Online • Always here to help
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px 0",
          }}>
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Quick Suggestions */}
          {suggestions.length > 0 && !leadStep && (
            <QuickSuggestions
              suggestions={suggestions}
              onSelect={handleSend}
            />
          )}

          {/* Input */}
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
      )}
    </>
  );
};

export default ChatWindow;