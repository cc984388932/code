function Ball(params){
	this.canH=params.canH;
	this.x=300;
	this.y=200;
	this.vx=this.randomFloat(-10,10);
	this.vy=0;
	this.ax=0;
	this.ay=0;
	this.r=20;
	this.color=params.color || "green";
	this.easing=this.randomFloat(0.001,0.007);
	this.friction=0.97;
}
Ball.prototype={
	constructor:Ball,
	move:function(targetX,targetY){
		var distX=targetX-this.x;
		var distY=targetY-this.y;
		
		this.ax=distX*this.easing;
		this.ay=distY*this.easing;
		if(Math.abs(this.ax)<0.01&&Math.abs(this.vx)<0.01&&Math.abs(this.ay)<0.01&&Math.abs(this.vy)<0.01){
			this.x=targetX;
			this.y=targetY;
			return;
		}
		this.vx+=this.ax;
		this.vy+=this.ay;
		this.vx*=this.friction;
		this.vy*=this.friction;
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
		
		this.balls=[];
		var colors=["orange","green",'red'];
		for(var i=0; i<3; i++){
			this.balls.push(new Ball({
				canH:this.h,
				color:colors[i]
			}));
		}
			
		this.result={
			x:this.w/2,
			y:this.h/2
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
		for(var i=0; i<this.balls.length; i++){
			this.balls[i].move(this.result.x,this.result.y+70*(i+1));
		}
		
		for(var i=0; i<this.balls.length-1; i++){
			for(var j=i+1; j<this.balls.length; j++){
				var distX=balls[j].x-balls[i].x;
				var distY=balls[j].y-balls[i].y;
				var dist=Math.sqrt(distX**2+distY**2);
				var angle=Math.atan(distY/distX);
				if(dist<(balls[i].r+balls[j].r)){
					var sin=Math.sin(angle);
					var cos=Math.cos(angle);
					//旋转坐标系
					var rotatej=this.rotate(distX,distY,sin,cos,true);
					var rotateVi=this.rotate(balls[i].vx,balls[i].vy,sin,cos,true);
					var rotateVj=this.rotate(balls[j].vx,balls[j].vy,sin,cos,true);
					//碰撞处理
					var midVx=rotateVi.x;
					rotateVi.x=rotateVj.x;
					rotateVj.x=midVx;
					
					rotatej.x=rotatej.x>0 ? balls[i].r+balls[j].r : -(balls[i].r+balls[j].r);
					//旋转回来
					var rotateVi2=this.rotate(rotateVi.x,rotateVi.y,sin,cos,false);
					var rotateVj2=this.rotate(rotateVj.x,rotateVj.y,sin,cos,false);
					var rotatej2=this.rotate(rotatej.x,rotatej.y,sin,cos,false);
					balls[i].vx=rotateVi2.x;
					balls[i].vy=rotateVi2.y;
					balls[j].vx=rotateVj2.x;
					balls[j].vy=rotateVj2.y;
					balls[j].x=rotatej2.x+balls[i].x;
					balls[j].y=rotatej2.y+balls[i].y;
				}
			}
		}
		this.drawLine(this.ctx);
		for(var i=0; i<this.balls.length; i++){
			this.balls[i].draw(this.ctx);
		}
	},
	drawLine:function(ctx){
		ctx.strokeStyle="white";
		for(var i=0; i<this.balls.length; i++){
			ctx.beginPath();
			ctx.moveTo(this.result.x,this.result.y);
			ctx.lineTo(this.balls[i].x,this.balls[i].y);
			ctx.stroke();
			ctx.closePath();
		}
	},
	rotate:function(x,y,sin,cos,reverse){
		//reverse --> true:逆时针
		return {
			x : reverse ? x*cos+y*sin : x*cos-y*sin,
			y : reverse ? y*cos-x*sin : y*cos+x*sin
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
		document.onmousemove=function(event){
			_this.result.x=event.clientX;
			_this.result.y=event.clientY;
		}
	}
}

new Crash();