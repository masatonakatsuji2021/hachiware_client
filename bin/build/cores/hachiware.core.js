hachiware.loadCore = function(type, coreName, options, baseMethodList, callback){

	this.$type = type;

	this.$name = coreName;

	this.$base = {};

	this.$sync = options.context.sync;

	this.$tool = options.context.tool;

	this.$section = function(sectionName){
		return new options.context.loadSection(sectionName, options);
	};

	this.$form = function(formName){
        return new options.context.loadForm(formName, options);
    };
	
	this.$model = function(modelName){
		return new options.context.loadModel(modelName, options);
	};

	this.$validator = function(validatorName){
		return new options.context.loadValidator(validatorName, options);
	};

	this.$static = function(staticName){
		return options.context.loadStatic(staticName, options);
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

	if(options[type][coreName]){
		var colums = Object.keys(options[type][coreName]);
		for(var n = 0 ; n < colums.length ; n++){
			var field = colums[n];
			var value = options[type][coreName][field];
			
			if(baseMethodList){
				if(baseMethodList.indexOf(field) > -1){
					this.$base[field] = value;
				}
				else{
					this[field] = value;	
				}	
			}
			else{
				this[field] = value;	
			}
		}
	}

    if(callback){
        callback.bind(this)();
    }
};
