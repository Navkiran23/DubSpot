const calendar = require('../Backend/Calendar.js')
const assert = require('assert')
describe('WeekArrayContentTest', function() {
  describe('WeekArrayContent', function() {
    it('should equal to 7 days of the week', function() {
      const result = calendar.calculateWeek(0)
      assert.equal(result.length, 7)
    })
  })
})
