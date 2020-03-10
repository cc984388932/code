function SolarSystem(){
	this.can=document.querySelector("#canvas")
	var clientBox=this.can.getBoundingClientRect();
	this.w=this.can.width=clientBox.width;
	this.h=this.can.height=clientBox.height;
	this.ctx=this.can.getContext("2d");
	this.ctx.translate(this.w/2,this.h/2);
	this.time=0;
	this.init();
	this.update();
}
SolarSystem.prototype={
	constructor:SolarSystem,
	init:function(){
		this.planets=[];
		var r=[4,12,12,6,142];
		var pathwayR=[44,72,100,152,500];
		var cycles=[8,22,36,68,424];
		var satelliteCount=[3,3,6,4,8]
		
		for(var i=0; i<r.length; i++){
			var planet=new Planet({
				name:"earth",
				cycle:cycles[i]*2,   //周期
				r:r[i],
				satelliteCount:satelliteCount[i],  //卫星数量
				pathwayR:pathwayR[i]*3  //轨道半径
			});
			this.planets.push(planet);
		}
		
	},
	update:function(){
		var _this=this;
		this.time++;
		this.ctx.clearRect(-this.w/2,-this.h/2,this.w,this.h);
		this.drawSun();
		for(var i=0; i<this.planets.length; i++){
			this.planets[i].drawPlanet(this.ctx,this.time);
			this.planets[i].drawPathway(this.ctx,this.time);
			this.planets[i].drawSatellite(this.ctx,this.time);
		}
		requestAnimationFrame(function(){
			_this.update();
		})
	},
	drawSun:function(){
		this.ctx.beginPath();
		this.ctx.fillStyle="white";
		//绘制太阳
		this.ctx.arc(0,0,80,0,Math.PI*2);
		this.ctx.fill();
		this.ctx.closePath();
	}
}


new SolarSystem();
