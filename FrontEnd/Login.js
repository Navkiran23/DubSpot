const loginForm = document.getElementById('login')
// Code to log in the user
loginForm.addEventListener('submit', function (event) {
  console.log("testing")
  // Prevent the default form submission behavior
  event.preventDefault();
  // Begins the process
  const formData = new FormData(event.target);
  // Sends the login credentials to the database
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(formData).toString()
  })
      // sends out alerts to help the user in case something goes wrong
      .then(function (response) {
        if (response.ok) { // login successful
          console.log(response)
          location.href = "/coursefinder";
        } else if (response.status === 403) { // incorrect email or password
          console.log("error submitting, please try again")
          alert("incorrect email or password");
        } else if (response.status === 500) { // error occurred in the backend
          console.log("try again")
          alert("try again, server issue");
        }
      })
      .catch(function (error) {
        console.log(error)
      })
})