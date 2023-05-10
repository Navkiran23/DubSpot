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


//Popup for the reviews
//const ReviewLeaver = document.querySelector("ReviewLeaveButton");
//ReviewLeaver.onclick() = ()=> {
//Lead to the div class "container" and open it as a popup
//then take user input and put it into the comment template
//Comment_Containter/Comment-box
}

//fetch the data and put it into the table
   //     data.forEach(CourseID => {
   //         temp += "<tr>";
   //         temp += "<td>" + CourseID.CourseName + "</td>";
    //        temp += "<td>" + CourseID.CourseTitle + "</td>";
     //       temp += "</tr>"
     //       document.getElementById("data").innerHTML += temp;
     //   })
    //  })
let temp = "";
function PutDataIntoTable() {
  //fetch all the courses
  fetch("/api/courses/all")
      .then(response => response.json())
     .then(data => {
         //console.log(data);
        for (let i = 0; i < data.length; i++) {
            temp += "<tr>";
            temp += "<td>" + data[i].course_number + "</td>";
            temp += "<td>" + data[i].class_title + "</td>";
            temp += "<td>" + data[i].quarter + "</td>";
            temp += "</tr>"
            console.log(temp);
        }
         document.getElementById("data").innerHTML = temp;
     })
      .catch(error => {
        console.log(error)
      })
}

PutDataIntoTable();

//Data for sidebar
let displayString = "";
// fetch the data and display on the sidebar
function displayDataOnSidebar() {
  fetch(`/api/courses/${courseID}/${quarter}`)
    .then(response => response.json())
    .then(data => {
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

displayDataOnSidebar();
