hachiware.loadSection = function(sectionName, sections, context, renders){

	var _queryString = null;
	var sectionDom = null;

    if(renders.sections[sectionName]){
        var sectionHtml = renders.sections[sectionName];
        sectionHtml = context.tool.base64Decode(sectionHtml);
    }
    else{
        var sectionHtml = $("[hachiare-section=\""+ sectionName + "\"]").html();
    }

	this.$base = {};
	this.appended = false;
	this.increment = 0;

	if(sections[sectionName]){
		var colums = Object.keys(sections[sectionName]);
		for(var n = 0 ; n < colums.length ; n++){
			var field = colums[n];
			var value = sections[sectionName][field];
			
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

		_queryString = queryString;

		$(queryString).html(sectionHtml);
		sectionDom = $(queryString);

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

		_queryString = queryString;

		$(queryString).append(sectionHtml);
		sectionDom = $(queryString + ">*:last-child");

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

};