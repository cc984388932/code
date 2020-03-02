function Sprite(params){
	this.canH=params.canH;
	this.x=params.x;
	this.y=0;
	this.w=params.w;
	this.h=params.h;
	this.imgs=document.querySelectorAll(params.el+" img");
	this.endY=this.canH*this.imgs.length;
	this.ifBounce=false;   //判断是否在回弹阶段
	this.bounceDist=30;
}
Sprite.prototype={
	constructor:Sprite,
	reset:function(params){
		this.result=params.result*this.canH;   //最后要停在什么位置
		this.count=0;   //用来计算转了多少圈
		this.ifEnd=false;  //判断是否结束
		this.ifBounce=false;  //判断是否该处理结尾的反弹效果
		this.ay=this.randomFloat(0.3,0.5);
		this.vy=this.randomFloat(3,5);
		this.vyMax=this.randomFloat(25,38);
		this.backFunc=params.backFunc;
	},
	move:function(){
		if(this.ifEnd){
			return;
		}
		if(this.ifBounce){   //结尾的反弹效果
			this.y-=this.vy;
			var dist=this.y+this.result;
			if(dist>=this.bounceDist){
				this.vy=-this.vy;
				this.y=-this.result+this.bounceDist;
			}
			else if(dist<-this.bounceDist){
				this.y=-this.result;
				this.ifEnd=true;
				this.end();
			}
		}
		else{
			if(this.vy>=this.vyMax){
				this.ay=0;
			}
			this.vy+=this.ay;
			this.y-=this.vy;
			if(this.count>=6&&this.y<=-(this.result+this.bounceDist)){   //处理结尾反弹
				this.y=-(this.result+this.bounceDist);
				this.vy=-7;
				this.ifBounce=true;
			}
			if(this.y<=-this.endY){
				this.y=0;
				this.count++;
			}
		}
		
	},
	draw:function(ctx){
		ctx.beginPath();
		for(var i=0; i<this.imgs.length; i++){
			ctx.drawImage(this.imgs[i],this.x,this.y+this.canH*i,this.w,this.h);
		}
		ctx.drawImage(this.imgs[0],this.x,this.y+this.endY,this.w,this.h);	
		ctx.closePath();
	},
	end:function(){
		this.backFunc();
	},
	randomFloat:function(min,max){
		return (max-min)*Math.random()+min;
	}
}

function Laohuji(params){
	this.init(params);
}
Laohuji.prototype={
	constructor:Laohuji,
	init:function(params){
		this.canvas=document.querySelector(params.el+" canvas");
		this.ctx=this.canvas.getContext("2d");
		var BoundingClientRect=this.canvas.getBoundingClientRect();
		this.w=this.canvas.width=BoundingClientRect.width;
		this.h=this.canvas.height=BoundingClientRect.height;
		this.canvas.style.display="block";
		
		this.spriteLength=params.spriteLength;
		this.ifEnd=params.spriteLength;   //判断是否游戏是否结束
		
		this.sprites=[];   //用于存储运动的对象
		for(var i=0; i<this.spriteLength; i++){
			var sprite=new Sprite({
				canH:this.h,
				x:this.w/this.spriteLength*i,
				w:this.w/this.spriteLength,
				h:this.h,
				el:"#laohuji"
			});
			sprite.draw(this.ctx);
			this.sprites.push(sprite);
		}
		
	},
	update:function(){
		if(this.ifEnd>=this.spriteLength){
			this.backFunc();
			return;
		}
		var _this=this;
		this.ctx.clearRect(0,0,this.w,this.h);
		this.draw();
		requestAnimationFrame(function(){
			_this.update();
		})
	},
	draw:function(){
		for(var i=0; i<this.sprites.length; i++){
			this.sprites[i].move();
			this.sprites[i].draw(this.ctx);
		}
	},
	start:function(params){
		//如果游戏正在进行，那么就点击无效
		if(this.ifEnd!=this.spriteLength){
			return;
		}
		//参数验证
		if(!params.result || params.result.length!=this.spriteLength){
			alert("result为必传参数，并且必须是一个长度为"+this.spriteLength+"的数组");
			return;
		}
		for(var i=0; i<params.result.length; i++){
			if(params.result[i]>=params.result.length){
				alert("传入的result数组的长度应该是"+this.spriteLength+"，而且每项都不能数组长度-1");
				return;
			}
		}
		var _this=this;
		this.ifEnd=0;
		this.backFunc=params.backFunc ? params.backFunc : function(){};
		for(var i=0; i<this.sprites.length; i++){
			this.sprites[i].reset({
				result:params.result[i],
				backFunc:function(){
					_this.ifEnd++;
				}
			});
		}
		this.update();
	}
}

var laohuji=new Laohuji({
	el:"#laohuji",
	spriteLength:3
});

document.querySelector("#a").onclick=function(){
	laohuji.start({
		result:[1,2,0],
		backFunc:function(){
			console.log("游戏终于结束了");
		}
	});
}
