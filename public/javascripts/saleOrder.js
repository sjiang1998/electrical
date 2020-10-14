let delId;

// 编辑功能
function edit(_id) {
    $.ajax({
        type: "POST",
        url: "/saleOrder/byid",
        data: {
            _id: _id
        },
        cache: false,
        success: function (data) {
            $("#editcname").val(data.cname);
            $("#editctele").val(data.ctele);
            $("#editcaddress").val(data.caddress);

            $("#editbtn").click(function () {

                let cname = $("#editcname").val();
                let ctele = $("#editctele").val();
                let caddress = $("#editcaddress").val();

                let form = document.getElementsByClassName('needs-validation')[0];
                form.classList.add('was-validated');

                if (form.checkValidity() === true) {
                    $.ajax({
                        type: "POST",
                        url: "/saleOrder/edit",
                        data: {
                            _id: _id,
                            cname: cname,
                            ctele: ctele,
                            caddress: caddress
                        },
                        cache: false,
                        success: function (data) {
                            if (data == 1) {
                                $("#edit").modal('hide');
                                $("#e2").modal('show');
                            }

                        }

                    })
                } else {
                    form.classList.add('was-validated');
                }
            })


        }
    })
}


// 删除功能
function del(_id) {
    delId = _id;
}

function delconfirm() {
    $.ajax({
        type: "POST",
        url: "/saleOrder/del",
        data: {
            _id: delId
        },
        cache: false,
        success: function (data) {
            $("#s1").modal('hide');
            $("#s2").modal('show');
        }
    })
}


// 售后功能
function cservice(_id) {
    $.ajax({
        type: "POST",
        url: "/saleOrder/byid",
        data: {
            _id: _id
        },
        cache: false,
        success: function (data) {

            $("#scname").val(data.cname);
            $("#sctele").val(data.ctele);
            $("#scaddress").val(data.caddress);


        }
    })
}

//查找功能
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

                let span;
                if (data.goodstatus == "已下单") {
                    span = "<span class='badge badge-secondary'>" + data.goodstatus + "</span>";
                } else if (data.goodstatus == "生产中") {
                    span = "<span class='badge badge-danger'>" + data.goodstatus + "</span>";
                } else if (data.goodstatus == "派送中") {
                    span = "<span class='badge badge-warning'>" + data.goodstatus + "</span>";
                } else {
                    span = "<span class='badge badge-success'>" + data.goodstatus + "</span>";
                }


                var tr = $("<tr>");
                var td = $("<td>");
                td.text(data._id);
                tr.append(td);

                var td = $("<td>");
                td.text(data.goodname);
                tr.append(td);

                var td = $("<td>");
                td.text(data.goodnum);
                tr.append(td);

                var td = $("<td>");
                td.text(data.price);
                tr.append(td);

                var td = $("<td>");
                td.text(data.cname);
                tr.append(td);

                var td = $("<td>");
                td.text(data.ctele);
                tr.append(td);

                var td = $("<td>");
                td.text(data.caddress);
                tr.append(td);

                var td = $("<td>");
                td.html(span);
                tr.append(td);

                var td = $("<td>");
                if (data.goodstatus != "已送达") {
                    td.html("<button type='button' class='btn btn-link' data-toggle='modal' data-target='#edit' onclick=\"edit('" + data._id + "')\">编辑</button>" +
                        "<button type='button' class='btn btn-link' data-toggle='modal'>" +
                        "<a href=\"/saleDetail?id=" + data.goodId + "class='btn btn-link px-0'>查看</a></button>" +
                        " <button class='btn btn-link px-0' onclick=\"del('" + data._id + "')\" data-toggle='modal' data-target='#s1'>删除</button>");
                } else {
                    td.html("<button type='button' class='btn btn-link' data-toggle='modal' data-target='#phone' onclick=\"cservice('" + data._id + "')\">售后</button>" +
                        "<a href=\"/saleDetail?id=" + data.goodId + "\" class='btn btn-link px-0'>查看商品详情</a>");
                }

                tr.append(td);
                tbody.append(tr);


            }
        }
    })
}

// 查看商品详情
function look(goodId) {
    $.ajax({
        type: "POST",
        url: "/saleOrder/look",
        data: {
            goodId: goodId
        },
        cache: false,
        success: function (data) {
            console.log("data==============",data);
            $("#lookImg").attr("src",data.gImgurl);
            $("#lookgname").text(data.gname);
            $("#lookgInfo").text(data.gInfo);
            $("#lookmodeln").text(data.gparams[0].modeln);
            $("#lookwarrantly").text(data.gparams[0].warrantly);
            $("#lookpconsum").text(data.gparams[0].pconsum);
            
        }
    })
}

function refreshwin() {
    window.location = "/saleOrder";
}
