//A星算法寻路

function Astar(){
	
}
Astar.prototype={
	constructor:Astar,
	start:function(arr){
		var rows=arr.length-1;
		var cols=arr[0].length-1;
		var start={x:0,y:1};
		var end={x:cols,y:rows-1}
		var openList=[start];   //存储需要检测的列表
		var closeList=[];   //存储已经访问过的列表
		
		while(openList.length>0){
			var activePoint=openList.pop();
			closeList.push(activePoint);
			var neighbor=this.getNeighbor(arr,activePoint,end);
			for(var i=0; i<neighbor.length; i++){
				if(neighbor[i].x===end.x&&neighbor[i].y===end.y){
					end.parent=activePoint;
					return this.end(end);
				}
				var ifInCloseList=false;
				for(var j=0; j<closeList.length; j++){
					if(closeList[j].x==neighbor[i].x&&closeList[j].y==neighbor[i].y){
						ifInCloseList=true;
					}
				}
				if(!ifInCloseList){
					neighbor[i].parent=activePoint;
					openList.push(neighbor[i]);
				}
			}
		}
	},
	end:function(end){
		var farr=[end];
		while(end.parent){
			farr.push(end.parent);
			end=end.parent;
		}
		return farr;
	},
	getNeighbor:function(arr,start,end){
		//  1:墙壁    0:可以通过
		var x=start.x;
		var y=start.y;
		var result=[];
		if(y>0&&arr[y-1][x]===0){
			result.push({x:x,y:y-1,cost:Math.abs(x-1-end.x)+Math.abs(y-end.y),pos:"top"});
		}
		if(y<arr.length-1&&arr[y+1][x]===0){
			result.push({x:x,y:y+1,cost:Math.abs(x+1-end.x)+Math.abs(y-end.y),pos:"bottom"});
		}
		if(x>0&&arr[y][x-1]===0){
			result.push({x:x-1,y:y,cost:Math.abs(x-end.x)+Math.abs(y-1-end.y),pos:"left"});
		}
		if(x<arr[0].length-1&&arr[y][x+1]===0){
			result.push({x:x+1,y:y,cost:Math.abs(x-end.x)+Math.abs(y+1-end.y),pos:"right"});
		}
		return result.sort(function(a,b){
			return a.cost-b.cost;
		})
		
	}
	
}
