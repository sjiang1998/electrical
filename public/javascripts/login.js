function login() {
    let username = $("#username").val();
    let password = $("#password").val();
    let role = $("input[name='roles']:checked").val();


    if (username && password && role) {
        $.ajax({
            type: "POST",
            url: "/login",
            data: {
                username: username,
                password: password,
                role: role
            },
            cache: false,
            success: function (data) {
                //通过js文件传过来的data对不同情况做出反应
                if (data == 0) {
                    alert("未找到该用户！")
                } else if (data == 1) {
                    alert("密码错误！")
                } else if (data == 2) {
                    alert("选择身份不符！")

                } else if (data == 3) {
                    alert("该用户已被禁用！")
                }else {
                    if (role == "超级管理员") {
                        window.location="/superUser";
                        
                    } else if (role == "销售员") {
                        window.location="/";
                        
                    } else if (role == "跟单员") {
                        window.location="/goodOrder";
                       
                    } else {
                        window.location="/accFinancial";
                        
                    }

                }
            }
        });
    } else {
        alert("请把信息填写完整！")
    }

}
