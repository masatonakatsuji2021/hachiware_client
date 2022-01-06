hachiware.loadmodel = function(modelName, options){

    this.$name = modelName;

    if(options.models[modelName]){
		var colums = Object.keys(options.models[modelName]);
		for(var n = 0 ; n < colums.length ; n++){
			var field = colums[n];
			var value = options.models[modelName][field];
		
			this[field] = value;	
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

	this.$model = function(subModelName){
		var _m = new options.context.loadModel(subModelName, options);
        return _m;
	};

    this.$validator = function(validatorName){
		var _v = null;
        return _v;
	};

};