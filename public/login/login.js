async function submitLogin(event) {
  event.preventDefault();
  let form = event.target;
  let submitMessage = form.querySelector(".message");
  let formObject = {
    username: form.username.value,
    password: form.password.value,
  };
  let res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formObject),
  });
  form.reset();
  let json = await res.json();
  if (json.error) {
    submitMessage.textContent = json.error;
    return;
  }
  submitMessage.textContent = "Login Successfully";
}
