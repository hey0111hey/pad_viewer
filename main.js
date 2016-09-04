
var orb_size =25;
var Nmin_canvas = 6;
var Nmax_canvas = 25;
var margin_width = 0;
var margin_height= 20;
var B_width=6;
var B_height=5;
var testBoard;
var step_count=0;
var isKepri = true;
var nKepri = 4;
window.addEventListener('load',init);

function init(){
  testBoard = new board('545545555455544545455545554545');
  testBoard.init();
  Asset.loadAssets(function(){
    requestAnimationFrame(update);
  })
}


function update(){
  requestAnimationFrame(update);
  for (var i =0; i< Asset.assets.length;i++){
    var iasset=Asset.assets[i];
    switch(iasset.type){
      case 'canvas':
        var name = iasset.name;
        render(iasset.value,Asset.canvases[name],Asset.ctxs[name],testBoard);
        render_orbs(Asset.canvases[name],Asset.ctxs[name],testBoard);
        break;
    }
  }
}

function render(index,canvas,ctx,board){
  //全体をクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "18px 'ＭＳ Ｐゴシック'"
  ctx.strokeText(''+(B_width*B_height-index)+'-'+index,margin_width,margin_height);
  //ドロップを表示

  for(var height = 0; height < board.height ; height++){
    for(var width = 0; width < board.width ; width++){
      var x =width*orb_size + margin_width*2;
      var y =height*orb_size + margin_height*2;
      //背景を表示
      if((height+width)%2 == 0){
         ctx.drawImage(Asset.images['B1'],x,y);
      }else{
         ctx.drawImage(Asset.images['B2'],x,y);
      }
    }
  }
}

 
function render_orbs(canvas,ctx,board){

  for(var height = 0; height < board.height ; height++){
    for(var width = 0; width < board.width ; width++){
      var x =width*orb_size + margin_width*2;
      var y =height*orb_size + margin_height*2;
      // ドロップを表示する
      if(board.cell[width][height]!== 'vanished'){
          ctx.drawImage(Asset.images[board.cell[width][height]],x,y);
        }
      }
    }
}

//////画像読み込みの処理///////////

var Asset ={};
//アセットの定義
Asset.assets = [
  { type: 'image', name: 'R', src: 'assets/R.gif'},
  { type: 'image', name: 'G', src: 'assets/G.gif'},
  { type: 'image', name: 'B', src: 'assets/B.gif'},
  { type: 'image', name: 'Y', src: 'assets/Y.gif'},
  { type: 'image', name: 'P', src: 'assets/P.gif'},
  { type: 'image', name: 'H', src: 'assets/H.gif'},
  { type: 'image', name: 'J', src: 'assets/J.gif'},
  { type: 'image', name: 'D', src: 'assets/D.gif'},
  { type: 'image', name: 'B1', src: 'assets/B1.png'},
  { type: 'image', name: 'B2', src: 'assets/B2.png'},
  { type: 'canvas', name: 'canvas6', value: '6'},
  { type: 'canvas', name: 'canvas7', value: '7'},
  { type: 'canvas', name: 'canvas8', value: '8'},
  { type: 'canvas', name: 'canvas9', value: '9'},
  { type: 'canvas', name: 'canvas10',value: '10'},
  { type: 'canvas', name: 'canvas11',value: '11'},
  { type: 'canvas', name: 'canvas12',value: '12'},
  { type: 'canvas', name: 'canvas13',value: '13'},
  { type: 'canvas', name: 'canvas14',value: '14'},
  { type: 'canvas', name: 'canvas15',value: '15'},
  { type: 'canvas', name: 'canvas16',value: '16'},
  { type: 'canvas', name: 'canvas17',value: '17'},
  { type: 'canvas', name: 'canvas18',value: '18'},
  { type: 'canvas', name: 'canvas19',value: '19'},
  { type: 'canvas', name: 'canvas20',value: '20'},
  { type: 'canvas', name: 'canvas21',value: '21'},
  { type: 'canvas', name: 'canvas22',value: '22'},
  { type: 'canvas', name: 'canvas23',value: '23'},
  { type: 'canvas', name: 'canvas24',value: '24'},
  { type: 'canvas', name: 'canvas25',value: '25'},
//  { type: 'board', name: 'board6', src: 'assets/set/plus/way/plus6_board.dat'},
//  { type: 'board', name: 'board7', src: 'assets/set/plus/way/plus7_board.dat'},
//  { type: 'board', name: 'board8', src: 'assets/set/plus/way/plus8_board.dat'},
//  { type: 'board', name: 'board9', src: 'assets/set/plus/way/plus9_board.dat'},
//  { type: 'board', name: 'board10',src: 'assets/set/plus/way/plus10_board.dat'},
//  { type: 'board', name: 'board11',src: 'assets/set/plus/way/plus11_board.dat'},
//  { type: 'board', name: 'board12',src: 'assets/set/plus/way/plus12_board.dat'},
//  { type: 'board', name: 'board13',src: 'assets/set/plus/way/plus13_board.dat'},
//  { type: 'board', name: 'board14',src: 'assets/set/plus/way/plus14_board.dat'},
//  { type: 'board', name: 'board15',src: 'assets/set/plus/way/plus15_board.dat'},
//  { type: 'board', name: 'board16',src: 'assets/set/plus/way/plus16_board.dat'},
//  { type: 'board', name: 'board17',src: 'assets/set/plus/way/plus17_board.dat'},
//  { type: 'board', name: 'board18',src: 'assets/set/plus/way/plus18_board.dat'},
//  { type: 'board', name: 'board19',src: 'assets/set/plus/way/plus19_board.dat'},
//  { type: 'board', name: 'board20',src: 'assets/set/plus/way/plus20_board.dat'},
//  { type: 'board', name: 'board21',src: 'assets/set/plus/way/plus21_board.dat'},
//  { type: 'board', name: 'board22',src: 'assets/set/plus/way/plus22_board.dat'},
//  { type: 'board', name: 'board23',src: 'assets/set/plus/way/plus23_board.dat'},
//  { type: 'board', name: 'board24',src: 'assets/set/plus/way/plus24_board.dat'},
//  { type: 'board', name: 'board25',src: 'assets/set/plus/way/plus25_board.dat'},
//  { type: 'score', name: 'score6', src: 'assets/set/plus/way/plus6_score.dat'},
//  { type: 'score', name: 'score7', src: 'assets/set/plus/way/plus7_score.dat'},
//  { type: 'score', name: 'score8', src: 'assets/set/plus/way/plus8_score.dat'},
//  { type: 'score', name: 'score9', src: 'assets/set/plus/way/plus9_score.dat'},
//  { type: 'score', name: 'score10',src: 'assets/set/plus/way/plus10_score.dat'},
//  { type: 'score', name: 'score11',src: 'assets/set/plus/way/plus11_score.dat'},
//  { type: 'score', name: 'score12',src: 'assets/set/plus/way/plus12_score.dat'},
//  { type: 'score', name: 'score13',src: 'assets/set/plus/way/plus13_score.dat'},
//  { type: 'score', name: 'score14',src: 'assets/set/plus/way/plus14_score.dat'},
//  { type: 'score', name: 'score15',src: 'assets/set/plus/way/plus15_score.dat'},
//  { type: 'score', name: 'score16',src: 'assets/set/plus/way/plus16_score.dat'},
//  { type: 'score', name: 'score17',src: 'assets/set/plus/way/plus17_score.dat'},
//  { type: 'score', name: 'score18',src: 'assets/set/plus/way/plus18_score.dat'},
//  { type: 'score', name: 'score19',src: 'assets/set/plus/way/plus19_score.dat'},
//  { type: 'score', name: 'score20',src: 'assets/set/plus/way/plus20_score.dat'},
//  { type: 'score', name: 'score21',src: 'assets/set/plus/way/plus21_score.dat'},
//  { type: 'score', name: 'score22',src: 'assets/set/plus/way/plus22_score.dat'},
//  { type: 'score', name: 'score23',src: 'assets/set/plus/way/plus23_score.dat'},
//  { type: 'score', name: 'score24',src: 'assets/set/plus/way/plus24_score.dat'},
//  { type: 'score', name: 'score25',src: 'assets/set/plus/way/plus25_score.dat'},
];
//読み込んだ画像
Asset.images ={};
//読み込んだきゃんぱす
Asset.canvases ={};
Asset.ctxs={};
//読み込んだぼーど
Asset.boards={};
Asset.scores={};

Asset.loadAssets = function(onComplete){
  var total = Asset.assets.length; //アセットの合計数
  var loadCount = 0;//読み込み完了したアセットの数

  //アセットが読み込み終わったときに呼ばれるコールバック関数
  var onLoad = function(){
    loadCount++;
    if(loadCount >= total){
      onComplete();
    }
  };

  //画像の読み込み
  Asset._loadImage = function(asset, onLoad){
    var image = new Image();
    image.src = asset.src;
    image.onload = onLoad;
    Asset.images[asset.name] = image;
  };

  Asset._loadCanvas = function(asset, onLoad){
    console.log(asset.name);
    var _canvas = document.getElementById(asset.name);
    var _ctx = _canvas.getContext('2d');
    var _margin_width =margin_width  - _canvas.style.margin;
    var _margin_height=margin_height - _canvas.style.margin;
     _canvas.width = _margin_width*2 + B_width*orb_size;
     _canvas.height= _margin_height*2 + B_height*orb_size;
    Asset.canvases[asset.name] = _canvas;
    Asset.ctxs[asset.name] = _ctx;
    onLoad();
  };

  Asset._loadBoard= function(asset, onLoad){
    var data = new XMLHttpRequest();
    data.open("GET",asset.src,false);
    data.send(null);
    var lines = data.responseText.split("\n");
    Asset.boards[asset.name]={};
    for(var i=0;i<lines.length;i++){
      Asset.boards[asset.name][i]=lines[i];
    }
    onLoad();
  };

  Asset._loadScore= function(asset, onLoad){
    var data = new XMLHttpRequest();
    data.open("GET",asset.src,false);
    data.send(null);
    var lines = data.responseText.split("\n");
    Asset.scores[asset.name]={};
    for(var i=0;i<lines.length;i++){
      Asset.scores[asset.name][i]=lines[i];
    }
    onLoad();
  };
  //すべてのアセットを読み込む
  Asset.assets.forEach(function(asset){
    switch(asset.type){
      case 'image':
        Asset._loadImage(asset, onLoad);
        break;
      case 'canvas':
        Asset._loadCanvas(asset,onLoad);
        break;
      case 'board':
        Asset._loadBoard(asset,onLoad);
        break;
      case 'score':
        Asset._loadScore(asset,onLoad);
        break;
    }
  });


}

function stepbystep_without_otikon(){
  if(step_count%3 == 0){
    testBoard.elace(isKepri,nKepri,testBoard.result);
  }else if(step_count%3 ==1){
    testBoard.falling();
  }else{
    step_count+=1;
    stepbystep_without_otikon();
    step_count-=1;
  }
  step_count+=1;
}
