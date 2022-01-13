hachiware.page("sectiontest",{

    extend: "app",

    open: function(){

        this.$section("test").open("test");

        this.$section("test3").message("メッセージを表示するよ");
    },

});