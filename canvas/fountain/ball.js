function Ball(props){
	this.canW=props.canW;
	this.canH=props.canH;
	this.pos={
		x:this.canW/2,
		y:this.canH
	};
	this.reset();
	this.vx=props.vx || this.randomFloat(-10,10);
	this.ax=0;
	this.ay=props.ay || 0.9;
	this.r=ifPhone ? 2 : 3;
}
Ball.prototype={
	constructor:Ball,
	moveX:function(){
		this.vx+=this.ax;
		this.x+=this.vx;
	},
	moveY:function(){
		this.vy+=this.ay;
		this.y+=this.vy;
		if(this.y>this.canH){
			this.reset();
		}
	},
	move:function(){
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
	reset:function(){
		this.x=this.randomFloat(this.pos.x-10,this.pos.x+10);
		this.y=this.pos.y;
		this.vy=this.randomFloat(-30,-10);
		this.color=this.randomColor();
	},
	random:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	},
	randomFloat:function(min,max){
		return Math.random()*(max-min)+min;
	},
	randomColor:function(){
		var color1=this.random(100,255);
		var color2=this.random(100,255);
		var color3=this.random(100,255);
		return "rgb("+color1+","+color2+","+color3+")";
	}
}