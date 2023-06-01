const form = document.getElementById('submit-rating')
//Java script code to submit reviews
form.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  const formData = new FormData(event.target);
  fetch('/submit-rating', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(formData).toString()
  })
      //Sends out alerts based on error messages or successful submission
      .then(function (response) {
        if (response.ok) {
          console.log(response)
          alert("Your response was submitted");
        } else if(response.status === 401 || response.status === 403) {
            alert("Please log in and try again");
        } else {
          console.log("error submitting, please try again")
          alert("Your response was not submitted please try again");
        }
      })
      //catches console log error
      .catch(function (error) {
        console.log(error)
      })
})