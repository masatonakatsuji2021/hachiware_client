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

    var settings = {};
	var routings = {};
    var pages = {};
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

	var hachiwareRouting = null;

    var cond = this;

	const loadingPage = function(resolve0, routes, mode, noLayouted, completeCallback){

        if(!pages[routes.page]){
            return resolve0();
        }

		if(loadPageCache[routes.page]){
			var page = loadPageCache[routes.page];
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

        if(mode == "before"){
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

	const renderings = function(url, backUrl){

		if(!hachiwareRouting){
			hachiwareRouting = new HachiwareRouting("client",routings);
		}

		var routes = hachiwareRouting.get(url);

		buffer.layout = null;

		if(settings.defaultLayout){
			buffer.layout = settings.defaultLayout;
		}

		loadPageCache = {};

		this.sync.sync([
			function(resolve){
				if(!backUrl){
					return resolve();
				}
		
				var backRoutes = hachiwareRouting.get(backUrl);

                loadingPage(resolve, backRoutes, "close", true);
			},
			function(resolve){
				loadingPage(resolve, routes, "before");
			},
			function(resolve){

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

				var contents = $("[h-contents]");
				if(!contents.length){
					contents = $("[hachiware-contents]")
				}
                
                if(renders.pages[routes.page]){
                    var html = renders.pages[routes.page];
                    html = cond.tool.base64Decode(html);
                    var htmlPage = html;
                }
                else{
                    var htmlPage = $("template[h-page=\"" + routes.page + "\"]").html();
					if(!htmlPage.length){
						htmlPage = $("template[hachiware-page=\"" + routes.page + "\"]").html();
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

				resolve();
			},
			function(resolve){
				loadingPage(resolve, routes,"open");
			},
			function(){
				buffer.nowUrl = url;
				buffer._layout = buffer.layout;	
				buffer.modeGo = false;
			},
		]);

	}.bind(this);

	this.redirect = function(url){

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
					if(settings.urlMode == MODE_HASH){
						cond.redirect(location.hash);
					}
					else if(settings.urlMode == MODE_QUERY){
						cond.redirect(location.search.replace("?q=",""));
					}
				});

				$("html").on("click","a[href]", function(){

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
							cond.redirect(url);
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
							forms: forms, 
							renders: renders, 
							models: models,
							validators: validators,
						});

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

};
var hachiware = new Hachiware();