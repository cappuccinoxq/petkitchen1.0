// var orderr_id = '';
// var iiid = '';
//可以申请售后的订单
$.ajax({
    url: "/order/after_service_able",
    type: "get",
    dataType: "json",
    success: function(res){
        console.log(res);
        if(res.code=="200"){
            if(res.data==''){
                $(".null_bg").show();
            }else{
                var wapper = '';
                $.each(res.data,function (key,val) {
                    var wapper1 = '';
                    $.each(val.taste,function (x_key,x_val) {
                        wapper1  += x_val+"   ";
                    })
                    if(val.cycle == '1'){
                        val.cycle = '一周';
                    }else if(val.cycle == '2'){
                        val.cycle = '二周';
                    }else if(val.cycle == '4'){
                        val.cycle = '四周';
                    }else if(val.cycle == '8'){
                        val.cycle = '两个月';
                    }else if(val.cycle == '12'){
                        val.cycle = '三个月';
                    }
                    var img = '';
                    if(val.type=='0'){
                        img = "/static/images/shop_info.png";
                    }else if(val.type=='1'){
                        img = "/static/images/vipss.png";
                    }
                    wapper+='<li class="after_sale">'+
                        '<p class="after_sale_top">'+'<span class="time">'+'订单编号：'+'</span>'+'<span class="txt">'+val.order_no+'</span>'+'</p>'+
                        '<p class="after_sale_top">'+'<span class="time">'+'下单时间：'+'</span>'+'<span class="txt">'+val.create_at+'</span>'+'</p>'+
                        '<div class="x_box">'+
                        '<p class="after_sale_mid">'+'<span class="img_g">'+'<img src='+img+'>'+'</span>'+
                        '<span class="shop_info">'+'<span class="name">'+val.pet_name+'</span>'+
                        '<span class="taste">'+'<span>'+'口味：'+'</span>'+'<span>'+wapper1+'</span>'+'</span>'+
                        '<span class="cycle">'+'<span>'+'定制周期：'+'</span>'+'<span>'+val.cycle+'</span>'+'</span>'+
                        '</span>'+
                        '</p>'+
                        '<p class="after_sale_bot">'+
                        '<span class="order_id">'+val.id+'</span>'+
                        '<button id="btn">'+'申请退货'+'</button>'+
                        '</p>'+
                        '</div>'+
                        '</li>'
                })
                $(".after_sale_list").html(wapper);
            }

        }else if(res.code=="401"){
            window.location.href="/view/login.html";
        }
    },
    error: function () {
        bombboxhints('服务器出错');
    }
});
$(".cup_type li").click(function () {
    var index = $(this).index();
    if(index==0){
        //可以申请售后的订单
        window.location.href="/view/after_sale";
    }else if(index==1){
        //售后申请列表
        window.location.href="/view/apply_record";
    }
});

$(".after_sale_list").on('click','.x_box',function () {
    var order_id = $(this).find(".order_id").html();
    window.location.href="/view/apply_return_good/"+order_id;
})
