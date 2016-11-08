////////POLYBUFFER //////////////////////

var pb = new PolyBuffer(jsarguments[1],"ges"); 
var d  = new Dict('fromdb'); 

function ges_pb(){
	var p = d.getkeys(); 
	post(p.length); 
	/// the for loop needs to start at 1 and to skip the first argrument "return"
	/// and be p.length-1 
	for(var i=0; i< p.length; i++){
		post(i + "  :  " + p[i]); 
		var z = d.get(p[i]); 
		var y = z.get('audio'); 
		pb.append(y); 
	}
	else {post('no data - you might have just opened max')}
//	pb.open(); 
	}
	
// homes.sort(function(a, b) {
//     return parseFloat(a.key) - parseFloat(b.key);
// });




/////////// ANALYSIS//////////////////////////

{
function update(){
	var dct = new Dict("analysis"); 
	var dct0 = new Dict('analysis_data'); 
	
	dct.set("analysis", dct0); 

}		
}