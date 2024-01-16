let photoInput = document.querySelector("#upload_image");
let uploadedImage = document.querySelector("#uploaded_image");
let apiPath;
let requestedStyle;

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
        console.log(result);
        let shape = result.prediction.predicted_class;
        console.log("text:", shape);
        // receive apiPath
        apiPath = result.rePath;
        suggestMessage.innerHTML =
          "Your Face Shape is \n" +
          shape +
          "." +
          " Here are some hair style we suggested for you!" +
          ` <button id="get_style">
          Get Styles
        </button>`;

        //get style
        suggestMessage.addEventListener("click", (event) => {
          event.preventDefault();
          get_styles();
        });

        async function get_styles() {
          try {
            let req = await fetch("/suggested");
            if (req.ok) {
              const response = await req.json();
              const styles = response.result;
              console.log("style:", styles);

              showItems(styles);
            } else {
              console.error("Error loading Hair Style(req):", error);
            }
          } catch (error) {
            console.error("Error loading Hair Style:", error);
          }
        }
        //end of get style
      } else {
        const errorText = await response.text();
        console.log("Error:", errorText);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  });

function showItems(styles) {
  let itemsTemplate = document.querySelector("#template");
  let itemsContainer = document.querySelector("#selection");
  itemsContainer.textContent = " ";
  for (let style of styles) {
    let node = itemsTemplate.content.cloneNode(true);
    let inputElement = node.querySelector("input[type='radio']");
    let labelElement = node.querySelector("label");
    // `${style.style}/${style.special}`
    inputElement.value = style.style;
    labelElement.textContent = style.style;

    itemsContainer.appendChild(node);
  }
}

document
  .querySelector("#gen_photo")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    let formObject = {
      type: form.type.value,
      color: form.color.value,
      style: form.elements.hair.value,
      path: apiPath,
    };
    console.log("logging form", form);

    const genPhotoRes = await fetch("/genPhoto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formObject }),
    });
    const response = await genPhotoRes.json();
    const [imageLink, style] = response.split(",");
    console.log("link:", imageLink);
    requestedStyle = style;

    const outputElement = document.querySelector("#result_image");
    const styleConfirmElement = document.querySelector("#style_confirm");
    outputElement.src = imageLink;
    styleConfirmElement.textContent = "You have chosen " + style + " !";

    // Generate button when the fetch request is completed
    const saveTemplate = document.querySelector("#save");
    const actionContainer = document.querySelector("#action_btn");
    const node = saveTemplate.content.cloneNode(true);
    const saveBtnElement = node.querySelector("#save_btn");
    const bookingBtnElement = node.querySelector("#booking_btn");
    saveBtnElement.textContent = "Save result to your profile !";
    bookingBtnElement.textContent = "Make an haircut appointment now !";
    // button actions of the save button
    saveBtnElement.addEventListener("click", async (event) => {
      event.preventDefault();
      let resultImage = document.querySelector("#result_image");
      let imageUrl = resultImage.src;
      console.log(imageUrl);
      if (!imageUrl) {
        console.log("No generated photo");
      }
      try {
        //fetch image to a blob from a image url
        let imageBlob = await fetch(imageUrl).then((response) =>
          response.blob()
        );
        const formData = new FormData();
        formData.append("upload_image", imageBlob, "result_image.jpg");
        formData.append("style", requestedStyle);
        console.log(imageBlob);
        console.log("requestedStyle:", requestedStyle);

        let res = await fetch("/save", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          console.log("ok", res);
          $("#staticBackdrop").modal("show");
        } else {
          console.log("fuck", res);
          // showPopup("Problem submitting message, refresh to try again.");
        }
      } catch (error) {}
    });

    //button action for the booking button
    bookingBtnElement.addEventListener("click", async (event) => {
      event.preventDefault();
      let resultImage = document.querySelector("#result_image");
      let imageUrl = resultImage.src;
      console.log(imageUrl);
      if (!imageUrl) {
        console.log("No generated photo");
        return;
      }

      try {
        // Fetch image to a blob from an image URL
        let imageBlob = await fetch(imageUrl).then((response) =>
          response.blob()
        );
        const formData = new FormData();
        formData.append("upload_image", imageBlob, "result_image.jpg");
        formData.append("style", requestedStyle);
        console.log(imageBlob);
        console.log("requestedStyle:", requestedStyle);

        let res = await fetch("/save", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          console.log("ok", res);
          // Show success message or perform any other actions
          // Redirect the user to another page
          window.location.href = "/booking-details.html";
        } else {
          console.log("fuck", res);
          // Show error message or perform any other actions
        }
      } catch (error) {
        // Handle errors
      }
    });
    //Append the buttons
    actionContainer.appendChild(node);
  });

document.getElementById("#to_profile").addEventListener("click", () => {
  window.location.href = "/home.html#headerStyle";
});

// const saveBtnElement = node.querySelector("#save_btn");

// function showPopup(message) {
//   const popup = document.querySelector("#popup");
//   const popupMessage = document.querySelector("#popup_message");
//   popupMessage.textContent = message;
//   popup.style.display = "block";
//   setTimeout(() => {
//     popup.style.display = "none";
//   }, 3000);
// }

let previewBtn = document.getElementById("#submit_request");
let previewSection = document.getElementById("#photo_container");

previewBtn.addEventListener("click", () => {
  previewSection.scrollIntoView({ behavior: "smooth" });
});
