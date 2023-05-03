const document = require('../FrontEnd/DubspotWeb.html')

const assert = require('assert')
describe('UsernameTest', function () {
  describe('Username', function () {
    it('should return the hardcoded username', function () {
      assert.equal(document.getElementById("email").value, admin@gmail.com)
    })
  })
})