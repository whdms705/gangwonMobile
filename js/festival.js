var festival_more_count;

function festivalInfo(nation){
  
  festival_more_count=1;

  var now = new Date();
  var year= now.getFullYear();
  var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
          
  var startDate = year + '-' + mon + '-' + day;
  console.log(" now() -> "+startDate);

  var service="KorService";
	if(nation=="kr"){
		service="KorService";
	}else if(nation=="jp"){
		service="JpnService";
	}else if(nation=="ca"){
		service="ChsService";
	}else if(nation=="en"){
		service="EngService";
	}
  

  // 축제공연행사 -> 인문 -> 강원도 -> 최근이미지수정순
  var url = "http://api.visitkorea.or.kr/openapi/service/rest/"+service+"/searchFestival?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D&eventStartDate="+startDate+"&eventEndDate=&areaCode=32&sigunguCode=&cat1=A02&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=Q&numOfRows=12&pageNo="+festival_more_count;
  

	$.ajax({
	    url : url,
	    type : "GET",
	    dataType: "xml",
        crossDomain: true,
	    success : function(res){
	    	console.log(res);
	        console.log("response data : "+res);
	        $("#festival_content").empty();


	        $(res).find('item').each(function(){

	        	
	        		var title = $(this).find("title").text();
	        		var image1 = $(this).find("firstimage").text();
	        		var contenttypeid = $(this).find("contenttypeid").text();
	        		var contentid = $(this).find("contentid").text();

	        		console.log(contenttypeid +"  "+contentid );
	        		if(image1===""){
	        			image1="/img/noImage.gif";
	        		}
	        		var festival_content=content(image1,title,contenttypeid,contentid);
	        		console.log(festival_content)
	        		$("#festival_content").append(festival_content);		


	        });



	    }
	});


}


// 축제보기 더보기 버튼 클릭시
function festivalMore(nation){
  festival_more_count=festival_more_count+1;

  var now = new Date();
  var year= now.getFullYear();
  var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
          
  var startDate = year + '-' + mon + '-' + day;
  console.log(" now() -> "+startDate);


	var service="KorService";
	if(nation=="kr"){
		service="KorService";
	}else if(nation=="jp"){
		service="JpnService";
	}else if(nation=="ca"){
		service="ChsService";
	}else if(nation=="en"){
		service="EngService";
	}
  
  var url = "http://api.visitkorea.or.kr/openapi/service/rest/"+service+"/searchFestival?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D&eventStartDate="+startDate+"&eventEndDate=&areaCode=32&sigunguCode=&cat1=A02&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=Q&numOfRows=12&pageNo="+festival_more_count;

	$.ajax({
	    url : url,
	    type : "GET",
	    dataType: "xml",
        crossDomain: true,
	    success : function(res){
	    	console.log(res);
	        console.log("response data : "+res);

	        $(res).find('item').each(function(){

	        	
	        		var title = $(this).find("title").text();
	        		var image1 = $(this).find("firstimage").text();
	        		var contenttypeid = $(this).find("contenttypeid").text();
	        		var contentid = $(this).find("contentid").text();

	        		console.log(contenttypeid +"  "+contentid );
	        		if(image1===""){
	        			image1="/img/noImage.gif";
	        		}
	        		var festival_content=content(image1,title,contenttypeid,contentid,service);
	        		console.log(festival_content)
	        		$("#festival_content").append(festival_content);		


	        });



	    }
	});


}


function content(image1,title,contenttypeid,contentid,service){
    
    //너무 긴 제목을 점점으로 처리 
	var title_temp=title.substring(9,title.length);
	//console.log("title_temp : "+title_temp);
	title=title.replace(title_temp,"..");
	//console.log("title : "+title);

	//console.log("function content(..) -> "+contenttypeid+" / "+contentid);

	var mappingInfo=contenttypeid+","+contentid+","+service; // 상세정보를 가져오기 위한 정보


	var content='<div class="col-xs-6">'
               +'<div onclick="contentDetail(\''+mappingInfo+'\');" class="color-demo tooltips" data-original-title="Click to view demos for this color" >'
	           +'<div style="width:170px;height:100px;margin-left:auto;margin-right:auto" >'
	           +'<img style="width:100%;height:100px; text-align: center;" src="'+image1+'" align="middle" >'
	           +'</div>'
	           +'<div class="color-info bg-white c-font-14 sbold">'
	           + title
	           +'</div>'
	           +'</div>'
	           +'</div>';

	return content;
}

function contentDetail(mappingInfo){
	console.log("contentDetail function ----------------------------------------- ");
	var temp = mappingInfo.split(",");
	var contenttypeid = temp[0];
	var contentid = temp[1];
	var service = temp[2]; 

	//alert(contenttypeid+" "+contentid)
	$.mobile.changePage( "#festivalDetail", { transition: "slideup", changeHash: false });

	var  festival_info;

	// start of festival common
	var url ="http://api.visitkorea.or.kr/openapi/service/rest/"+service+"/detailCommon?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D&contentTypeId="+contenttypeid+"&contentId="+contentid+"&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&transGuideYN=Y";
		$.ajax({
	    url : url,
	    type : "GET",
	    dataType: "xml",
        crossDomain: true,
	    success : function(res){
	    	console.log(res);
	        console.log("response common data : "+res);

	        $(res).find('item').each(function(){

	        	
	        		var title = $(this).find("title").text();
	        		
	        		var image1 = $(this).find("firstimage").text(); // 이미지
	        		var overview = $(this).find("overview").text(); // 개요
	        		var homepage = $(this).find("homepage").text(); // 홈페이지 

	        		console.log(title +"  "+image1 );
	        		if(image1===""){
	        			image1="/img/noImage.gif";
	        		}

	        		$("#festival_title").text(title);
	        		$("#festival_summary").text(overview);
	        		$("#festival_image").attr("src",image1);
	        		if(homepage != ""&&homepage !=null){
	        			console.log("homepage : "+homepage)
	        			festival_info="<p><strong>홈페이지 : </strong>"+homepage+"</p>";
	        		}
	        		


	        });



	    }
	});
	// end of festival common

	// start of festival detail
	 	url ="http://api.visitkorea.or.kr/openapi/service/rest/"+service+"/detailIntro?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D&contentTypeId="+contenttypeid+"&contentId="+contentid+"&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&introYN=Y";
		$.ajax({
	    url : url,
	    type : "GET",
	    dataType: "xml",
        crossDomain: true,
	    success : function(res){
	    	console.log(res);
	        console.log("response detail data : "+res);

	        $(res).find('item').each(function(){

	        	
	        		var sponsor1tel = $(this).find("sponsor1tel").text();
	        		var playtime = $(this).find("playtime").text();
	        		var program = $(this).find("program").text();
	        		var subevent = $(this).find("subevent").text();

	        		if(sponsor1tel != ""&&sponsor1tel !=null){
	        			festival_info=festival_info+"<p><strong>연락처 : </strong>"+sponsor1tel+"</p>";
	        		}
	        		if(playtime != ""&&playtime !=null){
	        			festival_info=festival_info+"<p><strong>행사기간 : </strong>"+playtime+"</p>";
	        		}

	        		$("#festival_info").append(festival_info);


	        });



	    }
	});
	// end of festival detail

}


/*
--- 축제 리스트 API ---
http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=인증키
&contentTypeId=15
&areaCode=32
&sigunguCode=
&cat1=A02
&cat2=A0207
&cat3=
&listYN=Y
&MobileOS=ETC
&MobileApp=TourAPI3.0_Guide
&arrange=Q  // 제목순 , 최근등록순 등등 ..
&numOfRows=12
&pageNo=1


--- 디테일 정보 API ---
http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro?ServiceKey=인증키
&contentTypeId=15  // 매핑할 정보 
&contentId=2504008 // 매핑할 정보 
&MobileOS=ETC
&MobileApp=TourAPI3.0_Guide
&introYN=Y

*필요한 정보*

[공통정보]
-이미지 	 firstimage
-개요            overview
-홈페이지        homepage
-위도 		 mapx
-경도		 mapy

 위도 , 경도 -> 지도보기 


[소개정보]
-주최자 연락처	sponsor1tel
-행사시작일	playtime
-행사종료일	playtime
-프로그램 	program  subevent



*/