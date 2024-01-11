// const { time } = require("console");

let selectedTimeSlot = null;

function updateTimeSlots() {
  let selectedDate = new Date(document.getElementById("date").value);
  let currentDate = new Date();
  let timeSlotsContainer = document.getElementById("time-slots");

  timeSlotsContainer.innerHTML = "";

  for (let i = 10; i <= 20; i++) {
    let timeSlot = document.createElement("div");
    timeSlot.classList.add("time-slot");
    timeSlot.innerText = i + ":00";

    if (
      selectedDate < currentDate &&
      selectedDate.toDateString() !== currentDate.toDateString()
    ) {
      timeSlot.disabled = true;
    }

    timeSlot.addEventListener("click", function () {
      if (selectedTimeSlot) {
        selectedTimeSlot.classList.remove("selected");
      }
      this.classList.add("selected");
      selectedTimeSlot = this;
    });

    timeSlotsContainer.appendChild(timeSlot);
  }
}

document.getElementById("date").addEventListener("change", updateTimeSlots);

// document
//   .querySelector(".submit")
//   .addEventListener("click", async function (event) {
//     event.preventDefault();
//     let form = event.target;
//     let formObject = {
//       category: form.category.value,
//       date: form.date.value,
//       timeslots: form.time_slots.value,
//       remarks: form.remarks.value,
//     };
//     let res = await fetch("/booking_request", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(formObject),
//     });
//     const result = await res.json();
//     if (res.ok) {
//       console.log(result);
//     } else {
//       console.error(result);
//     }
//   });
