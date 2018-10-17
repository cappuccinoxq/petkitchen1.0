/**
 * Created by Administrator on 2018/6/27.
 *  订单详情页  jack
 *
 */
'use strict';
var ordrs = location.href;
var order_id = ordrs.split("order_pays/")[1];
var pets_record_id = ''//宠物ID
var order_pay = {
    inits:function () {
        $(".container_border").show();
        setTimeout(function () {
            $.ajax({
                url: "/order/detail/"+order_id,
                type: "get",
                async:false,
                dataType: "json",
                data:{},
                success: function(res){
                    $(".container_border").hide();
                    var conts = res.data;
                    var dizhi = '';
                    pets_record_id = conts.pets_record_id;
                    $.each(conts.area, function (key, val) {
                        dizhi+='<p class="name"><span class="name">'+val.addressee+'</span><span class="tel">'+val.telephone+'</span></p>' +
                            '<p class="address">收货地址：<span class="address_x">'+val.area+'</span></p>';
                    });
                    $(".order_pays_message").append(dizhi);
                    $(".order_pays_message").append('<p>下单时间：<span class="time1">'+conts.update_at+'</span></p>');
                    var wapper = '';
                    wapper+='<div class="pay_x">付款详情</div>' +
                        '<p>'+'<span>专属定制配方：</span><span class="peifang"><span>￥</span><span>'+Number(conts.recipe_fee/100)+'</span></span>'+'</p>' +
                        '<p>'+'<span>鲜食产品：</span><span class="fresh"><span>￥</span><span>'+Number((conts.amount_money)/100)+'</span></span></p>' +
                        '<p>'+'<span>优惠券：</span><span><span>￥</span><span>'+Number((conts.discount_amount)/100)+'</span></span>'+'</p>' +
                        '<p>'+'<span>运费：</span><span class="time2"><span>￥</span><span>'+Number((conts.trans_fee)/100)+'</span></span>'+'</p>' +
                        '<p>'+'<span>合计：</span><span class="total"><span>￥</span><span>'+Number((conts.pay_count)/100)+'</span></span>'+'</p>';
                    $(".order_pays_payment").html(wapper);
                    //判断VIP支付成功之后得状态
                    if(conts.status == '8'){
                        $("#btn").removeAttr('disabled');
                        $("#btn").css('background','#9DAD6C');
                        $("#btn").on('click',function () {
                            window.location.href = '/view/order_choose/'+order_id+'/'+pets_record_id;
                        })
                    }
                },
                error:function (res) {
                    console.log(res);
                }
            });
        },200);
    }
};
order_pay.inits();