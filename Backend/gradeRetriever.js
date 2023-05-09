
function getGrades(course) {
    let api_string = "https://dawgpath.uw.edu/api/v1/courses/details/";
    api_string = api_string.append(course)
    let total = 0
    let total_grades = 0
    fetch(api_string)
        .then(response => response.json)
        .then(data => {
            for (let i = 0; i < data.gpa_distro.length; i++) {
                total += data.gpa_distro[i].gpa * data.gpa_distro[i].count
                total_grades += data.gpa_distro[i].count
            }
            total = total/total_grades
            console.log(total)
        })
}

module.exports = {
    getGrades: getGrades
}
