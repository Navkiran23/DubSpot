const addCourseButton = document.getElementById('add-course');

addCourseButton.addEventListener('click', function() {
  let rows = document.getElementById("myTable").rows
  for (let row of rows) {
    row.onclick = () => {
      let courseId = row.id.split("/")[0]
      let quarter = row.id.split("/")[1]
      document.getElementById("addCourseID").value = courseId
      document.getElementById("addCourseQuarter").value = quarter
    }
  }
  console.log('Button clicked!');
});

async function displayCoursesOnCalendar() {
  await fetch ("/api/calendar")
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          let class_name
          let meeting_time
          let meeting_days

          let key = `${data[i].course_id.toString()}/${data[i].quarter.toString()}`
          fetch(`/api/courses/${key}`)
              .then (response => response.json())
              .then (data2 => {
                class_name = data2.course_number
                meeting_days = data2.meeting_days
                meeting_time = data2.meeting_times
              })
        }
      })
}