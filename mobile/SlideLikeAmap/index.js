function Touch(params){
	this.init(params);
	this.bindEvent();
}
Touch.prototype={
	constructor:Touch,
	init:function(params){
		this.shadowEl=params.contEl;
		this.contEl=params.shadowEl;
		this.h=document.body.clientHeight;
		this.top=params.top ? this.h*params.top : this.h*0.1;
		this.bottom=params.bottom ? this.h*params.bottom : this.h*0.9;
		if(this.top>=this.bottom){
			alert("top的值应该小于bottom的值");
			return;
		}
		this.opacityMax=params.opacity ? params.opacity : 0.5;
		this.duration=params.duration ? params.duration : 0.3;
		this.y=this.bottom;
		this.contEl.style.top=this.y+"px";
		this.contEl.style.height=this.h-this.y+"px";
	},
	touchstart:function(e){
		this.ifTouch=true;
		this.setDom("start");
		this.startY=e.touches[0].clientY;
		this.lastClientY=this.startY;
		this.state=this.contEl.scrollTop==0 ? "unscroll" : "scroll";
	},
	touchmove:function(e){
		if(this.contEl.scrollTop!=0){
			this.state="scroll";
		}
		var clientY=e.touches[0].clientY;
		this.direction=clientY-this.lastClientY>0 ? "toBottom" : "toTop";
		
		/*两种情况执行方法：
		1. 当前元素不在顶部
		2. 运动方向向下&&contBox元素的滚动值为0&&当前状态不是滚动*/
		if(this.y!=this.top || (this.direction=="toBottom"&&this.contEl.scrollTop==0&&this.state!="scroll")){
			e.preventDefault();
			this.y+=clientY-this.lastClientY;
			this.y=this.y>this.bottom ? this.bottom : this.y;
			this.y=this.y<this.top ? this.top : this.y;
			this.height=this.h-this.y;
			this.opacity=this.opacityMax*(this.bottom-this.y)/(this.bottom-this.top);
			this.setDom("move");
		}
		this.lastClientY=clientY;
	},
	touchend:function(e){
		var _this=this;
		if(this.state=="scroll"){
			return;
		}
		this.y=this.direction=="toBottom" ?  this.bottom : this.top;
		this.height=this.h-this.y;
		this.opacity=this.direction=="toBottom" ? 0 : this.opacityMax;
		this.setDom("end");
		this.ifTouch=false;
	},
	slideToTop:function(){
		this.contEl.scrollTop=0;
		this.y=this.top;
		this.height=this.h-this.y;
		this.opacity=this.opacityMax;
		this.setDom("end");
	},
	slideToBottom:function(){
		this.contEl.scrollTop=0;
		this.y=this.bottom;
		this.height=this.h-this.y;
		this.opacity=0;
		this.setDom("end");
	},
	setDom:function(state){
		var _this=this;
		switch (state){
			case "start":
				this.contEl.style.transition="none";
				this.shadowEl.style.transition="none";
				this.shadowEl.style.display="block";
				break;
			case "move":
				this.contEl.style.height=this.height+"px";
				this.contEl.style.top=this.y+"px";
				this.shadowEl.style.opacity=this.opacity;
				break;
			case "end":
				this.contEl.style.height=this.height+"px";
				this.contEl.style.transition="top "+this.duration+"s,height "+this.duration+"s";
				this.contEl.style.top=this.y+"px";
				this.shadowEl.style.transition="opacity "+this.duration+"s";
				this.shadowEl.style.opacity=this.opacity;
				if(this.direction=="toBottom"){
					setTimeout(function(){
						_this.shadowEl.style.display="none";
					},300)
				}
				break;
			default:
				break;
		}
	},
	bindEvent:function(){
		var _this=this;
		this.contEl.addEventListener("touchstart",function(e){
			_this.touchstart(e);
		})
		this.contEl.addEventListener("touchmove",function(e){
			_this.touchmove(e);
		})
		this.contEl.addEventListener("touchend",function(e){
			_this.touchend(e);
		})
	}
}