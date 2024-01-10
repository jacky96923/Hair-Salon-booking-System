let photoInput = document.querySelector("#upload_image");
let uploadedImage = document.querySelector("#uploaded_image");

document.querySelector("#submit_photo").addEventListener("click", () => {
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

document
  .querySelector("#submit_shape")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const file = photoInput.files[0];
    if (!file) {
      console.log("No file Selected");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("upload_image", file);
      console.log(formData);
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
  });
