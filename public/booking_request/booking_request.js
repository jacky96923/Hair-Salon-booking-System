// const { time } = require("console");

let selectedTimeSlot = null;

console.log(moment().format("YYYY-MM-DD"));
document.getElementById("date").value = moment().format("YYYY-MM-DD");
updateTimeSlots();
function updateTimeSlots() {
  let selectedDate = new Date(document.getElementById("date").value);
  let currentDate = new Date();
  let timeSlotsContainer = document.getElementById("time-slots");

  // ask for this date's all time slots
  ///for each time interval, ask database if available of cut or perm

  timeSlotsContainer.innerHTML = "";

  for (let i = 10; i <= 20; i++) {
    let timeSlot = document.createElement("button");
    timeSlot.classList.add("time-slot");
    // timeSlot.setAttribute("disabled", true);
    timeSlot.innerText = i + ":00" + " - " + (i + 1 + ":00");

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

document
  .querySelector("#booking-request-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let form = event.target;
    let formObject = {
      category: form.category.value,
      date: form.date.value,
      timeSlots: document.querySelector(".selected").textContent,
      remarks: form.remarks.value,
    };

    console.log("check form data", formObject);
    // let res = await fetch("/booking_request", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(formObject),
    // });
    // const result = await res.json();
    // if (res.ok) {
    //   console.log(result);
    //   location.href = "/";
    // } else {
    //   console.error(result);
    // }
  });
