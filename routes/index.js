var events = require("../models/mymongo.js");

exports.index = function(req, res) {
  res.render('index', {title: 'MongoDB Test'})
};

/*
PUT, GET, POST, DELETE http methods for Events
*/
exports.doPut = function(req, res){
  //events.push(req.body.inputString);
  // input is an array where each element is an attribute of an Event
  var input = req.body.input_1
	events.insert( "myProducts", 
	              "event", 
	              {"name": input[0], 
	              	"location":input[1], 
	              	"time":input[2],
	              	 "date":input[3]},
	              function(model) {
	              	// below directs to event.ejs since doing res.render ('event', ...)
	                res.render('event', {title: 'Local events', obj: model});
	                }
	              );
  //res.send(200, 'Student ' + req.body.inputString + ' added!');
};

exports.doGet = function(req, res){
	// for get need to do req.query
	console.log("exports.doGet, req query is: " + req.query.name_1);
events.find( "myProducts", 
              "event", 
              {"name" : req.query.name_1},
              function(model) {
              	// below directs to event.ejs since doing res.render ('event', ...)
					res.render('event',{title: 'Local events', obj: model});
                }
              );
};


exports.doPost = function(req, res){

  console.log("req.body:"+JSON.stringify(req.body));
  /* MUST do below so that if 'To Name' field is blank, browser does not think that the user wants
  	change a name 'Bhangra' to '' (the empty stirng)
  	*/
  if (req.body.newname === "") {
  		req.body.newname = req.body.oldname;
  	}
  	// same idea as above for below if conditions

events.update( "myProducts", 
                  "event", 
                  {"find":{"name":req.body.oldname}, "update":{$set: {"name":req.body.newname,
                  											 		"time":req.body.newtime}
                  												} 
                  											},
                  function(model) {
							res.render('success',{title: 'Local events', obj: model});
                    }
              );
};

exports.doDelete = function(req, res){
	console.log("EXPORTS.doDELETE req.body:"+JSON.stringify(req.body));
	events.destroy("myProducts", 
					"event",
					 {"find":{"name":req.body.name_1}},
	                  function(model) {
								res.render('success',{title: 'Local events', obj: model});
	                    }	 
					 );
};
