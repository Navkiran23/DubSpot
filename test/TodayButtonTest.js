const weekArray = require('../FrontEnd/Calendar.js')
var assert = require('assert');
describe('WeekArrayContentTest', function() {
  describe('WeekArrayContent', function() {
    it('should equal to 7 days of the week', function() {
      var result = weekArray.length();
      assert.equal(weekArray.length(), 7);
    });
  });
});
