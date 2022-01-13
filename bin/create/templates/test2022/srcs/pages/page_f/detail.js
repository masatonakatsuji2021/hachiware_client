hachiware.page("pagef/detail",{

    extend: "app",

    open: function(args){

        this.$el.find(".view_id").text(args.id);
        
        console.log("Page Open Page F Detail id = " + args.id);

    },

});