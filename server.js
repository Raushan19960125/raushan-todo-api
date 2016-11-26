var app   = require('express')();
var bodyParser = require("body-parser");
var _ = require('underscore');

var PORT = process.env.PORT || 3000;
var book = [];
var bookNextId = 1;
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
    
app.get('/', function(req, res){
    res.send('ToDo API Root');
});
app.get('/book/:id', function(req, res){
    var bookId = parseInt(req.params.id, 10);
    var matchedBook = _.findWhere(book, {id: bookId});

    if(matchedBook){
        res.json(matchedBook);
    }else{
        res.status(404).send();
    }
});
// GET /book
app.get('/book', function(req, res){
    res.json(book);
});
app.post('/book',function(req,res){ 
    var body = req.body;
    var bookname = req.body.bookname;
    var authorname = req.body.authorname;
    var price = req.body.price;
    var data = {
        "error":1,
        "Books":""

    }
    body.id = bookNextId++;
    book.push(body);
    res.json(body);

});
app.delete('/book/:id',function(req,res){
  var bookId = parseInt(req.params.id,10);
    var matchedBook = _.findWhere(book, {id: bookId});

    if(!matchedBook){
        res.status(404).json({"error": "no book found with that id"});
    }else{
        book = _.without(book, matchedBook);
        res.json(matchedBook);
    }
});

app.listen(PORT,function(){
    console.log("Connected & Listen to port" + PORT);
});