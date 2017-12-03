//지도 위경도 추가
var mapx;
var mapy;
var contentString1;      //지도 infowindow정보
//지도 위경도 추가
var food_more_count;

var urlpath = 'http://13.114.79.230:8080/gangwon';

function foodInfo(nation){
  $.mobile.changePage("#food");

  food_more_count=1;

  var now = new Date();
  var year= now.getFullYear();
  var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
          
  var startDate = year + '-' + mon + '-' + day;
  console.log(" now() -> "+startDate);

	var service="KorService";
	var contentTypeId_temp="82"
	var more_btn="";  
	if(nation=="kr"){
		service="KorService";
        more_btn = '<button class="btn blue btn-block" onclick="foodMore(\''+nation+'\');">더보기</button>'
        $("#food_more").empty().append(more_btn);
        contentTypeId_temp="39"
	}else if(nation=="jp"){ // 82
		service="JpnService";
        more_btn = '<button class="btn blue btn-block" onclick="foodMore(\''+nation+'\');">더보기</button>'
        $("#food_more").empty().append(more_btn);
	}else if(nation=="ca"){
		service="ChsService";
        more_btn = '<button class="btn blue btn-block" onclick="foodMore(\''+nation+'\');">더보기</button>'
        $("#food_more").empty().append(more_btn);
	}else if(nation=="en"){
		service="EngService";
        more_btn = '<button class="btn blue btn-block" onclick="foodMore(\''+nation+'\');">더보기</button>'
        $("#food_more").empty().append(more_btn);
	}
  

  // 음식점 -> 음식 -> 음식점 ->전라북도 -> 전주시 -> 등록순(이미지)
  var url = "http://api.visitkorea.or.kr/openapi/service/rest/"+service+"/areaBasedList?"
  			+"ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D"
  			+"&contentTypeId="+contentTypeId_temp
  			+"&areaCode=37"
  			+"&sigunguCode=12"
  			+"&cat1=A05"
  			+"&cat2=A0502"
  			+"&cat3="
  			+"&listYN=Y"
  			+"&MobileOS=ETC"
  			+"&MobileApp=TourAPI3.0_Guide"
  			+"&arrange=R"
  			+"&numOfRows=12"
  			+"&pageNo="+food_more_count;

  console.log(url)

	$.ajax({
	    url : url,
	    type : "GET",
	    dataType: "xml",
        crossDomain: true,
	    success : function(res){
	        $("#food_content").empty();


	        $(res).find('item').each(function(){

	        	
	        		var title = $(this).find("title").text();
	        		var image1 = $(this).find("firstimage").text();
	        		var contenttypeid = $(this).find("contenttypeid").text();
	        		var contentid = $(this).find("contentid").text();

	        		console.log(contenttypeid +"  "+contentid );
	        		if(image1===""){
	        			image1= urlpath +"/img/noImage.png";
	        		}
	        		var food_content=foodcontent(image1,title,contenttypeid,contentid,service);
	        		console.log(food_content)
	        		$("#food_content").append(food_content);		


	        });



	    }
	});


}


// 축제보기 더보기 버튼 클릭시
function foodMore(nation){
  food_more_count=food_more_count+1;

  var now = new Date();
  var year= now.getFullYear();
  var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
          
  var startDate = year + '-' + mon + '-' + day;
  console.log(" now() -> "+startDate);

  	var dataMaxMessage="";
	var service="KorService";
	if(nation=="kr"){
		dataMaxMessage="현재 데이터가 최대입니다!";
		service="KorService";
	}else if(nation=="jp"){
		dataMaxMessage="現在のデータが最大です！";
		service="JpnService";
	}else if(nation=="ca"){
		dataMaxMessage="目前的数据是最大的！";
		service="ChsService";
	}else if(nation=="en"){
		dataMaxMessage="Current data is maximum!";
		service="EngService";
	}
  
  //var url = "http://api.visitkorea.or.kr/openapi/service/rest/"+service+"/searchFestival?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D&eventStartDate="+startDate+"&eventEndDate=&areaCode=37&sigunguCode=12&cat1=A02&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=R&numOfRows=12&pageNo="+festival_more_count;
  var url = "http://api.visitkorea.or.kr/openapi/service/rest/"+service+"/areaBasedList?"
  			+"ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D"
  			+"&contentTypeId=39"
  			+"&areaCode=37"
  			+"&sigunguCode=12"
  			+"&cat1=A05"
  			+"&cat2=A0502"
  			+"&cat3="
  			+"&listYN=Y"
  			+"&MobileOS=ETC"
  			+"&MobileApp=TourAPI3.0_Guide"
  			+"&arrange=R"
  			+"&numOfRows=12"
  			+"&pageNo="+food_more_count;

	$.ajax({
	    url : url,
	    type : "GET",
	    dataType: "xml",
        crossDomain: true,
	    success : function(res){
	    	console.log(res);
	        console.log("response data : "+res);
			var totalCount=$(res).find('totalCount').text();
			if(totalCount=="0"){
				alert(dataMaxMessage);
			}        

	        $(res).find('item').each(function(){

	        	
	        		var title = $(this).find("title").text();
	        		var image1 = $(this).find("firstimage").text();
	        		var contenttypeid = $(this).find("contenttypeid").text();
	        		var contentid = $(this).find("contentid").text();

	        		console.log(contenttypeid +"  "+contentid );
	        		if(image1===""){
	        			image1=urlpath +"/img/noImage.png";
	        		}
	        		var food_content=content(image1,title,contenttypeid,contentid,service);
	        		console.log(food_content)
	        		$("#food_content").append(food_content);		


	        });



	    }
	});


}


function foodcontent(image1,title,contenttypeid,contentid,service){
    
    //너무 긴 제목을 점점으로 처리 
	var title_temp=title.substring(9,title.length);
	//console.log("title_temp : "+title_temp);
	title=title.replace(title_temp,"..");
	//console.log("title : "+title);

	//console.log("function content(..) -> "+contenttypeid+" / "+contentid);
	console.log("contnent -> service "+service)
	var mappingInfo=contenttypeid+","+contentid+","+service; // 상세정보를 가져오기 위한 정보
	console.log("contnent -> mappingInfo "+mappingInfo);

 		var content='<div class="col-xs-6" style="padding-left: 10px;padding-right: 10px;">'
               +'<div onclick="foodcontentDetail(\''+mappingInfo+'\');" class="color-demo tooltips" data-original-title="Click to view demos for this color" >'
	           +'<div style="width:100%;height:100px;margin-left:auto;margin-right:auto" >'
	           +'<img style="width:100%;height:100px; text-align: center;" src="'+image1+'" align="middle" >'
	           +'</div>'
	           +'<div class="color-info bg-white c-font-14 sbold">'
	           + title
	           +'</div>'
	           +'</div>'
	           +'</div>';

/*	 	var content='<div class="col-xs-6" style="padding-left: 10px;padding-right: 10px;">'
               +'<div onclick="contentDetail(\''+mappingInfo+'\');" class="color-demo tooltips" data-original-title="Click to view demos for this color" >'
	           +'<div class="prac">'
	           +'</div>'
	           +'<div class="color-info bg-white c-font-14 sbold">'
	           + title
	           +'</div>'
	           +'</div>'
	           +'</div>';*/

	return content;
}

function foodcontentDetail(mappingInfo){
	console.log("foodcontentDetail function ----------------------------------------- ");
	$("#food_info").empty()
	var temp = mappingInfo.split(",");
	var contenttypeid = temp[0];
	var contentid = temp[1];
	var service = temp[2]; 
	
	$.mobile.changePage( "#foodDetail", { transition: "slideup", changeHash: false });

	var  food_info="";

	// start of festival common
	var url ="http://api.visitkorea.or.kr/openapi/service/rest/"+service+"/detailCommon?"
			+"ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D"
			+"&contentTypeId="+contenttypeid
			+"&contentId="+contentid
			+"&MobileOS=ETC"
			+"&MobileApp=TourAPI3.0_Guide"
			+"&defaultYN=Y"
			+"&firstImageYN=Y"
			+"&areacodeYN=Y"
			+"&catcodeYN=Y"
			+"&addrinfoYN=Y"
			+"&mapinfoYN=Y"
			+"&overviewYN=Y"
			+"&transGuideYN=Y";
	
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
	        		var overview_temp = $(this).find("overview").text(); // 개요
	        		var overview = overview_temp.replace(/<br>/gi, "");

	        		var homepage = $(this).find("homepage").text(); // 홈페이지
	        		var tel = $(this).find("tel").text();


					//************************************추가****************//
                   //지도 위경도 값 받아오기 추가(리스트마다 값 가지기)=>현재 처음값만 가져옴
                       mapx=$(this).find("mapx").text();
                       mapy=$(this).find("mapy").text();
                   var addr = $(this).find("addr1").text();

                   contentString1 = '<div id="foodContent"><b>[가게명]</b>'+title;
                    var contentString2;
                    
                   if(addr != "" && addr != undefined){
                     contentString2 = '<br/><b>주소 : </b>' +addr;
                     contentString1 = contentString1 + contentString2;
                   }
                   //지도 추가 끝        

	        		console.log(title +"  "+image1 );
	        		if(image1===""){
	        			image1=urlpath +"/img/noImage.png";
	        		}

	        		$("#food_title").text(title);
	        		$("#food_summary").html(overview);
	        		$("#food_image").attr("src",image1);
	        		if(homepage != "" && homepage !=null){
	        			console.log("homepage : "+homepage)
	        			//food_info="<p style='color:black;'><strong>홈페이지 : </strong>"+homepage+"</p>"; // 임시 주석처리 
	        		}
	        		
	        		if(tel != "" && tel !=null){
	        			food_info=food_info+"<p><strong>연락처 : </strong><a style='color: black' href='tel://"+tel+"'>"+tel+"</a></p>";
	        		}


	        });



	    }
	});
	// end of festival common
	
	// start of food detail
	 	url ="http://api.visitkorea.or.kr/openapi/service/rest/"+service+"/detailIntro?"
	 	    +"ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D"
	 	    +"&contentTypeId="+contenttypeid
	 	    +"&contentId="+contentid
	 	    +"&MobileOS=ETC"
	 	    +"&MobileApp=TourAPI3.0_Guide"
	 	    +"&introYN=Y";
		
		$.ajax({
	    url : url,
	    type : "GET",
	    dataType: "xml",
        crossDomain: true,
	    success : function(res){
	    	console.log(res);
	        console.log("response detail data : "+res);

	        $(res).find('item').each(function(){

	        	
	        		var restdatefood = $(this).find("restdatefood").text();
	        		
	        		if(restdatefood != "" && restdatefood !=null){
	        			food_info=food_info+"<p><strong>쉬는날 : </strong>"+restdatefood+"</p>";
	        		}
	        		
	        		$("#food_info").empty().html(food_info);//---171203


	        });

	        



	    }
	});
	// end of food detail

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

//http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D&eventStartDate=2017-09-20&eventEndDate=&areaCode=32&sigunguCode=&cat1=A02&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=Q&numOfRows=12&pageNo=1

//상세공통
//http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D&contentTypeId=15&contentId=1718491&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&transGuideYN=Y
function foodMapSeq(){
   $(document).on('pageshow', '#foodMap', function (){  
       
       //현재 횡성군 정보만 다나옴. detail들어갈때 mapx,mapy,contentString1을 함께 넘겨줘야함
      
       var fesMap = {lat: parseFloat(mapy), lng: parseFloat(mapx)};

       var map = new google.maps.Map(document.getElementById('fdmap'), {
           zoom: 15 , //1이면 전세계 (기존 15)
           center: fesMap,  //강원도청
   //        center: new google.maps.LatLng(37.8828686, 127.7220181),  //강원도청
           mapTypeId: 'roadmap'
       });

       var marker = new google.maps.Marker({
             position: fesMap,
             map: map
       });

        var infowindow = new google.maps.InfoWindow({
            content: contentString1
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        infowindow.open(map, marker);

    });
}