var ch_fish;
var ch_book;
var ch_count1 = 0;
var ch_count2 = 0;

class MoneyShopScene extends Phaser.Scene {
    MoneyShopScene ()
    {
        Phaser.Scene.call(this, { key: 'MoneyShopScene' });
    }
    constructor ()
    {
        super({ key: 'MoneyShopScene'});
    }

    preload(){
        this.load.image('bgshop', '/phasergame/images/moneyshop/bg_shop.png');
        this.load.image('mf', '/phasergame/images/moneyshop/moneytofish.png');
        this.load.image('mb', '/phasergame/images/moneyshop/moneytobook.png');
        this.load.image('x', '/phasergame/images/moneyshop/shop_x.png');
        
        this.load.image('slb', '/phasergame/images/moneyshop/shopleftbtn.png');
        this.load.image('srb', '/phasergame/images/moneyshop/shoprightbtn.png');
        this.load.image('s_book', '/phasergame/images/moneyshop/shop_book.png');
        this.load.image('s_fish', '/phasergame/images/moneyshop/shop_fish.png');
        this.load.image('shop_ch', '/phasergame/images/moneyshop/shop_ch.png');
        this.load.image('s_max', '/phasergame/images/moneyshop/shop_max.png');
    }
    create(){
        var bgshop = this.add.sprite(720, 1480, 'bgshop'); // 예비
        var shop_x = this.add.sprite(1270, 630, 'x').setInteractive(); ;

        var mf = this.add.sprite(720, 880, 'mf'); 
        var mb = this.add.sprite(720, 1280, 'mb'); 

        var s_fish = this.add.sprite(370, 1700, 's_fish'); 
        var slbtn = this.add.sprite(590, 1700, 'slb').setInteractive(); 
        var srbtn = this.add.sprite(900, 1700, 'srb').setInteractive();
        var s_max = this.add.sprite(1130, 1700, 's_max').setInteractive();

        var srb = this.add.sprite(370, 2000, 's_book'); 
        var slbtn2 = this.add.sprite(590, 2000, 'slb').setInteractive();
        var srbtn2 = this.add.sprite(900, 2000, 'srb').setInteractive();
        var s_max2 = this.add.sprite(1130, 2000, 's_max').setInteractive();

        var s_ch = this.add.sprite(720, 2270, 'shop_ch').setInteractive();

        

        slbtn.on('pointerup', function (pointer) {
            ch_count1 = ch_count1 -1;
            console.log(ch_count1)
            ch_fish.setText(ch_count1);
          });

        srbtn.on('pointerup', function (pointer) {
            ch_count1++;
            console.log(ch_count1)
            ch_fish.setText(ch_count1);
        }); 

        slbtn2.on('pointerup', function (pointer) {
            ch_count2 = ch_count2 -1;
            console.log(ch_count2)
            ch_book.setText(ch_count2);
          });
        srbtn2.on('pointerup', function (pointer) {
            ch_count2++;
            console.log(ch_count2)
            ch_book.setText(ch_count2);
        }); 

        shop_x.on('pointerup', function (pointer) {
            this.scene.scene.sleep('MoneyShopScene')

        }); 

        ch_fish = this.add.text(700, 1630, ch_fish, {
            fontSize: '150px',
            color: '#ffffff'
          });
      
        ch_book = this.add.text(700, 1930, ch_book, {
            fontSize: '150px',
            color: '#ffffff'
          });

        s_ch.on('pointerup', function (pointer) {
            Player_Gold -= 500 * ch_count1;
            Player_Ticket += ch_count1
            Player_Gold -= 3000 * ch_count2;
            Player_Coin  += ch_count2
            console.log(1);
            UpdateMoney();
            ch_count1 = 0;
            ch_count2 = 0;
            this.scene.scene.sleep('MoneyShopScene')

         });
          
    }
    update(){

        ch_fish.setText(ch_count1);
        ch_book.setText(ch_count2);
        //console.log(ch_count1)
    }
}


// var MoneyShopScene = new Phaser.Class({

//     Extends: Phaser.Scene,

//     initialize:

//     function UIScene ()
//     {
//         Phaser.Scene.call(this, { key: 'MoneyShopScene' });
//     },

//     preload: function ()
//     {
//         this.load.image('bgshop', '/phasergame/images/moneyshop/bg_shop.png');
//     },

//     create: function ()
//     {
//         var bgshop = this.add.sprite(900, 1480, 'bgshop'); // 예비
        
//     }

// });