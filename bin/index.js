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

module.exports = function(rootPath, args, exit){

    var cmd = args.get(0);

    if(cmd == "create"){
        const create = require("./create");
        create.bind(this)(rootPath, args, exit);
    }
    else if(cmd == "build"){
        const build = require("./build");
        build.bind(this)(rootPath, args, exit);
    }
    else{
        this.color.red("[ERROR] ").outn("\"" + cmd + "\" is not exists command.");
        return false;
    }

    return true;
};