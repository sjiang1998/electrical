
let delId;

// 新增功能
function addtion() {
    let addName = $("#addName").val();
    let addPass = $("#addPass").val();
    let addRole = $("#addRole").val();

    console.log(addName, addPass, addRole);
    if (!addPass) {
        alert("未输入密码，密码设置为默认密码！");
        addPass = "000000";
    }
    console.log(addPass);

    var form = document.getElementsByClassName('needs-validation')[0];
    form.classList.add('was-validated');

    if (form.checkValidity() === true) {
        $.ajax({
            type: "POST",
            url: "/superUser/add",
            data: {
                addName: addName,
                addPass: addPass,
                addRole: addRole
            },
            cache: false,
            success: function (data) {
                if (data == 1) {
                    $('#a1').modal('hide');
                    $('#a2').modal('show');
                } else if (data == 0) {
                    alert("已存在该姓名！");
                }
            }

        })

    } else {
        form.classList.add('was-validated');
    }


}

// 删除功能
function delone(id) {
    delId = id;
}

function delconfirm() {

    $.ajax({
        type: "POST",
        url: "/superUser/del",
        data: {
            _id: delId
        },
        cache: false,
        success: function (data) {
            if (data == 1) {
                $('#s1').modal('hide');
                $('#s2').modal('show');
            }
        }

    })
}


// 编辑功能
function edit(id) {
    let _id = id;

    $.ajax({
        type: "POST",
        url: "/superUser/byedit",
        data: {
            _id: _id
        },
        cache: false,
        success: function (data) {
            $("#editname").val(data.username);
            $('select').val(data.role);

            $("#editbtn").click(function () {

                var editrole = $("#editrole").val();
                $.ajax({
                    type: "POST",
                    url: "/superUser/edit",
                    data: {
                        _id: _id,
                        editrole: editrole
                    },
                    cache: false,
                    success: function (data) {
                        if (data == 1) {
                            $('#e1').modal('hide');
                            $('#e2').modal('show');
                        }
                    }
                })
            })


        }
    })
}

function changeStatus(_id) {
    console.log(_id);
    $.ajax({
        type: "POST",
        url: "/superUser/changestatus",
        data: {
            _id: _id
        },
        cache: false,
        success: function (data) {
            if (data == 1) {
                alert("修改状态成功！已被启用");
            } else {
                alert("修改状态成功！已被禁用");
            }
        }
    })
}

//查找功能

function find() {
    let searchInfo = $("#searchInfo").val();

    if (searchInfo) {
        $.ajax({
            type: "POST",
            url: "/superUser/search",
            data: {
                sInfo: searchInfo
            },
            cache: false,
            success: function (data) {
                console.log(data);
                if (data && data.length > 0) {
                    let r1 = $("#r1");
                    r1.empty();
                    $.each(data, function (index, Info) {

                        let inp;

                        if (Info.status == 1) {
                            inp = "<input class='switch-input' type='checkbox' checked onclick=\"changeStatus('" + Info._id + "')\">";

                        } else {
                            inp = "<input class='switch-input' type='checkbox' selected onclick=\"changeStatus('" + Info._id + "')\">";

                        }
                        let lab = "<label class='switch switch-label switch-pill switch-success' style='padding-top:8px'>" + inp + "<span class='' id='sp1' data-checked='On' data-unchecked='Off'></span></label>";

                        
                        let d1 = $("<div>");
                        d1.addClass('col-sm-6 col-lg-3 box');

                        let d2 = $("<div>");
                        d2.addClass('card');

                        let i = $("<i>");
                        i.addClass('fa fa-user-circle-o fa-lg mt-3 i1');
                        let span = $("<span>");
                        span.addClass('s1');
                        span.text("用户名");

                        let hr = $("<hr>");
                        let table = $("<table>");
                        table.html("<tbody>" +
                            "<tr><th>用户姓名</th>" + "<th>" + Info.username + "</th></tr>" +
                            "<tr><th>用户身份</th>" + "<th>" + Info.role + "</th></tr>" +
                            "<tr><th>用户状态</th>" + "<th>" + lab + "</th></tr>" +
                            "</tbody>");

                        let d4 = $("<div>");
                        d4.addClass("operate");
                        d4.html("<button class='btn btn-clock btn-ghost-primary' type='button' data-toggle='modal' data-target='#e1' onclick=\"edit('" + Info._id + "')\">编辑</button>"+
                        "<button class='btn btn-clock btn-ghost-danger' type='button' data-toggle='modal' data-target='#s1' onclick=\"delone('" + Info._id + "')\">删除</button>");


                        i.append(span);
                        d2.append(i);
                        d2.append(hr);
                        d2.append(table);
                        d2.append(d4);
                        d1.append(d2);
                        r1.append(d1);

                    })
                    $('span[id="sp1"]').each(function () {
                        $(this).attr("class", "switch-slider");
                    })

                }else{
                    alert("未查找到相应用户！");
                }

            }
        })
    }

}

function refreshwin() {
    window.location = "/superUser";
}