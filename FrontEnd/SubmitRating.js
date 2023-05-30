const form = document.getElementById('submit-rating')

form.addEventListener('submit', function (event) {
  console.log("testing")
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
      .catch(function (error) {
        console.log(error)
      })
})