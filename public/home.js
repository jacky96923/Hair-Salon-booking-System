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

  const photos = await res.json();
  console.log("photos", photos);
  if (!photos) {
    throw new Error("Image not found");
  }
  renderData(photos);
  return;
}

function renderData(photos) {
  let resultImg = document.getElementById("resultImg");
  for (let photo of photos) {
    let img = document.createElement("img");

    img.src = photo.filename;
    let button = document.createElement("button");
    button.id = "myStyleBooking";
    button.textContent = "Book now";

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    imageContainer.appendChild(img);
    imageContainer.appendChild(button);

    resultImg.appendChild(imageContainer);
  }
}
getGenPhoto();
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
