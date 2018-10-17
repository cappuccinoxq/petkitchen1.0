/**
 * Created by Administrator on 2018/6/27.
 *  配送周期数据  jack
 *
 */
'use strict';
var distributioncycle = {
    dataall:function () {
        // 查询订单详情
        $.ajax({
            url: "sele_delivery_cycle",
            type: "post",
            async:false,
            dataType: "json",
            data:{"id":id},
            success: function(res) {
                var wapper = '';
                var dataall = '';
                $.each(res, function (key, val) {
                    if(val.status == "1"){
                        dataall = '配送中';
                    }else if(val.status == '2'){
                        dataall = '未配送';
                    }else if(val.status == '3'){
                        dataall = '已完成';
                    }else if(val.status == '0'){
                        dataall = '';
                    }
                    wapper += '<li class="delivery_contents" data-id='+val.id+'>' +
                        '<p>'+val.delivery_date+'</p>' +
                        '<p>'+val.products_taste+'</p>' +
                        '<p class="statusde">'+dataall+'</p>' +
                        '</li>'
                });
                $(".deliveycyclesds").append(wapper);
            },
            error: function (res) {
                console.log(res);
            }
        });
        // 查询物流
        $.ajax({
            url: "courier_number",
            type: "post",
            async:false,
            dataType: "json",
            data:{"orderId":id},
            success: function(res) {
                var wapper = '';
                var count = res.data;
                $.each(count, function (key, val) {
                    wapper+= '<li>' +
                            '<b></b>' +
                            '<p>'+val.context+'</p>' +
                            '<span>'+val.time+'</span>' +
                            '</li>';
                });
                $("#receiving_address").html(wapper);
            },
            error: function (res) {
                console.log(res);
            }
        });
        // 点击列表查询物流详情
        $("#delivery_cycle_zt").on('click','.delivery_contents',function () {
            var order_id = $(this).attr('data-id');
            $.ajax({
                url: "courier_number",
                type: "post",
                async:false,
                dataType: "json",
                data:{"order_id":order_id},
                success: function(res) {
                    var count = res.data;
                    var wapper = '';
                    $.each(count, function (key, val) {
                        wapper+= '<li>' +
                            '<b></b>' +
                            '<p>'+val.context+'</p>' +
                            '<span>'+val.time+'</span>' +
                            '</li>';
                    });
                    $("#receiving_address").html(wapper);
                },
                error: function (res) {
                    console.log(res);
                }
            });
        })
    }
};
distributioncycle.dataall();