hachiware.page("redirecttest",{

    before: function(){

        console.log("Page Before RedirectTest");

        this.$redirect("page_a", true);
    },

});