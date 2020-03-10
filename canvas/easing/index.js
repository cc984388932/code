function Ball(params){
	this.canH=params.canH;
	this.x=30;
	this.y=200;
	this.vx=10;
	this.vy=0;
	this.r=20;
	this.color=params.color || "green";
	this.easing=0.05;
}
Ball.prototype={
	constructor:Ball,
	move:function(targetX,targetY){
		var distX=targetX-this.x;
		var distY=targetY-this.y;
		if(Math.sqrt(distX**2+distY**2)<=2){
			return;
		}
		this.vx=distX*this.easing;
		this.vy=distY*this.easing;
		this.vx>10 ? 10 : this.vx;
		this.vy>10 ? 10 : this.vy;
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
		
		this.ball=new Ball({
			canH:this.h,
			color:"orange"
		});
		this.target=new Ball({
			canH:this.h,
			color:"green"
		})
		this.result={
			x:100,
			y:200
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
		this.ball.move(this.target.x,this.target.y);
		this.target.move(this.result.x,this.result.y);
		this.drawLine(this.ctx);
		this.ball.draw(this.ctx);
		this.target.draw(this.ctx);
	},
	drawLine:function(ctx){
		ctx.beginPath();
		ctx.strokeStyle="white";
		ctx.moveTo(this.ball.x,this.ball.y);
		ctx.lineTo(this.target.x,this.target.y);
		ctx.lineTo(this.result.x,this.result.y);
		ctx.lineTo(this.ball.x,this.ball.y);
		ctx.stroke();
		ctx.closePath();
	},
	randomInt:function(min,max){
		return Math.floor((max-min+1)*Math.random())+min;
	},
	randomFloat:function(min,max){
		return Math.random()*(max-min)+min;
	},
	bindEvent:function(){
		var _this=this;
		document.onmousemove=function(event){
			_this.result.x=event.clientX;
			_this.result.y=event.clientY;
		}
	}
}

new Crash();