let resultImg = document.getElementById("resultImg");
for (let i = 1; i <= 10; i++) {
  let img = document.createElement("img");
  img.src = `/assets/user_img.webp`;
  let button = document.createElement("button");
  button.textContent = "book now";

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  imageContainer.appendChild(img);
  imageContainer.appendChild(button);

  resultImg.appendChild(imageContainer);
}

let desBooking = document.getElementById("desBooking");
desBooking.addEventListener("click", function () {
  window.location.href = "/booking_request/booking_request.html";
});

let desCreate = document.getElementById("desCreate");
desCreate.addEventListener("click", function () {
  window.location.href = "/hair_preview/hair_preview.html";
});
