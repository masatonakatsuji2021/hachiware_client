hachiware.form("validate_test",{

    submit: function(data){

        var validate = this.$validator("validate_test").verify(data);

        if(validate.exists()){
            this.viewErrors(validate.get());
            return;
        }

        this.$redirect("validate_test_complete");
    },

});