function Game(){
	this.can=document.getElementById("canvas");
	this.ctx=this.can.getContext("2d");
	this.sprites=[];
	var sprite=new AnimPerson({
		img:$("#img")[0]
	});
	this.sprites.push(sprite);
	this.mainLoop();
}
Game.prototype={
	mainLoop:function(){
		var _this=this;
		this.draw();
		requestAnimationFrame(function(){
			_this.mainLoop();
		});
		
	},
	draw:function(){
		this.ctx.clearRect(0,0,700,300);
		for(var i=0; i<this.sprites.length; i++){
			this.sprites[i].moveStepX();
			this.sprites[i].moveStepX();
			this.sprites[i].moveStepX();
			//this.sprites[i].moveStepY();
			this.sprites[i].draw(this.ctx);
		}
	}
}