hachiware.page("pageb",{

    extend: "app",

    syncBefore: true,

    before:function(resolve){

        console.log("Page Open PageB");

        setTimeout(function(){

            console.log(" .... 500ms timeouted.");
            resolve();

        },500);

    },

})