$(document).ready(function () {
    //弹框
    function bombboxhints(res) {
        $('.promptbox').css("display","block");
        $('.promptbox').html(res);
        $('.warpperts').fadeIn();
        setTimeout(function() {
            $(".warpperts").fadeOut();
            $('.promptbox').css("display","none");
        }, 2000);
    }
    var reg = /^([a-z0-9]){6,20}$/i;
    $("#finish").click(function () {
        var old_psw = $("#old_psw").val();
        var new_psw = $("#new_psw").val();
        var confirm_psw = $("#confirm_psw").val();
        if(old_psw=="" && new_psw=="" && confirm_psw==""){
            bombboxhints("请输入信息");
        }else if(old_psw=="" && new_psw!="" && confirm_psw!=""){
            bombboxhints("请输入旧密码");
        }else if(old_psw!="" && new_psw=="" && confirm_psw!=""){
            bombboxhints("请输入新密码");
        }else if(old_psw!="" && new_psw!="" && confirm_psw==""){
            bombboxhints("请输入确认密码");
        }else if(reg.test(new_psw)== false){
            bombboxhints("密码格式不正确");
        }else if(new_psw!=confirm_psw){
            bombboxhints("两次输入密码不一致");
        }else{
            $.ajax({
                url: "/user/changepwd",
                type: "post",
                data:{
                    "pwd":old_psw,
                    "new_pwd":new_psw,
                    "new_pwd_confirm":confirm_psw
                },
                dataType: "json",
                success: function(res){
                    if(res.code=="400"){
                        bombboxhints(res.message);
                    }if(res.code=="401"){
                        window.location.href="/view/login.html";
                    }else if(res.code=="200"){
                        bombboxhints("密码修改成功");
                        setTimeout(function () {
                            window.location.href="/view/login";  
                        },2000)
                    }
                },
                error: function () {
                    bombboxhints('服务器出错');
                }
            });
        }

    })
})
