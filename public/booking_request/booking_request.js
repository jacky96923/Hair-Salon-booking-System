let selectedTimeSlot = null;

// Display timeslots for P/C after selection of users
let category = document.querySelector("select[name=category]");
let selectedCategory = category.options[category.selectedIndex].value;
let bookingDateElement = document.getElementById("date");
//console.log(moment().format("YYYY-MM-DD"));
let bookingDate = bookingDateElement.value;
bookingDate = moment().format("YYYY-MM-DD");
//console.log(category)

category.addEventListener("change", async (event) => {
  if (selectedCategory && bookingDate) {
    let res = await fetch("/booking_timeslot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: selectedCategory, date: bookingDate }),
    });
    if (res.ok) {
      let { category, bookingDate, rosterBooking } = await res.json();
    }
  } else {
    return;
  }
});

updateTimeSlots();
function updateTimeSlots() {
  let selectedDate = new Date(bookingDate);
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  console.log(currentHour);
  let timeSlotsContainer = document.getElementById("time-slots");

  // ask for this date's all time slots

  timeSlotsContainer.innerHTML = "";
  if (category === "Haircut Wash Style") {
    for (let i = 10; i <= 20; i++) {
      let timeSlot = document.createElement("button");
      timeSlot.classList.add("time-slot");
      // timeSlot.setAttribute("disabled", true);
      timeSlot.innerText = i + ":00" + " - " + (i + 1 + ":00");
      timeSlot.id = i + ":00";
    }
  } else if (category === "Style Perming") {
    for (let i = 10; i <= 18; i++) {
      let timeSlot = document.createElement("button");
      timeSlot.classList.add("time-slot");
      // timeSlot.setAttribute("disabled", true);
      timeSlot.innerText = i + ":00" + " - " + (i + 3 + ":00");
      timeSlot.id = i + ":00";
    }
  }

  let timeSlots = timeSlotsContainer.querySelectorAll(".time-slot");
  timeSlots.forEach((timeSlot, index, array) => {
    // Disable outdated timeslots
    if (
      selectedDate < currentDate &&
      selectedDate.toDateString() !== currentDate.toDateString()
    ) {
      timeSlot.disabled = true;
    }

    if (i <= currentHour && selectedDate < currentDate) {
      timeSlot.disabled = true;
    }

    // Disable & color booked timeslots
    if (category === "Haircut Wash Style") {
      if (timeSlot.id === rosterBooking.bookingTime) {
      }
    } else if (category === "Style Perming") {
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

    timeSlotsContainer.appendChild(timeSlot);
  });
}

bookingDateElement.addEventListener("change", updateTimeSlots);

async function submitRequestForm(event) {
  event.preventDefault();
  let form = event.target;
  let formObject = {
    category: form.category.value,
    date: form.date.value,
    timeSlots: document.querySelector(".selected").id,
    remarks: form.remarks.value,
  };
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
