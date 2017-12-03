function festivalNationCheck(nation){
	
	//alert("nationCheck : "+nation)
	if(nation=="kr"){
		$.mobile.changePage("#koreaHome");
	}else if(nation=="jp"){
		$.mobile.changePage("#jpHome");
	}else if(nation=="ca"){
		$.mobile.changePage("#caHome");
	}else if(nation=="en"){
		$.mobile.changePage("#koreaHome");
	}

}


