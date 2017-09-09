//플러그인 설치가 선행되어야함[cordova plugin add cordova-plugin-geolocation]
//GPS사용가능한지 확인
/*function checkAvailability() {
    cordova.plugins.diagnostic.isGpsLocationEnabled(function(available){
        if (!available) {
            alert("내 위치 정보를 사용하려면, 단말기의 설정에서 '위치 서비스' 사용을 허용해주세요.");
            history.back();
        } else {
            gpsMapToilet();
        }
    }, function(error) {
        console.error("The following error occurred: " + error);
    });
}

checkAvailability();*/

/*function hospital() {
    checkAvailability();
}*/

//*본인 위치 위도경도 구하기*
/*function getPosition() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 360000
    });

    function onSuccess(position) {

        maptest(position.coords.latitude, position.coords.longitude);

    }

    function onError(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}*/

//********************4.의견남기기 클릭시 추가
function goComment(seq) {
   $("#"+divId).toggle();
   $.mobile.changePage("#commentWrt", { data : { SEQ : seq } });
}

//***********5.index.html에 추가   => 테스트
/*<div id="commentWrt" data-role="page> 
<form id="commentForm">
     <label for="userName">이름</label>
     <input name="userName" id="userName" type="text" value="">
    <label for="userName">내용</label>
     <input name="userName" id="userName" type="text" value="">
</form>

</div>*/


//index.html에서 onclick="gpsMapToilet"하면 js에서 가장 먼저 function gpsMapToilet() 함수 발생
// ==> 그 후 $(document).on('pagebeforeshow', '#toilet', function (){  처리     
    //구글지도 크기조정하여 지도 생성하기위해 pageshow 사용
$(document).on('pageshow', '#toilet', function (){    

      //다른 아이콘으로 표시
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        
        //ajax에서 데이터 넘겨줘야하니 무조건있어야함
        pos = {
          lat: 37.81774409, //가데이터
          lng: 127.7158701 //가데이터
            //실제 적용 데이터 lat: position.coords.latitude,
            //실제 적용 데이터 lng: position.coords.longitude
        };

        //-- test --
          $.ajax({
              url : "http://13.114.79.230:8080/gangwon/toilet",
              type : 'GET',
              async: true,
              data : pos,     //현재위치 
              crossdomain:true,
              dataType : "json",
              timeout: 600000, 
              success : function(data){
                alert("success")

                var map;

                map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 15 , //1이면 전세계 (기존 15)
                  center: new google.maps.LatLng(37.8174296, 127.7115919),
                  mapTypeId: 'roadmap'
                });

                var iconBase = 'http://localhost:8000/img/';
                var icons = {
                  myGpsLocation: {
                    icon: iconBase + 'gpsIcon.png'
                  },
                  dataLocation: {
                    icon: iconBase + 'mapIcon.png'
                  }
                };

               var contentString1 = [];
               var contentString1 = '<div id="toiletContent">현재 위치</div>'

               //실데이터(아래 주석풀어야)
/*                  var locations = [
                {position : new google.maps.LatLng(position.coords.latitude, position.coords.longitude), type:'myGpsLocation', content: contentString1}
                ];*/
               var locations = [
                {position : new google.maps.LatLng(37.8174296, 127.7158701), type:'myGpsLocation', content: contentString1 } //현재위치
               ];


               for(var i=0; i<data.length; i++){

                      contentString1 = '<div id="toiletContent">'+
                        '<h1 id="firstHeading" class="firstHeading">[화장실명] '+data[i].toilet_nm+'</h1>'+
                        '<div id="bodyContent">';

                      var contentString2;
                      var contentString3;
                      var contentString4;
                      var contentString5;
                      var contentString6;
                      var contentString7;
                      var contentString8;

                      if(data[i].locplc_roadnm_addr != ""){
                        contentString2 = '<p><b>도로명 주소 : </b>' +data[i].locplc_roadnm_addr +'<br/>';
                        contentString1 = contentString1 + contentString2;
                      }


                      if(data[i].locplc_lotno_addr != ""){
                        contentString3 = '<p><b>지번 주소 : </b>' +data[i].locplc_lotno_addr +'<br/>';
                        contentString1 = contentString1 + contentString3;
                      }

                      if(data[i].t_man3_su != 0 || data[i].t_man4_su != 0){
                        contentString4 = '<b> 남성용 : </b> 장애인용 - ' + parseInt(parseInt(data[i].t_man3_su)+parseInt(data[i].t_man4_su)) + '개, ';  
                        contentString1 = contentString1 + contentString4;
                      }if(data[i].t_man3_su == 0 && data[i].t_man4_su == 0){
                        contentString4 = '<b> 남성용 : </b> 장애인용 - 0개, ';  
                        contentString1 = contentString1 + contentString4;                    
                      }

                      if(data[i].t_man5_su != 0 || data[i].t_man6_su != 0){
                        contentString5 = '어린이용 - ' + parseInt(parseInt(data[i].t_man5_su)+parseInt(data[i].t_man6_su)) + '개<br/>';  
                        contentString1 = contentString1 + contentString5;
                      }if(data[i].t_man5_su == 0 && data[i].t_man6_su == 0){
                        contentString5 = '어린이용 - 0개<br/>';  
                        contentString1 = contentString1 + contentString5;
                      }

                      if(data[i].t_woman2_su != 0){
                        contentString6 = '<b> 여성용 : </b> 장애인용 - ' + parseInt(data[i].t_woman2_su)+ '개, ';  
                        contentString1 = contentString1 + contentString6;
                      }else{
                        contentString6 = '<b> 여성용 : </b> 장애인용 - 0개, ';  
                        contentString1 = contentString1 + contentString6;                    
                      }

                      if(data[i].t_woman3_su != 0){
                        contentString7 = '어린이용 - ' + parseInt(data[i].t_woman3_su) + '개';  
                        contentString1 = contentString1 + contentString7;
                      }else{
                        contentString7 = '어린이용 - 0개';  
                        contentString1 = contentString1 + contentString7;                    
                      }
 
                     //************************** 3.선택된 데이터의 seq를 가지고, 넘길 페이지 아이디를 가지고 페이지 넘기기
                      contentString8= '<br/><a href="javascript:goComment('+ data[i].seq + ');">의견남기기</a>'      //여기에 의견 텍스트입력하도록 해도되지만 의견남기기 클릭하면 다음페이지로 넘어가서 등록하도록 할거임
                      contentString1 = contentString1 + contentString8;

                      var loc={position : new google.maps.LatLng(parseFloat(data[i].lat), parseFloat(data[i].lng)), type:'dataLocation', content : contentString1 }; //lat "23.wqe" => ""를 없애야됨
                      locations.push(loc);
                }
            
                //가장 가까운 화장실 정보창으로 보여주기(위경도가 같을 경우 정보창을 닫고 열면 그 다음 화장실이 나옴)
                var marker = new google.maps.Marker({
                      position: locations[1].position,
                      icon: 'http://localhost:8000/img/mapIcon.png',
                      map: map
                });

                var infowindow = new google.maps.InfoWindow({
                      content: locations[1].content
                });

                infowindow.open(map, marker);
          
                // Create markers.
                locations.forEach(function(feature) {
            
                    var markers="";   //*****************************변경함 1.확인하기
                    var infowindow="";

                    markers = new google.maps.Marker({
                      position: feature.position,
                      icon: icons[feature.type].icon,
                      map: map
                    });

                    infowindow = new google.maps.InfoWindow({
                      content: feature.content
                    });

                    markers.addListener('click', function() {
                      infowindow.open(map, markers);
                    }); 
                
                 });

              },
              error:function(request,status,error){
                  alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
              },
              fail : function() {
                alert("인터넷 연결 상태를 확인해주세요.");
                      $('.wrap-loading').addClass('display-none');
              }      
          });

        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });

      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }


});