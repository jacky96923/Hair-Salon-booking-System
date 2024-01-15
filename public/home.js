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

let myStyleBooking = document.getElementById("myStyleBooking");
myStyleBooking.addEventListener("click", function () {
  window.location.href = "/booking_request/booking_request.html";
});
let desBooking = document.getElementById("desBooking");
desBooking.addEventListener("click", function () {
  window.location.href = "/booking_request/booking_request.html";
});

let desCreate = document.getElementById("desCreate");
desCreate.addEventListener("click", function () {
  window.location.href = "/hair_preview/hair_preview.html";
});

// async function getGenImages() {
//   const imageId = req.params.id;
//   const res = await fetch("getGenImg", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(imageId),
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch image");
//   }

//   const image = await res.json();

//   if (!image) {
//     throw new Error("Image not found");
//   }

//   return image;
// }
// getGenImages();
