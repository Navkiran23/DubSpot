const loginForm = document.getElementById('login')

loginForm.addEventListener('submit', function (event) {
  console.log("testing")
  // Prevent the default form submission behavior
  event.preventDefault();
  const formData = new FormData(event.target);
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(formData).toString()
  })
      .then(function (response) {
        if (response.ok) { // login successful
          console.log(response)
          location.href = "/calendar";
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