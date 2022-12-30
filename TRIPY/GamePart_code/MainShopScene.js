var shopbtn = new Array();
var ms_tile_btn = new Array();
var ms_tree_btn = new Array();
var ms_house_btn = new Array();

class MainShopScene extends Phaser.Scene {
    FixMapScene() {
        Phaser.Scene.call(this, {
            key: 'MainShopScene'
        });
    }
    constructor() {
        super({
            key: 'MainShopScene'
        });
    }

    preload() {
        this.load.image('shopbtn0', '/phasergame/images/Shop/shopbtn0.png');
        this.load.image('shopbtn1', '/phasergame/images/Shop/shopbtn1.png');
        this.load.image('shopbtn2', '/phasergame/images/Shop/shopbtn2.png');
        this.load.image('shopbtn3', '/phasergame/images/Shop/shopbtn3.png');
        this.load.image('shopx', '/phasergame/images/Shop/shopx.png');

        this.load.image('shoplistbar', '/phasergame/images/Shop/listbar.png');

        // 타일 추가
        this.load.image('ms_tilelist0', '/phasergame/images/Shop/tiles_btn0.png');
        this.load.image('ms_tilelist1', '/phasergame/images/Shop/tiles_btn1.png');
        this.load.image('ms_tilelist2', '/phasergame/images/Shop/tiles_btn2.png');
        this.load.image('ms_tilelist3', '/phasergame/images/Shop/tiles_btn3.png');

        //this.load.image('ship', 'images/mapPack_tilesheet.png');

        // 빌딩
        this.load.image('ms_tree0', '/phasergame/images/Shop/builds_btn0.png');
        this.load.image('ms_tree1', '/phasergame/images/Shop/builds_btn1.png');
        this.load.image('ms_tree2', '/phasergame/images/Shop/builds_btn2.png');

        // 집 추가
        this.load.image('ms_house0', '/phasergame/images/tower/house0.png');
        this.load.image('ms_house1', '/phasergame/images/tower/house1.png');
    }
    create() {
        this.scene.bringToTop();
       

        var slistbar = this.add.sprite(720, 1450, 'shoplistbar')
        
        for (var i = 0; i < 4; i++) {
          shopbtn[i] = this.add.sprite(220 * (i + 1) + 80, 720, 'shopbtn' + i).setInteractive();
          
      }
       
      var shopuigroup = this.add.group();
        var shopx = this.add.sprite(1200, 720, 'shopx').setInteractive();

        shopx.on('pointerup', function (pointer) {
            this.scene.scene.sleep('MainShopScene');
        });

        var shopselectpic = this.add.sprite(470, 1100, 'ms_tilelist0').setScale(2.2);
        var shopselectname = this.add.text(720, 850, "푸른타일", {
          font: "90px TheFont",
          align: 'right',
          color: '#000000'
        });
        var shopselectcon = this.add.text(720, 980, "푸른색을 띄는 타일", {
          font: "60px TheFont",
          align: 'right',
          color: '#000000'
        });
        
        var tilegroup = this.add.group();
        for (var i = 0; i < tilecheckcnt; i++) {
            ms_tile_btn[i] = this.add.sprite(270 * (i + 1) + 50, 1650, 'ms_tilelist' + i).setInteractive(); // 버튼 로드
            ms_tile_btn[i].name = 'ms_tilelist'+ i;

            console.log(ms_tile_btn[i].name)
            tilegroup.add(ms_tile_btn[i]);
        }

        ms_tile_btn[0].on('pointerup', function (pointer) {
          shopselectpic.name = 'ms_tilelist0'
          shopselectpic.setTexture('ms_tilelist0');
          shopselectname.setText("푸른타일");
          shopselectcon.setText("푸른색을 띄는 타일");
        });
        ms_tile_btn[1].on('pointerup', function (pointer) {
          shopselectpic.name = 'ms_tilelist1'
          shopselectpic.setTexture('ms_tilelist1');
          shopselectname.setText("검정타일");
          shopselectcon.setText("검정색을 띄는 타일");
        });
        ms_tile_btn[2].on('pointerup', function (pointer) {
          shopselectpic.name = 'ms_tilelist2'
          console.log(shopselectpic.name)
          shopselectpic.setTexture('ms_tilelist2');
          shopselectname.setText("파란타일");
          shopselectcon.setText("파란색을 띄는 타일");
        });
        ms_tile_btn[3].on('pointerup', function (pointer) {
          shopselectpic.name = 'ms_tilelist3'
          console.log(shopselectpic.name)
          shopselectpic.setTexture('ms_tilelist3');
          shopselectname.setText("초록타일");
          shopselectcon.setText("초록색을 띄는 타일");
        });

        var landgroup = this.add.group();
        for (var i = 0; i < treecheckcnt; i++) {
            ms_tree_btn[i] = this.add.sprite(270 * (i + 1)+ 50, 1650, 'ms_tree' + i).setInteractive(); // 버튼 로드
            landgroup.add(ms_tree_btn[i]);
        }

        ms_tree_btn[0].on('pointerup', function (pointer) {
          shopselectpic.name = 'ms_tree0'
          shopselectpic.setTexture('ms_tree0');
          shopselectname.setText("건물1");
          shopselectcon.setText("골드를 생성하는 건물");
            alert("건물 1번 구입중...")
            $.ajax({
                url: "/pharser_user/buytower",
                async: false,
                type: "post",
                data: { no: 1 },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                  console.log(data)
                  if (data.result == true) {
                    
                   
                  };
                },
                beforeSend: function () { },
                complete: function () { }
              });
        });

        ms_tree_btn[1].on('pointerup', function (pointer) {
          shopselectpic.name = 'ms_tree1'
          shopselectpic.setTexture('ms_tree1');
          shopselectname.setText("건물2");
          shopselectcon.setText("티켓를 생성하는 건물");
            alert("건물 2번 구입중...")
            $.ajax({
                url: "/pharser_user/buytower",
                async: false,
                type: "post",
                data: { no: 2 },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                  console.log(data)
                  if (data.result == true) {
                    
                    /* if (data.isLevelUp) {
                       alert(data.level + "레벨에 달성 했습니다.");
                     }
                     alert("경험치 " + data.addExp + "\n 골드 " + data.addGold + "\n 별 " + data.addStar +
                       "\n 을 획득하셨습니다.");
                     //location.reload();*/
                  };
                },
                beforeSend: function () { },
                complete: function () { }
              });
        });

        landgroup.setVisible(false);

        
        // 하우스 타일 선택하여 값 부여
        var housegruop = this.add.group();
        for (var i = 0; i < housecheckcnt; i++) {
            ms_house_btn[i] = this.add.sprite(270 * (i + 1) + 50, 1650, 'ms_house' + i).setInteractive(); // 버튼 로드
            housegruop.add(ms_house_btn[i]);
        }
        housegruop.setVisible(false);

        ms_house_btn[0].on('pointerup', function (pointer) {
            alert("큰 건물 1번 구입중...")
            $.ajax({
                url: "/pharser_user/buytower",
                async: false,
                type: "post",
                data: { no: 2 },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                  if (data.result == true) {
                    
                    /* if (data.isLevelUp) {
                       alert(data.level + "레벨에 달성 했습니다.");
                     }
                     alert("경험치 " + data.addExp + "\n 골드 " + data.addGold + "\n 별 " + data.addStar +
                       "\n 을 획득하셨습니다.");
                     //location.reload();*/
                  };
                },
                beforeSend: function () { },
                complete: function () { }
              });
        });

        shopbtn[0].on('pointerup', function (pointer) {
          shopselectpic.name = 'ms_tilelist0'
          shopselectpic.setTexture('ms_tilelist0');
          shopselectname.setText("푸른타일");
          shopselectcon.setText("푸른색을 띄는 타일");
            // 나무 타일들은 나타내고
            tilegroup.setVisible(true);
            landgroup.setVisible(false);
            housegruop.setVisible(false);
        });

        shopbtn[1].on('pointerup', function (pointer) {
          shopselectpic.name = 'ms_tree0'
          shopselectpic.setTexture('ms_tree0');
          shopselectname.setText("건물1");
          shopselectcon.setText("골드를 생성하는 건물");
            // 나무 타일들은 나타내고
            tilegroup.setVisible(false);
            landgroup.setVisible(true);
            housegruop.setVisible(false);

        });

        shopbtn[2].on('pointerup', function (pointer) {
            // 하우스 타일들은 나타내고
            tilegroup.setVisible(false);
            landgroup.setVisible(false);
            housegruop.setVisible(true);
        });

           

    }

    update(time, delta) {
      
    }
}