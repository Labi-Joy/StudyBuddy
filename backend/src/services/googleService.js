const axios = require("axios");

exports.chat = async (message) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${process.env.GOOGLE_API_KEY}`,
      {
        prompt: {
          messages: [
            {
              content: message
            }
          ]
        },
        temperature: 0.7,
        candidateCount: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const outputText = response.data?.candidates?.[0]?.content || "No response.";
    return outputText;
  } catch (err) {
    console.warn("Google chat error:", err?.response?.data || err.message);
    return "Sorry, something went wrong. Please try again.";
  }
};