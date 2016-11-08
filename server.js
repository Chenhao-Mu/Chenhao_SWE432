/**
 * Created by tlatoza on 9/19/16.
 */
var firebase = require('firebase');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sentiment = require('sentiment');

firebase.initializeApp({
  databaseURL: 'https://sample-project-c5c84.firebaseio.com',
  serviceAccount: 'sa_key'
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
var ref = firebase.database().ref().child("project-demo-1");

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.post('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    console.log(req.body.todoItems);
    var sentiments = [];
    for (var item of req.body.todoItems)
        sentiments.push(sentiment(item).score);
    ref.child("sentiments").set({
    	sentiments: sentiments 
    });
    console.log("saved to firebase");
    res.json({ sentiments: sentiments });
});
var port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});


// npm install express body-parser nodemon sentiment --save


