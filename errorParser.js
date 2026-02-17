function parseError(errorType, errorMessage) {

  switch (errorType) {

    case "ReferenceError":
      return {
        type: "Reference Error",
        explanation: "You are using a variable that has not been declared.",
        fix: "Declare the variable using let, var, or const before using it."
      };

    case "SyntaxError":
      return {
        type: "Syntax Error",
        explanation: "There is a mistake in the structure of your code.",
        fix: "Check brackets, parentheses, colons, and semicolons carefully."
      };

    case "TypeError":
      return {
        type: "Type Error",
        explanation: "You are performing an operation on the wrong data type.",
        fix: "Check whether the variable contains the expected data type."
      };

    case "RangeError":
      return {
        type: "Range Error",
        explanation: "A value is outside the allowed range.",
        fix: "Check loops or recursive functions for infinite execution."
      };

    default:
      return {
        type: errorType,
        explanation: errorMessage,
        fix: "Review your code carefully."
      };
  }
}

module.exports = parseError;
