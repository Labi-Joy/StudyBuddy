async function callGemini(prompt, apiKey = 'AIzaSyAUuTeXFnWjFgB7rFLJXLJpig0wSVfG6Io') {
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent',
    {
      method: 'POST',
      headers: {
        'x-goog-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(`Gemini API Error: ${data.error.message}`);
  }

  return {
    text: data.candidates[0].content.parts[0].text,
    usage: data.usageMetadata
  };
}

// Example usage
(async () => {
  try {
    const result = await callGemini('What is the capital of France?');
    console.log(result.text);
  } catch (err) {
    console.error(err.message);
  }
})();
