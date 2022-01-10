hachiware.loadValidator = function(validatorName, options){

	return new hachiware.loadCore("validators",validatorName,options,["verify"],function(){

        var _validator = new HachiwareValidator(this);

        this.verify = _validator.verify;

    });


};