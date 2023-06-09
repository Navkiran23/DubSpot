// Code to populate the course finder

// Constants to use later on to help with getting data
const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");
const button = document.querySelector("ReviewLeaveButton");

//Filter table Javascript
function myFunction() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue
  input = document.getElementById("myInput")
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable")
  tr = table.getElementsByTagName("tr")

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0]
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = ""
      } else {
        tr[i].style.display = "none"
      }
    }
  }
}

let temp = "";
async function PutDataIntoTable() {
  //fetch all the courses
  await fetch("/api/courses/all")
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          let key = `${data[i].course_id.toString()}/${data[i].quarter.toString()}/${data[i].course_number.toString()}`
          key = key.replace(" ","-")
          // Creates the string that will be used to put in each row into the table
          temp += `<tr id="${key}">`
          temp += "<td>" + data[i].course_number + "</td>"
          temp += "<td>" + data[i].class_title + "</td>"
          temp += "<td>" + data[i].quarter + "</td>"
          temp += "</tr>"
        }
        document.getElementById("data").innerHTML = temp
     })
      .catch(error => {
        console.log(error)
      })
}

function attachOnClicksToRows() {
  let rows = document.getElementById("myTable").rows;
  for (let row of rows) {
    row.onclick = () => {
      //pass in the id into the function below to make sure there
      // is a link between the two major components of the course finder
      let courseId = row.id.split("/")[0]
      let quarter = row.id.split("/")[1]
      let courseName = row.id.split("/")[2]
      // Displays all information into the sidebar
      displayDataOnSidebar(`${courseId}/${quarter}`).then(() => {
        document.getElementById("reviewCourseID").value = courseId
        document.getElementById("addCourseID").value = courseId
        document.getElementById("addCourseQuarter").value = quarter
        document.getElementById("addCourseName").value = courseName
      })
    }
  }
}

// fetch the data and display on the sidebar
async function displayDataOnSidebar(urlString) {
  await fetch(`/api/courses/${urlString}`)
    .then(response => response.json())
    .then(data => {
      let displayString = "";
      for (let i = 0; i < data.length; i++) {
        // Creates the tags to display information
        displayString += "<h2>" + data[i].class_title + "</h2>"
        displayString += "<h4>"+ "Prerequisite: " + data[i].prerequisite + "</h4>"
        displayString += "<h5>" + "Credits: " + data[i].credits + "</h5>"
        let gpa = data[i].average_gpa
        if (gpa === "undef") {
          gpa = "N/A"
        }
        displayString += "<h5>" + "Average GPA: " + gpa + "</h5>";
        displayString += "<h5>" + "Course Description: " + data[i].course_description + "</h5>"
        displayString += "<br>" + " " + "</br>"
        displayString += "<h10>" + "Reviews" + "</h10>"
        let courseId = urlString.split("/")[0]
        // fetches the reviews from the database to display
        fetch(`/api/reviews/${courseId}`)
            .then(response => response.json())
            .then(data => {
              for (let i = 0; i < data.length; i++) {
                displayString += "<h7>" + data[i].username + "</h7>"
                displayString += "<h8>" + " " + data[i].rating + "</h8>"
                displayString += "<h8>" + data[i].review + "</h8>"
                displayString += "<br>" + " " + "</br>"
              }
              document.getElementById("courseinfo").innerHTML = displayString;
            })
            .catch(error => {
              console.log(error)
            })
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function attachOnClicksToStars() {
  // Uses the star forms to send in the ratings
  const starWidget = document.querySelector('.star-widget');
  const starLabels = starWidget.getElementsByClassName('fa-star');
  for (let starLabel of starLabels) {
    const starRating = starLabel.getAttribute('for').split("-")[1]
    starLabel.onclick = () => {
      document.getElementById("rating").value = starRating
    }
  }
}

// Calls the functions to actually populate the database
PutDataIntoTable().then(r => {
  attachOnClicksToRows()
  attachOnClicksToStars()
});
