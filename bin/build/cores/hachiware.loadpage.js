hachiware.loadPage = function(pageName, pages, context, sections, forms, renders, buffer){

    this.$name = pageName;
	
	if(buffer.modeGo){
		this.$mode = "next";
	}
	else{
		this.$mode = "back";
	}

	this.$base = {};

    if(pages[pageName]){
		var colums = Object.keys(pages[pageName]);
		for(var n = 0 ; n < colums.length ; n++){
			var field = colums[n];
			var value = pages[pageName][field];
			
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
		var _s = new context.loadSection(sectionName,sections,context,renders);
		return _s;
	};

	this.$form = function(formName){
        var _f = new context.loadForm(formName,forms);
        return _f;
    };
	
	this.$redirect = function(url){
		var _f = new context.loadRedirect(url, context);
        return _f;
	};

	this.$el = buffer.pageDom;
	this.$layoutEl = buffer.layoutDom;

};