function Ball(centerX,centerY){
	this.r=2;
	this.color="white";
	this.v=5;
	this.ay=0.1;
	this.maxDist=90000;
	this.reset(centerX,centerY);
}
Ball.prototype={
	constructor:Ball,
	reset:function(centerX,centerY){
		this.count=0;
		this.x=centerX;
		this.y=centerY;
		this.vx=this.randomFloat(0,5);
		this.vx=Math.random()>0.5 ? this.vx : -this.vx;
		this.vy=Math.sqrt(this.v*this.v-this.vx*this.vx);
		this.vy=Math.random()>0.5 ? this.vy : -this.vy;
	},
	moveX:function(){
		this.x+=this.vx;
	},
	moveY:function(){
		this.vy+=this.ay;
		this.y+=this.vy;
	},
	move:function(){
		this.count++;
		this.moveX();
		this.moveY();
	},
	draw:function(ctx){
		ctx.beginPath();
		ctx.fillStyle=this.color;
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
	},
	randomFloat:function(min,max){
		return Math.random()*(max-min)+min;
	}
}
