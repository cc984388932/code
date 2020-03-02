function DrawCanvas(){
	this.init();
	this.carryFunc=null;
	this.changeDrawWay();
}
DrawCanvas.prototype={
	constructor:DrawCanvas,
	init:function(){
		var clientRect=$("#cav")[0].getBoundingClientRect();
		this.w=$("#cav")[0].width=clientRect.width;
		this.h=$("#cav")[0].height=clientRect.height;
		this.halfH=this.h/2;
		this.ctx=$("#cav")[0].getContext("2d");
	},
	changeDrawWay:function(){
		var ctx=this.ctx;
		var _this=this;
		$("#shape").change(function(){
			ctx.restore();
			var value=$(this).val();
			if(value=="0"){    //柱状图
				ctx.save();
				ctx.strokeStyle="white";
				ctx.fillStyle="white";
				ctx.rotate(Math.PI);
				ctx.translate(-_this.w,-_this.h);
				_this.carryFunc=_this.renderRectWave;
			}
			else if(value=="1"){  //线性波形图
				ctx.strokeStyle="white";
				_this.carryFunc=_this.renderLineWave;
			}
			else{  //填充波形图
				ctx.strokeStyle="white";
				ctx.fillStyle="white";
				_this.carryFunc=_this.renderFillLineWave;
			}
		})
		
		$("#shape").change();
	},
	renderRectWave:function(output){    //柱形图
		var ctx=this.ctx;
		ctx.clearRect(0, 0, this.w, this.h);
		ctx.beginPath();
		for(var i = 0; i < output.length; i++){
			if(i%30==0){
				var drawH=this.h*output[i]+this.halfH;
				drawH=drawH>0 ? drawH : 1; 
				ctx.rect(i,0,8,drawH);
			}
		}
		ctx.fill();
	},
	renderLineWave:function(output){   //线性波形图
		var ctx=this.ctx;
		ctx.clearRect(0, 0, this.w, this.h);
		ctx.beginPath();
		ctx.moveTo(0,this.halfH);
		for(var i = 0; i < output.length; i++){
			ctx.lineTo(i,this.halfH*output[i]+this.halfH);
		}
		ctx.stroke();
		ctx.closePath();
	},
	renderFillLineWave:function(output){   //条形波形图
		var ctx=this.ctx;
		ctx.clearRect(0, 0, this.w, this.h);
		ctx.beginPath();
		ctx.moveTo(0,this.h);
		for(var i = 0; i < output.length; i++){
			var drawH=this.halfH*output[i]+this.halfH;
			ctx.lineTo(i,drawH);
		}
		ctx.lineTo(output.length,this.h);
		ctx.fill();
		ctx.closePath();
	},
	randomColor:function(){
		var color1=Math.floor(Math.random()*255);
		var color2=Math.floor(Math.random()*255);
		var color3=Math.floor(Math.random()*255);
		return "rgb("+"255"+","+color2+","+color3+")";
	}
}