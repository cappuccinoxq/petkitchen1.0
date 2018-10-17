var order_id = location.href.split("record_detail/")[1].split("/")[1];
var id = location.href.split("record_detail/")[1].split("/")[0];
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
                shenhe_pro = "您的申请已提交";
                $(".address_top .choose").eq(4).addClass("choose_y");
                $(".address_mid .point").eq(0).addClass("choose_p");
                $(".address_bot p").eq(0).find(".time").css("color","#999999");
                $(".address_bot p").eq(0).find(".txt").css("color","#999999");
            }else if(status=='2'){
                shenhe_pro = "您的申请已审核";  
                $(".address_top .choose").eq(3).addClass("choose_y");
                $(".address_mid .point").eq(1).addClass("choose_p");
                $(".address_mid .lin").eq(0).css("background","#cccccc");
                $(".address_bot p").eq(0).find(".time").css("color","#999999");
                $(".address_bot p").eq(0).find(".txt").css("color","#999999");
                $(".address_bot p").eq(1).find(".time").css("color","#999999");
                $(".address_bot p").eq(1).find(".txt").css("color","#999999");
            }else if(status=='3'){
                shenhe_pro = "您的服务单财务已退款，请注意查收";
                $(".address_top .choose").eq(0).addClass("choose_y");
                $(".address_mid .point").css("background","#cccccc");
                $(".address_mid .point").eq(4).addClass("choose_p");
                $(".address_mid .lin").css("background","#cccccc");
                $(".address_bot p").eq(4).find(".time").css("color","#999999");
                $(".address_bot p").find(".txt").css("color","#999999");
            }else if(status=='4'){
                shenhe_pro = "您的服务单退款失败";  
                $(".address").hide();
                $(".address_j").show();
            }else if(status=='5'){
                shenhe_pro = "售后已经收货";
                $(".address_mid .point").eq(0).css("background","#cccccc");
                $(".address_mid .point").eq(1).css("background","#cccccc");
                $(".address_mid .lin").eq(0).css("background","#cccccc");
                $(".address_mid .lin").eq(1).css("background","#cccccc");
                $(".address_top .choose").eq(2).addClass("choose_y");
                $(".address_mid .point").eq(2).addClass("choose_p");
                $(".address_bot .txt").eq(0).css("color","#999999");
                $(".address_bot .txt").eq(1).css("color","#999999");
                $(".address_bot .txt").eq(2).css("color","#999999");
                $(".address_bot p").eq(2).find(".time").css("color","#999999");
            }else if(status=='6') {
                shenhe_pro = "正在进行退款";
                $(".address_top .choose").eq(1).addClass("choose_y");
                $(".address_mid .point").eq(0).css("background","#cccccc");
                $(".address_mid .point").eq(1).css("background","#cccccc");
                $(".address_mid .point").eq(2).css("background","#cccccc");
                $(".address_mid .point").eq(3).addClass("choose_p");
                $(".address_mid .lin").eq(0).css("background","#cccccc");
                $(".address_mid .lin").eq(1).css("background","#cccccc");
                $(".address_mid .lin").eq(2).css("background","#cccccc");
                $(".address_bot .txt").eq(0).css("color","#999999");
                $(".address_bot .txt").eq(1).css("color","#999999");
                $(".address_bot .txt").eq(2).css("color","#999999");
                $(".address_bot .txt").eq(3).css("color","#999999");
                $(".address_bot p").eq(3).find(".time").css("color", "#999999");
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
    $(".shenhe").click(function () {
        window.location.href="/view/review_progress/"+id+"/"+order_id;
    })
