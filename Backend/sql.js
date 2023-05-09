const sql = require('mssql')

// sets up MS Azure SQL server
const config = {
  user: 'dubspot',
  password: '1zjknqajkzSx',
  server: 'dubspot.database.windows.net',
  database: 'dubspot',
  encrypt: true
}

const pool = new sql.ConnectionPool(config)
const getCourseStatement = new sql.PreparedStatement(pool)
const getReviewsStatement = new sql.PreparedStatement(pool)
const addReviewStatement = new sql.PreparedStatement(pool)

pool.connect(err => {
  if (err) {
    console.log(err)
    return;
  }
  console.log('Connected to Azure SQL Database')
  // prepared statement for getting course information
  getCourseStatement.input('getCourseCourseID', sql.VarChar(100))
  getCourseStatement.input('getCourseQuarter', sql.VarChar(6))
  getCourseStatement.prepare('SELECT * FROM Courses WHERE course_id = @getCourseCourseID AND quarter = @getCourseQuarter')

  // prepared statement for getting reviews for a specific course
  getReviewsStatement.input('getReviewsCourseID', sql.VarChar(100))
  getReviewsStatement.prepare('SELECT * FROM Reviews WHERE course_id = @getReviewsCourseID')

  // prepared statement for adding a review for a specific course
  addReviewStatement.input('addReviewCourseID', sql.VarChar(100))
  addReviewStatement.input('addReviewUsername', sql.VarChar(100))
  addReviewStatement.input('rating', sql.Int)
  addReviewStatement.input('review', sql.VarChar(1000))
  addReviewStatement.prepare('INSERT INTO Reviews VALUES(@addReviewCourseID, @addReviewUsername, @rating, @review)')
})

module.exports = {
  pool,
  getCourseStatement,
  getReviewsStatement,
  addReviewStatement
}