
function checkAvailability(){
    var result;
    var pos;
    cordova.plugins.diagnostic.isGpsLocationAvailable(function(available){
        //console.log("GPS location is " + (available ? "available" : "not available"));
 //       alert("GPS location is " + (available ? "available" : "not available"));
        if(!available){
/*            alert("!available")
            result = checkAuthorization();
            alert("whdms : " +result)*/
            checkAuthorization();
        }else{
            //**gps 설정이 되어있기 때문에 허용하라는 팝업 필요없음
            //console.log("GPS location is ready to use");
            /*alert("GPS location is ready to use");
            if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        alert(" navigator.geolocation.")
                        //ajax에서 데이터 넘겨줘야하니 무조건있어야함
                        pos = {
                          //lat: 37.81774409, //가데이터
                          //lng: 127.7158701 //가데이터
                            //***********실제 적용 데이터 lat: position.coords.latitude,
                            //***********실제 적용 데이터 lng: position.coords.longitude
                            lat: position.coords.latitude,
                            lng: position.coords.longitude

                        };
                        alert("pos setting");
                        $("#lat").val(position.coords.latitude);
                        $("#lng").val(position.coords.longitude);



                    }, function() {
                      handleLocationError(true, infoWindow, map.getCenter());
                    });

            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }*/

        }
    }, function(error){
        //console.error("The following error occurred: "+error);
        alert("The following error occurred: "+error);
    });    
}

function checkAuthorization(){
    //var result;
    cordova.plugins.diagnostic.isLocationAuthorized(function(authorized){
        console.log("Location is " + (authorized ? "authorized" : "unauthorized"));
        if(authorized){
           checkDeviceSetting();
        }else{
            cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
                switch(status){
                    case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                        console.log("Permission granted");
                        checkDeviceSetting();
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED:
                        //console.log("Permission denied");
                        // User denied permission
                        alert(dd);
                        //$('input[name=gpsYn]').attr('value','N');
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                        console.log("Permission permanently denied");
                        // User denied permission permanently
                        alert(dd2);
                        //$('input[name=gpsYn]').attr('value','N');
                        break;
                }
            }, function(error){
                console.error(error);
            });
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    });

}
function checkDeviceSetting(){

    cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
        console.log("GPS location setting is " + (enabled ? "enabled" : "disabled"));
        if(!enabled){
            cordova.plugins.locationAccuracy.request(function (success){
                console.log("Successfully requested high accuracy location mode: "+success.message);
                //여기가 GPS활성화를 했을경우(확인을 선택경우)
                //**gps 설정이 되어있기 때문에 허용하라는 팝업 필요없음
                //이후 geolocation API 사용~~
                  /*if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                    }, function() {
                      handleLocationError(true, infoWindow, map.getCenter());
                    });

                  } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, map.getCenter());
                  }*/

            //      $('input[name=gpsYn]').attr('value','Y');

            }, function onRequestFailure(error){
                //여기는 GPS활성화를 안했을경우(취소를 선택한경우) - gps 설정이 안되어있기 때문에 허용하라는 팝업 필요
                //geolocation API 사용하면 안됨.
                console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
                if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                    if(confirm("단말기의 위치 정보를 얻지 못하였습니다. 위치 정보를 사용하도록 설정에서 gps를 허용하십시요. 허용하지 않을 경우 찾기가 불가능합니다.")){
                        cordova.plugins.diagnostic.switchToLocationSettings();
                    }
                }

         //       $('input[name=gpsYn]').attr('value','N');


            }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    });

}
