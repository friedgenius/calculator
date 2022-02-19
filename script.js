const keys = document.querySelectorAll(".key");
const clear = document.querySelector(".clear");
const display = document.querySelector(".display");
let displayString = "";
let numOne = "";
let numTwo= "";
let operated = false;
let operator = ""
let prev;





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
        return "Ok mowa";
    }
    return a / b;
}





function dualOperation(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator === "+") {
        return add(a, b);
    }
    else if (operator === "-") {
        return subtract(a, b);
    }
    else if (operator === "X") {
        return multiply(a, b);
    }
    else if (operator === "/") {
        return divide(a, b);
    }
    else if (operator === "=") {
        return a;
    }
    else {
        return 0;
    }
}





function singleOperator(a, operator) {
    a = parseFloat(a);
    console.log("aaaa")
    if (operator === "%") {
        return divide(a, 100);
    }
    else if (operator === "+/-") {
        return multiply(a, -1);
    }
    else {
        return a;
    }
}


function functionName(key) {
    if (key.classList.contains("clear")) {
        displayString = "0";
        numOne = "";
        numTwo= "";
        operated = false;
        operator = ""
    }
    else if (key.classList.contains("topop")){
        if (prev.classList.contains("op")){
            if (operated) {
                numOne = singleOperator(numOne, key.textContent)
                displayString = numOne
            }
            else {
                numTwo = singleOperator(numTwo, key.textContent)
                displayString = numTwo;
            }
        }
        else {
            if (operated) {
                numTwo = singleOperator(numTwo, key.textContent)
                displayString = numTwo;
            }
            else {
                numOne = singleOperator(numOne, key.textContent)
                displayString = numOne

            }           
        }

    }
    else if (key.classList.contains("op") && numOne) {
        if (!operated || prev.classList.contains("op")) {
            operated = true;
            operator = key.textContent;
        }
        else {
            numOne = dualOperation(numOne, numTwo, operator);
            displayString = numOne;
            if (numOne === "Ok mowa") {
                numOne = "";
                numTwo= "";
                operated = false;
                operator = ""
            }
            
            numTwo = "";
            operator = key.textContent;
        }
    }
    else if (key.classList.contains("number")){
        if (operated && numOne) {
            if (key.textContent === "." && numTwo.includes(".")){
                displayString = numTwo;
            }
            else{
                
                numTwo = numTwo + key.textContent;
                displayString = numTwo;
            }
        }
        else {
            if (key.textContent === "." && numOne.includes(".")){
                displayString = numOne;
            }
            else{
            numOne = numOne + key.textContent;
            displayString = numOne;
            }
        }

    }

    prev =  key;
    return displayString;
}



keys.forEach(key => key.addEventListener("click", function(e) {
    this.classList.add("clicked");
    let displayS = functionName(this);
    display.textContent = displayS;
    
}))
keys.forEach(key => key.addEventListener("transitionend", function(e){
    this.classList.remove("clicked");
}))