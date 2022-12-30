var ttt = false;
var ks = 'http://k.kakaocdn.net/dn/PZbgG/btq17H0kEjd/eV9nkpnBdBW84LdHup83K1/img_110x110.jpg';

var goodsDate

class MainUIScene extends Phaser.Scene {
  MainUIScene() {
    Phaser.Scene.call(this, {
      key: 'MainUIScene'
    });
  }
  constructor() {
    super({
      key: 'MainUIScene'
      // plugins: {
      //   global: [{
      //     key: 'WebFontLoader',
      //     plugin: WebFontLoaderPlugin,
      //     start: true
      //   }]
      // }
    });
  }


  preload() {
    //this.load.image('background2', '/phasergame/images/background.png');
    //this.load.image('man', '/phasergame/images/man.png');
    //this.load.image('block', '/phasergame/images/maps2.png');
    //this.load.crossOrigin = true
    //this.load.crossOrigin = 'http://k.kakaocdn.net/dn/PZbgG/btq17H0kEjd/eV9nkpnBdBW84LdHup83K1/img_110x110.jpg'
    //console.log(userImg);
    //자기 정보창
    //this.load.image('playerimg', ks);
    this.load.image('player_picture', '/phasergame/images/UI/status/statuspic.png');
    this.load.image('levelbar', '/phasergame/images/UI/status/levelbar.png')
    this.load.image('s_0', '/phasergame/images/UI/status/s_s.png')
    this.load.image('s_1', '/phasergame/images/UI/status/s_m.png')
    this.load.image('s_2', '/phasergame/images/UI/status/s_e.png')

    // 정보 UI
    
    this.load.image('moneybar', '/phasergame/images/UI/moneybar.png')
    this.load.image('fishbar', '/phasergame/images/UI/fishbar.png')
    this.load.image('ticketbar', '/phasergame/images/UI/ticketbar.png')

    this.load.image('statusbar', '/phasergame/images/UI/statusbar.png')
    
    //재화 회수
    this.load.image('colbtn', '/phasergame/images/button/Main/colbtn.png');

    // 위쪽 버튼
    this.load.image('ubtn1', '/phasergame/images/button/Main/ubtn1.png');
    this.load.image('ubtn2', '/phasergame/images/button/Main/ubtn2.png')
    this.load.image('ubtn3', '/phasergame/images/button/Main/ubtn3.png')
    this.load.image('ubtn4', '/phasergame/images/button/Main/ubtn4.png')

    // 아래쪽 버튼
    this.load.image('dbtn1', '/phasergame/images/button/Main/dbtn1.png');
    this.load.image('dbtn2', '/phasergame/images/button/Main/dbtn2.png');
    this.load.image('dbtn3', '/phasergame/images/button/Main/dbtn3.png');
    this.load.image('dbtn4', '/phasergame/images/button/Main/dbtn4.png');
    this.load.image('dbtn5', '/phasergame/images/button/Main/dbtn5.png');

    this.load.image('ch1', '/phasergame/images/SquareAnimal/bear.png');

    this.load.spritesheet('picon0', '/phasergame/images/UI/icon0.png', {
      frameWidth: 150,
      frameHeight: 150
  });

    //this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'))
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }
  create() {
    // var Scenemoneyshop = this.scene.add('MoneyShop', MoneyShopScene, false);
    //var imgss = this.add.sprite(550, 100 + 80, 'playerimg')
    console.log(playerIMG)
    
    // if(check){
    // this.scene.start('MoneyShop');}
    //Scenemoneyshop.scene.events.on("start", function(){});
    //console.log(Scenemoneyshop);
    //var bg2 = this.add.sprite(720, 1480, 'man'); // 예비
    //var blocks = this.add.sprite(600, 1300, 'block');
    //this.add.text(10, 10, "this is a text", { } );
    var statusbars = this.add.sprite(450, 100 + 80, 'statusbar')
    var colbtn = this.add.sprite(170, 350 + 80, 'colbtn').setInteractive();

    //var player_pic = this.add.sprite(150, 100 + 80, 'player_picture');
    var levelbar = this.add.sprite(560, 160 + 80, 'levelbar')

    var picons = {
      key: 'iconwait',
      frames: this.anims.generateFrameNumbers('picon0'),
      frameRate: 30,
      yoyo: false,
      repeat: -1
  };
 
  this.anim = this.anims.create(picons);
  this.sprite = this.add.sprite(180, 180, 'picon0').setScale(1.8);
  this.sprite.play('iconwait');

    var level_ui = new Array();
    for (var i = 0; i < 3; i++) {
      //console.log('s_'+'i')
      level_ui[i] = this.add.sprite(75 * i + 400, 235, 's_' + i) // 버튼 로드
    }
    var Player_name = this.add.text(320, 70, "홍길동", {
      font: "80px TheFont",
      align: 'right',
      color: '#ffffff'
    });
    var Player_area = this.add.text(620, 170, "경기도 시흥시", {
      font: "30px TheFont",
      align: 'right',
      color: '#ffffff'
    });

    var Player_Today = this.add.text(400, 340, "25", {
      font: "70px TheFont",
      align: 'right',
      color: '#ffffff'
    });

    Gold_Text = this.add.text(1210, 35, Player_Gold, {
      font: "80px TheFont",
      align: 'right',
      color: '#ffffff'
    });

    Coin_Text = this.add.text(1210, 135, Player_Coin, {
      font: "80px TheFont",
      align: 'right',
      color: '#ffffff'
    });

    Ticket_Text = this.add.text(1210, 235, Player_Ticket, {
      font: "80px TheFont",
      align: 'right',
      color: '#ffffff'
    });
    UpdateMoney();
    //Gold_Text.setTint(0xffffff);

    colbtn.on('pointerup', function (pointer) {
      // 때면~
      // 첫번째에는 건물이 없다고 나옴. 그후에 새롭게 더해짐.
      $.ajax({
        url: "/pharser_user/updatemygoods",
        async: false,
        type: "post",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
          console.log(data)
        
            if (data.isLevelUp) {
              alert(data.level + "레벨에 달성 했습니다.");
            }
            console.log(data)
            alert("경험치 " + data.addExp + "\n 골드 " + data.addGold + "\n 별 " + data.addStar +
              "\n 을 획득하셨습니다.");

            //location.reload();
        },
        beforeSend: function () {},
        complete: function () {}
      });

      $.ajax({
        url: "/pharser_user/getgoodtime",
        async: false,
        data: {
            "seq1": 7,
            "esta": 1
        },
        type: "post",
        success: function (data) {
            console.log(data.rows[0].GOODS_DATE)
            goodtime = new Date(data.rows[0].GOODS_DATE);
          
        },
        beforeSend: function () {
        },
        complete: function () {
        }
    });

      UpdateMoney();
      
    }, this);

    // 위쪽 UI
    var up_uilst = ['moneybar', 'fishbar', 'ticketbar'];
    var up_ui = new Array();
    for (var i = 0; i < 3; i++) {
      up_ui[i] = this.add.sprite(1150, 100 * i + 80, up_uilst[i]) // 버튼 로드
    }

    // 위쪽 버튼
    var i;
    var up_btnlist = ['ubtn1', 'ubtn2', 'ubtn3', 'ubtn4'];
    var up_btn = new Array();
    var thisUI = this.scene;
    for (i = 0; i < 4; i++) {
      up_btn[i] = this.add.sprite(1330, 230 * i + 450, up_btnlist[i]).setInteractive(); // 버튼 로드

      up_btn[i].on('pointermove', function (pointer) {
        this.setScale(1.2);

      });

      up_btn[i].on('pointerout', function (pointer) {
        this.setScale(1.0);
      });
    }

    up_btn[0].on('pointerup', function (pointer) {
      // 때면~
       //alert(down_btnlist[3] + "(으)로 이동합니다.");
       alert("해당 타일맵을 저장합니다");

       var count = 0;
       for (var i = 0; i < 40; i++) {
         for (var j = 0; j < 40; j++) {
           tempDBMAP[count] = map1["layers"][0]['data'][i][j]['index'];
           tempDBMAP_TOWER[count] = map1["layers"][1]['data'][i][j]['index'];
           tempDBMAP_TREE[count] = map2["layers"][0]['data'][i][j]['index'];
           tempDBMAP_HOUSE[count] = map3["layers"][0]['data'][i][j]['index'];
           tempDBMAP_ADO[count] = map4["layers"][0]['data'][i][j]['index'];
           count++;
           //console.log('hi');
         }
       }
 
       if (isCreate == false) {
         console.log("isCreate = false")
         $.ajax({
           url: "/pharser/savemap",
           data: {
             "id": userId,
             'mappos': tempDBMAP.toString(),
             'adopos': tempDBMAP_ADO.toString(),
             'coin': Player_Gold,
             's_coin': Player_Coin,
             't_coin': Player_Ticket,
             'map_id': 1
           },
           async: false,
           type: "post",
           contentType: "application/x-www-form-urlencoded; charset=UTF-8",
           success: function (data) {},
           beforeSend: function () {},
           complete: function () {}
         });
         $.ajax({
           url: "/pharser/savemap_tower",
           data: {
             "id": userId,
             'mappos': tempDBMAP_TOWER.toString(),
             'treepos': tempDBMAP_TREE.toString(),
             'housepos': tempDBMAP_HOUSE.toString(),
             'map_id': 1
           },
           async: false,
           type: "post",
           contentType: "application/x-www-form-urlencoded; charset=UTF-8",
           success: function (data) {},
           beforeSend: function () {},
           complete: function () {}
         });

         $.ajax({
           url: "/pharser/savemap_tower_count",
           data: {
             "id": userId,
             'count': towercount,
             'map_id': 1
           },
           async: false,
           type: "post",
           contentType: "application/x-www-form-urlencoded; charset=UTF-8",
           success: function (data) {},
           beforeSend: function () {},
           complete: function () {}
         });
       } else if (isCreate == true) {
         console.log("isCreate")
         $.ajax({
           url: "/pharser/updatesavemap",
           data: {
             "id": userId,
             'mappos': tempDBMAP.toString(),
             'adopos': tempDBMAP_ADO.toString(),
             'coin': Player_Gold,
             's_coin': Player_Coin,
             't_coin': Player_Ticket,
             'map_id': 1
           },
           async: false,
           type: "post",
           contentType: "application/x-www-form-urlencoded; charset=UTF-8",
           success: function (data) {},
           beforeSend: function () {},
           complete: function () {}
         });
 
         $.ajax({
           url: "/pharser/updatesavemap_tower",
           data: {
             "id": userId,
             'mappos': tempDBMAP_TOWER.toString(),
             'treepos': tempDBMAP_TREE.toString(),
             'housepos': tempDBMAP_HOUSE.toString(),
             'map_id': 1
           },
           async: false,
           type: "post",
           contentType: "application/x-www-form-urlencoded; charset=UTF-8",
           success: function (data) {},
           beforeSend: function () {},
           complete: function () {}
         });
 
         $.ajax({
           url: "/pharser/updatesavemap_tower_count",
           data: {
             "id": userId,
             'count': towercount,
             'map_id': 1
           },
           async: false,
           type: "post",
           contentType: "application/x-www-form-urlencoded; charset=UTF-8",
           success: function (data) {},
           beforeSend: function () {},
           complete: function () {}
         });
       }

    });

    //방명록
    up_btn[1].on('pointerup', function (pointer) {
      this.scene.launch('GuestbookScene')
      this.scene.moveUp('GuestbookScene');
    }, this);

    up_btn[2].on('pointerup', function (pointer) {
      // 때면~
    }, this);

    up_btn[3].on('pointerup', function (pointer) {
      // 때면~
    }, this);

    // 아래쪽 버튼
    var down_btnlist = ['dbtn1', 'dbtn2', 'dbtn3', 'dbtn4', 'dbtn5'];
    var down_btn = new Array();

    down_btn[0] = this.add.sprite(270 * 0 + 190, 2700, down_btnlist[0]).setInteractive(); // 버튼 로드
    down_btn[1] = this.add.sprite(270 * 1 + 190, 2700, down_btnlist[1]).setInteractive(); // 버튼 로드
    down_btn[2] = this.add.sprite(270 * 2 + 190, 2700, down_btnlist[2]).setInteractive(); // 버튼 로드
    down_btn[3] = this.add.sprite(270 * 3 + 190, 2700, down_btnlist[3]).setInteractive(); // 버튼 로드
    down_btn[4] = this.add.sprite(270 * 4 + 190, 2700, down_btnlist[4]).setInteractive(); // 버튼 로드

    for (i = 0; i < 5; i++) {
      // 버트 누르면 사이즈
      down_btn[i].on('pointermove', function (pointer) {
        this.setScale(1.2);
      });

      down_btn[i].on('pointerout', function (pointer) {
        this.setScale(1.0);
      });
    }

    down_btn[0].on('pointerup', function (pointer) {
      //this.scene.scene.start('SelectScene')
      $('#myGalleryfeed').modal('show');
      //alert(down_btnlist[0] + "(으)로 이동합니다.");a
      // 때면~
    });

  // 건설하기
  down_btn[1].on('pointerup', function (pointer) {
    this.scene.scene.launch('FixMapScene')
  });

    down_btn[2].on('pointerup', function (pointer) {
      //$('#myGallerylist').modal('show');
      this.scene.scene.launch('MainShopScene');
      //alert(down_btnlist[1] + "(으)로 이동합니다.");
      // 때면~
    });

    down_btn[3].on('pointerup', function (pointer) {
      this.scene.scene.launch('FriendScene')
      this.scene.scene.moveUp('FriendScene');
      // 때면~
    });

    down_btn[4].on('pointerup', function (pointer) {

      this.scene.scene.launch('MoneyShopScene')
      this.scene.scene.moveUp('MoneyShopScene');

    });
    //this.input.on('gameobjectup', this.clickHandler, this);
    //layer = map.create('level1', 40, 30, 32, 32);

    // cointimer = this.time.addEvent({
    //   delay: 10000, // ms
    //   callback: GetCoin,
    //   loop: true
    // });
  //캐릭터 움직이기
  graphics = this.add.graphics();

  path = { t: 0, vec: new Phaser.Math.Vector2() };
  curve = new Phaser.Curves.Line(new Phaser.Math.Vector2(100, 100), new Phaser.Math.Vector2(600, 400));

  this.tweens.add({
      targets: path,
      t: 1,
      ease: 'Sine.easeInOut',
      duration: 2000,
      yoyo: true,
      repeat: -1
  });
 // sec_gap = (todaytime.getTime() - goodtime.getTime())/1000;

  var ball1 = this.add.follower(curve, 50, 350, 'ch1');
  ball1.startFollow(4000);
  }
  update() {

    todaytime = new Date();  
    this.mtime()

    if(sec_gap > 60) sec_gap = 60;

    graphics.clear();

      //graphics.lineStyle(10, 0xffffff, 1);
  
      //curve.draw(graphics);
  
      curve.getPoint(path.t, path.vec);
  
      graphics.fillStyle(0xff0000, 1);
      graphics.fillCircle(path.vec.x, path.vec.y, 16);
  }
  mtime()
  {
    
  }
}

function UpdateMoney() {
  $.ajax({
    url: "/pharser/getuser_coins",
    async: false,
    data: {
      "id": userId
    },
    type: "post",
    success: function (data) {
      console.log(data)
      $.each(data.rows, function (index, item) {
        Player_Gold = item.GOLD;
        Player_Coin = item.STAR;
        Player_Ticket = item.T_COIN;
      });
    },
    beforeSend: function () {},
    complete: function () {}
  });

  Gold_Text.setText(Player_Gold);
  Ticket_Text.setText(Player_Ticket);
  Coin_Text.setText(Player_Coin);
}