const formTwo = document.getElementById('add-course')
//Code to add the course to the calendar
formTwo.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault()
  const formData = new FormData(event.target)
  fetch('/api/calendar/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // sends the data to a string
    body: new URLSearchParams(formData).toString()
  })
      //Sends out alerts to tell user if any issues occur
  .then(function (response) {
    if (response.ok) {
      console.log(response)
      alert("Class added!")
    } else if (response.status === 401 || response.status === 403) {
      alert("Please log in and try again")
    } else if (response.status === 400) {
      alert("Please select a course")
    } else {
      console.log("error submitting, please try again")
      alert("Your class was not added, please try again")
    }
  })
  .catch(function (error) {
    console.log(error)
  })
})