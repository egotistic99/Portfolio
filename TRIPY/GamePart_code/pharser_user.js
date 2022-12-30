var express = require('express');
const moment = require('moment');
var router = express.Router();
var async = require('async');

var mysql = require('mysql');

var passport = require('passport');

var con = require("../db/index.js");



router.post('/updatemygoods', function (req, res) {

    var isSuccess = false;
    var nowTime = moment();
    var nowTimes = moment().format('YYYY-MM-DD HH:mm:ss');

    var addGold = 0;
    var addStar = 0;
    var addExp = 0;
    async.waterfall([
        function (cd) {
            var query = 'SELECT T1.NO, T1.TOWER_NO, T1.TOWER_LEVEL, T1.GOODS_DATE, ' +
                'T2.TITLE, T2.CONTENT, T2.POPULARY, ' +
                '(SELECT AREA FROM PT_AREA WHERE SEQ = T2.AREA_TYPE) AS AREA_NAME, ' +
                'T3.GOLD, T3.STAR, T3.EXP, T3.RUNNIG_TIME ' +
                'FROM PT_PHASER_USER_INVENTORY T1, PT_PHASER_TOWER_ITEM T2, PT_PHASER_TOWER_PRODUCE T3 ' +
                'WHERE USER_SEQ = ? AND IS_ESTABLISH = 1 AND T1.TOWER_NO = T3.TOWER_NO AND T1.TOWER_NO = T2.NO';

            var params = [req.user.SEQ];

            con.connection.query(query, params, function (err, rows, fields) {

                if (err) {
                    console.log(err);
                    cd("error");
                } else if (rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        var goodsDate = moment(rows[i].GOODS_DATE);
                        //var goodsDate = goodsDateFormat.format('YYYY-MM-DD HH:mm:ss');
                        console.log("nowTime = " + nowTime);
                        console.log("goodsDate = " + goodsDate);
                        if (nowTime > goodsDate) {
                            var secondDiff = moment.duration(nowTime - goodsDate).asSeconds();
                            //var duration = moment.duration(nowTime - goodsDate);
                            //var secondDiff = duration.asSeconds();
                            if (secondDiff >= rows[i].RUNNIG_TIME) {
                                addGold += rows[i].GOLD;
                                addStar += rows[i].STAR;
                                addExp += rows[i].EXP;
                            }
                            else {
                                addGold += Math.floor((rows[i].GOLD / rows[i].RUNNIG_TIME) * secondDiff);
                                addStar += Math.floor((rows[i].STAR / rows[i].RUNNIG_TIME) * secondDiff);
                                addExp += Math.floor((rows[i].EXP / rows[i].RUNNIG_TIME) * secondDiff);
                            }
                        }
                        else {
                            console.log("데이트 못가져옴");
                            console.log(err);
                        }
                    }
                    isSuccess = true;
                    req.user.EXP = req.user.EXP + addExp;
                    req.user.GOLD = req.user.GOLD + addGold;
                    req.user.STAR = req.user.STAR + addStar

                    console.log(req.user);

                    cd(null, isSuccess, addGold, addExp, addStar);
                } else {
                    cd("error");
                }

            });
        },
        function (isSuccess, addGold, addExp, addStar, cd) {
            var query = 'UPDATE PT_USER SET EXP = ?, GOLD= ?, STAR = ? WHERE SEQ = ?';
            var params = [req.user.EXP, req.user.GOLD, req.user.STAR, req.user.SEQ];

            var isLevelUp = false;
            con.connection.query(query, params, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    cd("error");
                } else {

                    var query = 'SELECT T1.LEVEL, T1.EXP, T2.EXP AS LEVEL_UP_EXP FROM PT_USER T1, PT_LEVEL_TABLE T2 WHERE SEQ = ? AND T1.LEVEL = T2.LEVEL';

                    var params = [req.user.SEQ];

                    con.connection.query(query, params, function (err, rows, fields) {
                        if (err) {
                            console.log(err);
                            cd("error");
                        } else {

                            if (rows[0].EXP >= rows[0].LEVEL_UP_EXP) {
                                var leftover = rows[0].EXP - rows[0].LEVEL_UP_EXP;

                                var query = 'UPDATE PT_USER SET LEVEL = LEVEL + 1, EXP= ? WHERE SEQ = ?';
                                var params = [leftover, req.user.SEQ];
                                con.connection.query(query, params, function (err, rows, fields) {
                                    if (err) {
                                        console.log(err);
                                        cd("error");
                                    } else {
                                        isLevelUp = true;
                                        req.user.LEVEL = req.user.LEVEL + 1;
                                    }
                                });
                            }
                            cd(null, isSuccess, addGold, addExp, addStar, isLevelUp);
                        }
                    });
                }
            });
        },
        function (isSuccess, addGold, addExp, addStar, isLevelUp, cd) {
            var query = 'UPDATE PT_PHASER_USER_INVENTORY SET GOODS_DATE = ? WHERE USER_SEQ = ?';
            var params = [nowTimes, req.user.SEQ];

            con.connection.query(query, params, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    cd("error");
                } else {
                    cd(null, isSuccess, addGold, addExp, addStar, isLevelUp);
                }
            });
        },
    ], function (err, isSuccess, addGold, addExp, addStar, isLevelUp) {
        if (err) {
            res.send({ result: false });
        }
        else {
            console.log(4);
            if (isSuccess) {

                res.send({ isLevelUp: isLevelUp, level: req.user.LEVEL, addGold: addGold, addExp: addExp, addStar: addStar, result: true, isSuccess: isSuccess });
            }
            else {

                res.send({ result: false });
            }
            //res.send({ isLevelUp : isLevelUp, result: true, distance: distance });
            //res.send({ result: true });
        }
    });
});

router.post('/getmyinventory', function (req, res) {

    var isSuccess = false;
    var nowTimes = moment().format('YYYY-MM-DD HH:mm:ss');

    var query = 'SELECT T1.NO, T1.TOWER_NO, T1.TOWER_LEVEL, T1.GOODS_DATE, T1.IS_ESTABLISH, T1.POS_X, T1.POS_Y, ' +
        'T2.TITLE, T2.CONTENT, T2.POPULARY, ' +
        'T3.TYPE_NAME, T3.CONTENT AS TYPE_CONTENT, ' +
        'T4.GOLD, T4.STAR, T4.EXP, T4.RUNNIG_TIME ' +
        'FROM PT_PHASER_USER_INVENTORY T1, PT_PHASER_TOWER_ITEM T2, PT_PHASER_TOWER_TYPE T3, PT_PHASER_TOWER_PRODUCE T4 ' +
        'WHERE T1.USER_SEQ = ? AND T2.NO = T1.TOWER_NO AND T3.NO = T2.TYPE AND T2.NO = T4.TOWER_NO ' +
        'ORDER BY T1.IS_ESTABLISH, T1.NO';

    var params = [req.user.SEQ];

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



router.post('/gettowershop', function (req, res) {

    var isSuccess = false;
    var nowTimes = moment().format('YYYY-MM-DD HH:mm:ss');

    var query = 'SELECT T1.NO, T1.TITLE, T1.CONTENT, T1.POPULARY, T1.PRICE_GOLD, T1.PRICE_STAR, ' +
        'T2.TYPE_NAME, T2.CONTENT AS TYPE_CONTENT, ' +
        'T3.GOLD, T3.STAR, T3.EXP, T3.RUNNIG_TIME ' +
        'FROM PT_PHASER_TOWER_ITEM T1, PT_PHASER_TOWER_TYPE T2, PT_PHASER_TOWER_PRODUCE T3 ' +
        'WHERE T2.NO = T1.TYPE AND T1.NO = T3.TOWER_NO AND T1.IS_SELL = 1 ';


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


router.post('/buytower', function (req, res) {

    var isSuccess = false;
    var nowTimes = moment().format('YYYY-MM-DD HH:mm:ss');
    var isMinusGold = 0;
    var isMinusStar = 0;
    async.waterfall([
        function (cd) {

            var query = 'SELECT T1.NO, T1.PRICE_GOLD, T1.PRICE_STAR, T2.LEVEL, T2.GOLD, T2.STAR, T3.LIMIT_TOWER, ' +
                '(SELECT COUNT(*) FROM PT_PHASER_USER_INVENTORY WHERE USER_SEQ = ? ) AS TOTAL_USER_TOWER ' +
                'FROM PT_PHASER_TOWER_ITEM T1, PT_USER T2, PT_LEVEL_TABLE T3 ' +
                'WHERE T1.NO = ? AND T2.SEQ = ? AND T3.LEVEL = T2.LEVEL LIMIT 1';

            var params = [req.user.SEQ, req.body.no, req.user.SEQ];

            con.connection.query(query, params, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    cd("error");
                } else {
                    console.log(rows.inster);

                    if (req.user.GOLD == rows[0].GOLD && req.user.STAR == rows[0].STAR && req.user.level == rows[0].level) {

                        isMinusGold = rows[0].GOLD - rows[0].PRICE_GOLD;
                        isMinusStar = rows[0].STAR - rows[0].PRICE_STAR;
                        if (isMinusGold < 0 || isMinusStar < 0) {
                            cd("골드 혹은 별이 부족합니다.");
                        }
                        else {
                            cd(null, isMinusGold, isMinusStar, req.body.no);
                        }
                    }
                    else {
                        cd("오류가 있습니다.");

                    }
                }
            });
        },
        function (isMinusGold, isMinusStar, no, cd) {
            var query = 'INSERT PT_PHASER_USER_INVENTORY (USER_SEQ, TOWER_NO, TOWER_LEVEL, IS_ESTABLISH, REG_DATE, GOODS_DATE) values (?,?,?,?,?,?)';
            var params = [req.user.SEQ, no, 1, 0, nowTimes, nowTimes];

            con.connection.query(query, params, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    cd("error");
                } else {


                    var query = 'UPDATE PT_USER SET GOLD= ?, STAR = ? WHERE SEQ = ?';
                    var params = [isMinusGold, isMinusStar, req.user.SEQ];

                    con.connection.query(query, params, function (err, rows, fields) {
                        if (err) {
                            console.log(err);
                            cd("error");
                        } else {
                            isSuccess = true;

                            req.user.GOLD = isMinusGold;
                            req.user.STAR = isMinusStar;
                            cd(null, isSuccess);
                        }
                    });
                }
            });
        },
    ], function (err, isSuccess) {
        if (err) {
            res.send({ result: false, err: err });
        }
        else {
            if (isSuccess) {
                res.send({ result: true, isSuccess: isSuccess });
            }
            else {

                res.send({ result: false, err: "데이터 처리가 완료되지 못했습니다." });
            }
            //res.send({ isLevelUp : isLevelUp, result: true, distance: distance });
            //res.send({ result: true });
        }
    });

});


router.post('/establishmenttower', function (req, res) {

    var isSuccess = false;
    var nowTimes = moment().format('YYYY-MM-DD HH:mm:ss');
    async.waterfall([
        function (cd) {

            var query = 'SELECT T1.NO, T3.LIMIT_TOWER, ' +
                '(SELECT COUNT(*) FROM PT_PHASER_USER_INVENTORY WHERE USER_SEQ = ? AND IS_ESTABLISH= 1 ) AS TOTAL_USER_TOWER ' +
                'FROM PT_PHASER_USER_INVENTORY T1, PT_USER T2, PT_LEVEL_TABLE T3 ' +
                'WHERE T1.NO = ? AND T1.IS_ESTABLISH = 0 AND T2.SEQ = ? AND T3.LEVEL = T2.LEVEL LIMIT 1';

            var params = [req.user.SEQ, req.body.no, req.user.SEQ];

            con.connection.query(query, params, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    cd("error");
                } else {
                    console.log("row + " + rows);
                    if (rows.length > 0) {

                        if (rows[0].TOTAL_USER_TOWER >= rows[0].LIMIT_TOWER) {
                            cd("타워를 더이상 설치 할 수 없습니다.");
                        }
                        else {
                            cd(null, rows[0].NO);
                        }

                    }
                    else {
                        cd("잘못된 요청입니다.");

                    }
                }
            });
        },
        function (no, cd) {

            var query = 'UPDATE PT_PHASER_USER_INVENTORY SET IS_ESTABLISH = 1, MODIFY_DATE = ?, GOODS_DATE = ?, POS_X = ?, POS_Y = ? WHERE NO = ? AND USER_SEQ = ?';
            var params = [nowTimes, nowTimes, req.body.posX, req.body.posY, no, req.user.SEQ];

            con.connection.query(query, params, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    cd("건물 설치에 실패하였습니다.");
                } else {
                    isSuccess = true;
                    cd(null, isSuccess);
                }
            });
        }
    ], function (err, isSuccess) {
        if (err) {
            res.send({ result: false, err: err });
        }
        else {
            if (isSuccess) {
                res.send({ result: true, isSuccess: isSuccess });
            }
            else {
                res.send({ result: false, err: "데이터 처리가 완료되지 못했습니다." });
            }
            //res.send({ isLevelUp : isLevelUp, result: true, distance: distance });
            //res.send({ result: true });
        }
    });

});

router.post('/cleartower', function (req, res) {

    var isSuccess = false;
    var nowTimes = moment().format('YYYY-MM-DD HH:mm:ss');

    var query = 'UPDATE PT_PHASER_USER_INVENTORY SET IS_ESTABLISH = 0, MODIFY_DATE = ?, GOODS_DATE = ?, POS_X = 0, POS_Y = 0 WHERE NO = ? AND USER_SEQ = ?';
    var params = [nowTimes, nowTimes, req.body.no, req.user.SEQ];

    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ result: false, err: "건물 해제에 실패하였습니다." });
        } else {
            res.send({ result: true });

        }
    });

});


router.post('/getmypopulary', function (req, res) {

    var isSuccess = false;
    var nowTimes = moment().format('YYYY-MM-DD HH:mm:ss');

    var query = 'SELECT SUM(T2.POPULARY) AS POPULARY ' +
        'FROM PT_PHASER_USER_INVENTORY T1, PT_PHASER_TOWER_ITEM T2 ' +
        'WHERE T1.USER_SEQ = ? AND T1.IS_ESTABLISH = 1 AND T2.NO = T1.TOWER_NO';

    var params = [req.user.SEQ];

    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ result: false });
        } else {
            console.log(rows.inster);
            if (rows.length > 0) {
                res.send({ rows, result: true, populary: rows[0].POPULARY });

            }
            else {
                res.send({ result: false });
            }
        }
    });
});

router.post('/getgoodtime', function(req, res) {
    var query = 
    'SELECT GOODS_DATE FROM PT_PHASER_USER_INVENTORY WHERE USER_SEQ=? AND IS_ESTABLISH=?';
    var params =[req.body.seq1,req.body.esta];
  
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          res.send({result:false});
        }else{
          res.send({rows, result:true});
        }
      });
  });



module.exports = router;