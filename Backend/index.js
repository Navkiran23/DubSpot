const express = require('express')
const path = require('path')
const sql = require('mssql')
const bcrypt = require('bcrypt');
const session = require('express-session')
const {calculateWeek} = require("./Calendar")
const {
  pool,
  getCourseStatement,
  getReviewsStatement,
  addReviewStatement,
  createAccountStatement,
  loginAccountStatement,
  findPlannedClassesStatement,
  updateProfilePageStatement,
  fetchProfileInfoStatement,
  getUsernameStatement
} = require("./sql")

/**
 * Entry file for Dubspot server. Powered by Express.js and handles all routes to Dubspot's domain.
 * @type {*|Express}
 */

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static('FrontEnd'))
const root = path.join(__dirname, '..')
const port = process.env.PORT || 3000

app.use(session({
  secret: 'can-i-put-anything-here?',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Enable secure cookies (requires HTTPS)
    httpOnly: true, // Disallow cookie access from client-side JavaScript
    maxAge: 2 * (24 * 60 * 60 * 1000) // days cookie is valid
  }
}))

// -------------------------------------
// ---------Login/Signup--------------------
// -------------------------------------

// returns the Login page
app.get('/', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubspotWeb.html'))
})

/**
 * Handles post request for account signups, and updates SQL database if signup was successful
 * with their email, username, and hashed password
 * @requires form body contains email, username, and password
 * @params email must be 100 or less chars
 * @params username must be 100 or less chars
 * @params password must be 144 or less varbinary
 * @modifies session.userId
 * @modifies SQL database with new account info
 */
app.post('/signup', (req, res) => {
  const { email, username, password } = req.body
  if (email === undefined || username === undefined || password === undefined) {
    res.status(400).send('Signup failed. One or more fields are empty.')
    return
  } else if (email.length > 100 || username.length > 100 || password.length > 100) {
    res.status(400).send('Signup failed. One or more fields exceeded allowed length.')
    return
  }

  // check if account with email already exists
  loginAccountStatement.execute({loginAccountEmail: email}, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error encountered while attempting to create account. Please try again.")
      return
    }
    // handle query results. if account found with email, stop account creation
    if (result.recordset.length !== 0) {
      res.status(400).send('Signup failed. Account with email already exists.')
      return
    }

    // hash password
    const saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.error('Error generating salt:', err)
        res.status(500).send("Error encountered while attempting to create account. Please try again.")
      } else {
        // Hash the plaintext password using the generated salt
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            console.error('Error hashing password:', err)
            res.status(500).send("Error encountered while attempting to create account. Please try again.")
          } else {
            const hashBuffer = Buffer.from(hash, 'utf8')
            // create account in the database
            createAccountStatement.execute({createAccountEmail: email, createAccountUsername: username, createAccountPassword: hashBuffer}, (err, result) => {
              if (err) {
                console.log(err)
                res.status(500).send("Error encountered while attempting to create account. Please try again.")
                return
              }
              req.session.userId = email
              res.send("Thanks! Signup received.")
            })
          }
        })
      }
    })
  })
})

/**
 * Handles post request for account login and verifies against the database that password is correct
 * @requires form body contains email and password
 * @params email must be 100 or less chars
 * @params password must be 144 or less varbinary
 * @modifies session.userId
 */
app.post('/login', (req, res) => {
  const { email, password } = req.body
  if (email === undefined || password === undefined) {
    res.status(400).send('Login failed. One or more fields are empty.')
    return
  } else if (email.length > 100 || password.length > 100) {
    res.status(400).send('Login failed. One or more fields exceeded allowed length.')
    return
  }

  // retrieve account
  loginAccountStatement.execute({loginEmail: email}, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error encountered while attempting to log in. Please try again.")
      return
    }
    // handle query results. if account not found, respond with error
    if (result.recordset.length !== 1) {
      res.status(404).send('Login failed. Account not found.')
      return
    }
    const hashedPassword = Buffer.from(result.recordset[0].password).toString('utf8')
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err)
        res.status(500).send('An error occurred. Please try again.')
      } else if (result) {
        console.log('Password is correct')
        req.session.userId = email
        res.send('Login Successful.')
      } else {
        console.log('Password is incorrect')
        res.status(403).send('Login failed. Password was incorrect.')
      }
    })
  })
})

// -------------------------------------
// ---------Calendar--------------------
// -------------------------------------

// returns the Calendar page
app.get('/Calendar', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotCalendar.html'))
})

/**
 * returns the user's planned courses
 * @requires user is logged in
 * @returns a json list of json objects containing information about the user's planned courses
 *  includes "course_id", "quarter", and "activity_id"
 */
app.get('/api/calendar', (req, res) => {
  console.log(req.session.userId)
  if (req.session.userId !== undefined) {
    const email = req.session.userId
    findPlannedClassesStatement.execute({findPlannedEmail: email}, (err, result) => {
      if (err) {
        res.status(500).send("Error encountered while retrieving courses. Please try again.")
        console.log(err)
        return
      }
      res.send(result.recordset)
    })
  } else {
    res.status(401).send('Unauthorized.')
  }
})

// returns an array of date objects representing the 7-day week
app.get('/api/calendar/:offset', (req, res) => {
  const offset = req.params.offset
  const weekArray = calculateWeek(offset)
  res.send(weekArray)
})

// -------------------------------------
// ---------CourseFinder--------------------
// -------------------------------------

// returns the CourseFinder page
app.get('/CourseFinder', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotCourseFinder.html'))
})

/**
 * returns json data about all courses offered
 * @returns json about all courses, formatted as a list of objects. Each object has schema:
 *          {
 *          "course_id":"2a94a8e8-66d8-4c03-9da1-ac1e32e5e171",
 *          "quarter":"AU 23",
 *          "course_number":"CSE 121",
 *          "class_title":"Introduction to Computer Programming I"
 *          }
 */
app.get('/api/courses/all', (req, res) => {
  pool.query('SELECT course_id, quarter, course_number, class_title FROM Courses ORDER BY course_number ASC', (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    // handle query results
    res.send(result.recordset)
  })
})

/**
 * returns json data about the specified course and quarter offered
 * @params courseID
 * @params quarter
 * @returns json with information about a given courseID for the specified quarter, formatted
 *          as a list with one object. Each object has schema:
 *          {
 *          "course_id":"2a94a8e8-66d8-4c03-9da1-ac1e32e5e171",
 *          "quarter":"AU 23",
 *          "id":"20234:CSE:121:B,BD",
 *          "instructor":"Miya Kaye Natsuhara",
 *          "class_title":"Introduction to Computer Programming I",
 *          "course_number":"CSE 121",
 *          "prerequisite":null,
 *          "credits":"4",
 *          "level":100,
 *          "meeting_days":"WF",
 *          "meeting_times":"11:30 AM - 12:20 PM",
 *          "gen_ed_req":"RSN,NSc",
 *          "average_gpa":"3.1",
 *          "course_description":"Introduction to computer programming..."
 *          }
 */
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

/**
 * @returns json of all reviews for a specific courseID
 */
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

/**
 * receives post requests for rating submission and sends it to the database
 * @requires form body contains courseID, rating, and review
 * @requires user must be logged in
 */
app.post('/submit-rating', (req, res) => {
  const courseID = req.body.courseID.toString()
  const email = req.session.userId
  const rating = parseInt(req.body.rating)
  const review = req.body.review.toString()
  let username
  if (email === undefined) {
    res.status(401).send('Unauthorized')
    return
  }
  getUsernameStatement.execute({getUsernameEmail: email}, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error encountered. Please try again.")
      return
    }
    if (result.recordset.length === 0) {
      res.status(404).send("Account not found. Please reauthenticate.")
      return
    }
    username = result.recordset[0].username
    addReviewStatement.execute({addReviewCourseID: courseID, addReviewUsername: username, rating: rating, review: review}, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send("Error encountered. Please try again.")
        return
      }
      res.send("Thanks! Rating received.")
    })
  })
})

// -------------------------------------
// ---------Profile--------------------
// -------------------------------------

// returns the Profile page
app.get('/Profile', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotProfile.html'))
})

/**
 * returns profile information about the user
 * @requires user is logged in
 * @returns json object with user information
 */
app.get('/api/profile', (req, res) => {
  const email = req.session.userId
  if (email === undefined) {
    res.status(401).send('Unauthorized')
    return
  }
  fetchProfileInfoStatement.execute({fetchProfileEmail: email}, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error encountered. Please try again.")
      return
    }
    if (result.recordset.length === 0) {
      res.status(404).send("Account not found. Please reauthenticate.")
      return
    }
    res.send(result.recordset)
  })

})

/**
 * Handles post request for profile information update.
 * @requires user must be signed in
 */
app.post('/api/profile/update', (req, res) => {
  console.log(req.body)
  const major = req.body.major
  const standing = req.body.standing
  const username = req.body.username
  const email = req.session.userId
  console.log(username, major, standing, email)
  if (email === undefined) {
    res.status(401).send('Unauthorized')
    return
  }
  if (major === undefined || standing === undefined || username === undefined) {
    res.status(400).send('One or more fields were incomplete')
    return
  }
  updateProfilePageStatement.execute({updateMajor: major.toString(), updateStanding: standing.toString(), updateUsername: username.toString(), updateProfileEmail: email}, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error encountered. Please try again.")
      return
    }
    res.send("Profile updated.")
  })
})

// -------------------------------------
// ---------Misc--------------------
// -------------------------------------

// returns the Help page
app.get('/Help', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotHelp.html'))
})

// returns the About page
app.get('/About', (req, res) => {
  res.sendFile(path.join(root, 'FrontEnd', 'DubSpotAbout.html'))
})

/* feature delayed for now
// returns average gpa from DawgPath for a specified course
app.get('/api/gpa/:courseNumber', async (req, res) => {
  const course_number = req.params.courseNumber.toString().replace("-", " ")
  const data = await getGrades(course_number)
  res.send(data)
})
 */

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})