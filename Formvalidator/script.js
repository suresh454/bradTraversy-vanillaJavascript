const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


function showError(type, message) {
    const formControl = type.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
    
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkValidations(inputArr) {
    inputArr.forEach(input => {
        if(input.value.trim() === ''){
            showError(input, `${getFieldValue(input)} is required`)
        } else {
            showSuccess(input);
        }
    });
}

function getFieldValue(input) {
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

function checkInputLength(input, min, max) {
    if(input.value.trim().length < min) {
        showError(input, `${getFieldValue(input)} must be atleast ${min} characters`);
    } else if (input.value.trim().length > max){
        showError(input, `${getFieldValue(input)} must be maximum of ${max} characters`);
    } else {
        showSuccess(input);
    }
}

function checkEmailPattern(input) {
    const re = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
    if(re.test(input.value)){
        showSuccess(input)
    } else {
        
        showError(input, 'Email is not valid');
    }
}

function checkSameValue(input1, input2){
    if(input1.value !== input2.value) {
        showError(input2, "Passwords doesn't match")
    } else {
        showSuccess(input2);
    }
}

//event listeners
form.onsubmit = (e) => {
    e.preventDefault();
   
    checkValidations([userName, email, password, password2]);
    checkInputLength(userName, 3, 15);
    checkInputLength(password, 6, 20);
    checkEmailPattern(email);
    checkSameValue(password, password2);
    
}