/**
 * ====================================================================
 * Hachiware_Client
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


const hfs = require("hachiware_fs");
const tool = require("hachiware_tool");
const path0 = require("path");
const fs = require("fs");

module.exports = function(rootPath, args, exitResolve){

    this.br().outn("Client Create").outn("Create a new SPA project.").br();

    var option = {};

    const outLog = function(str){
        this.color.orange("# ").outn(str);  
    }.bind(this);


    this.then(function(resolve){

        if(args.getOpt("project")){
            option.project = args.getOpt("project");
            return resolve();
        }

        var projectName = "project_" + tool.getDateFormat("{YYYY}{MM}{DD}{HH}{mm}{ss}");

        this.in("Q. If you have a directory path to create a SPA project, please specify it. (" + projectName + ")", function(value){

            if(!value){
                value = projectName;
            }

            option.project = value;
            resolve();
        });

    }).then(function(resolve){

        if(args.getOpt("platform")){
            option.platform = args.getOpt("platform");
            return resolve();
        }

        this.outn("Q. If you have a platform to use, please specify.");

        this.outData({
            "  web (default)":"Select this to display in a browser",
            "  nw.js":"For developing desktop apps for Windows/Linux/Mac.",
            "  electron":"For developing desktop apps for Windows/Linux/Mac.",
            "  cordova":"For developing smartphone apps for Android/iOS.",
        });

        this.in("Please select from the above. (web)", function(value, retry){

            if(!value){
                value = "web";
            }

            var list = [
                "web",
                "electron",
                "cordova",
                "nw.js",
            ];

            if(list.indexOf(value) == -1){
                this.color.red("[Error] ").outn("Platform \"" + value + "\" is not currently supported. xxxx is not supported. Please retry.");
                return retry();
            }

            option.platform = value;
            resolve();
        });

    }).then(function(resolve){

        if(option.platform == "web"){
            return resolve();
        }

        this.then(function(r2){

            this.in("  Q. Enter the initial version number. (0.0.1)", function(value, retry){

                if(!value){
                    value = "0.0.1";
                }

                option.version = value;

                r2();
            });

        }).then(function(r2){

            if(option.platform == "cordova"){
                return resolve();
            }

            this.in("  Q. Enter the width of the window. (640)", function(value, retry){
                
                if(!value){
                    value = 640;
                }

                if(parseInt(value) === NaN){
                    this.color.red("    [Error] ").outn("Not a number. retry.");
                    return retry();
                }

                option.width = value;

                r2();
            });

        }).then(function(r2){

            this.in("  Q. Enter the height of the window. (480)", function(value, retry){
                
                if(!value){
                    value = 480;
                }

                if(parseInt(value) === NaN){
                    this.color.red("    [Error] ").outn("Not a number. retry.");
                    return retry();
                }

                option.height = value;

                r2();
            });

        }).then(function(){

            this.in("  Q. Do you want to show the toolbar? [y/n] (y)", function(value, retry){
                
                if(!value){
                    value = "y";
                }

                value = value.toLowerCase();

                option.toolbar = false;
                if(value == "y"){
                    option.toolbar = true;
                }

                resolve();
            });
            
        }).start();
        

    }).then(function(resolve){

        if(args.getOpt("build")){
            option.build = args.getOpt("build");
            return resolve();
        }
        
        this.in("Q. Do you want to run the build after completing the SPA project creation? [y/n] (y) ", function(value, retry){

            if(!value){
                value = "y";
            }

            value = value.toLowerCase();

            option.build = false;
            if(value == "y"){
                option.build = true;
            }

            resolve();

        });

    }).then(function(resolve){

        if(option.platform == "web"){
            return resolve();
        }

        if(!option.build){
            return resolve();
        }

        this.in("  Q. Do you want \"" + option.platform + "\" to start automatically after the SPA build is complete? [y/n] (y)", function(value){

            if(!value){
                value = "y";
            }

            value = value.toLowerCase();

            option.autoRun = false;
            if(value == "y"){
                option.autoRun = true;
            }

            resolve();
        });

    }).then(function(resolve){

        var outData = {
            "SPA Project Name": option.project,
            "Platform":option.platform,
            "Build after creation is complete":option.build, 
        };

        if(option.autoRun != undefined){
            outData["  Auto Run"] = option.autoRun;
        }

        if(
            option.platform == "nw.js" ||
            option.platform == "electron" ||
            option.platform == "cordova"
        ){

            outData[""] = "";

            outData["[" + option.platform + "]"] = {
                version: option.version,
            };

            if(
                option.platform == "nw.js" ||
                option.platform == "electron"
            ){
                outData["[" + option.platform + "]"].width = option.width;
                outData["[" + option.platform + "]"].height = option.height;
                outData["[" + option.platform + "]"].toolbar = option.toolbar;        
            }
        }

        this.outData(outData);

        this.in("Q.Create a SPA project with the above contents. [y/n] (y)", function(value){

            if(!value){
                value = "y";
            }

            value = value.toLowerCase();

            option.enable = false;
            if(value == "y"){
                option.enable = true;
            }

            resolve();
        });

    }).then(function(resolve){

        if(!option.enable){
            return resolve();
        }

        if(option.project){
            var targetPath = rootPath + "/" + option.project;
        }
        else{
            var targetPath = rootPath;
        }

        outLog("Image Copy Start..");

        var opt = {
            callbackMkdir: function(path){
                outLog("Set Dir " + path);
            },
            callbackCopyFile: function(copyPath){
                outLog("Set File " + copyPath);
            },
        };

        if(!option.project){
            opt.noMkdir = true;
        }

        hfs.deepCopy(__dirname + "/templates", targetPath, opt);

        outLog("Image Copy exit..");

        var packages = {
            client: {
                name: option.project,
                platform: option.platform,
                inputHtml: "index.html",
                outputHtml: "index.html",
                build:"__build",
            },
        };

        if(option.platform == "nw.js"){

            packages.client.autoRun = option.autoRun ? true : false;

            packages.scripts = {
                start: "nw __build",
            };

            var packagesNwjs = {
                name: option.project,
                version: option.version,
                main:"_dist/index.html",
                window:{
                    title: option.project,
                    width: option.width,
                    height: option.height,
                    toolbar: option.toolbar,
                },
            };
            fs.writeFileSync(targetPath + "/package-nwjs.json", JSON.stringify(packagesNwjs, null, "    "));
        }
        else if(option.platform == "electron"){

            packages.client.autoRun = option.autoRun ? true : false;

            packages.scripts = {
                start: "electron __build",
            };

            var loadElectron = fs.readFileSync(__dirname + "/load-electron.js").toString();

            loadElectron = loadElectron.replace("{width}", option.width);
            loadElectron = loadElectron.replace("{height}", option.height);
            loadElectron = loadElectron.replace("{toolbar}", option.toolbar ? true : false);

            fs.writeFileSync(targetPath + "/load-electron.js", loadElectron);
        }
        else if(option.platform == "cordova"){




        }

        fs.writeFileSync(targetPath + "/package.json", JSON.stringify(packages, null, "    "));

        if(!option.build){
            return resolve();
        }

        this.br(2).outn(".... Create Completed!").br();

        var newArgStr = "";
        if(option.project){
            newArgStr = "-project=" + option.project;
        }

        var newArgs = this.convertArgs(newArgStr);

        const build = require("../build");
        build.bind(this)(rootPath, newArgs, resolve);

    }).then(function(){

        if(option.enable){
            this.br(2).outn(".....Completed!");
        }
        else{
            this.br(2).outn(".....Canceled.");
        }
        
        exitResolve();

    }).start();
};