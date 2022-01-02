module.exports = function(rootPath, args, exit){

    if(args[0] == "create"){
        const create = require("./create");
        create.bind(this)(rootPath, args, exit);
    }
    else if(args[0] == "build"){
        const build = require("./build");
        build.bind(this)(rootPath, args, exit);
    }
    else{
        this.color.red("[ERROR] ").outn("\"\" is not exists command.");
        return false;
    }

    return true;

};