const buttonLeft = document.getElementById("scroll-left");
const buttonRight = document.getElementById("scroll-right");
const heading = document.getElementById("date-range");
const dayHeadings = document.getElementById("day-headings");
const todayButton = document.getElementById("today-button");

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

let offset = 0;

// returns an array of 7 consecutive-day Date() objects, ranging from Sun-Sat, and int offset weeks
// from the current week, or int offset + 1 weeks from the current week if it is currently Sat.
function calculateWeek() {
    let today = new Date();
    const dayOfWeek = today.getDay();
    const sunday = new Date(today.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 6 ? 7 : 0) + (offset * 7)));
    let weekArray = [new Date(sunday)];
    for (let i = 0; i < 6; i++) {
        weekArray.push(new Date(sunday.setDate(sunday.getDate() + 1)));
    }
    return weekArray;
}

// updates the date range and the headings for the days
function updateHeading(weekArray) {
    heading.innerHTML = `<strong>${weekArray[0].getDate()} ${months[weekArray[0].getMonth()]} 
            –  ${weekArray[6].getDate()} ${months[weekArray[6].getMonth()]}</strong> 
            ${weekArray[6].getFullYear()}`;
    let today = new Date();
    let htmlString = "<thead><tr><th class=\"headcol\"></th>";
    for (let i = 0; i < 7; i++) {
        if (today.getDate() === weekArray[i].getDate() && today.getMonth() === weekArray[i].getMonth() &&
                today.getFullYear() === weekArray[i].getFullYear()) {
            htmlString += `<th class="today">${daysOfWeek[i]}, ${weekArray[i].getDate()}</th>`;
        } else {
            htmlString += `<th>${daysOfWeek[i]}, ${weekArray[i].getDate()}</th>`;
        }
    }
    dayHeadings.innerHTML = htmlString;
}

// event listener for changing calendar view -1 week
buttonLeft.addEventListener("click", function() {
    offset--;
    let weekArray = calculateWeek();
    updateHeading(weekArray);
});

// event listener for changing calendar view +1 week
buttonRight.addEventListener("click", function() {
    offset++;
    let weekArray = calculateWeek();
    updateHeading(weekArray);
});

todayButton.addEventListener("click", function() {
    offset = 0;
    let weekArray = calculateWeek();
    updateHeading(weekArray);
});

// Runs this immediately, sets date automatically
let weekArray = calculateWeek();
updateHeading(weekArray);