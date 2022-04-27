hachiware.loadController = function(controllerName, options){
	
	var baseList = [];

	return new hachiware.loadCore("controllers", controllerName, options, baseList, function(){

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