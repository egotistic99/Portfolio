var imagess
const imagesize = Array.from(Array(40), () => Array(40).fill(null));

class InventoryScene extends Phaser.Scene {
    InventoryScene() {
        Phaser.Scene.call(this, {
            key: 'InventoryScene'
        });
    } // 의미 없는 코드네?
    constructor() {
        super({
            key: 'InventoryScene'
        });
    }

    preload() {

    }
    create() {
        this.input.on('pointerup', function (pointer) {
            // this.add.image(pointer.x, pointer.y, 'balls', Phaser.Math.Between(0, 1));
            if (isFixing && pointerTileXY.x < 40 && pointerTileXY.x > -1 && pointerTileXY.y < 40 && pointerTileXY.y > -1) {
                console.log('전체 클릭', fixedtype)
                switch (fixedtype) {
                    case 1:
                        //타일 생성
                        if (FixMaptileList[tiletype - 1].count > 0) {
                            map1.setLayer(layer)
                            selectedTile = map1.getTileAt(pointerTileXY.x, pointerTileXY.y, true, layer);
                            //줄이고 카운트 업데이트 타일이 기존 것과 같다면 줄이지 않아요.

                            if (selectedTile["index"] != tiletype) {
                                FixMaptileList[tiletype - 1].text.setText(--FixMaptileList[tiletype - 1].count);
                            }
                            map1.replaceByIndex(selectedTile["index"], tiletype, pointerTileXY.x, pointerTileXY.y, 1, 1);

                            console.log("타일 생성중");
                        } else {
                            alert("갯수가 모자랍니다.");
                            isFixing = false;
                        }
                        break;
                    case 2:
                        // 1*1 건물 생성
                        if (FixMaplandList[treetype - 1].count > 0) {
                            map1.setLayer(layer2)
                            selectedTile = map1.getTileAt(pointerTileXY.x, pointerTileXY.y, true, layer2);

                            if (selectedTile["index"] == -1) {
                                if (selectedTile["index"] != treetype) {
                                    FixMaplandCount[treetype - 1].setText(--FixMaplandList[treetype - 1].count);
                                }

                                map2.replaceByIndex(selectedTile["index"], treetype, pointerTileXY.x, pointerTileXY.y, 1, 1);
                                // 존재하면 10 map1.setLayer(layer2)
                                map1.replaceByIndex(selectedTile["index"], 10, pointerTileXY.x, pointerTileXY.y, 1, 1);

                                console.log("화면 상에서 클릭한 좌표?", pointer.x, pointer.y)
                                console.log("타일 좌표?", pointerTileXY.x, pointerTileXY.y)
                                console.log("타일 좌표?", markerXY.x, markerXY.y)

                                var num;

                                $.ajax({
                                    url: "/pharser_user/getmyinventory",
                                    async: false,
                                    data: {
                                        // "id": userId
                                    },
                                    type: "post",
                                    success: function (data) {
                                        console.log(data)
                                        $.each(data.rows, function (index, item) {
                                            console.log(item.TOWER_NO);
                                            if(item.IS_ESTABLISH == 0 && item.TOWER_NO == treetype)
                                            {
                                                num = item.NO;
                                            }
                                        });
                                    },
                                    beforeSend: function () {},
                                    complete: function () {}
                                });

                                $.ajax({
                                    url: "/pharser_user/establishmenttower",
                                    async: false,
                                    type: "post",
                                    data: {
                                        no: num,
                                        posX: pointerTileXY.x,
                                        posY: pointerTileXY.y
                                    },
                                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                    success: function (data) {
                                        if (data.result == true) {
                                            alert("설치 정상 작동" + data);
                                        }
                                        else{
                                            alert("설치 비정상 작동" + data);
                                        }
                                    },
                                    beforeSend: function () {},
                                    complete: function () {}
                                });
                                

                                var sss = this.scene.scene.get('MapScene');
                                console.log(treetype);
                                //sss.add.image(markerXY.x + 40, markerXY.y, 'tree' + (treetype - 1)).setInteractive()
                                
                                imagesize[pointerTileXY.x][pointerTileXY.y] = sss.add.sprite(markerXY.x + 40, markerXY.y, 'atree0').setInteractive()
                                    .on('pointerup', function (pointer) {
                                        // 이름의 적힌 내용
                                        // 건물 종류, 건물 타입,  x좌표, y좌표
                                        var beforeStr = this.name;
                                        var afterStr = beforeStr.split(',');

                                        // 이 좌표에 있는 값 변경
                                        var clearPosx = parseInt(afterStr[2]);
                                        var clearPosy = parseInt(afterStr[3]);

                                        if (fixedtype == 0) {
                                            var chan = map1.getTileAt(clearPosx, clearPosy, true, layer2);
                                            map1.setLayer(layer2)
                                            map1.replaceByIndex(chan.index, -1, clearPosx, clearPosy, 1, 1);
                                            chan = map2.getTileAt(clearPosx, clearPosy, true);

                                            map2.replaceByIndex(chan.index, -1, clearPosx, clearPosy, 1, 1);
                                            FixMaplandCount[ parseInt(afterStr[1]) - 1].setText(++FixMaplandList[parseInt(afterStr[1]) - 1].count);
                                            $.ajax({
                                                url: "/pharser_user/cleartower",
                                                async: false,
                                                type: "post",
                                                data: {
                                                    no: 12
                                                },
                                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                                success: function (data) {
                                                    if (data.result == true) {
                                                        alert("설치 정상 작동" + data);
                                                    }
                                                    else{
                                                        alert("설치 비정상 작동" + data);
                                                    }
                                                },
                                                beforeSend: function () {},
                                                complete: function () {}
                                            });

                                            this.destroy()
                                        }

                                        

                                    });
                                
                                imagesize[pointerTileXY.x][pointerTileXY.y].play('wait' + (treetype - 1));
                                imagesize[pointerTileXY.x][pointerTileXY.y].z = treetype;
                                // 이름에 들어가 있는 순서 
                                // 2번 나무, 타일 좌표 
                                imagesize[pointerTileXY.x][pointerTileXY.y].name = 2 + "," + treetype + "," + pointerTileXY.x + "," + pointerTileXY.y;
                                imagesize[pointerTileXY.x][pointerTileXY.y].setDepth(markerXY.y - 60)
                                console.log(imagesize[pointerTileXY.x][pointerTileXY.y])
                                console.log("나무 생성중");
                            }

                        } else {
                            alert("갯수가 모자랍니다.");
                            isFixing = false;
                        }
                        break;
                    case 3:
                        // 하우스 생성 2 * 2
                        console.log(FixMaphouseList[housetype - 1].count);
                        if (FixMaphouseList[housetype - 1].count > 0) {
                            map1.setLayer(layer2)
                            selectedTile = map1.getTileAt(pointerTileXY.x, pointerTileXY.y, true, layer2);

                            if (selectedTile["index"] != housetype) {
                                FixMaphouseList[housetype - 1].text.setText(--FixMaphouseList[housetype - 1].count);
                            }

                            if (selectedTile["index"] == -1) {
                                map3.replaceByIndex(selectedTile["index"], housetype, pointerTileXY.x, pointerTileXY.y, 1, 1);
                                map1.replaceByIndex(selectedTile["index"], 10, pointerTileXY.x, pointerTileXY.y, 1, 1);

                                console.log(pointer.x, pointer.y)
                                console.log(pointerTileXY.x, pointerTileXY.y)
                                console.log(housetype)
                                var sss = this.scene.scene.get('MapScene')

                                imagesize[pointerTileXY.x][pointerTileXY.y] = sss.add.image(markerXY.x + 40, markerXY.y - 20, 'house' + (housetype - 1)).setInteractive()
                                    .on('pointerup', function (pointer) {
                                        // 이름의 적힌 내용
                                        // 건물 종류, 건물 번호,  x좌표, y좌표
                                        var beforeStr = this.name;
                                        var afterStr = beforeStr.split(',');

                                        // 이 좌표에 있는 값 변경
                                        var clearPosx = parseInt(afterStr[2]);
                                        var clearPosy = parseInt(afterStr[3]);

                                        if (fixedtype == 0) {
                                            var chan = map1.getTileAt(clearPosx, clearPosy, true, layer2);
                                            map1.setLayer(layer2)
                                            map1.replaceByIndex(chan.index, -1, clearPosx, clearPosy, 1, 1);
                                            chan = map2.getTileAt(clearPosx, clearPosy, true);

                                            map2.replaceByIndex(chan.index, -1, clearPosx, clearPosy, 1, 1);

                                            


                                            this.destroy()
                                        }

                                    });
                                imagesize[pointerTileXY.x][pointerTileXY.y].z = housetype;
                                // 이름에 들어가 있는 순서 
                                // 3번 집, 타일 좌표 
                                imagesize[pointerTileXY.x][pointerTileXY.y].name = 3 + "," + housetype + "," + pointerTileXY.x + "," + pointerTileXY.y;
                                imagesize[pointerTileXY.x][pointerTileXY.y].setDepth(markerXY.y - 60)
                                

                            }
                        } else {
                            alert("갯수가 모자랍니다.");
                            isFixing = false;
                        }
                        break;
                        //map1.putTileAt(pointerTileXY.x, pointerTileXY.y);

                        case 4:
                            // 꾸미기 건물 건물 생성
                            if (FixMapadoList[adotype - 1].count > 0) {
                                
                                map1.setLayer(layer2)
                                selectedTile = map1.getTileAt(pointerTileXY.x, pointerTileXY.y, true, layer2);
                                console.log(map4)
                                if (selectedTile["index"] == -1) {
                                    if (selectedTile["index"] != adotype) {
                                        FixMapadoCount[adotype - 1].setText(--FixMapadoList[adotype - 1].count);
                                    }
                                    console.log(adotype)
                                    map4.replaceByIndex(selectedTile["index"], adotype, pointerTileXY.x, pointerTileXY.y, 1, 1);
                                    // 존재하면 10 map1.setLayer(layer2)
                                    map1.replaceByIndex(selectedTile["index"], 20, pointerTileXY.x, pointerTileXY.y, 1, 1); 
                                    var num;
                                
                                    var sss = this.scene.scene.get('MapScene');
                                    //sss.add.image(markerXY.x + 40, markerXY.y, 'ado' + (adotype - 1)).setInteractive()
                                    
                                    imagesize[pointerTileXY.x][pointerTileXY.y] = sss.add.sprite(markerXY.x + 40, markerXY.y, 'ado0').setInteractive()
                                        .on('pointerup', function (pointer) {
                                            
                                            // 이름의 적힌 내용
                                            // 건물 종류, 건물 타입,  x좌표, y좌표
                                            var beforeStr = this.name;
                                            var afterStr = beforeStr.split(',');
    
                                            // 이 좌표에 있는 값 변경
                                            var clearPosx = parseInt(afterStr[2]);
                                            var clearPosy = parseInt(afterStr[3]);
    
                                            if (fixedtype == 0) {
                                                var chan = map1.getTileAt(clearPosx, clearPosy, true, layer2);
                                                map1.setLayer(layer2)
                                                map1.replaceByIndex(chan.index, -1, clearPosx, clearPosy, 1, 1);
                                                chan = map2.getTileAt(clearPosx, clearPosy, true);
    
                                                map2.replaceByIndex(chan.index, -1, clearPosx, clearPosy, 1, 1);
                                                FixMapadoCount[ parseInt(afterStr[1]) - 1].setText(++FixMapadoList[parseInt(afterStr[1]) - 1].count);
                                                $.ajax({
                                                    url: "/pharser_user/cleartower",
                                                    async: false,
                                                    type: "post",
                                                    data: {
                                                        no: 12
                                                    },
                                                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                                    success: function (data) {
                                                        if (data.result == true) {
                                                            alert("설치 정상 작동" + data);
                                                        }
                                                        else{
                                                            alert("설치 비정상 작동" + data);
                                                        }
                                                    },
                                                    beforeSend: function () {},
                                                    complete: function () {}
                                                });
    
                                                this.destroy()
                                            }
    
                                            
    
                                        });
                                    
                                    //imagesize[pointerTileXY.x][pointerTileXY.y].play('wait' + (adotype - 1));
                                    imagesize[pointerTileXY.x][pointerTileXY.y].z = adotype;
                                    // 이름에 들어가 있는 순서 
                                    // 2번 나무, 타일 좌표 
                                    imagesize[pointerTileXY.x][pointerTileXY.y].name = 2 + "," + adotype + "," + pointerTileXY.x + "," + pointerTileXY.y;
                                    imagesize[pointerTileXY.x][pointerTileXY.y].setDepth(markerXY.y - 60)
                                    console.log(imagesize[pointerTileXY.x][pointerTileXY.y])
                                    console.log("나무 생성중");
                                }
    
                            } else {
                                alert("갯수가 모자랍니다.");
                                isFixing = false;
                            }
                            break;
                }
            }

            // 제작 버튼을 누르면

            //console.log(map["layers"][0]['data'][0][0]["index"]);
            //                                  요걸로 배열을 만들면 됩니다.

            if (shiftKey.isDown) {
                if (btnt1.visible == true) {
                    selectedTile = map1.getTileAt(pointerTileXY.x, pointerTileXY.y, true, layer2);
                } else {
                    selectedTile = map1.getTileAt(pointerTileXY.x, pointerTileXY.y, true, layer);
                }
                //console.log(map1["layers"]);

            } else {

            }

        });


    }
    update() {}

    clickHandler(pointer, box) {
        box.input.enabled = false;
        box.setVisible(false);

        //  Dispatch a Scene event
        this.events.emit('addScore');
    }


}