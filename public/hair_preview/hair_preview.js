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
      let suggestMessage = document.querySelector(".message");
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        shape = result.predicted_class;
        suggestMessage.textContent =
          "Your Face Shape is \n" +
          shape +
          "." +
          " Here are some hair style we suggested for you!";
      } else {
        const errorText = await response.text();
        console.log("Error:", errorText);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  });
