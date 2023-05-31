const form = document.getElementById('update-profile')

function fetchProfile() {
  fetch("/api/profile")
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            for (let field in data[0]) {
              document.getElementById(field).value = data[0][field]
            }
          })
        } else if (response.status === 500) {
          alert("An error occurred, please try again")
        } else if (response.status === 401 || response.status === 404) {
          alert("Please log in and retry")
        }
      })
      .catch(error => {
        console.log(error)
      })
}

form.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault()
  const formData = new FormData(event.target)
  console.log(formData)
  fetch('/api/profile/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(formData).toString()
  })
      .then(function (response) {
        if (response.ok) {
          console.log(response)
          alert("Your profile was updated")
        } else if (response.status === 401 || response.status === 403) {
          alert("Please log in and try again")
        } else if (response.status === 400) {
          alert("One or more fields are incomplete")
        } else {
          console.log("error submitting, please try again")
          alert("Your profile was not updated, please try again")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
})

fetchProfile()