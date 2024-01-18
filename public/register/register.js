// DOM variables
const input = document.querySelector("input");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");
const emailErrorContainer = document.querySelector(
  ".input-control-email .error"
);
const emailInputDiv = document.querySelector(".input-control-email");

// Register submission
document
  .querySelector("#register-form")
  .addEventListener("submit", async (event) => {
    // let formError = false;
    event.preventDefault();

    const form = event.target;

    let formObject = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirm_password.value,
    };
    console.log(form);

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject), //convert JS object to JSON format
    });
    form.reset();
    const result = await res.json();
    if (validateInputs(result)) {
      window.location.href = "../home.html";
    }
  });

// Display Error Message when error
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.classList.add("active");

  errorDisplay.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> ${message}`;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

// // Remove Error Message when no issue
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.classList.remove("active");

  errorDisplay.innerHTML = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

// // Function to set rules to validate user input value
const validateInputs = (result) => {
  setSuccess(username);
  setSuccess(email);
  setSuccess(password);
  setSuccess(confirmPassword);
  if (result.error) {
    if (result.element === "name") {
      setError(username, result.error);
    }
    if (result.element === "email") {
      setError(email, result.error);
    }
    if (result.element === "password") {
      setError(password, result.error);
    }
    if (result.element === "confirmPassword") {
      setError(confirmPassword, result.error);
    }
    if (!result.element) {
      document.querySelector(
        ".system-error"
      ).innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> ${result.error}`;
      document.querySelector(".system-error").classList.add("error");
      document.querySelector(".system-error").remove("success");
    }
    return false;
  } else {
    return true;
  }
};

// Deprecated validateInput function
// const validateInputs = () => {
//     //Removes whitespace from both sides of user input
//     const nameValue = username.value.trim();
//     const emailValue = email.value.trim();
//     const passwordValue = password.value.trim();
//     const confirmPasswordValue = confirmPassword.value.trim();

//     if(nameValue === ''){
//         setError(username,'Name is required.')
//     }else{
//         setSuccess(username)
//     }

//     if(emailValue === ''){
//         setError(email,'Email is required.')
//     }else if (!isValidEmail(emailValue)){
//         setError(email, 'Provide a valid email address')
//     }else{
//         setSuccess(email)
//     }

//     if(passwordValue === ''){
//         setError(password,'Password is required.');
//     }else if (!isValidPassword(passwordValue)){
//         setError(password,'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
//     }else{
//         setSuccess(password)
//     }

//     if(confirmPasswordValue === ''){
//         setError(confirmPassword,'Password confirm your password.');
//     }else if (confirmPasswordValue !== passwordValue){
//         setError(confirmPassword,'Passwords do not match');
//     }else{
//         setSuccess(confirmPassword)
//     }

// }
