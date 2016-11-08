//var pb = this.patcher.getnamed('polybuffer_ges'); 
var pb = new PolyBuffer("ges"); 
var d  = new Dict('fromdb'); 

function ges_pb(){
	
	
	//// ADD CLEAR FUNCTION
	var p = d.getkeys(); 
	post(p); 
	
	if(p!=null){
		if(typeof p == "object"){
			post(p.length); 
			pb.clear(); 
			/// the for loop needs to start at 1 and to skip the first argrument "return"
			/// and be p.length-1 
			for(var i=0; i< p.length; i++){
				post(i + "  :  " + p[i]); 
				var z = d.get(p[i]); 
				var y = z.get('audio'); 
				pb.append(y); 
			}
		}
		else {
			post('else'); 
			var z = d.get(p); 
			post(z); 
			var y = z.get('audio'); 
			post(y+' this is y'); 
			pb.append(y); 
		}
	}
	else {post('no data - your query returned 0 results or you might have just opened max')}
//	pb.open(); 
	}
	
// homes.sort(function(a, b) {
//     return parseFloat(a.key) - parseFloat(b.key);
// });