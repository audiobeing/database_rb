var d = new Dict('db_buffer'); 
var dict_fromdb = new Dict('fromdb'); 
var tsk = new Task(initiate, this); 


function initiate() {
	post('initiation recieved \n'); 
	var k = dict_fromdb.get('keys'); 
//	post(k+'\n'); 
	var c = dict_fromdb.get('cnt'); 
//	post(c+'\n'); 
 // 	if(k==null){read(); tsk.schedule(1500); }
	if(k!=null){
		post('queryable keys :   '+k+'\n'); 
		post
		d.parse('{}'); 
		d.set('keys',k); 
		d.set('cnt',c); 
		var r_count = d.get('cnt'); 
		if(r_count!=null){
			post("count returned from db :" + r_count+'\n'); 
			// post(k); 
			
			outlet(0,"cnt",r_count);
			
		} else {post("there are no gestures in the database")}
	}else return; 
}

function update_keys() {
	post('update keys recieved \n'); 
	var k = dict_fromdb.get('keys'); 
 	if(k==null){read(); tsk.schedule(500); }
	if(k!=null){
		post('queryable keys :   '+k+'\n'); 
		d.parse('{}'); 
		d.set('keys',k); 
			// post(k); 		
	}; 
}


function read(){
dict_fromdb.import_json('dbQuery.json'); 	
	
}