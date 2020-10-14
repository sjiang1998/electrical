let delId;

function addtion() {
    var formdata = new FormData();
    var flag = 0;

    let gname = $("#addGname").val();
    let fname = $("#addFname").val();
    let gtype = $("#addtype").val();
    let gprice = $("#addPrice").val();
    let modeln = $("#modeln").val();
    let warrantly = $("#warrantly").val();
    let pconsum = $("#pconsum").val();
    let gInfo = $("#addInfo").val();

    let photo = $("#file-input").val();
    let file = $("#file-input")[0].files[0];

    var form = document.getElementsByClassName('needs-validation')[0];
    form.classList.add('was-validated');

    if (photo.length) {
        flag = 1;
    } else {
        flag = 0;
    }

    if (flag) {
        if (form.checkValidity() === true) {
            formdata.append("gname", gname);
            formdata.append("fname", fname);
            formdata.append("gtype", gtype);
            formdata.append("gprice", gprice);
            formdata.append("modeln", modeln);
            formdata.append("warrantly", warrantly);
            formdata.append("pconsum", pconsum);
            formdata.append("gInfo", gInfo);
            formdata.append("gImgurl", file);

            $.ajax({
                type: "POST",
                url: "/superGood/add",
                data: formdata,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        var message = confirm("未有厂家提供此商品，是否前往厂家端新增信息？")
                        if (message == true) {
                            window.location = "/superFactory";
                        }
                    } else if (data == 1) {
                        alert("已存在该商品，请重新输入！")
                    } else if (data == 3) {
                        alert("售价不能低于成本价！请重新输入！")
                    } else {
                        $("#a1").modal('hide');
                        $("#a2").modal('show');
                    }
                }
            })



        } else {
            form.classList.add('was-validated');
        }

    } else {
        alert("请选择图片！")
    }
}


function del(_id) {
    console.log(_id);
    delId = _id;
}


function delconfirm() {

    $.ajax({
        type: "POST",
        url: "/superGood/del",
        data: {
            _id: delId
        },
        cache: false,
        success: function (data) {
            if (data == 1) {
                $("#s1").modal('hide');
                $("#s2").modal('show');
            }
        }
    })

}

function edit(_id) {

    $.ajax({
        type: "POST",
        url: "/superGood/byid",
        data: {
            _id: _id
        },
        cache: false,
        success: function (data) {

            $("#editgname").val(data.gname);
            $("#editfname").val(data.fname);
            $("#editgtype").val(data.gtype);
            $("#editgprice").val(data.gprice);
            $("#emodeln").val(data.gparams[0].modeln);
            $("#ewarrantly").val(data.gparams[0].warrantly);
            $("#epconsum").val(data.gparams[0].pconsum);
            $("#editgInfo").val(data.gInfo);



            $("#editbtn").click(function () {
                let formdata = new FormData();
                let gImgurl;
                let gname = $("#editgname").val();
                let fname = $("#editfname").val();
                let gprice = $("#editgprice").val();
                let gInfo = $("#editgInfo").val();
                let modeln = $("#emodeln").val();
                let warrantly = $("#ewarrantly").val();
                let pconsum = $("#epconsum").val();
                let photo = $("#edit-file").val();
                if (photo.length) {
                    gImgurl = $("#edit-file")[0].files[0];

                } else {
                    gImgurl = data.gImgurl;
                }

                formdata.append("_id", data._id);
                formdata.append("gname", gname);
                formdata.append("fname", fname);
                formdata.append("gprice", gprice);
                formdata.append("gInfo", gInfo);
                formdata.append("modeln", modeln);
                formdata.append("warrantly", warrantly);
                formdata.append("pconsum", pconsum);
                formdata.append("gImgurl", gImgurl);
                let form = document.getElementsByClassName('needs-validation1')[0];
                form.classList.add('was-validated');

                if (form.checkValidity() === true) {
                    $.ajax({
                        type: "POST",
                        url: "/superGood/edit",
                        data: formdata,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            if (data == 1) {
                                $("#e1").modal('hide');
                                $("#e2").modal('show');
                            } else {
                                alert("售价不能低于成本价！请重新输入！")
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

function look(_id) {
    $.ajax({
        type: "POST",
        url: "/superGood/byid",
        data: {
            _id: _id
        },
        cache: false,
        success: function (data) {
            $("#fgname").val(data.gname);
            $("#ffname").val(data.fname);
            $("#fgtype").val(data.gtype);
            $("#fgprice").val(data.gprice);
            $("#fmodeln").val(data.gparams[0].modeln);
            $("#fwarrantly").val(data.gparams[0].warrantly);
            $("#fpconsum").val(data.gparams[0].pconsum);
            $("#fgInfo").val(data.gInfo)

        }

    })

}

function find() {
    let sInfo = $("#searchInfo").val();
    $.ajax({
        type: "POST",
        url: "/superGood/find",
        data: {
            sInfo: sInfo
        },
        cache: false,
        success: function (data) {
            console.log(data);
            if (data && data.length > 0) {
                let tbody = $("#body");
                tbody.empty();
                $.each(data, function (index, Info) {
                    var tr = $("<tr>");
                    var td = $("<td>");
                    td.html("<input type='checkbox' class='check_item'>" + '#' + index + 1);
                    tr.append(td);

                    // 商品名:gname
                    var td = $("<td>");
                    td.text(Info.gname);
                    tr.append(td);
                    // 厂家名:fname
                    var td = $("<td>");
                    td.text(Info.fname);
                    tr.append(td);

                    // 售价:gprice
                    var td = $("<td>");
                    td.text(Info.gprice);
                    tr.append(td);



                    // 商品简介:gInfo
                    var td = $("<td>");
                    td.text(Info.gInfo);
                    tr.append(td);

                    // 商品图片:gImgurl
                    var td = $("<td>");
                    td.attr("id", "gImgurl");
                    td.html("<img src='" + Info.gImgurl + "'style='width: 100px;height:90px'>");
                    tr.append(td);

                    // 操作
                    var td = $("<td>");

                    td.html("<button class='btn btn-link px-0' onclick=\"del('" + Info._id + "')\" data-toggle='modal' data-target='#s1'>" + "下架" + "</button>&nbsp;&nbsp;" +
                        "<button class='btn btn-link px-0' onclick=\"edit('" + Info._id + "')\" data-toggle='modal' data-target='#e1'>" + "修改" + "</button>&nbsp;&nbsp;" +
                        "<button class='btn btn-link px-0' onclick=\"find('" + Info._id + "')\" data-toggle='modal' data-target='#f1'>" + "查看" + "</button>&nbsp;&nbsp;");


                    tr.append(td)
                    tbody.append(tr);
                })
            }else{
                alert("未查找到相应商品！");
            }
        }
    })

}

function refreshwin() {
    window.location = "/superGood";
}