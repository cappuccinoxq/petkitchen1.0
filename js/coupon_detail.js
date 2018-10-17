var href = location.href;
var coupon_id = href.split("coupon_detail/")[1];
$.ajax({
    url: "/coupon/detail/"+coupon_id,
    type: "get",
    dataType: "json",
    success: function(msg) {
        console.log(msg);
        if(msg.code == '200'){
            var wapper='';
            wapper+='<div class="content_top">'+
                '<p class="money">'+"￥"+msg.data.discount_money/100+'</p>'+
                '<p class="txt">'+"全品类通用"+'</p>'+
                '<p class="txt">'+"满"+msg.data.limit_money/100+"元减"+msg.data.discount_money/100+'</p>'+
                '</div>'+
                ' <div class="content_bot">'+
                '<p>'+'<span>'+"• 适用平台："+'</span>'+'<span>'+"全平台"+'</span>'+'</p>'+
                '<p>'+'<span>'+"• 有效期至："+'</span>'+'<span>'+msg.data.end_time+'</span>'+'</p>'+
                '<p>'+'<span>'+"• 详细说明："+'</span>'+'<span>'+"全场通用，不限条件，特殊商品除外。"+'</span>'+'</p>'+
                '</div>'
            $(".content1").html(wapper);
        }else if(msg.code=='401'){
            window.location.href="https://test.petskitchen.com.cn/view/login"
        }
    },
    error:function () {
        bombboxhints('服务器出错');
    }
});