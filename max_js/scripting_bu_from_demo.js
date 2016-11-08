{
	///////////// Global variables

	{
	inlets = 1; 
	outlets = 2; 
	
	var dict_query = new Dict('query'); 
	var dict_mongodb = new Dict('mongodb'); 
	var dict_buffer = new Dict('db_buffer'); 
	var pat = this.patcher; 
	var q; 
	var script = pat.getnamed('js_script'); 
	var append_boolean_button = pat.getnamed('append_boolean_button'); 
	var append_boolean_button0 = pat.getnamed('append_boolean_button0'); 
	var append_boolean_comment = pat.getnamed('append_boolean_comment'); 
	var code_view = pat.getnamed('code_view'); 
	var sprintf; 
	var mess; 
	var bang_0, bang_1, bang_2; 
	var obj_names = new Array(); 
	var counter = 0; 
	var umenu_0, umenu_1, umenu_2,umenu_3,umenu_4,umenu_5;  
	var textedit_0,textedit_1,textedit_2,textedit_3,textedit_4,textedit_5; 
	var unjoin_0, unjoin_1, unjoin_2, unjoin_3; 
	var join_0, join_1, join_2, join_3; 
	var zl_filter_0, zl_filter_1; 
	var uo = {}; 
	var object_counter ={sprintf:0, umenu:0, textedit:0, join:0, unjoin:0, zl_filter:0,bang:0}; 
	var value_buf = new Array(); 
	var enter_query;
	var enter_query_v; 
	var accum0, accum1, accum2, accum3, accum4, accum5, accum6; 
	}
	
/////////// ONLOAD SET QUERY TYPES
function set_query_types(){
	dict_mongodb.import_json("mongodb.json"); 
	var um = pat.getnamed('query_types'); 
	um.message('clear'); 
	var dmqt = dict_mongodb.get('query_types'); 
	for (var i=0; i<dmqt.length; i++){
		um.append(dmqt[i]); 
	}

}
/////////// FILTER QUERY TYPES 	
	
function query_type(x){	
	//post('patch function called \n'); 
	if(sprintf!=null){remove_objects(); } 
	if(x==9){example_5(); }
	if(x==8){example_4(); }
	if(x==7){example_3(); }
	if(x==6){example_2(); }
	if(x==5){return_all(); }
	if(x==4){script_accum_boolean(); }
	if(x==3){script_accum(); }
	if(x==2){script_match_boolean();}
	if(x==1){script_match();}
	if(x==0){post("choose the type of query that you would like to accomplish \n")}
}


//////////////////////// SCRIPTING FUNCTIONS //////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

function script_match_booleanX(){
	var np = ''; 
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
counter++; 

}
function script_match(x,y){
	var np = ''; 
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
function script_match_boolean(){
	var np = ''; 
	/// create sprintf to hold arguments
	create_sprintf("q_match_boolean"); 
		
	//// create umenu for boolean operators
	var d = dict_mongodb.get('boolean'); 
	uo = {c: 0, ex: 1050,ey: 500, px:337, py:450, dict: d}
	create_umenu(uo); 
	//// create umenu for keys to query
	d=dict_buffer.get('keys'); 
	uo = {c:1, ex: 1165,ey:500,px:15,py:450, dict:d}; 
	create_umenu(uo);
	///// create umenu for comparison expressions
	d = dict_mongodb.get('comparison'); 
	uo = {c:2,ex:1280,ey:500,px:122,py:450, dict:d}; 
	create_umenu(uo); 
	///// create textedit for value entry	
	uo={c:0, ex:1395, ey: 500, px:229,py:450 }; 
	create_textedit(uo); 
	//create_textedit_match_boolean_0(); 
	//// create umenu for keys to query
	d = dict_buffer.get('keys'); 
	uo = {c:3,ex:1500,ey:500,px:15,py:480, dict:d}; 
	create_umenu(uo); 
	//// create umenu for keys to query
	d = dict_mongodb.get('comparison'); 
	uo = {c:4,ex:1615,ey:500,px:122,py: 480, dict:d}; 
	create_umenu(uo); 
	///// create textedit for value entry
	uo={c:1, ex:1730, ey: 500, px:229,py:480 }; 
	create_textedit(uo); 
	
	append_boolean_button.presentation(1); 
	append_boolean_button.presentation_rect(450,450); 
	append_boolean_comment.presentation(1); 
	append_boolean_comment.presentation_rect(480,450); 

// 	setTimeout(function(){bang.message(1)},1000); 
//	pat.connect(script,1,bang,0); 
//	pat.connect(sprintf, 0, script,0);
//	pat.connect(sprintf,0,mess,1); 
//	pat.connect(bang,0,sprintf,0); 
	pat.connect(umenu_0,1,join_0,3); 
	pat.connect(umenu_1,1,join_0,0); 
	pat.connect(umenu_2,1,join_0,1); 
	// pat.connect(textedit0, 0,unjoin0,0); 
	pat.connect(unjoin_0,1,join_0,2); 
	pat.connect(umenu_3,1,join_0,4); 
	pat.connect(umenu_4,1,join_0,5); 
	pat.connect(unjoin_1,1,join_0,6); 
	pat.connect(textedit_1,0,unjoin_1,0); 
	pat.connect(sprintf,0,join_1, 0); 
	pat.connect(join_0,0,join_1,1); 
	pat.connect(join_1,0, zl_filter_0, 0); 
	pat.connect(bang_0,0,sprintf,0); 
	pat.connect(bang_0,0,join_0,0); 
	pat.connect(bang_0,0,join_1,0); 
	pat.connect(unjoin_1,1,bang_0,0); 
	pat.connect(zl_filter_0,0,script,0); 
//	mess.message('from javacript'); 
	enter_query = "pat.disconnect(unjoin_1,1,bang_0,0);"; 
	
counter++; 

}
function script_accum(x,y){
	var np = ''; 
	/// create sprintf to hold arguments
	create_sprintf("q_accum"); 
	//// create umenu for accumulators
	var d = dict_mongodb.get('accumulator'); 
	uo = {c:0, ex: 1050,ey:500,px:15,py:450, dict:d}; 
	create_umenu(uo);
	///// create umenu for keys to query
	d=dict_buffer.get('keys'); 
	uo = {c:1,ex:1165,ey:500,px:122,py:450, dict:d}; 
	create_umenu(uo); 
	//// create umenu for comparison operators
	d = dict_mongodb.get('comparison'); 
	uo = {c: 2, ex: 1280,ey: 500, px:230, py:450, dict: d}
	create_umenu(uo); 
	//// create umenu for textedit entry
	d = dict_mongodb.get('comparison'); 
	uo = {c: 0, ex: 1395,ey: 500, px:337, py:450, dict: d}
	create_textedit(uo); 

/// connect objects
	pat.connect(umenu_0,1,join_0,0); 
	pat.connect(umenu_1,1,join_0,1); 
	pat.connect(umenu_2,1,join_0,2); 
	// pat.connect(textedit0, 0,unjoin0,0); 
	pat.connect(unjoin_0,1,join_0,3); 
	
	pat.connect(sprintf,0,join_1, 0); 
	pat.connect(join_0,0,join_1,1); 
	pat.connect(join_1,0, zl_filter_0, 0); 
	pat.connect(bang_0,0,sprintf,0); 
	pat.connect(bang_0,1,join_0,0); 
	pat.connect(bang_0,0,join_1,0); 
	pat.connect(unjoin_1,1,bang_0,0); 
	pat.connect(zl_filter_0,0,script,0); 
	pat.connect(unjoin_0,1,bang_0,0); 

counter=counter+1; 

}
function script_accum_boolean(){
	var np = ''; 
	/// create sprintf to hold arguments
	create_sprintf("q_accum_boolean"); 
	//// create umenu for accumulators
	var d = dict_mongodb.get('accumulator'); 
	uo = {c:0, ex: 1050+100,ey:500,px:15,py:450, dict:d}; 
	create_umenu(uo);
	///// create umenu for keys to query
	d=dict_buffer.get('keys'); 
	uo = {c:1,ex:1165+100,ey:500,px:122,py:450, dict:d}; 
	create_umenu(uo); 
	//// create umenu for comparison operators
	d = dict_mongodb.get('comparison'); 
	uo = {c: 2, ex: 1280+100,ey: 500, px:230, py:450, dict: d}
	create_umenu(uo); 
	//// create umenu for textedit entry
	uo = {c: 0, ex: 1395+100,ey: 500, px:337, py:450}
	create_textedit(uo); 
	
	d = dict_mongodb.get('boolean'); 
	uo = {c: 3, ex: 1510+100,ey: 500, px:444, py:450, dict: d}
	create_umenu(uo); 
	
	//// create umenu for accumulators
	var d = dict_mongodb.get('accumulator'); 
	uo = {c:4, ex: 1050+100,ey:550,px:15,py:480, dict:d}; 
	create_umenu(uo);
	///// create umenu for keys to query
	d=dict_buffer.get('keys'); 
	uo = {c:5,ex:1165+100,ey:550,px:122,py:480, dict:d}; 
	create_umenu(uo); 
	//// create umenu for comparison operators
	d = dict_mongodb.get('comparison'); 
	uo = {c: 6, ex: 1280+100,ey: 550, px:230, py:480, dict: d}
	create_umenu(uo); 
	//// create umenu for textedit entry
	uo = {c: 1, ex: 1395+100,ey: 550, px:337, py:480}
	create_textedit(uo); 

/// connect objects
	pat.connect(umenu_0,1,join_0,0); 
	pat.connect(umenu_1,1,join_0,1); 
	pat.connect(umenu_2,1,join_0,2); 
	// pat.connect(textedit0, 0,unjoin0,0); 
	pat.connect(unjoin_0,1,join_0,3); 
	pat.connect(umenu_3,1,join_0,4); 
	pat.connect(umenu_4,1,join_0,5); 
	pat.connect(umenu_5,1,join_0,6); 
	pat.connect(umenu_6,1,join_0,7); 
	pat.connect(unjoin_1,1,join_0,8); 

	
	
	
	
	pat.connect(sprintf,0,join_1, 0); 
	pat.connect(join_0,0,join_1,1); 
	pat.connect(join_1,0, zl_filter_0, 0); 
	pat.connect(bang_0,0,sprintf,0); 
	pat.connect(bang_0,1,join_0,0); 
	pat.connect(bang_0,0,join_1,0); 
	pat.connect(unjoin_1,1,bang_0,0); 
	pat.connect(zl_filter_0,0,script,0); 	

	
	append_boolean_button0.presentation(1); 
	append_boolean_button0.presentation_rect(320,410); 
	append_boolean_comment.presentation(1); 
	append_boolean_comment.presentation_rect(350,410); 


	// pat.connect(textedit0, 0,unjoin0,0); 
	
	pat.connect(textedit_1,0,unjoin_1,0); 
	pat.connect(sprintf,0,join_1, 0); 
	pat.connect(join_0,0,join_1,1); 
	pat.connect(join_1,0, zl_filter_0, 0); 
	pat.connect(bang_0,0,sprintf,0); 
	pat.connect(bang_0,0,join_0,0); 
	pat.connect(bang_0,0,join_1,0); 
	pat.connect(unjoin_1,1,bang_0,0); 
	pat.connect(zl_filter_0,0,script,0); 
//	mess.message('from javacript'); 
	enter_query = "pat.disconnect(unjoin_1,1,bang_0,0);"; 
	
counter++; 

}

////////////////////////CREATE OBJECT FUNCTIONS //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
var append_boolean_counter = 0; 
var append_boolean_position = 0; 
var append_boolean_position_e = 60; 
var append_boolean_join = 7; 
function append_boolean(){
	eval(enter_query); 
	var d = dict_mongodb.get('boolean_append'); 
	uo = {c: 'ab_'+append_boolean_counter, ex: 1050,ey: 500+append_boolean_position_e, px:337, py:480+append_boolean_position, dict: d}
	create_umenu(uo); 
	append_boolean_counter++; 
	//// create umenu for keys to query
	d=dict_buffer.get('keys'); 
	uo = {c:'ab_'+append_boolean_counter, ex: 1165,ey:500+append_boolean_position_e,px:15,py:510+append_boolean_position, dict:d}; 
	create_umenu(uo);
	append_boolean_counter++; 
	///// create umenu for comparison expressions
	d = dict_mongodb.get('comparison'); 
	uo = {c:'ab_'+append_boolean_counter,ex:1280,ey:500+append_boolean_position_e,px:122,py:510+append_boolean_position, dict:d}; 
	create_umenu(uo); 
	append_boolean_counter++; 
	///// create textedit for value entry	
	uo={c:'ab_'+append_boolean_counter, ex:1395, ey: 500+append_boolean_position_e, px:229,py:510+append_boolean_position }; 
	create_textedit(uo); 
	append_boolean_counter++; 
	
	append_boolean_position = append_boolean_position+30; 
	append_boolean_position_e = append_boolean_position_e+60; 
	
	var n0 = this.patcher.getnamed('umenu_ab_'+(append_boolean_counter-4)); 
	var n1 = this.patcher.getnamed('umenu_ab_'+(append_boolean_counter-3)); 
	var n2 = this.patcher.getnamed('umenu_ab_'+(append_boolean_counter-2)); 
	var n3 = this.patcher.getnamed('unjoin_ab_'+(append_boolean_counter-1)); 
	
	pat.connect(n0,1,join_1,append_boolean_join); 
	pat.connect(n1,1,join_1,append_boolean_join+1); 
	pat.connect(n2,1,join_1,append_boolean_join+2); 
	pat.connect(n3,1,join_1,append_boolean_join+3);
	append_boolean_join=append_boolean_join+4; 
	
	enter_query_v = n3; 
	pat.connect(enter_query_v, 1, bang_0,0); 
	enter_query = "pat.disconnect(enter_query_v, 1, bang_0,0);"; 

}
function create_sprintf(mess){
	if(mess==null){mess = "q_match_boolean"}
	sprintf = pat.newdefault(1000, 550, "sprintf", mess); //, "%f","%s", "%s", "%f", "%s","%s","%s"); 
	obj_n(sprintf, 'sprintf_0_');  
	
	join_0 = pat.newdefault(910,550,'join',20); 
	obj_n(join_0, 'join_0_'); 
	
	join_1 = pat.newdefault(910,580, 'join', 100); 
	obj_n(join_1, 'join_1_'); 
 
	zl_filter_0 = pat.newdefault(910,610, 'zl.filter', 0); 
	obj_n(zl_filter_0, 'zl_filter_0_'); 
	
	bang_0 = pat.newdefault(830,550,'trigger','b','b'); 
	obj_n(bang_0,'bang_0_'); 
	
		
}
///// create umenu
function create_umenu(u){
	var n = "umenu_"+u.c; 
	eval(n+"= pat.newdefault("+u.ex+","+u.ey+",'umenu');"); 
	eval(n+".presentation(1)");
	eval(n+".presentation_rect("+u.px+","+u.py+")"); 
	eval("obj_n("+n+",'umenu_"+u.c+"')"); 
	//var l=u.dict; 
	eval("for(var i=0;i<u.dict.length; i++){"+n+".append(u.dict[i])}"); 
}
////// create text edit 
function create_textedit(u){

	var n = 'textedit_'+u.c; 
	var nn = 'unjoin_'+u.c; 
	eval(n+"= pat.newdefault("+u.ex+","+u.ey+",'textedit');"); 
	eval(nn+"= pat.newdefault("+u.ex+","+(u.ey+30)+",'unjoin');"); 
	eval(n+".size(100,22);"); 
	eval(n+".keymode(1);"); 
	eval(n+".presentation(1);"); 
	eval(n+".presentation_rect("+u.px+","+u.py+");"); 
	eval("obj_n("+n+",'textedit_"+u.c+"')"); 
	eval("obj_n("+nn+",'unjoin_"+u.c+"')"); 
	eval("var tsk0 = this.patcher.connect("+n+",0,"+nn+",0); var tsk = new Task(tsk0, this); tsk.schedule(500);"); 
}
function create_button(u){
	var n = 'button_'+u.c; 
	eval(n+"= pat.newdefault("+u.ex+","+u.ey+",'button');"); 
	eval(n+".presentation(1)");
	eval(n+".presentation_rect("+u.px+","+u.py+")"); 
	eval("obj_n("+n+",'umenu_"+u.c+"')"); 
}
function create_mess(u){
	var n = 'mess_'+u.c; 
	eval(n+"= pat.newdefault("+u.ex+","+u.ey+",'message');");  
	eval(n+".message(1);"); 
	eval("obj_n("+n+",'mess_"+u.c+"')"); 
}
////// remove objects
function remove_objects(){
	for(var i=0; i<obj_names.length; i++){
		var n = pat.getnamed(obj_names[i]); 
		pat.remove(n); 
	} 
	obj_names = []; 	
	append_boolean_button.presentation(0);
	append_boolean_button0.presentation(0);
	append_boolean_comment.presentation(0); 
	append_boolean_position =0; 
	append_boolean_position_e = 60; 
	append_boolean_join = 7; 


}
//// naming function for removing objects
function obj_n(x,y){
var n = y; 
x.varname = n; 
obj_names.push(n); 
}


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


////////////////////// QUERY FUNCTIONS //////////////////////////////////////////////
//////// assemble mongodb match function
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
			var mong = "db.collection('database0').find(\n {$or:["+values+"]}\n ).toArray(\n function(err,doc){\n if(doc != null){ \n for(var i=0; i<doc.length; i++) {\n var name = doc[i].name;\n console.log(JSON.stringify(doc[i].name)); \n maxDict[name] = doc[i]; };}; \n writeJson();});"
			dict_query.set('mongodb', mong); 	
			// code_view.set(mong); 
			// // code_write.set('"'+mong+'"'); 
			code_view.set('"'+mong+'"'); 
	}
}

/// assemble mongodb match function with boolean operators 
function q_match_booleanY(){
	post('match in data array or single value with boolean operators \n'); 
// f,k,c
	var ac = 1; 
	var av = 0; 
	
//	post(arguments + "\n"); 
	var value_buf;
 	var values; 
	var ii=0; 
	var lim = 3; 
	var bool; 
	p_arg(arguments);
	// remove_objects(); 
	function p_arg(arg){
		post('p_arg called \n'); 
		bool = arg[arg.length]; 
		for(var i=0; i<1; i++){
			post('here \n'); 
			post("["+i*ac+","+(i*ac+1)+","+(i*ac+2)+"]"); 
			post(arg[i*ac]+" "+arg[i*ac+1]+" "+arg[i*ac+2]); 
			value_buf = "{'"+arg[i*ac]+"':{"+arg[i*ac+1]+":"+arg[i*ac+2]+"}}"
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
				 
			}
			else{
					values = values+","+value_buf; post('values = '+values+'\n'); 
					post(values+'\n'); 
					var mong = "db.collection('database0').find(\n {"+bool+":["+values+"]}\n ).toArray(function(err,doc){ \n if(doc != null){ \n for(var i=0; i<doc.length; i++) {\n var name = doc[i].name;\n console.log(JSON.stringify(doc[i].name)); \n maxDict[name] = doc[i]; };}; \n writeJson();});"
					dict_query.set('mongodb', mong); 	
					code_view.set('"'+mong+'"'); 	
					// code_write.set('"'+mong+'"'); 		
				}
		
	}
}
function q_match_boolean(){
	post('match in data array or single value with boolean operators \n'); 
// f,k,c
	var ac = 1; 
	var av = 0; 
	//post(arguments + "\n"); 
 	var values; 
	var ii=0; 
	var lim = 3; 
	var arg = arguments; 
	var arg_length = arg.length; 
	post(arg_length); 
	value_buf.push("'"+arg[3]+"':[{'"+arg[0]+"':{'"+arg[1]+"':"+arg[2]+"}},{'"+arg[4]+"':{'"+arg[5]+"':"+arg[6]+"}}]"); 
	post('value_buf '+value_buf+'\n'); 
	append_query(arg); 
	
	// remove_objects(); 
	
	function append_query(arg){
	if(arg[6+ac]!=null && arg[6+ac+1]!=null && arg[6+ac+2] !=null || arg[6+ac+3]){
		value_buf.push(",'"+arg[6+ac]+"':[{'"+arg[6+ac+1]+"':{'"+arg[6+ac+2]+"':"+arg[6+ac+3]+"}}]"); 
		ac=ac+4; 
		append_query(arg); 
	}else{
		var q=""; 
		for(var i=0; i<value_buf.length;i++){
			q = q+value_buf[i]; 
			}; 
			var mong = "db.collection('database0').find({"+q+"}).toArray(function(err,doc){if(doc != null){for(var i=0; i<doc.length; i++) {var name = doc[i].name;console.log(JSON.stringify(doc[i].name)); maxDict[name] = doc[i]; };}; writeJson();})";
					dict_query.set('mongodb', mong); 
					code_view.set('"'+mong+'"'); 
					// code_write.set('"'+mong+'"'); 
					value_buf = new Array();
					
		}
	
	}
}
function q_match_booleanX(){
	post('match in data array or single value with boolean operators \n'); 
// f,k,c
	var ac = 1; 
	var av = 0; 
	
//	post(arguments + "\n"); 
	var value_buf;
 	var values; 
	var ii=0; 
	var lim = 3; 
	var bool; 
	p_arg(arguments);
	// remove_objects(); 
	function p_arg(arg){
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
					code_view.set('"'+mong+'"'); 	
					// code_write.set('"'+mong+'"'); 		
				}
		
	}
}
function q_accum(){
	
	post('match using accumulator operator \n'); 
// f,k,c
	var ac = 1; 
	var av = 0; 
	//post(arguments + "\n"); 
 	var values; 
	var ii=0; 
	var lim = 3; 
	var arg = arguments; 
	var arg_length = arg.length; 
	post(arg_length); 
	value_buf.push("$project: {accum0: {'"+arg[0]+"': '$"+arg[1]+"'},_id: '$_id',ges_id: '$ges_id'}}, \n {$match:{accum0: {'"+arg[2]+"':"+arg[3]+"}}}, \n {$sort: {ges_id: 1}"); 
	// value_buf.push("'"+arg[3]+"':[{'"+arg[0]+"':{'"+arg[1]+"':"+arg[2]+"}},{'"+arg[4]+"':{'"+arg[5]+"':"+arg[6]+"}}]"); 
	post('value_buf '+value_buf+'\n'); 
	append_query(arg); 
	
	// remove_objects(); 
	
	function append_query(arg){
	if(arg[3+ac]!=null && arg[6+ac+1]!=null && arg[6+ac+2] !=null || arg[6+ac+3]){
		value_buf.push(",'"+arg[6+ac]+"':[{'"+arg[6+ac+1]+"':{'"+arg[6+ac+2]+"':"+arg[6+ac+3]+"}}]"); 
		ac=ac+4; 
		append_query(arg); 
	}else{
		var q=""; 
		for(var i=0; i<value_buf.length;i++){
			q = q+value_buf[i]; 
			post(q); 
			}; 
			var mong = "db.collection('database0').aggregate( \n [ \n \t {"+q+"} \n ], \n function(err, d){ \n d.forEach(function(cv,i,a){\n console.log(cv._id+' : '+cv.ges_id); \n db.collection('database0').findOne({_id: new ObjectId(cv._id)}, \n function(err, result){ \n maxDict[result.name] = result; \n }); }); \n setTimeout(function(){writeJson();},1000); \n });"
					dict_query.set('mongodb', mong); 
					code_view.set('"'+mong+'"'); 
					// code_write.set('"'+mong+'"'); 
					value_buf = new Array();
		}
	
	}

}
function q_accum_boolean(){
	
	post('match using accumulator and boolean operators \n'); 
// f,k,c
	var ac = 1; 
	var av = 0; 
	//post(arguments + "\n"); 
 	var values; 
	var ii=0; 
	var lim = 3; 
	var arg = arguments; 
	var arg_length = arg.length; 
	post(arg_length); 
	value_buf.push("$project: {accum0: {'"+arg[0]+"': '$"+arg[1]+"'},_id: '$_id',ges_id: '$ges_id'}}, \n {$match:{accum0: {'"+arg[2]+"':"+arg[3]+"}}}, \n {$sort: {ges_id: 1}"); 
	// value_buf.push("'"+arg[3]+"':[{'"+arg[0]+"':{'"+arg[1]+"':"+arg[2]+"}},{'"+arg[4]+"':{'"+arg[5]+"':"+arg[6]+"}}]"); 
	post('value_buf '+value_buf+'\n'); 
	append_query(arg); 
	
	// remove_objects(); 
	
	function append_query(arg){
	if(arg[3+ac]!=null && arg[6+ac+1]!=null && arg[6+ac+2] !=null || arg[6+ac+3]){
		value_buf.push(",'"+arg[6+ac]+"':[{'"+arg[6+ac+1]+"':{'"+arg[6+ac+2]+"':"+arg[6+ac+3]+"}}]"); 
		ac=ac+4; 
		append_query(arg); 
	}else{
		var q=""; 
		for(var i=0; i<value_buf.length;i++){
			q = q+value_buf[i]; 
			post(q); 
			}; 
			var mong = "db.collection('database0').aggregate( \n [ \n \t {"+q+"} \n ], \n function(err, d){ \n d.forEach(function(cv,i,a){\n console.log(cv._id+' : '+cv.ges_id); \n db.collection('database0').findOne({_id: new ObjectId(cv._id)}, \n function(err, result){ \n maxDict[result.name] = result; \n }); }); \n setTimeout(function(){writeJson();},1000); \n });"
					dict_query.set('mongodb', mong); 
					code_view.set('"'+mong+'"'); 
					// code_write.set('"'+mong+'"'); 
					value_buf = new Array();
		}
	
	}

}
function return_all(x){
	post("return all"); 
	dict_query.set('mongodb', "db.collection('database0').find().toArray(function(err,doc){if(doc != null){for(var i=0; i<doc.length; i++) {var name = doc[i].session+'_'+doc[i].ges_id;console.log(JSON.stringify(doc[i].name)); maxDict[name] = doc[i]; };}; writeJson();});");  
	code_view.set("db.collection('database0').find().toArray(\n function(err,doc){\n if(doc != null){\n for(var i=0; i<doc.length; i++) {\n \t var name = doc[i].session+doc[i].ges_id; \n console.log(JSON.stringify(doc[i].session));\n  maxDict[name] = doc[i]; \n };}; \n writeJson();});"); 
}
function example_2(){
	post('example 2'); 
	var d = "db.collection('database0').find(\n {$or:[{'dur':{$gte:1000}}]}).toArray(\n function(err,doc){\n if(doc != null){ \n for(var i=0; i<doc.length; i++) {\n var name = doc[i].name;\n console.log(JSON.stringify(doc[i].name)); \n maxDict[name] = doc[i]; };}; \n writeJson();});"; 
	dict_query.set(d);
	code_view.set(d); 
}
function example_3(){
	post('example 3'); 
	var d = "db.collection('database0').find(\n {'$or':[{'dur':{'$gte':1000}},\n {'data.carrier':{'$gte':60}}]\n }).toArray(function(err,doc){\n if(doc != null){\n for(var i=0; i<doc.length; i++) {\n var name = doc[i].name;\n console.log(JSON.stringify(doc[i].name)); \n maxDict[name] = doc[i]; };}; \n writeJson();})"; 
	dict_query.set(d);
	code_view.set(d); 
}
function example_4(){
	post('example 4'); 
	var d = "db.collection('database0').aggregate( \n [ \n{$project: {accum0: {'$avg': '$data.harmonicity'},_id: '$_id',ges_id: '$ges_id'}}, \n {$match:{accum0: {'$lte':100}}}, \n {$sort: {ges_id: 1}} \n ], \n function(err, d){ \n d.forEach(function(cv,i,a){\n console.log(cv._id+' : '+cv.ges_id); \n db.collection('database0').findOne({_id: new ObjectId(cv._id)}, \n function(err, result){ \n maxDict[result.name] = result; \n }); }); \n setTimeout(function(){writeJson();},1000); \n })"; 
	dict_query.set(d);
	code_view.set(d); 
}
function example_5(){
	post('example 5'); 
	var d = "db.collection('database0').aggregate( \n [ \n {$project: {accum0: {'$avg': '$data.harmonicity'},_id: '$_id',ges_id: '$ges_id'}}, \n {$match:{accum0: {'$lte':100}}}, \n {$sort: {ges_id: 1}} \n ], \n function(err, d){ \n d.forEach(function(cv,i,a){\n console.log(cv._id+' : '+cv.ges_id); \n db.collection('database0').findOne({_id: new ObjectId(cv._id)}, \n function(err, result){ \n maxDict[result.name] = result; \n }); }); \n setTimeout(function(){writeJson();},1000); \n });"; 
	dict_query.set(d);
	code_view.set(d); 
}

//////////////////// MISC.
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