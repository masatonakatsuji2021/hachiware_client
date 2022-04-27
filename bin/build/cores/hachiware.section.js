hachiware.loadSection = function(sectionName, options){

	if(!options.sections[sectionName]){
		options.sections[sectionName] = {};
	}

    var baseMethodList = [
        "open",
        "append",
		"close",
    ];


	return new hachiware.loadCore("sections", sectionName, options, baseMethodList, function(){

		var _queryString = null;
		var sectionDom = null;
	
		var sectionHtml = "";
		if(options.renders.sections[sectionName]){
			sectionHtml = options.renders.sections[sectionName];
			sectionHtml = options.context.tool.base64Decode(sectionHtml);
		}
		else{
			sectionHtml = $("[hachiare-section-base=\""+ sectionName + "\"]").html();
			if(!sectionHtml){
				sectionHtml =  $("[h-section-base=\""+ sectionName + "\"]").html();
			}
		}

		this.appended = false;
		this.increment = 0;
		this.toggle = false;

		/**
		 * onOpen
		 * @param {*} callback 
		 * @returns 
		 */
		this.onOpen = function(callback){
			options.sections[sectionName].open = callback;
			return this;
		};

		/**
		 * onAppend
		 * @param {*} callback 
		 * @returns 
		 */
		this.onAppend = function(callback){
			options.sections[sectionName].append = callback;
			return this;
		};
	
		/**
		 * onClose
		 * @param {*} callback 
		 * @returns 
		 */
		this.onClose = function(callback){
			options.sections[sectionName].close = callback;
			return this;
		};



		/**
		 * getContent
		 * @returns 
		 */
		this.getContent = function(){
			return sectionHtml;
		};

		/**
		 * setContent
		 * @param {*} newString 
		 * @returns 
		 */
		this.setContent = function(newString){
			sectionHtml = newString;
			return this;
		};

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

			_queryString = "[h-section=\"" + queryString + "\"]";
			if(!$(_queryString).length){
				_queryString = "[hachiware-section=\"" + queryString + "\"]";
			}

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

			_queryString = "[h-section=\"" + queryString + "\"]";
			if(!$(_queryString).length){
				_queryString = "[hachiware-section=\"" + queryString + "\"]";
			}

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

	});

};