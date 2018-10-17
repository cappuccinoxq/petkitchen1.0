/**
 * Created by Administrator on 2018/6/27.
 *  订单详情数据  jack
 *
 */
'use strict';
var pets_record_id = '';//宠物ID
var cycle = '';//周期
var taste = [];//口味ID
var ordrs = location.href;
var order_ids = ordrs.split("order_finish/")[1];
var order_id = order_ids.split('/')[0];//订单ID
var order_vips = order_ids.split('/')[1];//判断是否为VIP支付
var courier_number = '';
var orderfinish = {
    payings:function(order_id){
        $.ajax({
            url: "/order/pay/"+order_id,
            type: "get",
            async:false,
            dataType:'json',
            success: function(mag) {
                // 支付成功之后回调
                function Paymentcallback(statusid){
                    $.ajax({
                        url: "/order/notify",
                        type: "post",
                        dataType:"json",
                        data:{
                            "order_id":order_id,
                            "status":statusid,
                        },
                        success:function(res){
                            if(res.code == '401'){
                                window.location.href='/view/login';
                            }
                        },
                        error:function () {
                            bombboxhints("服务器出错");
                        }
                    });
                }
                if(mag.code == '200'){
                    var res = JSON.parse(mag.data.pay_json);
                    WeixinJSBridge.invoke('getBrandWCPayRequest', {
                        "appId": res.appId,
                        "timeStamp": res.timeStamp,
                        "nonceStr": res.nonceStr,
                        "package": res.package,
                        "signType": res.signType,
                        "paySign": res.paySign
                    }, function (res) {
                        if (res.err_msg == 'get_brand_wcpay_request:ok') {
                            bombboxhints('支付成功!谢谢您的光临!');
                            Paymentcallback(1);
                            setTimeout(function () {
                                window.location.href="/view/order_finish/"+order_id;
                            },1000);
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            bombboxhints('取消订单!');
                            Paymentcallback(0);
                            setTimeout(function () {
                                window.location.href="/view/order_finish/"+order_id;
                            },1000);
                        } else {
                            bombboxhints('错误订单!');
                        }
                    });
                }else if(mag.code == '401'){
                    window.location.href='/view/login';
                }

            },
            error: function () {
                bombboxhints('服务器出错');
            }
        });
    },
    intercept:function () {
        var pay_type = '';
        $(".container_border").show();
        // 查询订单详情
        setTimeout(function () {
            $.ajax({
                url: "/order/detail/"+order_id,
                type: "get",
                async:false,
                dataType: "json",
                data:{},
                success: function(res) {
                    $(".container_border").hide();
                    if(res.code == '200'){
                        var tastes = res.data.food;//口味
                        var areas = res.data.area;//地址
                        var timer = res.data;//下单时间
                        pets_record_id = timer.pets_record_id;//宠物ID
                        cycle = timer.cycle;//周期
                        pay_type = timer.pay_type;//宠物类型
                        // 商品信息
                        var cycleall = ''; //判断周期
                        var type = '';//判断是vip还是普通
                        if(timer.cycle == '1'){
                            cycleall = '一周';
                        }else if(timer.cycle == '2'){
                            cycleall = '二周';
                        }else if(timer.cycle == '4'){
                            cycleall = '四周';
                        }else if(timer.cycle == '8'){
                            cycleall = '两个月';
                        }else if(timer.cycle == '12'){
                            cycleall = '三个月';
                        }
                        //判断是vip还是普通
                        if(timer.type == '0'){
                            type = '/static/images/putongs.png';
                        }else{
                            type = '/static/images/vipss.png';
                        }
                        var wappers1 = '';

                        //口味
                        $.each(tastes, function (key, val) {
                            taste.push(val.id);
                            wappers1 +='<div class="shop_info_s" data-id="'+val.id+'" data-price="'+val.product_price+'">'+
                                '<div class="img_shop"><img src="'+type+'"></div>'+
                                '<div class="shop_xinxi">'+
                                '<p style="padding-left: 0.65rem;border: 0;">'+val.product_name+'</p>'+
                                '<p class="lll statress" style="margin: 0rem 0rem 0rem 0.65rem;color: #666;">口味：<span style="margin-right: 0.6rem;">'+val.product_taste+'</span></p>'+
                                '<p class="lll" style="margin-left: 0.65rem;color: #999;">定制周期：<span>'+cycleall+'</span></p>'+
                                '</div>'+
                                '</div>';
                        });
                        $("#shop_infos").append(wappers1);
                        var wappers = '';
                        // 地址
                        $.each(areas, function (key, val) {
                            wappers+='<p style="color: #666;"><span style="padding-right:1rem;" class="addresss">'+val.addressee+'</span><span class="telephones">'+val.telephone+'</span></p>'+
                                '<p style="font-size: 0.64rem;margin: 0.5rem 0rem 0.5rem 0.8rem;color: #666;"><span>地址：</span><span class="your-adress02">'+val.area+'</span></p>'+
                                '<p class="timersdd" style="color: #999;"></p>';
                        });
                        $(".content_per").append(wappers);
                        //下单时间
                        $("#content_pers .timersdd").append('<span>下单时间 : '+timer.create_at+'</span>');

                        // 订单信息
                        var xianging = '';
                        xianging +='<p>订单信息</p>'+
                            '<p>食用周期：<span>'+cycleall+'</span></p>'+
                            '<p class="vipzhuanshus">专属定制配方：<span>￥'+Number((timer.recipe_fee)/100)+'</span></p>'+
                            '<p>鲜食产品：<span>￥'+Number((timer.amount_money)/100)+'</span></p>'+
                            // '<p class="vipchanpinjince">产品检测：<span>￥'+Number((timer.check_fee)/100)+'</span></p>'+
                            '<p>优惠券：<span>￥'+Number(-((timer.discount_amount)/100))+'</span></p>'+
                            '<p>运费：<span>￥'+Number((timer.trans_fee)/100)+'</span></p>';
                        $("#order_infoss").append(xianging);

                        // 订单编号
                        var order_number = '';
                        order_number+='<p>订单编号：<span class="order_numbers" id="ordernumber">'+timer.order_no+'</span><span class="copycontent" data-clipboard-action="copy" data-clipboard-target="#ordernumber" id="copy_btn" style="margin-left: 3rem;padding: 0.15rem 0.4rem;border-radius: 0.3rem;border: 0.05rem solid #999;">复制</span></p>' +
                            '<p>提交时间：<span>'+timer.create_at+'</span></p>' +
                            '<p>支付方式：<span>在线支付/微信支付</span></p>';
                        $("#order_leftcont").append(order_number);

                        // 已完成订单编号
                        var after_completion = '';
                        after_completion+='<p>订单编号：<span class="order_numbers" id="ordernumbers">'+timer.order_no+'</span><span class="copycontent" data-clipboard-action="copy" data-clipboard-target="#ordernumbers" id="copy_annius" style="margin-left: 3rem;padding: 0.15rem 0.4rem;border-radius: 0.3rem;border: 0.05rem solid #999;">复制</span></p>' +
                            '<p>提交时间：<span>'+timer.create_at+'</span></p>' +
                            '<p>支付方式：<span>在线支付/微信支付</span></p>' +
                            '<p>实付金额：<span>￥'+Number((timer.pay_count)/100)+'</span></p>' +
                            '<p>付款时间：<span>'+timer.create_at+'</span></p>';
                        $("#ater_completion").append(after_completion);

                        //判断是普通还是VIP
                        if(timer.type == '0'){
                            $("#order_infoss .vipzhuanshus").hide();//专属定制配方
                            $("#order_infoss .vipchanpinjince").hide();//产品检测
                            $(".vip_btns").hide();
                        }else{
                            $("#order_infoss .vipzhuanshus").show();//专属定制配方
                            $("#order_infoss .vipchanpinjince").show();//产品检测
                            $(".vip_btns").show();//vip支付按钮
                            $(".aga_pay").hide();//普通支付按钮
                        }

                        //判断状态
                        var statusall = '';//购买BUTTON
                        var orders = '';//订单文案
                        var shouhou = '';//售后
                        if(timer.type == '0'){
                            //普通订单
                            if(timer.status == '0'){
                                statusall = '重新购买';
                                orders = '删除订单';
                                $(".trade_off").show();//交易关闭
                                $("#content_pers .timersdd").hide();//关闭下单时间
                                $("#buy_again .shenqing").hide();//关闭售后服务
                                $("#order_lefts").show();//订单编号
                                $(".Total_price").hide();//关闭支付金额
                            }else if(timer.status == '1'){
                                statusall = '立即付款';
                                orders = '取消订单';
                                $(".wait_pay").show();//等待付款
                                $("#order_lefts").show();
                                $("#buy_again .shenqing").hide();//关闭售后服务
                            }else if(timer.status == '2'){
                                // orders = '查看物流';
                                statusall = '再次购买';
                                // orders = '删除订单';
                                $(".wait_fahuo").show();//等待发货
                                $("#content_pers .timersdd").hide();//关闭下单时间
                                $("#ater_comple").show();//已完成订单编号
                                $(".Total_price").hide();//关闭金额
                                $("#buy_again .shenqing").hide();//关闭售后服务
                                $("#buy_again .del_btn").hide();//关闭售后服务
                                orderfinish.smallorders();//查询小订单
                                $(".aga_pay").show();
                            }else if(timer.status == '3'){
                                statusall = '再次购买';
                                // orders = '删除订单';
                            }else if(timer.status == '4'){
                                // orders = '删除订单';
                                statusall = '再次购买';
                                $(".trade_finish").show();//交易完成
                                $("#content_pers .timersdd").hide();//关闭下单时间
                                $("#ater_comple").show();//已完成订单编号
                                $(".Total_price").hide();//关闭金额
                                $(".vip_btns").hide();//VIP显示
                            }else if(timer.status == '5'){
                                // orders = '删除订单';
                                statusall = '再次购买';
                                $(".trade_finish").show();//交易完成
                                $("#content_pers .timersdd").hide();//关闭下单时间
                                $("#ater_comple").show();//已完成订单编号
                                $(".Total_price").hide();//关闭金额
                            }else if(timer.status == '6'){
                                // orders = '删除订单';
                                $(".vip_btns").hide();//VIP显示
                                $(".shenqing").show();//申请售后
                                $(".Total_price").hide();//关闭金额
                                $(".shshouhousssss").show();//申请售后头部
                                $(".aga_pay").hide();
                                shouhou = '查看进度';
                            }else if(timer.status == '7'){
                                // orders = '删除订单';
                                statusall = '再次购买';
                            }
                        }else{
                            // VIP订单
                            if(timer.status == '0'){
                                // $(".vip_btns").html('重新购买');
                                orders = '删除订单';
                                $(".trade_off").show();//交易关闭
                                $("#content_pers .timersdd").hide();//关闭下单时间
                                $("#buy_again .shenqing").hide();//关闭售后服务
                                $("#order_lefts").show();//订单编号
                                $(".Total_price").hide();//关闭支付金额
                                $(".vip_btns").hide();//VIP显示
                            }else if(timer.status == '1'){
                                $(".vip_btns").html('立即付款');
                                orders = '取消订单';
                                $(".wait_pay").show();//等待付款
                                $("#order_lefts").show();
                                $("#buy_again .shenqing").hide();//关闭售后服务
                                $(".vip_btns").show();//VIP显示
                            }else if(timer.status == '2'){
                                // orders = '查看物流';
                                // $(".vip_btns").html('再次购买');
                                orders = '配方生成中';
                                $(".wait_fahuo").show();//等待发货
                                $("#content_pers .timersdd").hide();//关闭下单时间
                                $("#ater_comple").show();//已完成订单编号
                                $(".Total_price").hide();//关闭金额
                                $("#buy_again .shenqing").hide();//关闭售后服务
                                $("#buy_again .del_btn").show();//关闭售后服务
                                orderfinish.smallorders();//查询小订单
                                $(".vip_btns").hide();//VIP显示
                                $("#Small_orders").hide();//隐藏物流信息
                                $(".check_geng_top").hide();//隐藏查看更多
                            }else if(timer.status == '3'){
                                // $(".vip_btns").html('再次购买');
                                // $(".vip_btns").show();//VIP显示
                            }else if(timer.status == '4'){
                                // orders = '删除订单';
                                // shouhou = '申请售后';
                                // $(".vip_btns").html('再次购买');
                                $(".trade_finish").show();//交易完成
                                $("#content_pers .timersdd").hide();//关闭下单时间
                                $("#ater_comple").show();//已完成订单编号
                                $(".Total_price").hide();//关闭金额
                                $(".vip_btns").hide();//VIP显示
                            }else if(timer.status == '5'){
                                // $(".vip_btns").html('再次购买');
                                $(".vip_btns").hide();//VIP显示
                            }else if(timer.status == '6'){
                                // $(".vip_btns").html('再次购买');
                                $(".vip_btns").hide();//VIP显示
                                $(".shenqing").show();//申请售后
                                $(".Total_price").hide();//关闭金额
                                $(".shshouhousssss").show();//申请售后头部
                                shouhou = '查看进度';
                            }else if(timer.status == '7'){
                                // $(".vip_btns").html('再次购买');
                                $(".vip_btns").hide();//VIP显示
                            }else if(timer.status == '8'){
                                // $(".vip_btns").html('再次购买');
                                $(".vip_btns").hide();//VIP显示
                                orders = '选择口味';
                                $(".del_btn").show();//选择口味
                                $(".trade_offvip").show();//显示VIP生成配方
                            }else if(timer.status == '9'){
                                $(".wait_fahuo").show();//等待发货
                                $("#content_pers .timersdd").hide();//关闭下单时间
                                $("#ater_comple").show();//已完成订单编号
                                $(".Total_price").hide();//关闭金额
                                $("#buy_again .shenqing").hide();//关闭售后服务
                                $("#buy_again .del_btn").show();//关闭售后服务
                                orderfinish.smallorders();//查询小订单
                                $(".vip_btns").hide();//VIP显示
                            }
                        }
                        if(timer.status == '9'){
                            $("#buy_again .del_btn").hide();//选择口味
                        }

                        // 添加金额
                        $(".Total_price").append('<span style="color: #ff0101;font-size: 0.64rem;">'+Number((timer.pay_count)/100)+'</span>');
                        // 删除订单按钮
                        $(".del_btn").append('<span>'+orders+'</span>');
                        // 售后按钮
                        $(".shenqing").append('<span>'+shouhou+'</span>');
                        //立即付款
                        $(".aga_pay").append('<span>'+statusall+'</span>');

                        // 重新购买
                        $("#buy_again").on('click','.aga_pay',function () {
                            var fontsize = $(this).find('span').text();
                            var pets_record_id = timer.pets_record_id;
                            if(fontsize == '重新购买') {
                                window.location.href = '/view/products/'+pets_record_id;
                            }
                        });

                        // VIP重新购买
                        // $("#buy_again").on('click','.vip_btns',function () {
                        //     var fontsize = $(this).text();
                        //     if(fontsize == '重新购买') {
                        //         window.location.href = '/view/order_choose/'+pets_record_id;
                        //     }
                        // });

                        // 选择口味
                        $("#buy_again").on('click','.del_btn',function () {
                            var fontsize = $(this).find('span').text();
                            var pets_record_id = timer.pets_record_id;
                            if(fontsize == '选择口味') {
                                window.location.href = '/view/order_choose/'+order_id+'/'+pets_record_id;
                            }
                        });

                        // 配方生成中
                        $("#buy_again").on('click','.del_btn',function () {
                            var fontsize = $(this).find('span').text();
                            if(fontsize == '配方生成中') {
                                window.location.href = '/view/order_pays/'+order_id;
                            }
                        });

                        // 申请售后
                        $("#buy_again").on('click','.shenqing',function () {
                            var fontsize = $(this).find('span').text();
                            if(fontsize == '查看进度') {
                                window.location.href = '/view/after_sale';
                            }
                        });

                        if(timer.status == '0'){
                            $(".del_btn").show();
                        }else if(timer.status == '1'){
                            $(".del_btn").show();
                        }

                        // 查询子订单
                        var wapperconsss = '';
                        $.ajax({
                            url: "/order/item/"+order_id,
                            type: "get",
                            dataType:"json",
                            data:{},
                            success:function(res){
                                if(res.code == '200'){
                                    var datas = res.data.detail;
                                    if(timer.type == '0'){
                                        $.each(datas, function (key, val) {
                                            courier_number = val.courier_number;
                                            wapperconsss += '<div class="wait_fahuo_bot" style="position: relative;" data-id="'+val.courier_number+'" data-ids="'+val.id+'">' +
                                                '<p style="line-height: 1.5rem;height: 1.5rem;color: #666;"><span style="margin-right:0.5rem;font-size: 0.64rem;" class="logistics">您的订单将于'+val.delivery_date+'发出</span><img src="/static/images/go.png" style="position: absolute;right: 0;top: 0.55rem;"/></p>' +
                                                '<p style="line-height: 1.2rem;height: 1.2rem;color: #999;font-size: 0.64rem">'+val.delivery_date+'</p>' +
                                                '<div class="look_logistics" data-id="'+val.courier_number+'" data-ids="'+val.id+'" data-status="'+val.status+'">查看物流</div>'+
                                                '</div>';
                                        });
                                        $("#Small_orders").prepend(wapperconsss);
                                        $("#Small_orders").on('click','.wait_fahuo_bot',function () {
                                            var courier_number = $(this).attr('data-id');
                                            var contents = $(this).find('.logistics');
                                            //判断是否有订单号
                                            if(courier_number == ''){
                                                $(this).find('.look_logistics').hide();
                                            }else{
                                                $(this).find('.look_logistics').show();
                                            }
                                            //默认第一条信息
                                            $("#Small_orders").find('.wait_fahuo_bot:eq(0)').find('.logistics').html('您的订单已抵达厨房,鲜食正在制作中');
                                            $.ajax({
                                                url: "/order/kuaidi/"+courier_number,
                                                type: "get",
                                                dataType:"json",
                                                data:{},
                                                success:function(res){
                                                    if(res.code == '200'){
                                                        var cont = res.data.state;
                                                        if(cont!= undefined){
                                                            if(cont == '0'){
                                                                // contenscont = '您的订单正在配送中';
                                                                contents.html('您的订单正在配送中');
                                                            }else if(cont == '1'){
                                                                // contenscont = '您的订单正在揽件中';
                                                                contents.html('您的订单正在揽件中');
                                                            }else if(cont == '2'){
                                                                // contenscont = '您的订单寄送过程中出了问题';
                                                                contents.html('您的订单寄送过程中出了问题');
                                                            }else if(cont == '3'){
                                                                // contenscont = '您的订单已签收';
                                                                contents.html('您的订单已签收');
                                                            }else if(cont == '4'){
                                                                // contenscont = '您的订单被拒签';
                                                                contents.html('您的订单被拒签');
                                                            }else if(cont == '5'){
                                                                // contenscont = '您的订单正在派件中';
                                                                contents.html('您的订单正在派件中');
                                                            }else if(cont == '6'){
                                                                // contenscont = '您的订单正在退回中';
                                                                contents.html('您的订单正在退回中');
                                                            }
                                                        }
                                                    }else if(res.code == '401'){
                                                        window.location.href = '/view/login';
                                                    }
                                                },
                                                error:function () {
                                                    bombboxhints("服务器出错");
                                                }
                                            });
                                        });
                                        $("#Small_orders").find('.wait_fahuo_bot:eq(0)').click();
                                        $("#Small_orders").find('.wait_fahuo_bot:eq(1)').click();
                                        $("#Small_orders").find('.wait_fahuo_bot:eq(2)').click();
                                        $("#Small_orders").find('.wait_fahuo_bot:eq(3)').click();
                                        $("#Small_orders").find('.wait_fahuo_bot:eq(4)').click();
                                        $("#Small_orders").find('.wait_fahuo_bot:eq(5)').click();
                                    }else{
                                        $.each(datas, function (key, val) {
                                            courier_number = val.courier_number;
                                            wapperconsss += '<div class="wait_fahuo_bot" style="position: relative;" data-id="'+val.courier_number+'" data-ids="'+val.id+'">' +
                                                '<p style="line-height: 1.5rem;height: 1.5rem;color: #666;"><span style="margin-right:0.5rem;font-size: 0.64rem;" class="logistics">您的订单将于'+val.delivery_date+'发出</span><img src="/static/images/go.png" style="position: absolute;right: 0;top: 0.55rem;"/></p>' +
                                                '<p style="line-height: 1.2rem;height: 1.2rem;color: #999;font-size: 0.64rem;">'+val.delivery_date+'</p>' +
                                                '<div class="look_logistics" data-id="'+val.courier_number+'" data-ids="'+val.id+'" data-status="'+val.status+'">查看物流</div>'+
                                                '</div>';
                                        });
                                        $("#Small_orders").prepend(wapperconsss);
                                        $("#Small_orders").on('click','.wait_fahuo_bot',function () {
                                            var courier_number = $(this).attr('data-id');
                                            var contents = $(this).find('.logistics');
                                            if(courier_number == ''){
                                                $(this).find('.look_logistics').hide();
                                            }else{
                                                $(this).find('.look_logistics').show();
                                            }
                                            $.ajax({
                                                url: "/order/kuaidi/"+courier_number,
                                                type: "get",
                                                dataType:"json",
                                                data:{},
                                                success:function(res){
                                                    if(res.code == '200'){
                                                        var cont = res.data.state;
                                                        if(cont!= undefined){
                                                            if(cont == '0'){
                                                                // contenscont = '您的订单正在配送中';
                                                                contents.html('您的订单正在配送中');
                                                            }else if(cont == '1'){
                                                                // contenscont = '您的订单正在揽件中';
                                                                contents.html('您的订单正在揽件中');
                                                            }else if(cont == '2'){
                                                                // contenscont = '您的订单寄送过程中出了问题';
                                                                contents.html('您的订单寄送过程中出了问题');
                                                            }else if(cont == '3'){
                                                                // contenscont = '您的订单已签收';
                                                                contents.html('您的订单已签收');
                                                            }else if(cont == '4'){
                                                                // contenscont = '您的订单被拒签';
                                                                contents.html('您的订单被拒签');
                                                            }else if(cont == '5'){
                                                                // contenscont = '您的订单正在派件中';
                                                                contents.html('您的订单正在派件中');
                                                            }else if(cont == '6'){
                                                                // contenscont = '您的订单正在退回中';
                                                                contents.html('您的订单正在退回中');
                                                            }
                                                        }
                                                    }else if(res.code == '401'){
                                                        window.location.href = '/view/login';
                                                    }
                                                },
                                                error:function () {
                                                    bombboxhints("服务器出错");
                                                }
                                            });
                                        });
                                        $("#Small_orders").find('.wait_fahuo_bot:eq(0)').click();
                                        $("#Small_orders").find('.wait_fahuo_bot:eq(1)').click();
                                        $("#Small_orders").find('.wait_fahuo_bot:eq(2)').click();
                                        $("#Small_orders").find('.wait_fahuo_bot:eq(3)').click();
                                        $("#Small_orders").find('.wait_fahuo_bot:eq(4)').click();
                                        $("#Small_orders").find('.wait_fahuo_bot:eq(5)').click();
                                    }
                                }else if(res.code == '401'){
                                    window.location.href='/view/login';
                                }
                            },
                            error:function () {
                                bombboxhints("服务器出错");
                            }
                        });
                    }else if(res.code == '401'){
                        window.location.href='/view/login';
                    }
                },
                error: function () {
                    bombboxhints("服务器出错");
                }
            });
        },100);

        // 商品详情
        $("#shop_infos").on('click','.shop_info_s',function () {
            var foodid = $(this).attr('data-id');
            var product_price = $(this).attr('data-price');
            window.location.href = '/view/shop_info/'+foodid+'/'+product_price+'/'+pay_type;
        });

        // 普通点击去支付
        $("#buy_again").on('click','.aga_pay',function () {
            var fontsize = $(this).text();
            if(fontsize == '立即付款'){
                orderfinish.payings(order_id);
            }else if(fontsize == '再次购买'){
                // 生成订单
                // $.ajax({
                //     url: "/order/create",
                //     type: "post",
                //     dataType:"json",
                //     data:{
                //         "pet_id":pets_record_id,
                //         "taste":JSON.stringify(taste),
                //         "cycle":cycle,
                //         "area":$("#content_pers .your-adress02").text(),
                //         "phone":$("#content_pers .telephones").text(),
                //         "addressee":$("#content_pers .addresss").text()
                //     },
                //     success:function(mag){
                //         if(mag.code == '200'){
                //             var order_id = mag.data.order_id;
                //             orderfinish.payings(order_id);
                //         }else if(mag.code == '401'){
                //             window.location.href='/view/login';
                //         }
                //     },
                //     error:function () {
                //         bombboxhints("服务器出错");
                //     }
                // });
                window.location.href = '/view/products/'+pets_record_id;
            }
        });

        //VIP支付
        $(".vip_btns").on('click',function () {
            var fontsize = $(this).text();
            if(fontsize == '立即付款'){
                orderfinish.ordervips(order_id);
            }else if(fontsize == '再次购买'){
                // 生成订单
                $.ajax({
                    url: "/order/create",
                    type: "post",
                    dataType:"json",
                    data:{
                        "pet_id":pets_record_id,
                        "taste":JSON.stringify(taste),
                        "cycle":cycle,
                        "area":$("#content_pers .your-adress02").text(),
                        "phone":$("#content_pers .telephones").text(),
                        "addressee":$("#content_pers .addresss").text()
                    },
                    success:function(mag){
                        if(mag.code == '200'){
                            var order_id = mag.data.order_id;
                            orderfinish.ordervips(order_id);
                        }else if(mag.code == '401'){
                            window.location.href='/view/login';
                        }
                    },
                    error:function () {
                        bombboxhints("服务器出错");
                    }
                });
            }
        });

        // 取消订单
        $("#buy_again").on('click','.del_btn',function () {
            var fontsize = $(this).find('span').text();
            if(fontsize == '取消订单') {
                $(".quxiaobuttons").show();
            }
        });
        $(".quannius").on('click',function () {
            // 取消订单
            $.ajax({
                url: "/order/cancel/"+order_id,
                type: "get",
                dataType:"json",
                data:{},
                success:function(res){
                    if(res.code == '200'){
                        $(".greybg02").hide();
                        window.location.href='/view/order_finish/'+order_id;
                    }else if(res.code == '401'){
                        window.location.href='/view/login';
                    }
                },
                error:function () {
                    bombboxhints("服务器出错");
                }
            });
        });
        // 删除订单
        $("#buy_again").on('click','.del_btn',function () {
            var fontsize = $(this).find('span').text();
            if(fontsize == '删除订单') {
                $(".shanchubuttons").show();
            }
        });
        $(".shuannius").on('click',function () {
            // 删除订单
            $.ajax({
                url: "/order/delete/"+order_id,
                type: "get",
                dataType:"json",
                data:{},
                success:function(res){
                    if(res.code == '200'){
                        $(".greybg02").hide();
                        window.location.href='/view/select_order';
                    }else if(res.code == '401'){
                        window.location.href='/view/login';
                    }
                },
                error:function () {
                    bombboxhints("服务器出错");
                }
            });
        });
        // 关闭模态框
        $(".quxiao").on('click',function () {
            $(".greybg02").hide();
        });
    },
    smallorders:function () {
        // 点击查看更多
        $(".check_geng_top").on('click',function () {
            $("#Small_orders").removeClass('change_height');
            $(this).hide();
            $(this).next().show();
        });
        // 点击收起
        $(".check_geng_bot").on('click',function () {
            $("#Small_orders").addClass('change_height');
            $(this).hide();
            $(this).prev().show();
        });
        // 查看物流
        $("#Small_orders").on('click','.look_logistics',function () {
            var courier_number = $(this).attr('data-id');
            var order_ids = $(this).attr('data-ids');
            var status = $(this).attr('data-status');
            window.location.href = '/view/order_tracking/'+courier_number+'/'+order_ids+'/'+status;
        });
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
    //VIP支付
    ordervips:function (order_id) {
        $.ajax({
            url: "/order/pay/"+order_id,
            type: "get",
            async:false,
            dataType:'json',
            success: function(mag) {
                // 支付成功之后回调
                function Paymentcallback(statusid){
                    $.ajax({
                        url: "/order/notify",
                        type: "post",
                        dataType:"json",
                        data:{
                            "order_id":order_id,
                            "status":statusid,
                        },
                        success:function(res){
                            if(res.code == '401'){
                                window.location.href='/view/login';
                            }
                        },
                        error:function () {
                            bombboxhints("服务器出错");
                        }
                    });
                }
                if(mag.code == '200'){
                    var res = JSON.parse(mag.data.pay_json);
                    WeixinJSBridge.invoke('getBrandWCPayRequest', {
                        "appId": res.appId,
                        "timeStamp": res.timeStamp,
                        "nonceStr": res.nonceStr,
                        "package": res.package,
                        "signType": res.signType,
                        "paySign": res.paySign
                    }, function (res) {
                        if (res.err_msg == 'get_brand_wcpay_request:ok') {
                            bombboxhints('支付成功!谢谢您的光临!');
                            Paymentcallback(1);
                            setTimeout(function () {
                                window.location.href="/view/order_pays/"+order_id;
                            },1000);
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            bombboxhints('取消订单!');
                            Paymentcallback(0);
                            setTimeout(function () {
                                window.location.href="/view/order_finish/"+order_id;
                            },1000);
                        } else {
                            bombboxhints('错误订单!');
                        }
                    });
                }else if(mag.code == '401'){
                    window.location.href='/view/login';
                }
            },
            error: function () {
                bombboxhints('服务器出错');
            }
        });
    },
    wuliuinformation:function (courier_number,cont) {

    }
};
orderfinish.intercept();
orderfinish.monitor();
//复制功能
function conts(x) {
    var clipboard = new Clipboard(x);
    clipboard.on('success', function(e) {
        bombboxhints("复制成功");
        e.clearSelection();
    });
}
conts('#order_leftcont #copy_btn');
conts('#ater_completion #copy_annius');

