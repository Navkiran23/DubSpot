const calendar = require('../Backend/Calendar.js')
const assert = require('assert')

// upper bound for difference between server response's date and function's date
const bound = 1000;

describe('CalendarAPITest', function() {
  describe('offset = 0', function() {
    it('should return 7 days of the current week', async function () {
      let result
      const weekArray = calendar.calculateWeek(0)
      await fetch(`http://localhost:3000/api/calendar/0`)
          .then(response => response.json())
          .then(data => {
            result = data.map(dateString => new Date(dateString))
          })
          .catch(error => {
            console.log(error)
          })
      for (let i = 0; i < weekArray.length; i++) {
        assert.ok(weekArray[i] - result[i] < bound)
      }
    })
  })

  describe('offset = 1', function() {
    it('should return 7 days of the next week', async function () {
      let result
      const weekArray = calendar.calculateWeek(1)
      await fetch(`http://localhost:3000/api/calendar/1`)
          .then(response => response.json())
          .then(data => {
            result = data.map(dateString => new Date(dateString))
          })
          .catch(error => {
            console.log(error)
          })
      for (let i = 0; i < weekArray.length; i++) {
        assert.ok(weekArray[i] - result[i] < bound)
      }
    })
  })

  describe('offset = -1', function() {
    it('should return 7 days of the past week', async function () {
      let result
      const weekArray = calendar.calculateWeek(-1)
      await fetch(`http://localhost:3000/api/calendar/-1`)
          .then(response => response.json())
          .then(data => {
            result = data.map(dateString => new Date(dateString))
          })
          .catch(error => {
            console.log(error)
          })
      for (let i = 0; i < weekArray.length; i++) {
        assert.ok(weekArray[i] - result[i] < bound)
      }
    })
  })

  describe('offset fuzzy test', function() {
    it('should return correct 7 days of a given week', async function () {
      for (let fuzz = 0; fuzz < 10; fuzz++) {
        const min = -10;
        const max = 10;
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        let result
        const weekArray = calendar.calculateWeek(random)
        await fetch(`http://localhost:3000/api/calendar/${random}`)
            .then(response => response.json())
            .then(data => {
              result = data.map(dateString => new Date(dateString))
            })
            .catch(error => {
              console.log(error)
            })
        for (let i = 0; i < weekArray.length; i++) {
          assert.ok(weekArray[i] - result[i] < bound)
        }
      }
    })
  })
})
