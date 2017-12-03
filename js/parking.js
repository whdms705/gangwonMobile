//플러그인 설치가 선행되어야함[cordova plugin add cordova-plugin-geolocation]
//GPS사용가능한지 확인[브라우저에서 테스트하려면 주석처리] //실제 안드로이드 배포시에는 checkAvailability 주석해제
function checkAvailability_parking() {
    cordova.plugins.diagnostic.isGpsLocationEnabled(function(available){
        
        if (!available) {
            alert("내 위치 정보를 사용하려면, 단말기의 설정에서 '위치 서비스' 사용을 허용해주세요.");
        } else {
            location.href="#parking";
            parkingInfo();
        }
    }, function(error) {
        console.error("The following error occurred: " + error);
    });
}
 //금병초있는곳 가데이터
var urlpath = 'http://13.114.79.230:8080/gangwon';
//var urlpath = 'http://localhost:8080';
var iconBase = urlpath +'/img/';
var icons = {
  myGpsLocation: {
    icon: iconBase + 'gpsIcon.png'
  },
  dataLocation: {
    icon: iconBase + 'mapIcon.png'
  }
};

var markers="";   
var infowindow="";
var map;
var locations;

//댓글 클릭시 리스트 (공중화장실꺼)
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
            console.log(JSON.stringify(data));

            $('input[name=seq]').attr('value',seq);

            //regYn이 y일 경우(댓글을 등록했을 경우 => append한거 나오지 않도록 초기화)   
            $('#parkingCommentList').empty();
            $('#parkingCommentRegist').empty();
            $('#parkingcommentCount').empty();  
            $('#parkingcommentCount').append("Comments("+data.length+")");

            var parkingcommentListContent1;
            var parkingcommentListContent2;
            var parkingcommentListContent3;


            //댓글리스트가 조회되지않을 경우
            if(data.length == 0 && data.seq == undefined && regYn == undefined){
                parkingcommentListContent1 = '댓글이 없습니다';
                parkingcommentListContent2 =  '<div class="form-group">'
                                      +'<input name="cmt_id" id="cmt_id" type="text" value="" placeholder="Your Name" class="form-control c-square">'
                                      +'</div>'
                                      +'<div class="form-group">'
                                      +'<input name="cmt_content" id="cmt_content" value="" class="form-control c-square">'
                                      +'</div>';
                parkingcommentListContent3 =  '<div class="form-group">' 
                                      +'<button id="cmtRegBut" onclick="goParkingCmtRegist(\''+seq+'\')" class="btn blue uppercase btn-md sbold btn-block" style="text-shadow:none;">등록</button>'
                                      +'</div>';
                parkingcommentListContent2 = parkingcommentListContent2 + parkingcommentListContent3;
               $("#parkingCommentList").append(parkingcommentListContent1);
               $("#parkingCommentRegist").append(parkingcommentListContent2);   //생성한리스트를 div에 붙여서 생성
            }else{                                             //댓글이 있을경우

                for(var i=0; i<data.length; i++){   //조회된 건수만큼 이름, 내용 찍기                  
                  parkingcommentListContent1 = '순번 :' + parseInt(parseInt(i)+parseInt(1)) +'<br/> 이름:'+data[i].cmt_id+'<br/>내용:' + data[i].cmt_content+'<br/><br/>';
                  parkingcommentListContent1 = '<div class="media">'
                                       +'<div class="media-body">'
                                       +'<h4 class="media-heading">'
                                       +'<span id="comment_name">'+data[i].cmt_id+'</span> on'
                                       +'<span class="c-date">'+data[i].cmt_dt+'</span>'
                                       +'</h4>'+data[i].cmt_content+'</div>'
                                       +'</div>'
                                       +'<hr>';      
                  $("#parkingCommentList").append(parkingcommentListContent1);   //생성한리스트를 div에 붙여서 생성                  
                }
                
                  parkingcommentListContent2 =  '<div class="form-group">'
                                        +'<input name="cmt_id" id="cmt_id" type="text" value="" placeholder="Your Name" class="form-control">'
                                        +'</div>'
                                        +'<div class="form-group">'
                                        +'<input name="cmt_content" id="cmt_content" value="" class="form-control c-square">'                                      
                                        +'</div>';
                  parkingcommentListContent3 =  '<div class="form-group">' 
                                        +'<button id="cmtRegBut" onclick="goParkingCmtRegist(\''+seq+'\')" class="btn blue uppercase btn-md sbold btn-block" style="text-shadow:none;">등록</button>'
                                        +'</div>';
                  parkingcommentListContent2 = parkingcommentListContent2 + parkingcommentListContent3;
                  console.log(parkingcommentListContent2);
                  $("#parkingCommentRegist").append(parkingcommentListContent2);   //생성한리스트를 div에 붙여서 생성
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
//location.reload();
$(document).on('pageshow', '#parking', function (){   //뒤로가기 버튼 누를때 셋팅 
      $('.p_wrap-loading').css('display','');

      //checkAvailability();    //안드로이드 배포 시 주석해제해야함
      
      //다른 아이콘으로 표시
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        
        //ajax에서 데이터 넘겨줘야하니 무조건있어야함
        pos = {
      //    lat: 37.81774409, //가데이터
      //    lng: 127.7158701 //가데이터
            //***********실제 적용 데이터 lat: position.coords.latitude,
            //***********실제 적용 데이터 lng: position.coords.longitude
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        map = new google.maps.Map(document.getElementById('parkingmap'), {
          zoom: 15 , //1이면 전세계 (기존 15)
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
 //         center: new google.maps.LatLng(37.8174296, 127.7115919),
          mapTypeId: 'roadmap'
        });

        //-- test --
          $.ajax({
              url  :urlpath + "/parking/j",
              //url:"http://localhost:8080/parking/j",
              type : 'GET',
              async: true,
              data : pos,     //현재위치 
              crossdomain:true,
              dataType : "json",
              timeout: 600000, 
              complete:function(){
                $('.p_wrap-loading').css('display','none');
              }, 
              success : function(data){

               var contentString1 = [];
               var contentString1 = '<div id="parkingContent">현재 위치</div>'

               //실데이터(아래 주석풀어야)
               locations = [
                {position : new google.maps.LatLng(position.coords.latitude, position.coords.longitude), type:'myGpsLocation', content: contentString1}
               ];

/*               locations = [
                {position : new google.maps.LatLng(37.8174296, 127.7158701), type:'myGpsLocation', content: contentString1 } //현재위치
               ];*/

               for(var i=0; i<data.length; i++){

                      contentString1 = '<div id="parkingContent"><b>[주차장명]</b> '+data[i].parking_nm;

                      var contentString2;
                      var contentString3;
                    /*  var contentString4;
                      var contentString5;
                      var contentString6;
                      var contentString7;
                      var contentString8;*/


                      if(data[i].locplc_roadnm_addr != ""){
                        contentString2 = '<br/><b>도로명 주소 : </b>' +data[i].locplc_roadnm_addr;
                        contentString1 = contentString1 + contentString2;
                      }


                      if(data[i].locplc_lotno_addr != ""){
                        contentString3 = '<br/><b>지번 주소 : </b>' +data[i].locplc_lotno_addr;
                        contentString1 = contentString1 + contentString3;
                      }

                      /*if(data[i].parking_part != ""){
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
                      }*/
 

                     //선택된 데이터의 seq를 가지고, 넘길 페이지 아이디를 가지고 페이지 넘기기
                      var contentString8= '<br/><a href="#" onclick="goParkingComment(\''+ data[i].seq + '\');" >댓글</a></div>';      //여기에 의견 텍스트입력하도록 해도되지만 의견남기기 클릭하면 다음페이지로 넘어가서 등록하도록 할거임
                      contentString1 = contentString1 + contentString8;

                      var loc={position : new google.maps.LatLng(parseFloat(data[i].lat), parseFloat(data[i].lng)), type:'dataLocation', content : contentString1 }; //lat "23.wqe" => ""를 없애야됨
                      locations.push(loc);
                    }
                      
                    // Create markers.
                    locations.forEach(function(feature) {

                      var markers = new google.maps.Marker({
                        position: feature.position,
                        icon: icons[feature.type].icon,
                        map: map
                      });

                      var infowindow = new google.maps.InfoWindow({
                        content: feature.content
                      });

                      markers.addListener('click', function() {
                        infowindow.open(map, markers);
                      }); 
                
                    });

                    //현재위치 정보창으로 보여주기
                    /*var marker = new google.maps.Marker({
                          position: locations[0].position,
                          icon: '/img/gpsIcon.png',         
                          map: map
                    });

                    var infowindow = new google.maps.InfoWindow({
                          content: locations[0].content
                    });

                    infowindow.open(map, marker);*/

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

      var marker = new google.maps.Marker({
            position: locations[1].position,
            icon: '/img/mapIcon.png',
            map: map
      });

      var infowindow = new google.maps.InfoWindow({
            content: locations[1].content
      });

      infowindow.open(map, marker);
}

//댓글 등록 시 [초기, 등록 후 모두 seq 들어감]
function goParkingCmtRegist(seq){

      //유효성체크
      if( $('input[name=seq]').val() != "" && $('input[name=cmt_id]').val() == "")
      {
           alert( "댓글을 등록하려면 이름을 입력하세요" );
           //return false;
           return goParkingComment(seq);
      }
      if( $('input[name=seq]').val() != "" && $('#cmt_content').val() == "" )
      {    
          alert( "댓글을 등록하려면 내용을 입력하세요" );
          return goParkingComment(seq);
      }
    
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