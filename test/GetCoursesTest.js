const assert = require('assert')

describe('GetCoursesTest', function() {
  describe('get all courses', function() {
    it('should return at least 2 courses', async function () {
      let result
      await fetch(`https://dubspot.azurewebsites.net/api/courses/all`)
          .then(response => response.json())
          .then(data => {
            result = data
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            assert.ok(result.length >= 2)
          })
    })

    it('should have non null course ids and quarter', async function () {
      let result
      await fetch(`https://dubspot.azurewebsites.net/api/courses/all`)
          .then(response => response.json())
          .then(data => {
            result = data
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            for (let course of result) {
              assert.ok(course.course_id !== null)
              assert.ok(course.quarter !== null)
            }
          })
    })

    it('should not have undefined course ids and quarter', async function () {
      let result
      await fetch(`https://dubspot.azurewebsites.net/api/courses/all`)
          .then(response => response.json())
          .then(data => {
            result = data
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            for (let course of result) {
              assert.ok(course.course_id !== undefined)
              assert.ok(course.quarter !== undefined)
            }
          })
    })

    it('should not have 2 courses with the same courseID and quarter', async function () {
      let result
      let courseSet = new Set()
      await fetch(`https://dubspot.azurewebsites.net/api/courses/all`)
          .then(response => response.json())
          .then(data => {
            result = data
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            for (let course of result) {
              let key = course.course_id.toString() + course.quarter.toString()
              assert.ok(!courseSet.has(key))
              courseSet.add(key)
            }
          })
    })
  })

  describe('get one course', function() {
    it('should return only one course', async function () {
      let result
      await fetch(`https://dubspot.azurewebsites.net/api/courses/3f2804ee-24e3-48bb-aa87-6b12cc919a87/AU-23`)
          .then(response => response.json())
          .then(data => {
            result = data
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            assert.ok(result.length === 1)
          })
    })

    it('should have non null course id and quarter', async function () {
      let result
      await fetch(`https://dubspot.azurewebsites.net/api/courses/3f2804ee-24e3-48bb-aa87-6b12cc919a87/AU-23`)
          .then(response => response.json())
          .then(data => {
            result = data
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            assert.ok(result[0].course_id !== null)
            assert.ok(result[0].quarter !== null)
          })
    })

    it('should not have undefined course id and quarter', async function () {
      let result
      await fetch(`https://dubspot.azurewebsites.net/api/courses/3f2804ee-24e3-48bb-aa87-6b12cc919a87/AU-23`)
          .then(response => response.json())
          .then(data => {
            result = data
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            assert.ok(result[0].course_id !== undefined)
            assert.ok(result[0].quarter !== undefined)
          })
    })
  })
})
