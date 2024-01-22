let bookingDetailsDlElement = document.querySelector("#booking_details dl");
let usernameDivElement = document.querySelector("#user_name");
const searchParams = new URLSearchParams(location.search);
const bookingId = searchParams.get("id");

async function main() {
  await getUsername();
  await getBookingDetails(bookingId);
}

window.onload = main();
async function getUsername() {
  let res = await fetch("/username");
  if (res.ok) {
    let response = await res.json();
    console.log(response);
    displayUser(response);
  }
}

async function getBookingDetails(bookingId) {
  let res = await fetch(`/booking_details?id=${bookingId}`);
  if (res.ok) {
    let response = await res.json();
    console.log(response);
    displayBookings(response);
  }
}

function displayBookings(response) {
  bookingDetailsDlElement.innerHTML = "";
  // Create elements
  const dt1 = document.createElement("dt");
  const dd1 = document.createElement("dd");
  const dt2 = document.createElement("dt");
  const dd2 = document.createElement("dd");
  const dt3 = document.createElement("dt");
  const dd3 = document.createElement("dd");
  const dt4 = document.createElement("dt");
  const dd4 = document.createElement("dd");
  const dt5 = document.createElement("dt");
  const dd5 = document.createElement("dd");

  // Set class names
  dt1.className = "col-sm-3";
  dd1.className = "col-sm-9";
  dt2.className = "col-sm-3";
  dd2.className = "col-sm-9";
  dt3.className = "col-sm-3";
  dd3.className = "col-sm-9";
  dt4.className = "col-sm-3 text-truncate";
  dd4.className = "col-sm-9";

  // Set text content
  dt1.textContent = "Haircut Style:";
  dd1.textContent = response.category;
  dt2.textContent = "Date:";
  dd2.textContent = response.bookingDate;
  dt3.textContent = "Time:";
  if (response.category === "Haircut Wash Style") {
    dd3.textContent =
      response.bookingTime +
      "-" +
      String(Number(response.bookingTime.slice(0, 2)) + 1) +
      ":00";
  } else if (response.category === "Style Perming") {
    dd3.textContent =
      response.bookingTime +
      "-" +
      String(Number(response.bookingTime.slice(0, 2)) + 3) +
      ":00";
  }
  dt4.textContent = "Remarks:";
  dd4.textContent = response.remarks;

  // Append elements to the document
  bookingDetailsDlElement.appendChild(dt1);
  bookingDetailsDlElement.appendChild(dd1);
  bookingDetailsDlElement.appendChild(dt2);
  bookingDetailsDlElement.appendChild(dd2);
  bookingDetailsDlElement.appendChild(dt3);
  bookingDetailsDlElement.appendChild(dd3);
  bookingDetailsDlElement.appendChild(dt4);
  bookingDetailsDlElement.appendChild(dd4);

  if (response.imageFilename) {
    const img = document.createElement("img");
    img.alt = "Your desired style image";
    // Set attribute
    img.src = "/" + response.imageFilename;

    dt5.className = "col-sm-3";
    dd5.className = "col-sm-9";

    dt5.textContent = "Your desired style:";
    dd5.textContent = response.imageStyle
      .split(" ")
      .map((word) => {
        return word.slice(0, 1).toUpperCase() + word.slice(1, word.length);
      })
      .join(" ");

    dd5.appendChild(img);
    bookingDetailsDlElement.appendChild(dt5);
    bookingDetailsDlElement.appendChild(dd5);
  } else {
    dt5.className = "col-sm-3";
    dd5.className = "col-sm-9";
    dt5.textContent = "Your desired style:";
    dd5.textContent = "No specific style desired";
    bookingDetailsDlElement.appendChild(dt5);
    bookingDetailsDlElement.appendChild(dd5);
  }
}

function displayUser(response) {
  usernameDivElement.innerHTML = "";
  let username = response.name;
  username = username.slice(0, 1).toUpperCase() + username.slice(1);
  usernameDivElement.innerText = username;
}
