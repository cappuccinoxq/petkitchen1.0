/**
 * Created by Administrator on 2018/6/27.
 *  登录  jack
 *
 */
'use strict';
//点击眼睛显示隐藏
$(".login-bar_tu").click(function() {

    if($(this).siblings("input").attr("type") == "text") {
        $(this).siblings("input")[0].type = "password";
    } else {
        $(this).siblings("input")[0].type = "text";
    }
});
$(".login-bar_tu").click(function() {
    if($(this).find('img').attr('src') == '/static/images/login_11.png') {
        $(this).find('img').attr('src', '/static/images/eye.png');
    } else {
        $(this).find('img').attr('src', '/static/images/login_11.png');
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
    $("#mobile").val("");
    $(this).hide();
});
$("#mobile").on('keyup',function () {
    if($(this).val() != ''){
        $('.login-bar_t').show();
    }else{
        $('.login-bar_t').hide();
    }
});
$("#password1").on('keyup',function () {
    if($(this).val() != ''){
        $('.login-bar_tu').show()
    }else{
        $('.login-bar_tu').hide();
    }
});
// 静默执行AJAX
$.ajax({
    url: "/user/login",
    type: "post",
    async:false,
    data:{"phone":'',"pwd":''},
    dataType:'json',
    success: function(res) {

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
    }
});
// 微信登录
$("#wxlogins").on('click',function () {
    setTimeout(function () {
        $.ajax({
            url: "/wechat_login",
            type: "get",
            async:false,
            dataType:'json',
            success: function(res) {
                if(res.code == '200'){
                    window.location.href='/index';
                }else if(res.code == '400'){
                    bombboxhints(res.message);
                }else if(res.code == '401'){
                    window.location.href='/view/login';
                }
            },
            error: function () {
                window.location.href='/index';
            }
        });
    },1000);
});
//登录
$("#submit_btn").on('click',function () {
    var name = $("#mobile").val();
    var passwords = $("#password1").val();
    var phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if(name == ''||!phone.test(name)){
        bombboxhints('喵？手机号格式不对哦~');
    }else if(passwords == ''){
        bombboxhints('呜？密码格式错了哟~');
    }else{
        setTimeout(function () {
            $.ajax({
                url: "/user/login",
                type: "post",
                async:false,
                data:{"phone":name,"pwd":passwords},
                dataType:'json',
                success: function(res) {
                    if(res.code == '200'){
                        bombboxhints('宾果！恭喜主银登录成功');
                        setTimeout(function() {
                            window.location.href = "/index";
                        }, 1000);
                    } else if(res.code == '400'){
                        bombboxhints(res.message);
                    }
                },
                error: function () {
                    window.location.href='/index';
                }
            });
        },500);
    }
});
