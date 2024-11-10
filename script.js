// Get the display element
const display = document.getElementById('display');

// Variable to track if we're starting a new number
let newNumber = true;

// Function to append numbers to display
function appendNumber(num) {
    if (newNumber) {
        display.value = num;
        newNumber = false;
    } else {
        display.value += num;
    }
}

// Function to append operators
function appendOperator(op) {
    // Only append if display is not empty
    if (display.value !== '') {
        display.value += op;
        newNumber = false;
    }
}

// Function to clear the display
function clearDisplay() {
    display.value = '';
    newNumber = true;
}

// Function to calculate square
function square() {
    try {
        // Get the current value and calculate its square
        const value = parseFloat(display.value);
        if (!isNaN(value)) {
            display.value = (value * value).toString();
            newNumber = true;
        }
    } catch (error) {
        display.value = 'Error';
        newNumber = true;
    }
}

// Function to evaluate the expression
function calculate() {
    try {
        // Replace × with * for evaluation
        let expression = display.value.replace('×', '*');
        
        // Handle modulo operations
        if (expression.includes('%')) {
            const parts = expression.split('%');
            if (parts.length === 2) {
                const num1 = parseFloat(parts[0]);
                const num2 = parseFloat(parts[1]);
                display.value = (num1 % num2).toString();
            }
        } else {
            // Evaluate the expression
            display.value = eval(expression).toString();
        }
        newNumber = true;
    } catch (error) {
        display.value = 'Error';
        newNumber = true;
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers and decimal point
    if (/[0-9.]/.test(key)) {
        appendNumber(key);
    }
    
    // Operators
    if (['+', '-', '*', '/', '%'].includes(key)) {
        appendOperator(key);
    }
    
    // Enter key for calculation
    if (key === 'Enter') {
        calculate();
    }
    
    // Backspace for clearing
    if (key === 'Backspace') {
        clearDisplay();
    }
});