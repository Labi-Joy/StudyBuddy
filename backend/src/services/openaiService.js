// src/services/openaiService.js
const axios = require("axios");

// const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.2";
const HF_MODEL = "google/flan-t5-base";

const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

/**
 * Generate quiz from text using Hugging Face
 */
exports.generateQuizFromText = async (text, { count = 5 } = {}) => {
  const system = `You are a helpful exam question generator. Given a passage, produce ${count} multiple-choice questions in valid JSON ONLY, in the format:
{ "questions": [ { "q": "...", "options": ["A","B","C","D"], "answer": 0 } ] }`;

  const user = `Text:\n${text.slice(0, 28000)}\n\nGenerate ${count} questions.`;

  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: `${system}\n\n${user}` },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content =
      response.data[0]?.generated_text || response.data?.generated_text || "";

    try {
      const parsed = JSON.parse(content);
      return parsed.questions || [];
    } catch {
      return [{ raw: content }];
    }
  } catch (err) {
    console.warn("HF quiz error:", err?.response?.data || err.message);
    return [];
  }
};

/**
 * General chat (student Q&A)
 */
exports.chat = async (message) => {
  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle both response shapes
    if (Array.isArray(response.data) && response.data[0]?.generated_text) {
      return response.data[0].generated_text;
    }
    if (response.data?.generated_text) {
      return response.data.generated_text;
    }

    return "No response.";
  } catch (err) {
    console.warn("HF chat error:", err?.response?.data || err.message);
    return "Sorry, something went wrong. Please try again.";
  }
};
