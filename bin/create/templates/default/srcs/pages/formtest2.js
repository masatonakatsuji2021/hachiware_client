hachiware.page("formtest2",{

    extend: "app",

    open: function(){

        this.$form("test").setData({
            name:"テスト　太郎",
            memo:"メモを入力....",
            category:2,
            radio:3,
            checkbox:[1,3],
        });

    },

});