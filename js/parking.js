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

//댓글 클릭시 리스트 
var urlpath = 'http://13.114.79.230:8080/gangwon';

function goParkingComment(seq, regYn) {
    var regYn;             //등록 여부 => 등록 후 해당 함수 부를때 댓글이 없습니다 보이지 않게 하기 위함
    var seq = seq;

      $.ajax({

          url : urlpath +"/parkingCmtList",
          type : 'GET',
          async: false,
          data : { "seq" : seq },     //현재위치 
          crossdomain:true,
          dataType : "json",
          timeout: 600000, 
          success : function(data){

            $('input[name=seq]').attr('value',seq);

            //regYn이 y일 경우(댓글을 등록했을 경우 => append한거 나오지 않도록 초기화)   
            $('#parkingCommentList').empty();
            $('#parkingCommentRegist').empty();

            var commentListContent1;
            //댓글리스트가 조회되지않을 경우
            if(data.length == 0 && data.seq == undefined && regYn == undefined){
                commentListContent1 = '댓글이 없습니다';
                commentListContent2 = '<div id="parkingCommentRegist"><label for="cmt_id">이름</label><input name="cmt_id" id="cmt_id" type="text" value=""><label for="cmt_content">내용</label><input name="cmt_content" id="cmt_content" type="text" value="">';
                commentListContent1 = commentListContent1 + commentListContent2;
                commentListContent3 = '<button class="ui-btn" id="cmtRegBut" onclick="goParkingCmtRegist(\''+seq+'\')" style="height:40px;">등록</button></div>'
                commentListContent1 = commentListContent1 + commentListContent3;
               $("#parkingCommentList").append(commentListContent1);   //생성한리스트를 div에 붙여서 생성
            }else{                                             //댓글이 있을경우

                for(var i=0; i<data.length; i++){   //조회된 건수만큼 이름, 내용 찍기                  
                  commentListContent1 = '순번 :' + parseInt(parseInt(i)+parseInt(1)) +'<br/> 이름:'+data[i].cmt_id+'<br/>내용:' + data[i].cmt_content+'<br/><br/>';                 
                  $("#parkingCommentList").append(commentListContent1);   //생성한리스트를 div에 붙여서 생성                  
                }
                
                  commentListContent2 = '<label for="cmt_id">이름</label><input name="cmt_id" id="cmt_id" type="text" value=""><label for="cmt_content">내용</label><input name="cmt_content" id="cmt_content" type="text" value="">';
                  commentListContent3 = '<button class="ui-btn" id="cmtRegBut" onclick="goParkingCmtRegist(\''+seq+'\')" style="height:40px;">등록</button>'
                  commentListContent2 = commentListContent2 + commentListContent3;
                  $("#parkingCommentRegist").append(commentListContent2);   //생성한리스트를 div에 붙여서 생성
            }

            location.href = "#parkingCommentWrt?seq="+seq;      //페이지 이동

          },
          error:function(request,status,error){
              alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          },
          fail : function() {
            alert("인터넷 연결 상태를 확인해주세요.");
                  $('.wrap-loading').addClass('display-none');
          }      
      });
}

function parkingInfo(){
//주차장찾기 버튼 클릭시 자신위치와 주차장 정보 보여줌(가장 가까운 화장실이 정보창으로 뜸)
$(document).on('pageshow', '#parking', function (){   //뒤로가기 버튼 누를때 셋팅 

      //다른 아이콘으로 표시
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        
        //ajax에서 데이터 넘겨줘야하니 무조건있어야함
        pos = {
          lat: 37.81774409, //가데이터
          lng: 127.7158701 //가데이터
            //***********실제 적용 데이터 lat: position.coords.latitude,
            //***********실제 적용 데이터 lng: position.coords.longitude
        };

        //-- test --
          $.ajax({
              url  :urlpath + "/parking",
              type : 'GET',
              async: true,
              data : pos,     //현재위치 
              crossdomain:true,
              dataType : "json",
              timeout: 600000, 
              success : function(data){
                var map;

                map = new google.maps.Map(document.getElementById('parkingmap'), {
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
               var contentString1 = '<div id="parkingContent">현재 위치</div>'

               //실데이터(아래 주석풀어야)
/*                  var locations = [
                {position : new google.maps.LatLng(position.coords.latitude, position.coords.longitude), type:'myGpsLocation', content: contentString1}
                ];*/
               var locations = [
                {position : new google.maps.LatLng(37.8174296, 127.7158701), type:'myGpsLocation', content: contentString1 } //현재위치
               ];


               for(var i=0; i<data.length; i++){

                      contentString1 = '<div id="parkingContent">'+
                        '<h1 id="firstHeading" class="firstHeading">[주차장명] '+data[i].parking_nm+'</h1>'+
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

                      if(data[i].parking_part != ""){
                        contentString4 = '<b> 주차장구분 : </b>' + data[i].parking_part + '<br/>';  
                        contentString1 = contentString1 + contentString4;
                      }

                      if(data[i].parking_type != ""){
                        contentString5 = '<b> 주차장유형 : </b>' + data[i].parking_type + '<br/>';  
                        contentString1 = contentString1 + contentString5;
                      }

                      if(data[i].p_pay != ""){
                        contentString6 = '<b> 요금정보 : </b> ' + data[i].p_pay + '<br/> ';  
                        contentString1 = contentString1 + contentString6;
                      }
 
                     if(data[i].contact != undefined){
                        contentString7 = '<b> 연락처 : </b> ' + data[i].contact + '<br/> ';  
                        contentString1 = contentString1 + contentString7;
                      }
 

                     //선택된 데이터의 seq를 가지고, 넘길 페이지 아이디를 가지고 페이지 넘기기
                      contentString8= '<a href="#" onclick="goParkingComment(\''+ data[i].seq + '\');" >댓글</a>';      //여기에 의견 텍스트입력하도록 해도되지만 의견남기기 클릭하면 다음페이지로 넘어가서 등록하도록 할거임
                      contentString1 = contentString1 + contentString8;

                      var loc={position : new google.maps.LatLng(parseFloat(data[i].lat), parseFloat(data[i].lng)), type:'dataLocation', content : contentString1 }; //lat "23.wqe" => ""를 없애야됨
                      locations.push(loc);
                    }
            
                    //현재위치 정보창으로 보여주기
                    var marker = new google.maps.Marker({
                          position: locations[0].position,
                          icon: '/img/gpsIcon.png',         
                          map: map
                    });

                    var infowindow = new google.maps.InfoWindow({
                          content: locations[0].content
                    });

                    infowindow.open(map, marker);
          
                    // Create markers.
                    locations.forEach(function(feature) {
            
                      var markers="";   
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
}

//가장가까운주차장찾기 버튼 클릭시 
function nearParkingSearch(){

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
              url : urlpath +"/parking",
              type : 'GET',
              async: true,
              data : pos,     //현재위치 
              crossdomain:true,
              dataType : "json",
              timeout: 600000, 
              success : function(data){
                var map;

                map = new google.maps.Map(document.getElementById('parkingmap'), {
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
               var contentString1 = '<div id="parkingContent">현재 위치</div>'

               //실데이터(아래 주석풀어야)
/*                  var locations = [
                {position : new google.maps.LatLng(position.coords.latitude, position.coords.longitude), type:'myGpsLocation', content: contentString1}
                ];*/
               var locations = [
                {position : new google.maps.LatLng(37.8174296, 127.7158701), type:'myGpsLocation', content: contentString1 } //현재위치
               ];


               for(var i=0; i<data.length; i++){

                      contentString1 = '<div id="parkingContent">'+
                        '<h1 id="firstHeading" class="firstHeading">[주차장명] '+data[i].parking_nm+'</h1>'+
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

                      if(data[i].parking_part != ""){
                        contentString4 = '<b> 주차장구분 : </b>' + data[i].parking_part + '<br/>';  
                        contentString1 = contentString1 + contentString4;
                      }

                      if(data[i].parking_type != ""){
                        contentString5 = '<b> 주차장유형 : </b>' + data[i].parking_type + '<br/>';  
                        contentString1 = contentString1 + contentString5;
                      }

                      if(data[i].p_pay != ""){
                        contentString6 = '<b> 요금정보 : </b> ' + data[i].p_pay + '<br/> ';  
                        contentString1 = contentString1 + contentString6;
                      }

                      if(data[i].contact != undefined){
                        contentString7 = '<b> 연락처 : </b> ' + data[i].contact + '<br/> ';  
                        contentString1 = contentString1 + contentString7;
                      }
 
                     //선택된 데이터의 seq를 가지고, 넘길 페이지 아이디를 가지고 페이지 넘기기
                      contentString8= '<a href="#" onclick="goParkingComment(\''+ data[i].seq + '\');" >댓글</a>';      //여기에 의견 텍스트입력하도록 해도되지만 의견남기기 클릭하면 다음페이지로 넘어가서 등록하도록 할거임
                      contentString1 = contentString1 + contentString8;
                      
                      var loc={position : new google.maps.LatLng(parseFloat(data[i].lat), parseFloat(data[i].lng)), type:'dataLocation', content : contentString1 }; //lat "23.wqe" => ""를 없애야됨
                      locations.push(loc);
                    }
            
                    //가장 가까운 주차장 정보창으로 보여주기
                    var marker = new google.maps.Marker({
                          position: locations[1].position,
                          icon: '/img/mapIcon.png',
                          map: map
                    });

                    var infowindow = new google.maps.InfoWindow({
                          content: locations[1].content
                    });

                    infowindow.open(map, marker);
          
                    // Create markers.
                    locations.forEach(function(feature) {
            
                      var markers="";  
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

}

//댓글 등록 시 [초기, 등록 후 모두 seq 들어감]
function goParkingCmtRegist(seq){
    
      $.ajax({
          url : urlpath +"/parkingCmtRegist",           
          type : 'POST',
          async: false,
          data : $("#parkingCommentForm").serialize(),     
          crossdomain:true,
          timeout: 600000, 
          success : function(data){ 
   
            //등록이 완료되면 다시 함수를 불러서 새로고침(스프링에서 반환값으로 seq 받아서 다시 의견남기기 화면으로 가기)
            goParkingComment(seq, 'y');   

          },
          error:function(request,status,error){
              alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          },
          fail : function() {
            alert("인터넷 연결 상태를 확인해주세요.");
                  $('.wrap-loading').addClass('display-none');
          }      
      });

}