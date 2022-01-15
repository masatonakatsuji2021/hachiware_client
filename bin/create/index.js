/**
 * ====================================================================
 * Hachiware_Client
 * 
 * A simple and easy-to-use SPA (Single-Page-Action) framework.
 * 
 * Author : Nakatsuji Masato 
 * Copylight (C) 2022 Nakatsuji Masato.
 * GitHub : https://github.com/masatonakatsuji2021/hachiware_client
 * 
 * ====================================================================
 */

const hfs = require("hachiware_fs");
const path0 = require("path");
const fs = require("fs");

module.exports = function(rootPath, args, exitResolve){

    this.br().outn("Client Create").outn("Create a new SPA project.").br();

    var option = {};

    this.then(function(resolve){

        if(args.getOpt("image")){
            option.image = args.getOpt("image");
            return resolve();
        }

        this.in("Q. Specify the Image Name to create. (default)", function(value, retry){

            if(!value){
                value = "default";
            }

            if(!fs.existsSync(__dirname + "/templates/" + value)){
                this.color.red("[Error] ").outn("The image \"" + value + "\" was not found. please retry.");
                return retry();
            }

            option.image = value;
            resolve();
        });
    
    }).then(function(resolve){

        if(args.getOpt("project")){
            option.project = args.getOpt("project");
            return resolve();
        }

        this.in("Q. If you have a directory path to create a SPA project, please specify it. ()", function(value){

            if(!value){
                value = null;
            }

            option.project = value;
            resolve();
        });

    }).then(function(resolve){

        if(args.getOpt("platform")){
            option.platform = args.getOpt("platform");
            return resolve();
        }

        this.in("Q. If you have a platform to use, please specify. [web, electron, cordova, nw.js] (web)", function(value, retry){

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

        this.outData({
            "Image": option.image,
            "SPA Project Name": option.project,
            "Platform":option.platform,
            "Build after creation is complete":option.build, 
        });

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

        var conf = this;

        if(option.project){
            var targetPath = rootPath + "/" + option.project;
        }
        else{
            var targetPath = rootPath;
        }

        var opt = {
            callbackMkdir: function(path){
                conf.outn("Mkdir " + path);
            },
            callbackCopyFile: function(path, copyPath){
                conf.outn("CopyFile (" + path.replace(__dirname + "/templates/" + option.image,"") + ") " + copyPath);
            },
        };

        if(!option.project){
            opt.noMkdir = true;
        }

        hfs.deepCopy(__dirname + "/templates/" + option.image, targetPath, opt);

        if(!option.build){
            return resolve();
        }

        this.br(2).outn(".... Create Completed!").br();

        const build = require("../build");
        build.bind(this)(rootPath, args, resolve);

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