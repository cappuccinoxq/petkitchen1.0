/**
 * Created by Administrator on 2018/6/27.
 *  vip定制  jack
 *
 */
'use strict';
var swiper = new Swiper('.swiper-container', {
    loop : true,
    autoplay:2000,
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
});
var Oul=document.getElementById('nav_ul');
var Oli=Oul.getElementsByTagName('li');
for(var i=0;i<Oli.length;i++){
    Oli[i].index=i;
    Oli[i].onclick=function(){
        Oli[this.index].getElementsByTagName('img')[0]
    }
}
//替换图片
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
    Replacepicture('/static/images/niurousss.png');
});
$('#code').on('click','.closebt',function() {
    $('.modele_warpper').fadeOut();
});
$('#code').on('click','.code-img',function() {
    $('.modele_warpper').fadeOut();
});
// //判断状态
// $.ajax({
//     url: "/order/vip_first",
//     type:'get',
//     dataType: 'json',
//     success: function (res) {
//         console.log(res);
//         if(res.code=='200'){
//            if(res.data.vip_first==1){
//                $(".descri_vip_btn_f").css("display","block");
//                $(".descri_vip_btn_s").css("display","none");
//            }else if(res.data.vip_first==0){
//                $(".descri_vip_btn_f").css("display","none");
//                $(".descri_vip_btn_s").css("display","block");
//            }
//         }else if(res.code=='401'){
//             window.location.href="/view/login";
//         }
//
//     },
//     error:function (res) {
//         bombboxhints("网络超时");
//     }
// })