import moment from "moment";

let bookings = [{ date: "2024-01-13", time: "10:00" }];

console.log(
  moment(
    `${bookings[0].date} ${bookings[0].time}`,
    "YYYY-MM-DD hh:mm"
  ).valueOf()
);
