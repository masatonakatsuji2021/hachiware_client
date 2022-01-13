hachiware.validator("validate_test",{

    rules: {
        name:[
            {
                rule: "required",
                message:"nameが未入力",
            },
            {
                rule:"required",
                message:"nameが入力されてないよ",
            },
            {
                rule: ["maxLength", 100],
                message:"100文字以内で入力してください",
            },
        ],
        value:[
            "required",
        ],
    },

});