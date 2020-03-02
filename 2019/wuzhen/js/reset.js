
function ResetPage(){
	this.init();
	this.bindEvent();
}
ResetPage.prototype={
	constructor:ResetPage,
	init:function(){
		this.bgBoxEl=$(".bgBox");
		this.pageEl=$(".page");
		this.pageLength=this.pageEl.length;
		var start=0;
		$("#arrowDown").attr("data-index",start);
		this.pageEl.eq(start).show();
	},
	toNextPage:function(){
		var _this=this;
		var index=parseInt($("#arrowDown").attr('data-index'));
		var next=index+1;
		if(next>=this.pageLength){
			return;
		}
		this.bgBoxEl.hide();
		$("#arrowDown").attr('data-index',next);
		this.pageEl.eq(index).hide();
		this.pageEl.eq(next).show();
		setTimeout(function(){
			_this.bgBoxEl.show();
		},10)
	},
	toPrevPage:function(){
		var _this=this;
		var index=parseInt($("#arrowDown").attr('data-index'));
		var next=index-1;
		if(next<0){
			return;
		}
		this.bgBoxEl.hide();
		$("#arrowDown").attr('data-index',next);
		this.pageEl.eq(index).hide();
		this.pageEl.eq(next).show();
		setTimeout(function(){
			_this.bgBoxEl.show();
		},10)
	},
	bindEvent:function(){
		var _this=this;
		$("#arrowDown").click(function(){
			_this.toNextPage();
		})
		document.body.addEventListener("touchstart",function(e){
			var touch=e.touches[0];
			_this.startY=touch.pageY;
		})
		document.body.addEventListener("touchend",function(e){
			var touch=e.changedTouches[0];
			if(_this.startY-touch.pageY>50){
				_this.toNextPage();
			}
			else if(_this.startY-touch.pageY<-50){
				_this.toPrevPage();
			}
		})
	}
}



new ResetPage();
