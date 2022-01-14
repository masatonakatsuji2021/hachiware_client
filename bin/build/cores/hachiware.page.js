hachiware.loadPage = function(pageName, options){
	
	var baseList = [
		"before",
		"sync_before",
		"open",
		"sync_open",
		"close",
		"sync_close",
	];

	return new hachiware.loadCore("pages", pageName, options, baseList,function(){

		if(options.buffer.modeGo){
			this.$mode = "next";
		}
		else{
			this.$mode = "back";
		}

		this.$el = options.buffer.pageDom;
		this.$layoutEl = options.buffer.layoutDom;
	});

};