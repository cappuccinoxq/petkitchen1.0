/**
 * Created by Administrator on 2018/6/27.
 *  收货地址列表  jack
 *
 */
'use strict';
function bombboxhints(res) {
    $('.promptbox').html(res);
    $('.warpperts').fadeIn();
    setTimeout(function() {
        $(".warpperts").fadeOut();
    }, 5000);
}
var address = location.href;
var add_arr = address.split("address/")[1];
var add_id = '';
var shangmen_id = '';
var qufen = '';
console.log(add_arr);
if(add_arr == undefined){
    add_id = add_arr;
}else{
    add_id = add_arr.split("/")[0];
    shangmen_id = add_arr.split("/")[1];
    qufen = add_arr.split("/")[2];
}

console.log(add_arr);
console.log(add_id);
console.log(qufen);
console.log(shangmen_id);
var add_num= '';
//获取到全部地址
    $.ajax({
        url: "/address/all",
        type: "get",
        dataType: "json",
        success: function(msg) {
            console.log(msg)
            if(msg.code=='200'){
                if(msg.data==''){
                    $(".null_bg").css("display","block");
                    $(".dizhi").css("display","none");
                    $(".login-btn").css("display","none");
                }else{
                    add_num = msg.data.length;
                    console.log(msg.data);
                    var wappers1 = '';
                    var wappers = '';
                    $.each(msg.data,function (key,val) {
                        var addressee = val.addressee;   //姓名
                        var phone = val.telephone;     //手机号
                        var city_name =val.city_name;
                        var area_name = val.area_name;
                        var province_name = val.province_name;
                        var address = val.address;
                        var id = val.id;
                        if(val.default_address==0){
                            wappers1  +='<div class="clickshouhupod">'+
                                '<div class="dizhi_kuang">'+
                                '<div class="tt09" id="tt09">'+'<span class="addre_name">'+addressee+'</span>'+
                                '<span>'+phone+'</span>'+
                                '</div>'+  
                                '<div class="your-adress02" id="your-adress02">'+province_name+city_name+area_name+"---"+address+'</div>'+'</div>'+
                                '<div class="bianji-shanchu mui-clearfix" id="moren">'+
                                '<span class="idid" style="display: none">'+id+'</span>'+
                                '<div class="bjsc-lf mui-clearfix">'+'<span class="zdy-icon-radio_moren" value="">'+"设为默认"+'</span>'+'</div>'+
                                '<div class="bjsc-rt tianjiasdxx" id="tianjiasdxx">'+'<span id="demo3" class="addId_b" value="">'+'<img src="/static/images/bianji.png">'+"编辑"+'</span>'+'<span id="demo4" class="addId_s" value="">'+'<img src="/static/images/shanchu.png">'+"删除"+'</span>'+
                                '</div>'+
                                '</div>'+
                                '</div>';
                        }else if(val.default_address==1){
                            wappers  +='<div class="clickshouhupod">'+
                                '<div class="dizhi_kuang">'+
                                '<div class="tt09" id="tt09">'+'<span class="addre_name">'+addressee+'</span>'+
                                '<span>'+phone+'</span>'+'<img class="mr" src="/static/images/moren.png">'+
                                '</div>'+
                                '<div class="your-adress02" id="your-adress02">'+province_name+city_name+area_name+"---"+address+'</div>'+'</div>'+
                                '<div class="bianji-shanchu mui-clearfix" id="moren">'+
                                '<span class="idid" style="display: none">'+id+'</span>'+
                                '<div class="bjsc-lf mui-clearfix">'+'<span class="zdy-icon-radio_moren active" value="">'+"默认地址"+'</span>'+'</div>'+
                                '<div class="bjsc-rt tianjiasdxx" id="tianjiasdxx">'+'<span id="demo3" class="addId_b" value="">'+'<img src="/static/images/bianji.png">'+"编辑"+'</span>'+'<span id="demo4" class="addId_s" value="">'+'<img src="/static/images/shanchu.png">'+"删除"+'</span>'+
                                '</div>'+
                                '</div>'+
                                '</div>';
                        }
                    })
                    $(".bianji-dizhi_fei").html(wappers1);
                    $(".bianji-dizhi").html(wappers);
                }
            }else if(msg.code=='401'){
                window.location.href = "/view/login";
            }
        },
        error: function () {
            bombboxhints('服务器出错');
        }
    });




// 添加收货地址
setTimeout(function () {
    if(add_num>=10){
        $(".submit").css("background","#999999");
    }else{
        $(".btn_addss").click(function () {
            window.location.href="/view/add_address/"+add_id;
        });
    }
},500)
// 点击地址设为默认地址
$(".dizhi").on('click','.dizhi_kuang',function () {
    var id = $(this).parent().find(".idid").html();
    if(add_id == '' || add_id == null || add_id == 'undefined'|| add_id== 'null' ){
        return false
    }else if(qufen == undefined){
        $.ajax({
            url: "/address/setdefault/"+ id,
            type: "get",
            dataType: "json",
            success: function(msg) {
                if(msg.code=='200'){
                    window.location.href="/view/products/"+add_id;
                }else if(msg.code=='401'){
                    window.location.href = "/view/login";
                }
            },
            error:function () {
                bombboxhints('服务器出错');
            }
        })
    }else if(qufen == 'vip'){
        $.ajax({
            url: "/address/setdefault/"+ id,
            type: "get",
            dataType: "json",
            success: function(msg) {
                if(msg.code=='200'){
                    window.location.href="/view/order_after/"+add_id+"/"+shangmen_id;
                }else if(msg.code=='401'){
                    window.location.href = "/view/login";
                }
            },
            error:function () {
                bombboxhints('服务器出错');
            }
        })
    }
});

//编辑地址
$(".dizhi").on('click','.addId_b',function () {
    var xx = $(this).parent().parent().parent().find(".idid").html();
    var id = parseInt(xx);
    window.location.href="/view/edit_address/"+id+"/"+add_id;
})
//删除
$(".dizhi").on('click','.addId_s',function () {
    var xx = $(this).parent().parent().parent().find(".idid").html();
    var id = parseInt(xx);
    $(".greybg02").show();
    $(".queren").click(function () {
        $(".greybg02").hide();
        $.ajax({
            url: "/address/delete/"+id,
            type: "get",
            dataType: "json",
            success: function(msg) {
                if(msg.code == '200'){
                    window.location.reload();
                }else if(msg.code=='401'){
                    window.location.href = "/view/login";
                }
            },
            error:function () {
                bombboxhints('服务器出错');
            }
        })
    });
    $(".quxiao").click(function () {
        $(".greybg02").hide();
        bombboxhints("您选择取消了");
    })
});
//设为默认
$(".bianji-dizhi_fei").on('click','.zdy-icon-radio_moren',function () {
    var x = $(this).parent().parent().find(".idid").html();
    var id = parseInt(x);
    setTimeout(function () {
        $.ajax({
            url: "/address/setdefault/"+ id,
            type: "get",
            dataType: "json",
            success: function(msg) {
                if(msg.code=='200'){
                    window.location.reload();
                }else if(msg.code=='401'){
                    window.location.href = "/view/login";
                }
            },
            error:function () {
                bombboxhints('服务器出错');
            }
        })
    },500)
});
//返回上一页
$(".back").click(function () {
    if(add_id == '' || add_id === null || add_id == 'undefined' || add_id === 'null' || add_id == undefined){
        window.location.href="/view/member";
    }else if (qufen == undefined) {
        window.location.href='/view/products/'+add_id;
    }else if(qufen == 'vip'){
        window.location.href="/view/order_after/"+add_id+"/"+shangmen_id;
    }
});


$(".off_btn").click(function () {
    window.location.href="/index";
});


$("$")