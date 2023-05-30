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
          alert("signup was successful");
          location.href = "/calendar";
        } else if (response.status === 400) { // The server could not understand the request due to malformed syntax or invalid parameters.
          console.log("error submitting, please fix errors")
          alert("The server could not understand the request due to malformed syntax or invalid parameters.");
        } else if (response.status === 403) { // incorrect email or password
          console.log("error submitting, please try again")
          alert("incorrect email or password");
        } else if (response.status === 500) { // error occurred in the backend
          console.log("try again")
          alert("error occurred in the backend");
        }
      })
      .catch(function (error) {
        console.log(error)
      })
})