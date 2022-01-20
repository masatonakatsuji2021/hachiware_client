/**
 * ====================================================================
 * Hachiware_Client
 * 
 * A simple and easy-to-use SPA (Single-Page-Action) framework.
 * 
 * License : MIT License. 
 * Since   : 2022.01.15
 * Author  : Nakatsuji Masato 
 * GitHub  : https://github.com/masatonakatsuji2021/hachiware_client
 * npm     : https://www.npmjs.com/package/hachiware_client
 * 
 * ====================================================================
 */

const hfs = require("hachiware_fs");
const https = require("https");
const path = require("path");
const tool = require("hachiware_tool");

const syncBuildString = require("hachiware_sync/buildString.js");
const toolBuildString = require("hachiware_tool/buildString.js");
const routingBuildString = require("hachiware_routing/buildString.js");
const validatorBuildString = require("hachiware_validator/buildString.js");

module.exports = function(rootPath, args, exitResolve){

    this.outn("Client Build").outn("Start building the SPA project.").br();

    var dirPath = null;

    var buildPath = null;

    var conf = null;

    var outLog = function(str){
        this.color.green("# ").outn(str);  
    };
    outLog = outLog.bind(this);
    var outNgLog = function(str){
        this.color.red("Error ").outn(str);
        this.br(2).outn("...Pause!");
    };
    outNgLog = outNgLog.bind(this);

    this.then(function(resolve){

        if(args.getOpt("project")){
            dirPath = rootPath + "/" + args.getOpt("project");
        }
        else{
            dirPath = rootPath;
        }

        outLog("Build Project = " + dirPath);

        try{
            conf = require(dirPath + "/client.json");

            if(!conf.build){
                conf.build = "_build";
            }

            if(!conf.inputHtml){
                conf.inputHtml = "index.html";
            }
            
            if(!conf.outputHtml){
                conf.outputHtml = "index.html";
            }

            outLog("Read client.json");
        }catch(err){
            outNgLog("\"client.json\" The file does not exist or the file contents are corrupted.");
            return exitResolve();
        }

        buildPath = dirPath + "/" + conf.build;

        if(hfs.existsSync(__dirname + "/__jqueryBuffer")){
            outLog("Jquery Buffer exists.");
            return resolve();
        }

        outLog("Jquery Buffer not exists (get now ...)");

        // get jquery
        var jqueryUrl = "https://code.jquery.com/jquery-3.6.0.min.js";

        var cond = this;
        https.get(jqueryUrl,function(res){

            var getData = "";
            res.on("data",function(stream){
                getData += stream;
            });

            res.on("end",function(){
                cond.color.blue("# ").outn("Jquery save... OK");
                hfs.writeFileSync(__dirname + "/__jqueryBuffer",getData);
                resolve();
            });

        });

    }).then(function(resolve){

        // mkdir build directory
        if(hfs.existsSync(buildPath)){
            outLog("exist " + buildPath);
            hfs.deepDelete(buildPath);
            outLog("clear " + buildPath);
        }

        hfs.mkdirSync(buildPath);
        outLog("Mkdir " + buildPath);    

        // jquery set
        var jqueryStr = hfs.readFileSync(__dirname + "/__jqueryBuffer").toString();
        hfs.writeFileSync(buildPath + "/jquery.min.js", jqueryStr);
        outLog("Jquery Set " + buildPath + "/jquery.min.js");

        // coreLibrary combaine
        var coreList = JSON.parse(hfs.readFileSync(__dirname + "/cores/sort.json"));
        var coreStr = "";
        for(var n = 0 ; n < coreList.length ; n++){
            var c_ = coreList[n];
            var buffStr = hfs.readFileSync(__dirname + "/cores/" + c_).toString();
            coreStr += buffStr + "\n";
            outLog("Read CoreLib " + c_);
        }
        
        // validator build combine
        coreStr += "hachiware.sync = " + syncBuildString();
        outLog("Read/Write CoreScript hachiware_sync");
        coreStr += "hachiware.tool = " + toolBuildString();
        outLog("Read/Write CoreScript hachiware_tool");
        coreStr += "const HachiwareRouting = " + routingBuildString();
        outLog("Read/Write CoreScript hachiware_routing");
        coreStr += validatorBuildString();
        outLog("Read/Write CoreScript hachiware_validator");

        hfs.writeFileSync(buildPath + "/core.js",coreStr);
        outLog("Write CoreScript " + buildPath + "/core.js");

        // directory script combine
        var getSources = hfs.deepReadDir(dirPath + "/srcs");
        var scriptStr = "";
        for(var n = 0 ; n < getSources.file.length ; n++){
            var f_ = getSources.file[n];
            var strBuff = hfs.readFileSync(f_).toString();
            scriptStr += strBuff + "\n";
            outLog("Read ScriptFile " + f_.replace(dirPath,""));
        }

        hfs.appendFileSync(buildPath + "/core.js",scriptStr);
        outLog("Write Script " + buildPath + "/core.js");

        // rendering convert for pages (for base64)
        var str="hachiware.setRenderPage({";
        var pageRenders = hfs.deepReadDir(dirPath + "/htmls/pages");
        for(var n = 0 ; n < pageRenders.file.length ; n++){
            var f_ = pageRenders.file[n];
            var r_ = hfs.readFileSync(f_).toString();
            r_ = tool.base64Encode(r_);
            var p_ = f_.replace(dirPath + "/htmls/pages/","");
            p_ = p_.replace(path.extname(p_),"");
            str += "\"" + p_ + "\": \"" + r_ + "\", ";
        }
        str += "}); \n";
        hfs.appendFileSync(buildPath + "/core.js",str);
        outLog("Write Add convertPages " + buildPath + "/core.js");
        
        // rendering convert for sections (for base64)
        var str="hachiware.setRenderSection({";
        var pageRenders = hfs.deepReadDir(dirPath + "/htmls/sections");
        for(var n = 0 ; n < pageRenders.file.length ; n++){
            var f_ = pageRenders.file[n];
            var r_ = hfs.readFileSync(f_).toString();
            r_ = tool.base64Encode(r_);
            var p_ = f_.replace(dirPath + "/htmls/sections/","");
            p_ = p_.replace(path.extname(p_),"");
            str += "\"" + p_ + "\": \"" + r_ + "\", ";
        }
        str += "}); \n";
        hfs.appendFileSync(buildPath + "/core.js",str);
        outLog("Write Add convertSection " + buildPath + "/core.js");

        // rendering convert for layouts (for base64)
        var str="hachiware.setRenderLayout({";
        var pageRenders = hfs.deepReadDir(dirPath + "/htmls/layouts");
        for(var n = 0 ; n < pageRenders.file.length ; n++){
            var f_ = pageRenders.file[n];
            var r_ = hfs.readFileSync(f_).toString();
            r_ = tool.base64Encode(r_);
            var p_ = f_.replace(dirPath + "/htmls/layouts/","");
            p_ = p_.replace(path.extname(p_),"");
            str += "\"" + p_ + "\": \"" + r_ + "\", ";
        }
        str += "}); \n";
        hfs.appendFileSync(buildPath + "/core.js",str);
        outLog("Write Add convertLayouts " + buildPath + "/core.js");

        var endStr = "$(function(){ hachiware.load(); });";
        hfs.appendFileSync(buildPath + "/core.js",endStr);

        try{
            hfs.deepDelete(buildPath + "/assets");
        }catch(error){}
        hfs.deepCopy(dirPath + "/assets", buildPath + "/assets");
        outLog("Copy Assets Files");

        hfs.copyFileSync(dirPath + "/" + conf.inputHtml, buildPath + "/" + conf.outputHtml);
        outLog("Write " + conf.outputHtml);

        this.br().outn("Build Complete!");

        resolve();
    }).then(function(){
        
        exitResolve();
    }).start();


};