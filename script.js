function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    let value = (a/b).toFixed(5).toString();
    console.log(value);
    while(value[value.length - 1] == "0"){
        value = value.substring(0, value.length - 1);
    }
    console.log(value);
    return parseInt(value);
}

function operate(a, b, operator){
    if (operator == "+") return add(a, b);

    if (operator == "-") return subtract(a, b);

    if (operator == "x") return multiply(a, b);

    if (operator == "÷") return divide(a, b);
}
//___________________________________________________________________________________

let currentOperator = "";
let firstOperand;
let inOperation = false;
var text = document.getElementById('text');


const digits = document.querySelectorAll('.num');

digits.forEach((digit) => {
    digit.addEventListener('click', () =>{
        if(text.value == "x" || text.value == "+" || text.value == "÷" || text.value == "-" || text.value == "0"){
            text.value = "";
        }

        if(inOperation){
            firstOperand = text.value;
            text.value = "";
        }
        
        text.value += digit.textContent;
        inOperation = false;
    });
});

const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener('click', () =>{

        if(firstOperand && text.value) {
            inOperation = true;
            firstOperand = operate(parseInt(firstOperand), parseInt(text.value), currentOperator);
            text.value = firstOperand;
        }
        else{
            firstOperand = text.value;
            text.value = currentOperator;
        }

        currentOperator = operator.textContent;
    });
});

const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', () => {
    text.value = "";
    firstOperand = 0;
    inOperation = false;
});

const equalsButton = document.querySelector('.equals');

equalsButton.addEventListener('click', () => {
    text.value = operate(parseInt(firstOperand), parseInt(text.value), currentOperator);
    inOperation = false;

});
