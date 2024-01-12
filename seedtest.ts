import moment from "moment";
let bookings = [{ date: "2024-01-13", time: "10:00" },
   { date: "2024-01-13", time: "12:00" },
   { date: "2024-02-09", time: "12:00" },
   { date: "2024-02-09", time: "13:00" },
   { date: "2024-02-09", time: "13:00" },
  { date: "2024-02-09", time: "15:00" }];
//console.log(moment(`${bookings[0].date} ${bookings[0].time}`, "YYYY-MM-DD hh:mm"))
let booking_datetime = bookings.map((booking)=>{
    return moment(`${booking.date} ${booking.time}`, "YYYY-MM-DD hh:mm").format("YYYY-MM-DD HH:mm")
})
console.log(booking_datetime)
// let bookings = [{ date: "2024-01-13", time: "10:00" }];
// let a = moment(
//   `${bookings[0].date} ${bookings[0].time}`,
//   "YYYY-MM-DD hh:mm"
// )
// console.log(a)
// a.add(1, 'hours')
// console.log(a)

// let startDateTime = { date: "2024-01-13", time: "10:00" }
// let momentStartDateTime = moment(`${startDateTime.date} ${startDateTime.time}`, "YYYY-MM-DD hh:mm")
// let days = 30;
// let timeslots = 11;

// for (let i = 0; i < days; i++) {
//   momentStartDateTime.add(i, 'days')
//   for (let j = 0; j < timeslots; j++) {
//     momentStartDateTime.add(j, 'hours')
//     console.log(momentStartDateTime)
//     momentStartDateTime.subtract(j, 'hours')
//   }
//   momentStartDateTime.subtract(i, 'days')
// }