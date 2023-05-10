async function getGrades(course) {
  let api_string = "https://dawgpath.uw.edu/api/v1/courses/details/"
  api_string += course
  let total = 0
  let total_grades = 0
  await fetch(api_string)
      .then(response => {
        console.log(response)
           response.json()}
      )
      .then(data => {
          console.log(data)
          for (let i = 0; i < data.gpa_distro.length; i++) {
            total += data.gpa_distro[i].gpa * data.gpa_distro[i].count
            total_grades += data.gpa_distro[i].count
          }
          total = total/total_grades
          console.log(total)
      })
  return total
}

module.exports = {
    getGrades: getGrades
}
