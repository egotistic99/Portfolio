var marker;

var map1;
var tiles1;
var layer;
var layer2;

var isFixing = false;

var pointerTileX;
var pointerTileY;
var pointerTileXY;

var cointimer;

var fixedtype = 1;
var listbar;
var fixbtn = new Array();

var selectedTile;

var mapheight = 20;
var mapwidth = 20;

// 텍스트로 숫자 표시

var FixMaptileCount = new Array();
var FixMaptileList = new Array();

var FixMaplandCount = new Array();
var FixMaplandList = new Array();

var FixMaphouseCount = new Array();
var FixMaphouseList = new Array();

var FixMapadoCount = new Array();
var FixMapadoList = new Array();


class FixMapScene extends Phaser.Scene {
    FixMapScene() {
        Phaser.Scene.call(this, {
            key: 'FixMapScene'
        });
    }
    constructor() {
        super({
            key: 'FixMapScene'
        });
    }

    preload() {
        
    }
    create() {
        this.scene.bringToTop();
        this.scene.launch('InventoryScene')
        for (var i = 0; i < 5; i++) {
            fixbtn[i] = this.add.sprite(180 * (i + 1) - 50, 530, 'fixbtn' + i).setInteractive();
            //fixbtn[i].visible = false;
        }

        isFixing = true;

        listbar = this.add.sprite(720, 2250, 'listbar').setInteractive();
        //listbar.visible = false;
        var tilegroup = this.add.group();
        for (var i = 0; i < tilecheckcnt; i++) {
            tile_btn[i] = this.add.sprite(250 * (i + 1), 2250, 'tilelist' + i).setInteractive(); // 버튼 로드
            tile_btn[i].on('pointerup', function (pointer) {
                console.log('클릭됨')
                isFixing = true;
            });

            //DB에서 값 받아오기
            var dbtilecount = 5;
            FixMaptileCount[i] = this.add.text(250 * (i + 1), 2300, dbtilecount, {
                font: "80px TheFont",
                align: 'right',
                color: '#ffffff'
            });

            givetiletype(tile_btn, i);

            tilegroup.add(tile_btn[i]);
            tilegroup.add(FixMaptileCount[i]);

            FixMaptileList[i] = {
                btn: tile_btn[i],
                text: FixMaptileCount[i],
                count: dbtilecount,
                type: tiletype
            }
            //tile_btn[i].visible = false;
        }
        //tilegroup.setVisible(false);


        var landgroup = this.add.group();
        // 나무 타일 선택하여 값 부여
        for (var i = 0; i < treecheckcnt; i++) {
            tree_btn[i] = this.add.sprite(250 * (i + 1), 2250, 'tree' + i).setInteractive(); // 버튼 로드
            tree_btn[i].on('pointerdown', function (pointer) {
                isFixing = true;
            }); 
            
            FixMaplandList[i] = {
                btn: tree_btn[i],
                text: FixMaplandCount[i],
                count: 0,
                type: treetype
            }
            // 나무값 부여
            givetreetype(tree_btn, i);
            landgroup.add(tree_btn[i]);
        }
        console.log(FixMaplandList);
        
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
                    if(item.IS_ESTABLISH == 0)
                    {
                        if(item.TOWER_NO == 1) FixMaplandList[0].count++;
                        if(item.TOWER_NO == 2) FixMaplandList[1].count++;
                        if(item.TOWER_NO == 3) FixMaplandList[2].count++;
                    }
                });
            },
            beforeSend: function () {},
            complete: function () {}
        });

        for (var i = 0; i < treecheckcnt; i++) {
            var dbtilecount =  FixMaplandList[i].count;
            FixMaplandCount[i] = this.add.text(250 * (i + 1), 2300, dbtilecount, {
                font: "80px TheFont",
                align: 'right',
                color: '#ffffff'
            });
            FixMaplandList[i].text = dbtilecount;
            landgroup.add(FixMaplandCount[i]);
        }
        landgroup.setVisible(false);
       

        // 하우스 타일 선택하여 값 부여
        var housegruop = this.add.group();
        for (var i = 0; i < housecheckcnt; i++) {
            house_btn[i] = this.add.sprite(250 * (i + 1), 2250, 'house' + i).setInteractive(); // 버튼 로드
            house_btn[i].on('pointerdown', function (pointer) {
                isFixing = true;
            });

            FixMaphouseList[i] = {
                btn: tree_btn[i],
                text: "",
                count: 0,
                type: treetype
            }
            // 하우스값 부여
            givehousetype(house_btn, i);

            housegruop.add(house_btn[i]);
        }

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
                    if(item.IS_ESTABLISH == 0)
                    {
                        if(item.TOWER_NO == 4) FixMaphouseList[0].count++;
                        if(item.TOWER_NO == 5) FixMaphouseList[1].count++;
                    }
                });
            },
            beforeSend: function () {},
            complete: function () {}
        });
       

        for (var i = 0; i < housecheckcnt; i++) {
            var dbtilecount =  FixMaphouseList[i].count;

            FixMaphouseCount[i] = this.add.text(250 * (i + 1), 2300, dbtilecount, {
                font: "80px TheFont",
                align: 'right',
                color: '#ffffff'
            });
            FixMaphouseList[i].text =  FixMaphouseCount[i];
            housegruop.add(FixMaphouseCount[i]);
        }
        housegruop.setVisible(false);
        // btnt1 = this.add.sprite(600, 2300, 't1').setInteractive().setScrollFactor(0);
        // btnt2 = this.add.image(900, 2300, 't2').setInteractive().setScrollFactor(0);

        
        // 꾸미기 타일 선택하여 값 부여
        var adogroup = this.add.group();
        for (var i = 0; i < adocheckcnt; i++) {
            ado_btn[i] = this.add.sprite(250 * (i + 1), 2250, 'ado' + i).setInteractive(); // 버튼 로드
            ado_btn[i].on('pointerdown', function (pointer) {
                isFixing = true;
            }); 
            
            FixMapadoList[i] = {
                btn: ado_btn[i],
                text: FixMapadoCount[i],
                count: 0,
                type: adotype
            }
            giveadotype(ado_btn, i);
            adogroup.add(ado_btn[i]);
        }
        console.log(FixMapadoList);
        
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
                    if(item.IS_ESTABLISH == 0)
                    {
                        if(item.TOWER_NO == 1) FixMapadoList[0].count++;
                        if(item.TOWER_NO == 2) FixMapadoList[1].count++;
                        if(item.TOWER_NO == 3) FixMapadoList[2].count++;
                    }
                });
            },
            beforeSend: function () {},
            complete: function () {}
        });

        for (var i = 0; i < adocheckcnt; i++) {
            var dbtilecount =  FixMapadoList[i].count;
            FixMapadoCount[i] = this.add.text(250 * (i + 1), 2300, dbtilecount, {
                font: "80px TheFont",
                align: 'right',
                color: '#ffffff'
            });
            FixMapadoList[i].text = dbtilecount;
            adogroup.add(FixMapadoCount[i]);
        }
        adogroup.setVisible(false);

        console.log(FixMapadoList);


        //(카메라와 함께 이동한다.)
        // btnt1.visible = false;
        // btnt2.visible = false;

        // 건설하기 버튼을 누른다. 누르면 타일들이 생성
        fixbtn[0].on('pointerup', function (pointer) {
            // 나무 타일들은 나타내고
            fixedtype = 1;
            // 바닥 타일은 없앤다.
            tilegroup.setVisible(true);
            landgroup.setVisible(false);
            housegruop.setVisible(false);
            adogroup.setVisible(false);
        });

        fixbtn[1].on('pointerup', function (pointer) {
            // 나무 타일들은 나타내고
            fixedtype = 2;
            // 바닥 타일은 없앤다.
            tilegroup.setVisible(false);
            landgroup.setVisible(true);
            housegruop.setVisible(false);
            adogroup.setVisible(false);
        });

        fixbtn[2].on('pointerup', function (pointer) {
            // 하우스 타일들은 나타내고
            fixedtype = 3;
            tilegroup.setVisible(false);
            landgroup.setVisible(false);
            housegruop.setVisible(true);
            adogroup.setVisible(false);
        });

        fixbtn[3].on('pointerup', function (pointer) {
            // 하우스 타일들은 나타내고
            fixedtype = 4;
            tilegroup.setVisible(false);
            landgroup.setVisible(false);
            housegruop.setVisible(false);
            adogroup.setVisible(true);
        }); 

        fixbtn[4].on('pointerup', function (pointer) {
            // 하우스 타일들은 나타내고
            fixedtype = 0;
            tilegroup.setVisible(false);
            landgroup.setVisible(false);
            housegruop.setVisible(false); 
            adogroup.setVisible(false);
        }); 

    }

    update(time, delta) {
        
    }

    Replacemap(loadfixedtype) {
        
    }
}