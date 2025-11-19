const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".row .seat:not(.occupied)");
let count = document.getElementById("count");
let total = document.getElementById("total");

const movieSelected = document.getElementById("movie");
let moviePrice = movieSelected.value;

populateUI();

function updateSeatsAndPrice(){
    const seats = document.querySelectorAll(".row .seat.selected");
    let seatsSelected = seats.length;
    count.innerText = seatsSelected;
    total.innerText = seatsSelected * moviePrice;
    let seatArr = [...seats].map((seat) => [...allSeats].indexOf(seat));
    
    localStorage.setItem("seletedSeats", JSON.stringify(seatArr));
    
}

function populateUI(){
    let selectedseats = JSON.parse(localStorage.getItem("seletedSeats"));
    // console.log("Selected seats: ",selectedseats, " all seats: ", allSeats);
    selectedseats.forEach(index => {
        allSeats[index].className = "seat selected";
    });
    movieSelected.selectedIndex = localStorage.getItem("movieName");
    moviePrice = localStorage.getItem("moviePrice");
}

updateSeatsAndPrice();

movieSelected.onchange = (e) => {
    moviePrice = e.target.value;
    updateSeatsAndPrice();
    localStorage.setItem("movieName", e.target.selectedIndex);
    localStorage.setItem("moviePrice", moviePrice);
}

container.onclick = (e) => {
    if(e.target.classList.contains("seat") &&
        !(e.target.classList.contains("occupied"))){
        e.target.classList.toggle('selected');
    }
    updateSeatsAndPrice();
}