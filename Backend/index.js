const express = require('express')
const path = require('path');
const {calculateWeek} = require("./Calendar");
const app = express()
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('FrontEnd'));
const root = path.join(__dirname, '..');

app.get('/', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotWeb.html'))
})

app.get('/Calendar', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotCalendar.html'))
})

app.get('/CourseFinder', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotCourseFinder.html'))
})

app.get('/Help', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotHelp.html'))
})

app.get('/About', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotAbout.html'))
})

app.get('/Profile', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotProfile.html'))
})

app.get('/api/calendar/:offset', (req, res) => {
  const offset = req.params.offset
  const weekArray = calculateWeek(offset)
  res.send(weekArray)
})

app.get('/api/courses/:courseID', (req, res) => {
  const courseID = req.params.courseID
  res.send("wip")
})

app.post('/submit-rating', (req, res) => {
  console.log(req.body.review)
  res.send("Thanks! Rating received.");
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})