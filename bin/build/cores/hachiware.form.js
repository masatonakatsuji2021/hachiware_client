hachiware.loadForm = function(formName, options){

    if(!options.forms[formName]){
        options.forms[formName] = {};
    }

    var baseMethodList = [
        "submit",
        "reset",
    ];

	return new hachiware.loadCore("forms", formName,options, baseMethodList, function(){

        /**
         * submit
         * @returns 
         */
        this.submit = function(){
            this.getEl();
            this.$el.form();
            return this;
        };

        /**
         * onSubmit
         * @param {*} callback 
         * @returns 
         */
        this.onSubmit = function(callback){
            options.forms[formName].submit = callback;
            return this;
        };

        /**
         * reset
         * @returns 
         */
        this.reset = function(){
            this.getEl();
            this.$el[0].reset();
            return this;
        };

        /**
         * onReset
         * @param {*} callback 
         * @returns 
         */
        this.onReset = function(callback){
            options.forms[formName].reset = callback;
            return this;
        };

        /**
         * getEl
         * @returns 
         */
        this.getEl = function(){
            this.$el = $("[h-form=\"" + formName + "\"]");
            if(!this.$el.length){
                this.$el = $("[hachiware-form=\"" + formName + "\"]");
            }
            return this.$el;
        };
        this.getEl();

        /**
         * getInputDom
         * @param {*} name 
         * @returns 
         */
        this.getInputDom = function(name){
            this.getEl();
            return this.$el.find("[name=\"" + name + "\"]");
        };

        /**
         * setData
         * @param {*} options 
         * @returns 
         */
        this.setData = function(options){

            var colums = Object.keys(options);
    
            this.getEl();
            
            var form = this.$el;
        
            for(var n = 0 ; n < colums.length ; n++){
                var field = colums[n];
                var value = options[field];
    
                if(form.find("[name=\"" + field + "\"]")){
                    var obj = form.find("[name=\"" + field + "\"]");
    
                    if(!obj){
                        obj = form.find("[name=\"" + field + "[]\"]");
                    }
    
                    if(!obj){
                        continue;
                    }
    
                    var nodeName = obj.prop("nodeName");
    
                    if(nodeName == "INPUT"){
        
                        var type = obj.attr("type");
        
                        if(!type){
                            type = "text";
                        }
            
                        if(type == "radio"){
                            for(var n2 = 0 ; n2 < obj.length ; n2++){
                                var o_ = obj.eq(n2);
                                var v_ = o_.val();
    
                                if(v_ == value){
                                    o_.prop("checked",true);
                                }
                            }
                        }
                        else if(type == "checkbox"){
                            
                            if(typeof value == "string"){
                                value = [ value ];
                            }
    
                            for(var n2 = 0 ; n2 < value.length ; n2++){
                                value[n2] = value[n2].toString();
                            }
                            obj.prop("checked",false);
    
                            for(var n2 = 0 ; n2 < obj.length ; n2++){
                                var o_ = obj.eq(n2);
                                var v_ = o_.val();
    
                                if(value.indexOf(v_) > -1){
                                    o_.prop("checked",true);
                                }
                            }
            
                        }
                        else{
                            obj.val(value);
                        }	
                    }
                    else if(nodeName == "TEXTAREA"){
                        obj.val(value);
                    }
                    else if(nodeName == "SELECT"){
                        obj.val(value);
                    }
                }
            }
    
            return this;
        };
    
        /**
         * getData
         * @returns 
         */
        this.getData = function(){
    
            this.getEl();

            var form = this.$el;
    
            var submitData = {};
        
            var inputObj = form.find(" [name]");
        
            for(var n = 0 ; n < inputObj.length ; n++){
                var row = inputObj.eq(n);
        
                var tagName = row.get(0).tagName;
                var name = row.attr("name");
        
                if(tagName == "INPUT"){
                    var type = row.attr("type");
        
                    if(!type){
                        type = "text";
                    }
        
                    if(type == "radio"){
                        var value = form.find(" [name=\"" + name + "\"]:checked").val();
                        if(!value){
                            value = null;
                        }
                        submitData[name] = value;
                    }
                    else if(type == "checkbox"){
                        var values = [];
                        var checkList = form.find(" [name=\"" + name + "\"]:checked");
                        for(var n2 = 0 ; n2 < checkList.length ; n2++){
                            var value = checkList.eq(n2).val();
                            values.push(value);
                        }
                        submitData[name] = values;
                    }
                    else if(type == "file"){
                        var getUid = row.attr("uid");
                        submitData[name] = null;
                        if(__uploadFileBuffer[getUid]){
                            submitData[name] =  __uploadFileBuffer[getUid];
                        }
                    }
                    else{
                        submitData[name] = row.val();
                    }		
                }
                else if(tagName == "SELECT"){
                    submitData[name] = row.val();
                }
                else if(tagName == "TEXTAREA"){
                    submitData[name] = row.val();
                }
            }
        
            return submitData;
        };
    
        /**
         * setSelector
         * @param {*} options 
         * @returns 
         */
        this.setSelector = function(options){

            this.getEl();

            var colums = Object.keys(options);
    
            var form = this.$el;
        
            for(var n = 0 ; n < colums.length ; n++){
                var field = colums[n];
                var value = options[field];
    
                var type = null;
                if(
                    form.find("[h-form-radio=\"" + field + "\"]").length ||
                    form.find("[hachiware-form-radio=\"" + field + "\"]").length
                ){
                    type = "radio";
                    if(form.find("[h-form-radio=\"" + field + "\"]").length){
                        var f_ = form.find("[h-form-radio=\"" + field + "\"]");
                    }
                    else{
                        var f_ = form.find("[hachiware-form-radio=\"" + field + "\"]");
                    }
                }
                else if(
                    form.find("[h-form-checkbox=\"" + field + "\"]").length || 
                    form.find("[hachiware-form-checkbox=\"" + field + "\"]").length
                ){
                    type = "checkbox";
                    if(form.find("[h-form-checkbox=\"" + field + "\"]").length){
                        var f_ = form.find("[h-form-checkbox=\"" + field + "\"]");
                    }
                    else{
                        var f_ = form.find("[hachiware-form-checkbox=\"" + field + "\"]");
                    }
                }
                else if(
                    form.find("[h-form-select=\"" + field + "\"]").length || 
                    form.find("[hachiware-form-select=\"" + field + "\"]").length
                ){
                    type = "select";
                    if(form.find("[h-form-select=\"" + field + "\"]").length){
                        var f_ = form.find("[h-form-select=\"" + field + "\"]");
                    }
                    else{
                        var f_ = form.find("[hachiware-form-select=\"" + field + "\"]");
                    }
                }

                f_.empty();
    
                var colums2 = Object.keys(value);
                for(var n2 = 0 ; n2 < colums2.length ; n2++){
                    var field2 = colums2[n2];
                    var value2 = value[field2];
    
                    var str = "";
                    if(type == "radio"){
                        str += "<label>";
                        str += "<input type=\"radio\" name=\"" + field + "\" value=\"" + field2 + "\">";
                        str += value2;
                        str += "</label>";
                    }
                    else if(type == "checkbox"){
                        str += "<label>";
                        str += "<input type=\"checkbox\" name=\"" + field + "\" value=\"" + field2 + "\">";
                        str += value2;
                        str += "</label>";
                    }
                    else if(type == "select"){
                        str += "<option value=\"" + field2 + "\">" + value2 + "</option>";
                    }
                    
                    f_.append(str);
                }
    
    
            }
    
            return this;
        };   

        /**
         * viewErrors
         * @param {*} errorValidates 
         */
        this.viewErrors = function(errorValidates){

            this.getEl();

            var errorArea = this.$el.find("[h-form-error]");
            if(!errorArea.length){
                errorArea = this.$el.find("[hachiware-form-error]");
            }
            errorArea.empty().removeAttr("mode-active");

            var colums = Object.keys(errorValidates);
            for(var n = 0 ; n < colums.length ; n++){
                var field = colums[n];
                var value = errorValidates[field];

                var errorText = value.join("<br>");

                var errorArea_ = this.$el.find("[h-form-error=\"" + field + "\"]");
                if(!errorArea_.length){
                    errorArea_ = this.$el.find("[hachiware-form-error=\"" + field + "\"]");
                }
                
                errorArea_.attr("mode-active",true).html(errorText);
            }

        };

    });

};