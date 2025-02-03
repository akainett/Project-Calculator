document .addEventListener('DOMContentLoaded', (event) => {
    // Basic math operations
    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }
    // Function to perform calculations
    function multiply(a, b) {
        return a * b;
    }

    function divide(a, b) {
        if (b === 0) {
            return 'Error';
        }
        return a / b;
    }
    
    //Variables to show calculator state
    let firstNumber = null;
    let operator = null;
    let currentDisplay = '0';
    let shouldClearDisplay = false;

    const display = document.querySelector('.display');
    const digitButtons = document.querySelectorAll('.digit');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalsButton = document.querySelector('.equals');
    const clearButton = document.querySelector('.clear');
    const decimalButton = document.querySelector('.decimal');
    const backSpaceButton = document.querySelector('.backspace');
    const toggleSignButton = document.querySelector('.toggle')

    //
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

    // Function to round numbers to avoid overflow
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

    // Event listeners for operator buttons
    operatorButtons.forEach(button => {
        button.addEventListener('click', function() {
            if(firstNumber === null) {
                firstNumber = parseFloat(currentDisplay);
                
            // If there's a first number but no second, just update the operator
            } else if(currentDisplay === '' || currentDisplay === firstNumber.toString()) {
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

    // Event listeners for equals button
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

    // Event listeners for clear button
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

    // Event listeners for backspace button
    backSpaceButton.addEventListener('click', function() {
        currentDisplay = currentDisplay.slice(0, -1) || '0';
        display.textContent = currentDisplay;
        if (!currentDisplay.includes('.')) {
            document.querySelector('.decimal').disabled = false;
        }
    });

    // Event listeners for toggle-sign button
    toggleSignButton.addEventListener('click', function() {
        // Avoid toggling if the display is just '0'
        if (currentDisplay !== '0') {
            currentDisplay = (parseFloat(currentDisplay) * -1).toString();
            display.textContent = currentDisplay;
        }
    });

    // Keyboard support
    document.addEventListener('keydown', function(event) {
        const key = event.key;

        if (key === ".") {
            decimalButton.click();
            event.preventDefault();
            return;
        }
        
        if (key === "Backspace") {
            backSpaceButton.click();
            event.preventDefault();
            return;
        }

        if (key === "Enter") {
            equalsButton.click();
            event.preventDefault(); 
            return;
        }

        const button = document.querySelector(`button[data-key="${key}"]`) || 
                    document.querySelector(`button[data-key="${key.toLowerCase()}"]`);
        
        if (button) {
            button.click();
            event.preventDefault();
        }
    });

    // Add data-key attributes to buttons for keyboard support
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.match(/[0-9]|\+|-|\*|\/|=|±/)) {
            button.setAttribute('data-key', button.textContent);
        }
    });
});
