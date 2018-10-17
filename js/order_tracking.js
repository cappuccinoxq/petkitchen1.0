/**
 * Created by Administrator on 2018/6/27.
 *  物流数据  jack
 *
 */
'use strict';
var ordrs = location.href;
var logisticss = ordrs.split("order_tracking/")[1];
var logistics = logisticss.split('/')[0];//物流ID
var order_ids = logisticss.split('/')[1];//订单ID
var order_status = logisticss.split('/')[2];//订单ID
var order_tracking = {
    inits:function () {
        if(order_status == '4'){
            $(".confirmationreceipt").hide();
        }
        if(logistics == ''){
            $(".null_bg").show();
        }else{
            $(".container_border").show();
            setTimeout(function () {
            $.ajax({
                url: "/order/kuaidi/"+logistics,
                type: "get",
                dataType:"json",
                data:{},
                success:function(res){
                    $(".container_border").hide();
                    if(res.code == '200'){
                        var datas = res.data;
                        var contdata = res.data.data;
                        var state = datas.state;
                        var conts = '';
                        var wapper = '';
                        conts+='<div class="shop_info">' +
                            '<p class="shop_info_left"><img src="/static/images/shop_info.png"/></p>' +
                            '<p class="shop_info_right">' +
                            '<span class="txt"><span>配送企业：</span><span>'+datas.com+'</span></span>' +
                            '<span class="txt"><span>快递单号：</span><span>'+datas.nu+'</span></span>' +
                            '<span class="txt"><span>联系电话：</span><span></span></span>'+
                            '</p>' +
                            '</div>'+
                            '<div class="address" style="height: 3rem;">' +
                            '    <div class="address_top">' +
                            '        <span class="sp_fir">已发货</span> <span class="yunshu">运输中</span> <span class="paijian">派件中</span> <span class="qianshous">已签收</span>' +
                            '    </div>' +
                            '    <div class="address_mid">' +
                            '        <span class="point yifahuos"></span><span class="lin"/></span>' +
                            '        <span class="point yunshuzhong"></span><span class="lin"/></span>' +
                            '        <span class="point paijianzhong"></span ><span class="lin"/></span>' +
                            '        <span class="point yiqianshou"></span>' +
                            '    </div>' +
                            '</div>' +
                            '<div class="wuliu_detail" style="margin: 0;">' +
                            '    <p class="tit">物流详情</p>' +
                            '    <div class="wuliu_con" style="float: left;margin-top: 0.5rem;">' +
                            '    </div>' +
                            '</div>';
                        $(".contentsall").prepend(conts);

                        $.each(contdata, function (key, val) {
                            wapper +=
                                '<div style="width: 100%;float: left;">'+
                                '<div class="wuliu_con_mid" style="width: 4.5rem;">' +
                                '<p><span class="mon">'+val.time+'</span></p>' +
                                '</div>' +
                                '<div class="wuliu_con_left" style="margin: 0;">' +
                                '<span class="point  choose_p"></span><span class="lin" style="height: 3.5rem"></span>' +
                                '</div>' +
                                '<div class="wuliu_con_right" style="width: 10rem;">' +
                                '<p><span class="txt_bot">'+val.context+'</span></p>' +
                                '</div>'+
                                '</div>';
                        });
                        $("#contentsall .wuliu_con").append(wapper);
                        if(state == '0'){
                            $(".yunshu").addClass('choose');
                            $(".yunshuzhong").addClass('choose_p');
                        }else if(state == '5'){
                            $(".paijian").addClass('choose');
                            $(".paijianzhong").addClass('choose_p');
                        }else if(state == '3'){
                            $(".qianshous").addClass('choose');
                            $(".yiqianshou").addClass('choose_p');
                        }else{
                            $(".sp_fir").addClass('choose');
                            $(".yifahuos").addClass('choose_p');
                        }
                    }else if(res.code == '401'){
                        window.location.href='/view/login';
                    }
                },
                error:function () {
                    bombboxhints("服务器出错");
                }
            });
            },100);
        }
        //确认收货
        $(".confirmationreceipt").on('click',function () {
            $.ajax({
                url: "/order/receipt/"+order_ids,
                type: "get",
                dataType:"json",
                data:{},
                success:function(res){
                    if(res.code == '200'){
                        bombboxhints('确认收货成功');
                        $(this).html('已确认收货');
                        setTimeout(function () {
                            window.location.href = '/view/select_order';
                        },1000);
                    }else if(res.code == '400'){
                        bombboxhints(res.message);
                    }
                    else if(res.code == '401'){
                        window.location.href='/view/login';
                    }
                },
                error:function () {
                    bombboxhints("服务器出错");
                }
            });
        })
    },
    monitor:function(){
        //监听微信返回事件
        pushHistory();
        function pushHistory() {
            var state = {
                title: "title",
                url: ""
            };
            window.history.pushState(state, "title", "");
        }
        window.onpopstate = function() {
            location.href="/view/select_order";
        };
    },
};
order_tracking.inits();
order_tracking.monitor();