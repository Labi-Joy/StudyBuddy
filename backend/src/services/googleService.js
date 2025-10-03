const axios = require("axios");

const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent`;

exports.chat = async (message) => {
  try {
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Answer directly in plain text. 
Keep it short (max 4 sentences). 
Question: ${message}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 150, // 🔑 shorter, avoids silent burn
        topP: 0.95,
        topK: 40,
      },
    };

    const response = await axios.post(GOOGLE_API_URL, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GOOGLE_API_KEY,
      },
    });

    console.log("🔍 Gemini raw response:", JSON.stringify(response.data, null, 2));

    const candidate = response.data?.candidates?.[0];
    const outputText =
      candidate?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";

    return outputText;
  } catch (err) {
    console.error("Google chat error:", err?.response?.data || err.message);
    return "Sorry, something went wrong. Please try again.";
  }
};
