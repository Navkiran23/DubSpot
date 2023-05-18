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
        if (response.ok) {
          console.log(response)
        } else {
          console.log("error submitting, please try again")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
})