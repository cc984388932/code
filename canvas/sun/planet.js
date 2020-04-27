function Planet(data){
	this.x=0;    
	this.y=0;
	this.r=data.r;
	this.pathwayR=data.pathwayR;   //轨道半径
	this.cycle=data.cycle;   //绕太阳一圈的周期
	this.color=data.color || "white";
	this.satelliteCount=data.satelliteCount || 0;  //卫星数量
	this.setSatellite();
}
Planet.prototype={
	constructor:Planet,
	setSatellite:function(){
		this.satellites=[];
		for(var i=0; i<this.satelliteCount; i++){
			var satellite=new Satellite({
				pathwayR:this.r+10*(i+1)
			});
			this.satellites.push(satellite);
		}
	},
	drawPlanet:function(ctx,time){
		ctx.beginPath();
		ctx.fillStyle=this.color;
		this.x=Math.floor(this.pathwayR*Math.cos(time/this.cycle));
		this.y=Math.floor(this.pathwayR*Math.sin(time/this.cycle));
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.closePath();
		ctx.fill();
	},
	drawPathway:function(ctx){
		ctx.beginPath();
		ctx.strokeStyle="rgba(255,255,255,0.3)";
		ctx.arc(0,0,this.pathwayR,0,Math.PI*2);
		ctx.stroke();
	},
	drawSatellite:function(ctx,time){
		var data={
			x:this.x,
			y:this.y
		}
		for(var i=0; i<this.satellites.length; i++){
			this.satellites[i].drawSatellite(ctx,time,data)
		}
	}
}

//卫星
function Satellite(data){
	this.x=0;
	this.y=0;
	this.r=1;
	this.pathwayR=data.pathwayR;
	this.cycle=Math.random()*5+10;
	this.lastX=0;
	this.lastY=0;
}
Satellite.prototype={
	constructor:Satellite,
	drawSatellite:function(ctx,time,planet){
		ctx.beginPath();
		this.x=Math.floor(this.pathwayR*Math.cos(time/this.cycle))+planet.x;
		this.y=Math.floor(this.pathwayR*Math.sin(time/this.cycle))+planet.y;
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.closePath();
		ctx.fill();
	}
}



		



