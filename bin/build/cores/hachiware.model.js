hachiware.loadModel = function(modelName, options){

	return new hachiware.loadCore("models",modelName,options,["before"], function(){

		if(this.$base.before){
			this.$base.before.bind(this)();
		}

	});

};