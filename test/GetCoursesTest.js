const assert = require('assert')

describe('GetCoursesTest', function() {
  describe('get all courses', function() {
    it('should return at least 2 courses', async function () {
      let result
      await fetch(`http://localhost:3000/api/courses/all`)
          .then(response => response.json())
          .then(data => {
            result = data
          })
          .catch(error => {
            console.log(error)
          })
      assert.ok(result.length >= 2)
    })

    it('should have non null course ids and quarter', async function () {
      let result
      await fetch(`http://localhost:3000/api/courses/all`)
          .then(response => response.json())
          .then(data => {
            result = data
          })
          .catch(error => {
            console.log(error)
          })
      for (let course of result) {
        assert.ok(course.courseID !== null)
        assert.ok(course.quarter !== null)
      }
    })

    it('should not have 2 courses with the same courseID and quarter', async function () {
      let result
      let courseSet = new Set()
      await fetch(`http://localhost:3000/api/courses/all`)
          .then(response => response.json())
          .then(data => {
            result = data
            for (let course of data) {
              let key = course.courseID.toString() + course.quarter.toString()
              assert.ok(!courseSet.has(key))
              courseSet.add(key)
            }
          })
          .catch(error => {
            console.log(error)
          })
    })
  })

  describe('get one course', function() {
    it('should return only one course', async function () {
      let result
      await fetch(`http://localhost:3000/api/courses/3f2804ee-24e3-48bb-aa87-6b12cc919a87/AU-23`)
          .then(response => response.json())
          .then(data => {
            result = data
          })
          .catch(error => {
            console.log(error)
          })
      assert.ok(result.length === 1)
    })

    it('should have non null course id and quarter', async function () {
      let result
      await fetch(`http://localhost:3000/api/courses/3f2804ee-24e3-48bb-aa87-6b12cc919a87/AU-23`)
          .then(response => response.json())
          .then(data => {
            result = data
          })
          .catch(error => {
            console.log(error)
          })
      assert.ok(result[0].courseID !== null)
      assert.ok(result[0].quarter !== null)
    })
  })
})
