let bookingsTbodyElement = document.querySelector("#bookings tbody")
let usernameDivElement = document.querySelector("#user_name")

let logoImage = document.querySelector("#logo_image")
logoImage.addEventListener("click", function () {
    window.location.href = "/"
})

async function main(){
    await getUsername()
    await getBookings()
}

window.onload = main()
async function getUsername(){
    let res = await fetch("/username")
    if (res.ok){
        let response = await res.json()
        console.log(response)
        displayUser(response)
    }
}

async function getBookings(bookingId){
    let res = await fetch(`/my_booking`)
    if (res.ok){
        let response = await res.json()
        console.log(response)
        displayBookings(response)
    }
}

function displayUser(response){
    usernameDivElement.innerHTML = ""
    let username = response.name
    username = username.slice(0, 1).toUpperCase() + username.slice(1)
    usernameDivElement.innerText = username
}

function displayBookings(response){
    bookingsTbodyElement.innerHTML = ""
    for (let booking of response){
        let bookingRow = document.createElement("tr")

        let th = document.createElement("th")
        th.setAttribute("scope", "row")
        th.innerText = response.indexOf(booking) + 1
        bookingRow.appendChild(th)
        let tdDate = document.createElement("td")
        tdDate.innerText = booking.bookingDate
        bookingRow.appendChild(tdDate)
        let tdTime = document.createElement("td")
        if (booking.category === "Haircut Wash Style"){
            tdTime.innerText = booking.bookingTime + "-" + String(Number(booking.bookingTime.slice(0, 2)) + 1) + ":00"
        } else if (booking.category === "Style Perming"){
            tdTime.innerText = booking.bookingTime + "-" + String(Number(booking.bookingTime.slice(0, 2)) + 3) + ":00"
        } 
        bookingRow.appendChild(tdTime)
        let tdCategory = document.createElement("td")
        tdCategory.innerText = booking.category
        bookingRow.appendChild(tdCategory)
        
        let tdDetails = document.createElement("td")
        let detailsButton = document.createElement("button")
        // console.log(booking.bookingId)
        detailsButton.setAttribute("onclick", `window.location.href = '/my_booking/booking_details.html?id=${booking.bookingId}'`)
        detailsButton.classList.add("btn", "btn-secondary")
        detailsButton.innerText = "Show Details"
        tdDetails.appendChild(detailsButton)
        
        bookingRow.appendChild(tdDetails)
        bookingsTbodyElement.appendChild(bookingRow)
    }
}