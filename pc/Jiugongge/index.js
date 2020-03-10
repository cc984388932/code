function JiuGongGe(params){
	this.gameLi=document.querySelectorAll("#jiuGongGe li");
	this.list=[0,1,2,5,8,7,6,3];
	this.a=-0.4;
	this.ifEnd=true;
	this.backFunc=params.backFunc || function(){};
}
JiuGongGe.prototype={
	constructor:JiuGongGe,
	update:function(){
		if(this.ifEnd){
			this.endFunc();
			return;
		}
		var _this=this;
		this.move();
		requestAnimationFrame(function(){
			_this.update();
		})
	},
	move:function(){    //减速效果的实现
		if(this.speedCut&&this.v>5){
			this.v+=this.a;
		}
		this.count+=this.v;
		var index=Math.floor(this.count/60)%8;
		if(this.lastIndex!=index){
			this.lastIndex=index;
			this.step(index);
		}
	},
	step:function(index){  //每次走一个格子
		if(index===7){
			this.round++;
		}
		if(this.round>5&&index===this.result){
			this.speedCut=true;
			if(this.round>8&&index===this.result){
				this.ifEnd=true;
			}
		}
		var lastIndex=index-1;
		lastIndex=lastIndex==-1 ? this.list.length-1 : lastIndex;
		//添加删除class以表示选中
		this.gameLi[this.list[lastIndex]].classList.remove("active");
		this.gameLi[this.list[index]].classList.add("active");
	},
	start:function(result){
		if(!this.ifEnd){
			return;
		}
		this.count=0;
		this.round=0;
		this.ifEnd=false;
		this.lastIndex=0;
		this.speedCut=false;   //是否开始减速
		this.v=30;
		this.result=result;
		this.update();
	},
	endFunc:function(){
		this.backFunc(this.result);
	}
}