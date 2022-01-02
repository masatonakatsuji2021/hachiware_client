const CLI = require("hachiware_cli");
const csls = require("./bin/");

module.exports = function(rootPath, command){

    var cli = new CLI();

    cli.then(function(resolve){

        this.outn("*** Hachiware Client **************").br();

        if(command){
            if(!csls.bind(rootPath, command, resolve)){
                resolve();
            };
            return;
        }

        var args = this.getArgs();

        if(args){
            if(!csls.bind(rootPath, args, resolve)){
                resolve();
            }
            return;
        }

        this.in("Command Input:", function(value,retry){

            if(!value){
                this.color.red("[ERROR] ").ount("command not found. retry.");
                return retry();
            }

            value = value.split(" ");
            if(!csls.bind(this)(rootPath, value, resolve)){
                return retry();
            }

        });

    }).then(function(){
        this.br().outn("... BYE.");
        process.exit();
    }).start();

};