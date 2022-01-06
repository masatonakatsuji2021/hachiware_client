hachiware.loadSection = function(sectionName, options){

	var _queryString = null;
	var sectionDom = null;

    if(options.renders.sections[sectionName]){
        var sectionHtml = options.renders.sections[sectionName];
        sectionHtml = options.context.tool.base64Decode(sectionHtml);
    }
    else{
        var sectionHtml = $("[hachiare-section-base=\""+ sectionName + "\"]").html();
    }

	this.$name = sectionName;
	this.$base = {};
	this.appended = false;
	this.increment = 0;
	
	if(options.sections[sectionName]){
		var colums = Object.keys(options.sections[sectionName]);
		for(var n = 0 ; n < colums.length ; n++){
			var field = colums[n];
			var value = options.sections[sectionName][field];
			
			if(
				field == "open" || 
				field == "close" ||
				field == "append"
			){
				this.$base[field] = value;
			}
			else{
				this[field] = value;	
			}
		}
	}

	this.toggle = false;

	/**
	 * open
	 * @param {*} queryString 
	 * @returns 
	 */
	this.open = function(queryString){

		this.appended = false;

		if(this.toggle){
			return this;
		}

		this.toggle = true;

		_queryString = "[hachiware-section=\"" + queryString + "\"]";

		$(_queryString).html(sectionHtml);
		sectionDom = $(_queryString);

		this.$el = sectionDom;

		if(this.$base.open){
			this.$base.open.bind(this)();
		}

		return this;
	};

	/**
	 * append
	 * @param {*} queryString 
	 * @returns 
	 */
	this.append = function(queryString){

		this.appended = true;

		_queryString = "[hachiware-section=\"" + queryString + "\"]";

		$(_queryString).append(sectionHtml);
		sectionDom = $(_queryString + ">*:last-child");

		this.increment++;
		sectionDom.attr("data-increment-number",this.increment);

		this.$el = sectionDom;

		if(this.$base.append){
			this.$base.append.bind(this)();
		}

		return this;
	};

	/**
	 * close
	 * @param {*} index 
	 * @returns 
	 */
	this.close = function(index){

		this.toggle = false;

		if(this.$base.close){
			this.$base.close.bind(this)(index);
		}

		if(index){
			$(_queryString + ">*[data-increment-number=\"" + index + "\"]").remove();
		}
		else{
			$(_queryString).html("");
		}

		return this;
	};

	this.$section = function(subSectionName){
		var _s = new options.context.loadSection(subSectionName, options);
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


};