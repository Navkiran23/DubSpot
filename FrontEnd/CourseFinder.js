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
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

//Popup for the reviews
const ReviewLeaver = document.querySelector("ReviewLeaveButton");
ReviewLeaver.onclick() = ()=> {
}