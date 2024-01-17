async function getGenPhoto() {
  const res = await fetch("/getGenPhoto", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
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
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to remove photo");
  }
  return;
}

function renderData(photos) {
  let resultImg = document.getElementById("resultImg");
  for (let photo of photos) {
    let img = document.createElement("img");
    img.src = photo.filename;
    let buttonBooking = document.createElement("button");
    let buttonRemove = document.createElement("button");
    buttonBooking.classList.add("myStyleBooking");
    buttonBooking.textContent = "Book now";
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
      window.location.href = "/booking_request/booking_request.html";
    });
  });

  let myStyleRemove = document.querySelectorAll(".myStyleRemove");
  myStyleRemove.forEach((myStyleRemove) => {
    myStyleRemove.addEventListener("click", async function (e) {
      e.preventDefault();
      try {
        const photo_id = e.target.getAttribute("photo_id");
        await removeGenPhoto(photo_id);
        imageContainer.remove();
      } catch (error) {
        console.error("Error removing photo:", error);
      }
    });
  });
}
getGenPhoto();

let desBooking = document.getElementById("desBooking");
desBooking.addEventListener("click", function () {
  window.location.href = "/booking_request/booking_request.html";
});

let desCreate = document.getElementById("desCreate");
desCreate.addEventListener("click", function () {
  window.location.href = "/hair_preview/hair_preview.html";
});
