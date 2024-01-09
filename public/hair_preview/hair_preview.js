let user_image = document.querySelector("#user_image");
let uploadedImage = document.querySelector("#uploaded_image");
let uploaded_image = document.querySelector("#uploaded_image");
let submit_photo = document.querySelector("#submit_photo");
let photoInput = document.querySelector("#photo_input");

submit_photo.addEventListener("click", () => {
  photoInput.click();
});

photoInput.addEventListener("change", () => {
  let file = photoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      uploadedImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

async function saveImage(file) {
  const formData = new FormData();
  formData.append("user_image", file);

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const result = await response.json();
      console.log("Image:", result);
    } else {
      console.log("Error:", response.statusText);
    }
  } catch (error) {
    console.log("error", error.message);
  }
}
