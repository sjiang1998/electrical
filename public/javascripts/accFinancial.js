function find() {
    let sInfo = $("#searchInfo").val();
    $.ajax({
        type: "POST",
        url: "/accFinancial/find",
        data: {
            sInfo: sInfo
        },
        cache: false,
        success: function (data) {
            if (data && data.length > 0) {
                let r1 = $("#r1");
                r1.empty();

                $.each(data, function (index, Info) {
                    if (Info.role == "销售员") {
                        let d1 = $("<div>");
                        d1.addClass('col-sm-6 col-lg-3 s2');


                        let d2 = $("<div>");
                        d2.addClass('card');
                        d2.attr("style", "width:260px;height: 150px;");

                        let d3 = $("<div>");
                        d3.addClass('card-body s1');
                        d3.html("<i class='fa fa-user-circle-o fa-lg mt-3' aria-hidden='true' style='color:#63C2DE'></i>" +
                            "&nbsp;&nbsp;&nbsp;销售员：<span class='sp1'>" + Info.username + "</span>" +
                            "<a class='nav-link active show' href=\"/accView?name=" + Info.username + "\" style='font-size:2.5ex'>" +
                            "<button class='btn btn-clock btn-ghost-primary btn1 my-2 my-sm-0'>查看业绩</button></a>")

                        d2.append(d3);
                        d1.append(d2)
                        r1.append(d1);
                    } else {
                        alert("该用户不是销售员！")
                    }
                })
            } else {
                alert("为查找到该用户！");

            }
        }
    })
}