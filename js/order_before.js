/**
 * Created by Administrator on 2018/6/27.
 *  公共JS  jack
 *
 */
'use strict';
var status;
var id_arr = location.href;
var add_id = id_arr.split("before/")[1];
var shangmen_id;   //后台获取到的的id
var order_before = {
    inites:function () {
        // 接收信息
        $.ajax({
            url: "/order/vip_detail/"+add_id,
            type: "get",
            dataType:"json",
            success: function(msg) {
                if(msg.code=='200'){
                    var person_name = msg.data.person_name;     //姓名
                    var technician = msg.data.technician;
                    var phone = msg.data.phone;          //手机号
                    var area = msg.data.area;            //检测地址
                    var create_time = msg.data.update_time;     //下单时间
                    var pet_str = msg.data.pet_info;
                    var status = msg.data.status;
                    var order_id = msg.data.order_id;
                    var pet_id = msg.data.pet_id;
                    var pet_type = msg.data.pet_type;       //宠物类型
                    var pet_weight = msg.data.pet_weight;   //宠物体型
                    var wapper = "";
                    wapper+=
                        '<p>'+person_name+ '<span>'+phone+'</span>' + '</p>'+
                        '<p>'+"检测地址："+area+'</p>' +
                        '<p>'+"下单时间："+create_time+'</p>'
                    ;
                    $(".order_before_message").html(wapper);
                    if(pet_type==1 && pet_weight==1){
                        $(".pet_lei").html("<p class='kuang'><img src='/static/images/infor_before_02_1.png'></p>"+"<p>猫</p>");
                        $(".pet_ti").html("<p class='txt'><img src='/static/images/infor_before_07.png'></p>"+"<p>小型</p>");
                    }else if(pet_type==1 && pet_weight==2){
                        $(".pet_lei").html("<p class='kuang'><img src='/static/images/infor_before_02_1.png'></p>"+"<p>猫</p>");
                        $(".pet_ti").html("<p class='txt'><img src='/static/images/infor_before_08.png'></p>"+"<p>中型</p>");
                    }else if(pet_type==2 && pet_weight==1){
                        $(".pet_lei").html("<p class='kuang_d'><img src='/static/images/infor_before_03_1.png'></p>"+"<p>狗</p>");
                        $(".pet_ti").html("<p class='txt'><img src='/static/images/infor_before_04.png'></p>"+"<p>小型</p>");
                    }else if(pet_type==2 && pet_weight==2){
                        $(".pet_lei").html("<p class='kuang_d'><img src='/static/images/infor_before_03_1.png'></p>"+"<p>狗</p>");
                        $(".pet_ti").html("<p class='txt'><img src='/static/images/infor_before_05.png'></p>"+"<p>中型</p>");
                    }else if(pet_type==2 && pet_weight==3){
                        $(".pet_lei").html("<p class='kuang_d'><img src='/static/images/infor_before_03_1.png'></p>"+"<p>狗</p>");
                        $(".pet_ti").html("<p class='txt'><img src='/static/images/infor_before_06.png'></p>"+"<p>大型</p>");
                    }
                    if(status == '3'){
                        $("#btn").css(
                            "background","#9DAD6C"
                        );
                        $("#btn").click(function () {
                            window.location.href= "/view/order_after/"+pet_id+"/"+add_id;
                        });
                        $("#btn").click(function () {
                            if(order_id == '0'){
                                window.location.href = "/view/order_after/"+pet_id+"/"+add_id;
                            }else{
                                window.location.href = "/view/order_finish/"+order_id;
                            }
                        })
                    }
                }
            }
        });
        $(".back_btn").click(function () {
            window.location.href="/view/infor_before"
        })
    }
};
order_before.inites();