const form = document.getElementById('signup')

form.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  const formData = new FormData(event.target);
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(formData).toString()
  })
      .then(function (response) {
        if (response.ok) { // signup was successful
          console.log(response)
        } else if (response.status === 400) { // The server could not understand the request due to malformed syntax or invalid parameters.
          console.log("error submitting, please fix errors")
        } else if (response.status === 403) { // incorrect email or password
          console.log("error submitting, please try again")
        } else if (response.status === 500) { // error occurred in the backend
          console.log("try again")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
})