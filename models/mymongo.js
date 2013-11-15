var util = require("util");
var mongoClient = require("mongodb").MongoClient;
var server = "mongodb://localhost:27017/";

//db/:collection/:operation/:document
var doError = function (e) {
	util.debug("ERROR: "+e);
	throw new Error(e);
	}

// INSERT
exports.insert = function(database, collection, query, callback) {
  mongoClient.connect(server+database, function(err, db) {
    if (err) doError(err);
    db.collection(collection).insert(query, {safe:true}, function(err, crsr) {
      callback(crsr);
  		});
  	});
  }
				
// FIND
exports.find = function(database, collection, query, callback) {
  console.log("database name in GET method: "+database);
  mongoClient.connect(server+database, function(err, db) {
    if (err) doError(err);
    console.log("GET query is " + JSON.stringify(query));
    var crsr = db.collection(collection).find(query);
      crsr.toArray(function(err, docs) {
        if (err) doError(err);
        callback(docs);
        });
  		});
  	}

// UPDATE
exports.update = function(database, collection, query, callback) {
  console.log("POST method, database name: "+database);
  console.log("POST query is: "+JSON.stringify(query));
  console.log("POST query.find is: "+JSON.stringify(query.find));
  console.log("POST collection is: "+collection);
  // NOTE: JSON.parse only accepts type string?
  mongoClient.connect(server+database, function(err, db) {
    if (err) doError(err);
    console.log("POST query.find is: "+JSON.stringify(query.find));
    console.log("POST query.update is: "+JSON.stringify(query.update));
    //console.log("\n CAME to error in update method of mymongo.js, but why?? \n");
    console.log("db.collection(collection): "+db.collection(collection))

    db.collection(collection).update(JSON.parse(JSON.stringify(query.find)),
                                      JSON.parse(JSON.stringify(query.update)), 
                                      {new:true}, 
                                      function(err, crsr) {
                                        if (err) doError(err);
                                        callback('Update successful on event: '+JSON.stringify(query.find));
                                      });
  	});
  }

  // DESTROY
exports.destroy = function(database, collection, query, callback) {
mongoClient.connect(server+database, function(err, db) {
    if (err) doError(err);
      console.log("DELETE query.find is: "+JSON.stringify(query.find));
      db.collection(collection).findAndRemove(
                                JSON.parse(JSON.stringify(query.find)),
                                [['name', 1]], 
                                function(err, doc) {if (err) doError(err);
                                    callback('Remove successful on event: '+JSON.stringify(query.find));
                                  });
});
}
