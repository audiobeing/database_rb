inlets = 1; 
outlets = 2; 
function check_empty(x){
	post(x); 
	if(x === ""){post("must enter session name"); outlet(1,"bang")}
		else{outlet(0,x)}
	
	}