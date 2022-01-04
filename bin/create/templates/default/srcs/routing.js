hachiware.routing({
	release:{
		"/":"main",
        "/page_a":"pagea",
        "/page_b":"pageb",
        "/page_c":"pagec",
        "/page_d":"paged",
		"/page_f":{
			"/": "pagef/index",
			"/detail/{:id}": "pagef/detail",
			"/detail2/{:id?}": "pagef/detail2",
		},
		"/section_test":"sectiontest",
		"/section_test_list":"sectiontest_list",
		"/form_test":"formtest",
        /*
		"/page_a": {
			"/" : "page_a",
			"/detail":"page_a/d",
			"/detail2/{:id}":"page_a/d2",
			"/detail3/{:id?}":"page_a/d3",
		},
		"/section_test":"sectiontest",
		"/form_test":"formtest"
        */
	},
	error:{
		"/":"error",
		// "/page_a":"page_a/error",
	},
})