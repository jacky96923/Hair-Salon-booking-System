let resultImg = document.getElementById("resultImg");
for (let i = 1; i <= 10; i++) {
  let img = document.createElement("img");
  img.src = `/assets/user_img.webp`;
  let button = document.createElement("button");
  button.id = "myStyleBooking";
  button.textContent = "Book now";

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  imageContainer.appendChild(img);
  imageContainer.appendChild(button);

  resultImg.appendChild(imageContainer);
}
async function getGenPhoto() {
  // const photoId = req.session.user.id;

  //console.log("123123", photoId);xw
  const res = await fetch("/getGenPhoto", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch photo");
  }

  const photo = await res.json();

  if (!photo) {
    throw new Error("Image not found");
  }

  return photo;
}
getGenPhoto();

// let myStyleBooking = document.getElementById("myStyleBooking");
// myStyleBooking.addEventListener("click", function () {
//   window.location.href = "/booking_request/booking_request.html";
// });
let desBooking = document.getElementById("desBooking");
desBooking.addEventListener("click", function () {
  window.location.href = "/booking_request/booking_request.html";
});

let desCreate = document.getElementById("desCreate");
desCreate.addEventListener("click", function () {
  window.location.href = "/hair_preview/hair_preview.html";
});
