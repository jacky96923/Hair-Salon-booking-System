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