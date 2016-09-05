
  var icolor =['R','B','G','Y','P','H','J','D'];
  // constructor
  var board = function(arg){
    this.boardURL = arg;
    this.height = 5;
    this.width = 6;
    this.cell = {};
    this.isTouch = false;
    this.touchX = 0;
    this.touchY = 0;
    this.isBefore= false;
    this.beforeX = 0;
    this.beforeY = 0;
    this.result ={};
    this.result.combo =  0;
    this.result.dell = new Array();
    for(var i=0; i< icolor.length ;i++){
      this.result.dell[icolor[i]] = new Array();
    }
    this.result.plus = new Array();
    for(var i=0; i< icolor.length ;i++){
      this.result.plus[icolor[i]] = 0;
    }
    this.result.line = new Array();
    for(var i=0; i< icolor.length ;i++){
      this.result.line[icolor[i]] = 0;
    }
    this.result.length = 0;
  }

  var p = board.prototype;

  p.init = function(){
    this.height = 5;
    this.width = 6;
    // cellに2次元配列を作成し水ドロップを追加する
    this.cell = new Array();
    for(var width = 0; width < this.width ; width++){
      this.cell[width] = new Array();
      for(var height =0; height<this.height ; height++){
        this.cell[width][height]=icolor[this.boardURL.charAt(height*this.width+width)];
      }
    }
    console.log(this.cell);
    console.log("board initialize is finished .")
  }


  p.fill_random = function(otirand){

    var index;
    var flag=true;
    for(var i = 0; i<otirand.length;i++){
      if(otirand[i])flag=false;
    }
    if(flag)return ;
    for(var width = 0; width < this.width ; width++){
      for(var height =this.height-1; height>=0 ; height--){
        if(this.cell[width][height] == 'vanished' ){
          do{
            index = Math.floor( Math.random()* 8);
          }while(!otirand[index]);
          this.cell[width][height] = icolor[index];
        }
      }
    }

  }


  p.falling = function(){
    var count =this.height-1;
    for(var width = 0; width < this.width ; width++){
      count =this.height-1;
      for(var height =this.height-1; height>=0 ; height--){
        if(this.cell[width][height] !== 'vanished' ){
          this.cell[width][count] =this.cell[width][height];
          if(count !== height){
            this.cell[width][height] = 'vanished';
          }
          count-=1;
        }
      }
    }
  }




  p.elace =function(isKepri,nKepri, result){

    //番兵を用意した配列を生成する関数を用意
    var _make_Array = function(wid,hei){
      var array = [];
      for(var width = 0; width < wid +2 ; width++){
        array[width] = new Array();
        for(var height =0; height < hei +2  ; height++){
          array[width][height] = 'vanished';
        }
      }
      return array;
    }

    // 配列の複製を生成
    function _copy_Array(src){
      var array =[];
      for(var i =0; i<src.length;i++){
        if(Array.isArray(src[i])){
          array[i] = _copy_Array(src[i]);
        }else{
          array[i] = src[i];
        }
      }
      return array;
    }

    // 配列の比較を行う
    function _comp_Array(a,b){
      var str_a = JSON.stringify(a);
      var str_b = JSON.stringify(b);
      return str_a === str_b
    }

    var state = _make_Array(this.width,this.height);
    var erace_state= _make_Array(this.width,this.height);
    var erace_copy;

    console.log(state);
    console.log(this.width);

    // 番兵を用意した配列に盤面を複製
    for(var width = 0; width < this.width ; width++){
      for(var height =0; height<this.height ; height++){
        state[width+1][height+1]=this.cell[width][height];
      }
    }

    //消えるドロップを取得
    for(var countW = 1; countW < this.width +1 ; countW++){
      for(var countH = 1; countH < this.height +1 ; countH++){
        //横につながって消えるドロップを探す
        if(state[countW][countH]==state[countW+1][countH] 
            && state[countW][countH]==state[countW-1][countH] 
            && state[countW][countH]!=='vanished'){
          erace_state[countW][countH]   = state[countW][countH];
          erace_state[countW+1][countH] = state[countW][countH];
          erace_state[countW-1][countH] = state[countW][countH];
        }
        //縦につながって消えるドロップを探す
        if(state[countW][countH]==state[countW][countH+1] 
            && state[countW][countH]==state[countW][countH-1] 
            && state[countW][countH]!=='vanished'){
          erace_state[countW][countH]    = state[countW][countH];
          erace_state[countW][countH +1] = state[countW][countH];
          erace_state[countW][countH -1] = state[countW][countH];
        }
      }
    }

    erace_copy = _copy_Array(erace_state);

    //一緒に消えるドロップを取得し処理を行う
    for(var countW = 1; countW < this.width +1 ; countW++){
      for(var countH = 1; countH < this.height +1 ; countH++){
        //ブロックスコープの代わり
        (function(hoge,countW,countH){
          if(erace_state[countW][countH]=='vanished')return 1;
          var tmp = _make_Array(hoge.width,hoge.height);
          var before ;
          var dirX = [1,-1,0,0];
          var dirY = [0,0,1,-1];
          tmp[countW][countH] = erace_state[countW][countH];

          // 一度にまとまって消えるドロップを選び出す。
          // todo 遅かったら後からもうちょっとましにする。
          do{
            before = _copy_Array(tmp);

            for(var countW = 1; countW < hoge.width +1 ; countW++){
              for(var countH = 1; countH < hoge.height +1 ; countH++){
                if(tmp[countW][countH]!=='vanished'){
                  for(var dir = 0; dir < 4; dir ++){
                    if(erace_state[countW+dirX[dir]][countH+dirY[dir]] 
                        == tmp[countW][countH]){
                      tmp[countW+dirX[dir]][countH+dirY[dir]] =tmp[countW][countH];
                    }
                  }
                }
              }
            }

          }while( !_comp_Array(before,tmp) );

          // erace_stateからtmpのドロップを消す
          for(var countW = 1; countW < hoge.width +1 ; countW++){
            for(var countH = 1; countH < hoge.height +1 ; countH++){
              if(tmp[countW][countH]!=='vanished'){
                erace_state[countW][countH] = 'vanished';
              }
            }
          }

          //tmpから情報を取得する
          //ドロップの数を数える。
          //列消しがあるかどうか
          //十字消しがあるかどうか
          var count = 0;
          var color;
          var isPlus = false;
          var isLine = false;
          var isBufLine = true;
          for(var countH = 1; countH < hoge.height +1 ; countH++){
            isBufLine =true;
            for(var countW = 1; countW < hoge.width +1 ; countW++){
              if(tmp[countW][countH]!=='vanished'){
                count++;
                color = tmp[countW][countH];
                if( tmp[countW][countH] == tmp[countW+1][countH] 
                    &&tmp[countW][countH] == tmp[countW-1][countH] 
                    &&tmp[countW][countH] == tmp[countW][countH+1] 
                    &&tmp[countW][countH] == tmp[countW+1][countH-1] 
                  ){
                  isPlus = true;
                }
              }else{
                isBufLine = false;
              }
            }
            if(isBufLine) isLine =true;
          }
          if(count !== 5) isPlus = false; 
          console.log(count);
          if(isKepri&&count<=nKepri){
            // erace_stateからtmpのドロップを消す
            for(var countW = 1; countW < hoge.width +1 ; countW++){
              for(var countH = 1; countH < hoge.height +1 ; countH++){
                if(tmp[countW][countH]!=='vanished'){
                  erace_copy[countW][countH] = 'vanished';
                }
              }
            }
          }else{
            // 結果をresultに記録
            hoge.result.combo +=1;
            hoge.result.dell[color].push(count);
            if(isLine) hoge.result.line[color] += 1;
            if(isPlus) hoge.result.plus[color] += 1;
          }

        })(this,countW,countH);
      }
    }

    //boardからコンボで消えたドロップを消去
    for(var width = 0; width < this.width ; width++){
      for(var height =0; height<this.height ; height++){
        if(erace_copy[width+1][height+1]!== 'vanished'){
          this.cell[width][height] = 'vanished';
        }
      }
    }
    return  0;
  }



