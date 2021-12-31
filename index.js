const CLI = require("hachiware_cli");

module.exports = function(rootPath){


    var cli = new CLI();

    cli.then(function(resolve){

        this.outn("*** Hachiware Client **************").br();

        var args = this.getArgs();

        if(args){
            if(args[0] == "create"){
                const create = require("./bin/create");
                create.bind(this)(rootPath, args, resolve);
            }
            else if(args[0] == "build"){
                const build = require("./bin/build");
                build.bind(this)(rootPath, args, resolve);
            }
            else{
                this.color.red("[ERROR] ").outn("\"" + args[0] + "\" is not exists command.");
                resolve();
            }
        }
        else{


            
            resolve();
        }

    }).then(function(){
        process.exit();
    }).start();

};