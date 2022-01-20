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

const CLI = require("hachiware_cli");
const csls = require("./bin/");

module.exports = function(rootPath){

    var cli = new CLI();

    cli.then(function(resolve){
        
        this.outn("*** Hachiware Client **************").br();

        var args = this.getArgs();

        if(args.length){
            if(!csls.bind(this)(rootPath, args, resolve)){
                resolve();
            }
            return;
        }

        this.in("Command Input:", function(value,retry){

            var args = this.convertArgs(value);
            
            if(!args.length){
                this.color.red("[ERROR] ").outn("command not found. retry.");
                return retry();
            }

            if(!csls.bind(this)(rootPath, args, resolve)){
                return retry();
            }

        });

    }).then(function(){
        this.br().outn("... BYE.");
        process.exit();
    }).start();

};