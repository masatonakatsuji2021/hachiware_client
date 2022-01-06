var __uploadFileBuffer = {};
	
var Hachiware = function(){

	var buffer = {
		nowUrl:null,
		modeGo: true,
		layout: null,
		_layout:null,
		layoutDom : $("spax-contents"),
		pageDom: $("spax-contents"),
		uploadFiles:null,
	};

    var settings = {};
	var routings = {};
    var pages = {};
	var sections = {};
	var forms = {};
    var models = {};
    var validators = {};

    var renders = {
        pages: {},
        sections: {},
        layouts: {},
    };

    var cond = this;

	const loadingPage = function(resolve0, routes, mode, noLayouted, completeCallback){

        if(!pages[routes.url]){
            return resolve0();
        }

        var page = new cond.loadPage({
			name: routes.url, 
			pages: pages, 
			context: cond, 
			buffer: buffer,
			sections: sections, 
			forms: forms, 
			renders: renders, 
			models: models,
			validators: validators,
		});

        if(mode == "before"){
            if(page.layout){
                buffer.layout = page.layout;
            }    
        }

        cond.sync.sync([
			function(resolve2){

                if(!page.extend){
                    return resolve2();
                }

                loadingPage(
                    resolve2, 
                    { 
                        url: page.extend, 
                        aregment: routes.aregment,
                    } , 
                    mode, 
					noLayouted,
					function(parent){
						page.$parent = parent;
					});
            },
            function(){

                if(!page.$base[mode]){
                    return resolve0();
                }

                var syncName = "sync"+mode.substring(0,1).toUpperCase() + mode.substring(1);

                var pageCallback = page.$base[mode].bind(page);

                if(page[syncName]){
                    if(routes.aregment){
                        pageCallback(resolve0, routes.aregment);
                    }
                    else{
                        pageCallback(resolve0);
                    }
                }
                else{
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
				},
			],this);

        return page;
    };

	const renderings = function(url, backUrl){

		var routes = searchRendering(url);

		buffer.layout = null;

		this.sync.sync([
			function(resolve){
				if(!backUrl){
					return resolve();
				}
		
				var backRoutes = searchRendering(backUrl);

                loadingPage(resolve, backRoutes, "close", true);
			},
			function(resolve){
				loadingPage(resolve, routes, "before");
			},
			function(resolve){

				if("#" + url != location.hash){
					if(location.hash){
						return;
					}
				}

				var contents = $("[hachiware-contents]");
                
                if(renders.pages[routes.url]){

                    var html = renders.pages[routes.url];
                    html = cond.tool.base64Decode(html);
                    var htmlPage = html;
                }
                else{
                    var htmlPage = $("template[hachiware-page=\"" + routes.url + "\"]").html();
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
                        var htmlLayout = $("template[hachiware-layout=\"" + buffer.layout + "\"]").html();
                    }

					if(htmlLayout){
						contents.html(htmlLayout);
						contents.find("[hachiware-page]").html(htmlPage);
						buffer.pageDom = contents.find("[hachiware-page]");
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
						contents.find("[hachiware-page]").html(htmlPage)[0];
						buffer.pageDom = contents.find("[hachiware-page]");
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

	const searchRendering = function(targetUrl){

		const convertRoutings = function(params){

			var response = {};

			var colums = Object.keys(params);
			for(var n = 0 ; n < colums.length ; n++){
				var key = colums[n];
				var value = params[key];

				if(typeof value == "string"){
					response[key] = value;
				}
				else{
					var buff = convertRoutings(value);
					var colums2 = Object.keys(buff);
					for(var n2 = 0 ; n2 < colums2.length ; n2++){
						var key2 = colums2[n2];
						var value2 = buff[key2];

						var url = key;
						if(key2 != "/"){
							url += key2;
						}

						response[url] = value2;
					}
				}
			}

			return response;
		};

		const searchErrorPagePath = function(targetUrl){

			var declearErrPagePath = null;

			var colums = Object.keys(routings.error);
			for(var n = 0 ; n < colums.length ; n++){
				var key = colums[n];
				var value = routings.error[key];

				if(targetUrl == key){
					declearErrPagePath = value;
					break;
				}
			}

			if(!declearErrPagePath){
				var t2 =targetUrl.split("/");
				t2.shift();
				t2 = t2.join("/");
				if(!t2){
					t2 = "/";
				}
				var search = searchErrorPagePath(t2);
				declearErrPagePath = search;
			}
		
			return declearErrPagePath;
		};

		var routingBuffer = convertRoutings(routings.release);
		
		var colums = Object.keys(routingBuffer);

		var checkList = {};

		var aregments = [];

		for(var n = 0 ; n < colums.length ; n++){
			var url = colums[n];

			var urls = url.split("/");
			if(!urls[urls.length-1]){
				urls.pop();
			}

			var targetUrls = targetUrl.split("/");
			if(!targetUrls[targetUrls.length-1]){
				targetUrls.pop();
			}	

			checkList[url] = [];

			for(var n2 = 0 ; n2 < urls.length ; n2++){
				var urld1 = urls[n2];
				var urld2 = targetUrls[n2];
				
				if(urld1 == urld2){
					checkList[url].push(1);
				}
				else{
					if(urld1.indexOf("{:") > -1 && urld1.indexOf("}") > -1){
						if(urld2){
							var argKey = urld1.split("{:").join("").split("}").join("").split("?").join("");
							aregments[argKey]  = urld2;
							checkList[url].push(1);
						}
						else{
							if(urld1.indexOf("?") > -1){
								targetUrls[n2] = "??";
								checkList[url].push(1);
							}
							else{
								checkList[url].push(0);
							}
						}
					}
					else{
						checkList[url].push(0);
					}
				}
			}

			if(urls.length == targetUrls.length){
				checkList[url].push(1);
			}
			else{
				checkList[url].push(0);
			}
		}

		var desitionUrl = null;
		var colums = Object.keys(checkList);
		for(var n = 0 ; n < colums.length ; n++){
			var url = colums[n];
			var value = checkList[url];

			var juge = true;
			for(var n2 = 0 ; n2 < value.length ; n2++){
				var v_ = value[n2];

				if(!v_){
					juge = false;
					break;
				}
			}

			if(juge){
				desitionUrl = url;
			}
		}

		if(desitionUrl){
			return {
				url:routingBuffer[desitionUrl],
				aregment:aregments,
			};
		}
		else{
			return {
				url:searchErrorPagePath(targetUrl),
                aregment:{
                    exception:"page not found",
                }
			};
		}
	};


	this.redirect = function(url){

		var beforeUrl = buffer.nowUrl;

		url = url.substring(1);

		if(!url){
			url = "/";
		}

		renderings(url, beforeUrl);
	};

	this.load = function(){

		var firstUrl = "/";
		if(location.hash){
			firstUrl = location.hash;
			firstUrl = firstUrl.substring(1);
		}

		this.sync.sync([
			function(resolve){

				if(!settings.load){
					return resolve();
				}
				
				var load = settings.load.bind(settings);

				if(settings.syncLoad){
					load(resolve);
				}
				else{
					load();
					resolve();
				}
			},
			function(resolve){

				renderings(firstUrl);

				window.addEventListener('popstate', function(e){
					cond.redirect(location.hash);
				});

				$("html").on("click","a[href]", function(){
					buffer.modeGo = true;
				});

				$("html").on("click","a[url]",function(){

					var url = $(this).attr("url");

					if(url[url.length-1] == "/"){
						url = url.substring(0, url.length-1);
					}

					buffer.modeGo = true;

					location.hash = url;

					return false;
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
						var formName = $(this).attr("hachiware-form");

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

						form.$el = $("[hachiware-form=\"" + formName + "\"]");

						if(form.$base.submit){
							var submitData = form.getData();
							form.$base.submit(submitData);
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