const numbers = document.querySelectorAll('.number')
const operands = document.querySelectorAll('.operand')
const decimal = document.querySelector('#dot')
const displayNumbers = document.querySelector('#display-numbers')
const displayOperand = document.querySelector('#display-operand')
const equalKey = document.querySelector('#equal')
const deleteKey = document.querySelector('#del')
const clearKey = document.querySelector('#reset')
const themeToggle = document.querySelector('#theme-toggle')
themeToggle.value = 1;

let number1 = null;
let number2 = null;
let operand = null;
let operationCompleted = false;

function add(n1, n2){
    return n1 + n2;
}

function subtract(n1, n2){
    return n1 - n2;
}

function multiply(n1, n2){
    return n1 * n2;
}

function divide(n1, n2){
    return n2 != 0 ? n1 / n2 : null;
}

function operate(operation, num1, num2){
    let result = null;
    num1 = Number(num1);
    num2 = Number(num2)

    switch(operation) {
        case '+' : 
            result = add(num1, num2);
            break;
        case '-' : 
            result = subtract(num1, num2);
            break;
        case 'x' : 
            result = multiply(num1, num2);
            break;
        case '/' : 
            result = divide(num1, num2);
            break;
    }

    if(result == null){
        displayNumbers.textContent = 'ERROR'
        number1 = null;    
    }
    else{
        result = result.toString().slice(0,13)
        displayNumbers.textContent = result;
        number1 = result;
    }
    number2 = null;
    operand = null;
    displayOperand.textContent = ''
    console.log(number1, number2, operand)
}

function numberClicked(event) {
    clickedNumber = event.target.getAttribute("value");
    if(clickedNumber == null){
        clickedNumber = event.key.toString()
    }

    if(operationCompleted){
        number1 = null;
        operationCompleted = false;
    }

    if(operand == null){
        number1 = number1 == null ? 
        clickedNumber : 
        number1 + clickedNumber

        displayNumbers.textContent = number1
    }
    else{
        number2 = number2 == null ? 
        clickedNumber : 
        number2 + clickedNumber

        displayNumbers.textContent = number2
    }
    console.log(number1, number2, operand)

}


function operandClicked(event) {
    clickedOperand = event.target.getAttribute("value");
    if(clickedOperand == null){
        clickedOperand = event.key.toString()
        clickedOperand = clickedOperand == '*' ? 'x' : clickedOperand;
    }
    
    if(number2 != null) {
        operate(operand, number1, number2)
    }

    if(number1 != null){
        operationCompleted = false;
        operand = clickedOperand;
        displayOperand.textContent = operand;
    }

    console.log(number1, number2, operand)
}


function decimalClicked(event){
    if(number2 == null){
        if(number1 != null && !number1.includes('.')){
            number1 = number1 + '.';
            displayNumbers.textContent = number1;
        }                
    }
    else{
        if(!number2.includes('.')){
            number2 = number2 += '.';
            displayNumbers.textContent = number2;
        }
    }
}

function equalsClicked(event) {
    if(number1 != null && number2 != null){
        operate(operand, number1, number2)
        operationCompleted = true;
    }
}


function deleteLastDigit(number){
    console.log(number)
    return number.slice(0, -1)
}

function deleteClicked(event){
    if(number2 == null){
        number1 = number1 == null ? 
                null : 
                deleteLastDigit(number1);
        displayNumbers.textContent = number1;
    }
    else{
        number2 = deleteLastDigit(number2);
        displayNumbers.textContent = number2;
    }
    operationCompleted = false;
    console.log(number1, number2, operand)
}

function clearClicked(event){
    number1 = null;
    number2 = null;
    operand = null;
    displayNumbers.textContent = '';
    displayOperand.textContent = '';
    operationCompleted = false;
}

function keyPressed(event){
    switch(event.key){
        case 'Enter':
            equalsClicked(event);
            break;
        case 'Delete':
            clearClicked(event);
            break;
        case 'Backspace':
            deleteClicked(event);
            break;
        case '.':
            decimalClicked(event);
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            operandClicked(event);
            break;
        default:
            let num = Number(event.key)
            // console.log(isNaN(num))
            if(!isNaN(num)){
                numberClicked(event)
            }
    }

}

numbers.forEach(num => 
            num.addEventListener('click', numberClicked))

operands.forEach(oper => 
            oper.addEventListener('click', operandClicked))

decimal.addEventListener('click', decimalClicked)
equalKey.addEventListener('click', equalsClicked)
deleteKey.addEventListener('click', deleteClicked)
clearKey.addEventListener('click', clearClicked)
document.addEventListener('keydown', keyPressed)



function themeChange(event){
    let theme = event.target.value;
    switch(theme){
        case "1":
            document.body.className = 'theme-strong';
            break;
        case "2":
            document.body.className = 'theme-brave';
            break;
        case "3":
            document.body.className = 'theme-wicked';
            break;
    }
}

themeToggle.addEventListener('input', themeChange)