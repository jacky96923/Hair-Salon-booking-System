let photoInput = document.querySelector("#upload_image");
let uploadedImage = document.querySelector("#uploaded_image");
let apiPath;

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

    // const uploadRes = await fetch("/send_link", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ image: uploadRes }),
    // });
    // const uploadData = await uploadRes.json();
    // const { rePath } = uploadData;

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
    console.log("style:", style);

    const outputElement = document.querySelector("#result_image");
    const styleConfirmElement = document.querySelector("#style_confirm");
    outputElement.src = imageLink;
    styleConfirmElement.textContent = "You have chosen " + style + " !";
  });
