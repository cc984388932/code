function Ball(params){
	this.canW=params.canW;
	this.canH=params.canH;
	this.r=params.r || this.randomInt(15,40);
	this.density=0.1;
	this.m=this.r*this.density;
	this.x=params.x || this.randomInt(this.r,this.canW-this.r);
	this.y=params.y || this.randomInt(this.r,this.canH-this.r);
	this.vx=params.vx || this.randomFloat(-12,12);
	this.vy=params.vy || this.randomFloat(-12,12);
	this.color=this.randomColor();
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
	randomColor:function(){
		var color1=this.randomInt(0,255);
		var color2=this.randomInt(0,255);
		var color3=this.randomInt(0,255);
		return "rgb("+color1+","+color2+","+color3+")"
	},
	randomInt:function(min,max){
		return Math.floor((max-min+1)*Math.random())+min;
	},
	randomFloat:function(min,max){
		return Math.random()*(max-min)+min;
	}
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
		for(var i=0; i<10; i++){
			this.balls.push(new Ball({
				canW:this.w,
				canH:this.h,
			}))
		}
			
			
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
					//将坐标轴进行旋转
					var angle=Math.atan(dy/dx);
					var sin=Math.sin(angle);
					var cos=Math.cos(angle);
					var rotateVi=this.rotate(balls[i].vx,balls[i].vy,sin,cos,true);
					var rotateVj=this.rotate(balls[j].vx,balls[j].vy,sin,cos,true);
					var rotatej=this.rotate(dx,dy,sin,cos,true);
					//碰撞处理
					var result=this.dongliang(balls[i].m,rotateVi.x,balls[j].m,rotateVj.x);
					rotateVi.x=result.v1Final;
					rotateVj.x=result.v2Final;
					//移开重叠的位置
					rotatej.x=balls[i].x>balls[j].x ? -(balls[i].r+balls[j].r) : (balls[i].r+balls[j].r);
					//旋转回来
					var rotateVi2=this.rotate(rotateVi.x,rotateVi.y,sin,cos,false);
					var rotateVj2=this.rotate(rotateVj.x,rotateVj.y,sin,cos,false);
					var rotatej2=this.rotate(rotatej.x,rotatej.y,sin,cos,false);
					balls[j].x=rotatej2.x+balls[i].x;
					balls[j].y=rotatej2.y+balls[i].y;
					balls[i].vx=rotateVi2.x;
					balls[i].vy=rotateVi2.y;
					balls[j].vx=rotateVj2.x;
					balls[j].vy=rotateVj2.y;
				}
			}
		}
		for(var i=0; i<balls.length; i++){
			balls[i].draw(this.ctx);
		}
	},
	rotate:function(x,y,sin,cos,reverse){
		//reverse --> true:逆时针
		return {
			x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
			y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin),
		};
	},
	dongliang:function(m1,v1,m2,v2){
		var v1Final=(v1*(m1-m2)+2*m2*v2)/(m1+m2);
		var v2Final=(v2*(m2-m1)+2*m1*v1)/(m1+m2);
		return {
			v1Final:v1Final,
			v2Final:v2Final,
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