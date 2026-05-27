const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("API Key exists:", !!process.env.ANTHROPIC_API_KEY);
console.log("API Key preview:", process.env.ANTHROPIC_API_KEY?.substring(0, 15));

const COMPANY_CONTEXT = `
You are a smart assistant for She Software Solutions.
Only answer questions related to the company.

Company Info:
- Name: She Software Solutions
- About: A software company focused on empowering women in tech
- Services: Web Development, App Development, AI Solutions, UI/UX Design, Digital Marketing
- Internship Roles: Frontend Developer, Backend Developer, AI/ML Engineer, UI/UX Designer, Digital Marketing
- Internship Duration: 1 to 3 months
- Technologies: React, Node.js, Python, Firebase, Flutter, AI/ML
- Application Process: Apply via website → Resume screening → Interview → Selection
- Hiring Process: Online application → Technical round → HR round → Offer letter
- Contact Email: contact@shesoftware.com
- Contact Phone: +91-9876543210
- Location: India

Rules:
- Be friendly, concise and helpful
- If asked something outside company info, politely say you can only help with company related queries
- Always suggest next steps to the user
`;

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  console.log("Request received:", message);

  try {
    const messages = [];

    if (history && history.length > 0) {
      history.forEach((msg) => {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      });
    }

    messages.push({
      role: "user",
      content: message,
    });

    console.log("Calling Anthropic API...");

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        system: COMPANY_CONTEXT,
        messages: messages,
      },
      {
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Anthropic responded successfully");
    const reply = response.data.content[0].text;
    res.json({ reply });

  } catch (error) {
    console.error("=== ERROR DETAILS ===");
    console.error("Status:", error.response?.status);
    console.error("Error data:", JSON.stringify(error.response?.data, null, 2));
    console.error("Message:", error.message);
    res.status(500).json({ reply: "Sorry, I am having trouble responding right now." });
  }
});

app.get("/", (req, res) => {
  res.send("She Software Chatbot Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});