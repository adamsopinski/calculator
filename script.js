function add(a, b){
    let value = (a+b).toFixed(18).toString();
    while(value[value.length - 1] == "0"){
        value = value.substring(0, value.length - 1);
    }
    return parseFloat(value);
}

function subtract(a, b){
    let value = (a-b).toFixed(18).toString();
    while(value[value.length - 1] == "0"){
        value = value.substring(0, value.length - 1);
    }
    return parseFloat(value);
}

function multiply(a, b){
    let value = (a*b).toFixed(18).toString();
    while(value[value.length - 1] == "0"){
        value = value.substring(0, value.length - 1);
    }
    return parseFloat(value);
}

function divide(a, b){

    if(b == 0){
        alert("ERROR: You can't divide by zero.")
        return 0;
    }
    else{
    let value = (a/b).toFixed(18).toString();
    while(value[value.length - 1] == "0"){
        value = value.substring(0, value.length - 1);
    }
    return parseFloat(value);
}
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
        if(text.value == "x" || text.value == "+" || text.value == "÷" || text.value == "-"){
            text.value = "";
        }

        if(inOperation && (Number.isInteger(parseInt(text.value)))) {
            firstOperand = text.value;
            text.value = "";
        }
        
        text.value += digit.textContent;
    });
});

const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener('click', () =>{
        decimalButton.disabled = false;

        if(firstOperand){
            inOperation = true;
        }
        if (text.value == "+" || text.value == "-" || text.value == "x" || text.value == "÷"){
            text.value = operator.textContent;
        }
        else if(firstOperand && text.value && inOperation){
            text.value = operate(parseFloat(firstOperand), parseFloat(text.value), currentOperator);
            decimalButton.disabled = false;
            firstOperand = "";
        }
        else{
            if(Number.isInteger(parseInt(text.value))){
                firstOperand = text.value;
            }
            text.value = operator.textContent;
        }

        currentOperator = operator.textContent;
    });
});

const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', () => {
    text.value = "";
    firstOperand = null;
    currentOperator = "";
    inOperation = false;
    decimalButton.disabled = false;
});

const equalsButton = document.querySelector('.equals');

equalsButton.addEventListener('click', () => {

    if(!currentOperator || !text.value || !firstOperand){
        //do nothing
    }else{
        text.value = operate(parseFloat(firstOperand), parseFloat(text.value), currentOperator);
        inOperation = false;
        firstOperand = "";
        decimalButton.disabled = false;
    }

});

const decimalButton = document.querySelector('.decimal');

decimalButton.addEventListener('click', () => {

    if (text.value == "+" || text.value == "-" || text.value == "x" || text.value == "÷"){ //|| (inOperation)){
        text.value = "";
    }
    if (decimalButton.disabled == false){
        text.value += ".";
        decimalButton.disabled = true;
    }
});