hachiware.loadCore = function(type, coreName, options, baseMethodList, callback){

    this.$type = type;
    this.$name = coreName;
	this.$base = {};

    if(options[type][coreName]){
		var colums = Object.keys(options[type][coreName]);
		for(var n = 0 ; n < colums.length ; n++){
			var field = colums[n];
			var value = options[type][coreName][field];
			
            if(baseMethodList.indexOf(field) > -1){
				this.$base[field] = value;
			}
			else{
				this[field] = value;	
			}
		}
	}

	this.$section = function(sectionName){
		var _s = new options.context.loadSection(sectionName, options);
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
		var _v = new options.context.loadValidator(validatorName, options);
        return _v;
	};

	this.$redirect = function(url, replaced){
		if(replaced){
			location.replace("#/" + url);
		}
		else{
			location.href = "#/" + url;
		}
	};

	this.$back = function(){
		history.back();
	};

	this.$forward = function(){
		history.forward();
	};

	this.$historyReset = function(){

	};

    if(callback){
        callback.bind(this)();
    }

};