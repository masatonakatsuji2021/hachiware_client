const hfs = require("hachiware_fs");
const https = require("https");
const path = require("path");
const tool = require("hachiware_tool");

const validatorBuild = require("hachiware_validator/build.js");

module.exports = function(rootPath, args, exitResolve){

    this.outn("Client Build").br();

    args.shift();

    var dirPath = null;

    this.then(function(resolve){

        if(hfs.existsSync(rootPath + "/__jqueryBuffer")){
            this.color.blue("# ").outn("Jquery Buffer exists.");
            return resolve();
        }

        this.color.blue("# ").outn("Jquery Buffer not exists (get now ...)");

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
                hfs.writeFileSync(rootPath + "/__jqueryBuffer",getData);
                resolve();
            });

        });

    }).then(function(resolve){

        if(args[0]){
            dirPath = rootPath + "/" + args[0];
        }
        else{
            dirPath = rootPath;
        }

        // mkdir build directory
        if(hfs.existsSync(dirPath + "/_build")){
            this.color.blue("# ").outn("exist /_build");
        }
        else{
            hfs.mkdirSync(dirPath + "/_build");
            this.color.blue("# ").outn("Mkdir /_build");    
        }

        // jquery set
        var jqueryStr = hfs.readFileSync(rootPath + "/__jqueryBuffer").toString();
        hfs.writeFileSync(dirPath + "/_build/jquery.min.js", jqueryStr);
        this.color.blue("# ").outn("Jquery Set");

        // coreLibrary combaine
        var coreList = JSON.parse(hfs.readFileSync(__dirname + "/cores/sort.json"));
        var coreStr = "";
        for(var n = 0 ; n < coreList.length ; n++){
            var c_ = coreList[n];
            var buffStr = hfs.readFileSync(__dirname + "/cores/" + c_).toString();
            coreStr += buffStr + "\n";
            this.color.blue("# ").outn("Read CoreLib " + c_);
        }
        
        // validator build combine
        coreStr += validatorBuild();

        hfs.writeFileSync(dirPath + "/_build/core.js",coreStr);
        this.color.blue("# ").outn("Write CoreScript /_build/core.js");

        // directory script combine
        var getSources = hfs.deepReadDir(dirPath + "/srcs");
        var scriptStr = "";
        for(var n = 0 ; n < getSources.file.length ; n++){
            var f_ = getSources.file[n];
            var strBuff = hfs.readFileSync(f_).toString();
            scriptStr += strBuff + "\n";
            this.color.blue("# ").outn("Read ScriptFile " + f_.replace(dirPath,""));
        }

        hfs.appendFileSync(dirPath + "/_build/core.js",scriptStr);
        this.color.blue("# ").outn("Write Script /_build/core.js");

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
        hfs.appendFileSync(dirPath + "/_build/core.js",str);
        this.color.blue("# ").outn("Write Add convertPages /_build/core.js");
        
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
        hfs.appendFileSync(dirPath + "/_build/core.js",str);
        this.color.blue("# ").outn("Write Add convertSection /_build/core.js");

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
        hfs.appendFileSync(dirPath + "/_build/core.js",str);
        this.color.blue("# ").outn("Write Add convertLayouts /_build/core.js");

        var endStr = "$(function(){ hachiware.load(); });";
        hfs.appendFileSync(dirPath + "/_build/core.js",endStr);

        try{
            hfs.deepDelete(dirPath + "/_build/assets");
        }catch(error){}
        hfs.deepCopy(dirPath + "/assets", dirPath + "/_build/assets");
        this.color.blue("# ").outn("Copy Assets Files");

        hfs.copyFileSync(dirPath + "/index.html", dirPath + "/_build/index.html");
        this.color.blue("# ").outn("Write index.html");

        this.br().outn("Build Complete!");

        resolve();
    }).then(function(){
        
        exitResolve();
    }).start();


};