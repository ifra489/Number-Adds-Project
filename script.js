// addButton.addEventListener("click", function () {
//   let num1 = document.getElementById("num1").value;
//   let num2 = document.getElementById("num2").value;
//   let addButton = document.getElementById("addButton");
//   let result = document.getElementById("result");


//   // Input validation
//     if(num1 === "" || num2 === ""){
//         result.innerHTML = "⚠️ Please enter both numbers!";
//         return; // ✅ Now this works because it's inside a function
//     }
//   let sum = parseFloat(num1) + parseFloat(num2);
//   result.innerHTML = '<i class="fas fa-equals icon"></i> ' + sum;
// });











let history = [];

// Calculate function
function calculate(operation) {
  let num1 = parseFloat(document.getElementById("num1").value);
  let num2 = parseFloat(document.getElementById("num2").value);
  let resultDiv = document.getElementById("result");

  if (isNaN(num1) || isNaN(num2)) {
    resultDiv.innerHTML = "⚠️ Please enter valid numbers!";
    resultDiv.style.color = "red";
    return;
  }

  let result;
  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      result = num2 !== 0 ? num1 / num2 : "⚠️ Cannot divide by 0";
      break;
    case "mod":
      result = num2 !== 0 ? num1 % num2 : "⚠️ Cannot mod by 0";
      break;
  }

  if (typeof result === "number") result = result.toFixed(2);

  // Result color
  if (!isNaN(result)) {
    resultDiv.style.color = result >= 0 ? "green" : "red";
  }

  // Show result with words
  if (!isNaN(result)) {
    let numericResult = parseFloat(result); // Convert string to number
    resultDiv.innerHTML = `<i class="fas fa-equals icon"></i> ${result} (${numberToWords(numericResult)})`;
    history.push(`${num1} ${getSymbol(operation)} ${num2} = ${result}`);
    updateHistory();
  } else {
    resultDiv.innerHTML = result;
  }
}

function getSymbol(op) {
  switch (op) {
    case "add":
      return "+";
    case "subtract":
      return "-";
    case "multiply":
      return "*";
    case "divide":
      return "/";
    case "mod":
      return "%";
  }
}

function updateHistory() {
  let historyList = document.getElementById("history");
  historyList.innerHTML = "";
  for (let item of history) {
    let li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  }
}

// Clear button
document.getElementById("clearButton").addEventListener("click", function () {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  document.getElementById("result").innerHTML = "";
});

// Random numbers
document.getElementById("randomBtn").addEventListener("click", function () {
  document.getElementById("num1").value = Math.floor(Math.random() * 100);
  document.getElementById("num2").value = Math.floor(Math.random() * 100);
});

// Enter key
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculate("add");
  }
});

// Theme switcher
document.getElementById("themeBtn").addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
});

// Convert number to words (supports up to 999999)
function numberToWords(num) {
  if (num === 0) return "Zero";
  if (num < 0) return "Minus " + numberToWords(Math.abs(num));

  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  let integerPart = Math.floor(num);
  let decimalPart = Math.round((num - integerPart) * 100); // Two decimal digits

  let str = "";

  // Convert integer part
  if (Math.floor(integerPart / 1000) > 0) {
    str += numberToWords(Math.floor(integerPart / 1000)) + " Thousand ";
    integerPart %= 1000;
  }
  if (Math.floor(integerPart / 100) > 0) {
    str += numberToWords(Math.floor(integerPart / 100)) + " Hundred ";
    integerPart %= 100;
  }
  if (integerPart > 0) {
    if (integerPart < 20) str += a[integerPart];
    else
      str +=
        b[Math.floor(integerPart / 10)] +
        (integerPart % 10 ? " " + a[integerPart % 10] : "");
  }

  str = str.trim();

  // Convert decimal part if exists
  if (decimalPart > 0) {
    str += " point";
    let tens = Math.floor(decimalPart / 10);
    let ones = decimalPart % 10;
    if (tens > 0) str += " " + b[tens];
    if (ones > 0) str += " " + a[ones];
  }

  return str;
}
