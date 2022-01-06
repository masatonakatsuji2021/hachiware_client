hachiware.loadPage = function(options){

    this.$name = options.name;

	if(options.buffer.modeGo){
		this.$mode = "next";
	}
	else{
		this.$mode = "back";
	}

	this.$base = {};
	this.$el = options.buffer.pageDom;
	this.$layoutEl = options.buffer.layoutDom;

    if(options.pages[options.name]){
		var colums = Object.keys(options.pages[options.name]);
		for(var n = 0 ; n < colums.length ; n++){
			var field = colums[n];
			var value = options.pages[options.name][field];
			
			if(
                field == "before" || 
				field == "open" || 
				field == "close"
			){
				this.$base[field] = value;
			}
			else{
				this[field] = value;	
			}
		}
	}

	this.$section = function(sectionName){
		var _s = new options.context.loadSection(sectionName, );
		return _s;
	};

	this.$form = function(formName){
        var _f = new options.context.loadForm(formName, options);
        return _f;
    };
	
	this.$model = function(modelName){
		var _m = new options.context.loadModel(modelName, options);
        return _m;
	};

	this.$validator = function(validatorName){
		var _v = null;
        return _v;
	};

	this.$redirect = function(url, replaced){
		var _f = new options.context.loadRedirect(url, replaced);
        return _f;
	};

	this.$back = function(){
		var _f = new options.context.loadBack(options.context);
        return _f;
	};

};