hachiware.sync = {

	/**
	 * sync
	 * @param {*} callbackList 
	 * @param {*} context 
	 * @returns 
	 */
     sync : function(callbackList, context){

		var index = 0;

		const resolve = function(){	
			index++;

			if(!callbackList[index - 1]){
				return;
			}

			var _call = callbackList[index - 1];

			if(context){
				_call = _call.bind(context);
			}

			_call(resolve);
		};

		resolve();

		return this;
	},

	/**
	 * then
	 * @param {*} callback 
	 * @param {*} context 
	 */
	then: function(callback, context){

		var index = 0;
		var callbackList = [];

		const resolve = function(){
			index++;

			if(!callbackList[index]){
				return;	
			}

			callbackList[index](resolve);
		};

		const _this = {
			then: function(callback){
				if(context){
					callback = callback.bind(context);
				}

				callbackList.push(callback);

				return this;
			},
			start: function(){
				callbackList[0](resolve);
			},
		};

		return _this.then(callback);
	},


    /**
     * for
     * @param {*} start 
     * @param {*} end 
     * @param {*} callback 
     * @param {*} completeCallback 
     * @param {*} context 
     */
	 for : function(start, end, callback, completeCallback, context){

        var index = start;

        const resolve = function(){
            index++;

            if(index <= end){

                if(context){
                    callback = callback.bind(context);
                }

                callback(resolve, index - 1);
            }
            else{

                if(!completeCallback){
                    return;
                }

                if(context){
                    completeCallback = completeCallback.bind(context);
                }

                completeCallback();
            }
        };

        resolve();
    },

	/**
	 * loop
	 * @param {*} callback 
	 * @param {*} completeCallback 
	 * @param {*} context 
	 */
	loop : function(callback, completeCallback, context){

		var index = 0;

		if(context){
			callback = callback.bind(context);
		}

		const resolve = function(completed){

			if(completed){
				if(!completeCallback){
					return;
				}

				if(context){
					completeCallback = completeCallback.bind(context);
				}

				completeCallback();
			}
			else{
				callback(resolve);
				index++;
			}
		};

		resolve();
	},

    /**
     * foreach
     * @param {*} arrayList 
     * @param {*} callback 
     * @param {*} completeCallback 
     * @param {*} context 
     */
    foreach : function(arrayList, callback, completeCallback, context){

        var colums = Object.keys(arrayList);

        var index = 0;

        const resolve = function(){
            index++;

            if(index <= colums.length){

                if(context){
                    callback = callback.bind(context);
                }

                var key = colums[index - 1];
                var value = arrayList[key];

                callback(resolve, value, key);
            }
            else{

                if(!completeCallback){
                    return;
                }

                if(context){
                    completeCallback = completeCallback.bind(context);
                }

                completeCallback();
            }
        };

        resolve();
    },

    /**
     * asyncWait
     * @param {*} callbackList 
     * @param {*} completeCallback 
     * @param {*} context 
     */
    asyncWait: function(callbackList, completeCallback, context){

        var completeCount = 0;

        const resolve = function(){

            completeCount++;

            if(completeCount == callbackList.length){

                if(context){
                    completeCallback = completeCallback.bind(context);
                }
                completeCallback();
            }
        };

        for(var n = 0 ; n < callbackList.length ; n++){

            var _call = callbackList[n];

            if(context){
                _call = _call.bind(context);
            }

            _call(resolve);
        }
    },
};