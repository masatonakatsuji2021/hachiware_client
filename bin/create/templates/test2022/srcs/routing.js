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
		"/form_test2":"formtest2",
		"/form_test3":"formtest3",
		"/redirect_test":"redirecttest",
		"/validate_test":"validate_test",
		"/validate_test_complete": "validate_test_complete",
	},
	error:{
		"/":"error",
		// "/page_a":"page_a/error",
	},
})