// 이 파일은 type을 주기 위한 함수들이 들어있는 파일
var tilecheckcnt = 4;
var tile_btn = new Array();
var tiletype = 0;

var treecheckcnt = 3;
var tree_btn = new Array();
var treetype = 0;

var housecheckcnt = 2;
var house_btn = new Array();
var housetype = 0;

var adocheckcnt = 3;
var ado_btn = new Array();
var adotype = 0;

// 바닥 타일 주기
function givetiletype(typename, startingtype) {
    typename[startingtype].on('pointerup', function (pointer) {
        tiletype = startingtype + 1;
    });
    //console.log("돈다", startingtype)
}

// 나무 타일 주기
function givetreetype(typename, startingtype) {
    typename[startingtype].on('pointerup', function (pointer) {
        treetype = startingtype + 1;
    });
    //console.log("돈다", startingtype)
}

// 집 타일 주기
function givehousetype(typename, startingtype) {
    typename[startingtype].on('pointerup', function (pointer) {
        housetype = startingtype + 1;
    });
    //console.log("돈다", startingtype)
}

// 꾸미기 타입 주기
function giveadotype(typename, startingtype) {
    typename[startingtype].on('pointerup', function (pointer) {
        adotype = startingtype + 1;
    });
    //console.log("돈다", startingtype)
}




//이런식으로 주기 않기 위함.

// tree_btn[0].on('pointerup', function (pointer) {
        //     treetype = 1;
        //     console.log(treetype);
        // });
        // tree_btn[1].on('pointerup', function (pointer) {
        //     treetype = 2;
        //     console.log(treetype);
        // });
        // tree_btn[2].on('pointerup', function (pointer) {
        //     treetype = 3;
        //     console.log(treetype);
        // });
