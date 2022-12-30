
$(function () {

    $(".close").click(function () {
        $('#myGalleryfeed').modal('hide');
        $('#myGallerylist').modal('hide');
        $('#Upload_Photo').modal('hide');
        $('#Modify_Photo').modal('hide');
    })

    $("#Uploading").click(function () {
        console.log("cliked")
        $('#Upload_Photo').modal('show');
        $('#myGallerylist').modal('hide');
    })

    $("#Modifing").click(function () {
        console.log("cliked")
        $('#Modify_Photo').modal('show');
        $('#myGallerylist').modal('hide');
    })
})

// 갤러리 사진 로드
// 갤러리 추가

// 대표 사진 가져오기
$(function () {
    var leadimg1 = 1;
    //userId = "<%=userId%>";
    $.ajax({
        url: "/pharser/getleadgallery",
        async: false,
        data: {
            "id": userId,
            "od": 1
        },
        type: "post",
        success: function (data) {
            $.each(data.rows, function (index, item) {
                let newItem = $('#example_gallery').clone(true);
                newItem.removeProp('id');
                newItem.show();

                newItem.find('.gallery-title').text(item.NAME);
                newItem.find('.gallery-date').text(item.REG_DATE);
                newItem.find('.gallery-img').attr("src", item.IMG);

                newItem.click(function () {
                    console.log(item.GROUP_NUM);
                    $("#carousel-li").empty();
                    $("#carousel-in").empty();

                    $.ajax({
                        url: "/pharser/getleadphoto",
                        async: false,
                        data: {
                            "id": userId,
                            "g_n": item.GROUP_NUM,
                            "state": 1
                        },
                        type: "post",
                        success: function (data) {
                            $.each(data.rows, function (index, item) {
                                if (item.TURN == 0) {
                                    $("#carousel-li")
                                        .append(
                                            "<li data-targert=\"#myPhoto\" data-slide-to=\"" +
                                            item.TURN + "\" class=\"active\" ></li>");


                                    $("#carousel-in")
                                        .append(
                                            "<div class=\"carousel-item active\">" +
                                            "<img class=\"d-block w-100\" src=\"" +
                                            item.IMG +
                                            "\"alt=\"First\"></div>");

                                } else {
                                    $("#carousel-li")
                                        .append(
                                            "<li data-targert=\"#myPhoto\" data-slide-to=\"" + item.TURN + "\" ></li>");

                                    $("#carousel-in")
                                        .append(
                                            "<div class=\"carousel-item\">" +
                                            "<img class=\"d-block w-100\" src=\"" +
                                            item.IMG +
                                            "\"alt=\"Second\"></div>");

                                }



                                // let newItem = $('#example_photo').clone(true);
                                // newItem.removeProp('id');
                                // newItem.show();

                                // $("#carousel-li").append(
                                //     "<li data-targert=\"#myPhoto\" data-slide-to=\"" + item.S + "\" ></li>");

                                // // $("#carousel-in")
                                // //     .append(
                                // //         "<div class=\"carousel-item\">" +
                                // //         "<img class=\"d-block w-100\" src=\"" +
                                // //         img_val1 +
                                // //         "\" alt=\"Second\"></div>");

                                // newItem.find('.photo-title').text(item.NAME);
                                // newItem.find('.photo-date').text(item.REG_DATE);
                                // newItem.find("#testt").attr("src", item.IMG);

                                // // newItem.find('.photo-img').attr("alt", item.S);
                                // // console.log(item.S)
                                // //$("#profileImageNavs").attr("src", "<%=userImg%>");

                                // $('#photo_list').append(newItem);

                            });
                        },
                        beforeSend: function () {},
                        complete: function () {}
                    });

                    $('#myGalleryfeed').modal('hide');
                    $('#myGallerylist').modal('show');
                })

                $('#gallery_list').append(newItem);

            });
        },
        beforeSend: function () {},
        complete: function () {}
    });
})

// 폴더 사진 수정하기
$(function () {
    $("#Modifing").click(function () {
        $("#m_gallery_list").empty();
        $.ajax({
            url: "/pharser/getmodifyphoto",
            async: false,
            data: {
                "id": userId,
                "g_n": 1,
                "state": 1
            },
            type: "post",
            success: function (data) {
                $.each(data.rows, function (index, item) {
                    console.log(item.IMG)
                    let newItem = $('#modifing_gallery').clone(true);
                    newItem.removeProp('id');
                    newItem.show();

                    newItem.find('#m_photo').attr("src", item.IMG);

                    $("#del_photo").click(function () {
                        console.log(item.TURN);
                        $.ajax({
                            url: "/pharser/updatedelphoto",
                            data: {
                                "id": userId,
                                'img': item.IMG,
                                'state': 0
                            },
                            async: false,
                            type: "post",
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            success: function (data) {},
                            beforeSend: function () {},
                            complete: function () {}
                        });

                        document.getElementById('Modifing').click();
                    });

                    $('#m_gallery_list').append(newItem);
                });
            },
            beforeSend: function () {},
            complete: function () {}
        });
    })


})

// 사진 업로드하기



$(function () {
    $("#placeText").click(function () {
        if ($("#img_main").val() == null || $("#img_main").val() == "") {
            alert("사진을 첨부해 주세요");
        } else {
            var formData = new FormData();

            formData.append("img_main", $("#img_main")[0].files[0]);
            var no;
            var img_main_url;

            var img_main_val1 = false;

            var uploadImgCount = 0;
            var imgElem = document.getElementById("img_main").files[0];
            imgElem.exifdata = null; // 같은 페이지 안에서 이미지가 바뀌는 경우 이전의 메타데이터 정보를 지워주어야 함.
            EXIF.getData(imgElem, function () {
                var allMetaData = EXIF.getAllTags(this); //모든 EXIF정보
                var exifLong = EXIF.getTag(this, "GPSLongitude");
                console.log(exifLong);
                var exifLat = EXIF.getTag(this, "GPSLatitude");
                var exifLongRef = EXIF.getTag(this, "GPSLongitudeRef");
                var exifLatRef = EXIF.getTag(this, "GPSLatitudeRef");
                //계산식 적용이유는 해당라이브러리가 위도경도를 도분초 단위로 출력하기 때문
                if (exifLatRef == "S") {
                    var latitude = (exifLat[0] * -1) + (((exifLat[1] * -60) + (exifLat[2] *
                        -1)) / 3600);
                } else {
                    var latitude = exifLat[0] + (((exifLat[1] * 60) + exifLat[2]) / 3600);
                }

                if (exifLongRef == "W") {
                    var longitude = (exifLong[0] * -1) + (((exifLong[1] * -60) + (exifLong[
                        2] * -1)) / 3600);
                } else {
                    var longitude = exifLong[0] + (((exifLong[1] * 60) + exifLong[2]) /
                        3600);
                }

                var latX = latitude;
                var longY = longitude;

                var myLatLng = {
                    lat: latX,
                    lng: longY
                };

                if (latX == null || longY == null || latX == "" || longY == "") {
                    alert('사진에 위치 데이터가 없습니다.');

                } else {
                    alert("경도 : " + latX + " 위도 : " + longY);

                    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
                    var options = { //지도를 생성할 때 필요한 기본 옵션
                        center: new kakao.maps.LatLng(latX, longY), //지도의 중심좌표.
                        level: 3 //지도의 레벨(확대, 축소 정도)
                    };
                    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: new kakao.maps.LatLng(latX, longY)
                    });
                    var overlay = new kakao.maps.CustomOverlay({
                        map: map,
                        position: marker.getPosition()
                    });
                    kakao.maps.event.addListener(marker, 'click', function () {
                        overlay.setMap(map);
                    });

                    var allData = {
                        "id": userId,
                        "latX": latX,
                        "longY": longY
                    };

                    $.ajax({
                        url: "/test/writetestphoto",
                        data: allData,
                        async: false,
                        type: "post",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {
                            if (data['result'] == 'null') {} else {
                                no = data['result'];

                                $.ajax({
                                    url: '/upload/uploadcategory',
                                    type: 'POST',
                                    contentType: false,
                                    processData: false,
                                    cache: false,
                                    data: formData,
                                    success: function (res) {
                                        var allData = {
                                            "no": no,
                                            "img1": res[
                                                'result'][
                                                'img_main'
                                            ][0].location
                                        };

                                        $.ajax({
                                            url: "/test/uploadphoto",
                                            data: allData,
                                            async: false,
                                            type: "post",
                                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                            success: function (
                                                data) {
                                                if (data[
                                                        'result'
                                                    ] ==
                                                    'null'
                                                ) {
                                                    alert
                                                        (
                                                            "false");
                                                } else {
                                                    alert
                                                        (
                                                            "사진 업로드에 성공하였습니다.");
                                                }
                                            },
                                            beforeSend: function () {},
                                            complete: function () {}
                                        });
                                    },
                                    error: function () {
                                        alert(
                                            '오류가 발생하였습니다. 관리자에게 문의해 주세요');
                                    }
                                });
                            }
                        },
                        beforeSend: function () {},
                        complete: function () {}
                    });
                }
            });
        }
    });
})

// 채팅

$(function () {
    $('#send').click(function () {
        let msg = $('#msg').val();

        if (msg == "") {
            return null;
        }

        let bubble = $('<div class = "bubble"></div>');
        bubble.html('<div>' + msg + '</div>')
        // bubble.text(msg)
        $('#chat').append(bubble);
        $('#msg').val('');

        $('#chat').scrollTop((bubble.index() + 1) * bubble.outerHeight());

        // setInterval(function () {
        //     bubble.animate({
        //         "margin-top": -5
        //     }, 300).delay(500).animate({
        //         "margin-top": 0
        //     }, 300);
        // }, 1000)
    })
    $('#msg').keydown(function (e) {
        if (e.keyCode == 13) {
            $('#send').click();
        }

        if (e.key == '@') {
            $('.tag').slideDown(300);
        } else {
            $('.tag').slideUp(300);
        }

    })
    $('.item').click(function () {
        let msg = $('#msg').val();
        msg = msg + $(this).text();
        $('#msg').val(msg);
        $('#msg').focus();
        $('.tag').slideUp(300);
    })
});