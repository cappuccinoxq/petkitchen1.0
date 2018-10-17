$(document).ready(function () {
    //弹框
    function bombboxhints(res) {
        $('.promptbox').css("display", "block");
        $('.promptbox').html(res);
        $('.warpperts').fadeIn();
        setTimeout(function () {
            $(".warpperts").fadeOut();
            $('.promptbox').css("display", "none");
        }, 1000);
    }

//    倒计时1
    var wait = 60;
    function time(o) {
        if (wait == 0) {
            o.removeAttribute("disabled");
            o.value = "获取验证码";
            wait = 60;
        } else {
            o.setAttribute("disabled", true);
            o.value = "" + wait + "秒";
            wait--;
            setTimeout(function () {
                    time(o)
                },
                1000)
        }
    }
    //    倒计时2
    var wait1 = 60;
    function time1(o) {
        if (wait1 == 0) {
            o.removeAttribute("disabled");
            o.value = "获取验证码";
            wait1 = 60;
        } else {
            o.setAttribute("disabled", true);
            o.value = "" + wait1 + "秒";
            wait1--;
            setTimeout(function () {
                    time1(o)
                },
                1000)
        }
    }

//    验证原号码----点击发送验证码
    $("#send_y").click(function () {
        var tel = $(".phone").val();
        var tel_reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
        if (tel == "") {
            bombboxhints('喵？请留下联系方式哦~');
        } else if (!tel_reg.test(tel)) {
            bombboxhints('喵？手机号格式不对哦~');
        } else {
            //发送验证码
            time(this);
            $.ajax({
                url: "/mobile-code/" + tel,
                type: "get",
                dataType: "json",
                success: function (res) {
                    if(res.code=="401"){
                        window.location.href="/view/login.html";
                    }
                },
                error: function () {
                    bombboxhints('服务器出错');
                }
            })
        }
    })
    //    验证下一步
    $("#next_y").click(function () {
        var yzm = $(".yzm_shu").val();
        var tel = $(".phone").val();
        if (tel == "") {
            bombboxhints('喵？请输入手机号~');
        } else if (yzm == "") {
            bombboxhints('喵？请输入验证码~');
        } else {
            //验证验证码
            $.ajax({
                url: "/mobile-code/" + tel + "/" + yzm,
                type: "get",
                async: false,
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    if(res.code=="401"){
                        window.location.href="/view/login.html";
                    }
                },
                error: function () {
                    bombboxhints('服务器出错');
                }
            });
            setTimeout(function () {
                $.ajax({
                    url: "/user/changephone/0",
                    type: "get",
                    async: false,
                    dataType: "json",
                    success:function (res) {
                        console.log(res)
                        if(res.code=="400"){
                            bombboxhints(res.message);
                        }else if(res.code=="401"){
                            window.location.href="/view/login.html";
                        }else{
                            bombboxhints("验证成功");
                            setTimeout(function () {
                                $(".new_phone").css("background-image", "url(/static/images/yzm_yaf.png)");
                                $(".new_phone").css("background-size", "100% 100%");
                                $(".new_phone").siblings().css("background", "#F3F4F6");
                                $(".content_show_shu_y").css("display", "none");
                                $(".content_show_shu_b").css("display", "block");
                            },1500)
                        }
                    },
                    error: function () {
                        bombboxhints('服务器出错');
                    }
                });
            }, 500)

        }
    });
//    绑定新手机号
    $("#send_b").click(function () {
        var tel_new = $(".phone_new").val();
        var tel_reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]19[0-9])\d{8}$/;   
        if (tel_new == "") {
            bombboxhints('喵？请留下联系方式哦~');
        } else if (!tel_reg.test(tel_new)) {
            bombboxhints('喵？手机号格式不对哦~');
        } else {
            //发送验证码
            time1(this);
            $.ajax({
                url: "/mobile-code/" + tel_new,
                type: "get",
                dataType: "json",
                success: function (res) {
                    if(res.code=="401"){
                        window.location.href="/view/login.html";
                    }
                },
                error: function () {
                    bombboxhints('服务器出错');
                }
            });
        }
    });
    //验证下一步
    $("#next_b").click(function () {
        var yzm_b = $(".yzm_shu_b").val();
        var tel_new = $(".phone_new").val();
        if (tel_new == "") {
            bombboxhints('喵？请输入手机号~');
        } else if (yzm_b == "") {
            bombboxhints('喵？请输入验证码~');
        } else {
            //验证验证码
            $.ajax({
                url: "/mobile-code/" + tel_new + "/" + yzm_b + "",
                type: "get",
                async: false,
                dataType: "json",
                success: function (res) {
                    if(res.code=="401"){
                        window.location.href="/view/login.html";
                    }
                },
                error: function () {
                    bombboxhints('服务器出错');
                }
            });
            setTimeout(function () {
                $.ajax({
                    url: "/user/changephone/1",
                    type: "get",
                    async: false,
                    dataType: "json",
                    success: function (res) {
                        if(res.code=="400"){
                            bombboxhints(res.message);
                        }else if(res.code=="401"){
                            window.location.href="/view/login.html";
                        }else{
                            bombboxhints("绑定成功");
                            window.location.href="my_person";
                        }
                    },
                    error: function () {
                        bombboxhints('服务器出错');
                    }
                });
            }, 1000)
        }
    })
});