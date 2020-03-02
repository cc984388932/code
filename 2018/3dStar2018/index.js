function Ball(params){
	this.canH=params.crash.h;
	this.canW=params.crash.w;
	this.fl=params.crash.fl;
	this.vpX=params.crash.vpX;
	this.vpY=params.crash.vpY;
	this.bounce=0.6;
	this.r=20;
	this.ax=0;
	this.ay=0;
	this.az=0;
	this.vx=0;
	this.vy=-10;
	this.vz=0;
	this.x=this.randomInt(-this.vpX,this.vpX);
	this.y=this.randomInt(-this.vpY,this.vpY);
	this.z=this.randomInt(0,1000);
	this.easing=0.05;
}
Ball.prototype={
	constructor:Ball,
	move:function(){
		this.x+=this.vx;
		this.y+=this.vy;
		this.z+=this.vz;
		if(this.y<=-this.vpY){
			this.y=this.vpY
		}
	},
	draw:function(ctx){
		if(this.z<=-this.fl){
			return;
		}
		var scale=this.fl/(this.fl+this.z);
		var scaleX=scale;
		var scaleY=scale;
		ctx.save();
		ctx.translate(this.vpX,this.vpY);
		ctx.scale(scaleX,scaleY);
		ctx.beginPath();
		var color=ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.r);
		color.addColorStop(0,"rgba(255,255,255,1)");
		color.addColorStop(0.2,"rgba(0,255,255,1)");
		color.addColorStop(0.3,"rgba(0,0,100,1)");
		color.addColorStop(1,"rgba(0,0,0,0.1)");
		ctx.fillStyle=color;
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	},
	randomFloat:function(min,max){
		return Math.random()*(max-min)+min;
	},
	randomInt:function(min,max){
		return Math.floor((max-min+1)*Math.random())+min;
	},
	randomColor:function(){
		return "rgb("+this.randomInt(0,255)+","+this.randomInt(0,255)+","+this.randomInt(0,255)+")";
	}
}

function Crash(){
	this.init();
	this.ifEnd=false;
	this.count=0;
	this.update();
	this.bindEvent();
}
Crash.prototype={
	constructor:Crash,
	init:function(){
		this.canvas=document.querySelector("#canvas");
		this.ctx=this.canvas.getContext("2d");
		var BoundingClientRect=this.canvas.getBoundingClientRect();
		this.w=this.canvas.width=BoundingClientRect.width;
		this.h=this.canvas.height=BoundingClientRect.height;
		this.fl=250;
		this.vpX=this.w/2;
		this.vpY=this.h/2;
		this.gravity=0.2;   //重力
		this.balls=[];
		
		for(var i=0; i<50; i++){
			this.balls.push(new Ball({
				crash:this,
			}));
		}
	},
	update:function(){
		var _this=this;
		this.ctx.clearRect(0,0,this.w,this.h);
		this.count++;
		this.draw();
		if(this.ifEnd){
			return;
		}
		requestAnimationFrame(function(){
			_this.update();
		})
	},
	draw:function(){
		var balls=this.balls;
		for(var i=0; i<balls.length; i++){
			balls[i].move();
			balls[i].draw(this.ctx);
		}
	},
	randomInt:function(min,max){
		return Math.floor((max-min+1)*Math.random())+min;
	},
	randomFloat:function(min,max){
		return Math.random()*(max-min)+min;
	},
	bindEvent:function(){
		var _this=this;
		var vx=20;
		var vy=0;
		var vz=20
		document.onkeydown=function(event){
			if(event.keyCode==16){   //前
				for(var i=0; i<_this.balls.length; i++){
					_this.balls[i].z-=10;
				}
			}
			if(event.keyCode==17){   //后
				for(var i=0; i<_this.balls.length; i++){
					_this.balls[i].z+=10;
				}
			}
			if(event.keyCode==37){   //左
				for(var i=0; i<_this.balls.length; i++){
					_this.balls[i].x-=10;
				}
			}
			if(event.keyCode==38){   //上
				return;
				for(var i=0; i<_this.balls.length; i++){
					_this.balls[i].y-=10;
				}
			}
			if(event.keyCode==39){   //右
				for(var i=0; i<_this.balls.length; i++){
					_this.balls[i].x+=10;
				}
			}
			if(event.keyCode==40){   //下
				return;
				for(var i=0; i<_this.balls.length; i++){
					_this.balls[i].y+=10;
				}
			}
		}
	},
}

new Crash();