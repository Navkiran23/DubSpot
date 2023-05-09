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

pool.connect(err => {
  if (err) {
    console.log(err)
    return;
  }
  console.log('Connected to Azure SQL Database')
})

// prepared statement for getting course information
const getCourseStatement = new sql.PreparedStatement(pool)
getCourseStatement.input('courseID', sql.VarChar(100))
getCourseStatement.input('quarter', sql.VarChar(6))
getCourseStatement.prepare('SELECT * FROM Courses WHERE course_id = @courseID AND quarter = @quarter')

// prepared statement for getting reviews for a specific course
const getReviewsStatement = new sql.PreparedStatement(pool)
getReviewsStatement.input('courseID', sql.VarChar(100))
getCourseStatement.input('quarter', sql.VarChar(6))
getReviewsStatement.prepare('SELECT * FROM Reviews WHERE course_id = @courseID AND quarter = @quarter')

// prepared statement for adding a review for a specific course
const addReviewStatement = new sql.PreparedStatement(pool)
addReviewStatement.input('courseID', sql.VarChar(100))
addReviewStatement.input('username', sql.VarChar(100))
addReviewStatement.input('rating', sql.Int)
addReviewStatement.input('review', sql.VarChar(1000))
addReviewStatement.prepare('INSERT INTO Reviews VALUES(@courseID, @username, @rating, @review)')

module.exports = {
  pool,
  getCourseStatement,
  getReviewsStatement,
  addReviewStatement
}