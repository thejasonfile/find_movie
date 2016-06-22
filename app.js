var express = require("express"),
    app = express(),
    request = require("request"),
    bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
   var query = req.query.search;
   var url = "http://www.omdbapi.com/?s=" + query;
   request(url, function(error, response, body){
      if(!error && response.statusCode === 200) {
          var data = JSON.parse(body);
          res.render("results", {data:data});
      } 
   });
});

app.get("/details", function(req, res){
});

app.listen (process.env.PORT, process.env.IP, function(){
    console.log("Find_Movie app has started.");
});