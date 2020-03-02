function Ball(params){
	this.canH=params.canH;
	this.canW=params.canW;
	this.x=params.x;
	this.y=this.canH/2;
	this.vx=0;
	this.vy=params.vy;
	this.ax=0;
	this.ay=0;
	this.r=params.r;
	this.m=params.m;   //质量
	this.color=params.color || "green";
}
Ball.prototype={
	constructor:Ball,
	move:function(){
		this.vx+=this.ax;
		this.vy+=this.ay;
		this.x+=this.vx;
		this.y+=this.vy;
	},
	draw:function(ctx){
		ctx.beginPath();
		ctx.fillStyle=this.color;
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
		ctx.fill();
		ctx.closePath();
	},
	randomFloat:function(min,max){
		return Math.random()*(max-min)+min;
	},
	randomInt:function(min,max){
		return Math.floor((max-min+1)*Math.random())+min;
	},
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
		
		this.sun=new Sun({
			canH:this.h,
			canW:this.w,
		})
		this.balls=[];
		for(var i=0; i<1; i++){
			this.balls.push(new Ball({
				canH:this.h,
				canW:this.w,
				color:"#00ffff",
				x:this.w/2-400,
				r:10,
				m:1,
				vy:5
			}));
			this.balls.push(new Ball({
				canH:this.h,
				canW:this.w,
				color:"green",
				x:this.w/2-300,
				r:10,
				m:1,
				vy:5
			}));
			this.balls.push(new Ball({
				canH:this.h,
				canW:this.w,
				color:"red",
				x:this.w/2-200,
				r:10,
				m:1,
				vy:7
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
		var sun=this.sun;
		for(var i=0; i<balls.length; i++){
			var distX=sun.x-balls[i].x;
			var distY=sun.y-balls[i].y;
			var dist=Math.sqrt(distX**2+distY**2);
			var sin=Math.abs(distY)/dist;
			var cos=Math.abs(distX)/dist;
			var a=sun.m/(dist**2);
			balls[i].ax=distX>=0 ? a*cos : -a*cos;
			balls[i].ay=distY>=0 ? a*sin : -a*sin;			
		}
		
		for(var i=0; i<balls.length; i++){
			balls[i].move();
			balls[i].draw(this.ctx);
		}
		this.sun.draw(this.ctx);
	},
	randomInt:function(min,max){
		return Math.floor((max-min+1)*Math.random())+min;
	},
	randomFloat:function(min,max){
		return Math.random()*(max-min)+min;
	}
}

new Crash();