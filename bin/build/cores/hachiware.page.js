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
	});

};