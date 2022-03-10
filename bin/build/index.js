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
const https = require("https");
const path = require("path");
const tool = require("hachiware_tool");

const syncBuildString = require("hachiware_sync/buildString.js");
const toolBuildString = require("hachiware_tool/buildString.js");
const routingBuildString = require("hachiware_routing/buildString.js");
const validatorBuildString = require("hachiware_validator/buildString.js");
const { dirname } = require("path");

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
            conf = require(dirPath + "/package.json");

            outLog("Read package.json");

            if(!conf.client){
                throw Error("not found 1");
            }

            if(
                !conf.client.platform ||
                !conf.client.build ||
                !conf.client.inputHtml ||
                !conf.client.outputHtml
            ){
                throw Error("not found 2");
            }

        }catch(err){
            outNgLog("\"package.json\" The file does not exist or the file contents are corrupted.");
            return exitResolve();
        }

        if(
            conf.client.platform == "nw.js" ||
            conf.client.platform == "electron" || 
            conf.client.platform == "cordova"
        ){
            buildPath = dirPath + "/" + conf.client.build + "/_dist";
        }        
        else{
            buildPath = dirPath + "/" + conf.client.build;
        }

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

        hfs.mkdirSync(buildPath, {
            recursive: true,
        });
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

        if(conf.client.modules){
            for(var n = 0 ; n < conf.client.modules.length ; n++){
                var m = conf.client.modules[n];

                var mpath = null;

                try{
                    mpath = require.resolve("hachiware_client_module_" + m + "/src");
                }catch(error){}

                try{
                    mpath = require.resolve(m + "/src");
                }catch(error){}

                if(!mpath){
                    continue;
                }

                var mString = hfs.readFileSync(mpath).toString();
                str += mString + "\n";
                outLog("Write Add client module \"" + m + "\".");
            }
        }

        hfs.appendFileSync(buildPath + "/core.js",str);
        outLog("Write Add convertLayouts " + buildPath + "/core.js");

        var endStr = "$(function(){ hachiware.load(); });";
        hfs.appendFileSync(buildPath + "/core.js",endStr);

        try{
            hfs.deepDelete(buildPath + "/assets");
        }catch(error){}
        hfs.deepCopy(dirPath + "/assets", buildPath + "/assets");
        outLog("Copy Assets Files");

        hfs.copyFileSync(dirPath + "/" + conf.client.inputHtml, buildPath + "/" + conf.client.outputHtml);
        outLog("Write " + conf.client.outputHtml);

        this.br().outn("HTML Build Complete!");

        if(conf.client.platform == "nw.js"){
            // nw.js 
            hfs.copyFileSync(dirPath + "/package-nwjs.json", path.dirname(buildPath) + "/package.json");
            outLog("copy package-nwjs.json -> " + conf.client.build + "/package.json");

            if(conf.client.autoRun){
                const { execSync } = require("child_process");
                execSync("nw " + path.dirname(buildPath));    
            }
        }
        else if(conf.client.platform == "electron"){
            // electron
            var getTop = hfs.readFileSync(buildPath + "/" + conf.client.outputHtml).toString();

            getTop = getTop.replace("<script src=\"jquery.min.js\"></script>","<script>const $ = require(\"./jquery.min.js\")</script>");

            hfs.writeFileSync(buildPath + "/" + conf.client.outputHtml, getTop);

            hfs.copyFileSync(dirPath + "/load-electron.js", path.dirname(buildPath) + "/index.js");
            outLog("copy load-electron.json -> " + conf.client.build + "/iindex.js");

            if(conf.client.autoRun){
                const { execSync } = require("child_process");
                execSync("electron " + path.dirname(buildPath));
            }
        }
        else if(conf.client.platform == "cordova"){

            // cordova build...


        }

        resolve();
    }).then(function(){
        
        exitResolve();
    }).start();


};