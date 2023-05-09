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
        } else {
          console.log("error submitting, please try again")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
})