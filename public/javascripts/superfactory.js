// 新增商家
function add() {

    let fname = $("#addfname").val();
    let faddress = $("#addfaddress").val();
    let gname = $("#addgname").val();
    let fprice = $("#addfprice").val();


    var form = document.getElementsByClassName('needs-validation')[0];
    form.classList.add('was-validated');

    if (form.checkValidity() === true) {

        $.ajax({
            type: "POST",
            url: "/superFactory/add",
            data: {
                fname: fname,
                faddress: faddress,
                gname: gname,
                fprice: fprice
            },
            cache: false,
            success: function (data) {
                if (data == 1) {
                    $("#add").modal('hide');
                    $("#adds").modal('show');
                } else {
                    var message = confirm("已经存在该商家的商品，是否新增地址？")
                    if (message == true) {
                        $("#add").modal('hide');
                        $("#edit").modal('show');
                        $("#staticBackdropLabel").text("新增");
                        $("#editbtn").attr("disabled", "disabled");
                        $("#editfname").val(fname);
                        $("#editgname").val(gname);
                    }
                }
            }
        });

    } else {
        form.classList.add('was-validated');
    }
};

// 编辑商家地址
function edit(_id) {
    console.log(_id);

    $("#editbtn").removeAttr("disabled");

    $.ajax({
        type: "POST",
        url: "/superFactory/byid",
        data: {
            _id: _id
        },
        cache: false,
        success: function (data) {
            $("#editfname").val(data.fname);
            $("#editgname").val(data.gname);
            $("#editfaddress").val(data.faddress);



            $("#editbtn").click(function () {
                let editfname = $("#editfname").val();
                let editgname = $("#editgname").val();
                let editfaddress = $("#editfaddress").val();

                $.ajax({
                    type: "POST",
                    url: "/superFactory/edit",
                    data: {
                        _id: _id,
                        fname: editfname,
                        gname: editgname,
                        faddress: editfaddress
                    },
                    cache: false,
                    success: function (data) {
                        if (data == 0) {
                            alert("已存在该地址，请重新输入！")
                        } else {
                            $("#edit").modal('hide');
                            $("#edits").modal('show');
                            $("#span1").text("编辑成功！")

                        }

                    }
                })
            });

            $("#addbtn").click(function () {
                let editfname = $("#editfname").val();
                let editgname = $("#editgname").val();
                let editfaddress = $("#editfaddress").val();

                $.ajax({
                    type: "POST",
                    url: "/superFactory/addressadd",
                    data: {
                        fname: editfname,
                        gname: editgname,
                        faddress: editfaddress,
                        fcost: data.fcost
                    },
                    cache: false,
                    success: function (data) {
                        if (data == 0) {
                            alert("已存在该地址，请重新输入！")
                        } else {
                            $("#edit").modal('hide');
                            $("#edits").modal('show');
                            $("#span1").text("新增成功！")
                        }

                    }
                })

            })
        }
    })
}

function find() {
    var sfname = $("#sfname").val();
    var sgname = $("#sgname").val();

    if (sfname && sgname) {
        $.ajax({
            type: "POST",
            url: "/superFactory/find",
            data: {
                sfname: sfname,
                sgname: sgname
            },
            cache: false,
            success: function (data) {
                if (data && data.length > 0) {

                    var tbody = $("#body");
                    tbody.empty();
                    $.each(data, function (index, Info) {
                        console.log(index);
                        var tr = $("<tr>");
                        var td = $("<td>");
                        td.html("<input type='checkbox' class='check_item'>" + '#' + index + 1);
                        tr.append(td);

                        var td = $("<td>");
                        td.text(Info.fname);
                        tr.append(td);


                        var td = $("<td>");
                        td.text(Info.faddress);
                        tr.append(td);

                        var td = $("<td>");
                        td.text(Info.gname);
                        tr.append(td);

                        var td = $("<td>");
                        td.text(Info.fcost);
                        tr.append(td);

                        var td = $("<td>");
                        td.html("<button class='btn btn-primary' onclick=\"edit('" + Info._id + "')\" data-toggle='modal' data-target='#edit'>" + "修改" + "</button>&nbsp;&nbsp;" +
                            "<button class='btn btn-danger' onclick=\"dele('" + Info._id + "')\" data-toggle='modal' data-target='#d1'>" + "删除" + "</button>&nbsp;&nbsp;");


                        tr.append(td)
                        tbody.append(tr);


                    })
                } else {
                    alert("未查找到相应工厂！");
                }
            }
        })
    }
}

//删除
function dele(id) {
    deleId = id;
}
function delconfirm() {
    $.ajax({
        type: "POST",
        url: "/superfactory/del",
        data: {
            _id: deleId
        },
        cache: false,
        success: function (data) {
            if (data == 1) {
                $('#d1').modal('hide');
                $('#d2').modal('show');
            }
        }
    })
}



function refreshwin() {
    window.location = "/superFactory";
}
