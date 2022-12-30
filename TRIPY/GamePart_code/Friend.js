class FriendScene extends Phaser.Scene {
    GuestbookScene() {
        Phaser.Scene.call(this, {
            key: 'FriendScene'
        });
    } // 의미 없는 코드네?
    constructor() {
        super({
            key: 'FriendScene'
        });
    }

    preload() {
        this.load.image('fr_bg', '/phasergame/images/friend/bg_gb.png');
        this.load.image('fr_x', '/phasergame/images/friend/fr_x.png');
        this.load.image('fr_find', '/phasergame/images/friend/handle.png');

        this.load.image('fr_f1', '/phasergame/images/friend/1.png');
        this.load.image('fr_f2', '/phasergame/images/friend/2.png');
    }
    create() {

        var fr_bg = this.add.sprite(720, 1420, 'fr_bg'); // 예비
        var gb_x = this.add.sprite(1340, 500, 'fr_x').setInteractive();;

        var gb_write = this.add.sprite(1070, 2210, 'fr_find').setInteractive();

        var fr_f1 = this.add.sprite(390, 810, 'fr_f1').setInteractive();
        var fr_f2 = this.add.sprite(790, 810, 'fr_f2').setInteractive();

        var fr_f2 = this.add.sprite(790, 810, 'fr_f2').setInteractive();

        var datadddd = this.cache.html.get('htmltest1');
        //console.log(datadddd);
        // var mf = this.add.sprite(720, 880, 'mf'); 
        // var mb = this.add.sprite(720, 1280, 'mb'); 
        var thisUI = this.scene;
        gb_write.on('pointerup', function (pointer) {
            sendFriendSweet();
            (async () => {
                const {
                    value: find_Name
                } = await Swal.fire({
                    title: '친구 추가하기',
                    input: 'text',
                    inputLabel: '친구 추가를 보낼 이름을 입력',
                    inputValue: 'kakao-1876127878',
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (!value) {
                            return 'You need to write something!'
                        }
                    }
                })
        
                if (find_Name) {
                    $.ajax({
                        url: "/pharser/savefriend",
                        data: {
                            "p1": userId,
                            'p2': find_Name, // 받는 사람을 어캐 해야할까요?
                            'con': 0
                        },
                        async: false,
                        type: "post",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {},
                        beforeSend: function () {},
                        complete: function () {}
                
                    });
                    Swal.fire(`'${find_Name}'님께 친구 신청을 보냈습니다.`)
                    //this.sendfriend();
                }
        
            })()
        });

        gb_x.on('pointerup', function (pointer) {
            this.scene.scene.sleep('FriendScene');
            this.scene.scene.sleep('myFriendbox');
            this.scene.scene.sleep('preFriendbox');
        });

        fr_f1.on('pointerup', function (pointer) {
            myfreindchart.length = 0;
            myfreindcount = 0;
            $.ajax({
                url: "/pharser/getmyfriend1",
                async: false,
                data: {
                    "id": userId,
                    "con": 1
                },
                type: "post",
                success: function (data) {
                    $.each(data.rows, function (index, item) {
                        myfreindchart.unshift(item.P2);
                        myfreindcount++;
                    });
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
            
            $.ajax({
                url: "/pharser/getmyfriend2",
                async: false,
                data: {
                    "id": userId,
                    "con": 1
                },
                type: "post",
                success: function (data) {
                    $.each(data.rows, function (index, item) {
                        myfreindchart.unshift(item.P1);
                        myfreindcount++;
                    });
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
            console.log(myfreindcount)
            this.scene.scene.sleep('preFriendbox');
            this.scene.scene.launch('myFriendbox');
        });

        fr_f2.on('pointerup', function (pointer) {
           sendpreFriend();
            this.scene.scene.sleep('myFriendbox');
            this.scene.scene.launch('preFriendbox');
        });


    }
    update() {

        // ch_fish.setText(ch_count1);
        // ch_book.setText(ch_count2);
        //console.log(ch_count1)
    }
    
    sendfriend(){
        console.log(1);
    }
}

function sendpreFriend() {
    prefreindchart.length = 0;
    prefreindcount = 0;
    $.ajax({
        url: "/pharser/getmyfriend1",
        async: false,
        data: {
            "id": userId,
            "con": 0
        },
        type: "post",
        success: function (data) {
            $.each(data.rows, function (index, item) {
                prefreindchart.unshift(item.P2);
                prefreindcount++;
            });
        },
        beforeSend: function () {
        },
        complete: function () {
        }
    });
    
    $.ajax({
        url: "/pharser/getmyfriend2",
        async: false,
        data: {
            "id": userId,
            "con": 0
        },
        type: "post",
        success: function (data) {
            $.each(data.rows, function (index, item) {
                prefreindchart.unshift(item.P1);
                prefreindcount++;
            });
        },
        beforeSend: function () {
        },
        complete: function () {
        }
    });
}