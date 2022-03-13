hachiware.loadPage = function(pageName, options){
	
	var baseList = [
		"before",
		"sync_before",
		"open",
		"sync_open",
		"close",
		"sync_close",
		"online",
		"offline",
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

		this._refresh = function(buffer, routes){
			this.$el = buffer.pageDom;
			this.$layoutEl = buffer.layoutDom;
			this.$routes = routes;
		};

	});

};