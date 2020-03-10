function Ball(params){
	this.canW=params.canW;
	this.canH=params.canH;
	this.r=params.r;
	this.density=0.1;
	this.m=this.r*this.density;
	this.x=params.x || this.randomInt(this.r,this.canW-this.r);
	this.y=200;
	this.vx=params.vx;
	this.vy=0;
	this.color=params.color;
}
Ball.prototype={
	constructor:Ball,
	move:function(){
		this.x+=this.vx;
		this.y+=this.vy;
		if(this.x<=this.r){
			this.vx=-this.vx;
			this.x=this.r;
		}
		else if(this.x>=this.canW-this.r){
			this.vx=-this.vx;
			this.x=this.canW-this.r;
		}
		if(this.y<=this.r){
			this.vy=-this.vy;
			this.y=this.r;
		}
		else if(this.y>=this.canH-this.r){
			this.vy=-this.vy;
			this.y=this.canH-this.r;
		}
	},
	draw:function(ctx){
		ctx.beginPath();
		ctx.fillStyle=this.color;
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
	},
}

function Crash(){
	this.init();
	this.ifEnd=false;
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
		
		this.balls=[];
		this.balls.push(new Ball({
			canW:this.w,
			canH:this.h,
			x:100,
			vx:14,
			r:20,
			color:"green"
		}))
		this.balls.push(new Ball({
			canW:this.w,
			canH:this.h,
			x:800,
			vx:-10,
			r:30,
			color:"white"
		}))
			
	},
	update:function(){
		var _this=this;
		this.ctx.clearRect(0,0,this.w,this.h);
		this.draw();
		if(this.ifEnd){
			return;
		}
		requestAnimationFrame(function(){
			_this.update();
		})
	},
	draw:function(){
		var ctx=this.ctx;
		var balls=this.balls;
		for(var i=0; i<balls.length; i++){
			balls[i].move();
		}
		for(var i=0; i<balls.length-1; i++){
			for(var j=i+1; j<balls.length; j++){
				var dx=balls[j].x-balls[i].x;
				var dy=balls[j].y-balls[i].y;
				if(Math.sqrt(dx**2+dy**2)<=(balls[i].r+balls[j].r)){
					var result=this.dongliang(balls[i].m,balls[i].vx,balls[j].m,balls[j].vx);
					balls[i].vx=result.v1Final;
					balls[j].vx=result.v2Final;
					balls[i].x+=balls[i].vx;
					balls[j].x+=balls[j].vx;
				}
			}
		}
		for(var i=0; i<balls.length; i++){
			balls[i].draw(this.ctx);
		}
	},
	dongliang:function(m1,v1,m2,v2){
		var v1Final=(v1*(m1-m2)+2*m2*v2)/(m1+m2);
		var v2Final=(v2*(m2-m1)+2*m1*v1)/(m1+m2);
		console.log(m1*(v1Final**2)+m2*(v2Final**2))
		return {
			v1Final:v1Final,
			v2Final:v2Final,
		}
	}
}

new Crash();