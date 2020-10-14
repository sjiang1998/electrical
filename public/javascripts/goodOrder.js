
$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});

function detail(_id) {

    $.ajax({
        type: "POST",
        url: "/goodOrder/byid",
        data: {
            _id: _id
        },
        cache: false,
        success: function (data) {
            console.log("data=====================", data[0]);
            let cInfo = data.cname + " ;" + data.ctele + " ;" + data.caddress;
            $("#orderId").val(data._id);
            $("#ordersname").val(data.sname);
            $("#ordercInfo").text(data.cname);
            $("#ordercInfo").attr("data-content", cInfo);
            $("#ordergname").val(data.goodname);
            $("#ordergnum").val(data.goodnum);
            $("#aclick").attr("href", "/goodBuy?id=" + data._id);
        }
    })


}

function find() {
    let sInfo = $("#searchInfo").val();
    $.ajax({
        type: "POST",
        url: "/goodBuy/find",
        data: {
            sInfo: sInfo
        },
        cache: false,
        success: function (data) {
            let tbody = $("#body");
            tbody.empty();

            if (data != 0) {
                if (data.goodstatus == "已下单") {

                    var tr = $("<tr>");
                    var td = $("<td>");
                    td.html("<input type='checkbox' class='check_item'>" + '#' + 1);
                    tr.append(td);


                    var td = $("<td>");
                    td.text(data.sname);
                    tr.append(td);

                    var td = $("<td>");
                    td.text(data._id);
                    tr.append(td);


                    var td = $("<td>");
                    td.text(data.cname);
                    tr.append(td);


                    var td = $("<td>");
                    td.text(data.goodname);
                    tr.append(td);


                    var td = $("<td>");
                    td.text(data.goodnum);
                    tr.append(td);

                    var td = $("<td>");
                    td.html("<div class='form-inline'>" +
                        "<button class='btn btn-block btn-ghost-info col-4' data-toggle='modal' data-target='#myModal' onclick=\"detail('" + data._id + "')\">查看详情</button>" +
                        " <a href=\"/goodBuy?id=" + data._id + "\" class='btn btn-block btn-ghost-success col-4' style='margin:5px'>工厂采购</a>" +
                        "</div> ");
                    tr.append(td);

                    tbody.append(tr);

                } else {
                    let message = confirm("该订单状态不是已下单状态,是否到以采购页面进行查询？");
                    if (message == true) {
                        window.location = "/goodBuy";
                    }
                }



            } else {
                alert("无相关订单！");
            }
        }
    })
}
