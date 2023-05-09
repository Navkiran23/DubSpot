const express = require('express')
const path = require('path');
const sql = require('mssql');
const {calculateWeek} = require("./Calendar");
const {getGrades} = require("./gradeRetriever");
const {pool, getCourseStatement, getReviewsStatement, addReviewStatement} = require("./sql");

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.static('FrontEnd'));
const root = path.join(__dirname, '..');
const port = 3000;

// returns the Login page
app.get('/', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotWeb.html'))
})

// returns the Calendar page
app.get('/Calendar', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotCalendar.html'))
})

// returns the CourseFinder page
app.get('/CourseFinder', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotCourseFinder.html'))
})

// returns the Help page
app.get('/Help', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotHelp.html'))
})

// returns the About page
app.get('/About', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotAbout.html'))
})

// returns the Profile page
app.get('/Profile', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotProfile.html'))
})

// returns an array of date objects representing the 7-day week
app.get('/api/calendar/:offset', (req, res) => {
  const offset = req.params.offset
  const weekArray = calculateWeek(offset)
  res.send(weekArray)
})

// returns json about all courses
app.get('/api/courses/all', (req, res) => {
  pool.query('SELECT course_id, quarter, course_number, class_title FROM Courses ORDER BY course_number ASC', (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    // handle query results
    res.send(result.recordset)
  })
})

// returns json with information about a given courseID for the specified quarter
app.get('/api/courses/:courseID/:quarter', (req, res) => {
  const courseID = req.params.courseID
  const quarter = req.params.quarter.toString().replace("-", " ")
  getCourseStatement.execute({getCourseCourseID: courseID, getCourseQuarter: quarter}, (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    // handle query results
    res.send(result.recordset)
  })
})

// returns json of all reviews for a specific courseID
app.get('/api/reviews/:courseID', (req, res) => {
  const courseID = req.params.courseID
  getReviewsStatement.execute({getReviewsCourseID: courseID}, (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    // handle query results
    res.send(result.recordset)
  })
})

// @requires form body contains courseID, username, rating, and review
// receives post requests for rating submission and sends it to the database
app.post('/submit-rating', (req, res) => {
  const courseID = req.body.courseID
  const username = req.body.username
  const rating = req.body.rating
  const review = req.body.review
  addReviewStatement.execute({addReviewCourseID: courseID, addReviewUsername: username, rating: rating, review: review}, (err, result) => {
    if (err) {
      res.send("Error encountered. Please try again.")
      return
    }
    res.send("Thanks! Rating received.")
  })
})

// returns average gpa from DawgPath for a specified course
app.get('/api/reviews/:course_number', (req, res) => {
  const course_number = req.params.course_number.toString().replace("-", " ")
  const data = getGrades(course_number)
  res.send(data)
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})