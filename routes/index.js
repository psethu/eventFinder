var events = require("../models/mymongo.js");
var mydb = "myProducts";
var mycollection = "event";

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
	events.insert( mydb, 
	              mycollection, 
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
events.find( mydb, 
              mycollection, 
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

  	// if conditions below for the same reason I have the above if condition
  	// somehow need to get old(insert time/location/date), but for now have some string
  if (req.body.newlocation === "") {
  		req.body.newlocation = "left blank during post";
  	}
  if (req.body.newtime === "") {
  		req.body.newtime = "left blank during post";
  	}
  if (req.body.newdate === "") {
  		req.body.newdate = "left blank during post";
  	}
events.update( mydb, 
                  mycollection, 
                  {"find":{"name":req.body.oldname}, "update":{$set: {"name":req.body.newname,
                  											 		"location":req.body.newlocation,
                  											 		"time":req.body.newtime,
                  											 		"date":req.body.newdate
                  											 		}}
                  											},
                  function(model) {
							res.render('success',{title: 'Local events', obj: model});
                    }
              );
};

exports.doDelete = function(req, res){
	console.log("EXPORTS.doDELETE req.body:"+JSON.stringify(req.body));
	events.destroy(mydb, 
					mycollection,
					 {"find":{"name":req.body.name_1}},
	                  function(model) {
								res.render('success',{title: 'Local events', obj: model});
	                    }	 
					 );
};
