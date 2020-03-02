function Ball(params){
	this.canH=params.crash.h;
	this.canW=params.crash.w;
	this.fl=params.crash.fl;
	this.vpX=params.crash.vpX;
	this.vpY=params.crash.vpY;
	this.reset();
}
Ball.prototype={
	constructor:Ball,
	move:function(){
		this.x+=this.vx;
		this.y+=this.vy;
		this.z+=this.vz;
		if(this.z<0){
			this.reset();
		}
	},
	reset:function(){
		this.x=this.randomFloat(-this.vpX,this.vpX);
		this.y=this.randomFloat(-this.vpY,this.vpY);
		this.z=this.randomFloat(5800,6000);
		this.vx=this.randomFloat(-10,10);
		this.vy=this.randomFloat(-10,10);
		this.vz=-this.randomFloat(50,60);
		this.r=this.randomInt(10,50);
		this.color=this.randomColor();
	},
	draw:function(ctx){
		var scale=this.fl/(this.fl+this.z);
		var scaleX=scale;
		var scaleY=scale;
		var posX=this.x*scaleX+this.vpX;
		var posY=this.y*scaleY+this.vpY;
		var r=this.r*scale;
		ctx.beginPath();
		ctx.fillStyle=this.color;
		ctx.arc(posX,posY,r,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
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

function Sun(params){
	this.x=params.canW/2;
	this.y=params.canH/2;
	this.r=100;
	this.m=10000;
}
Sun.prototype={
	constructor:Sun,
	draw:function(ctx){
		ctx.beginPath();
		ctx.fillStyle="yellow";
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.fill();		
		ctx.closePath();
	}
}

function Crash(){
	this.init();
	this.ifEnd=false;
	this.count=0;
	this.update();
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
		
		this.balls=[];
		for(var i=0; i<100; i++){
			setTimeout(function(){
				this.balls.push(new Ball({
					crash:this
				}));
			}.bind(this),50*i)
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
	}
}

new Crash();