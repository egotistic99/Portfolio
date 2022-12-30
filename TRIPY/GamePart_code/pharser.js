var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var passport = require('passport');

var moment = require('moment');

var con =require("../db/index.js")

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('phaserExample', {
    });
  } else {
    res.render('phaserExample', {

    });
  }

});

router.get('/phaser3rdweek', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('phaser3rdWeek', {
      userId: req.user.ID,
      loginStatus: true,
      username: req.user.NAME,
      //userAge : getAge(req.user.BIRTHDAY) + "세",
      //userGender : req.user.GENDER,
      userImg: req.user.IMG
    });
  } else {
    res.render('phaser3rdWeek', {
      userId: null,
      loginStatus: false,
      username: "user",
      //userAge : "",
      //userGender : "",
      userImg: "https://ssl.pstatic.net/static/pwe/address/img_profile.png"
    });
  }

});


router.get('/phaser4thWeek', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('phaser4thWeek', {
      title: '꾸미기 테스트',
      userId: req.user.ID,
      loginStatus: true,
      username: req.user.NAME,
      isAdmin : req.user.ISADMIN,
      userLevel : req.user.LEVEL,
      userExp : req.user.EXP,
      userGold : req.user.GOLD,
      userStar : req.user.STAR,
      //userAge : getAge(req.user.BIRTHDAY) + "세",
      //userGender : req.user.GENDER,
      userImg: req.user.IMG
    });
  } else {
    res.redirect('/login/login');
  }

});


router.get('/uploadScore', function (req, res) {

  var query = 'INSERT INTO PHASER (SCORE) VALUES (?)';

  var params = [req.query.score];

  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);
      res.send({ rows, result: true });
    }
  });

});


router.get('/saveStageMode', function (req, res) {

  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');


  var query = 'INSERT INTO PHASER (ID, HP, STAGE, COIN, S_COIN, T_COIN,' +
    'DAMAGE, SPEED, STAGEMODE, PETENABLE, WATERGAUGEMAX, UPDATETIME, SCORE) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

  var params = [req.query.id, req.query.hp, req.query.stageLevel, req.query.playerMoney, req.query.playerSMoney, req.query.playerTMoney,
    req.query.playerDamage, req.query.playerSpeed,
  req.query.stageMode, req.query.petEnable, req.query.waterGaugeMax, nowTime, req.query.score];

  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.inster);
    }
  });

  res.send({ result: true });

});

router.get('/getSaveStageMode', function (req, res) {



  var query = 'SELECT * FROM PHASER WHERE ID = ? AND STAGEMODE = ?';

  var params = [req.query.id, req.query.stageMode];

  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.inster);
      res.send({ rows, result: true });
    }
  });


});

router.get('/saveInfiniteMode', function (req, res) {

  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');


  var query = 'INSERT INTO PHASER (ID, HP, STAGE, COIN, S_COIN, T_COIN,' +
    'DAMAGE, SPEED, STAGEMODE, PETENABLE, WATERGAUGEMAX, UPDATETIME, SCORE) ' +
    'VALUES (?,?,?,?,?,?,?,?,?,?,?)';

    var params = [req.query.id, req.query.hp, req.query.stageLevel, req.query.playerMoney, req.query.playerSMoney, req.query.playerTMoney,
      req.query.playerDamage, req.query.playerSpeed,
  req.query.stageMode, req.query.petEnable, req.query.waterGaugeMax, nowTime, req.query.score];

  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.inster);
    }
  });

  res.send({ result: true });

});

router.get('/getInfiniteScore', function (req, res) {

  var query = 'SELECT * FROM PHASER WHERE STAGEMODE = ? ORDER BY SCORE DESC';

  var params = [req.query.stageMode];


  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);

      res.send({ rows, result: true });
    }
  });
});

router.get('/getScore', function (req, res) {

  var query = 'SELECT * FROM PHASER ORDER BY SCORE DESC';


  con.connection.query(query, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);

      res.send({ rows, result: true });
    }
  });
});

/****************************졸업설계 */


router.post('/savemap', function (req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO PT_PHASER (ID, MAP_DATA, ADO_DATA, REG_DATE, COIN, S_COIN, T_COIN, MAP_ID) ' +
  'VALUES (?,?,?,?,?,?,?)';

  var params = [req.body.id, req.body.mappos, req.body.adopos, nowTime,req.body.coin, req.body.s_coin, req.body.t_coin, req.body.map_id];

  con.connection.query(query,params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);

      res.send({ rows, result: true });
    }
  });
});


router.post('/savemap_tower', function (req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO PT_PHASER_TOWER (ID, MAP_DATA, TREE_DATA, HOUSE_DATA, REG_DATE, MAP_ID) ' +
  'VALUES (?,?,?,?,?,?)';

  var params = [req.body.id, req.body.mappos,req.body.treepos,req.body.housepos, nowTime,req.body.map_id];

  con.connection.query(query,params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);

      res.send({ rows, result: true });
    }
  });
});


router.post('/savemap_tower_count', function (req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO PT_PHASER_TOWER_COUNT (ID, COUNT, REG_DATE, MAP_ID) ' +
  'VALUES (?,?,?,?)';

  var params = [req.body.id, req.body.count,nowTime,req.body.map_id];

  con.connection.query(query,params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);

      res.send({ rows, result: true });
    }
  });
});


router.post('/getusermapcreate', function(req, res) {
  var query = 
  'SELECT EXISTS (SELECT * FROM PT_PHASER WHERE ID=? AND MAP_ID=?) AS SUCCESS';
  var params =[req.body.id, req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        console.log(rows);
        res.send({rows, result:true});
      }
    });
});


router.post('/getusermapcreate_tower', function(req, res) {
  var query = 
  'SELECT EXISTS (SELECT * FROM PT_PHASER_TOWER WHERE ID=? AND MAP_ID=?) AS SUCCESS';
  
  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        console.log(rows);
        res.send({rows, result:true});
      }
    });
});

router.post('/getusermapcreate_tower_count', function(req, res) {
  var query = 
  'SELECT EXISTS (SELECT * FROM PT_PHASER_TOWER_COUNT WHERE ID=? AND MAP_ID=?) AS SUCCESS';
  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        console.log(rows);
        res.send({rows, result:true});
      }
    });
});

router.post('/updatesavemap', function(req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'UPDATE PT_PHASER SET MAP_DATA = ?,  ADO_DATA = ?, MODIFY_DATE = ?, COIN = ?, S_COIN = ?, T_COIN = ? WHERE ID = ? AND MAP_ID= ?';
  
  var params = [req.body.mappos, req.body.adopos, nowTime,req.body.coin, req.body.s_coin, req.body.t_coin,req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        res.send({result:true});
      }
    });
});


router.post('/updatesavemap_tower', function(req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'UPDATE PT_PHASER_TOWER SET MAP_DATA = ?, TREE_DATA = ?, HOUSE_DATA = ?, MODIFY_DATE = ? WHERE ID = ? AND MAP_ID= ?';
  
  var params = [req.body.mappos,req.body.treepos,req.body.housepos,nowTime,req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        res.send({result:true});
      }
    });
});


router.post('/updatesavemap_tower_count', function(req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'UPDATE PT_PHASER_TOWER_COUNT SET COUNT = ?, MODIFY_DATE = ? WHERE ID = ? AND MAP_ID= ?';
  
  var params = [req.body.count,nowTime,req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        res.send({result:true});
      }
    });
});

router.post('/getusermap_ado', function(req, res) {
  var query = 
  'SELECT MAP_DATA, ADO_DATA FROM PT_PHASER WHERE ID=? AND MAP_ID=?';
  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});


router.post('/getusermap_tower', function(req, res) {
  var query = 
  'SELECT MAP_DATA FROM PT_PHASER_TOWER WHERE ID=? AND MAP_ID=?';

  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});

router.post('/getusermap_tree', function(req, res) {
  var query = 
  'SELECT TREE_DATA FROM PT_PHASER_TOWER WHERE ID=? AND MAP_ID=?';
  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});

router.post('/getusermap_house', function(req, res) {
  var query = 
  'SELECT HOUSE_DATA FROM PT_PHASER_TOWER WHERE ID=? AND MAP_ID=?';
  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});


router.post('/getusermap_tower_count', function(req, res) {
  var query = 
  'SELECT COUNT FROM PT_PHASER_TOWER_COUNT WHERE ID=? AND MAP_ID=?';
  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});

router.post('/getuser_coins', function(req, res) {

  var query = 
  'SELECT GOLD, STAR FROM PT_USER WHERE ID=?';
  var params =[req.body.id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});

//친구 추가 저장.
router.post('/savefriend', function (req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO PT_PHASER_FRIEND (P1, P2, REGISTER_DATE, CON) ' +
  'VALUES (?,?,?,?)';

  var params = [req.body.p1, req.body.p2,nowTime,req.body.con];

  con.connection.query(query,params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);
      res.send({ rows, result: true });
    }
  });
});

router.post('/getmyfriend1', function(req, res) {
  var query = 
  'SELECT P2 FROM PT_PHASER_FRIEND WHERE CON = ? AND P1 = ?';
  var params =[req.body.con, req.body.id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});

router.post('/getmyfriend2', function(req, res) {
  var query = 
  'SELECT P1 FROM PT_PHASER_FRIEND WHERE CON = ? AND P2 = ?';
  var params =[req.body.con, req.body.id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});

router.post('/updatefriendstate', function(req, res) {
  var query = 'UPDATE PT_PHASER_FRIEND SET CON = ? WHERE P1 = ? AND P2 = ?';
  
  var params = [req.body.con, req.body.p1,req.body.p2];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        res.send({result:true});
      }
    });
});


router.post('/getgofriendmap', function(req, res) {
  var query = 
  'SELECT MAP_DATA, TREE_DATA, HOUSE_DATA FROM PT_PHASER_TOWER WHERE ID=? AND MAP_ID=?';
  var params =[req.body.id, req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});


// 방명록 저장.
router.post('/saveguestbook', function (req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO PT_PHASER_GUESTBOOK (WRITER_ID, DEAR_ID, CONTENT, REGISTER_DATE, DEL) ' +
  'VALUES (?,?,?,?,?)';

  var params = [req.body.writer_id, req.body.dear_id,req.body.content,nowTime,req.body.del];

  con.connection.query(query,params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);
      res.send({ rows, result: true });
    }
  });
});

router.post('/getguestbook', function(req, res) {
  var query = 
  'SELECT NAME, REGISTER_DATE, CONTENT FROM PT_PHASER_GUESTBOOK, PT_USER WHERE ID = DEAR_ID AND DEAR_ID=? AND DEL=?';
  var params =[req.body.id,req.body.del];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});

// 사진 내용을 받아오자!
router.post('/getleadgallery', function(req, res) {
  var query = 
  'SELECT IMG, NAME, REG_DATE, GROUP_NUM FROM PT_PHASER_GALLERY WHERE ID=? AND OD=?';
  var params =[req.body.id, req.body.od];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});

router.post('/getleadphoto', function(req, res) {
  var query = 
  'SELECT IMG, NAME, REG_DATE, TURN FROM PT_PHASER_GALLERY WHERE ID=? AND GROUP_NUM=? AND STATE = ? ORDER BY TURN';
  var params =[req.body.id, req.body.g_n, req.body.state];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});

router.post('/getmodifyphoto', function(req, res) {
  var query = 
  'SELECT IMG, NAME, REG_DATE, TURN FROM PT_PHASER_GALLERY WHERE ID=? AND GROUP_NUM=? AND STATE = ? ORDER BY TURN';
  var params =[req.body.id, req.body.g_n, req.body.state];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});

router.post('/updatedelphoto', function(req, res) {
  var query = 'UPDATE PT_PHASER_GALLERY SET STATE = ? WHERE ID = ? AND IMG = ?';
  
  var params = [req.body.state, req.body.id,req.body.img];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        res.send({result:true});
      }
    });
});

// 작성자를 받아오자!
router.post('/getnickname', function(req, res) {
  var query = 
  'SELECT NAME, IMG FROM PT_USER WHERE ID = ?';
  var params =[req.body.id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});

module.exports = router;
