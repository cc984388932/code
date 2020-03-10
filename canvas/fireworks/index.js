Array.prototype.remove=function(index){
	this.splice(index,1);
	return this;
}

function Particle(){
	this.init();
}
Particle.prototype={
	constructor:Particle,
	init:function(){
		this.can=document.querySelector("#canvas");
		this.ctx=this.can.getContext("2d");
		var clientBount=this.can.getBoundingClientRect();
		this.w=this.can.width=clientBount.width;
		this.h=this.can.height=clientBount.height;
		this.centerX=300;   //小球中心
		this.centerY=300;
		this.balls=[];   //存放所有的粒子
		//生成100个小球
		for(var i=0; i<300; i++){
			setTimeout(function(){
				var ball=new Ball(this.centerX,this.centerY);
				this.balls.push(ball);
			}.bind(this),100+i*10);
		}
			
		this.count=0;
		this.update();
		this.bindEvent();
	},
	update:function(){
		var _this=this;
		this.count++;
		//this.ctx.clearRect(0,0,this.w,this.h);
		this.ctx.fillStyle="rgba(0,0,0,0.3)";
		this.ctx.fillRect(0,0,this.w,this.h);
		this.draw();
		requestAnimationFrame(function(){
			_this.update();
		})
		
	},
	draw:function(){
		for(var i=0; i<this.balls.length; i++){
			if(this.balls[i].count>160){
				this.balls[i].reset(this.centerX,this.centerY);
			}
			this.balls[i].move();
			this.balls[i].draw(this.ctx);
		}
	},
	bindEvent:function(){
		var _this=this;
		window.onmousemove=function(e){
			_this.centerX=e.clientX;
			_this.centerY=e.clientY;
		}
	}
}

new Particle();