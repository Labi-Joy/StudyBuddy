const axios = require("axios");

const API_KEY = "AIzaSyAUuTeXFnWjFgB7rFLJXLJpig0wSVfG6Io";

async function testPaLM2() {
  try {
    console.log("🔄 Testing PaLM 2 text-bison-001...");
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${API_KEY}`,
      {
        prompt: {
          text: "Say hello"
        },
        temperature: 0.7,
        maxOutputTokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ PaLM 2 Works!");
    console.log("Response:", response.data?.candidates?.[0]?.output);
  } catch (err) {
    console.error("❌ PaLM 2 Failed:", err?.response?.data || err.message);
  }
}

async function testChatBison() {
  try {
    console.log("\n🔄 Testing chat-bison-001...");
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${API_KEY}`,
      {
        prompt: {
          messages: [{ content: "Say hello" }]
        },
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Chat Bison Works!");
    console.log("Response:", response.data?.candidates?.[0]?.content);
  } catch (err) {
    console.error("❌ Chat Bison Failed:", err?.response?.data || err.message);
  }
}

async function runTests() {
  await testPaLM2();
  await testChatBison();
}

runTests();