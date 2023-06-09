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
  heading.innerHTML = `<strong>${weekArray[0].getUTCDate()} ${months[weekArray[0].getUTCMonth()]} 
            –  ${weekArray[6].getUTCDate()} ${months[weekArray[6].getUTCMonth()]}</strong> 
            ${weekArray[6].getUTCFullYear()}`
}

// updates the headings for each specific day of the week
function updateDayHeading(weekArray) {
  let today = new Date();
  let htmlString = "<thead><tr><th class=\"headcol\"></th>"
  for (let i = 0; i < 7; i++) {
    if (today.getUTCDate() === weekArray[i].getUTCDate() && today.getUTCMonth() === weekArray[i].getUTCMonth() &&
        today.getUTCFullYear() === weekArray[i].getUTCFullYear()) {
      htmlString += `<th class="today">${daysOfWeek[i]}, ${weekArray[i].getUTCDate()}</th>`
    } else {
      htmlString += `<th>${daysOfWeek[i]}, ${weekArray[i].getUTCDate()}</th>`
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

async function displayCoursesOnCalendar() {
  await fetch("/api/calendar")
      .then(response => response.json())
      .then(async data => {
        for (let i = 0; i < data.length; i++) {
          let key = `${data[i].course_id.toString()}/${data[i].quarter.toString()}`
          await fetch(`/api/courses/${key}`)
              .then (response => response.json())
              .then (data2 => {
                let courseNumber
                let meetingTime
                let meetingDays
                let classLength
                courseNumber = data2[0].course_number
                meetingDays = data2[0].meeting_days
                // Parses meeting_days string into an array
                const daysArray = ['M', 'Tu', 'W', 'Th', 'F']
                let meetingDaysArray = []
                for (let i = 0; i < daysArray.length; i++) {
                  const day = daysArray[i]
                  const exists = meetingDays.includes(day)
                  meetingDaysArray.push(exists)
                }
                meetingTime = data2[0].meeting_times
                // Calculates how long each class is in minutes
                let times = meetingTime.split("-")
                let startTime = times[0].trim()
                startTime = startTime.replaceAll(/[^a-zA-Z0-9_]/g, "").toLowerCase()
                let endTime = times[1].trim()
                endTime = endTime.replaceAll(/[^a-zA-Z0-9_]/g, "").toLowerCase()
                // Creates new date objects to easily calculate the difference in time
                let startDate = new Date(`01/01/2000 ${startTime}`)
                let endDate = new Date(`01/01/2000 ${endTime}`)
                // This calculation returns the value in milliseconds, so we have to convert it to minutes
                let timeDiff = endDate - startDate
                classLength = Math.floor(timeDiff / (1000 * 60))

                // add events to the calendar
                console.log(startTime)
                let row = document.getElementById(startTime)
                let tdElements = row.getElementsByTagName("td")
                for (let i = 0; i < meetingDaysArray.length; i++) {
                  if (meetingDaysArray[i]) {
                    let tdElt = tdElements[i+2]
                    let newElement = document.createElement("div")
                    newElement.textContent = courseNumber
                    newElement.classList.add('event')
                    newElement.classList.add('double')
                    tdElt.appendChild(newElement);
                  }
                }
              })
        }
      })
}

// Runs this immediately, sets date automatically
calculateWeek(offset)
displayCoursesOnCalendar()
