let usernameDivElement = document.querySelector("#user_name");
let logoImage = document.querySelector("#logo_image")

logoImage.addEventListener("click", function () {
  window.location.href = "/"
})

async function main() {
  await getUsername();
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
function displayUser(response) {
  usernameDivElement.innerHTML = "";
  let username = response.name;
  username = username.slice(0, 1).toUpperCase() + username.slice(1);
  usernameDivElement.innerText = username;
}

let selectedTimeSlot = null;

// Display timeslots for P/C after selection of users
let categoryElement = document.querySelector("select[name=category]");
let bookingDateElement = document.getElementById("date");

let selectedCategory =
  categoryElement.options[categoryElement.selectedIndex].value;
let bookingDate = null;

function getValue() {
  selectedCategory =
    categoryElement.options[categoryElement.selectedIndex].value;
  bookingDate = bookingDateElement.value;
  console.log(bookingDate);
  if (bookingDate != "") {
    //console.log("converting");
    bookingDate = moment(bookingDate).format("YYYY-MM-DD");
  }
}

async function getTimeSlots() {
  let res = await fetch("/booking_timeslot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: selectedCategory, date: bookingDate }),
  });
  if (res.ok) {
    let result = await res.json();
    console.log(result);
    updateTimeSlots(result);
  }
}
// async function getPhoto(){
//   const res = await fetch("/getPhoto")
// }

categoryElement.addEventListener("change", async (event) => {
  getValue();

  if (selectedCategory && bookingDate) {
    await getTimeSlots();
  } else {
    return;
  }
});

bookingDateElement.addEventListener("change", async (event) => {
  getValue();

  if (selectedCategory && bookingDate) {
    await getTimeSlots();
  } else {
    return;
  }
});

// updateTimeSlots();
function updateTimeSlots(result) {
  let selectedDate = new Date(bookingDate);
  console.log("bookingDate", bookingDate);

  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  console.log(currentHour);
  let timeSlotsContainer = document.getElementById("time-slots");

  // ask for this date's all time slots
  //console.log("hihihihi");
  timeSlotsContainer.innerHTML = "";
  if (selectedCategory === "Haircut Wash Style") {
    for (let i = 10; i <= 20; i++) {
      let timeSlot = document.createElement("button");
      timeSlot.classList.add("time-slot");
      // timeSlot.setAttribute("disabled", true);
      timeSlot.innerText = i + ":00" + " - " + (i + 1 + ":00");
      timeSlot.id = i + ":00";
      timeSlotsContainer.appendChild(timeSlot);
    }
  } else if (selectedCategory === "Style Perming") {
    for (let i = 10; i <= 18; i++) {
      let timeSlot = document.createElement("button");
      timeSlot.classList.add("time-slot");
      // timeSlot.setAttribute("disabled", true);
      timeSlot.innerText = i + ":00" + " - " + (i + 3 + ":00");
      timeSlot.id = i + ":00";
      timeSlotsContainer.appendChild(timeSlot);
    }
  }

  let timeSlots = timeSlotsContainer.querySelectorAll(".time-slot");
  timeSlots.forEach((timeSlot, index) => {
    // Disable outdated timeslots
    // if (
    //   selectedDate < currentDate &&
    //   selectedDate.toDateString() !== currentDate.toDateString()
    // ) {
    //   timeSlot.disabled = true;
    // }

    // if (currentHour <= currentHour + 1 && selectedDate < currentDate) {
    //   timeSlot.disabled = true;
    // }

    // Disable booked timeslots
    // console.log(timeSlot.id, result.rosterBooking[index]);
    //console.log(result.rosterBooking[index].bookingStatus)
    if (result.rosterBooking[index].bookingStatus != true) {
      timeSlot.disabled = true;
    }

    // Enable selection of timeslot
    timeSlot.addEventListener("click", function (e) {
      e.preventDefault();
      if (selectedTimeSlot) {
        selectedTimeSlot.classList.remove("selected");
      }
      this.classList.add("selected");
      selectedTimeSlot = this;
      //console.log(selectedTimeSlot)
    });
  });
}

bookingDateElement.addEventListener("change", getTimeSlots);

async function submitRequestForm(event) {
  event.preventDefault();
  let form = event.target;
  let formObject = {
    category: form.category.value,
    date: form.date.value,
    timeSlots: document.querySelector(".selected").id,
    remarks: form.remarks.value,
    image_id: null,
  };
  if (photoId) {
    formObject.image_id = photoId;
  }
  console.log("check form data", formObject);
  let res = await fetch("/booking_request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formObject),
  });

  const result = await res.json();
  if (res.ok) {
    console.log(result);
    location.href = "/my_booking/my_booking.html";
  } else {
    console.error(result);
  }
}

let reset = document.querySelector(".reset");
reset.addEventListener("click", function () {
  window.location.href = "/booking_request/booking_request.html";
});

const searchParams = new URLSearchParams(location.search);
const photoId = searchParams.get("id");



renderImage();

async function renderImage() {
  const noImg = document.querySelector(".noImg");
  let photos = await getStyleImg(photoId);
  console.log("photos", photos);
  let styleImg = document.getElementById("styleImg");
  if (photoId) {
    noImg.remove();
    for (let photo of photos) {
      let img = document.createElement("img");
      img.src = "/" + photo.filename;
      console.log("request:", photo.filename);

      styleImg.appendChild(img);
    }
  } else {
    styleImg.remove();
  }
}

async function getStyleImg(id) {
  const res = await fetch(`/getStyleImg?id=${id}`, {
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
  return photos;
}
