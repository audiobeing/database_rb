

/// Dependencies 

var mongo=require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/database", {native_parser:true});
var ObjectId = require('mongodb').ObjectID; 
var WebSocket = require('ws');
var osc = require('osc');
var fs = require('fs');
var assert = require('assert'); 




// Set up websocket connection with Max's ws server (ws object in Max) -- Hacked version of Graham's ws code
var wsocket; 
var connected = false;
var connectTask;
var wscount = 0; 

function ws_connect() {
	if (connected) return;
   
        console.log('Connecting');
        var host = "localhost"; //querystring.host || "localhost";
        var port =  "8080"; //querystring.port || "8080";
        var address = "ws://" + host + ":" + port + "/";
        wsocket = new WebSocket(address);
        wsocket.onopen = function(ev) {        
            console.log('CONNECTED to ' + address);
            connected = true;
            // cancel the auto-reconnect task:
//             if (connectTask != undefined) clearInterval(connectTask);
            // apparently this first reply is necessary
            var message = 'db initiate';
            console.log(message+ " now");
            wsocket.send(message);
        };

        wsocket.onclose = function(ev) {
            console.log('DISCONNECTED from ' + address);
            connected = false;
            // set up an auto-reconnect task:
            //connectTask = setInterval(ws_connect, 1000);
        };

        wsocket.onmessage = function(ev) {
        var n = JSON.parse(ev.data); 
        var c = 0; 
        console.log('message type: '+n.type); 
//         	console.log(typeof(n.type)+ "  :  "+n.type); 
        	//// load initial db_ui
        	if(n.type == "initiate"){
        		initiate(); 
        		c=1; 
        		console.log('ws recieved initiate request'); 
        	}
        	//// send to db
        	if(n.type == "db"){
        		console.log("adding to db")
        		post(ev.data);
        		wscount = wscount+1; 
        		c=1; 
//         	send(ev.data); 
        	// send('ws send : ' + wscount); 
        	} 
        	//// query db
        	if(n.type == "query"){
        			if(n.arg == "mongodb"){
						console.log("querying db with mongoskin code"); 
						mongoQuery(n.mongodb); 
        			c=1; 
        			}
        			else {
						console.log("querying db with development presents"); 
						querydb(n.arg); 
					c=1; 
					}
        	} 
        	if(n.type == "analysis"){
        		console.log("updating db with analysis"); 
        		analysisUpdate(n);
        		c=1;  
        		console.log(n.analysis); 
        	} 
        	if(n.type == "utc"){
        		console.log(ev.data.utc); 
        		c=1; 
        	} 
        	if(c==0) {console.log('error: type not understood. Currently only db, query, and analysis are functional')}
        };
        wsocket.onerror = function(ev) {
            console.log("WebSocket error");
        };
}

function send(msg) {
	if(wsocket != undefined) wsocket.send(msg);
// 	post(msg);
}
ws_connect(); 


////////// UPDATE DB WITH ANALYSIS
function analysisUpdate(data){
console.log('updating '+data._id);
// console.log(data); 
	db.collection('database0').update({"_id": new ObjectId(data._id)}, {$set : {analysis:data.analysis}}, 
		function(err, result){
			if (err) throw err; 
			console.log(typeof(result)); 
			console.log('update complete'); 
			send('db updated with analysis'); 
		}
	); 
}

////////// initiate: GET COUNT OF DB & SEARCHABLE KEYS
var in_count; 

function initiate(){
get_id; 
get_query_keys; 
setTimeout(function(){console.log('1 second later')}, 1000);  
}
function get_id(){
	db.collection('database0').find().sort({ges_id:-1}).limit(1).toArray(function(err,doc){
		console.log('getting count '+doc.length ); 
		if(doc.length>0){
			for(var i=0; i<doc.length; i++){
				var c = doc[i].ges_id; 
				maxDict.cnt = c; 
				console.log("the count of the db is "+c); 
				console.log(c); 
// 				console.log(maxDict); 
// 				writeJson_initiate(); 
				send('initiate_return initiate');
			}
		}else{console.log('database is empty'); maxDict.cnt = 0}
	});

}

function get_query_keys(){
	db.collection('state').find({'name':'query_items'}).toArray(function(err,doc){
		if(doc.length==0){
			var m = 'no searchable keys - add gestures to database'; 
			console.log(m); send(m); 
// 			console.log(doc); 
		}
		else{
		
			maxDict.keys = doc[0].keys; 
			// console.log(maxDict);
		
		}; 
	}); 
}
////////////////// QUERY DATABASE WITH MONGOSKIN CODE

function mongoQuery(q){
console.log(q); 
// 	eval(q+".toArray(function(err,doc){ if(doc != null){for(var i=0; i<doc.length; i++) {var name = doc[i].name;console.log(JSON.stringify(doc[i].name)); maxDict[name] = doc[i];};}; writeJson();}); "); 
		//console.log(q); 
// console.log(typeof(q) +'first run'); 
var p = q.replace(/["]+/g, ''); 

// console.log(q.replace(/["]+/g, ''));
	eval(p); 
	}

/////////////// QUERY DATABASE WITH DEVELOPMENT PRESETS
var maxDict = {}; 
function querydb(x) {
	var c0 = 0; 
	console.log(x); 
	/// retrieve full database
	if(x == 0){
		db.collection('database0').find().toArray(function(err,doc){
			if(doc != null){
				for(var i=0; i<doc.length; i++) {
					var name = doc[i].name;
					console.log(JSON.stringify(doc[i].name)); 
					maxDict[name] = doc[i]; 
					
// 					console.log(doc[i].data); 
// 					console.log(doc+"   :   this"); 
// 					maxDict.returning['ges_'+i] = doc[i]; 
// 					console.log(maxDict+"  :  this is the dict that max should receive"); 
// 					console.log("the doc in the array function is a "+typeof(doc)); 
				};
			}; 
// 			console.log(maxDict);  
			writeJson();
		}); 
	}; 	
	// retrieve filtered documents with cf average over -1 (arbitrary) no data 
	if(x == 1) {
		console.log('1'); 
	db.collection('database0').aggregate(
		[
		 {$project: {cfavg: {$avg: "$data.cf"},audio: "$audio"}},{$match:{cfavg: {$gt:100}}},{$sort: {_id: 1}}
		], function(err, d){
			console.log(typeof(d) + "  :  " + d); 
		 	d.forEach(function(cv,i,a){
				maxDict['ges_'+i] = cv; 
				console.log(maxDict+"  :  this is the dict that max should receive"); 
				console.log("the doc in the array function is a "+typeof(doc)); 
		 	}); 
		 	console.log('send to max');
		 	writeJson();  
		 });
	}; 
	/// retrieve filtered documents with cf average over -1 (arbitrary) includes cf data
	if(x == 2) {
		console.log('1'); 
		var datab; 
	db.collection('database0').aggregate(
		[
		{$project: {cfavg: {$avg: "$data.cf"},cf: "$data.cf", audio: "$audio"}},
		{$match:{cfavg: {$gt:100}}},{$sort: {_id: 1}}
		], function(err, d){
		 	console.log(d); 
		 	d.forEach(function(cv,i,a){
				maxDict['ges_'+i] = cv; 
				console.log(maxDict+"  :  this is the dict that max should receive"); 
				console.log("the doc in the array function is a "+typeof(doc)); 
		 	}); 
		 	console.log('send to max');
		 	writeJson();  
		});
	} 
}
/// write JSON file
function writeJson(){
	fs.writeFile('dbQuery.json', JSON.stringify(maxDict), function (err) {
	// dbQuery.json used to be test.json
	  if (err) return console.log(err);
	  console.log('dbQuery.json written here');		  
		});
	maxDict = {}; 
	send('read dbQuery.json');
}
function writeJson_initiate(){
	fs.writeFile('dbQuery.json', JSON.stringify(maxDict), function (err) {
	// dbQuery.json used to be test.json
	  if (err) return console.log(err);
	  console.log('dbQuery.json written by writeJson_initiate()');		  
		});
	maxDict = {}; 
	send('read_initiate dbQuery.json');
}

////////// POST TO DATABASE
// filter out known messages 
function post(msg) {
	if(msg == "Connecting" || msg == "CONNECTED to ws://localhost:8080/" || msg == "SENT: hello from browser"){} 
	else {
		var t = JSON.parse(msg); 
		console.log(t.data+" msg.data"); 
		if(t.data!=null){
		post0(msg) 
		}else{
		var mess = 'data not captured'; 
		console.log(mess); send(mess); 
		}
	}; 
	// either remove "tbd" or set up session naming convention in JS
}
// send to database 
function post0(dict) {
	var d = Date.now();
	var dd = new Date(); 
	if(dict == "string"){topost = JSON.parse(dict)}
	else {
		if(typeof(dict) === 'object'){dict = JSON.stringify(dict)}; 
		 
		topost = JSON.parse(dict);
		topost.time_entered = d; 
		topost.date = dd; 
		// console.log(typeof(topost.time[0])); 
		topost.time[0] = Math.floor(Number(topost.time[0])*1000);
		// console.log(topost.time[0]); 
		topost.time[1] = Math.floor(Number(topost.time[1])*1000);
// 		console.log(topost.time);
		}; 
		
		///// format and naming conventions need to be decided upon
	db.collection('database0').insert(topost, function(err, result) {
//	db.collection('database0').insert({time_entered: JSON.parse(d),date_entered: dd, data:topost}, function(err, result) {
   		if (err) throw err;
    	if (result) console.log(topost.name+' was added!');
    });
  //  console.log(postCount+" : "+d); 
   // postCount = postCount+1; 
    send(topost.name+' was added!'); 
    update_query_keys(dict); 
}
function update_query_keys(dict){
	//if(dict=="string"){dict = JSON.parse(dict)}
	// console.log(dict); 
	dict=JSON.parse(dict); 
	var k0 = Object.keys(dict); 
	console.log(k0); 
	var k1 = Object.keys(dict.data); 
	console.log(k1); 
	if(dict.analysis!=null){
	var k2 = Object.keys(dict.analysis);
	}else{var k2 = []}
	var k3;  
	if(dict.data!=null){
		var index = k0.indexOf('data'); 
		if(index>-1){k0.splice(index,1)}
		
	} else(console.log('no data array')); 
	if(dict.analysis!=null){console.log('deal with analysis')}; 
	if(k1!=null){k0=k0.concat(k1)}; 
	console.log(k0 + "should include k1"); 
	if(k2!=null){k0=k0.concat(k2)}; 
	var q_items; 
	var topost = {'name': 'query_items', 'keys': k0}; 
	console.log('items being posted '+ k0); 
		db.collection('state').find({'name' : 'query_items'}).toArray(function(err,doc){
			console.log(JSON.stringify(doc)); 
			if(doc.length==0){
				db.collection('state').insert(topost, function(err,result){
					if(err) throw err; 
					if (result) console.log('keys added'); 
				}); 
			}
		else{
			if(doc[0].keys.length>0){console.log('duplicate query_items file in db');}
			q_items = doc[0].keys; 
			console.log(doc[0].keys + "    existing query keys");  
			for(var i=0; i<k0.length; i++){
				// console.log(q_items.indexOf(k0[i])); 
				if(q_items.indexOf(k0[i])==-1){ 
				//q_items.push(k0); 
				var m = 'new searchable key '+k0[i];  
				console.log(m); 
				send(m); 
				q_items.push(k0[i]); 
				}
			}; 
			console.log('q_items  '+q_items);  
			db.collection('state').update({"name": "query_items"}, {$set:{keys:q_items}}, 
				function(err, result){
					if (err) throw err; 
					console.log('query_items updated'); 
					send('query items updated'); 
				}
			); 
			
		}
	
		}); 
	// .toArray(function(err,doc){if(doc != null){for(var i=0; i<doc.length; i++) {var name = doc[i].name;console.log(JSON.stringify(doc[i].name)); maxDict[name] = doc[i]; };}; writeJson();});

}
