var firsttime = false;
var marker;


var camera;

// 시작 위치 조정
var mapstartposX = 700;
var mapstartposY = 1400;

var map1;
var map2;
var map3;
var map4;

var tiles1;
var tiles2;
var layer;
var layer2;

//tree맵 관련
var treetile1;
var treelayer;

//house맵 관련
var housetile1;
var houselayer;

//ado맵 관련
var adotile1;
var adolayer;

var worldPoint;
var pointerTileXY;
var markerXY;

var cointimer;

var selectedTile;

var mapheight = 20;
var mapwidth = 20;

var towergroups;

const abuilding = new Array();

// 건물 정보창
var uptowergroup;
var upgradetoweronce = true;
var upgradeContents0
var upgradeContents1
var upgradeContents2
var upgradeContents3


//캐릭터 움직이기
var path;
var curve;
var graphics;

var todaytime;
var goodtime;
var sec_gap;

class MapScene extends Phaser.Scene {
    MapScene() {
        Phaser.Scene.call(this, {
            key: 'MapScene'
        });
    }
    constructor() {
        super({
            key: 'MapScene'
        });
    }

    preload() {
        this.load.image('backgroundf', '/phasergame/images/backgroundf.png');
        this.load.image('backgroundb', '/phasergame/images/backgroundb.png');

        this.load.tilemapTiledJSON('map', '/phasergame/images/json/f_map.json');
        this.load.tilemapTiledJSON('treemap', '/phasergame/images/json/building.json');
        this.load.tilemapTiledJSON('housemap', '/phasergame/images/json/house.json');
        this.load.tilemapTiledJSON('adomap', '/phasergame/images/json/adornment.json');
        //this.load.tilemapTiledJSON('t1', '/phasergame/images/json/testing.json');
        //json 파일 받는 방3
        //this.load.image('tiles2', '/phasergame/images/tower/tree1.png');
       

        // 묶인 파일들
        this.load.image('tiles', '/phasergame/images/json/1.png');
        this.load.image('treetiles', '/phasergame/images/tower/trees_tile.png');
        this.load.image('housetiles', '/phasergame/images/tower/house_tile.png');
        this.load.image('adotiles', '/phasergame/images/tower/ado/ado_tile.png');
       

        // 나무 추가
        this.load.image('tree0', '/phasergame/images/tower/tower/tower0.png');
        this.load.image('tree1', '/phasergame/images/tower/tower/tower1.png');
        this.load.image('tree2', '/phasergame/images/tower/tower/tower2.png');

        //Sprite Sheet
        //나무 
        this.load.spritesheet('abuild0', '/phasergame/images/tower/tower/a_build0.png', {
            frameWidth: 80,
            frameHeight: 106
        });
        this.load.spritesheet('abuild1', '/phasergame/images/tower/tower/a_build1.png', {
            frameWidth: 80,
            frameHeight: 106
        });
        this.load.spritesheet('abuild2', '/phasergame/images/tower/tower/a_build2.png', {
            frameWidth: 80,
            frameHeight: 106
        });

        // 꾸미기 추가
        this.load.image('ado0', '/phasergame/images/tower/ado/ado0.png');
        this.load.image('ado1', '/phasergame/images/tower/ado/ado1.png');
        this.load.image('ado2', '/phasergame/images/tower/ado/ado2.png');

        // 캐릭터
        this.load.image('ch1', '/phasergame/images/SquareAnimal/bear.png');

        var url;

        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js';
        this.load.plugin('rexpinchplugin', url, true);
    }
    create() {
        //DrawSomethings(this);

        var bg = this.add.sprite(720, 2100, 'backgroundb')
        var bg2 = this.add.sprite(720, 2100, 'backgroundf')

        console.log("Createmap 실행")
        var dragScale = this.plugins.get('rexpinchplugin').add(this);

        map1 = this.make.tilemap({
            key: 'map',
            tileHeight: 64
        });
        selectedTile = map1.getTileAt(2, 3, true, layer);

        tiles1 = map1.addTilesetImage('tile', 'tiles'); // 타일셋 이름, 
        tiles2 = map1.addTilesetImage('treetiles', 'tiles2', 82, 123);
        //tiles2.setSize(82,123,82,123);

        layer = map1.createLayer('Ground', tiles1, mapstartposX, mapstartposY).setInteractive(); // 타일 생성 좌표
        layer2 = map1.createLayer('Tower', tiles2, mapstartposX, mapstartposY); // 건물이 있는 없는지 확인하는 레이어
        //console.log(layer);

        //treetile관련
        map2 = this.make.tilemap({
            key: 'treemap'
        });
        treetile1 = map2.addTilesetImage('tree120', 'treetiles'); // 타일셋 이름, 
        treelayer = map2.createLayer('Trees', treetile1, mapstartposX, mapstartposY - 30);

        //housetile 관련
        map3 = this.make.tilemap({
            key: 'housemap'
        });
        housetile1 = map3.addTilesetImage('house160', 'housetiles'); // 타일셋 이름, 
        houselayer = map3.createLayer('Houses', housetile1, mapstartposX - 40, mapstartposY - 120);
        
        map4 = this.make.tilemap({
            key: 'adomap'
        });
        adotile1 = map4.addTilesetImage('ADO_120', 'adotiles'); // 타일셋 이름, 
        adolayer = map4.createLayer('Ados', adotile1, mapstartposX, mapstartposY - 80);

        $.ajax({
            url: "/pharser/getusermapcreate",
            async: false,
            data: {
                "id": userId,
                'map_id': 1
            },
            type: "post",
            success: function (data) {
                if (data.rows[0]['SUCCESS'] == 0) {
                    isCreate = false;
                } else if (data.rows[0]['SUCCESS'] == 1) {
                    isCreate = true;
                    $.ajax({
                        url: "/pharser/getusermap_ado",
                        async: false,
                        data: {
                            "id": userId,
                            'map_id': 1
                        },
                        type: "post",
                        success: function (data) {
                            $.each(data.rows, function (index, item) {
                                console.log(item);
                                DBMAP = item.MAP_DATA.split(',').map(function (item) {
                                    return parseInt(item, 10);

                                });
                                tempDBMAP = DBMAP;
                                DBMAP_ADO = item.ADO_DATA.split(',').map(function (item) {
                                    return parseInt(item, 10);
                                });
                                tempDBMAP_ADO = DBMAP_ADO;
                            });
                            $.ajax({
                                url: "/pharser/getusermapcreate_tower",
                                async: false,
                                data: {
                                    "id": userId,
                                    'map_id': 1
                                },
                                type: "post",
                                success: function (data) {
                                    if (data.rows[0]['SUCCESS'] == 0) {
                                        isCreate = false;
                                    } else if (data.rows[0]['SUCCESS'] == 1) {
                                        isCreate = true;
                                        $.ajax({
                                            url: "/pharser/getusermap_tower",
                                            async: false,
                                            data: {
                                                "id": userId,
                                                'map_id': 1
                                            },
                                            type: "post",
                                            success: function (data) {
                                                $.each(data.rows, function (index, item) {
                                                    DBMAP_TOWER = item.MAP_DATA.split(',').map(function (item) {
                                                        return parseInt(item, 10);

                                                    });
                                                    //console.log(data);
                                                    // DBMAP_TREE = item.TREE_DATA.split(',').map(function (item) {
                                                    //     return parseInt(item, 10);

                                                    // });
                                                    // DBMAP_HOUSE = item.HOUSE_DATA.split(',').map(function (item) {
                                                    //     return parseInt(item, 10);

                                                    // });
                                                    tempDBMAP_TOWER = DBMAP_TOWER;
                                                });
                                            },
                                            beforeSend: function () {},
                                            complete: function () {}
                                        });

                                        $.ajax({
                                            url: "/pharser/getusermap_tree",
                                            async: false,
                                            data: {
                                                "id": userId,
                                                'map_id': 1
                                            },
                                            type: "post",
                                            success: function (data) {
                                                $.each(data.rows, function (index, item) {
                                                    DBMAP_TREE = item.TREE_DATA.split(',').map(function (item) {
                                                        return parseInt(item, 10);

                                                    });
                                                    // DBMAP_HOUSE = item.HOUSE_DATA.split(',').map(function (item) {
                                                    //     return parseInt(item, 10);

                                                    // });
                                                    tempDBMAP_TREE = DBMAP_TREE;
                                                });
                                            },
                                            beforeSend: function () {},
                                            complete: function () {}
                                        });

                                        $.ajax({
                                            url: "/pharser/getusermap_house",
                                            async: false,
                                            data: {
                                                "id": userId,
                                                'map_id': 1
                                            },
                                            type: "post",
                                            success: function (data) {
                                                $.each(data.rows, function (index, item) {
                                                    DBMAP_HOUSE = item.HOUSE_DATA.split(',').map(function (item) {
                                                        return parseInt(item, 10);

                                                    });

                                                    // DBMAP_TREE = item.TREE_DATA.split(',').map(function (item) {
                                                    //     return parseInt(item, 10);

                                                    // });
                                                    // DBMAP_HOUSE = item.HOUSE_DATA.split(',').map(function (item) {
                                                    //     return parseInt(item, 10);

                                                    // });
                                                    tempDBMAP_HOUSE = DBMAP_HOUSE;
                                                });
                                            },
                                            beforeSend: function () {},
                                            complete: function () {}
                                        });

                                    }

                                },
                                beforeSend: function () {},
                                complete: function () {}
                            });
                        },
                        beforeSend: function () {},
                        complete: function () {}
                    });
                }

                isLoading = true;
            },
            beforeSend: function () {},
            complete: function () {}
        });

        // 내용 추가.
        $.ajax({
            url: "/pharser/getguestbook",
            async: false,
            data: {
                "id": userId,
                'del': 0
            },
            type: "post",
            success: function (data) {
                $.each(data.rows, function (index, item) {
                    pushguestlist(item.NAME, item.CONTENT, item.REGISTER_DATE);

                });
            },
            beforeSend: function () {},
            complete: function () {}
        });


        // 여기부터는 클릭시 정보창
        var nowScene = this.scene.get('MainUIScene');

        uptowergroup = nowScene.add.group();
        var bg = nowScene.add.image(1050, 1700, 'uptowerback');
        uptowergroup.add(bg);
        var btn = nowScene.add.image(1050, 2200, 'uptowerbtn').setInteractive();
        uptowergroup.add(btn);
        var x = nowScene.add.image(1350, 1100, 'uptowerx').setInteractive();
        uptowergroup.add(x);

        console.log(sec_gap)

        upgradeContents0 = nowScene.add.text(750, 1000, "name", {
            font: "60px TheFont",
            align: 'right',
            color: '#ffffff'
        });
        uptowergroup.add(upgradeContents0)
        upgradeContents1 = nowScene.add.text(750, 1200, "content", {
            font: "60px TheFont",
            align: 'right',
            color: '#ffffff'
        });
        uptowergroup.add(upgradeContents1)
        upgradeContents2 = nowScene.add.text(750, 1300, "content1", {
            font: "60px TheFont",
            align: 'right',
            color: '#ffffff'
        });
        uptowergroup.add(upgradeContents2)
        var content2 = sec_gap + " / " + 60;
        upgradeContents3 = nowScene.add.text(750, 1600, "content1", {
            font: "60px TheFont",
            align: 'right',
            color: '#ffffff'
        });
        uptowergroup.add(upgradeContents3)

        x.on('pointerup', function (pointer) {
            uptowergroup.setVisible(false);
        });
        uptowergroup.setVisible(false);

        // Sprite 업데이트

        for (var i = 0; i < treecheckcnt; i++) {
            abuilding[i] = {
                key: 'wait' + i,
                frames: this.anims.generateFrameNumbers('abuild' + i),
                frameRate: 6,
                yoyo: false,
                repeat: -1
            };
            this.anim = this.anims.create(abuilding[i]);

        }

        //layer3 = map1.createLayer('tl1', tiles1, 0, 840);
        //map.createLayer('Tile Layer 1', [ groundTiles, itemTiles, platformTiles ]); //한번에 여러개 사용할때
        //once라는 명렁어 존재.


        this.cameras.main.setZoom(2.5);
        //this.cameras.main.setZoom(1);
        // 카메라 관련

        // 카메라 움직이기
        var cursors = this.input.keyboard.createCursorKeys();
        //this.cameras.main.setZoom(1.3);
        /*this.cameras.main.setBounds(0, 0, map1.widthInPixels, map1.heightInPixels); // 크기 고정

        this.ship = this.physics.add.image(400, 2500, 'ship');
        this.cameras.main.startFollow(this.ship, true, 0.09, 0.09);
        this.cameras.main.setZoom(3);*/


        //this.cameras.main.setBounds(0, 0, 1440, 2960);

        //this.add.image(0, 0, 'map').setOrigin(0).setScrollFactor(1);

        this.cursors = this.input.keyboard.createCursorKeys();

        //this.ship = this.physics.add.image(400.5, 301.3, 'ship');
        // ship = this.add.image(400.5, 301.3, 'ship');

        //this.cameras.main.startFollow(this.ship, true, 0.09, 0.09);
        // this.cameras.main.roundPixels = true;

        //this.cameras.main.setZoom(2);

        var controlConfig = {
            camera: this.cameras.main,
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S), //cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            drag: 0.0005,
            speed: 0.5
        };

        camera = this.cameras.main;
        dragScale
            .on('drag1', function (dragScale) {
                var drag1Vector = dragScale.drag1Vector;
                camera.scrollX -= drag1Vector.x / camera.zoom;
                camera.scrollY -= drag1Vector.y / camera.zoom;
            })
            .on('pinch', function (dragScale) {
                var scaleFactor = dragScale.scaleFactor;
                camera.zoom *= scaleFactor;
            }, this)

        loadmap();
        this.loadmapimage();

        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
        this.MakeMarker();

   
    }

    update(time, delta) {
        if (firsttime == false) {
            firsttime = true;
            shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
            savemap();
            //console.log(mappos);
        }

        // 좌표 막기
       if(camera.scrollX <-1500)camera.scrollX = -1500;
       if(camera.scrollX >1550)camera.scrollX = 1550;

        if(camera.scrollY <-30)camera.scrollY = -30;
        if(camera.scrollY >1300)camera.scrollY = 1300;

       if(camera.zoom < 1.8) camera.zoom = 1.8;
       if(camera.zoom > 3.0)camera.zoom = 3.0;

        // worldPoint의 좌표를 맵만의 좌표로 변경해준다. 0 ~ 39까지
        //pointerTileY = map1.worldToTileY(worldPoint.y)

        worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
        pointerTileXY = map1.worldToTileXY(worldPoint.x, worldPoint.y, true);
        markerXY = map1.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);

        // //범위가 벗어나면 새롭게 그리지 않는다.
        if (pointerTileXY.x < 40 && pointerTileXY.x > -1 && pointerTileXY.y < 40 && pointerTileXY.y > -1) {
            // 다시 고정 좌표로
            marker.x = markerXY.x;
            marker.y = markerXY.y
        }



        // 컨트롤러 업데이트
        controls.update(delta);
    }

    MakeMarker() {
        marker = this.add.graphics();
        marker.lineStyle(3, 0x000000, 1); // 굶기, 색상, 
        marker.strokeRect(0, 0, map1.tileWidth, map1.tileHeight);
    }

    loadmapimage() {
        var count = 0;
        for (var i = 0; i < 40; i++) {
            for (var j = 0; j < 40; j++) {
                markerXY = map1.tileToWorldXY(j, i);
                for (var k = 1; k < 4; k++) {
                    if (map2["layers"][0]['data'][i][j]['index'] == k) {
                        //console.log(map2["layers"][0]['data'][i][j]['index'])
                        treetype = k;
                        imagesize[i][j] = this.add.sprite(markerXY.x + 40, markerXY.y, 'abuild' + (treetype - 1)).setInteractive()
                            .on('pointerup', function (pointer) {

                                console.log(this.name)
                                // 이름의 적힌 내용
                                // 건물 종류, 건물 번호,  x좌표, y좌표
                                var beforeStr = this.name;
                                var afterStr = beforeStr.split(',');

                                // 이 좌표에 있는 값 변경
                                var clearPosx = parseInt(afterStr[2]);
                                var clearPosy = parseInt(afterStr[3]);

                                if (fixedtype == 0) {
                                    console.log(clearPosx)

                                    var chan = map1.getTileAt(clearPosx, clearPosy, true, layer2);
                                    map1.setLayer(layer2)
                                    console.log(chan.index)
                                    map1.replaceByIndex(chan.index, -1, clearPosx, clearPosy, 1, 1);
                                    console.log(chan.index)

                                    chan = map2.getTileAt(clearPosx, clearPosy, true);
                                    console.log(chan.index)
                                    map2.replaceByIndex(chan.index, -1, clearPosx, clearPosy, 1, 1);
                                    console.log(chan.index)

                                    this.destroy()
                                }
                                if (isFixing == false) {
                                    console.log(this.name)
                                    var nowScene = this.scene.scene.get('MapScene');
                                    nowScene.upgradetower(this.name, clearPosx, clearPosy);
                                    uptowergroup.setVisible(true);
                                }

                            });
                        console.log(treetype)
                        imagesize[i][j].play('wait' + (treetype - 1));
                        imagesize[i][j].name = 2 + "," + treetype + "," + i + "," + j;
                        imagesize[i][j].setDepth(markerXY.y - 60)
                    }
                }
            }
        }
    }

    upgradetower(fullname, pointx, pointy) {
        var towernum;
        var nowScene = this.scene.get('MainUIScene');

        var beforeStr = fullname;
        var afterStr = beforeStr.split(',');

        // 이 좌표에 있는 값 변경


        var datas;

        $.ajax({
            url: "/pharser_user/getmyinventory",
            async: false,
            data: {
                // "id": userId
            },
            type: "post",
            success: function (data) {
                console.log(data)
                console.log(pointx, pointy)
                $.each(data.rows, function (index, item) {

                    if (item.IS_ESTABLISH == 1 && item.POS_X == pointy && item.POS_Y == pointx) {
                        console.log(item.TOWER_NO);
                        towernum = item.TOWER_NO;
                    }
                });
            },
            beforeSend: function () {},
            complete: function () {}
        });

        $.ajax({
            url: "/pharser_user/gettowershop",
            async: false,
            type: "post",
            data: {
                no: towernum
            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {

                if (data.result == true) {
                    datas = data.rows;
                };
            },
            beforeSend: function () {},
            complete: function () {}
        });
        console.log(datas, towernum)

        var datanums = parseInt(towernum - 1)

        var name = datas[datanums].TITLE;
        var content = datas[datanums].TYPE_CONTENT;
        var content1 = parseInt(datas[datanums].RUNNIG_TIME) / 60 + '분에 ' + datas[datanums].GOLD + '골드를 생성합니다.';
        console.log(name)

        upgradeContents0.setText(name);
        upgradeContents1.setText(content);
        upgradeContents2.setText(content1);
       

        // 또 불리면 내용 변경


    }
}

function loadmap() {
    var count = 0;
    for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 40; j++) {
            map1["layers"][0]['data'][i][j]['index'] = DBMAP[count];
            map1["layers"][1]['data'][i][j]['index'] = DBMAP_TOWER[count];
            map2["layers"][0]['data'][i][j]['index'] = DBMAP_TREE[count];
            map3["layers"][0]['data'][i][j]['index'] = DBMAP_HOUSE[count];
            map4["layers"][0]['data'][i][j]['index'] = DBMAP_ADO[count];
            count++;
        }
    }
}

function savemap() {
    //console.log(map["layers"][0]['data'])
    var count = 0;
    for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 40; j++) {
            DBMAP[count] = map1["layers"][0]['data'][i][j]["index"]
            DBMAP_TOWER[count] = map1["layers"][1]['data'][i][j]["index"]
            DBMAP_TREE[count] = map2["layers"][0]['data'][i][j]['index'];
            DBMAP_HOUSE[count] = map3["layers"][0]['data'][i][j]['index'];
            DBMAP_ADO[count] = map4["layers"][0]['data'][i][j]['index'];
            count++;
            //console.log(map2["layers"][0]['data'][i][j]["index"]);
            //console.log(count);
        }
    }
}