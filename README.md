#Sample project of SWE432
This sample project is deployed on Heroku.  
Either use  
`http://immense-wave-28265.herokuapp.com/lecture7Demo1-heroku.html`  
Or   
`https://chenhao-mu.github.io/Chenhao_SWE432/public/lecture7Demo1-heroku.html`   
to access.
##Set up Heroku

##Set up firebase with Heroku

##Using Jasmine with node.js
We know Jasmine is very useful to test app at front end. It can also be used in backend testing node.js codes.  
1. we need add a package jasmine-node into the file package.json.  
`npm install jasmine-node --save`  
2. we need to use a package request which can execute some http calls in jasmine spec files.  
`npm install request --save`  
3. settng up npm's test command to run Jasmine specs.  
`mkdir spec`  
Then put the following command into package.json file.   
  `"scripts": {
    "test": "./node_modules/.bin/jasmine-node spec"
  },`  
4. write test files in directory spec. We can use request npm package to send http request to server to test (Like Jquery/AJAX does in javascript). For example:  
`describe("Hello World Server", function() {`  
  `describe("GET /", function() {`  
    `it("returns status code 200", function(done) {`  
      `request.get(base_url, function(error, response, body) {`  
        `expect(response.statusCode).toBe(200);`  
        `done();`  
      `}); }); }); });`   
      This example tests if the GET request from fornt-end to back-end server will get the status code 200 (success).  
5. After writting spec code for testing server. start the server(locally using  `npm start`) and run `npm test` to run all the Jasmine tests.

  
