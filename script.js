document .addEventListener('DOMContentLoaded', (event) => {
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
    const digitButtons = document.querySelectorAll('.digit');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalsButton = document.querySelector('.equals');
    const clearButton = document.querySelector('.clear');
    const decimalButton = document.querySelector('.decimal')

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

            default: return 'null';
        }
    }

    function roundNumber(num) {
        return Math.round(num * 100000000) / 100000000;
    }

    const updateDisplay = function(value) {
        if(currentDisplay === '0' || shouldClearDisplay) {
            currentDisplay = value;
            shouldClearDisplay = false
        }else if(value !== '.') {
            currentDisplay += value;
        } else if(!currentDisplay.includes('.')) {
            currentDisplay += value;
        }
        display.textContent = currentDisplay;
        decimalButton.disabled = currentDisplay.includes('.');
    }

    //Event listener for digit buttons
    digitButtons.forEach(button => {
        button.addEventListener('click', function(){
            updateDisplay(button.textContent);
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', function() {
            if(firstNumber === null) {
                firstNumber = parseFloat(currentDisplay);
            
            } else if(currentDisplay === '' || currentDisplay === firstNumber.toString()) {
                // If there's a first number but no second, just update the operator
                // Do nothing, just update the operator
            } else {          
                let result = operate(firstNumber, parseFloat(currentDisplay), operator);
                if(typeof result === 'string') {
                    display.textContent = result;
                    firstNumber = null;
                    operator = null;
                    shouldClearDisplay = true;
                    return;
                }
                result = roundNumber(result)
                display.textContent = result;
                currentDisplay = result.toString()
                firstNumber = result;
            }
            operator = button.textContent
            shouldClearDisplay = true;
        });
    });

    equalsButton.addEventListener('click', function(){
        if(firstNumber !== null && parseFloat(currentDisplay) !== null && operator !== null) {
            let result = operate(firstNumber, parseFloat(currentDisplay), operator);
            if(typeof result === 'string') {
                display.textContent = result;
                firstNumber = null;
                operator = null;
                shouldClearDisplay = true;
                return;
            }
            result = roundNumber(result);
            display.textContent = result;
            currentDisplay = result.toString()
            firstNumber = null;
            operator = null;
            shouldClearDisplay = true;
        } 
    });

    clearButton.addEventListener('click', function() {
        currentDisplay = '0';
        display.textContent = currentDisplay
        firstNumber = null;
        operator = null;
        shouldClearDisplay = false;
        decimalButton.disabled = false;
    });

    decimalButton.addEventListener('click', function(){
        if(!currentDisplay.includes('.')){
            updateDisplay('.');
        }
    });
});
