const hfs = require("hachiware_fs");
const path0 = require("path");

module.exports = function(rootPath, args, exitResolve){

    this.outn("Client Create");

    args.shift();

    this.then(function(resolve){

        this.br();

        if(args[0]){
           return resolve(); 
        }
        
        this.in("Q. There is no directory name to create, specify the directory name. (new_project)", function(value, retry){

            if(!value){
                value = "new_project";
            }

            args.push(value);

            resolve();
        });
    
    }).then(function(resolve){

        this.outn("Directory(Project) Name = " + args[0]);

        if(args[1]){
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

        this.outn("Use Template = " + args[1]);

        var conf = this;

        hfs.deepCopy(__dirname + "/templates/" + args[1], rootPath + "/" + args[0], {
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