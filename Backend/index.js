const express = require('express')
const path = require('path');
const {calculateWeek} = require("./Calendar");
const app = express()
const port = 3000;

app.use(express.json());
app.use(express.static('FrontEnd'));
const root = path.join(__dirname, '..');

// set up connection to MS Azure database
const sql = require('mssql');

const config = {
  user: 'your-username',
  password: 'your-password',
  server: 'your-server-name.database.windows.net',
  database: 'your-database-name',
  encrypt: true
};

const pool = new sql.ConnectionPool(config);

pool.connect(err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Connected to Azure SQL Database');

  // Your SQL queries go here
});

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

// returns an array of date objects representing the 7 day week
app.get('/api/calendar/:offset', (req, res) => {
  const offset = req.params.offset
  const weekArray = calculateWeek(offset)
  res.send(weekArray)
})

// returns json about given courseID, or a list of all courses if courseID == "all"
app.get('/api/courses/:courseID', (req, res) => {
  const courseID = req.params.courseID
  if (courseID === "all") {
    res.send("returns all courses")
  } else {
    res.send("wip")
  }
})

app.get('/api/reviews/:courseID', (req, res) => {
  const courseID = req.params.courseID
  res.send('test')
})

// receives post requests for rating submission and sends it to the database
app.post('/submit-rating', (req, res) => {
  console.log(req.body.review)
  console.log(req.body.rating)
  res.send("Thanks! Rating received.");
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})