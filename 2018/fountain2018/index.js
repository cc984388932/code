;(function(){
	var userAgentInfo=navigator.userAgent;
	var Agents =new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"); 
	var ifPhone=false; 
	for(var v=0;v<Agents.length;v++) { 
			if(userAgentInfo.indexOf(Agents[v])!=-1) { 
			ifPhone=true; 
			break; 
		} 
	}
	window.ifPhone=ifPhone;
})();


function Fountain(){
	this.init();
	this.update();
	this.setBesicPos();
}
Fountain.prototype={
	constructor:Fountain,
	init:function(){
		this.canvas=document.querySelector("#canvas");
		this.ctx=canvas.getContext("2d");
		var clientRect=canvas.getBoundingClientRect();
		this.w=canvas.width=clientRect.width;
		this.h=canvas.height=clientRect.height;
		this.balls=[];
		var ballCount=ifPhone ? 150 : 200;
		for(var i=0; i<ballCount; i++){
			setTimeout(function(){
				this.balls.push(new Ball({
					canW:this.w,
					canH:this.h,
					count:ballCount
				}));
			}.bind(this),i*10);
				
		}
	},
	update:function(){
		var _this=this;
		this.ctx.clearRect(0,0,this.w,this.h);
		this.draw();
		requestAnimationFrame(function(){
			_this.update();
		})
		
	},
	draw:function(){
		for(var i=0; i<this.balls.length; i++){
			this.balls[i].move();
			this.balls[i].draw(this.ctx);
		}
	},
	setBesicPos:function(){
		var _this=this;
		this.canvas.onmousemove=function(e){
			for(var i=0; i<_this.balls.length; i++){
				_this.balls[i].pos.x=e.clientX;
				_this.balls[i].pos.y=e.clientY;
			}
		}
	}
}


new Fountain();
