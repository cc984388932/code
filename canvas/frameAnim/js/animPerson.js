function AnimPerson(obj){
	this.img=obj.img;
	console.log(this.img);
	this.x=0;
	this.y=0;
	this.w=obj.w || 103;
	this.h=obj.h || 150;
	this.times=1.5;   //图片的缩放比例，实际需要绘制在页面上的图片大小
	this.count=1;   //计算总共调了多少次方法
	this.frameIndex=0;  //当前绘制的是第几帧
	this.frameLength=5;   //总共有多少帧
	this.speed=obj.speed || 7;
	this.speed=this.speed<10 ? 10-this.speed : 1;
}
AnimPerson.prototype={
	constructor:AnimPerson,
	draw:function(ctx,x,y){
		this.x=x || this.x;
		this.y=y || this.y;
		
		this.count++;
		if(this.count%this.speed==0){
			this.frameIndex++;
		}
		
		if(this.frameIndex>=this.frameLength){
			this.frameIndex=0;
		}
		ctx.drawImage(this.img,this.frameIndex*this.w,0,this.w,this.h,this.x,this.y,this.w*this.times,this.h*this.times);
	},
	reset:function(){
		this.frameIndex=0;
	},
	moveStepX:function(){
		this.x++;
	},
	moveStepY:function(){
		this.y++;
	}
}