/*orientationchangefunction gpsMapToilet(){
	location.href = "#toilet";
	alert(1)
}*/

/*
App-o-Mat jQuery Mobile Cordova starter template
https://github.com/app-o-mat/jqm-cordova-template-project
http://app-o-mat.com

MIT License
https://github.com/app-o-mat/jqm-cordova-template-project/LICENSE.md
*/
var push;
//var serverAdrress = 'http://52.197.7.154:8080/petCare';
var serverAdrress = 'http://localhost:8080';

//GPS사용가능한지 확인
/*
function checkAvailability() {
    cordova.plugins.diagnostic.isGpsLocationEnabled(function(available) { 
        if (!available) {
            alert("내 위치 정보를 사용하려면, 단말기의 설정에서 '위치 서비스' 사용을 허용해주세요.");
            history.back();
        } else {
            getPosition();
        }
    }, function(error) {
        console.error("The following error occurred: " + error);
    });
}

function gpsMapToilet() {
    checkAvailability();
}
*/
/////////////////////////////////////////////////////////////////////
//지도 위에 마커를 표시
var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴


// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null);    

/* geolocation으로 마커 표시하기(이거 써야함)
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 10 // 지도의 확대 레벨 
    }; 

var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
if (navigator.geolocation) {
    
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function(position) {
        
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        
        var locPosition = new daum.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
        
        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
            
      });
    
} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    
    var locPosition = new daum.maps.LatLng(33.450701, 126.570667),    
        message = 'geolocation을 사용할수 없어요..'
        
    displayMarker(locPosition, message);
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var marker = new daum.maps.Marker({  
        map: map, 
        position: locPosition
    }); 
    
    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new daum.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });
    
    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, marker);
    
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);      
} 

여기여기 
*/

/*
var searchFlag = true;
$(document).on("pageinit", "#searchPage", function() {
    var serachListPageNum = 1;

    $("#autocomplete").on("filterablebeforefilter", function(e, data) {
        if (searchFlag == true) {
            $("#autocomplete").css({
                position: "absolute",
                top: $(".ui-input-search").offset().top + $(".ui-input-search").height(),
                left: $(".ui-input-search").offset().left,
                width: $(".ui-filterable").width()
            });
            var $ul = $(this),
                $input = $(data.input),
                value = $input.val(),
                html = "";
            $ul.html("");
            if (value && value.length > 1 && searchFlag == true) {
                //$('#autocomplete').show();
                $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
                $ul.listview("refresh");

                $.ajax({
                        url: serverAdrress + '/autocomplete',
                        dataType: "json",
                        crossDomain: true,
                        data: {
                            type: $('#select-native-2').val(),
                            text: $input.val(),
                            category:category
                        }
                    })
                    .then(function(response) {
                        if (searchFlag) {
                            var dName;
                            $.each(response, function(i, val) {
                                if (val.indexOf('/') != -1) {
                                    dName = val.split('/');
                                } else {
                                    dName = val.split('(');
                                }
                                html += "<li>" + dName[0] + "</li>";
                            });

                            $ul.html(html);
                            $ul.listview("refresh");
                            $ul.trigger("updatelayout");
                        }
                    });
            }
        }
    });
});*/

/*
$(document).on("click", "#autocomplete li", function() {
    searchFlag = false;
    var selectedItem = $(this).html();
    $('.ui-input-search > input').val(selectedItem);
    //$('#autocomplete').hide();
    serachListPageNum = 1;
    $("#autocomplete").html('');
    requestJsonData(serverAdrress + '/searchList', 'GET', { type: $('#select-native-2').val(), text: $('.ui-input-search > input').val(), category:category, page: serachListPageNum }, successSearchList, failSearchList);

    //이부분에서 request json data하면 될듯 selectedItem이랑 type이랑 페이지(1) 전달
});

$(document).on("click", "#searchButton", function() {
    searchFlag = false;
    serachListPageNum = 1;
    $("#autocomplete").html('');
    requestJsonData(serverAdrress + '/searchList', 'GET', { type: $('#select-native-2').val(), text: $('.ui-input-search > input').val(), category:category, page: serachListPageNum }, successSearchList, failSearchList);

});


var successSearchList = function(data) {
    var table = '';
    table += "<div class='tableDiv'>";
    table += "<table class='contentTable' style='margin:0 auto;'>";

    var dName;

    $.each(data.diseaseList, function(key, value) {
        if (value.d_name.indexOf('/') != -1) {
            dName = value.d_name.split('/');
        } else {
            dName = value.d_name.split('(');
        }

        table += "<tr>";

        table += "<td onclick='getDiseaseDetail(" + value.d_id + ")'><a>" + dName[0] + "</a></td>";

        table += "</tr>";

    })
    table += "</table>";
    table += "</div>";

    var pageCount = data.pageCount;
    table += pagination(pageCount, serachListPageNum, "searchList_Page");

    $("#searchList_content").html(table);

    $('.searchList_Page').click(function() {
        serachListPageNum = $(this).attr('page');
        requestJsonData(serverAdrress + '/searchList', 'GET', { type: $('#select-native-2').val(), text: $('.ui-input-search > input').val(), page: serachListPageNum }, successSearchList, failSearchList);
    });

    $("#autocomplete").html('');
    searchFlag = true;
}

var failSearchList = function() {
    alert("검색 실패");
}

var searchAndselectPageFlag;
function searchPageReset() {
    searchAndselectPageFlag=true;
}




////////////////////////////////////////////////////////

var selectAnimalPage = function() {
    searchAndselectPageFlag=false;
    $.mobile.changePage("#select_animal");
}



$(document).on("pageshow", "#diseaseDetail", function(event) {
    $(this).scrollTop(0);

});




var category;
var lateDiseasePageNum = 1;
var diseaseListPageNum = 1;
var successLateDiseaseList = function(data) {

    var list = '';

    $.each(data.lateDiseaseList, function(key, value) {
        list += "<div class='contentDiv' onclick='getLateDiseaseDetail(" + value.id + ")'><a>" + value.occrrnc_de + " | " + value.lknts_nm + " - " + value.farm_locplc + " </a></div>";
    });

    var pageCount = data.pageCount;
    list += pagination(pageCount, lateDiseasePageNum, "lateDiseaseList_Page");

    $('#lateDiseaseList_content').html(list);

    $('.lateDiseaseList_Page').click(function() {
        lateDiseasePageNum = $(this).attr('page');
        requestJsonData(serverAdrress + '/lateDisease', 'GET', { page: lateDiseasePageNum }, successLateDiseaseList, failLateDiseaseList);
    });
}

function getLateDiseaseDetail(id) {
    requestJsonData(serverAdrress + "/lateDisease/" + id, "GET", {}, successLateDiseaseDetail, failLateDiseaseDetail);
}

var successLateDiseaseDetail = function(data) {
    $.mobile.changePage("#lateDiseaseDetail");

    $('#occrrnc_de').html(data.occrrnc_de);
    $('#lknts_nm').html(data.lknts_nm);
    $('#lvstckspc_nm').html(data.lvstckspc_nm);
    $('#occrrnc_lvstckcnt').html(data.occrrnc_lvstckcnt);
    $('#farm_locplc').html(data.farm_locplc);
    $('#dgnss_engs_nm').html(data.dgnss_engs_nm);

}

var failLateDiseaseDetail = function() {
    alert("최근 질병상세 정보 가져오기 실패");
}


var failLateDiseaseList = function() {
    alert("최근 발병 질병 가져오기 실패");
}


function lateDiseasePageReset() {
    lateDiseasePageNum = 1;
}


};

$(document).on("pageshow", "#lateDisease", function(event) {

    requestJsonData(serverAdrress + '/lateDisease', 'GET', { page: lateDiseasePageNum }, successLateDiseaseList, failLateDiseaseList);
});




function getDiseaseDetail(id) {
    requestJsonData(serverAdrress + "/disease/" + id, "GET", {}, successDiseaseDetail, failDiseaseDetail);
}

$(document).on("pagebeforeshow", "#diseaseDetail", function(event) {
    $('#diseaseName').html('');
    $('#diseaseSymptom').html('');
    $('#diseaseCure').html('');
    $('#diseasePrevent').html('');
    $('#diseaseEffect').html('');
    $('#diseaseCategory').html('');

    $('#diseaseCategory').html(diseaseInfo.category);
    $('#diseaseName').html(diseaseInfo.d_name);
    $('#diseaseSymptom').html(diseaseInfo.d_symptom);


    if (diseaseInfo.d_cure == 'null' || diseaseInfo.d_cure == undefined) {
        $('#cureDiv').hide();
    } else {
        $('#cureDiv').show();
        $('#diseaseCure').html(diseaseInfo.d_cure);
    }

    if (diseaseInfo.d_prevent == 'null' || diseaseInfo.d_prevent == undefined) {
        $('#preventDiv').hide();
    } else {
        $('#preventDiv').show();
        $('#diseasePrevent').html(diseaseInfo.d_prevent);
    }

    if (diseaseInfo.h_effect == undefined) {
        $('#effectDiv').hide();
    } else {
        $('#diseaseEffect').html(diseaseInfo.h_effect);
        $('#effectDiv').show();
    }

    if (diseaseInfo.d_cause == 'null' || diseaseInfo.d_cause == undefined) {
        $('#causeDiv').hide();
    } else {
        $('#causeDiv').show();
        $('#diseaseCause').html(diseaseInfo.d_cause);
    }

    if (diseaseInfo.d_define == 'null' || diseaseInfo.d_define == undefined) {
        $('#defineDiv').hide();
    } else {
        $('#defineDiv').show();
        $('#diseaseDefine').html(diseaseInfo.d_define);
    }

    if (diseaseInfo.d_advice == 'null' || diseaseInfo.d_advice == undefined) {
        $('#adviceDiv').hide();
    } else {
        $('#adviceDiv').show();
        $('#diseaseAdvice').html(diseaseInfo.d_advice);
    }



});




var diseaseInfo;
var successDiseaseList = function(data) {
    var table = '';
    table += "<div class='tableDiv'>";
    table += "<table class='contentTable' style='margin:0 auto;'>";
    table += "<tr>";
    table += "<th>질병명</th>";
    table += "</tr>";

    var dName;
    var doubtCount = 0;
    var strongCount = 0;
    var top;
    $.each(data.diseaseList, function(key, value) {
        if (key == 0 && diseaseListPageNum == 1) {
            top = value.count;
        }

        if (value.d_name.indexOf('/') != -1) {
            dName = value.d_name.split('/');
        } else {
            dName = value.d_name.split('(');
        }

        table += "<tr>";

        if (strongCount < 2 && top == value.count) {
            table += "<td onclick='getDiseaseDetail(" + value.d_id + ")'><a>" + dName[0] + "</a> <p class='doubt'>유력</p></td>";
            strongCount++;
        } else if (doubtCount < 3 && diseaseListPageNum == 1) {
            table += "<td onclick='getDiseaseDetail(" + value.d_id + ")'><a>" + dName[0] + "</a> <p class='doubt'>의심</p></td>";
            doubtCount++;
        } else {
            table += "<td onclick='getDiseaseDetail(" + value.d_id + ")'><a>" + dName[0] + "</a></td>";
        }
        table += "</tr>";

    })
    table += "</table>";
    table += "</div>";

    var pageCount = data.pageCount;
    table += pagination(pageCount, diseaseListPageNum, "diseaseList_Page");

    $("#diseaseList_content").html(table);
 
    $('.diseaseList_Page').click(function() {
        diseaseListPageNum = $(this).attr('page');
        requestJsonData(serverAdrress + '/disease', 'GET', { list: list, category: category, page: diseaseListPageNum }, successDiseaseList, failDiseaseList);
    });


    $.mobile.changePage("#diseaseListPage");
}

var failDiseaseList = function() {
    alert("질병리스트 가져오기 실패");
}

function selectCategory(ctgory) {
    category = ctgory;
    if(searchAndselectPageFlag) {
        serachListPageNum = 1;
        $("#searchList_content").html('');
        $('.ui-input-search > input').val('');
        $("#autocomplete").html('');
        if(category.length==0){
            $('#searchHeader').html('【전체】' + " 질병 및 증상 검색");
        }
        else {
        $('#searchHeader').html('【' + category+'】' + " 질병 및 증상 검색");
        }
        $.mobile.changePage("#searchPage");
    }
    else {
    $.mobile.changePage("#select_symptom");
    $("input[name='checkbox-2']").attr("checked", false).checkboxradio("refresh");
    }
}

var successDiseaseDetail = function(data) {
    diseaseInfo = data;

    $.mobile.changePage("#diseaseDetail");
}

var failDiseaseDetail = function() {
    alert("질병상세정보 가져오기 실패");
}





var list;
$(function() {




    $("#cpImage").click(function() {
        currentMarker.setMap(null);

        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 150000
        });

        function onSuccess(position) {
            locPosition = new daum.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var imageSrc = 'img/point.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new daum.maps.Size(20, 20), // 마커 이미지의 크기
                markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);

            currentMarker = new daum.maps.Marker({
                position: locPosition, // 마커의 위치
                image: markerImage,
                map: map
            });

            currentMarker.setMap(map);
            map.setCenter(locPosition);
        }

        function onError(error) {
            console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }

    });

    


    $("#search_button").click(function() {
        diseaseListPageNum = 1;
        list = null;
        list = new Array();

        if ($("#sym-1").is(":checked")) {
            list.push($("#sym-label-1").text());
        }
        if ($("#sym-2").is(":checked")) {
            list.push($("#sym-label-2").text());
        }
        if ($("#sym-3").is(":checked")) {
            list.push($("#sym-label-3").text());
        }
        if ($("#sym-4").is(":checked")) {
            list.push($("#sym-label-4").text());
        }
        if ($("#sym-5").is(":checked")) {
            list.push($("#sym-label-5").text());
        }
        if ($("#sym-6").is(":checked")) {
            list.push($("#sym-label-6").text());
        }
        if ($("#sym-7").is(":checked")) {
            list.push($("#sym-label-7").text());
        }
        if ($("#sym-8").is(":checked")) {
            list.push($("#sym-label-8").text());
        }
        if ($("#sym-9").is(":checked")) {
            list.push($("#sym-label-9").text());
        }
        if ($("#sym-10").is(":checked")) {
            list.push('호흡');
        }
        if ($("#sym-11").is(":checked")) {
            list.push($("#sym-label-11").text());
        }
        if ($("#sym-12").is(":checked")) {
            list.push($("#sym-label-12").text());
        }
        if ($("#sym-13").is(":checked")) {
            list.push($("#sym-label-13").text());
        }
        if ($("#sym-14").is(":checked")) {
            list.push($("#sym-label-14").text());
        }
        if ($("#sym-15").is(":checked")) {
            list.push($("#sym-label-15").text());
        }
        if ($("#sym-16").is(":checked")) {
            list.push($("#sym-label-16").text());
        }
        if ($("#sym-17").is(":checked")) {
            list.push($("#sym-label-17").text());
        }
        if ($("#sym-18").is(":checked")) {
            list.push($("#sym-label-18").text());
        }
        if ($("#sym-19").is(":checked")) {
            list.push($("#sym-label-19").text());
        }
        if ($("#sym-20").is(":checked")) {
            list.push($("#sym-label-20").text());
        }

        if (list.length > 0) {
            requestJsonData(serverAdrress + "/disease", "GET", {
                list: list,
                category: category,
                page: diseaseListPageNum
            }, successDiseaseList, failDiseaseList);
        } else {
            alert("증상을 한 개 이상 선택해야합니다.")
        }



    });







    $(".menubar").click(function() {
        if ($("#right-panel_menu").hasClass('menu-open')) {
            $("#right-panel_menu").removeClass('menu-open');
            $('.content').removeClass('background-active');
            $('.symptom_list').removeClass('unclickable');

        } else {
            $("#right-panel_menu").addClass('menu-open');
            $('.content').addClass('background-active');
            $('.symptom_list').addClass('unclickable');
        }
    })


    $(".main_content").click(function() {
        if ($("#right-panel_menu").hasClass('menu-open')) {
            $("#right-panel_menu").removeClass('menu-open');
            $('.content').removeClass('background-active');
            $('.symptom_list').removeClass('unclickable');
        }

    });



    $(".searchHospital").click(function() {
        $.mobile.changePage("#maps");
        hospital();
    })
});







//*주변 병원 보여주는 페이지로 넘어가는 함수*

function getPosition() {
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
}


//*본인 위치 위도경도 구하기*




var map;
var locPosition;
var markers = [];
var currentMarker;
var ps;
var infowindow;
var mapFlag = false;

function maptest(lat, lon) {
    locPosition = new daum.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다


    if (!mapFlag) {
        var container = document.getElementById('map');

        var options = {
            center: locPosition,
            level: 4
        };

        map = new daum.maps.Map(container, options);
        mapFlag = true;
    }


    // 장소 검색 객체를 생성합니다
    ps = new daum.maps.services.Places();

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    infowindow = new daum.maps.InfoWindow({ zIndex: 1 });

    // 키워드로 장소를 검색합니다
    searchPlaces();
}
//*-maptest()end-*


// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    //var keyword = loc + '동물병원';
    var request = {
        location: locPosition,
        keyword: '동물병원',
        radius: 5000
    };

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(request, placesSearchCB);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(status, data, pagination) {

    if (status === daum.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면

        // 검색 목록과 마커를 표출합니다
        displayPlaces(data.places);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);



    } else if (status === daum.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === daum.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
    var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new daum.maps.LatLngBounds(),
        listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();


    for (var i = 0; i < places.length; i++) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new daum.maps.LatLng(places[i].latitude, places[i].longitude),
            marker = addMarker(placePosition, i),
            itemEl = getListItem(i, places[i], marker); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        //bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title, tempPosition) {


            /*모바일 이벤트 핸들러 
            daum.maps.event.addListener(marker, 'click', function() {
                displayInfowindow(marker, title);
            });

            /*웹버전 이벤트핸들러
            daum.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            daum.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover = function() {
                displayInfowindow(marker, title);
                map.setCenter(tempPosition);

            };

            itemEl.onmouseout = function() {
                infowindow.close();
            };
        })(marker, places[i].title, placePosition);

        fragment.appendChild(itemEl);
    }

    // 현재위치 마커 표시합니다
    displayMarker(locPosition);

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;


    //현재 지도 확대, 맵 중심 현재위치로 변경
    map.setCenter(locPosition);
    map.setLevel(4);
    map.relayout();

}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {



    var el = document.createElement('li'),
        itemStr =
        '<div class="info">' +
        '   <h5>' + places.title + '</h5>';

    if (places.newAddress) {
        itemStr += '    <span>' + places.newAddress + '</span>' +
            '   <span class="jibun gray">' + places.address + '</span>';
    } else {
        itemStr += '    <span>' + places.address + '</span>';
    }

    itemStr += '  <a class="tel" href="tel://' + places.phone + '">' + places.phone + '</a>' +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    //alert('addMarker')
    var imageSrc = 'http://i1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new daum.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
            spriteSize: new daum.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new daum.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new daum.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new daum.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);

}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}


//*본인 위치 마커 보여주는 함수* 
function displayMarker(locPosition) {

    var imageSrc = 'img/point.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new daum.maps.Size(20, 20), // 마커 이미지의 크기
        markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);

    currentMarker = new daum.maps.Marker({
        position: locPosition, // 마커의 위치
        image: markerImage,
        map: map
    });

    currentMarker.setMap(map); // 지도 위에 현재위치 마커를 표출합니다
    markers.push(currentMarker); // 배열에 생성된 현재위치 마커를 추가합니다
}*/


//////////////////////////////////////////////////////////지도끝///////////
