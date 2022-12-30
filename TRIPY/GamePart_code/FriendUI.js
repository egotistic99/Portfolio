
var ttt = false;
var ks = 'http://k.kakaocdn.net/dn/PZbgG/btq17H0kEjd/eV9nkpnBdBW84LdHup83K1/img_110x110.jpg';
class FriendUIScene extends Phaser.Scene {
  FriendUIScene() {
    Phaser.Scene.call(this, {
      key: 'FriendUIScene'
    });
  }
  constructor() {
    super({
      key: 'FriendUIScene'
    });
  }


  preload() {
    this.load.image('player_picture', '/phasergame/images/UI/status/statuspic.png');
    this.load.image('levelbar', '/phasergame/images/UI/status/levelbar.png')
    this.load.image('s_0', '/phasergame/images/UI/status/s_s.png')
    this.load.image('s_1', '/phasergame/images/UI/status/s_m.png')
    this.load.image('s_2', '/phasergame/images/UI/status/s_e.png')

    // 정보 UI
    this.load.image('todaybar', '/phasergame/images/UI/today.png');
    this.load.image('moneybar', '/phasergame/images/UI/moneybar.png')
    this.load.image('fishbar', '/phasergame/images/UI/fishbar.png')
    this.load.image('ticketbar', '/phasergame/images/UI/ticketbar.png')

    this.load.image('statusbar', '/phasergame/images/UI/statusbar.png')

    // 위쪽 버튼
    this.load.image('spanner', '/phasergame/images/button/Main/spanner.png');
    this.load.image('calculater', '/phasergame/images/button/Main/calculater.png')
    this.load.image('pen', '/phasergame/images/button/Main/pen.png')

    this.load.image('f_guestbtn', '/phasergame/images/button/green.png');

    //this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'))
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }
  create() {
    
    var statusbars = this.add.sprite(450, 100 + 80, 'statusbar')
    var todaybars = this.add.sprite(270, 300 + 80, 'todaybar')

    var player_pic = this.add.sprite(150, 100 + 80, 'player_picture');
    var levelbar = this.add.sprite(560, 160 + 80, 'levelbar')

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

    //Gold_Text.setTint(0xffffff);



    // // 위쪽 UI
    // var up_uilst = ['moneybar', 'fishbar', 'ticketbar'];
    // var up_ui = new Array();
    // for (var i = 0; i < 3; i++) {
    //   up_ui[i] = this.add.sprite(1150, 100 * i + 80, up_uilst[i]) // 버튼 로드
    // }

    // 위쪽 버튼
    var i;
    var up_btnlist = ['spanner', 'calculater', 'pen'];
    var up_btn = new Array();
    var thisUI = this.scene;
    for (i = 0; i < 3; i++) {
      up_btn[i] = this.add.sprite(1330, 200 * i + 450, up_btnlist[i]).setInteractive(); // 버튼 로드

      up_btn[i].on('pointermove', function (pointer) {
        this.setScale(1.2);

      });

      up_btn[i].on('pointerout', function (pointer) {
        this.setScale(1.0);
      });
    }

    up_btn[0].on('pointerup', function (pointer) {
      // 때면~
      thisUI.launch('Inputbox'); // 왜인지 여기 들어오면 this.scene이 달라지네...
      thisUI.moveUp('Inputbox');
      //this.scene.start()
      //alert(up_btnlist[0] + "(으)로 이동합니다.");
      //this.scene.launch('Inputbox');
    });

    //this.scene.launch('MoneyShopScene')
    up_btn[1].on('pointerup', function (pointer) {
      // 때면~
      console.log(this.scene)
      this.scene.launch('MoneyShopScene')
      this.scene.moveUp('MoneyShopScene');
    }, this);

    up_btn[2].on('pointerup', function (pointer) {
      // 때면~

      this.scene.launch('GuestbookScene')
      this.scene.moveUp('GuestbookScene');

      
      $('#myModal').modal('show');
    }, this);

    // 아래쪽 버튼

    var f_guestbtns = this.add.image(840, 1000, 'f_guestbtn').setInteractive();

    f_guestbtns.on('pointerup', function (pointer) {
        console.log(this.scene)
        this.scene.scene.start('MainUIScene');
        this.scene.scene.start('MapScene');
        this.scene.scene.start('MapScene2');

        this.scene.scene.sleep('FriendMapScene')
        this.scene.scene.stop('FriendUIScene')
       
    });   

    cointimer = this.time.addEvent({
      delay: 10000, // ms
      callback: GetCoin,
      loop: true
    });

  }
  update() {}
}