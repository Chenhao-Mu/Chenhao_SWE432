/**
 * Modified by Chenhao Mu at Nov.15, 2016
 */
/*npm install firebase express body-parser nodemon sentiment --save*/
/*Firebase is used here to manage databases*/
var firebase = require('firebase');
/*Express is used here to handle HTTP requests*/
var express = require('express');
/*body-parser extract the entire body portion of an 
incoming request stream and exposes it on req.body*/
var bodyParser = require('body-parser');
/*Sentiment module can perform sentiment analysis on arbitrary blocks of input text*/
var sentiment = require('sentiment');
/*Firebase initialization with service account private key*/
firebase.initializeApp({
  databaseURL: 'https://sample-project-c5c84.firebaseio.com',
  serviceAccount: 'sa_key'
});
/*Call express() to initialize express*/
var app = express();
/*Set body-parser strategy to urlencoded. This parses the body of incoming request 
as URL encoded data with the qs(https://www.npmjs.com/package/qs#readme) library*/
app.use(bodyParser.urlencoded({
    extended: true
}));
/*Serve static files such as HTML, CSS and Javascript in a directory named "public"*/
app.use(express.static('public'));
/*create a new variable that reference to the database of the project in firebase*/
var ref = firebase.database().ref().child("project-demo-1");
/*Attaching headers to all respones of all routings. They make any sites to access by 
making "Access-Control-Allow-Origin" to wildcard and "Access-Control-Allow-Headers" to 
"X-Requested-With".
More information on https://www.w3.org/wiki/CORS_Enabled */
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
/*Route method to handle HTTP Get*/
app.get("/", function(req, res) {
  res.send("Hello World");
});
/*Route method to handle HTTP Post*/
app.post('/', function (req, res) {
    /*console out the todoItems value which is in requrie body*/
    console.log(req.body.todoItems);
    /*use sentiment module to get sentiment socre of each item in todoItems*/
    var sentiments = [];
    for (var item of req.body.todoItems)
        sentiments.push(sentiment(item).score);
    /*set the sentiments scores into firebase database in a folder named "sentiments"*/
    ref.child("sentiments").set({
    	sentiments: sentiments 
    });
    /*Give response body a pair of {sentiments: scores}*/
    res.json({ sentiments: sentiments });
});

/*Set port*/
var port = process.env.PORT || 5000;
/*Set the port app listening*/
app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});




