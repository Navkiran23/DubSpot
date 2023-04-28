const buttonLeft = document.getElementById("scroll-left");
const buttonRight = document.getElementById("scroll-right");
const heading = document.getElementById("date-range");
const dayHeadings = document.getElementById("day-headings");

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

let offset = 0;

function calculateWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 6 ? 7 : 1) + (offset * 7)));
    let weekArray = [new Date(monday)];
    for (let i = 0; i < 6; i++) {
        weekArray.push(new Date(monday.setDate(monday.getDate() + 1)));
    }
    return weekArray;
}

buttonLeft.addEventListener("click", function() {
    offset--;
    let weekArray = calculateWeek();
    heading.innerHTML = `<strong>${weekArray[0].getDate()} ${months[weekArray[0].getMonth()]} 
            –  ${weekArray[6].getDate()} ${months[weekArray[6].getMonth()]}</strong> 
            ${weekArray[6].getFullYear()}`;
});

buttonRight.addEventListener("click", function() {
    offset++;
    let weekArray = calculateWeek();
    heading.innerHTML = `<strong>${weekArray[0].getDate()} ${months[weekArray[0].getMonth()]} 
            –  ${weekArray[6].getDate()} ${months[weekArray[6].getMonth()]}</strong> 
            ${weekArray[6].getFullYear()}`;
});

// Runs this immediately, sets date automatically
let weekArray = calculateWeek();
heading.innerHTML = `<strong>${weekArray[0].getDate()} ${months[weekArray[0].getMonth()]} 
        –  ${weekArray[6].getDate()} ${months[weekArray[6].getMonth()]}</strong> 
        ${weekArray[6].getFullYear()}`;