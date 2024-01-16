let bookingDetailsDlElement = document.querySelector("#booking_details dl")
let usernameDivElement = document.querySelector("#user_name")

async function main(){
    await getUsername()
    await getBookingDetails()
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

async function getBookingDetails(){
    let res = await fetch("/booking_details")
    if (res.ok){
        let response = await res.json()
        console.log(response)
        displayBookings(response)
    }
}

function displayBookings(response){
    bookingDetailsDlElement.innerHTML = ""
    // Create elements
    const dt1 = document.createElement('dt');
    const dd1 = document.createElement('dd');
    const dt2 = document.createElement('dt');
    const dd2 = document.createElement('dd');
    const dt3 = document.createElement('dt');
    const dd3 = document.createElement('dd');
    const dt4 = document.createElement('dt');
    const dd4 = document.createElement('dd');
    const dt5 = document.createElement('dt');
    const dd5 = document.createElement('dd');
    if (response.imageFilename){
        const img = document.createElement('img');
    }

    // Set class names
    dt1.className = 'col-sm-3';
    dd1.className = 'col-sm-9';
    dt2.className = 'col-sm-3';
    dd2.className = 'col-sm-9';
    dt3.className = 'col-sm-3';
    dd3.className = 'col-sm-9';
    dt4.className = 'col-sm-3 text-truncate';
    dd4.className = 'col-sm-9';

    // Set text content
    dt1.textContent = 'Haircut Style:';
    dd1.textContent = response.category;
    dt2.textContent = 'Date:';
    dd2.textContent = response.bookingDate;
    dt3.textContent = 'Time:';
    if (response.category === "Haircut Wash Style"){
        dd3.textContent = response.bookingTime + "-" + String(Number(response.bookingTime.slice(0, 2)) + 1) + ":00"
    } else if (response.category === "Style Perming"){
        dd3.textContent = response.bookingTime + "-" + String(Number(response.bookingTime.slice(0, 2)) + 3) + ":00"
    } 
    dt4.textContent = 'Remarks:';
    dd4.textContent = response.remarks;
    dt5.textContent = 'Your desired style:';
    
    if (response.imageFilename){
        dd5.textContent = response.imageStyle
        img.alt = 'Your desired style image';
    
        // Set attribute
        img.src = response.imageFilename;
    }

    // Append elements to the document
    const container = document.getElementById('container'); // Assuming there's a container element in your HTML where these elements should be added
    container.appendChild(dt1);
    container.appendChild(dd1);
    container.appendChild(dt2);
    container.appendChild(dd2);
    container.appendChild(dt3);
    container.appendChild(dd3);
    container.appendChild(dt4);
    container.appendChild(dd4);
    container.appendChild(dt5);
    container.appendChild(dd5);
    dd5.appendChild(img);
}

function displayUser(response){
    usernameDivElement.innerHTML = ""
    let username = response.name
    username = username.slice(0, 1).toUpperCase() + username.slice(1)
    usernameDivElement.innerText = username
}