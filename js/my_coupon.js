$(document).ready(function () {
    //未使用的
    $.ajax({
        url: "/coupon/all/0",
        type: "get",
        dataType: "json",
        success: function(msg) {
            console.log(msg);
            if(msg.code == '200'){
                if(msg.data==''){
                    $(".null_bg").show()
                }else{
                    var wapper='';
                    $.each(msg.data,function (key,val) {
                        wapper+='<li class="commom" id="cuplist">'+
                            '<span class="id">'+val.id+'</span>'+
                            '<p class="new_left">'+
                            '<span class="new_left_top">'+"￥"+val.discount_money/100+'</span>'+
                            '<span class="new_left_bot">'+"消费满"+val.limit_money/100+"减"+val.discount_money/100+'</span>'+
                            '</p>'+
                            '<p class="new_right">'+
                            '<span class="new_right_top">'+'满'+val.limit_money/100+"元减"+val.discount_money/100+"元代金券"+'</span>'+
                            '<span class="new_right_mid">'+'<span>'+"试用产品："+'</span>'+'<span>'+"所有产品"+'</span>'+'</span>'+
                            '<span class="new_right_mid">'+'<span>'+"有效期至："+'</span>'+'<span>'+val.end_time+'</span>'+'</span>'+
                            '</p>'+
                            '</li>'
                    })
                    $(".cup_list_n").html(wapper);
                }

            }else if(msg.code=='401'){
                window.location.href="https://test.petskitchen.com.cn/view/login"
            }
        },
        error:function () {
            bombboxhints('服务器出错');
        }
    });
     $(".cup_type li").click(function () {
         $(".null_bg").hide()
         $(this).css("border-bottom","1px solid #9DAD6C");
         $(this).css("color","#333333");  
         $(this).siblings().css("border-bottom","1px solid transparent");
         $(this).siblings().css("color","#999999");  
         var index = $(this).index();
         $(".cup_list ul").eq(index).css("display","block");
         $(".cup_list ul").eq(index).siblings().css("display","none");
         var type = $(this).val();
         if(type==0){
             $.ajax({
                 url: "/coupon/all/0",
                 type: "get",
                 dataType: "json",
                 success: function(msg) {
                     console.log(msg);
                     if(msg.code == '200'){
                         if(msg.data==''){
                             $(".null_bg").show()
                         }else{
                             var wapper='';
                             $.each(msg.data,function (key,val) {
                                 wapper+='<li class="commom" id="cuplist">'+
                                     '<span class="id">'+val.id+'</span>'+
                                     '<p class="new_left">'+
                                     '<span class="new_left_top">'+"￥"+val.discount_money/100+'</span>'+
                                     '<span class="new_left_bot">'+"消费满"+val.limit_money/100+"减"+val.discount_money/100+'</span>'+
                                     '</p>'+
                                     '<p class="new_right">'+
                                     '<span class="new_right_top">'+'满'+val.limit_money/100+"元减"+val.discount_money/100+"元代金券"+'</span>'+
                                     '<span class="new_right_mid">'+'<span>'+"试用产品："+'</span>'+'<span>'+"所有产品"+'</span>'+'</span>'+
                                     '<span class="new_right_mid">'+'<span>'+"有效期至："+'</span>'+'<span>'+val.end_time+'</span>'+'</span>'+
                                     '</p>'+
                                     '</li>'
                             })
                             $(".cup_list_n").html(wapper);
                         }
                     }else if(msg.code=='401'){
                         window.location.href="https://test.petskitchen.com.cn/view/login"
                     }
                 },
                 error:function () {
                     bombboxhints('服务器出错');
                 }
             });
         }else if(type==1){
             $.ajax({
                 url: "/coupon/all/1",
                 type: "get",
                 dataType: "json",
                 success: function(msg) {
                     console.log(msg);
                     if(msg.code == '200'){
                         if(msg.data==''){
                             $(".null_bg").show()
                         }else{
                             var wapper='';
                             $.each(msg.data,function (key,val) {
                                 wapper+='<li class="use_already" id="cuplist">'+
                                     '<span class="id">'+val.id+'</span>'+
                                     '<p class="new_left">'+
                                     '<span class="new_left_top">'+"￥"+val.discount_money/100+'</span>'+
                                     '<span class="new_left_bot">'+"消费满"+val.limit_money/100+"减"+val.discount_money/100+'</span>'+
                                     '</p>'+
                                     '<p class="new_right">'+
                                     '<span class="new_right_top">'+'满'+val.limit_money/100+"元减"+val.discount_money/100+"元代金券"+'</span>'+
                                     '<span class="new_right_mid">'+'<span>'+"试用产品："+'</span>'+'<span>'+"所有产品"+'</span>'+'</span>'+
                                     '<span class="new_right_mid">'+'<span>'+"有效期至："+'</span>'+'<span>'+val.end_time+'</span>'+'</span>'+
                                     '</p>'+
                                     '</li>'
                             })
                             $(".cup_list_y").html(wapper);
                         }

                     }else if(msg.code=='401'){
                         window.location.href="https://test.petskitchen.com.cn/view/login"
                     }
                 },
                 error:function () {
                     bombboxhints('服务器出错');
                 }
             });
         }else if(type==2){
             $.ajax({
                 url: "/coupon/all/2",
                 type: "get",
                 dataType: "json",
                 success: function(msg) {
                     console.log(msg);
                     if(msg.code == '200'){
                         if(msg.data==''){
                             $(".null_bg").show()
                         }else{
                             var wapper='';
                             $.each(msg.data,function (key,val) {
                                 wapper+='<li class="guoqi" id="cuplist">'+
                                     '<span class="id">'+val.id+'</span>'+
                                     '<p class="new_left">'+
                                     '<span class="new_left_top">'+"￥"+val.discount_money/100+'</span>'+
                                     '<span class="new_left_bot">'+"消费满"+val.limit_money/100+"减"+val.discount_money/100+'</span>'+
                                     '</p>'+
                                     '<p class="new_right">'+
                                     '<span class="new_right_top">'+'满'+val.limit_money/100+"元减"+val.discount_money/100+"元代金券"+'</span>'+
                                     '<span class="new_right_mid">'+'<span>'+"试用产品："+'</span>'+'<span>'+"所有产品"+'</span>'+'</span>'+
                                     '<span class="new_right_mid">'+'<span>'+"有效期至："+'</span>'+'<span>'+val.end_time+'</span>'+'</span>'+
                                     '</p>'+
                                     '</li>'
                             })
                             $(".cup_list_g").html(wapper);
                         }

                     }else if(msg.code=='401'){
                         window.location.href="https://test.petskitchen.com.cn/view/login"
                     }
                 },
                 error:function () {
                     bombboxhints('服务器出错');
                 }
             });
         }
     })
//    点击就入优惠券详情   
    $(".cup_list_n").on('click','#cuplist',function () {
        var id = parseInt($(this).find(".id").html());
        window.location.href="/view/coupon_detail/"+id;
    })

})