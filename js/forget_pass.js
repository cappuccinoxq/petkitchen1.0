/**
 * Created by Administrator on 2018/6/27.
 *  重置密码  jack
 *
 */
'use strict';
var wait = 60;
function time(o) {
    if(wait == 0) {
        o.removeAttribute("disabled");
        o.value = "获取验证码";
        wait = 60;
    } else {
        o.setAttribute("disabled", true);
        o.value = "" + wait + "秒";
        wait--;
        setTimeout(function() {
                time(o)
            },
            1000)
    }
}
$('#send').click(function() {
    var tel = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]19[0-9])\d{8}$/;
    if(!tel.test($("#ipt").val())) {
        bombboxhints('喵？手机号格式不对哦~');
        return false
    }else{
        checkyzm();
        time(this);
        $(this).bind('click');
    }
});
// 发送验证码
function checkyzm() {
    var phones = $("#ipt").val();
    $.ajax({
        url: "/mobile-code/"+phones,
        type: "get",
        async: false,
        success: function (res) {
            if(res.code == '200'){
                console.log(res);
            }else if(res.code == '400'){
                bombboxhints('呜？您验证码发送次数过多哟~');
            }
        },
        error: function (res) {
            bombboxhints('网络超时');
        }
    });
}
//点击眼睛显示密码
$(".login-bar_tu").click(function() {

    if($(this).siblings("input").attr("type") == "text") {
        $(this).siblings("input")[0].type = "password";
    } else {
        $(this).siblings("input")[0].type = "text";
    }
});
function change_pic(){
    var picts = document.getElementById("eye");

    eye.onclick = function(){

        if(picts.getAttribute("src",2) == "/static/images/login_11.png"){
            picts.setAttribute("src","/static/images/eye.png");
        }else{
            picts.setAttribute("src","/static/images/login_11.png");
        };
    }
}
change_pic();
$("#clear").click(function() {
    $("#ipt").val("");
});

//隐藏按钮
$("#ipt").on('keyup',function () {
    if($(this).val() != ''){
        $('.login-bar_t').show();
    }else{
        $('.login-bar_t').hide();
    }
});
$("#ipu").on('keyup',function () {
    if($(this).val() != ''){
        $('.login-bar_tu').show()
    }else{
        $('.login-bar_tu').hide();
    }
});
//提示框
$("#submit_btn").on('click',function(){
    var name = $("#ipt").val();
    var verificationcode = $("#yzm").val();
    var passwords = $("#ipu").val();
    var phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if(name == ''||!phone.test(name)){
        bombboxhints('喵？手机号格式不对哦~');
    }else if(verificationcode == ''){
        bombboxhints('enmm，介个验证码输错了');
    }else if(passwords ==''){
        bombboxhints('呜？密码格式错了哟~');
    }else if(passwords.length<6){
        bombboxhints('呜？请您输入6位密码哟~');
    }else{
        var phones = $("#ipt").val();
        var verification = $("#yzm").val();
        if(verification.length>=6){
            $.ajax({
                url: "/mobile-code/"+phones+"/"+verification+"",
                type: "get",
                async: false,
                success: function (res) {
                    console.log(res);
                },
                error: function (res) {
                    bombboxhints('网络超时');
                }
            });
            setTimeout(function () {
                $.ajax({
                    url: "/user/forget",
                    type: "post",
                    async:false,
                    data:{"pwd":passwords},
                    success: function(res) {
                        if(res.code == '200'){
                            bombboxhints('宾果！恭喜主银重置成功');
                            setTimeout(function() {
                                window.location.href = "/view/login";
                            }, 1000);
                        }else if(res.code == '400'){
                            bombboxhints(res.message);
                        }else{
                            bombboxhints('喵？密码修改失败哦~');
                        }
                    },
                    error: function () {
                        bombboxhints('网络超时');
                    }
                });
            },1000);
        }else{
            bombboxhints('enmm，介个验证码输错了');
        }
    }
});