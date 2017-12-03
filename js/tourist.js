//지도 위경도 추가
var touristmapx;
var touristmapy;
var touristcontentString1;      //지도 infowindow정보
//지도 위경도 추가
var tourist_more_count;

var urlpath = 'http://13.114.79.230:8080/gangwon';

function touristInfo(nation){
  $.mobile.changePage("#tourist");
  tourist_more_count=1;
  var now = new Date();
  var year= now.getFullYear();
  var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
          
  var startDate = year + '-' + mon + '-' + day;
  

  var touristservice="KorService";
  var tourist_more_btn="";
  var contentTypeId = "76"
  

	if(nation=="kr"){
		touristservice="KorService";
		tourist_more_btn = '<button class="btn blue btn-block" onclick="touristMore(\''+nation+'\');">더보기</button>'
        $("#tourist_more").empty().append(tourist_more_btn);
        contentTypeId = "12"
	}else if(nation=="jp"){
		touristservice="JpnService";
		tourist_more_btn = '<button class="btn blue btn-block" onclick="touristMore(\''+nation+'\');">더보기</button>'
        $("#tourist_more").empty().append(tourist_more_btn);
        contentTypeId = "76"
	}else if(nation=="ca"){
		touristservice="ChsService";
		tourist_more_btn = '<button class="btn blue btn-block" onclick="touristMore(\''+nation+'\');">더보기</button>'
        $("#tourist_more").empty().append(tourist_more_btn);
        contentTypeId = "76"
	}else if(nation=="en"){
		touristservice="EngService";
		tourist_more_btn = '<button class="btn blue btn-block" onclick="touristMore(\''+nation+'\');">더보기</button>'
        $("#tourist_more").empty().append(tourist_more_btn);
        contentTypeId = "76"
	}
  

  // 축제공연행사 -> 인문 -> 전주시 -> 최근이미지수정순
  //var url = "http://api.visitkorea.or.kr/openapi/service/rest/"+service+"/searchFestival?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D&eventStartDate="+startDate+"&eventEndDate=&areaCode=32&sigunguCode=&cat1=A02&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=Q&numOfRows=12&pageNo="+festival_more_count;
  // 관광지 -> 전주시 -> 인기순(이미지)
  var url = "http://api.visitkorea.or.kr/openapi/service/rest/"+touristservice+"/areaBasedList?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D"
           +"&contentTypeId="+contentTypeId
           +"&areaCode=37"
           +"&sigunguCode=12"
           +"&cat1="
           +"&cat2="
           +"&cat3="
           +"&listYN=Y"
           +"&MobileOS=ETC"
           +"&MobileApp=TourAPI3.0_Guide"
           +"&arrange=R"
           +"&numOfRows=12"
           +"&pageNo="+tourist_more_count;

	$.ajax({
	    url : url,
	    type : "GET",
	    dataType: "xml",
        crossDomain: true,
	    success : function(res){
	    	//console.log(res);
	        //console.log("response data : "+res);
	        $("#tourist_content").empty();


	        $(res).find('item').each(function(){

	        	
	        		var title = $(this).find("title").text();
	        		var image1 = $(this).find("firstimage").text();
	        		var contenttypeid = $(this).find("contenttypeid").text();
	        		var contentid = $(this).find("contentid").text();

	        		//console.log(contenttypeid +"  "+contentid );
	        		if(image1===""){
	        			image1=urlpath +"/img/noImage.png";
	        		}
	        		var tourist_content=touristcontent(image1,title,contenttypeid,contentid,touristservice);
	        		//console.log(tourist_content)
	        		$("#tourist_content").append(tourist_content);		


	        });



	    }
	});


}


// 관장지 더보기 버튼 클릭시
function touristMore(nation){
  tourist_more_count=tourist_more_count+1;
  
  var now = new Date();
  var year= now.getFullYear();
  var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
          
  var startDate = year + '-' + mon + '-' + day;
 
  
  	var dataMaxMessage="";
	var touristservice="KorService";
	var contentTypeId = "76"
	if(nation=="kr"){
		dataMaxMessage="현재 데이터가 최대입니다!";
		touristservice="KorService";
		contentTypeId = "12"
	}else if(nation=="jp"){
		dataMaxMessage="現在のデータが最大です！";
		touristservice="JpnService";
		contentTypeId = "76"
	}else if(nation=="ca"){
		dataMaxMessage="目前的数据是最大的！";
		touristservice="ChsService";
		contentTypeId = "76"
	}else if(nation=="en"){
		dataMaxMessage="Current data is maximum!";
		touristservice="EngService";
		contentTypeId = "76"
	}
  
    var url = "http://api.visitkorea.or.kr/openapi/service/rest/"+touristservice+"/areaBasedList?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D"
           +"&contentTypeId="+contentTypeId
           +"&areaCode=37"
           +"&sigunguCode=12"
           +"&cat1="
           +"&cat2="
           +"&cat3="
           +"&listYN=Y"
           +"&MobileOS=ETC"
           +"&MobileApp=TourAPI3.0_Guide"
           +"&arrange=R"
           +"&numOfRows=12"
           +"&pageNo="+tourist_more_count;

	$.ajax({
	    url : url,
	    type : "GET",
	    dataType: "xml",
        crossDomain: true,
	    success : function(res){
	    	//console.log(res);
	        //console.log("response data : "+res);
	        var totalCount=$(res).find('totalCount').text();
	        if(totalCount=="0"){
				alert(dataMaxMessage);
			}

	        $(res).find('item').each(function(){

	        	
	        		var title = $(this).find("title").text();
	        		var image1 = $(this).find("firstimage").text();
	        		var contenttypeid = $(this).find("contenttypeid").text();
	        		var contentid = $(this).find("contentid").text();

	        		//console.log(contenttypeid +"  "+contentid );
	        		if(image1===""){
	        			image1=urlpath +"/img/noImage.png";
	        		}
	        		var tourist_content=content(image1,title,contenttypeid,contentid,touristservice);
	        		//console.log(tourist_content)
	        		$("#tourist_content").append(tourist_content);		


	        });



	    }
	});


}


function touristcontent(image1,title,contenttypeid,contentid,touristservice){
    console.log("touristcontent         ------------------- ")
    //너무 긴 제목을 점점으로 처리 
	var title_temp=title.substring(9,title.length);
	//console.log("title_temp : "+title_temp);
	title=title.replace(title_temp,"..");
	//console.log("title : "+title);

	//console.log("function content(..) -> "+contenttypeid+" / "+contentid);

	var mappingInfo=contenttypeid+","+contentid+","+touristservice; // 상세정보를 가져오기 위한 정보
	console.log(" mappingInfo : "+mappingInfo)

	var content='<div class="col-xs-6" style="padding-left: 10px;padding-right: 10px;">'
               +'<div onclick="touristcontentDetail(\''+mappingInfo+'\');" class="color-demo tooltips" data-original-title="Click to view demos for this color" >'
	           +'<div style="width:100%;height:100px;margin-left:auto;margin-right:auto" >'
	           +'<img style="width:100%;height:100px; text-align: center;" src="'+image1+'" align="middle" >'
	           +'</div>'
	           +'<div class="color-info bg-white c-font-14 sbold">'
	           + title
	           +'</div>'
	           +'</div>'
	           +'</div>';

	return content;
}

function touristcontentDetail(mappingInfo){
	console.log("tourist contentDetail function ----------------------------------------- ");
	$("#tourist_info").empty();
	
	var temp = mappingInfo.split(",");
	var contenttypeid = temp[0];
	var contentid = temp[1];
	var touristservice = temp[2]; 


	$.mobile.changePage( "#touristDetail", { transition: "slideup", changeHash: false });

	var  tourist_info="";

	// start of festival common
	var url ="http://api.visitkorea.or.kr/openapi/service/rest/"+touristservice+"/detailCommon?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D&contentTypeId="+contenttypeid+"&contentId="+contentid+"&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&transGuideYN=Y";
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
	        			overview = overview.replace(/<br>/gi, "");
	        		var homepage = $(this).find("homepage").text(); // 홈페이지 

					//************************************추가****************//
                   //지도 위경도 값 받아오기 추가(리스트마다 값 가지기)=>현재 처음값만 가져옴
                       touristmapx=$(this).find("mapx").text();
                       touristmapy=$(this).find("mapy").text();
                   var addr = $(this).find("addr1").text();

                   touristcontentString1 = '<div id="touristContent"><b>[축제명]</b>'+title;
                    var touristcontentString2;
                    
                   if(addr != "" && addr != undefined){
                     touristcontentString2 = '<br/><b>주소 : </b>' +addr;
                     touristcontentString1 = touristcontentString1 + touristcontentString2;
                   }
                   //지도 추가 끝        

	        		console.log(title +"  "+image1 );
	        		if(image1===""){
	        			image1=urlpath +"/img/noImage.png";
	        		}

	        		$("#tourist_title").text(title);
	        		$("#tourist_summary").html(overview);
	        		$("#tourist_image").attr("src",image1);
	        		if(homepage != "" && homepage !=null){
	        			console.log("homepage : "+homepage)
	        			//tourist_info="<p style='color:black;><strong>홈페이지 : </strong>"+homepage+"</p>";
	        		}
	        		


	        });



	    }
	});
	// end of festival common

	// start of festival detail
	 	url ="http://api.visitkorea.or.kr/openapi/service/rest/"+touristservice+"/detailIntro?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D&contentTypeId="+contenttypeid+"&contentId="+contentid+"&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&introYN=Y";
		


		$.ajax({
	    url : url,
	    type : "GET",
	    dataType: "xml",
        crossDomain: true,
	    success : function(res){
	    	console.log(res);

	        $(res).find('item').each(function(){

	        	
	        		 var infocenter = $(this).find("infocenter").text();
	                 var usetime = $(this).find("usetime").text();
    	             var expguide = $(this).find("expguide").text();


		        	 if(infocenter != ""&&infocenter !=null){
	                    tourist_info=tourist_info+"<p><strong>연락처 : </strong><a style='color: black' href='tel://"+infocenter+"'>"+infocenter+"</a></p>";;
	                 }
	                 if(usetime != ""&&usetime !=null){
	                    tourist_info=tourist_info+"<p><strong>이용기간 : </strong>"+usetime+"</p>";
	                 }
	                 if(expguide != ""&&expguide !=null){
	                    tourist_info=tourist_info+"<p><strong>활동안내 : </strong>"+expguide+"</p>";
	                 }

	        		$("#tourist_info").html(tourist_info); //---171203

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

//http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D&eventStartDate=2017-09-20&eventEndDate=&areaCode=32&sigunguCode=&cat1=A02&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=Q&numOfRows=12&pageNo=1

//상세공통
//http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=qK1psrABUse%2B6Tww%2FOK5CxjWAGvy4TvUqb45X%2BPfcy5rPmaANYIhQbIXxobp1H7TYAeFDE%2BYSQsbndxWweL9zA%3D%3D&contentTypeId=15&contentId=1718491&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&transGuideYN=Y
function touristMapSeq(){
   $(document).on('pageshow', '#touristMap', function (){  
       
       //현재 횡성군 정보만 다나옴. detail들어갈때 mapx,mapy,contentString1을 함께 넘겨줘야함

       var tourMap = {lat: parseFloat(touristmapy), lng: parseFloat(touristmapx)};

       var map = new google.maps.Map(document.getElementById('tourmap'), {
           zoom: 15 , //1이면 전세계 (기존 15)
           center: tourMap,  //강원도청
   //        center: new google.maps.LatLng(37.8828686, 127.7220181),  //강원도청
           mapTypeId: 'roadmap'
       });

       var marker = new google.maps.Marker({
             position: tourMap,
             map: map
       });

        var infowindow = new google.maps.InfoWindow({
            content: touristcontentString1
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        infowindow.open(map, marker);

    });
}