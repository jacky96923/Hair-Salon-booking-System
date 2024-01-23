// Actual functions to be done when loading this page
async function main() {
  // check if user logged in first to decide what to display homepage
  let loginStatus = await checkLogin();
  if (loginStatus){
    await getUsername();
    await getGenPhoto();
  } else {
    noLoginLoadPage();
  }
}

window.onload = main();

// Scroll down animation after loadPage
window.addEventListener("load", function () {
  var targetElement = document.getElementById("scrollTarget");

  targetElement.scrollIntoView({
    behavior: "smooth",
  });
});

// Add event listeners for book now & create style buttons & logo redirecting to home page 
let desBooking = document.getElementById("desBooking");
desBooking.addEventListener("click", function () {
  window.location.href = "/booking_request/booking_request.html";
});

let desCreate = document.getElementById("desCreate");
desCreate.addEventListener("click", function () {
  window.location.href = "/hair_preview/hair_preview.html";
});

let logoImage = document.querySelector("#logo_image")
logoImage.addEventListener("click", function () {
  window.location.href = "/"
})


// Functions to construct main function
async function checkLogin(){
  let res = await fetch("/checkLogin")
  let response = await res.json()
  console.log(response)
  if (response.msg){
    return true
  } else {
    return false
  }
}

function noLoginLoadPage(){
  // If no username (no login), username div should be replaced with login div and logout anchor tag should be deleted
  let userInfoDivElement = document.querySelector("#user_info")
  userInfoDivElement.innerHTML = ""
  let loginDiv = document.createElement("div")
  loginDiv.id = "login"
  loginDiv.textContent = "Login"
  loginDiv.addEventListener("click", (e)=>{
    window.location.href = "/login/login.html"
  })
  userInfoDivElement.appendChild(loginDiv)

  let logoutAnchorElement = document.querySelector('a[href="/logout"]')
  if (logoutAnchorElement){
    logoutAnchorElement.remove()
  }
  let headerStyleDiv = document.querySelector("#headerStyle")
  if (headerStyleDiv){
    headerStyleDiv.remove()
  }
  let showResultDiv = document.querySelector("#showResult")
  if (showResultDiv){
    showResultDiv.remove()
  }
}

async function getUsername() {
  let res = await fetch("/username");
  //console.log(res)
  if (res.ok) {
    let response = await res.json();
    console.log(response);
    displayUser(response);
  }
}

function displayUser(response) {
  let usernameDivElement = document.querySelector("#user_name");
  usernameDivElement.innerHTML = "";
  let username = response.name;
  username = username.slice(0, 1).toUpperCase() + username.slice(1);
  usernameDivElement.innerText = username;
}


async function getGenPhoto() {
  const res = await fetch("/getGenPhoto", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  console.log(res)
  if (!res.ok) {
    window.location.href = "/login/login.html";
    return;
    // throw new Error("Failed to fetch photo");
  }
  const photos = await res.json();
  console.log(photos);

  // console.log("photos", photos);
  if (!photos) {
    throw new Error("Image not found");
  }
  renderData(photos);
  return;
}

async function removeGenPhoto(photo_id) {
  let res = await fetch(`/removeGenPhoto`, {
    method: "DELETE",
    body: JSON.stringify({
      photo_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to remove photo");
  }
  location.reload();
  return;
}

function renderData(photos) {
  let resultImg = document.getElementById("resultImg");
  for (let photo of photos) {
    let img = document.createElement("img");
    img.src = "./" + photo.filename;
    let buttonBooking = document.createElement("button");
    let buttonRemove = document.createElement("button");
    buttonBooking.classList.add("myStyleBooking");
    buttonBooking.textContent = "Book now";
    buttonBooking.setAttribute("photo_id", photo.id);
    buttonRemove.classList.add("myStyleRemove");
    buttonRemove.setAttribute("photo_id", photo.id);
    buttonRemove.textContent = "x";

    const imageContainer = document.createElement("div");
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("myStyleButton");
    imageContainer.classList.add("image-container");
    imageContainer.appendChild(img);
    buttonContainer.appendChild(buttonBooking);
    buttonContainer.appendChild(buttonRemove);
    imageContainer.appendChild(buttonContainer);
    resultImg.appendChild(imageContainer);
  }
  let myStyleBooking = document.querySelectorAll(".myStyleBooking");
  // console.log(myStyleBooking);
  myStyleBooking.forEach((myStyleBooking) => {
    myStyleBooking.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(e.target.getAttribute("photo_id"));
      window.location.href = `/booking_request/booking_request.html?id=${e.target.getAttribute(
        "photo_id"
      )}`;
    });
  });

  let myStyleRemove = document.querySelectorAll(".myStyleRemove");
  myStyleRemove.forEach((myStyleRemove) => {
    myStyleRemove.addEventListener("click", async function (e) {
      e.preventDefault();
      try {
        const photo_id = e.target.getAttribute("photo_id");
        await removeGenPhoto(photo_id);
        // imageContainer.remove();
      } catch (error) {
        console.error("Error removing photo:", error);
      }
    });
  });
}

