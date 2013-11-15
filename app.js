var express = require('express')
  , routes = require('./routes')

var app = express();
  
// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

// Routes
app.get('/', routes.index);

app.get('/requestGet', routes.doGet);	// handling a GET request 
app.post('/requestPost', routes.doPost);	// handling a POST request 
app.put('/requestPut', routes.doPut);			// handling a PUT request
app.delete('/requestDelete', routes.doDelete);      // handling a DELETE request

app.listen(3333);
console.log("Express server listening to 3333");
