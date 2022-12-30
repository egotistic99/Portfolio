var friendId;

class FriendMapScene extends Phaser.Scene {
    FriendMapScene ()
    {
        Phaser.Scene.call(this, { key: 'FriendMapScene' });
    }
    constructor ()
    {
        super({ key: 'FriendMapScene'});
    }

    preload() {
        this.load.tilemapTiledJSON('map', '/phasergame/images/json/real.json');
        this.load.tilemapTiledJSON('treemap', '/phasergame/images/json/testing.json');
        this.load.tilemapTiledJSON('housemap', '/phasergame/images/json/house.json');
        //this.load.tilemapTiledJSON('t1', '/phasergame/images/json/testing.json');
        //json 파일 받는 방3
        //this.load.image('tiles', 'images/tmw_desert_spacing2.png');
        this.load.image('tiles', '/phasergame/images/json/floortower2.png');
        this.load.image('tiles2', '/phasergame/images/json/tower/tree1.png');
        //this.load.image('tree1', '/phasergame/images/json/tower/tree1.png');

        //건물 추가
        //this.load.image('tower1', '/phasergame/images/json/tower/tower1.png');
        this.load.image('treetiles', '/phasergame/images/json/tower/trees_tile.png');
        this.load.image('housetiles', '/phasergame/images/json/tower/house_tile.png');

       
    
        var url;
  
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js';
        this.load.plugin('rexpinchplugin', url, true);
    }
    create() {
        var dragScale = this.plugins.get('rexpinchplugin').add(this);
        
        
        map1 = this.make.tilemap({
            key: 'map',
            tileHeight: 64
        });
        selectedTile = map1.getTileAt(2, 3, true, layer);

        tiles1 = map1.addTilesetImage('floortower', 'tiles'); // 타일셋 이름, 
        tiles2 = map1.addTilesetImage('treetiles', 'tiles2', 82, 123);
        //tiles2.setSize(82,123,82,123);

        layer = map1.createLayer('Ground', tiles1, mastileposx+mapposX, mastileposy+mapposY); // 타일 생성 좌표
        layer2 = map1.createLayer('Tower', tiles2, mastileposx+mapposX, mastileposy+mapposY); // 건물이 있는 없는지 확인하는 레이어
        //console.log(layer);

        //treetile관련
        map2 = this.make.tilemap({
            key: 'treemap'
        });
        treetile1 = map2.addTilesetImage('tree120', 'treetiles'); // 타일셋 이름, 
        treelayer = map2.createLayer('Trees', treetile1,  mastileposx+mapposX, mastileposy+mapposY - 90);

        //housetile 관련
        map3 = this.make.tilemap({
            key: 'housemap'
        });
        housetile1 = map3.addTilesetImage('house160', 'housetiles'); // 타일셋 이름, 
        houselayer = map3.createLayer('Houses', housetile1,  mastileposx-40 + mapposX, mastileposy+mapposY -120);
        
        $.ajax({
            url: "/pharser/getusermapcreate", 
            data: {
                "id": friendId,
                'map_id': 1
            },
            type: "post",
            success: function (data) {
                console.log(1, isCreate);
                if (data.rows[0]['SUCCESS'] == 0) {
                    isCreate = false;
                } else if (data.rows[0]['SUCCESS'] == 1) {
                    isCreate = true;
                    $.ajax({
                        url: "/pharser/getusermap",
                        async: false,
                        data: {
                            "id": friendId,
                            'map_id': 1
                        },
                        type: "post",
                        success: function (data) {
                            console.log(2);
                            $.each(data.rows, function (index, item) {
                                DBMAP = item.MAP_DATA.split(',').map(function (item) {
                                    return parseInt(item, 10);
                                });
                                tempDBMAP = DBMAP;
                               
                            });
                            $.ajax({
                                url: "/pharser/getusermapcreate_tower",
                                async: false,
                                data: {
                                    "id": friendId,
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
                                                "id": friendId,
                                                'map_id': 1
                                            },
                                            type: "post",
                                            success: function (data) {
                                                $.each(data.rows, function (index, item) {
                                                    DBMAP_TOWER = item.MAP_DATA.split(',').map(function (item) {
                                                        return parseInt(item, 10);

                                                    });
                                                    tempDBMAP_TOWER = DBMAP_TOWER;
                                                    console.log(friendId, data, tempDBMAP_TOWER);
                                                    console.log(DBMAP_TOWER);
                                                });
                                            },
                                            beforeSend: function () {
                                            },
                                            complete: function () {
                                            }
                                        });

                                        $.ajax({
                                            url: "/pharser/getusermap_tree",
                                            async: false,
                                            data: {
                                                "id": friendId,
                                                'map_id': 1
                                            },
                                            type: "post",
                                            success: function (data) {
                                                $.each(data.rows, function (index, item) {
                                                    DBMAP_TREE = item.TREE_DATA.split(',').map(function (item) {
                                                        return parseInt(item, 10);

                                                    });
                                                    tempDBMAP_TREE = DBMAP_TREE;
                                                });
                                            },
                                            beforeSend: function () {
                                            },
                                            complete: function () {
                                            }
                                        });

                                        $.ajax({
                                            url: "/pharser/getusermap_house",
                                            async: false,
                                            data: {
                                                "id": friendId,
                                                'map_id': 1
                                            },
                                            type: "post",
                                            success: function (data) {
                                                $.each(data.rows, function (index, item) {
                                                    DBMAP_HOUSE = item.HOUSE_DATA.split(',').map(function (item) {
                                                        return parseInt(item, 10);
                                                    });
                                                    tempDBMAP_HOUSE = DBMAP_HOUSE;
                                                    console.log(data);
                                                    console.log(DBMAP_HOUSE);
                                                    loadmap();
                                                });
                                            },
                                            beforeSend: function () {
                                            },
                                            complete: function () {
                                            }
                                        });
                                    }
                                },
                                beforeSend: function () {
                                },
                                complete: function () {
                                }
                            });
                        },
                        beforeSend: function () {
                        },
                        complete: function () {
                        }
                    });
                }
                isLoading = true;
            },
            beforeSend: function () {
            },
            complete: function () {
            }
        });
        
        // 내용 추가.
        $.ajax({
            url: "/pharser/getguestbook",
            async: false,
            data: {
                "id": friendId, 
                'del': 0
            },
            type: "post",
            success: function (data) {
                $.each(data.rows, function (index, item) {
                    // DBMAP_TOWER = item.MAP_DATA.split(',').map(function (item) {
                    //     return parseInt(item, 10);
                    //console.log(item)
                    pushguestlist(item.NAME, item.CONTENT, item.REGISTER_DATE)
                    
                });
            },
            beforeSend: function () {
            },
            complete: function () {
            }
        });
        this.cameras.main.setZoom(2.5);
        // 카메라 관련
        
        // 카메라 움직이기
        var cursors = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.createCursorKeys();
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

        var camera = this.cameras.main;
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
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
        
      
    }

    update(time, delta) {

        // 컨트롤러 업데이트
        controls.update(delta);
    }
}
