/*npm install jasmine-node request --save*/

/*Use request module to mock send http requst in Jasmine*/
var request = require("request");
/*change ths url if different*/
var base_url = "http://127.0.0.1:5000"

/*Test HTTP Get*/
describe("Hello World Server", function() {
  describe("GET /", function() {
    /*Test if will return status code 200 which means connected succefully*/
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    /*Test if the server will return "hello world" in Get route*/
    it("returns Hello World", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toBe("Hello World");
        done();
      });
    });
  });
});
/*Test HTTP Post*/
describe("Post data into firebase", function() {
  describe("POST /", function() {
    /*Test if will return status code 200 which means connected succefully*/
    it("returns status code 200", function(done) {
      request.post({url: base_url, form: {todoItems: '0'}}, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    /*Test if the server will return '0' in Post route after sending '0' to it*/
    it("returns 0 if input 0", function(done) {
      request.post({url: base_url, form: {todoItems: '0'}}, function(error, response, body) {
        var bb = JSON.parse(body);
        expect(bb.sentiments[0]).toBe(0);
        done();
      });
    });
  });
});