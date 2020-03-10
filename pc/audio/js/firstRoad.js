
	
function Aud(ctx) {
	this.ctx = ctx;
	this.src = ctx.createBufferSource();
	this.pNode = [];
}
Aud.prototype = {
	output: function() {
		for(var i = 0; i < this.pNode.length; i++) {
			var tNode = this.src;
			for(var j = 0; j < this.pNode[i].length; j++) {
				tNode.connect(this.pNode[i][j]);
				tNode = this.pNode[i][j];
			}
			tNode.connect(this.ctx.destination);
		}
	},
	play: function(loop) {
		this.src.loop = loop || false;
		this.output();
		this.src.start(0);
	},
	addNode: function(node, groupIdx) {
		groupIdx = groupIdx || 0;
		this.pNode[groupIdx] = this.pNode[groupIdx] || [];
		this.pNode[groupIdx].push(node);
	},
	stop:function(){
		this.src.stop();
	}
}
	
function firstRoad(){
	var audioCtx=new AudioContext();
	var aud=new Aud(audioCtx);
	var ctx = document.getElementById("cav").getContext("2d");
	var clientRect=$("#cav")[0].getBoundingClientRect();
	var w=$("#cav")[0].width=clientRect.width;
	var h=$("#cav")[0].height=clientRect.height;
	var halfH=h/2;
	ctx.strokeStyle = "white";
    ctx.fillStyle="rgba(0,0,0,0.8)";
	
    createMusic("you.mp3")
    
    function createMusic(url){
    	ajax(url,function(buf){
			aud.src.buffer = buf;
			var jNode = audioCtx.createScriptProcessor(1024, 1, 1);
    		var pNode = audioCtx.createGain();
    		aud.addNode(pNode);
    		aud.addNode(jNode, 1);
    		aud.play(true);
    		jNode.onaudioprocess = function(e) {
    			renderWave(e);
    		}
    	})
    }

	function ajax(url,backFunc){
    	var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.responseType = 'arraybuffer';
		req.onload = function() {
			audioCtx.decodeAudioData(this.response,function(buf) {
				backFunc(buf);
			});
		}
		req.send();
    }

	
    function renderWave(e) {
    	//ctx.clearRect(0, 0, w, h);
    	var bufData = e.inputBuffer.getChannelData(0);
    	ctx.beginPath();
    	ctx.fillRect(0,0,w,h);
    	ctx.moveTo(0, halfH);
    	for(var i = 0, len = bufData.length, mix = Math.min(w, len); i < mix; i++) {
    		ctx.lineTo(i, bufData[i] * halfH + halfH);
    	}
    	ctx.stroke();
    	ctx.closePath();
    }

}