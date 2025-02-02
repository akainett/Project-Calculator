// Basic math operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }
    return a / b;
}

let firstNumber = null;
let operator = null;
let currentDisplay = '0';
let shouldClearDisplay = false;

const display = document.querySelector('.display');

const operate = function(num1, num2, op) {
    switch(op) {
        case '+':
            return add(num1, num2);

        case '-':
            return subtract(num1, num2);

        case '*':
            return multiply(num1, num2);

        case '/':
            return divide(num1, num2);

        default:
            return 'null';
    }
}

const updateDisplay = function(value) {
    if(currentDisplay === '0' || shouldClearDisplay) {
        currentDisplay = value;
        shouldClearDisplay = false
    }
    display.textContent = currentDisplay;
}