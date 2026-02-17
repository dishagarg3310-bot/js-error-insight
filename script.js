// user ka code check karne wala main function
function analyzeUserCode() {

  const userCode = document.getElementById("codeInput").value;
  const resultBox = document.getElementById("output");

  resultBox.innerHTML = "";

  if (userCode.trim() === "") {
    resultBox.innerHTML = "❌ Please paste some JavaScript code first.";
    return;
  }

  try {
    // yahan user ka code run hota hai
    new Function(userCode)();

    resultBox.innerHTML = `
  <h3 style="color: green;">✅ No Errors</h3>
  <p>Your code ran without any errors.</p>
`;

  } 
  catch (error) {

    let explanation = "";
    let fix = "";
    let correctExample = "";

    // error type ke according explanation
    if (error.name === "ReferenceError") {

      explanation =
        "You are using a variable or function which is not defined.";

      fix =
        "Check if you forgot to declare the variable or there is a spelling mistake.";

      correctExample =
`// wrong
console.log(x);

// correct
let x = 10;
console.log(x);`;

    } 
    else if (error.name === "SyntaxError") {

      explanation =
        "There is a syntax mistake in your code.";

      fix =
        "Check brackets, quotes or missing symbols.";

      correctExample =
`// wrong
if (a > 5 {
  console.log(a);
}

// correct
if (a > 5) {
  console.log(a);
}`;

    } 
    else if (error.name === "TypeError") {

      explanation =
        "You are using a value in an invalid way.";

      fix =
        "Make sure the variable supports the operation.";

      correctExample =
`// wrong
let num = 10;
num();

// correct
let num = 10;
console.log(num);`;

    } 
    else {

      explanation = "Some error occurred in the code.";
      fix = "Please recheck your code.";
      correctExample = "No example available.";
    }

    // line number nikalne ki try
    let lineInfo = "";
    if (error.stack) {
      const match = error.stack.match(/<anonymous>:(\d+):/);
      if (match) {
        lineInfo = "Error at line: " + match[1];
      }
    }

    // final output
    resultBox.innerHTML = `
      <h3>❌ Error Found</h3>
      <p><strong>Type:</strong> ${error.name}</p>
      <p><strong>Message:</strong> ${error.message}</p>
      <p>${lineInfo}</p>

      <h4>Explanation</h4>
      <p>${explanation}</p>

      <h4>How to Fix</h4>
      <p>${fix}</p>

      <h4>Correct Code Example</h4>
      <pre>${correctExample}</pre>
    `;
  }
}
function clearAll() {
  document.getElementById("codeInput").value = "";
  document.getElementById("output").innerHTML = "";
}
