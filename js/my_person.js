//调取信息
$.ajax({
    url: "/user/center",
    dataType: 'json',
    type:'get',
    success: function (res) {
        console.log(res);
        if(res.code=='200'){
            var mobile = res.data.mobile;
            var img = res.data.img;
            var auth_type= res.data.auth_type;     //判断是否是微信登录   1----手机号    2----微信
            var img_logo;
            if(img==""){
                img_logo = "/static/images/about_us.png";
            }else{
                img_logo=img;
            }
            if(auth_type==1){
                $(".content_list").on('click','.change_phone_p',function () {
                    window.location.href="/view/change_phone";
                })
                $(".content_list").on('click','.change_psw',function () {
                    window.location.href="/view/change_psw";
                })
            }else if (auth_type==2){
                $(".change_psw span").css("color","#CBCBCB");
                $(".change_phone_p span").css("color","#CBCBCB");
            }
            var wapper='';
            wapper+='<p>'+'<img class="logo_logo" src='+img_logo+' >'+'</p>'
            $(".content_img").html(wapper);
            $(".change_phone_l").html(mobile);
        }else if(res.code=='401'){
            window.location.href="/view/login";
        }
    },
    error:function (res) {
        bombboxhints("网络超时");
    }
})