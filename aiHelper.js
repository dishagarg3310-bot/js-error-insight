const fetch = require("node-fetch");

async function explainWithAI(code, errorType, errorMessage) {
  try {
    const prompt = `
You are a programming tutor.
Explain this JavaScript error in very simple language for beginners.

Error Type: ${errorType}
Error Message: ${errorMessage}

Give:
1. Simple explanation
2. One-line fix suggestion
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer YOUR_API_KEY_HERE`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    return null; // fallback trigger
  }
}

module.exports = explainWithAI;
