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

const { execSync } = require('child_process');
const fs = require("fs");

module.exports = function(){

    var binPath = execSync("npm bin -g").toString().trim();

    var source_hs = __dirname + "/linux_gcli.js";
    var path_hs = binPath + "/hachiware_client";

    execSync("chmod 0755 " + source_hs);
    
    if(fs.existsSync(path_hs)){
        fs.unlinkSync(path_hs);
    }
    execSync("ln -s " + source_hs + " " + path_hs);
    execSync("chmod 0755 " + path_hs);
    console.log("# install hachiware_client");
};