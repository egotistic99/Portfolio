
class GuestbookScene extends Phaser.Scene {
    GuestbookScene() {
        Phaser.Scene.call(this, {
            key: 'GuestbookScene'
        });
    } // 의미 없는 코드네?
    constructor() {
        super({
            key: 'GuestbookScene'
        });
    }

    preload() {
        this.load.image('bggb', '/phasergame/images/guestbook/bg_gb.png');
        this.load.image('gb_x', '/phasergame/images/guestbook/gb_x.png');


        this.load.image('gb_write', '/phasergame/images/guestbook/writebtn.png');

        this.load.image('gb_left', '/phasergame/images/guestbook/gb_left.png');
        this.load.image('gb_right', '/phasergame/images/guestbook/gb_right.png');

        this.load.html('htmltest1', '/phasergame/images/guestbook/test.html');

        this.load.html({
            key: 'htmltest2',
            url: '/phasergame/images/guestbook/test2.html'
        });
    }
    create() {
        var bggb = this.add.sprite(720, 1420, 'bggb'); // 예비
        var gb_x = this.add.sprite(1340, 500, 'gb_x').setInteractive();;

        var gb_write = this.add.sprite(1070, 2210, 'gb_write').setInteractive();

        var gb_left = this.add.sprite(390, 2210, 'gb_left').setInteractive();
        var gb_right = this.add.sprite(690, 2210, 'gb_right').setInteractive();

        var datadddd = this.cache.html.get('htmltest1');
        //console.log(datadddd);
        // var mf = this.add.sprite(720, 880, 'mf'); 
        // var mb = this.add.sprite(720, 1280, 'mb'); 
        var thisUI = this.scene;
        gb_write.on('pointerup', function (pointer) {
            thisUI.launch('GuestbookWrite');
            thisUI.moveUp('GuestbookWrite');
        });

        gb_x.on('pointerup', function (pointer) {

            this.scene.scene.sleep('GuestbookScene')
            this.scene.scene.sleep('Inputbox');
        });

        gb_left.on('pointerup', function (pointer) {
            guestpagecount--;
            if (guestpagecount < 0) guestpagecount = 0;
            this.scene.scene.launch('Inputbox'); // 왜인지 여기 들어오면 this.scene이 달라지네...
            this.scene.scene.moveUp('Inputbox');
        });

        gb_right.on('pointerup', function (pointer) {
            guestpagecount++;
            if (guestpagecount > guestlastpage) guestpagecount--;
            this.scene.scene.launch('Inputbox'); // 왜인지 여기 들어오면 this.scene이 달라지네...
            this.scene.scene.moveUp('Inputbox');
        });


    }
    update() {

        // ch_fish.setText(ch_count1);
        // ch_book.setText(ch_count2);
        //console.log(ch_count1)
    }
}

class GuestbookWrite extends Phaser.Scene {
    constructor() {
        super({
            key: 'GuestbookWrite'
        });
    }
    preload() {
        this.load.image('writepage', '/phasergame/images/guestbook/writepage.png');
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }
    create() {
        //console.log('guestwrite')
        var firstwrite = true;
        //var writepage = this.add.sprite(700, 1260, 'writepage');
        // createTextBox(this, 100, 600 + (380), {
        //     wrapWidth: 600,
        //     fixedWidth: 720,
        //     fixedHeight: 150,
        // })
        // .start('hi', 0); // 쓰기 속도

        // gb_send.on('pointerup', function (pointer) { // 보내기 누르면 저장.

        // });

        // var textEntry = this.add.text(200, 750, '남기실 말을 적어주세요.', {
        //     fontFamily: 'font1',
        //     font: '60px Courier',
        //     fill: '#000000'
        // });

        var GUESTTEXT;
        (async () => {
            const {
                value: find_Name
            } = await Swal.fire({
                title: '방명록 남기기',
                input: 'text',
                inputLabel: '내용을 입력해주세요!',
                inputValue: '',
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                }
            })

            if (find_Name) {
                GUESTTEXT = find_Name;
                console.log(GUESTTEXT)
                var nowday = new Date();
                getguestlist(nickname, GUESTTEXT, nowday.format('yyyy-MM-dd HH:mm:ss'));
                guestcount++;
                guestlastpage = parseInt(guestcount / 4);
                this.showInputBox();
                //this.scene.scene.sleep('GuestbookWrite');
                
            }
        })()
      
        // 예전 적기.
        // this.input.keyboard.on('keydown', function (event) {
        //     if (event.keyCode === 8 && textEntry.text.length > 0) {
        //         textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
        //     } else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
        //         // console.log(event);
        //         // console.log(event.key);
        //         if(firstwrite) {
        //             textEntry.setText('');
        //             firstwrite = false;
        //         }
        //         textEntry.text += event.key;
        //     }/*
        //     else if (!(event.keyCode >=37 && event.keyCode<=40)) {
        //         var inputVal = event.key;
        //         textEntry.text +=(inputVal.replace(/[a-z0-9]/gi,''));
        //     console.log(event.keyCode);
        //     }*/
        // });



    }
    update() {
        //console.log(nowday);
    }
    
    showInputBox(){
        this.scene.switch('GuestbookScene');
        this.scene.launch('Inputbox'); // 왜인지 여기 들어오면 this.scene이 달라지네...
        this.scene.moveUp('Inputbox');
    }
}

//저장 및 등록
var getguestlist = function (_name, _content, _Time) {
    // 배열에 있는 object를 초기화 하지 않으면 같은 값이 들어간다.
    var guestlist = {
        picture: g_picture,
        name: g_name,
        content: g_content,
        date: g_days
    }
    guestlist.name = _name;
    guestlist.content = _content;
    guestlist.date = _Time
    //console.log(userId)
    $.ajax({
        url: "/pharser/saveguestbook",
        data: {
            "writer_id": userId,
            'dear_id': userId, // 받는 사람을 어캐 해야할까요?
            'content': _content,
            'del': 0
        },
        async: false,
        type: "post",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {},
        beforeSend: function () {},
        complete: function () {}

    });
    gusetchart.unshift(guestlist); // 한개씩 푸쉬
    this.picture = guestlist.picture;
}

// 넣기만
var pushguestlist = function (_name, _content, _Time) {
    // 배열에 있는 object를 초기화 하지 않으면 같은 값이 들어간다.
    var guestlist = {
        picture: g_picture,
        name: g_name,
        content: g_content,
        date: g_days
    }
    guestlist.name = _name;
    guestlist.content = _content;
    guestlist.date = _Time
    guestcount++;
    //console.log(guestcount)
    gusetchart.unshift(guestlist); // 한개씩 푸쉬
    this.picture = guestlist.picture;
}