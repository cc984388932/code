function RedPacket(){
	this.init();
}
RedPacket.prototype={
	constructor:RedPacket,
	init:function(){
		this.testTime=2000;   //测试次数
		this.maxMoney=100;   //每次测试红包的总金额
		this.maxSize=10;   //每次测试的抽奖人数
		this.data=[];   //存放最后的结果数据
		
		for(let i=0; i<this.testTime; i++){
			this.data.push(this.getRandomMoney(this.maxMoney,this.maxSize));
		}
		//
		this.drawScatter(this.data);  //绘制散点图以查看金额分布情况
		this.drawBar(this.data)   //绘制柱状图以查看顺序对抽奖金额的影响
	},
	getRandomMoney:function(remainMoney,remainSize){
		let moneyList=[];
		const min=0.01;
		let max,money;
		while (remainSize>1){
			max=remainMoney/remainSize*2;
			money=Math.random()*max;
			money=money<0.01 ? 0.01 : money;
			money=Math.round(money*100)/100;
			moneyList.push(money);
			remainSize--;
			remainMoney-=money;
		}
		moneyList.push(Math.round(remainMoney*100)/100);
		return moneyList;
	},
	drawScatter:function(data){  //绘制散点图以查看金额分布情况
		let newData=[],count=0;
		for(let i=0; i<data.length; i++){
			for(let j=0; j<data[i].length; j++){
				newData.push([count++,data[i][j]]);
			}
		}
		var myChart = echarts.init(document.getElementById('main'),"dark");
        var option = {
            title: {
                text: this.testTime+'次抽奖金额分布情况',
                subtext:"每次红包总金额为"+this.maxMoney+",抽奖人数为"+this.maxSize,
                left:"center"
            },
            xAxis: {name:"数据编号"},
            yAxis: {name:"抽中金额"},
            series: [{
            	symbolSize: 2,
                type: 'scatter',
                data: newData
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
	},
	drawBar:function(data){   //绘制柱状图以查看顺序对抽奖金额的影响
		let result=[];
		for(let i=0; i<this.maxSize; i++){
			result.push([i+1,0]);
		}
		for(let i=0; i<data.length; i++){
			for(let j=0;j<data[i].length; j++){
				result[j][1]+=data[i][j];
			}
		}
		console.log(result);
		var myChart = echarts.init(document.getElementById('main2'),"dark");
        var option = {
            title: {
                text: this.testTime+'次抽奖金额分布情况',
                subtext:"每次红包总金额为"+this.maxMoney+",抽奖人数为"+this.maxSize,
                left:"center"
            },
            xAxis: {name:"抽奖顺序"},
            yAxis: { name:this.testTime+"抽中总金额"},
            series: [{
                type: 'bar',
                data: result
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
	}
}

new RedPacket();
