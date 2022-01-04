hachiware.page("formtest3",{

    extend: "app",

    open: function(){

        var setSelector = {
            radio:{
                0:"radio 000",
                1:"radio 001",
                2:"radio 002",
            },
            checkbox: {
                0:"checkbox 000",
                1:"checkbox 001",
                2:"checkbox 002",
                3:"checkbox 003",
                4:"checkbox 004",
                5:"checkbox 005",
            },
            select: {
                0:"select 000",
                1:"select 001",
                2:"select 002",
                3:"select 003",
            },
        };

        var setData = {
            radio:1,
            checkbox:[1,3,4],
            select:2,
        };

        this.$form("test")
            .setSelector(setSelector)
            .setData(setData);

    },

});