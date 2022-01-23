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

const fs = require("fs");

module.exports = function(envPath){
 
    fs.copyFileSync(__dirname + "/win32", envPath + "/hachiware_client",);
    fs.copyFileSync(__dirname + "/win32.cmd", envPath + "/hachiware_client.cmd");
    console.log("# install hachiware_client");
};