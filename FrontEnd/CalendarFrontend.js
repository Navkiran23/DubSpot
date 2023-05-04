// const calendar = require('./Calendar.js')

// import {calculateWeek, getNewDayHeading, getNewHeading} from "../Backend/Calendar";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const buttonLeft = document.getElementById("scroll-left");
const buttonRight = document.getElementById("scroll-right");
const heading = document.getElementById("date-range");
const dayHeadings = document.getElementById("day-headings");
const todayButton = document.getElementById("today-button");

let offset = 0;

// updates the date range and the headings for the days
function updateHeading(weekArray) {
  heading.innerHTML = `<strong>${weekArray[0].getDate()} ${months[weekArray[0].getMonth()]} 
            –  ${weekArray[6].getDate()} ${months[weekArray[6].getMonth()]}</strong> 
            ${weekArray[6].getFullYear()}`
}

// updates the headings for each specific day of the week
function updateDayHeading(weekArray) {
  let today = new Date();
  let htmlString = "<thead><tr><th class=\"headcol\"></th>"
  for (let i = 0; i < 7; i++) {
    if (today.getDate() === weekArray[i].getDate() && today.getMonth() === weekArray[i].getMonth() &&
        today.getFullYear() === weekArray[i].getFullYear()) {
      htmlString += `<th class="today">${daysOfWeek[i]}, ${weekArray[i].getDate()}</th>`
    } else {
      htmlString += `<th>${daysOfWeek[i]}, ${weekArray[i].getDate()}</th>`
    }
  }
  dayHeadings.innerHTML = htmlString
}

// Convert the date strings to Date objects
function processData(data) {
  return data.map(dateString => new Date(dateString))
}

// sends api request to server and gets the current week we are on,
// then processes the data
function calculateWeek(offset) {
  fetch(`/api/calendar/${offset}`)
      .then(response => response.json())
      .then(data => {
        let weekArray = processData(data)
        updateHeading(weekArray)
        updateDayHeading(weekArray)
      })
      .catch(error => {
        console.log(error)
      })
}

// event listener for changing calendar view -1 week
buttonLeft.addEventListener("click", function() {
  offset--;
  calculateWeek(offset);
});

// event listener for changing calendar view +1 week
buttonRight.addEventListener("click", function() {
  offset++;
  calculateWeek(offset);
});

// event listener for jumping to this week's calendar view
todayButton.addEventListener("click", function() {
  offset = 0;
  calculateWeek(offset);
});

// Runs this immediately, sets date automatically
calculateWeek(offset);
