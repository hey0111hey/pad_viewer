
var orb_size =50;
var Nmin_canvas = 7;
var Nmax_canvas = 23;
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
  canvas_setume=document.getElementById("canvas26");
  var ctx =canvas_setume.getContext('2d');
  ctx.font = "18px 'MS ゴシック'";
  ctx.fillStyle ="white";
  ctx.fillText('攻撃色-他色',margin_width,margin_height);
  ctx.fillText("1.平均倍率",margin_width,margin_height+55);
  ctx.fillText("2.盤面倍率より低い倍率となる割合",margin_width,margin_height+75);
  ctx.fillText("3.最低倍率",margin_width,margin_height+95);
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
        var value =iasset.value;
        render(iasset.value,Asset.canvases[name],Asset.ctxs[name],BoardMgr.boards[value]);
        render_orbs(Asset.canvases[name],Asset.ctxs[name],BoardMgr.boards[value]);
        break;
    }
  }
}

function setume(){

}
function render(index,canvas,ctx,board){
  //全体をクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "18px Comic Sans MS";
  ctx.fillText(''+(B_width*B_height-index)+'-'+index,margin_width,margin_height);
  ctx.font = "15px Comic Sans MS";
  ctx.fillStyle ="white";
  ctx.fillText(BoardMgr.scores[index],margin_width,margin_height+15);
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

////////////////BoardMgr////////////////////
var BoardMgr ={};
BoardMgr.boards =new Array();
BoardMgr.scores =new Array();
BoardMgr.index =new Array();

BoardMgr.init = function(Asset){
  for(var i=Nmin_canvas;i<=Nmax_canvas;i++){
    BoardMgr.index[i] =0;
    var iboard = "board"+i;
    var iscore= "score"+i;
    console.log(Asset.boards[iboard][BoardMgr.index[i]]);
    BoardMgr.boards[i] = new board(Asset.boards[iboard][BoardMgr.index[i]]);
    BoardMgr.boards[i].init();
    BoardMgr.scores[i] = Asset.scores[iscore][BoardMgr.index[i]];
  }
}

BoardMgr.set = function(i){
    var iboard = "board"+i;
    var iscore= "score"+i;
    BoardMgr.boards[i].setBoard(Asset.boards[iboard][BoardMgr.index[i]]);
    BoardMgr.scores[i] = Asset.scores[iscore][BoardMgr.index[i]];
}
BoardMgr.next = function(i){
    var iboard = "board"+i;
    if(Asset.boards[iboard].length<=BoardMgr.index[i]){
      return false;
    }
    BoardMgr.index[i]++;
    BoardMgr.set(i);
    return true;
}

BoardMgr.prev= function(i){
    var iboard = "board"+i;
    if(BoardMgr.index[i]<=0){
      return false;
    }
    BoardMgr.index[i]--;
    BoardMgr.set(i);
    return true;
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
  { type: 'board', name: 'board7', src: 'assets/set/shogun/mini/shogun7_line_board_mini.dat'},
  { type: 'board', name: 'board8', src: 'assets/set/shogun/mini/shogun8_line_board_mini.dat'},
  { type: 'board', name: 'board9', src: 'assets/set/shogun/mini/shogun9_line_board_mini.dat'},
  { type: 'board', name: 'board10',src: 'assets/set/shogun/mini/shogun10_line_board_mini.dat'},
  { type: 'board', name: 'board11',src: 'assets/set/shogun/mini/shogun11_line_board_mini.dat'},
  { type: 'board', name: 'board12',src: 'assets/set/shogun/mini/shogun12_line_board_mini.dat'},
  { type: 'board', name: 'board13',src: 'assets/set/shogun/mini/shogun13_line_board_mini.dat'},
  { type: 'board', name: 'board14',src: 'assets/set/shogun/mini/shogun14_line_board_mini.dat'},
  { type: 'board', name: 'board15',src: 'assets/set/shogun/mini/shogun15_line_board_mini.dat'},
  { type: 'board', name: 'board16',src: 'assets/set/shogun/mini/shogun16_line_board_mini.dat'},
  { type: 'board', name: 'board17',src: 'assets/set/shogun/mini/shogun17_line_board_mini.dat'},
  { type: 'board', name: 'board18',src: 'assets/set/shogun/mini/shogun18_line_board_mini.dat'},
  { type: 'board', name: 'board19',src: 'assets/set/shogun/mini/shogun19_line_board_mini.dat'},
  { type: 'board', name: 'board20',src: 'assets/set/shogun/mini/shogun20_line_board_mini.dat'},
  { type: 'board', name: 'board21',src: 'assets/set/shogun/mini/shogun21_line_board_mini.dat'},
  { type: 'board', name: 'board22',src: 'assets/set/shogun/mini/shogun22_line_board_mini.dat'},
  { type: 'board', name: 'board23',src: 'assets/set/shogun/mini/shogun23_line_board_mini.dat'},
  { type: 'score', name: 'score7', src: 'assets/set/shogun/mini/shogun7_line_score_mini.dat'},
  { type: 'score', name: 'score8', src: 'assets/set/shogun/mini/shogun8_line_score_mini.dat'},
  { type: 'score', name: 'score9', src: 'assets/set/shogun/mini/shogun9_line_score_mini.dat'},
  { type: 'score', name: 'score10',src: 'assets/set/shogun/mini/shogun10_line_score_mini.dat'},
  { type: 'score', name: 'score11',src: 'assets/set/shogun/mini/shogun11_line_score_mini.dat'},
  { type: 'score', name: 'score12',src: 'assets/set/shogun/mini/shogun12_line_score_mini.dat'},
  { type: 'score', name: 'score13',src: 'assets/set/shogun/mini/shogun13_line_score_mini.dat'},
  { type: 'score', name: 'score14',src: 'assets/set/shogun/mini/shogun14_line_score_mini.dat'},
  { type: 'score', name: 'score15',src: 'assets/set/shogun/mini/shogun15_line_score_mini.dat'},
  { type: 'score', name: 'score16',src: 'assets/set/shogun/mini/shogun16_line_score_mini.dat'},
  { type: 'score', name: 'score17',src: 'assets/set/shogun/mini/shogun17_line_score_mini.dat'},
  { type: 'score', name: 'score18',src: 'assets/set/shogun/mini/shogun18_line_score_mini.dat'},
  { type: 'score', name: 'score19',src: 'assets/set/shogun/mini/shogun19_line_score_mini.dat'},
  { type: 'score', name: 'score20',src: 'assets/set/shogun/mini/shogun20_line_score_mini.dat'},
  { type: 'score', name: 'score21',src: 'assets/set/shogun/mini/shogun21_line_score_mini.dat'},
  { type: 'score', name: 'score22',src: 'assets/set/shogun/mini/shogun22_line_score_mini.dat'},
  { type: 'score', name: 'score23',src: 'assets/set/shogun/mini/shogun23_line_score_mini.dat'},
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
      BoardMgr.init(Asset);
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

//    var puzzleButton = document.createElement("input");
//
//    puzzleButton.type="button";
//    puzzleButton.id='btn'+asset.value;
//    puzzleButton.name=asset.name+'btn';
//    puzzleButton.value='puzzle!';
//    puzzleButton.style='position:absolute; top:10px;left:50px';
//    puzzleButton.innerHTML="click!";
//    _canvas.appendChild(puzzleButton);
    onLoad();
  };

  Asset._loadBoard= function(asset, onLoad){
    loadTextFile(asset.src,Asset.boards,asset.name);
    console.log(Asset.boards[asset.name]);
    onLoad();
  };

  Asset._loadScore= function(asset, onLoad){
    loadTextFile(asset.src,Asset.scores,asset.name);
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

function stepbystep_without_otikon(brd){
  if(brd.step_count%3 == 0){
    brd.elace(isKepri,nKepri,brd.result);
  }else if(brd.step_count%3 ==1){
    brd.falling();
  }else{
    brd.step_count+=1;
    stepbystep_without_otikon(brd);
    brd.step_count-=1;
  }
  brd.step_count+=1;
}

// HTTP通信用、共通関数
function createXMLHttpRequest(cbFunc)
{
  var XMLhttpObject = null;
  try{
    XMLhttpObject = new XMLHttpRequest();
  }catch(e){
    try{
      XMLhttpObject = new ActiveXObject("Msxml2.XMLHTTP");
    }catch(e){
      try{
        XMLhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
      }catch(e){
        return null;
      }
    }
  }
  if (XMLhttpObject) XMLhttpObject.onreadystatechange = cbFunc;
  return XMLhttpObject;
}

function loadTextFile(fName,dst,name)
{
  httpObj = createXMLHttpRequest(displayData);
  if (httpObj)
  {
    httpObj.open("GET",fName,false);
    httpObj.send(null);
  }

  var lines =httpObj.responseText.split("\n");
  dst[name]={};
  for(var i=0;i<lines.length-1;i++){
    dst[name][i]=lines[i];
  }
}

function displayData()
{
  if ((httpObj.readyState == 4) && (httpObj.status == 200))
  {
    document.getElementById("resultData").innerText = "Loading is sucsess !!";
  }else{
    document.getElementById("resultData").innerText = "Loading...";
  }
}


function OnClickButton(button){
  var num = button.id.match(/[0-9]+\.?[0-9]*/g);
  var query = button.id.replace(/[0-9]/g,'');
  if(query == 'prev'){
    BoardMgr.prev(num);
  }else if(query == 'next'){
    BoardMgr.next(num);
  }else if(query == 'button'){
 stepbystep_without_otikon(BoardMgr.boards[num]);
  }
}
