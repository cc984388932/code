function Aqu(params){
	this.canH=params.canH;
	this.startX=params.startX;
	this.startY=this.canH;
	this.lineWidth=10; 
	this.lineHeight=params.lineHeight;
	
	this.controlX=this.startX;   //贝塞尔曲线的控制点
	this.controlY=this.startY-this.lineHeight*this.randomFloat(0.2,0.7);  //贝塞尔曲线的控制点
	this.endCenterX=this.startX;
	this.endX=this.startX;
	this.endY=this.startY-this.lineHeight;
	this.color="rgba(255,255,255,0.5)";
	
	this.range=80;   //振幅
	this.beta=2;   //角度增幅
}
Aqu.prototype={
	constructor:Aqu,
	move:function(count){
		var angle=count*Math.PI/180*this.beta;
		this.endX=this.endCenterX+Math.sin(angle)*this.range;
	},
	draw:function(ctx){
		ctx.beginPath();
		ctx.strokeStyle=this.color;
		ctx.lineCap="round";
		ctx.lineWidth=this.lineWidth;
		ctx.moveTo(this.startX,this.startY);
		ctx.quadraticCurveTo(this.controlX,this.controlY,this.endX,this.endY);
		ctx.stroke();
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
}
Crash.prototype={
	constructor:Crash,
	init:function(){
		this.canvas=document.querySelector("#canvas");
		this.ctx=this.canvas.getContext("2d");
		var BoundingClientRect=this.canvas.getBoundingClientRect();
		this.w=this.canvas.width=BoundingClientRect.width;
		this.h=this.canvas.height=BoundingClientRect.height;
		
		this.aqus=[];
		for(var i=0; i<100; i++){
			this.aqus.push(new Aqu({
				canW:this.w,
				canH:this.h,
				startX:this.randomInt(0,this.w),
				lineHeight:500*this.randomFloat(0.4,1)
			}))
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
		for(var i=0; i<this.aqus.length; i++){
			this.aqus[i].move(this.count);
			this.aqus[i].draw(this.ctx);
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