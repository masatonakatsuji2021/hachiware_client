hachiware.validator("test",{

    name: [
        {
            rule: "require",
            message:"nameが未入力",
        },
        {
            rule: ["maxLength", 100],
            message:"100文字以内で入力してください",
        },
    ],

});