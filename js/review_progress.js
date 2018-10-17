var order_id = location.href.split("review_progress/")[1].split("/")[1];
var id = location.href.split("review_progress/")[1].split("/")[0];
console.log(order_id);
console.log(id);
//查看订单编号
$.ajax({
    url: "/order/detail/"+order_id,
    type: "get",
    dataType:"json",
    success:function(msg){
        // console.log(msg);
        if(msg.code=='200'){
            $(".order_no").html(msg.data.order_no);
        }else if(msg.code=='401'){
            window.location.href = "/view/login";
        }
    },
    error:function(){
        bombboxhints("网络超时");
    }
})
$.ajax({
    url: "/order/after_service/"+id,
    type: "get",
    dataType:"json",
    success:function(msg){
        console.log(msg);
        if(msg.code=='200'){
            $(".order_time").html(msg.data.create_time);
            $("#desc").html(msg.data.desc);
            var wapper = '';
            var status = msg.data.status;
            var shenhe_pro = '';
            $(".time").html(msg.data.create_time);
            if(status=='1'){
                shenhe_pro = "您的服务单已申请成功，待售后审核中";
                $(".wuliu_con_left .point").eq(5).addClass("choose_p");
                $(".wuliu_con_left .point").eq(5).siblings().css("display","none");
                $(".wuliu_con_right p").eq(5).find(".time").css("color","#999999");
                $(".wuliu_con_right p").eq(5).siblings().css("display","none");
                $(".wuliu_con_right p").eq(5).find(".txt_top").css("color","#f00");
                $(".wuliu_con_right p").eq(5).siblings().css("display","none");
                $(".wuliu_con_right p").eq(5).find(".time").css("color","#999999");
                $(".wuliu_con_right p").eq(5).find(".txt_top").css("color","#f00");
            }else if(status=='2'){
                shenhe_pro = "您的服务单已审核通过，请将商品寄往售后部";
                $(".wuliu_con_left .point").eq(4).addClass("choose_p");
                $(".wuliu_con_left .point").eq(4).prevAll().css("display","none");
                $(".wuliu_con_right p").eq(4).prevAll().css("display","none");
                $(".wuliu_con_right p").eq(4).find(".time").css("color","#999999");
                $(".wuliu_con_right p").eq(4).find(".txt_top").css("color","#f00");
            }else if(status=='3'){
                shenhe_pro = "您的售后服务单已完成，感谢您的支持与理解！";
                $(".wuliu_con_left .point").eq(0).addClass("choose_p");
                $(".wuliu_con_right p").eq(0).find(".time").css("color","#999999");
                $(".wuliu_con_right p").eq(0).find(".txt_top").css("color","#f00");
            }else if(status=='4'){
                shenhe_pro = "您的服务单退款失败";
                $(".wuliu_con_right p").eq(4).find(".txt_top").html("您的服务单退款失败");
                $(".wuliu_con_left .point").eq(4).addClass("choose_p");
                $(".wuliu_con_left .point").eq(4).prevAll().css("display","none");
                $(".wuliu_con_right p").eq(4).prevAll().css("display","none");
                $(".wuliu_con_right p").eq(4).find(".time").css("color","#999999");
                $(".wuliu_con_right p").eq(4).find(".txt_top").css("color","#f00");
            }else if(status=='5'){
                shenhe_pro = "您的商品已收到";
                $(".wuliu_con_left .point").eq(3).addClass("choose_p");
                $(".wuliu_con_left .point").eq(3).prevAll().css("display","none");
                $(".wuliu_con_right p").eq(3).prevAll().css("display","none");
                $(".wuliu_con_right p").eq(3).find(".time").css("color","#999999");
                $(".wuliu_con_right p").eq(3).find(".txt_top").css("color","#f00");
            }else if(status=='6') {
                shenhe_pro = "您的服务单已提交退款申请";
                $(".wuliu_con_left .point").eq(2).addClass("choose_p");
                $(".wuliu_con_left .point").eq(2).prevAll().css("display","none");
                $(".wuliu_con_right p").eq(2).prevAll().css("display","none");
                $(".wuliu_con_right p").eq(2).find(".time").css("color", "#999999");
                $(".wuliu_con_right p").eq(2).find(".txt_top").css("color","#f00");
            }else if(status=='7') {
                shenhe_pro = "您的退款申请业务主管已审核，等待财务确认";
                $(".wuliu_con_left .point").eq(1).addClass("choose_p");
                $(".wuliu_con_left .point").eq(1).prevAll().css("display","none");
                $(".wuliu_con_right p").eq(1).prevAll().css("display","none");
                $(".wuliu_con_right p").eq(1).find(".time").css("color", "#999999");
                $(".wuliu_con_right p").eq(1).find(".txt_top").css("color","#f00");
            }
            $("#shenhe_pro").html(shenhe_pro);
        }else if(msg.code=='401'){
            window.location.href = "/view/login";
        }
    },
    error:function(){
        bombboxhints("网络超时");
    }
})
$(".back").click(function () {
    window.location.replace(document.referrer);
})
