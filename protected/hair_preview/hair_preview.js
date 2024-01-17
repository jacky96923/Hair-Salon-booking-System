let photoInput = document.querySelector("#upload_image");
let uploadedImage = document.querySelector("#uploaded_image");
let usernameDivElement = document.querySelector("#user_name");
let apiPath;
let requestedStyle;

async function main() {
  await getUsername();
}

uploadImageListener();
callAIListener();
genPhotoListener();
main();
async function getUsername() {
  let res = await fetch("/username");
  if (res.ok) {
    let response = await res.json();
    console.log(response);
    displayUser(response);
  }
}
function displayUser(response) {
  usernameDivElement.innerHTML = "";
  let username = response.name;
  username = username.slice(0, 1).toUpperCase() + username.slice(1);
  usernameDivElement.innerText = username;
}

function uploadImageListener() {
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
      console.log("detail:", file);
      // Update file details and display preview
      document.querySelector(
        "#submit_photo"
      ).innerHTML = `File Name: ${file.name}\nFile Size: ${file.size} bytes\nFile Type: ${file.type}`;
      // remove file button
    }
  });

  document
    .querySelector("#remove_preview")
    .addEventListener("click", (event) => {
      event.preventDefault();
      // Clear file input value and remove file details
      photoInput.removeAttribute("src");
      console.log("attribute removed");
      document.querySelector("#submit_photo").innerHTML =
        "Upload a picture of yourself";
    });
}

function callAIListener() {
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
}

function showItems(styles) {
  let itemsTemplate = document.querySelector("#template");
  let itemsContainer = document.querySelector("#selection");
  itemsContainer.textContent = " ";
  for (let style of styles) {
    let node = itemsTemplate.content.cloneNode(true);
    let inputElement = node.querySelector("input[type='radio']");
    let labelElement = node.querySelector("label");
    inputElement.value = style.style;
    labelElement.textContent = style.style;

    // Add a hover event listener to the label element
    labelElement.addEventListener("mouseenter", async () => {
      // Retrieve the style image from SQL using style.id or style.name
      // Replace 'style.id' or 'style.name' with the appropriate property
      const styleImage = await getStyleImageFromSQL(style.id);
      // Set the background image of the label element
      console.log(styleImage);
      document.querySelector("#preview_img").src =
        "../hair_preview/hair_styles/" + styleImage;
    });

    // Remove the background image when the mouse leaves the label element
    labelElement.addEventListener("mouseleave", () => {
      document.querySelector("#preview_img").src = "";
    });

    itemsContainer.appendChild(node);
  }
}

async function getStyleImageFromSQL(styleId) {
  try {
    console.log(styleId);
    const response = await fetch(`/getPreview/${styleId}`);
    if (response.ok) {
      const result = await response.json();
      imageUrl = result[0].image;
      const convertedImageUrl = imageUrl.replace(/ /g, "_");
      console.log("previewLink:", convertedImageUrl);
      return convertedImageUrl;
    } else {
      console.error("Failed to get preview");
    }
  } catch (error) {
    console.error("error getStyleImage function:", error);
  }
}

function genPhotoListener() {
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

      const wrapElement = document.querySelector("#result_wrap");
      const loadingElement = document.querySelector("#loading_img");
      wrapElement.style.display = "block";
      const genPhotoRes = await fetch("/genPhoto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formObject }),
      });
      // loadingElement.style.display = "none";

      const response = await genPhotoRes.json();
      const [imageLink, style] = response.split(",");
      console.log("link:", imageLink);
      requestedStyle = style;
      loadingElement.style.display = "none";

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
      //Append the buttons
      actionContainer.appendChild(node);
      // button actions of the save button

      //gen booking buttons
      document
        .querySelector("#save_btn")
        .addEventListener("click", async (event) => {
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
              let image_id = await res.json();
              $("#staticBackdrop").modal("show");
            } else {
              console.log("fuck", res);
              // showPopup("Problem submitting message, refresh to try again.");
            }
          } catch (error) {
            console.log("save", error);
          }
        });

      //button action for the booking button
      document
        .querySelector("#booking_btn")
        .addEventListener("click", async (event) => {
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
              let image_id = await res.json();
              window.location.href = `/booking_request/booking_request.html?id=${image_id}`;
            } else {
              console.log("fuck", res);
              // Show error message or perform any other actions
            }
          } catch (error) {
            console.log("booking", error);
          }
        });
    });
}

document.getElementById("#to_profile").addEventListener("click", () => {
  window.location.href = "/home#headerStyle";
});

// let previewBtn = document.getElementById("#submit_request");
// let previewSection = document.getElementById("#photo_container");

document.getElementById("submit_request").addEventListener("click", () => {
  document
    .getElementById("photo_container")
    .scrollIntoView({ behavior: "smooth" });
});

const typeSelect = document.querySelector("#type");
const textInput = document.querySelector("#textInput");

typeSelect.addEventListener("change", () => {
  if (typeSelect.value === "color" || typeSelect.value === "both") {
    textInput.setAttribute("required", "");
  } else {
    textInput.removeAttribute("required");
  }
});

//reset
const resetButton = document.getElementById("request_reset");

resetButton.addEventListener("click", (event) => {
  // Reset the upload form
  document.getElementById("photo_input").reset();

  // Reset the gen_photo form
  const genPhotoForm = document.getElementById("gen_photo");
  genPhotoForm.reset();
  const typeSelect = genPhotoForm.querySelector("#type");
  const textInput = genPhotoForm.querySelector("#textInput");
  typeSelect.selectedIndex = 0;
  textInput.value = "";

  // Reset other form elements or values as needed

  // Optionally, you can reset the result display elements
  document.getElementById("result_wrap").style.display = "none";
  document.getElementById("result_image").src = "";
  document.getElementById("style_confirm").textContent = "";
  uploadedImage.src = null;

  // Optionally, you can reset any other elements or states in your page

  // Prevent the form from actually submitting
  event.preventDefault();
});
