hachiware.loadPage = function(pageName, pages){

    this.$name = pageName;
    
    this.$base = {};

    if(pages[pageName]){
		var colums = Object.keys(pages[pageName]);
		for(var n = 0 ; n < colums.length ; n++){
			var field = colums[n];
			var value = pages[pageName][field];
			
			if(
                field == "before" || 
				field == "open" || 
				field == "close"
			){
				this.$base[field] = value;
			}
			else{
				this[field] = value;	
			}
		}
	}

};