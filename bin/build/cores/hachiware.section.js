hachiware.loadSection = function(sectionName, options){
	
	return new hachiware.loadCore("sections", sectionName, options,["open","append","close"],function(){

		var _queryString = null;
		var sectionDom = null;
	
		if(options.renders.sections[sectionName]){
			var sectionHtml = options.renders.sections[sectionName];
			sectionHtml = options.context.tool.base64Decode(sectionHtml);
		}
		else{
			var sectionHtml = $("[hachiare-section-base=\""+ sectionName + "\"]").html();
		}

		this.appended = false;
		this.increment = 0;
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

	});

};