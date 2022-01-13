hachiware.page("pagef/detail2",{

    extend: "app",

    open: function(args){

        this.$el.find(".view_id").text(args.id);
        
        console.log("Page Open Page F Detail2 id = " + args.id);

    },

});