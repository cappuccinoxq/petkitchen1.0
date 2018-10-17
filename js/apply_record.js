var orderr_id = '';
var iiid = '';
$.ajax({
    url: "/order/after_service",
    type: "get",
    dataType: "json",
    success: function(res){
        if(res.code=="200"){
            if(res.data==''){
                $(".null_bg").show()
            }else{
                $(".null_bg").hide()
                $.each(res.data,function (key,val) {
                    orderr_id = val.order_id;
                    iiid = val.id;
                    ajax_order(orderr_id,iiid);
                })
            }
        }else if(res.code=="401"){
            window.location.href="/view/login.html";
        }
    },
    error: function () {
        bombboxhints('服务器出错');
    }
});
//查看订单详情
var wapper='';
function ajax_order(orderr_id,iiid){
    $.ajax({
        url: "/order/detail/"+orderr_id,
        type: "get",
        dataType:"json",
        success:function(msg){
            console.log(msg)
            var wapper1 = '';
            $.each(msg.data.food,function (key,val) {
                wapper1+=val.product_taste+"  ";
            })
            if(msg.code=='200'){
                if(msg.data.cycle == '1'){
                    msg.data.cycle = '一周';
                }else if(msg.data.cycle == '2'){
                    msg.data.cycle = '二周';
                }else if(msg.data.cycle == '4'){
                    msg.data.cycle = '四周';
                }else if(msg.data.cycle == '8'){
                    msg.data.cycle = '两个月';
                }else if(msg.data.cycle == '12'){
                    msg.data.cycle = '三个月';
                }
                var img = '';
                if(msg.data.type=='0'){
                    img = "/static/images/shop_info.png";
                }else if(msg.data.type=='1'){
                    img = "/static/images/vipss.png";
                }
                wapper+='<li class="after_sale">'+
                    '<p class="after_sale_top">'+'<span class="time">'+'订单编号：'+'</span>'+'<span class="txt">'+msg.data.order_no+'</span>'+'</p>'+
                    '<p class="after_sale_top">'+'<span class="time">'+'下单时间：'+'</span>'+'<span class="txt">'+msg.data.create_at+'</span>'+'</p>'+
                    '<div class="xq_box">'+
                    '<p class="after_sale_mid">'+'<span class="img_g">'+'<img src='+img+'>'+'</span>'+
                    '<span class="shop_info">'+'<span class="name">'+msg.data.name+'</span>'+
                    '<span class="taste">'+'<span>'+'口味：'+'</span>'+'<span>'+wapper1+'</span>'+'</span>'+
                    '<span class="cycle">'+'<span>'+'定制周期：'+'</span>'+'<span>'+msg.data.cycle+'</span>'+'</span>'+
                    '</span>'+
                    '</p>'+
                    '<p class="after_sale_bot" id="after_sale_bot">'+
                    '<span class="order_id_">'+iiid+'</span>'+
                    '<span class="order_id">'+msg.data.id+'</span>'+
                    '<img class="logo" src="/static/images/order_pays_02.png">'+
                    '<span>已完成</span>'+
                    '<img class="go" src="/static/images/go.png">'+
                    '</p>'+
                    '</div>'+
                    '</li>'
            }else if(msg.code=='401'){
                window.location.href = "/view/login";
            }
        },
        error:function(){
            bombboxhints("网络超时");
        }
    })
}
setTimeout(function () {
    $(".after_sale_list_l").html(wapper);
},500)

$(".cup_type li").click(function () {
    var index = $(this).index();
    if(index==0){
        //可以申请售后的订单
        window.location.href="/view/after_sale";
    }else if(index==1){
        //售后申请列表
        window.location.href="/view/apply_record"

    }
});

$(".after_sale_list_l").on('click','.xq_box',function () {
    var id = $(this).find(".order_id_").html();
    var order_id = $(this).find(".order_id").html();
    window.location.href="/view/record_detail/"+id+"/"+order_id;
})