let selectedTimeSlot = null;

function updateTimeSlots() {
  let selectedDate = new Date(document.getElementById("date").value);
  let currentDate = new Date();
  let timeSlotsContainer = document.getElementById("time-slots");

  timeSlotsContainer.innerHTML = "";

  for (let i = 10; i <= 20; i++) {
    let timeSlot = document.createElement("button");
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
