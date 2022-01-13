hachiware.page("main",{

    extend: "app",

    before: function(){

        console.log(this);
        console.log("Page Before Main.");
    },

    open: function(){

        console.log("Page Open Main.");
    },

});