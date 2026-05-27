import axios from "axios";

const BACKEND_URL = "http://localhost:8080";

export const sendMessageToAI = async (message, history = []) => {
  try {
    console.log("Sending to backend:", message);
    const response = await axios.post(`${BACKEND_URL}/api/chat`, {
      message,
      history,
    });
    console.log("Backend response:", response.data);
    return response.data.reply;
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Sorry, I am unable to respond right now. Please try again.";
  }
};