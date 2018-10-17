$(document).ready(function () {
    var href = location.href;
    var money = href.split("/coupon_list")[1].split("/")[1];
    var pet_id = href.split("/coupon_list")[1].split("/")[2];
    console.log(money);
    console.log(pet_id);  
    $.ajax({
        url: "/coupon/receive/1",
        type: "get",
        dataType: "json",
        success: function(msg) {
            console.log(msg);
            if(msg.code == '200'){

            }else if(msg.code=='401'){
               window.location.href="https://test.petskitchen.com.cn/view/login"
            }
        },
        error:function () {
            bombboxhints('服务器出错');
        }
    });
    setTimeout(function () {
        $.ajax({
            url: "/coupon/use_able/10000",
            type: "get",
            dataType: "json",  
            success: function(msg) {
                console.log(msg);
                if(msg.code == '200'){
                  var wapper='';
                  $.each(msg.data,function (key,val) {
                      wapper+='<li class="commom">'+
                          '<span class="coupon_id">'+val.id+'</span>'+
                          '<p class="new_left">'+
                          '<span class="new_left_top">'+"￥"+val.discount_money/100+'</span>'+
                          '<span class="new_left_bot">'+"消费满"+val.limit_money/100+"减"+val.discount_money/100+'</span>'+
                          '</p>'+
                          '<p class="new_right">'+
                          '<span class="new_right_top">'+'<span>'+'满'+val.limit_money/100+"元减"+val.discount_money/100+"元代金券"+'</span>'+'</span>'+
                          '<span class="new_right_mid">'+'<span>'+"试用产品："+'</span>'+'<span>'+"所有产品"+'</span>'+'</span>'+
                          '<span class="new_right_mid">'+'<span>'+"有效期至："+'</span>'+'<span>'+val.end_time+'</span>'+'</span>'+
                          '</p>'+
                          '<img src="/static/images/choose_no.png"> '+
                          '</li>'
                  })
                  $(".cup_list_n").html(wapper);

                }else if(msg.code=='401'){

                }
            },
            error:function () {
                bombboxhints('服务器出错');
            }
        })
    },500)
    $(".cup_list_n").on('click','.commom',function () {
        var coupon_id = $(this).find(".coupon_id").html();
        var x = $(this).find("img").attr("src");
        if(x=="/static/images/choose_no.png"){
            $(this).find("img").attr("src","/static/images/choose.png")
        }else if(x=="/static/images/choose.png"){
            $(this).find("img").attr("src","/static/images/choose_no.png")
        }
        window.location.href="/view/products/"+coupon_id;
    })
})