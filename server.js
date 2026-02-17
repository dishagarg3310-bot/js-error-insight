const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const parseError = require("./errorParser");
const explainWithAI = require("./aiHelper");


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/analyze",async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.json({
      success: false,
      error: "No code provided"
    });
  }

  try {
    // Execute user code
    new Function(code)();

    // Agar error nahi aaya
    res.json({
      success: true,
      message: "No errors found 🎉"
    });

  } catch (err) {

  const parsedError = parseError(err.name, err.message);

  // Try AI explanation
  const aiExplanation = await explainWithAI(
    code,
    err.name,
    err.message
  );

  res.json({
    success: false,
    errorType: parsedError.type,
    explanation: parsedError.explanation,
    fix: parsedError.fix,
    aiExplanation: aiExplanation
  });
}


});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
