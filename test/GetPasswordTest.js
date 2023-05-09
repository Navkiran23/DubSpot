// const document = require('../FrontEnd/DubspotWeb.html')

const assert = require('assert')
describe('PasswordTest', function () {
  describe('Password', function () {
    it.skip('should return the hardcoded password', function () {
      assert.equal(document.getElementById("password").value, "admin")
    })
  })
})