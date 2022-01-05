hachiware.loadRedirect = function(url, replaced){
    if(replaced){
        location.replace("#/" + url);
    }
    else{
        location.href = "#/" + url;
    }
};
hachiware.loadBack = function(){
    history.back();
};