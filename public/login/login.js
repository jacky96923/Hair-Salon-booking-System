async function submitLogin(event) {
  event.preventDefault();
  let form = event.target;
  let submitMessage = form.querySelector(".message");
  let formObject = {
    email: form.email.value,
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
  const json = await res.json();
  console.log(json);
  if (json.error) {
    submitMessage.textContent = json.error;
    return;
  }
  // submitMessage.textContent = "Login Successfully";

  if (res.status == 200) {
    window.location.href = "/home.html";
  }
}
