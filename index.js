const emailInput = document.getElementById("emailInput");
const notifiedForm = document.getElementById("notifiedForm");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function emailExists(email) {
  const existingEmails = ["example@example.com"];
  return existingEmails.includes(email);
}

const getNotifiedEventHandler = (event) => {
  event.preventDefault();
  console.log("event triggered");
  const { value } = emailInput;
  const email = value.trim();

  if (!isValidEmail(email)) {
    emailInput.classList.add("invalid");
    return;
  }

  if (emailExists(email)) {
    emailInput.classList.replace("valid", "email-exists");
  }
};

function handleInputEvent() {
  const { value } = emailInput;
  const email = value.trim();

  emailInput.classList.remove("valid", "invalid", "email-exists", "active");

  if (email === "") return;

  if (emailInput.validity.valid) {
    emailInput.classList.add("valid");
  } else {
    emailInput.classList.add("invalid");
  }
}

function handleFocusEvent() {
  emailInput.classList.add("active");
}

function handleBlurEvent() {
  emailInput.classList.remove("active");
}

emailInput.addEventListener("input", handleInputEvent);
emailInput.addEventListener("focus", handleFocusEvent);
emailInput.addEventListener("blur", handleBlurEvent);
notifiedForm.addEventListener("submit", getNotifiedEventHandler);
