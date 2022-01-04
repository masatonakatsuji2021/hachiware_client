const hfs = require("hachiware_fs");
const path0 = require("path");

module.exports = function(rootPath, args, exitResolve){

    this.outn("Client Create").br();

    args.shift();

    this.then(function(resolve){

        if(args[0]){
            return resolve(); 
        }

        this.in("Q. Specify the template name to create. (default)", function(value){

            if(!value){
                value = "default";
            }

            args.push(value);

            resolve();
        });

    }).then(function(resolve){

        this.outn("Use Template = " + args[0]);

        if(args[1]){
            return resolve();
        }
        this.in("Q. If there is a directory name to create, specify it. ()", function(value, retry){
 
             args.push(value);
 
             resolve();
        });

    }).then(function(resolve){

        this.outn("Directory(Project) Name = " + args[0]);

        var conf = this;

        if(args[1]){
            var targetPath = rootPath + "/" + args[1];
        }
        else{
            var targetPath = rootPath;
        }

        hfs.deepCopy(__dirname + "/templates/" + args[0], targetPath, {
            noMkdir: true,
            callbackMkdir: function(path){
                conf.outn("Mkdir " + path);
            },
            callbackCopyFile: function(path, copyPath){
                conf.outn("CopyFile (" + path.replace(__dirname + "/templates/" + args[1],"") + ") " + copyPath);
            },
        });

        this.br(2).outn(".....Complete");

        resolve();

    }).then(function(){

        exitResolve();

    }).start();
};