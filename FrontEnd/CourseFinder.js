const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");

btn.onclick = ()=>{
  widget.style.display ="none";
  post.style.display ="block";
  return false;
}
post.onclick = ()=> {
  var review = document.getElementByID('textarea');
  //How to display this in a comment
  //How to get number of stars clicked!
}

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
          let key = `${data[i].course_id.toString()}/${data[i].quarter.toString()}`
          key = key.replace(" ","-")
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
    console.log(row.id)
    row.onclick = () => {
      //pass in the id into the function below to make sure there
      // is a link between the two major components of the course finder
      displayDataOnSidebar(row.id)
      displayReviews(row.id.split("/")[0])
    }
  }
}

//Data for sidebar

// fetch the data and display on the sidebar
function displayDataOnSidebar(urlString) {
  fetch(`/api/courses/${urlString}`)
    .then(response => response.json())
    .then(data => {
      let displayString = "";
      for (let i = 0; i < data.length; i++) {
        // displayString += "<div class=\"InformationDisplay\">";
        displayString += "<h2>" + data[i].class_title + "</h2>";
        // temp += "<h3>" + data[i].class_title + "</h3>";
        displayString += "<h4>" + data[i].prerequisite + "</h4>";
        displayString += "<h5>" + data[i].credits + "</h5>";
        // displayString += "</div>"
        console.log(displayString);
      }
     document.getElementById("courseinfo").innerHTML = displayString;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// fetch the data and display on the sidebar
async function displayReviews(urlString) {
  let Z = "";
  await fetch(`/api/reviews/${urlString}`)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          Z += `<div class="Commentbox">`
          Z += "<h1>" + data[i].username + "</h1>"
          Z += "<h7>" + data[i].rating + "</h7>"
          Z += "<p>" + data[i].review + "</p>"
          Z += "<div>"
        }
        document.getElementById("reviews-container").innerHTML = Z
      })
      .catch(error => {
        console.log(error)
      })
}

displayDataOnSidebar();
