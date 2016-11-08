{
	inlets = 1; 
	outlets = 2; 
	
	var dict_query = new Dict('query'); 
	var dict_mongodb = new Dict('mongodb'); 
	var dict_buffer = new Dict('db_buffer'); 
	var pat = this.patcher; 
	var q; 
	var script = pat.getnamed('js_script'); 
	var sprintf; 
	var mess; 
	var bang0; 
	var obj_names = new Array(); 
	var counter = 0; 
	var umenu0, umenu1, umenu2,umenu3,umenu4,umenu5;  
	var textedit0,textedit1,textedit2,textedit3,textedit4,textedit5; 
	var unjoin0, unjoin1, unjoin2, unjoin3; 
	var join0, join1, join2, join3; 
	var zl_filter0, zl_filter1; 
	
function patch(x){	
	//post('patch function called \n'); 
	if(sprintf!=null){remove_objects(); } 
	if(x==2){
		script_match_boolean();
	}
	if(x==1){
		script_match(); 
	}
	if(x==0){
		return_all(); 
	}
}



//// return everything from database 
function return_all(x){
	post("return all"); 
	dict_query.set('mongodb', "db.collection('database0').find().toArray(function(err,doc){if(doc != null){for(var i=0; i<doc.length; i++) {var name = doc[i].name;console.log(JSON.stringify(doc[i].name)); maxDict[name] = doc[i]; };}; writeJson();});");  
}
//// assemble mongodb match function
function q_match(){
	post('match in data array or single value \n'); 
// f,k,c
	var ac = 1; 
	var av = 0; 
	var value_buf;
 	var values; 
	var ii=0; 
	var lim = 3; 
	p_arg(arguments);
	function p_arg(arg){
	//	post(arg.length+'\n'); 
	//	post('p_arg called \n'); 
		for(var i=0; i<1; i++){
			post("["+i*ac+","+(i*ac+1)+","+(i*ac+2)+"]"); 
			post(arg[i*ac]+" "+arg[i*ac+1]+" "+arg[i*ac+2]+'\n'); 
			value_buf = "{'"+arg[i*ac+1]+"':{"+arg[i*ac+2]+":"+arg[i*ac]+"}}"
			// post(value_buf); 
			av++; 
			ac = av*3;
		//	post(ac+'\n'); 
		}
			values = value_buf; 
			post('values = '+values+'\n'); 
			var mong = "db.collection('database0').find({$or:["+values+"]}).toArray(function(err,doc){if(doc != null){for(var i=0; i<doc.length; i++) {var name = doc[i].name;console.log(JSON.stringify(doc[i].name)); maxDict[name] = doc[i]; };}; writeJson();});"
			dict_query.set('mongodb', mong); 				
	}
}

/// assemble mongodb match function with boolean operators 
function q_match_boolean(){
	post('match in data array or single value with boolean operators \n'); 
// f,k,c
	var ac = 1; 
	var av = 0; 
	
	post(arguments + "\n"); 
	var value_buf;
 	var values; 
	var ii=0; 
	var lim = 3; 
	var arg = arguments; 
	var mong = "db.collection('database0').find({'"+arg[6]+"':[{'"+arg[5]+"':{'"+arg[4]+"':"+arg[3]+"}},{'"+arg[2]+"':{'"+arg[1]+"':"+arg[0]+"}}]}).toArray(function(err,doc){if(doc != null){for(var i=0; i<doc.length; i++) {var name = doc[i].name;console.log(JSON.stringify(doc[i].name)); maxDict[name] = doc[i]; };}; writeJson();});"
					dict_query.set('mongodb', mong); 
	
}
function q_match_booleanX(){
	post('match in data array or single value with boolean operators \n'); 
// f,k,c
	var ac = 1; 
	var av = 0; 
	
	post(arguments + "\n"); 
	var value_buf;
 	var values; 
	var ii=0; 
	var lim = 3; 
	var bool; 
	p_arg(arguments);
	function p_arg(arg){
		post(arg.length+'\n'); 
		post('p_arg called \n'); 
		bool = arg[arg.length]; 
		for(var i=0; i<1; i++){
			post('here \n'); 
			post("["+i*ac+","+(i*ac+1)+","+(i*ac+2)+"]"); 
			post(arg[i*ac]+" "+arg[i*ac+1]+" "+arg[i*ac+2]); 
			value_buf = "{'"+arg[i*ac+1]+"':{"+arg[i*ac+2]+":"+arg[i*ac]+"}}"
			post(value_buf); 
			av++; 
			ac = av*3;
			post(ac+'\n'); 
			}
			
			if(arg[av*3+1]!=0){
				post('av ='+av+'\n'); 
				if(values==null){values = value_buf; post('values = null \n'); p_arg(arg);}
				else{values = values+","+value_buf; post('values = '+values+'\m')}
				post('theres more  '); 
				p_arg
				 
			}else{
					values = values+","+value_buf; post('values = '+values+'\n'); 
					post(values+'\n'); 
					var mong = "db.collection('database0').find({"+bool+":["+values+"]}).toArray(function(err,doc){if(doc != null){for(var i=0; i<doc.length; i++) {var name = doc[i].name;console.log(JSON.stringify(doc[i].name)); maxDict[name] = doc[i]; };}; writeJson();});"
					dict_query.set('mongodb', mong); 				
				}
		
	}
}
/// remove objects
function remove_objects(){
	for(var i=0; i<obj_names.length; i++){
		var n = pat.getnamed(obj_names[i]); 
		pat.remove(n); 
	} 
	obj_names = []; 	
}
function remove_objectsx(){
	post('remove object called'); 
//	if(sprintf != null)	{pat.remove(sprintf); }; 
//	if(sprintf != null)	{pat.remove(mess);  }; 
//	if(sprintf != null)	{pat.remove(bang0); }; 
//	obj_names = [];
	
}

//////////////////////// SCRIPTING FUNCTIONS //////////////////////////////////////////////////
function script_match_boolean(){
	var np = 'initiale'
	/// create sprintf to hold arguments
	create_sprintf_match_boolean0(); 
	//// create message box for troubleshooting
	// create_message();  	
	//// create umenu for boolean operators
	create_umenu_match_boolean_0(); 
	//// create umenu for keys to query
	create_umenu_match_boolean_1(); 
	///// create umenu for comparison expressions
	create_umenu_match_boolean_2(); 
	///// create textedit for value entry
	create_textedit_match_boolean_0(); 
	//// create umenu for keys to query
	create_umenu_match_boolean_3(); 
	///// create umenu for comparison expressions
	create_umenu_match_boolean_4(); 
	///// create textedit for value entry
	create_textedit_match_boolean_1(); 
	
// 	setTimeout(1000, bang.message(1)); 
//	pat.connect(script,1,bang,0); 
//	pat.connect(sprintf, 0, script,0);
//	pat.connect(sprintf,0,mess,1); 
//	pat.connect(bang,0,sprintf,0); 
	pat.connect(umenu0,1,sprintf,6); 
	pat.connect(umenu1,1,sprintf,5); 
	pat.connect(umenu2,1,sprintf,4); 
	pat.connect(textedit0, 0,unjoin0,0); 
	pat.connect(unjoin0,1,sprintf,3); 
	pat.connect(umenu3,1,sprintf,2); 
	pat.connect(umenu4,1,sprintf,1); 
	pat.connect(unjoin1,1,sprintf,0); 
	pat.connect(textedit1,0,unjoin1,0); 
	pat.connect(sprintf,0,join0, 0); 
	pat.connect(join0,0,zl_filter0,0); 
	pat.connect(zl_filter0,0,script,0); 
//	mess.message('from javacript'); 
counter=counter+1; 

}
function script_match(x,y){
	var np = 'initiale'
	/// create sprintf to hold arguments
	create_sprintf0(); 
	//// create message box for troubleshooting
	create_message();  
	//// create bang for troubleshooting
 	bang = pat.newdefault(1010,500,"button");  
	np = 'bang_'+counter; 
	bang.varname = np;  
	obj_names.push(np); 
	
	//// create umenu for keys to query
	create_umenu0(); 
	///// create umenu for comparison expressions
	create_umenu1(); 
	
	///// create textedit for value entry
	create_textedit0(); 
	
// 	setTimeout(1000, bang.message(1)); 
	pat.connect(script,1,bang,0); 
	pat.connect(sprintf, 0, script,0);
	pat.connect(sprintf,0,mess,1); 
	pat.connect(bang,0,sprintf,0); 
	pat.connect(umenu0,1,sprintf,1); 
	pat.connect(umenu1,1,sprintf,2); 
	pat.connect(textedit0, 0,unjoin0,0); 
	pat.connect(unjoin0,1,sprintf,0); 
//	mess.message('from javacript'); 
counter=counter+1; 

}


////////////////////////CREATE OBJECT FUNCTIONS //////////////////////////////////////////
function create_sprintf_match_boolean0(){
	sprintf = this.patcher.newdefault(1010, 550, "sprintf", "q_match_boolean", "%f","%s", "%s", "%f", "%s","%s","%s"); 
	np= 'sprintf'+counter;  
	sprintf.varname = np; 
	obj_names.push(np); 
	join0 = pat.newdefault(1010,580, 'join', 5); 
	np = 'join0_'+counter; 
	join0.varname = np; 
	obj_names.push(np); 
	zl_filter0 = pat.newdefault(1010,610, 'zl.filter', 0); 
	np = 'zl_filter_'+counter; 
	zl_filter0.varname = np; 
	obj_names.push(np); 
	
	
}

function create_umenu_match_boolean_0(){
	umenu0 = pat.newdefault(1050, 500, 'umenu'); 
	umenu0.presentation(1); 
	umenu0.presentation_rect(15,450); 
	np = 'umenu0_'+counter; 
	umenu0.varname=np; 
	obj_names.push(np); 
	var l0 = dict_mongodb.get('boolean'); 
	for(var i=0; i<l0.length; i++){
	umenu0.append(l0[i]); 
	};
}; 
	//// create umenu for keys to query
function create_umenu_match_boolean_1(){
	umenu1 = pat.newdefault(1165, 500, 'umenu'); 
	umenu1.presentation(1); 
	umenu1.presentation_rect(122,450); 
	np = 'umenu1_'+counter; 
	umenu1.varname=np; 
	obj_names.push(np); 
	var l1 = dict_buffer.get('keys'); 
	for(var i=0; i<l1.length; i++){
	umenu1.append(l1[i]); 
	};
	
}; 
	///// create umenu for comparison expressions
function create_umenu_match_boolean_2(){
	umenu2 = pat.newdefault(1165+115, 500, 'umenu'); 
	umenu2.presentation(1); 
	umenu2.presentation_rect(122+107,450); 
	np = 'umenu2_'+counter; 
	umenu2.varname=np; 
	obj_names.push(np); 
	var l2 = dict_mongodb.get('comparison'); 
	for(var i=0; i<l2.length; i++){
	umenu2.append(l2[i]); 
	};

}; 
	///// create textedit for value entry
function create_textedit_match_boolean_0(){
	textedit0 = pat.newdefault(1280+115,500,'textedit'); 
	textedit0.size(100,22); 
 	textedit0.keymode(1); 
	textedit0.presentation(1); 
	textedit0.presentation_rect(230+107,450); 
	np = 'textedit0_'+counter; 
	textedit0.varname = np; 
	obj_names.push(np); 
	/////// create unjoin
	unjoin0 = pat.newdefault(1280+20,550,'unjoin'); 
	np = 'unjoin0_'+counter; 
	unjoin0.varname=np; 
	obj_names.push(np); 
}; 

	//// create umenu for keys to query
function create_umenu_match_boolean_3(){
	umenu3 = pat.newdefault(1500, 500, 'umenu'); 
	umenu3.presentation(1); 
	umenu3.presentation_rect(122,480); 
	np = 'umenu3_'+counter; 
	umenu3.varname=np; 
	obj_names.push(np); 
	var l3 = dict_buffer.get('keys'); 
	for(var i=0; i<l3.length; i++){
	umenu3.append(l3[i]); 
	};
	
}; 
	///// create umenu for comparison expressions
function create_umenu_match_boolean_4(){
	umenu4 = pat.newdefault(1615, 500, 'umenu'); 
	umenu4.presentation(1); 
	umenu4.presentation_rect(122+107,480); 
	np = 'umenu4_'+counter; 
	umenu4.varname=np; 
	obj_names.push(np); 
	var l4 = dict_mongodb.get('comparison'); 
	for(var i=0; i<l4.length; i++){
	umenu4.append(l4[i]); 
	};

}; 
	///// create textedit for value entry
function create_textedit_match_boolean_1(){
	textedit1 = pat.newdefault(1615+115,500,'textedit'); 
	textedit1.size(100,22); 
 	textedit1.keymode(1); 
	textedit1.presentation(1); 
	textedit1.presentation_rect(122+107+107,480); 
	np = 'textedit1_'+counter; 
	textedit1.varname = np; 
	obj_names.push(np); 
	/////// create unjoin
	unjoin1 = pat.newdefault(1280+115+20,550,'unjoin'); 
	np = 'unjoin1_'+counter; 
	unjoin1.varname=np; 
	obj_names.push(np); 
 
}; 

////// for script_match /////////////
///// create sprintf0 for script_match

function create_sprintf0(){
	sprintf = this.patcher.newdefault(1010, 550, "sprintf", "q_match", "%f","%s", "%s"); 
	np= 'sprintf'+counter;  
	sprintf.varname = np; 
	obj_names.push(np); 
}
//// create message
function create_message(){
	mess = this.patcher.newdefault(990+68, 580, "message");
	np = 'mess_'+counter; 
	mess.varname = np;  
	obj_names.push(np);
}
//// create umenu0 for script_match
function create_umenu0(){
	umenu0 = pat.newdefault(1050, 500, 'umenu'); 
	umenu0.presentation(1); 
	umenu0.presentation_rect(15,450); 
	np = 'umenu0_'+counter; 
	umenu0.varname=np; 
	obj_names.push(np); 
	var l0 = dict_buffer.get('keys'); 
	for(var i=0; i<l0.length; i++){
		umenu0.append(l0[i]); 
	};
}
//// create umenu1 for script_match
function create_umenu1(){
	umenu1 = pat.newdefault(1165, 500, 'umenu'); 
	umenu1.presentation(1); 
	umenu1.presentation_rect(122,450);
	np = 'umenu1_'+counter; 
	umenu1.varname=np; 
	obj_names.push(np); 
	var l1 = dict_mongodb.get('comparison'); 
	for(var i=0; i<l1.length; i++){
		umenu1.append(l1[i]); 
	}; 
}

//// create textedit0 for script_match
function create_textedit0(){
	textedit0 = pat.newdefault(1280,500,'textedit'); 
	textedit0.size(100,22); 
 	textedit0.keymode(1); 
	textedit0.presentation(1); 
	textedit0.presentation_rect(230,450); 
	np = 'textedit0_'+counter; 
	textedit0.varname = np; 
	obj_names.push(np); 
	/////// create unjoin
	unjoin0 = pat.newdefault(1280,550,'unjoin'); 
	np = 'unjoin0_'+counter; 
	unjoin0.varname=np; 
	obj_names.push(np); 
}

/// count objects with scripting names
function bang() {
    this.patcher.applydeep(search);
}

function search(obj) {
    if (obj.varname != "") {
        post(obj.varname,"\n")
    }
}
}