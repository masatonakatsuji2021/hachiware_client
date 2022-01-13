hachiware.page("pagea",{

    extend: "app",

    open: function(){

        this.$setView({
            name:"Yamada Tarou",
            age:{
                text:36,
                css:{
                    color:"#d80",
                    "font-size":"20px",
                },
            },
            memo:{
                html: "Text Sample Text Text...<br>Text Text..",
            },
        });

        console.log("Page Open PageA");
    },

})