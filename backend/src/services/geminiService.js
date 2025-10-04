const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function chat(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        temperature: 0.7,
      },
    });

    const textOutput =
      response.output_text ||
      (response.output && response.output[0]?.content?.[0]?.text) ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response text found";

    return textOutput;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get response from Gemini");
  }
}

module.exports = { chat };
