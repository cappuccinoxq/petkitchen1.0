/**
 * Created by Administrator on 2018/6/27.
 *  我的页面  jack
 *
 */
'use strict';
function bombboxhints(res) {
    $('.promptbox').html(res);
    $('.warpperts').fadeIn();
    setTimeout(function() {
        $(".warpperts").fadeOut();
    }, 2000);
}
var members = {
    inits:function () {
        //调取信息
        $.ajax({
            url: "/user/center",
            type:'get',
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if(res.code=='200'){
                    var user_name = res.data.user_name;
                    var img = res.data.img;
                    var img_logo;
                    if(img==""){
                        img_logo = "/static/images/about_us.png";
                    }else{
                        img_logo=img;
                    }
                    var wapper ='';
                    wapper+='<p>'+'<img class="logo_logo" src='+img_logo+' >'+'</p>'+
                        '<p class="user">'+user_name+'</p>';
                    $(".user_info").html(wapper);
                }else if(res.code=='401'){
                    window.location.href="/view/login";
                }

            },
            error:function (res) {
                bombboxhints("网络超时");
            }
        }),
        //    判断是否有未读消息
            $.ajax({
                url: "/message",
                type: "get",
                dataType:"json",
                data:{},
                success:function(res){
                    console.log(res);
                    if(res.code == '200'){
                        //判断已读未读 0----未读  1----已读
                        $.each(res.data, function (key, val) {
                            if(val.read_type == 0){
                                $(".red").attr("src","/static/images/red.png");
                            }
                        });
                    }else if(res.code == '400'){
                        $(".red").attr("src","/static/images/white.png");  
                    }else if(res.code == '401'){
                        window.location.href='/view/login';
                    }
                },
                error:function () {
                    bombboxhints("服务器出错");
                }
            });
        //点击退出
        $('#tuichu').on('click',function() {
            $(".bgPop,.pop_zhi_z").show();
            $("#tuichu1").on('click',function(){
                $.ajax({
                    url: '/logout',
                    dataType: 'json',
                    type: 'get',
                    success: function (res) {
                        console.log(res);
                        if (res.code == '200') {
                            window.location.href = "/view/login";
                        }
                    },
                    error: function () {
                        bombboxhints('喵？退出失败哦~');
                    }
                });
            })
            $(".submit_qu").on('click',function(){
                $(".bgPop").hide();
                $(" .pop_zhi_z").hide();
            })
        })
    }
};
members.inits();