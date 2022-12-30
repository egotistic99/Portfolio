const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var guestcount = 0; // 총 갯수
var guestpagecount = 0; // 현재 페이지
var guestlastpage = 0;
//var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);

var g_year, g_month, g_days, g_hour, g_minute;
var g_content;
var g_name, g_picture;
var gusetchart = new Array();

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

class Inputbox extends Phaser.Scene {
    Inputbox() {
        Phaser.Scene.call(this, {
            key: 'Inputbox'
        });
    }
    constructor() {
        super({
            key: 'Inputbox'
        });
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

        //this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assetsphasergame/images/arrow-down-left.png');
    }
    create() {
        // 글씨 적는 너비 
        var g_ypos = 690
        var starting = 0 + ( guestpagecount * 4 );
        
        var guestc;
        if(guestpagecount == guestlastpage)
            guestc = guestcount % 4;
        else {
            guestc = 4;
        }
        console.log(starting, guestc, guestlastpage)
        var gpos = 0;
        for (var i = starting; i < starting + guestc; i++) {
            //console.log(i, guestcount);
            
            createTextBox(this, 100, g_ypos + (350 * gpos), {
                wrapWidth: 600,
                fixedWidth: 720,
                fixedHeight: 150,
            }, '35px')
            .start(gusetchart[i].content, 0); // 쓰기 속도
            //getguestlist(nowday.getFullYear(), nowday.getMonth(), nowday.getDate(), nowday.getHours(), nowday.getMinutes());
            console.log(gusetchart);
            var Name = this.add.text(400, g_ypos + 50 + (350 * gpos), gusetchart[i].name, {
                font: '60px Courier',
                fill: '#ffffff'
            });
            var Yeartext = this.add.text(400, g_ypos + 210 + (350 * gpos), gusetchart[i].date, {
                font: '35px Courier',
                fill: '#ffffff'
            });
            gpos++;
        }

    }
    update() {
        //console.log(nowday);
        // ch_fish.setText(ch_count1);
        // ch_book.setText(ch_count2);
        //console.log(ch_count1)
    }
}

var myfreindcount = 0; // 총 갯수
var myfreindpagecount = 0; // 현재 페이지
var myfreindlastpage = 0;
var myfreindchart = new Array();

var friendingcheck;

class myFriendbox extends Phaser.Scene {
    myFriendbox() {
        Phaser.Scene.call(this, {
            key: 'myFriendbox'
        });
    }
    constructor() {
        super({
            key: 'myFriendbox'
        });

    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        this.load.image('gofriendbtn', '/phasergame/images/friend/hippo.png');
        this.load.image('delfriendbtn', '/phasergame/images/friend/hippo.png');
        //this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assetsphasergame/images/arrow-down-left.png');
    }
    create() {
        // 글씨 적는 너비 
        var gof_btn = new Array();
        var gof_btn2 = new Array();
        var g_ypos = 890
        var starting = 0 + ( myfreindpagecount * 4 );
        
        var guestc;
        if(myfreindpagecount == myfreindlastpage)
            guestc = myfreindcount % 4;
        else {
            guestc = 4;
        }
        console.log(starting, guestc, guestlastpage)
        var gpos = 0;

        for (var i = 0; i < 4; i++) {
            gof_btn[i] = this.add.sprite(1000, g_ypos + 150 + (280 * i), 'gofriendbtn').setInteractive().setVisible(false).setDepth(1);
        }
        for (var i = 0; i < 4; i++) {
            gof_btn2[i] = this.add.sprite(1100, g_ypos + 150 + (280 * i), 'delfriendbtn').setInteractive().setVisible(false).setDepth(1);
        }

        for (var i = starting; i < starting + guestc; i++) {
            //console.log(i, guestcount);
            
            createTextBox(this, 100, g_ypos + (280 * gpos), {
                wrapWidth: 600,
                fixedWidth: 720,
                fixedHeight: 80,

            },'60px')
            .start(myfreindchart[i], 0); // 쓰기 속도
            gof_btn[gpos].visible = true;
            gof_btn2[gpos].visible = true;
            gpos++;
        }

        gof_btn[0].on('pointerup', function (pointer) {
            friendId = myfreindchart[starting];
            this.scene.scene.sleep('FriendScene');
            //this.scene.scene.sleep('myFriendbox');
            //this.scene.scene.sleep('preFriendbox');
            this.scene.scene.sleep('MainUIScene')
            this.scene.scene.sleep('MapScene')
            
            this.scene.scene.start('FriendMapScene')
            this.scene.scene.launch('FriendUIScene');
            this.scene.scene.moveUp('FriendMapScene');
        });

        gof_btn[1].on('pointerup', function (pointer) {
            friendId = myfreindchart[starting+1];
            this.scene.scene.sleep('FriendScene');
            //this.scene.scene.sleep('myFriendbox');
            //this.scene.scene.sleep('preFriendbox');
            this.scene.scene.sleep('MainUIScene')
            this.scene.scene.sleep('MapScene')
            this.scene.scene.start('FriendMapScene')
            this.scene.scene.launch('FriendUIScene');
            this.scene.scene.moveUp('FriendMapScene');
        });
        gof_btn[2].on('pointerup', function (pointer) {
            friendId = myfreindchart[starting+2];
            this.scene.scene.sleep('FriendScene');
            //this.scene.scene.sleep('myFriendbox');
            //this.scene.scene.sleep('preFriendbox');
            this.scene.scene.sleep('MainUIScene')
            this.scene.scene.sleep('MapScene')
            this.scene.scene.start('FriendMapScene')
            this.scene.scene.launch('FriendUIScene');
            this.scene.scene.moveUp('FriendMapScene');
        });
        gof_btn[3].on('pointerup', function (pointer) {
            friendId = myfreindchart[starting+3];
            this.scene.scene.sleep('FriendScene');
            //this.scene.scene.sleep('myFriendbox');
            //this.scene.scene.sleep('preFriendbox');
            this.scene.scene.sleep('MainUIScene')
            this.scene.scene.sleep('MapScene')
            this.scene.scene.start('FriendMapScene')
            this.scene.scene.start('FriendUIScene');
            this.scene.scene.moveUp('FriendMapScene');
        });

        gof_btn2[0].on('pointerup', function (pointer) {
            myfreindchart.splice(starting)
            // friendingcheck = 1;
            // prenowcount = starting+1 ;
            // makefriend(prenowcount);
            this.scene.scene.restart('myFriendbox');
        });

        gof_btn2[1].on('pointerup', function (pointer) {
            myfreindchart.splice(starting+1)
            this.scene.scene.sleep('FriendScene');
            //this.scene.scene.sleep('myFriendbox');
            //this.scene.scene.sleep('preFriendbox');
            this.scene.scene.sleep('MainUIScene')
            this.scene.scene.sleep('MapScene')
            this.scene.scene.start('FriendMapScene')
            this.scene.scene.start('FriendUIScene');
            this.scene.scene.moveUp('FriendMapScene');
        });
        gof_btn2[2].on('pointerup', function (pointer) {
            myfreindchart.splice(starting+2)
            this.scene.scene.sleep('FriendScene');
            //this.scene.scene.sleep('myFriendbox');
            //this.scene.scene.sleep('preFriendbox');
            this.scene.scene.sleep('MainUIScene')
            this.scene.scene.sleep('MapScene')
            this.scene.scene.start('FriendMapScene')
            this.scene.scene.start('FriendUIScene');
            this.scene.scene.moveUp('FriendMapScene');
        });
        gof_btn2[3].on('pointerup', function (pointer) {
            myfreindchart.splice(starting+3)
            this.scene.scene.sleep('FriendScene');
            //this.scene.scene.sleep('myFriendbox');
            //this.scene.scene.sleep('preFriendbox');
            this.scene.scene.sleep('MainUIScene')
            this.scene.scene.sleep('MapScene')
            this.scene.scene.start('FriendMapScene')
            this.scene.scene.start('FriendUIScene');
            this.scene.scene.moveUp('FriendMapScene');
        });

    }
    update() {
        //console.log(nowday);
        // ch_fish.setText(ch_count1);
        // ch_book.setText(ch_count2);
        //console.log(ch_count1)
    }

    loadingss()
    {
        
    }
}

var prefreindcount = 0; // 총 갯수
var prefreindpagecount = 0; // 현재 페이지
var prefreindlastpage = 0;
var prefreindchart = new Array();


class preFriendbox extends Phaser.Scene {
    preFriendbox() {
        Phaser.Scene.call(this, {
            key: 'preFriendbox'
        });
    }
    constructor() {
        super({
            key: 'preFriendbox'
        });
    }

    preload() {
        this.load.image('gofriendbtn1', '/phasergame/images/friend/gobox.png');
        this.load.image('gofriendbtn2', '/phasergame/images/friend/del.png');
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

        //this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assetsphasergame/images/arrow-down-left.png');
    }
    create() {
        // 글씨 적는 너비 
        var gof_btn1 = new Array();
        var gof_btn2 = new Array();
        var prenowcount = 0;

        var g_ypos = 890
        var starting = 0 + ( prefreindpagecount * 4 );
        
        var guestc;
        if(prefreindpagecount == prefreindlastpage)
            guestc = prefreindcount % 4;
        else {
            guestc = 4;
        }
        var gpos = 0;
        for (var i = 0; i < 4; i++) {
            gof_btn1[i] = this.add.sprite(920, g_ypos + 210 + (350 * i), 'gofriendbtn1').setInteractive().setVisible(false).setDepth(1);
            gof_btn2[i] = this.add.sprite(1100, g_ypos + 210 + (350 * i), 'gofriendbtn2').setInteractive().setVisible(false).setDepth(1);
        }

        for (var i = starting; i < starting + guestc; i++) {
            //console.log(i, guestcount);
            
            createTextBox(this, 100, g_ypos + (350 * gpos), {
                wrapWidth: 600,
                fixedWidth: 720,
                fixedHeight: 150,
            }, '60px')
            .start(prefreindchart[i], 0); // 쓰기 속도
            
            gof_btn1[gpos].visible = true;
            gof_btn2[gpos].visible = true;
            console.log(i-starting);
            gpos++;
        }

        gof_btn1[0].on('pointerup', function (pointer) {
            friendingcheck = 1;
            prenowcount = starting;
            makefriend(prenowcount);
            this.scene.scene.restart('preFriendbox');
         });
         gof_btn2[0].on('pointerup', function (pointer) {
             friendingcheck = 2;
             prenowcount = starting;
             makefriend(prenowcount);
             this.scene.scene.restart('preFriendbox');
         });
         gof_btn1[1].on('pointerup', function (pointer) {
            friendingcheck = 1;
            prenowcount = starting+1 ;
            makefriend(prenowcount);
            this.scene.scene.restart('preFriendbox');
         });
         gof_btn2[1].on('pointerup', function (pointer) {
             friendingcheck = 2;
             prenowcount = starting+1;
             makefriend(prenowcount);
             this.scene.scene.restart('preFriendbox');
         });
         gof_btn1[2].on('pointerup', function (pointer) {
            friendingcheck = 1;
            prenowcount = starting+2;
            makefriend(prenowcount);
            this.scene.scene.restart('preFriendbox');
         });
         gof_btn2[2].on('pointerup', function (pointer) {
             friendingcheck = 2;
             prenowcount = starting+2;
             makefriend(prenowcount);
             this.scene.scene.restart('preFriendbox');
         });
         gof_btn1[3].on('pointerup', function (pointer) {
            friendingcheck = 1;
            prenowcount = starting+3;
            makefriend(prenowcount);
            this.scene.scene.restart('preFriendbox');
         });
         gof_btn2[3].on('pointerup', function (pointer) {
             friendingcheck = 2;
             prenowcount = starting+3;
             makefriend(prenowcount);
             this.scene.scene.restart('preFriendbox');
         });

    }
    update() {
    }
}

var makefriend = function(ncount){
    friendId = prefreindchart[ncount];
    $.ajax({
        url: "/pharser/updatefriendstate",
        data: {
          "p1": userId,
          "p2": friendId,
          'con': friendingcheck
        },
        async: false,
        type: "post",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {},
        beforeSend: function () {},
        complete: function () {}
      });
      sendpreFriend();
}

var delfriend = function(ncount){
    friendId = prefreindchart[ncount];
    $.ajax({
        url: "/pharser/updatefriendstate",
        data: {
          "p1": userId,
          "p2": friendId,
          'con': friendingcheck
        },
        async: false,
        type: "post",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {},
        beforeSend: function () {},
        complete: function () {}
      });

      prefreindchart.length = 0;
      prefreindcount = 0;
}

const GetValue = Phaser.Utils.Objects.GetValue;


var createTextBox = function (scene, x, y, config, fonts) {
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({
            x: x,
            y: y,

            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT), // 배경박스 색상

            icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK), // 점점점 색상

            // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight, fonts), // 글씨 관련

            action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false), // 이미지 색상

            space: {
                left: 20,
                right: 20,
                top: 130,
                bottom: 20,
                icon: 250,
                text: 10, // 거리 조절
            }
        })
        .setOrigin(0)
        .layout();
    
    textBox
        .setInteractive()
        .on('pointerdown', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
                return;
            }

            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });
        }, textBox)
    //.on('type', function () {
    //})

    

    return textBox;
}

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.add.text(0, 0, '', {
            fontSize: '20px',
            wordWrap: {
                width: wrapWidth
            },
            maxLines: 3
        })
        .setFixedSize(fixedWidth, fixedHeight);
}

var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight, fonts) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: fonts,
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 3
    })
}

