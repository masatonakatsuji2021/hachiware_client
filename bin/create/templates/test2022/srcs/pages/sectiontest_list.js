hachiware.page("sectiontest_list",{

    extend: "app",

    open: function(){

        var section = this.$section("test2");
        this.$el.find(".btn_add").on("click",function(){

            section.append("lists");

            section.$el.find(".btn_delete").attr("delete-index",section.increment);
            section.$el.find(".view_index").text(section.increment);

            section.$el.find(".btn_delete").on("click",function(){                
                section.close($(this).attr("delete-index"));
            });
        
        });
    },

});