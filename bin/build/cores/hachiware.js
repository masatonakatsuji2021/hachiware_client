/**
 * ====================================================================
 * Hachiware_Client (core script)
 * 
 * A simple and easy-to-use SPA (Single-Page-Action) framework.
 * 
 * License : MIT License. 
 * Since   : 2022.01.15
 * Author  : Nakatsuji Masato 
 * Email   : nakatsuji@teastalk.jp
 * HP URL  : https://hachiware-js.com/
 * GitHub  : https://github.com/masatonakatsuji2021/hachiware_client
 * npm     : https://www.npmjs.com/package/hachiware_client
 * 
 * ====================================================================
 */

/**
 * [page move flow]
 * 
 * *if page class use....
 * 
 * page "close" callback
 *     ↓
 * page "before" callback <= 未対応
 *     ↓
 * <page open>
 *     ↓
 * page "open" callback
 *     ↓
 * page "online" callback
 *     ↓
 * page "offline" callback
 * 
 * --------------------
 * 
 * *if controlller class use....
 * 
 * controller "UUUU" class method "filterClose" callback　<= 未対応
 *     ↓
 * controller "UUUU" class method "close_YYY" callback
 *     ↓
 * controller "NNNN" class method "filterBefore" callback
 *     ↓
 * <page open>
 *     ↓
 * controller "NNNN" class method "XXXX" callback
 *     ↓
 * controller "NNNN" class method "filterAfter" callback
 *     ↓
 * controller "NNNN" class method "filterOnline" callback
 *     ↓
 * controller "NNNN" class method "filterOffline" callback
 */

var __uploadFileBuffer = {};
	
var Hachiware = function(){

	const MODE_HASH = "hash";
	const MODE_QUERY = "query";

	var buffer = {
		nowUrl:null,
		modeGo: true,
		layout: null,
		_layout:null,
		layoutDom : $("[hachiware-contents]"),
		pageDom: $("[hachiware-contents]"),
		uploadFiles:null,
	};

	var routes = {};
    var settings = {};
	var routings = {};
    var pages = {};
	var controllers = {};
	var sections = {};
	var forms = {};
    var models = {};
    var validators = {};
	var statics = {};

    var renders = {
        pages: {},
        sections: {},
        layouts: {},
    };

	var loadPageCache = {};
	var loadControllerCache = {};

	var hachiwareRouting = null;

    var cond = this;

	const loadingPage = function(resolve0, routes, mode, noLayouted, completeCallback){

        if(!pages[routes.page]){
            return resolve0();
        }

		if(loadPageCache[routes.page]){
			var page = loadPageCache[routes.page];
			page._refresh(buffer, routes);
		}
		else{
			var page = new cond.loadPage(routes.page, {
				pages: pages, 
				routes: routes,
				settings: settings,
				context: cond, 
				buffer: buffer,
				sections: sections, 
				forms: forms, 
				renders: renders, 
				models: models,
				validators: validators,
				statics: statics,
			});
			loadPageCache[routes.page] = page;
		}

		if(routes.exception){
			page.exception = routes.exception;
		}

		if(mode == "initial"){
			if(page.layout || page.layout === null){
				buffer.layout = page.layout;
			}
		}

        cond.sync.then(function(resolve2){

                if(!page.extend){
                    return resolve2();
                }

                loadingPage(
                    resolve2, 
                    { 
						base: routes.base,
						mode: routes.mode,
                        page: page.extend, 
                        aregment: routes.aregment,
						query: routes.query,
                    } , 
                    mode, 
					noLayouted,
					function(parent){
						page.$parent = parent;
					});

        }).then(function(){

			if(mode == "initial"){
				return resolve0();
			}

            var syncName = "sync_" + mode;

            if(
				!page.$base[syncName] && 
				!page.$base[mode]
			){
				return resolve0();
            }

			if(page.$base[syncName]){
				var pageCallback = page.$base[syncName].bind(page);

				if(routes.aregment){
					pageCallback(resolve0, routes.aregment);
				}
				else{
					pageCallback(resolve0);
				}
			}
			else{
				var pageCallback = page.$base[mode].bind(page);

				if(routes.aregment){
					pageCallback(routes.aregment);
				}
				else{
					pageCallback();
				}
				resolve0();
			}
					
			if(completeCallback){
				completeCallback(page);
			}
		}).start();

        return page;
    };

	const loadingController = function(resolve0, routes, mode, noLayouted, completeCallback){

        if(!controllers[routes.controller]){
            return resolve0();
        }

		if(loadControllerCache[routes.controller]){
			var controller = loadControllerCache[routes.controller];
			controller._refresh(buffer, routes);
		}
		else{
			var controller = new cond.loadController(routes.controller, {
				controllers: controllers, 
				routes: routes,
				settings: settings,
				context: cond, 
				buffer: buffer,
				sections: sections, 
				forms: forms, 
				renders: renders, 
				models: models,
				validators: validators,
				statics: statics,
			});
			loadControllerCache[routes.controller] = controller;
		}

        if(mode == "initial"){
            if(controller.layout || controller.layout === null){
                buffer.layout = controller.layout;
            }
        }

        cond.sync.then(function(resolve2){

			if(!controller.extend){
                return resolve2();
            }

            loadingController(
				resolve2, 
                { 
					base: routes.base,
					mode: routes.mode,
                    controller: controller.extend, 
                    aregment: routes.aregment,
					query: routes.query,
                } , 
                mode, 
				noLayouted,
				function(parent){
					controller.$parent = parent;
				});

        }).then(function(){

			if(mode == "initial"){			
				return resolve0();
			}

			if(mode == "open"){
				var methodName = routes.action;
				var syncMethodName = "sync_" + routes.action;
			}
			else if(mode == "close"){
				var methodName = "close_" + routes.action;
				var syncMethodName = "sync_close_" + routes.action;
			}
			else if(mode == "filterBefore"){
				var methodName = "filterBefore";
				var syncMethodName = "sync_filterBefore";
			}
			else if(mode == "filterAfter"){
				var methodName = "filterAfter";
				var syncMethodName = "sync_filterAfter";
			}
			else if(mode == "filterOffline"){
				var methodName = "filterOffline";
				var syncMethodName = "sync_filterOffline";
			}
			else if(mode == "filterOnline"){
				var methodName = "filterOnline";
				var syncMethodName = "sync_filterOnline";
			}

            if(
				!controller[syncMethodName] && 
				!controller[methodName]
			){
				return resolve0();
            }

			if(controller[syncMethodName]){
				var controllerCallback = controller[syncMethodName].bind(controller);

				if(routes.aregment){
					controllerCallback(resolve0, routes.aregment);
				}
				else{
					controllerCallback(resolve0);
				}
			}
			else{
				var controllerCallback = controller[methodName].bind(controller);

				if(routes.aregment){
					controllerCallback(routes.aregment);
				}
				else{
					controllerCallback();
				}
				resolve0();
			}
					
			if(completeCallback){
				completeCallback(controller);
			}

		}).start();

        return controller;
    };


	var routingFlg = false;

	const renderings = function(url, backUrl){

		routingFlg = true;

		if(!hachiwareRouting){
			hachiwareRouting = new HachiwareRouting("client",routings);
		}

		routes = hachiwareRouting.get(url);

		buffer.layout = null;

		if(settings.defaultLayout){
			buffer.layout = settings.defaultLayout;
		}

		loadPageCache = {};

		_renderings(url, routes, backUrl);

	}.bind(this);

	const _renderings = function(url, _routes, backUrl){
		
		this.sync.sync([
			function(resolve){
				try{

					if(_routes.page){				
						loadingPage(resolve, _routes, "initial");
					}
					else if(_routes.controller){
						loadingController(resolve, _routes, "initial");
					}

				}catch(error){
					console.error(error);
				}
			},
			function(resolve){
				if(!backUrl){
					return resolve();
				}
		
				var backRoutes = hachiwareRouting.get(backUrl);

				backRoutes.baseRoutes = _routes;

				try{

					if(_routes.page){
						loadingPage(resolve, backRoutes, "close", true);
					}
					else if(_routes.controller){
						loadingController(resolve, backRoutes, "close", true);
					}

				}catch(error){
					console.error(error);
				}
			},
			function(resolve){

			
				if(!_routes.controller){
					return resolve();
				}

				try{
					loadingController(resolve, _routes, "filterBefore");
				}catch(error){
					console.error(error);
				}

			},
			function(resolve){

				try{

					if(_routes.mode == "success"){

						if(settings.urlMode == MODE_HASH){
							var turl = location.hash.substring(1);
						}
						else if(settings.urlMode == MODE_QUERY){
							var turl = location.search.replace("?q=","");
						}
	
						if(url.substring(0,1) == "/"){
							url = url.substring(1);
						}
	
						if(turl.substring(0,1) == "/"){
							turl = turl.substring(1);
						}
	
						if(url != turl){
							if(turl){
								return;
							}
						}
	
					}

					if(_routes.changePage){
						_routes.chnageRender = _routes.changePage;
					}

					var contents = $("[h-contents]");
					if(!contents.length){
						contents = $("[hachiware-contents]")
					}
					
					if(_routes.page){
						if(renders.pages[_routes.page]){
							var html = renders.pages[_routes.page];
							html = cond.tool.base64Decode(html);
							var htmlPage = html;
						}
						else{
							var htmlPage = $("template[h-page=\"" + _routes.page + "\"]").html();
							if(!htmlPage){
								htmlPage = $("template[hachiware-page=\"" + _routes.page + "\"]").html();
							}
						}
					}
					else if(_routes.controller){
						var _path = routes.controller + "/" + _routes.action;

						if(_routes.chnageRender){
							_path = _routes.chnageRender;
						}

						if(renders.pages[_path]){
							var html = renders.pages[_path];
							html = cond.tool.base64Decode(html);
							var htmlPage = html;
						}
					}

					if(!htmlPage){
						htmlPage = "";
					}

					if(buffer.layout != buffer._layout){

						if(renders.layouts[buffer.layout]){
							var html = renders.layouts[buffer.layout];
							html = cond.tool.base64Decode(html);
							var htmlLayout = html;
						}
						else{
							var htmlLayout = $("template[h-layout=\"" + buffer.layout + "\"]").html();
							if(!htmlLayout){
								htmlLayout = $("template[hachiware-layout=\"" + buffer.layout + "\"]").html();
							}
						}

						if(htmlLayout){

							contents.html(htmlLayout);

							var pageArea = contents.find("[h-page]");
							if(!pageArea.length){
								pageArea = contents.find("[hachiware-page]");
							}
							
							pageArea.html(htmlPage);

							buffer.pageDom = pageArea;
							buffer.layoutDom = contents;
						}
						else{
							contents.html(htmlPage);
							buffer.pageDom = contents;
							buffer.layoutDom = null;
						}

					}
					else{

						if(buffer.layout){

							var pageArea = contents.find("[h-page]");
							if(!pageArea.length){
								pageArea = contents.find("[hachiware-page]")
							}

							pageArea.html(htmlPage);

							buffer.pageDom = pageArea;
							buffer.layoutDom = contents;
						}
						else{
							contents.html(htmlPage);
							buffer.pageDom = contents;
							buffer.layoutDom = null;
						}
					}

				}catch(error){
					console.error(error);
				}

				resolve();
			},
			function(resolve){
				try{

					if(_routes.page){
						loadingPage(resolve, _routes,"open");
					}
					else if(_routes.controller){
						loadingController(resolve, _routes,"open");
					}

				}catch(error){
					console.log(error);
				}
			},
			function(resolve){
				try{

					var lineMode = "filterOffline";
					if(navigator.onLine){
						lineMode = "filterOnline";
					}

					if(_routes.page){
						loadingPage(resolve, _routes, lineMode);
					}
					else if(_routes.controller){
						loadingController(resolve, _routes, lineMode);
					}

				}catch(error){
					console.log(error);
				}
			},
			function(resolve){

				if(!_routes.controller){
					return resolve();
				}

				try{
					loadingController(resolve, _routes, "filterAfter");
				}catch(error){
					console.error(error);
				}

			},
			function(){
				buffer.nowUrl = url;
				buffer._layout = buffer.layout;	
				buffer.modeGo = false;

				routingFlg = false;
			},
		]);

	}.bind(this);

	this._redirect = function(url){

		var beforeUrl = buffer.nowUrl;
		url = url.substring(1);
		if(!url){
			url = "/";
		}
		renderings(url, beforeUrl);
	};

	this.load = function(){

		if(!settings.urlMode){
			settings.urlMode = MODE_HASH;
		}

		var firstUrl = "/";
		if(settings.urlMode == MODE_HASH){
			if(location.hash){
				firstUrl = location.hash;
				firstUrl = firstUrl.substring(1);
			}
		}
		else if(settings.urlMode == MODE_QUERY){
			if(location.search){
				var url = location.search.replace("?q=","");
				firstUrl = url;
			}
		}

		this.sync.sync([
			function(resolve){

				if(
					!settings.sync_load &&
					!settings.load
				){
					return resolve();
				}
				
				if(settings.sync_load){
					var load = settings.sync_load.bind(settings);
					load(resolve);
				}
				else{
					var load = settings.load.bind(settings);
					load();
					resolve();
				}
			},
			function(){

				renderings(firstUrl);

				window.addEventListener('popstate', function(e){

					if(settings.disabled){
						history.pushState(null, null, location.href);
						return false;
					}

					if(settings.urlMode == MODE_HASH){
						cond._redirect(location.hash);
					}
					else if(settings.urlMode == MODE_QUERY){
						cond._redirect(location.search.replace("?q=",""));
					}
				});

				$("html").on("click","a[href]", function(){
					
					if(routingFlg){
						return false;
					}

					if(settings.disabled){
						return false;
					}

					var url = $(this).attr("href");
									
					buffer.modeGo = true;

					if(url.substring(0,1) == "/"){

						if(url[url.length-1] == "/"){
							url = url.substring(0, url.length-1);
						}

						if(settings.urlMode == MODE_HASH){
							location.hash = "#" + url;
						}
						else if(settings.urlMode == MODE_QUERY){
							if(url){
								history.pushState(null, null, "index.html?q=" + url);
							}
							else{
								history.pushState(null, null, "index.html");
							}
							cond._redirect(url);
						}

						return false;
					}

				});

				$("html").on("click","a[back]",function(){
					history.back();
					return false;
				});

				$("html").on("click","a[go]",function(){
					buffer.modeGo = true;
					history.forward();
					return false;
				});

				$("html").on("change","input[type=\"file\"]", function(e){

					if(!this.files.length){
						$(this).attr("uid","");
						delete __uploadFileBuffer[uid];
						return;
					}

					var getFile = $(this).prop("files");

					var uid = cond.tool.uniqId();

					if(!__uploadFileBuffer[uid]){
						__uploadFileBuffer[uid] = [];
					}

					$(this).attr("uid",uid);

					for(var n = 0 ; n < getFile.length ; n++){
						var file = getFile[n];

						var fileReader = new FileReader();
						fileReader.name = file.name;
						fileReader.size = file.size;
						fileReader.type = file.type;
						fileReader.onloadend = function() {
							__uploadFileBuffer[uid].push({
								naem : this.name,
								size: this.size,
								type: this.type,
								result: cond.tool.base64Encode(this.result),
							});
						}
						fileReader.readAsDataURL(file);	
					}

				});

				$("html").on("submit","form",function(){

					try{
						var formName = $(this).attr("h-form");
						if(!formName){
							formName = $(this).attr("hachiware-form");
						}

						if(!formName){
							return false;
						}

						if(!forms[formName]){
							return false;
						}

						var form = new cond.loadForm(formName, {
							context: cond, 
							buffer: buffer,
							sections: sections, 
							settings: settings,
							forms: forms, 
							renders: renders, 
							models: models,
							routes: routes,
							validators: validators,
						});

						form.$redirect = function(url, replaced){

							if(url.substring(0,1) != "/"){
								url = "/" + url;
							}
						
							if(replaced){
								location.replace("#" + url);
							}
							else{
								location.href = "#" + url;
							}
						};

						form.$el = $("[h-form=\"" + formName + "\"]");
						if(!form.$el.length){
							form.$el = $("[hachiware-form=\"" + formName + "\"]");
						}

						if(form.$base.submit){
							var submitData = form.getData();
							form.$base.submit.bind(form)(submitData);
						}
						
					}catch(error){
						console.log(error);
					}

					return false;
				});

				$("html").on("reset","form",function(){

					__uploadFileBuffer = {};

					try{
						var formName = $(this).attr("h-form");
						if(!formName){
							formName = $(this).attr("hachiware-form");
						}

						if(!formName){
							return false;
						}

						if(!forms[formName]){
							return false;
						}

						var form = new cond.loadForm(formName, {
							context: cond, 
							buffer: buffer,
							sections: sections, 
							settings: settings,
							forms: forms, 
							renders: renders, 
							models: models,
							routes: routes,
							validators: validators,
						});

						form.$redirect = function(url, replaced){

							if(url.substring(0,1) != "/"){
								url = "/" + url;
							}
						
							if(replaced){
								location.replace("#" + url);
							}
							else{
								location.href = "#" + url;
							}
						};

						form.$el = $("[h-form=\"" + formName + "\"]");
						if(!form.$el.length){
							form.$el = $("[hachiware-form=\"" + formName + "\"]");
						}

						if(form.$base.reset){
							var submitData = form.getData();
							form.$base.reset.bind(form)(submitData);
						}
						
					}catch(error){
						console.log(error);
					}

				});

				window.onoffline = function(){
					
					if(settings.offline){
						var offline = settings.offline.bind(settings);
						offline();
					}

					loadingPage(function(){},routes,"offline");
				};

				window.ononline = function(){

					if(settings.online){
						var online = settings.online.bind(settings);
						online();
					}

					loadingPage(function(){},routes,"online");
				};
				
				if(navigator.onLine){

					if(settings.online){
						var online = settings.online.bind(settings);
						online();
					}
				}
				else{

					if(settings.online){
						var offline = settings.offline.bind(settings);
						offline();
					}
				}
			},
		]);

	};

	this.setting = function(params){
		settings = params;
		return this;
	};

	this.routing = function(params){
		routings = params;
		return this;
	};

	this.page = function(pageUrl, params){
		pages[pageUrl] = params;
		return this;
	};

	this.controller = function(controllerName, params){
		controllers[controllerName] = params;
		return this;
	};

	this.section = function(sectionName, params){
		sections[sectionName] = params;
		return this;
	};

	this.form = function(formName, params){
		forms[formName] = params;
		return this;
	};
    
    this.model = function(modelName, params){
		models[modelName] = params;
		return this;
    };

    this.validator = function(validatorName, params){
        validators[validatorName] = params;
        return this;
    };

	this.static = function(staticName, params){
		statics[staticName] = params;
		return this;
	};

    this.setRenderPage = function(params){
        renders.pages = params;
        return this;
    };

    this.setRenderSection = function(params){
        renders.sections = params;
        return this;
    };

    this.setRenderLayout = function(params){
        renders.layouts = params;
        return this;
    };

	this.setMode = function(bools){
		buffer.modeGo = bools;
		return this;
	};

	this.redirect = function(url, replaced){

		if(url.substring(0,1) != "/"){
			url = "/" + url;
		}

		if(replaced){
			location.replace("#" + url);
		}
		else{
			location.href = "#" + url;
		}

		this._redirect(url);
	};

	this.storage = {
		_getName: function(){
			var appName = "h_storage_";
			if(settings.appName){
				appName = settings.appName;
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
				return cond.storage.get(0, name);
			},
			set: function(name, value){
				return cond.storage.set(0, name, value);
			},
			delete: function(name){
				return cond.storage.delete(0, name);
			},
			clear: function(){
				return cond.storage.clear(0);
			},
		},
		local: {
			get: function(name){
				return cond.storage.get(1, name);
			},
			set: function(name, value){
				return cond.storage.set(1, name, value);
			},
			delete: function(name){
				return cond.storage.delete(1, name);
			},
			clear: function(){
				return cond.storage.clear(1);
			},
		},
	};

};
var hachiware = new Hachiware();