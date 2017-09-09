function checkAvailability(){
    cordova.plugins.diagnostic.isGpsLocationAvailable(function(available){
        console.log("GPS location is " + (available ? "available" : "not available"));
        if(!available){
           checkAuthorization();
        }else{
            console.log("GPS location is ready to use");
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    });
}
function checkAuthorization(){
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
                        console.log("Permission denied");
                        // User denied permission
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                        console.log("Permission permanently denied");
                        // User denied permission permanently
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
                //이후 geolocation API 사용~~
            }, function onRequestFailure(error){
                //여기는 GPS활성화를 안했을경우(취소를 선택한경우)
                //geolocation API 사용하면 안됨.
                console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
                if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                    if(confirm("단말기의 위치 정보를 얻지 못하였습니다. 설정에서 위치 정보를 사용하도록 gps를 허용하십시요")){
                        cordova.plugins.diagnostic.switchToLocationSettings();
                    }
                }
            }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    });
}
