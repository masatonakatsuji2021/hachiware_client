hachiware.loadPage = function(pageName, options){
	
	return new hachiware.loadCore("pages",pageName,options,["before","open","close"],function(){

		if(options.buffer.modeGo){
			this.$mode = "next";
		}
		else{
			this.$mode = "back";
		}

		this.$el = options.buffer.pageDom;
		this.$layoutEl = options.buffer.layoutDom;

		this.$redirect = function(url, replaced){
			var _f = new options.context.loadRedirect(url, replaced);
			return _f;
		};
	
		this.$back = function(){
			var _f = new options.context.loadBack(options.context);
			return _f;
		};

	});

};