/**
 * Created by Administrator on 2018/6/27.
 *  订单列表数据  jack
 *
 */
'use strict';
var order_list = {
    init:function(){
        order_list.listdata();
        order_list.clickdorder();
        order_list.monitor();
    },
    listdata:function () {
        $(".changescolors").on('click',function () {
            $(this).addClass('order_change').siblings().removeClass('order_change');
        });
        // 拉取订单状态列表
        $("#order_navs").on('click','li',function () {
            var statusid = $(this).attr('data-status');
            $(".container_border").show();
            setTimeout(function() {
                $.ajax({
                    url: "/order/list/"+statusid,
                    type: "get",
                    async:false,
                    dataType: "json",
                    success: function(res) {
                        $(".container_border").hide();
                        if(res.code == '200'){
                            var conts = res.data;
                            var wapper = '';
                            var statusall = '';
                            var cycleall = '';
                            var shopping = '';
                            var quxaios = '';
                            <!--生成普通订单内容-->
                            $.each(conts, function (key, val) {
                                var monay = Number((val.pay_count)/100);
                                var imges = '';
                                // 判断周期
                                if(val.cycle == '1'){
                                    cycleall = '一周';
                                }else if(val.cycle == '2'){
                                    cycleall = '二周';
                                }else if(val.cycle == '4'){
                                    cycleall = '四周';
                                }else if(val.cycle == '8'){
                                    cycleall = '两个月';
                                }else if(val.cycle == '12'){
                                    cycleall = '三个月';
                                }
                                // 判断是VIP还是普通
                                if(val.type == '0'){
                                    imges = '/static/images/putongs.png';
                                }else{
                                    imges = '/static/images/vipss.png';
                                }
                                if(val.type == '0'){
                                    // 判断状态
                                    if(val.status == '0'){
                                        statusall = '交易关闭';
                                        shopping = '重新购买';
                                        quxaios = '删除订单';
                                    }else if(val.status == '1'){
                                        statusall = '等待付款';
                                        shopping = '立即付款';
                                        quxaios = '取消订单';
                                    }else if(val.status == '2'){
                                        statusall = '等待发货';
                                        shopping = '再次购买';
                                        // quxaios = '删除订单';
                                        $("#oder_wapperss .wuliusdsx").hide();//关闭
                                    }else if(val.status == '3'){
                                        statusall = '已退款';
                                        shopping = '重新购买';
                                        // quxaios = '删除订单';
                                    }else if(val.status == '4'){
                                        statusall = '已收货';
                                        shopping = '再次购买';
                                        // quxaios = '删除订单';
                                    }else if(val.status == '5'){
                                        statusall = '交易成功';
                                        shopping = '再次购买';
                                        // quxaios = '删除订单';
                                    }else if(val.status == '6'){
                                        statusall = '申请售后';
                                        // quxaios = '删除订单';
                                        shopping = '查看进度';
                                    }
                                }else{
                                    // 判断状态
                                    if(val.status == '0'){
                                        statusall = '交易关闭';
                                        shopping = '重新购买';
                                        quxaios = '删除订单';
                                    }else if(val.status == '1'){
                                        statusall = '等待付款';
                                        shopping = '立即付款';
                                        quxaios = '取消订单';
                                    }else if(val.status == '2'){
                                        statusall = '配方生成中';
                                        shopping = '再次购买';
                                        // quxaios = '删除订单';
                                        $("#oder_wapperss .wuliusdsx").hide();//关闭
                                    }else if(val.status == '3'){
                                        statusall = '已退款';
                                        shopping = '重新购买';
                                        // quxaios = '删除订单';
                                    }else if(val.status == '4'){
                                        statusall = '已收货';
                                        shopping = '再次购买';
                                        // quxaios = '删除订单';
                                    }else if(val.status == '5'){
                                        statusall = '交易成功';
                                        shopping = '再次购买';
                                        // quxaios = '删除订单';
                                    }else if(val.status == '6'){
                                        statusall = '申请售后';
                                        shopping = '查看进度';
                                    }else if(val.status == '8'){
                                        statusall = '配方已生成';
                                        shopping = '再次购买';
                                        // quxaios = '删除订单';
                                    }else if(val.status == '9'){
                                        statusall = '等待发货';
                                        shopping = '查看详情';
                                        // quxaios = '删除订单';
                                    }
                                }

                                // 渲染页面
                                wapper += '<div class="select_order_nv">' +
                                    '<div class="order_titlte">' +
                                    '<span>订单编号 : </span>' +
                                    '<span>'+val.order_no+'</span>' +
                                    '<span style="color: #333;" class="Orders_status">'+statusall+'</span>' +
                                    '</div>' +
                                    '<div class="order_content order_contentalls" data-id='+val.id+'>' +
                                    '<img src="'+imges+'" alt="">' +
                                    '<p class="order_chufang">'+val.pet_name+'</p>' +
                                    '<p class="order_kouweis"><span>口味 : </span><span>'+val.taste+'</span></p>' +
                                    '<p class="ediblecycle"><span>食用周期 : </span><span style="margin-left: .15rem" class="distribution_cycle">'+cycleall+'</span></p>' +
                                    '</div>' +
                                    '<div class="Order_date">' +
                                    '<span>应付金额 : </span>' +
                                    '<span>'+monay+'</span>' +
                                    '<span class="Gotopayment paymentalls" data-id='+val.id+'>'+shopping+'</span>' +
                                    '<span class="Gotopayment wuliusdsx" style="display: none;" data-id='+val.id+'>'+quxaios+'</span>' +
                                    '</div>' +
                                    '</div>';
                            });
                            $(".oder_wapperss").html('');
                            $(".oder_wapperss").html(wapper);

                        }else if(res.code == '401'){
                            window.location.href='/view/login';
                        }
                    },
                    error: function () {
                        bombboxhints("服务器出错");
                    }
                });

                //判断有没有订单
                if($("#oder_wapperss").find('.select_order_nv').length == '0'){
                    $(".null_bg").show();
                    $(".container_border").hide();
                }else{
                    $(".null_bg").hide();
                }
            }, 100);
        });
        // 刷新页面点击第一个
        $(".order_navs li:eq(0)").click();
        // 拉取上门信息
        $(".door_list").on('click',function () {
            $(".container_border").show();
            setTimeout(function() {
                $.ajax({
                    url: "/order/vip_list",
                    type: "get",
                    async: false,
                    dataType: "json",
                    success: function (res) {
                        $(".container_border").hide();
                        // 渲染页面
                        if(res.code == '200'){
                            var statusall = '';
                            var wapperss = '';
                            $.each(res.data, function (key, val) {
                                if(val.status == '1'){
                                    statusall = '已上门'
                                }else if(val.status == '2'){
                                    statusall = '未上门'
                                }else if(val.status == '3'){
                                    statusall = '录入宠物信息';
                                }
                                wapperss += '<div class="select_order_nv">' +
                                    '<div class="order_titlte">' +
                                    '<span>提交时间 : </span>' +
                                    '<span>' + val.create_time + '</span>' +
                                    '<span style="color: #333;" class="Orders_status">'+statusall+'</span>' +
                                    '</div>' +
                                    '<div class="order_content orders_conts" data-id=' + val.id + '>' +
                                    '<img src="/static/images/vipss.png" alt="">' +
                                    '<p class="order_chufang"><span>联系人 : </span><span>' + val.person_name + '</span></p>' +
                                    '<p class="order_kouweis"><span>联系电话 : </span><span>'+val.phone+'</span></p>' +
                                    '<p class="ediblecycle"><span>详细地址 : </span><span style="margin-left: .15rem" class="distribution_cycle">' + val.area + '</span></p>' +
                                    '</div>' +
                                    '</div>';
                            });
                            $(".oder_wapperss").html(wapperss);
                        }else if(res.code == '401'){
                            window.location.href='/view/login';
                        }
                    },
                    error: function () {
                        bombboxhints("服务器出错");
                    }
                });
                //判断有没有订单
                if($("#oder_wapperss").find('.select_order_nv').length == '0'){
                    $(".null_bg").show();
                    $(".container_border").hide();
                }else{
                    $(".null_bg").hide();
                }
            },100)
        })
    },
    clickdorder:function () {
        // 普通定制查看详情
        $("#oder_wapperss").on('click','.order_contentalls',function () {
            var order_id = $(this).attr('data-id');
            window.location.href = "/view/order_finish/"+order_id;
        });
        // 上门查看详情
        $("#oder_wapperss").on('click','.orders_conts ',function () {
            var order_id = $(this).attr('data-id');
            window.location.href = "/view/order_before/"+order_id;
        });
        // 订单支付
        $("#oder_wapperss").on('click','.paymentalls',function () {
            var order_id = $(this).attr('data-id');
            window.location.href = '/view/order_finish/'+order_id;
        });
        //删除、取消订单
        $("#oder_wapperss").on('click','.wuliusdsx',function () {
            var order_id = $(this).attr('data-id');
            window.location.href = '/view/order_finish/'+order_id;
        });
        //删除、取消订单
        $("#oder_wapperss").on('click','.paymentalls',function () {
            var fontsize = $(this).text();
            if(fontsize == '查看进度') {
                window.location.href = '/view/after_sale';
            }
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
            location.href="/view/member";
        };
    }
};
order_list.init();