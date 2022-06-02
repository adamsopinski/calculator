function add(a, b){
    let value = (a+b).toFixed(10).toString();
    while(value[value.length - 1] == "0"){
        value = value.substring(0, value.length - 1);
    }
    return parseFloat(value);
}

function subtract(a, b){
    let value = (a-b).toFixed(10).toString();
    while(value[value.length - 1] == "0"){
        value = value.substring(0, value.length - 1);
    }
    return parseFloat(value);
}

function multiply(a, b){
    let value = (a*b).toFixed(10).toString();
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
    let value = (a/b).toFixed(10).toString();
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
//_______________________________________________________________________________________________________________

let currentOperator = "";
let firstOperand;
let inOperation = false;
var text = document.getElementById('text');
let afterOperation = false;

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
        
        if(afterOperation){
            text.value = "";
            afterOperation = false;
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
            afterOperation = true;
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
        afterOperation = true;
        inOperation = false;
        firstOperand = "";
        decimalButton.disabled = false;
    }

});

const decimalButton = document.querySelector('.decimal');

decimalButton.addEventListener('click', () => {

    if (text.value == "+" || text.value == "-" || text.value == "x" || text.value == "÷"){
        text.value = "";
    }
    if (decimalButton.disabled == false){
        text.value += ".";
        decimalButton.disabled = true;
    }
});

const backspaceButton = document.querySelector('.backspace');

backspaceButton.addEventListener('click', () => {
    text.value = text.value.substring(0, text.value.length - 1);
});



document.addEventListener('keydown', (event) => {

    if((text.value == "x" || text.value == "+" || text.value == "÷" || text.value == "-") && (event.key != "+" && event.key != "-" && event.key != "/" && event.key != "x" && event.key != "*" && event.key != "÷")){
        text.value = "";
    }

    if(inOperation && (Number.isInteger(parseInt(text.value)))) {
        firstOperand = text.value;
        text.value = "";
    }

    if(event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4 || event.key == 5 || event.key == 6 || event.key == 7 || event.key == 8 || event.key == 9 || event.key == 0){
        if(afterOperation){
            text.value = "";
            afterOperation = false;
        }
        text.value += event.key;
    }

    else if(event.key == "x" || event.key == "/" || event.key == "-" || event.key == "+" || event.key == "*" || event.key == "÷"){
        decimalButton.disabled = false;

        if(firstOperand && (text.value != "x" && text.value != "÷" && text.value != "+" && text.value != "-")){
            inOperation = true;
        }

        if (text.value == "+" || text.value == "-" || text.value == "x" || text.value == "÷"){
            text.value = event.key;

            if (event.key == "/"){
                text.value = "÷";
            }
            if (event.key == "*"){
                text.value = "x";
            }
        }


        else if(firstOperand && text.value && inOperation){
            text.value = operate(parseFloat(firstOperand), parseFloat(text.value), currentOperator);
            afterOperation = true;
            decimalButton.disabled = false;
            firstOperand = "";
        }
        else{
            if(Number.isInteger(parseInt(text.value))){
                firstOperand = text.value;
            }
            text.value = event.key;

            if (event.key == "/"){
                text.value = "÷";
            }
            if (event.key == "*"){
                text.value = "x";
            }
        }

        currentOperator = text.value;

    }

    else if(event.key == 'c'){
        text.value = "";
        firstOperand = null;
        currentOperator = "";
        inOperation = false;
        decimalButton.disabled = false;
    }

    else if(event.key == '=' || event.key == 'Enter'){
        if(!currentOperator || !text.value || !firstOperand){
            //do nothing
        }else{
            text.value = operate(parseFloat(firstOperand), parseFloat(text.value), currentOperator);
            afterOperation = true;
            inOperation = false;
            firstOperand = "";
            decimalButton.disabled = false;
        }
    }

    else if(event.key == "Backspace"){
        text.value = text.value.substring(0, text.value.length - 1);
    }


  }, false);