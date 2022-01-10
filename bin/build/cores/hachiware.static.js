hachiware.loadStatic = function(staticName, options){
    
    if(!options.statics[staticName]){
        return {};
    }

    return options.statics[staticName];
};