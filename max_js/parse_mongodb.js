var d = new Dict('query'); 

function parse_mongodb(x){
	d.set('mongodb', x); 
	var y = d.get('query'); 
	post(y); 
	}