const intents = {
  greeting: ["hi", "hello", "hey", "good morning", "good evening", "howdy", "greetings"],
  about: ["about", "who are you", "what is she software", "tell me about", "company"],
  services: ["services", "what do you offer", "what do you do", "offerings", "provide"],
  internship: ["internship", "intern", "training", "roles", "available positions"],
  apply: ["apply", "application", "how to apply", "join", "want to apply"],
  hiring: ["hiring", "recruitment", "selection process", "how to get hired"],
  contact: ["contact", "email", "phone", "reach", "get in touch", "address"],
  collect_lead: ["interested", "sign up", "register", "i want to apply", "connect me"],
  farewell: ["bye", "goodbye", "see you", "thanks", "thank you"],
};

export const detectIntent = (message) => {
  const lower = message.toLowerCase();

  for (const [intent, keywords] of Object.entries(intents)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return intent;
      }
    }
  }

  return "fallback";
};

export const getQuickReplies = (intent) => {
  const replies = {
    greeting: ["About Company", "Our Services", "Internships", "Contact Us"],
    about: ["Our Services", "Internships", "Apply Now", "Contact Us"],
    services: ["Internship Roles", "Apply Now", "Contact Us"],
    internship: ["Apply Now", "Technologies Used", "Contact Us"],
    default: ["About Company", "Our Services", "Internships", "Contact Us"],
  };

  return replies[intent] || replies["default"];
};