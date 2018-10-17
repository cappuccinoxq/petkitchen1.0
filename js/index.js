/**
 * Created by Administrator on 2018/6/27.
 *  首页  jack
 *
 */
'use strict';
//点击VIP定制
$('#siren_but').click(function() {
    $.ajax({
        url: "/user/center",
        type:'get',
        dataType: 'json',
        success: function (res) {
            console.log(res);
            if(res.code=='200'){
                window.location.href = "/view/descri_vip.html";
            }else if(res.code=='401'){
                window.location.href="/view/login";
            }

        },
        error:function (res) {
            bombboxhints("网络超时");
        }
    });
});
//点击普通定制
$('#foods_x').click(function() {
    $.ajax({
        url: "/user/center",
        type:'get',
        dataType: 'json',
        success: function (res) {
            console.log(res);
            if(res.code=='200'){
                window.location.href = "/view/descri.html";  
            }else if(res.code=='401'){
                window.location.href="/view/login";
            }

        },
        error:function (res) {
            bombboxhints("网络超时");
        }
    });
});
$('#member').click(function() {
    var $user_id = $("#member").val();
    if($user_id == "" || $user_id == null) {
        window.location.href = "/view/login";
    } else {
        window.location.href = "/view/member";
    }
});
var mySwiper  = new Swiper('.swiper-container', {
    loop : true,
    autoplay : 2000,
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
    // slidesPerView: "auto",
    // centeredSlides:true,
    // spaceBetween: 20,
});

var Oul = document.getElementById('nav_ul');
var Oli = Oul.getElementsByTagName('li');
for(var i = 0; i < Oli.length; i++) {
    Oli[i].index = i;
    Oli[i].onclick = function() {
        Oli[this.index].getElementsByTagName('img')[0]
    }
}

// 替换图片
function Replacepicture (res) {
    $(".modele_warpper").fadeIn();
    var wappers = '';
    wappers+= '<div class="close1">'+
        '<a href="javascript:void(0)" id="closebt" class="closebt"><img src="/static/images/off_x.png"></a>'+
        '</div>'+
        '<div class="code-img" style="-webkit-overflow-scrolling : touch;">'+
        '<img id="ewmsrc" src='+res+'>'+
        '</div>';
    $('.codes').html(wappers);
}
$(".nav_tu").on('click',function () {
    Replacepicture('/static/images/cat_n.jpg');
        $(".modele_warpper").find("#code").addClass("dongtai");
  
});
$(".nav_tunths").on('click',function () {
    Replacepicture('/static/images/cat_j.jpg');
    $(".modele_warpper").find("#code").addClass("dongtai");
});
$('#code').on('click','.closebt',function() {
    $('.modele_warpper').fadeOut();
});
$('#code').on('click','.code-img',function() {
    $('.modele_warpper').fadeOut();
});
//获取优惠券
//优惠券
$.ajax({
    url: "/coupon/receive/1",
    type: "get",
    dataType: "json",
    success: function(msg) {
        console.log(msg);
        if(msg.code == '200'){
            coupon_detail();
            $(".coupon_zh").show();
        }else if(msg.code=='401'){
            window.location.href="/view/login"
        }else if(msg.code == '400'){

        }
    },
    error:function () {
        bombboxhints('服务器出错');
    }
});
//优惠券详情
function coupon_detail(){
    $.ajax({
        url: "/coupon/detail/1",
        type: "get",
        dataType: "json",
        success: function(msg) {
            console.log(msg)
            if(msg.code == '200'){
                var wapper='';
                wapper+='<li class="commom" id="cuplist">'+
                    '<p class="new_left">'+
                    '<span class="new_left_top">'+"￥"+msg.data.discount_money/100+'</span>'+
                    '<span class="new_left_bot">'+"消费满"+msg.data.limit_money/100+"可用"+'</span>'+
                    '</p>'+
                    '<p class="new_right">'+
                    '<span class="new_right_top">'+"新用户首次下单满减使用"+'</span>'+
                    '<span class="new_right_mid">'+'<span>'+"适用产品："+'</span>'+'<span>'+"所有产品"+'</span>'+'</span>'+
                    '<span class="new_right_mid">'+'<span>'+"有效期至："+'</span>'+'<span class="time">'+msg.data.end_time+'</span>'+'</span>'+
                    '</p>'+
                    '</li>'
                $(".coupon_box").html(wapper);
            }else if(msg.code=='401'){
                window.location.href="/view/login"
            }
        },
        error:function () {
            bombboxhints('服务器出错');
        }
    });
}
$(".btn").click(function () {
    $(".coupon_zh").hide();
})


