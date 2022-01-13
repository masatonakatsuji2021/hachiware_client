hachiware.section("test3",{

    message: function(message){
        console.log(this);
        this.open("messages");
        this.$el.find(".message").text(message);
    },

});