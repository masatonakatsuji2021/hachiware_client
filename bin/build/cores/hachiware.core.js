hachiware.loadCore = function(type, coreName, options, baseMethodList, callback){

	var cond = this;

	this.$type = type;

	this.$name = coreName;

	this.$base = {};

	this.$sync = options.context.sync;

	this.$tool = options.context.tool;

	this.$routes = options.routes;

	this.$changeRender = function(renderName){
		if(options.routes.baseRoutes){
			options.routes.baseRoutes.changePage = renderName;			
		}
		else{
			options.routes.changePage = renderName;
		}
		return this;
	};

	this.$storage = {
		_getName: function(){
			var appName = "h_storage_";
			if(options.settings){
				if(options.settings.appName){
					appName = options.settings.appName;
				}
			}
			return appName;
		},
		get: function(type, name){
			var appName = this._getName();

			if(type){
				var getData = localStorage.getItem(appName);
			}
			else{
				var getData = sessionStorage.getItem(appName);
			}

			getData = JSON.parse(getData);

			if(!getData){
				return null;
			}

			if(name){
				if(getData[name]){
					return getData[name];
				}
				else{
					return null;
				}
			}
			else{
				return getData;
			}
		},
		set: function(type, name, value){
			var getData = this.get(type);

			if(!getData){
				getData = {};
			}

			getData[name] = value;

			var getDataStr = JSON.stringify(getData);

			var appName = this._getName();

			if(type){
				localStorage.setItem(appName, getDataStr);
			}
			else{
				sessionStorage.setItem(appName, getDataStr);
			}
		},
		delete: function(type, name){
			var getData = this.get(type);

			if(getData[name] == undefined){
				return;
			}

			delete getData[name];

			var getDataStr = JSON.stringify(getData);

			var appName = this._getName();

			if(type){
				localStorage.setItem(appName, getDataStr);
			}
			else{
				sessionStorage.setItem(appName, getDataStr);
			}
		},
		clear: function(type){
			var appName = this._getName();

			if(type){
				localStorage.clearItem(appName);
			}
			else{
				sessionStorage.clearItem(appName);
			}
		},
		session: {
			get: function(name){
				return cond.$storage.get(0, name);
			},
			set: function(name, value){
				return cond.$storage.set(0, name, value);
			},
			delete: function(name){
				return cond.$storage.delete(0, name);
			},
			clear: function(){
				return cond.$storage.clear(0);
			},
		},
		local: {
			get: function(name){
				return cond.$storage.get(1, name);
			},
			set: function(name, value){
				return cond.$storage.set(1, name, value);
			},
			delete: function(name){
				return cond.$storage.delete(1, name);
			},
			clear: function(){
				return cond.$storage.clear(1);
			},
		},
	};

	if(
		type == "pages" ||
		type == "sections" ||
		type == "forms"
	){

		this.$setView = function(data){

			var colums = Object.keys(data);
			for(var n = 0 ; n < colums.length ; n++){
				var field = colums[n];
				var value = data[field];

				if(typeof value == "object"){
					if(Array.isArray(value)){
						value = value.join("\n");
					}	
				}

				if(typeof value != "object"){
					value = {
						text: value.toString(),
					};
				}

				var target = this.$el.find("[h-view=\"" + field + "\"]");
				if(!target.length){
					target = this.$el.find("[hachiware-view=\"" + field + "\"]");
				}

				var colums2 = Object.keys(value);
				for(var n2 = 0 ; n2 < colums2.length ; n2++){
					var action = colums2[n2];
					var value2 = value[action];

					if(action == "attr"){
						target.attr(value2[0], value2[1]);
					}
					else{
						target[action](value2);						
					}
				}
			}
		};
	}

	/**
	 * $setViewActive
	 * @param {*} data 
	 */
	this.$setViewActive = function(data){

        var errorArea = this.$el.find("[h-view-active]");
        if(!errorArea.length){
            errorArea = this.$el.find("[hachiware-view-active]");
        }
        errorArea.empty().removeAttr("mode-active");

		if(!data){
			return;
		}

        var colums = Object.keys(data);

		for(var n = 0 ; n < colums.length ; n++){
			var field = colums[n];
			var value = data[field];

			var errorText = value;
			if(Array.isArray(value)){
				errorText = value.join("<br>");
			}

			var errorArea_ = this.$el.find("[h-view-active=\"" + field + "\"]");
			if(!errorArea_.length){
				errorArea_ = this.$el.find("[hachiware-view-active=\"" + field + "\"]");
			}
                
            errorArea_.attr("mode-active",true).html(errorText);
		}

	};

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

		if(url.substring(0,1) != "/"){
			url = "/" + url;
		}

		if(replaced){
			location.replace("#" + url);
		}
		else{
			location.href = "#" + url;
		}

		options.context.redirect(url);
	};

	this.$refresh = function(){
		var url = this.$routes.base;
		options.context.redirect(url);
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
