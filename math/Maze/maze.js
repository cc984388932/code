 function Maze(params){
 	this.reset(params);
}
Maze.prototype={
	constructor:Maze,
	reset:function(params){
		this.r=params.r || 15;
	 	this.c=params.c || 15;
	 	this.startX=params.startX===undefined ? 0 : params.startX;
	 	this.startY=params.startY===undefined ? 1 : params.startY;
	 	this.endX=params.endX || 2*this.c;
	 	this.endY=params.endY || 2*this.r-1;
	 	
	 	this.rows=2*this.r+1;   //最终生成迷宫的行数
	 	this.cols=2*this.c+1;   //最终生成迷宫的列数
	 	
		this.mazeArr=[];
		this.init();
		this.process(this.mazeArr);
		return this.mazeArr;
	},
	init:function(){
	    //全部置1
	    for(var i=0;i<this.rows;i++){
	        var arr=[];
			for(var j=0; j<this.cols; j++){
				arr.push(1);
			}
			 this.mazeArr.push(arr);
	    }
	    //中间格子为0
	    for(var i=0;i<this.r;i++){
	    	for(var j=0;j<this.c;j++){
	            this.mazeArr[2*i+1][2*j+1] = 0;
	        }
	    }
	},
	process:function(){
		var acc = [],noacc = [];
		var count = this.r*this.c;   //5*5个
		//acc存放已访问队列，noacc存放没有访问队列
		for(var i=0;i<count;i++){noacc[i]=0;}
		//定义空单元上下左右偏移
		var offs=[-this.c,this.c,-1,1],offR=[-1,1,0,0],offC=[0,0,-1,1];      
		//随机从noacc取出一个位置
		var pos = this.randInt(count);
		noacc[pos]=1;
		acc.push(pos);
	    while(acc.length<count){        
	        var ls = -1,offPos = -1;
	         //找出pos位置在二维数组中的坐标
	         var pr = pos/this.c|0,pc=pos%this.c,co=0,o=0;
	         //随机取上下左右四个单元
	         while(co++<5){
	             o = this.randInt(0,5);
	             ls =offs[o]+pos;
	             var tpr = pr+offR[o];
	             var tpc = pc+offC[o]; 
	             if(tpr>=0&&tpc>=0&&tpr<=this.r-1&&tpc<=this.c-1&&noacc[ls]==0){ offPos = o;break;}           
	         }
	         if(offPos<0){
	             pos = acc[this.randInt(acc.length)];
	         }
	         else{
	             pr = 2*pr+1;
	             pc = 2*pc+1;
	            //相邻空单元中间的位置置0
	            this.mazeArr[pr+offR[offPos]][pc+offC[offPos]]=0;
	            pos = ls;  
	            noacc[pos] = 1;
	            acc.push(pos);
	            
	        }
	    }
	    //打开入口和出口
	    this.mazeArr[this.startY][this.startX]=0;
	 	this.mazeArr[this.endY][this.endX]=0;
	},
	getMaze:function(){
		return this.mazeArr;
	},
	randInt:function(min,max){
		max=max||0;
		min=min||0;
	    var step=Math.abs(max-min);
	    var st = (arguments.length<2)?0:min;
	    var result ;
	    result = st+(Math.ceil(Math.random()*step))-1;
	    return result;
	}
}