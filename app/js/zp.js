function game( option ){

    s('page').width = view().w;
    s('page').height = view().h;
    var _that = this;

    _that.mon = {
        mon1:function( option ){
            jc.start(option.canvas,true);
            var monster1=new Image();
            monster1.src="dist/images/monster1.png";
            monster1.onload=function(){
                jc.start(option.canvas);
                jc.image(monster1,-200,-200,109,114).id(option.id).level(2);}
        },
        mon2:function( option ){
            jc.start(option.canvas,true);
            var monster2=new Image();
            monster2.src="dist/images/monster2.png";
            monster2.onload=function(){
                jc.start(option.canvas);
                jc.image(monster2,-200,-200,109,113).id(option.id).level(2);}
        },
        mon3:function( option ){
            jc.start(option.canvas,true);
            var monster3=new Image();
            monster3.src="dist/images/monster3.png";
            monster3.onload=function(){
                jc.start(option.canvas);
                jc.image(monster3,-200,-200,107,129).id(option.id).level(2);}
        },
        mon4:function( option ){
            jc.start(option.canvas,true);
            var monster4=new Image();
            monster4.src="dist/images/monster4.png";
            monster4.onload=function(){
                jc.start(option.canvas);
                jc.image(monster4,-200,-200,125,110).id(option.id).level(2);}
        },
        m1:[180,138],
        m2:[146,84],
        m3:[103,94],
        m4:[92,107]
    };

    _that.time = [10];

    _that.monNum = [];
    var monNum=1;

    createmonNum();
    function createmonNum(){
        for(var i=0;i<monNum;i++){
            _that.monNum.push(monNum);
        };
        monNum ++;
        if(monNum<30){
            createmonNum();
        };
    };

    _that.score = 0;
    _that.w = view().w-50;
    _that.h = view().h -50;
    _that.monomer = {};
    _that.position = {};
    _that.num = 0;

    _that.minW = 50;
    _that.minH = 50;
    _that.maxW = _that.w - 120;
    _that.maxH = _that.h - 150;
    _that.speed = 18;//所有鬼子变化间隔时间(毫秒);
    _that.roundT = 20000;//鬼子公转一圈所用时间

    function monomer( option ){
        var _this = this;
        _this.obj = option.obj;
        _this.jdC = 200;
        _this.jd = option.jd || -2;
        _this.r = option.r || 200;
        _this.clockwise = option.clockwise?false:true;

        _this.variable = (_that.w + _that.h)*2/(_that.roundT/_that.speed);

        /*_this.timeC = setInterval(function(){
         _this.run();
         },_that.speed);*/

        _this.timeC = true;

        var firstPositionArea = getNum({num:1,min:0,max:3});

        switch(firstPositionArea[0]){
            case 0: _this.firstPositionX = getNum({num:1,min:_that.minW,max:_that.maxW})[0]; _this.firstPositionY = _that.minH; _this.jdC = 100;
                break;
            case 1: _this.firstPositionY = getNum({num:1,min:_that.minH,max:_that.maxH})[0]; _this.firstPositionX = _that.minW; _this.jdC = -330;
                break;
            case 2: _this.firstPositionX = getNum({num:1,min:_that.minW,max:_that.maxW})[0]; _this.firstPositionY = _that.maxH; _this.jdC = -100;
                break;
            case 3: _this.firstPositionY = getNum({num:1,min:_that.minH,max:_that.maxH})[0]; _this.firstPositionX = _that.maxW; _this.jdC = 200;
                break;
        };

    };

    monomer.prototype.run = function(){
        var _this = this;
        if(_this.clockwise){


            if(_this.firstPositionX > _that.minW && _this.firstPositionY == _that.minH){
                _this.firstPositionX = _this.firstPositionX - _this.variable;
                if(_this.firstPositionX < _that.minW){_this.firstPositionX = _that.minW;};

            }else if( _this.firstPositionX >= _that.minW && _this.firstPositionY == _that.maxH && _this.firstPositionX < _that.maxW){
                _this.firstPositionX = _this.firstPositionX + _this.variable;
                if(_this.firstPositionX > _that.maxW){_this.firstPositionX = _that.maxW};

            }else if( _this.firstPositionX == _that.minW && _this.firstPositionY >= _that.minH && _this.firstPositionY < _that.maxH ){
                _this.firstPositionY = _this.firstPositionY + _this.variable;
                if(_this.firstPositionY > _that.maxH){_this.firstPositionY = _that.maxH};

            }else if( _this.firstPositionX == _that.maxW && _this.firstPositionY > _that.minH ){
                _this.firstPositionY = _this.firstPositionY - _this.variable;
                if(_this.firstPositionY < _that.minH){_this.firstPositionY = _that.minH};

            };
        }else{
            if(_this.firstPositionX < _that.maxW && _this.firstPositionY == _that.minH){
                _this.firstPositionX = _this.firstPositionX + _this.variable;
                if(_this.firstPositionX > _that.maxW){_this.firstPositionX = _that.maxW;};

            }else if( _this.firstPositionX > _that.minW && _this.firstPositionY == _that.maxH && _this.firstPositionX <= _that.maxW){
                _this.firstPositionX = _this.firstPositionX - _this.variable;
                if(_this.firstPositionX < _that.minW){_this.firstPositionX = _that.minW};

            }else if( _this.firstPositionX == _that.minW && _this.firstPositionY > _that.minH && _this.firstPositionY <= _that.maxH ){
                _this.firstPositionY = _this.firstPositionY - _this.variable;
                if(_this.firstPositionY < _that.minH){_this.firstPositionY = _that.minH};

            }else if( _this.firstPositionX == _that.maxW && _this.firstPositionY < _that.maxH ){
                _this.firstPositionY = _this.firstPositionY + _this.variable;
                if(_this.firstPositionY > _that.maxH){_this.firstPositionY = _that.maxH};

            };
        };

        _this.jdC = _this.jdC - _this.jd;

        _this.x = _this.firstPositionX-_this.r*Math.cos(_this.jdC*Math.PI/180);
        _this.y = _this.firstPositionY-_this.r*Math.sin(_this.jdC*Math.PI/180);

        _that.position[_this.obj] = [];
        _that.position[_this.obj][0] = 	_this.x;
        _that.position[_this.obj][1] = 	_this.y;
       
        jc('#'+_this.obj).animate({x:_this.x,y:_this.y},1);

    };

    monomer.prototype.Stop = function( option ){

        if(option.next){
            _that.num ++;
            s('score').innerHTML = 'X' + Number(_that.num);
        };

        var _this = this;
        _this.timeC = false;

        var src = jc( '#'+_this.obj )._img.src.split('/');
        var mon = src[src.length-1];

        jc.start('page',true);
        var monster=new Image();
        monster.src='dist/images/monster1'+ mon.findNum()[0] + '.png';

        monster.onload=function(){
            jc.start('page');
            jc.image(monster,_that.position[option.a][0],_that.position[option.a][1],_that.mon['m' + mon.findNum()[0]][0],_that.mon['m' + mon.findNum()[0]][1]).id(_this.obj+'d').level(1);
            var i=1;

            _this.die = {};
            _this.die[_this.obj+'d'] = setInterval(function(){
                i++;
                jc('#'+_this.obj+'d' ).opacity(1-i/40);
                jc('#'+_this.obj+'d' ).scale((1+i/8000),(1+i/8000));
                if(1-i/40<0){
                    jc('#'+_this.obj+'d' ).del();
                    clearInterval(_this.die[_this.obj+'d']);
                }
            },60);

            jc('#'+_this.obj ).del();

            _that.monomer[option.a] = undefined;
            _that.position[option.a][0] = 0;
            _that.position[option.a][1] = 0;


            for( b in _that.monomer){
                if(_that.monomer[b]){
                    return false;
                };
            };

            clearTimeout(_that.timeC);
            clearInterval(_that.countdown);

            if(option.next){
                setTimeout(function(){
                    _that.score++;
                    jc.clear();
                    _that.next();
                },2000);
            };

        }
    };

    _that.next = function(){

        _that.position = {};
        _that.monomer = {};

        clearTimeout(_that.timeC);
        clearInterval(_that.countdown);
        clearInterval(_that.run);
        _that.runing(); 

        _that.timeC = setTimeout(function(){
            if(_that.num<=0){
                gameOver();
               
                alertWin( {text:'纳尼！你居然一个鬼子都按不死！你不爱国吗，给你一个机会，再来一次！',notshare:true} );
            }else{
                timeOver();
             
                alertWin( {text:'恭喜你消灭了'+ _that.num +'只鬼子！'} );
            }

            for( a in _that.monomer){

                try{
                    _that.monomer[a].Stop({a:a});
                }
                catch(err){
                    console.log(err.name,err.message);
                }
            };

            clearInterval(_that.countdown);
            document.ontouchstart = null;
        },(_that.time[0]+1)*1000);

        s('time').innerHTML = _that.time[0] + '秒';
        var time = 1;
        _that.countdown = setInterval(function(){
            s('time').innerHTML = _that.time[0]-time + '秒';
            time++;
        },1000);

        var i=0;

        create();
        function create(){
            var r = 200
            var clockwise = Math.round( Math.random());
            if(clockwise){
                var j = 3;
            }else{
                var j = -3;
            }

            setTimeout(function(){
                _that.mon["mon" + getNum({min:0,max:4,num:1})[0]]( {canvas:'page',id:"span"+i+_that.score} );
                _that.monomer["span"+i + _that.score] = new monomer({obj:"span"+i+_that.score,jd:j,r:r,clockwise:clockwise});
                i++;
                if(i<_that.monNum[_that.score]){
                    create();
                };
            },200);
        }
    };
};

game.prototype.runing = function(){
    var _that = this;

    _that.run = setInterval(function(){
        for( a in _that.monomer){
            if(_that.monomer[a] && _that.monomer[a].timeC){
                _that.monomer[a].run();
            };
        };
    },_that.speed);

};

game.prototype.int = function(){
    var _that = this;
    _that.score = 0;
    _that.w = view().w-50;
    _that.h = view().h -50;
    _that.monomer = {};
    _that.position = {};
    _that.num = 0;
    clearTimeout(_that.timeC);
    clearInterval(_that.countdown);
    s('score').innerHTML = 'X' + Number(_that.num);
    jc.clear();
    _that.next();
};

game.prototype.bindEvent = function(){

    var _this = this;
    document.ontouchstart = function( ev ){

        ev.preventDefault();

        var touchs = ev.changedTouches[0];
        var touchY = touchs.pageY;
        var touchX = touchs.pageX;

        for (a in _this.position){

            if( touchX >= _this.position[a][0]-50 && touchX <= (_this.position[a][0] + 150) && touchY >= _this.position[a][1]-50 && touchY <= (_this.position[a][1] + 150)){
                _this.monomer[a].Stop({a:a,next:true});
                gameHit();               
                return false;
            }
        }
        /* 打空了  */
        shake();
        lolCareful();
        function shake(){
            var div = document.createElement('div');
            div.className = 'bg';
            div.id = 'bg';
            document.body.appendChild(div);
            addClass(document.body, 'shake');
            stopPP(div);
            setTimeout(function(){
                removeClass(document.body, 'shake');
                remove( div );
            },1000);
        }
    };
};

game.prototype.begin = function(){
    var _that = this;
    var div = document.createElement('div');
    div.className = 'alert';
    div.innerHTML = '<em>\
	-<b>游戏规则</b>-<br/>\
	当小鬼子窜出来时，拿起你的手指，瞄准后按死“小鬼子”们！\
一定要按准哦……<br/>\
	</em><button>开始打鬼子</button>';
    div.id = 'begin';
    document.body.appendChild(div);
    div.getElementsByTagName('button')[0].ontouchstart = function( ev ){
        var ev = ev || event;
        ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
        _that.next();
        lolStart();        
        remove(div);
        _that.bindEvent();
    };
};

function alertWin( option ){
    if(option.text){
        var win = document.createElement('div');
        win.className = 'scrollBg';
        win.id = 'scrollBg';

        if(option.notshare){
            win.innerHTML = '<div class="alert"><span>'+ option.text +'</span><button>再来一次</button></div>';
        }else{
            win.innerHTML = '<div class="alert"><span>'+ option.text +'</span><a href="javascript:;">分享</a><button>再来一次</button></div>';
        }
       
        document.body.appendChild(win);
        win.getElementsByTagName('button')[0].ontouchstart = function( ev ){

            var ev = ev || event;
            ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
            remove(win);
            gamePage.int();
            gamePage.bindEvent();
            s('prompt')&&remove(s('prompt'));
            readyGo(); 
            
        };

        if(win.getElementsByTagName('a')[0]){win.getElementsByTagName('a')[0].ontouchstart = function( ev ){

            var ev = ev || event;
            ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
            showPrompt();
        };}
    };
};

function showPrompt( option ){
    s('scrollBg').style.opacity = 0;
    var div = document.createElement('div');
    div.className = 'prompt';
    div.innerHTML = '';
    div.id = 'prompt';
    document.body.appendChild(div);

    div.ontouchend = function(){
        s('scrollBg').style.opacity = 1;
        remove(div);
    };

};

function musicShow(){
    var au = s('music').getElementsByTagName('audio')[0];
    au.autoPlay;
    au.play();

    stopPP(s('music'));

    bind(s('music'),'touchstart',function(){
        if(au.paused){
            au.play();
            addClass(s('music'), 'music');
            removeClass(s('music'),'musicStop');
        }
        else{
            au.pause();
            removeClass(s('music'), 'music');
            addClass(s('music'),'musicStop');
        }
    });
}

function lolStart(){
    var au = s('lolStart').getElementsByTagName('audio')[0];
    au.autoplay;
    au.play();
    setTimeout(musicShow(),1000);
}

function lolCareful(){
    var au = s('lolCareful').getElementsByTagName('audio')[0];
    au.autoplay;
    if(au.play){                 
      au.currentTime = 0;
    }
    au.play();   
}

function gameHit(){
    var au = s('gameHit').getElementsByTagName('audio')[0];
    au.autoplay;
    if(au.play){                 
      au.currentTime = 0;
    }
    au.play();  
}

function timeOver(){
    var au = s('timeOver').getElementsByTagName('audio')[0];
    au.autoplay;    
    au.play();  
}

function gameOver(){
    var au = s('gameOver').getElementsByTagName('audio')[0];
    au.autoplay;    
    au.play();  
}

function readyGo(){
    var au = s('readyGo').getElementsByTagName('audio')[0];
    au.autoplay;    
    au.play();  
}

document.ontouchstart = function( ev ){
    ev.preventDefault();
}

function changePage(){

        var off = true;

        var section = document.getElementsByTagName('section');

        var now = getByClass(document, 'section', 'sectionIn')[0];
        var index = 0

        var downY = 0;
        bind(document, 'touchstart', function( ev ){
            ev.preventDefault();
            var touchs = ev.changedTouches[0];
            downY = touchs.pageY;
        });

        bind(document, 'touchend', function( ev ){
            var touchs = ev.changedTouches[0];
            if(downY - touchs.pageY > 40 && off && loadF){
                c( -1 );
            }else if(downY - touchs.pageY < -40 && off && loadF){
                c( +1 );
            }
        });

        function c( num ){

            if(index == 0 && num == 1 ){
                return false;
            }

            if(index == 3 && num == -1 ){
                window.location.href = 'game.html';
            };

            removeClass(section[index], 'sectionIn');
            addClass(section[index], 'sectionOut');
            off = false;
            setTimeout(function(){
                removeClass(section[index], 'sectionOut');
                addClass(section[index], 'sectionHid');
                removeClass(section[index - num], 'sectionHid');
                addClass(section[index - num], 'sectionIn');
                index = index - num;
                off = true;
            },600);
        };

        s('start').ontouchend = function(){
            window.location.href = 'game.html';
        };
    };
