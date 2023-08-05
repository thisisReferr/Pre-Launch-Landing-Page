const emailInput = document.getElementById('emailInput');
const getNotified = document.getElementById("getNotified"); 
function emailExists(email) {
    // Should make request to server if email already exists
    const existingEmails = ['example@example.com'];
    return existingEmails.includes(email);
}

const getNotifiedEventHandler = (event)=>{
    const email = emailInput.value.trim();
    if (emailExists(email)) {
        emailInput.classList.remove(['active', 'inactive', 'valid', 'invalid']);
        emailInput.classList.add('email-exists');
    } else {
        emailInput.classList.remove('email-exists');

    }
}

function handleInputEvent() {
    const email = emailInput.value.trim();

    if(emailInput.classList.contains('active')&& email) {
        emailInput.classList.remove('active');
    }

    if (email === '') {
        emailInput.classList.remove('valid', 'invalid', 'email-exists');
    } else if (emailInput.validity.valid) {
        emailInput.classList.add('valid');
        emailInput.classList.remove('invalid');
    } else {
        emailInput.classList.remove('valid');
        emailInput.classList.add('invalid');
    }

}

function handleFocusEvent() {
    emailInput.classList.add('active');
}

function handleBlurEvent() {
    emailInput.classList.remove('active');
}

emailInput.addEventListener('input', handleInputEvent);
emailInput.addEventListener('focus', handleFocusEvent);
emailInput.addEventListener('blur', handleBlurEvent);
getNotified.addEventListener('click',getNotifiedEventHandler)