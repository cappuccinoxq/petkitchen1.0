/**
 * Created by Administrator on 2018/6/27.
 *  产品详情页  jack
 *
 */
// 'use strict';
// var count_order = $("#record").attr("value");
// if(count_order==2){
//     $("#sele_week option[value='1']").remove();
// };
var productss = {
    //基本信息获取
    produs:function(){
    var pet_sear = location.href;
    var pet_id = pet_sear.split("products/")[1];
    var pets_species='';   //狗的类型
    var pet_name='';
    var steril='';    //是否绝育
    var age='';
    var age_type = '';
    var specific_weight='';    //体重
    var expect_weight='';        //期望体重
    var weight='';         //体型
    var pets_disease='';        //相关疾病
    var time='';                //运动次数
    var motion_kilometre='';        //运动范围
    var food_types='';          //主食类型
    var pets_taste='';          //喜好口味
    var common_brand='';     //主食品牌
    var taboos_food='';         //忌口食材
    var pets_type='';            //宠物类型
    var pet_types='';
    var food_types_s='';
    var common_brand_s='';
    var user_id = '';
    var pet_id_all = []; //口味ID
    var first='';        //购买记录
    var order_id = '';//订单号
    var sele_weeks = $(".sele_weekall option:selected").val();
    var total_money = '';               //总价
    var money = '';                     //打折后的价格
    var coupon_money = '';              //优惠券
    var coupon_id = '';
    var c_money = '';
    //判断是否是选择了优惠券
    $.ajax({
        url: "/pet/taste/" + pet_id,
        type: "get",
        dataType:"json",
        success: function(msg) {
            console.log(msg);
            if(msg.code=='200'){
                pets_species = msg.data.pet_type;   //宠物的类型
                pet_name = msg.data.pet_name;
                steril = msg.data.sterili;    //是否绝育
                age = msg.data.age;
                age_type = msg.data.age_type;
                specific_weight = msg.data.weight;    //体重
                expect_weight = msg.data.expect_weight;        //期望体重
                weight = msg.data.shape;         //体型
                pets_disease = msg.data.disease;        //相关疾病
                time = msg.data.motion_times;                //运动次数
                motion_kilometre = msg.data.motion_distance;        //运动范围
                food_types = msg.data.food_type;          //主食类型
                pets_taste = msg.data.food_favorite;          //喜好口味
                common_brand = msg.data.food_brand;     //主食品牌
                taboos_food = msg.data.food_taboo;         //忌口食材
                pets_type = msg.data.pet_variety;            //猫或狗的品种
                first = msg.data.first;          //购买记录
                if(first==0){
                    $("#sele_week option[value='1']").remove();  
                    sele_weeks = $(".sele_weekall option:selected").val();
                    $(".instr").hide();
                }
                //体型判断
                if(weight==1){
                    weight="太瘦了";
                }else if(weight==2){
                    weight="刚刚好";
                }else if(weight==3){
                    weight="丰满的";
                }else if(weight==4){
                    weight="肥胖的";
                }
                //是否绝育
                if(steril==0){
                    steril="未绝育";
                }else if(steril==1){
                    steril="已绝育";
                }
                //基本信息的获取
                var food = msg.data.chose_food;
                var wappers1 ="";
                $.each(food,function(key,val){
                    proid = val.id;
                    product_taste = val.product_taste;
                    proprice = val.product_price;
                    var  product_img = val.product_img;
                    var imgall = '';
                    if(product_taste=="牛肉"){
                        imgall='/static/images/order_delivery_05.png';
                    }else if(product_taste == "猪肉"){
                        imgall='/static/images/order_delivery_01.png';
                    }else if(product_taste == "鸡肉"){
                        imgall='/static/images/order_delivery_03.png';
                    }
                    wappers1 +='<div class="shopping_hang">'+
                        '<li class="fir_show" data-id='+proid+'>'+
                        '<img src='+imgall+' class="order_delivery_img" />'+
                        '<p class="kw">'+val.main_components.split("，").join("<br>")+'</p>'+
                        '<input type="hidden" value='+proprice+' class="presentprice">'+
                        '</li>'+
                        '<p class="order_delivery_tu">'+"查看详情"+'</p>'+   
                        '</div>';
                });
                $(".order_delivery_yi").html(wappers1);
            }else if(msg.code=='401'){
                window.location.href = "/view/login";
            }
        },
        error:function(){
            bombboxhints("网络超时");
        }
    });

    setTimeout(function(){
        //宠物品种
        $.ajax({
            url: "/pet/type/" + pets_species,
            type: "get",
            dataType:"json",
            success:function(msg){
                console.log(pets_species);
                pet_types = msg.data;
                for(i in pet_types){  //1---猫  2---狗
                    if(pets_species==1){
                        if(i==pets_type-93){
                            pets_type = pet_types[i].varieties;  
                        }
                    }else if(pets_species==2){
                        if(i==pets_type-1){
                            pets_type = pet_types[i].varieties;
                        }
                    }

                }
            },
            error:function(){
                bombboxhints("网络超时");  
            }
        });
//宠物品牌
        setTimeout(function () {
            $.ajax({
                url: "/food/brand/" + pet_id,
                type: "get",
                dataType:"json",
                success:function(msg){
                    common_brand_s = msg.data;
                    for(i in common_brand_s){
                        if(i==common_brand-1){
                            common_brand = common_brand_s[i].common_brand;
                        }
                    }
                },
                error:function(){
                    bombboxhints("网络超时");
                }
            });
            if(age_type==1){
                age_type="岁";
            }else if(age_type==2){
                age_type="月";  
            }
            setTimeout(function () {
                var wapper = "";
                wapper+= '<div class="order_choose_left">'+
                    '<div class="order_choose_left_xin">'+
                    '<p id="pet_name">'+pet_name+'<span id="pet_type">'+pets_type+'</span>'+'</p>'+
                    '<p>'+steril+age+age_type+'</span>'+'</p>'+
                    '<p>'+'<span>'+"体重："+specific_weight+"kg"+'</span>'+'<span>'+"期望体重："+expect_weight+"kg"+'</span>'+ '</p>'+
                    '<p>'+'<span>'+"体型："+weight+'</span>'+'<span>'+"相关疾病："+pets_disease+'</span>'+ '</p>'+
                    '</div>'+
                    '<div class="order_choose_left_tx">'+
                    '</div>'+'</div>'+
                    '<div class="order_choose_right">'+
                    '<p>'+'<span>'+"运动次数："+time+'</span>'+ '<span>'+"运动范围："+motion_kilometre+'</span>'+ '</p>'+
                    '<p>'+'<span>'+"喜好口味："+pets_taste+'</span>'+ '<span>'+"忌口食材："+taboos_food+'</span>'+ '</p>'+
                    '<p>'+ '<span>'+"主食品牌："+common_brand+'</span>'+ '</p>'+
                    '</div>'
                ;
                $(".order_choose").html(wapper);
            },300)
        },400)
    },500);


    var time=0;
    var total_price=0;
    var product_price=0;
    var price_arr = [];
    var x=0;
    var proid = '';
    var proidall= [];
    var propice = 0;
    var sum_price;
    var order_no;
    var code;

//地址判断
    $.ajax({
        url: "/address/getdefault",
        type: "get",
        dataType: "json",
        success: function(msg){
            if(msg.code=='200'){
                console.log(msg);
                address_data = msg.data;
                if(address_data!=''){
                    $(".dizhi_null").css("display","none");
                    $(".bianji-dizhi").css("display","block");
                    var addressee = msg.data.addressee;  //名字
                    var provine = msg.data.province_name //省
                    var city = msg.data.city_name //市
                    var area = msg.data.area_name //县
                    var phone = msg.data.telephone //手机号
                    var wapper = '';
                    wapper+='<div class="your-adress02">'+'<span class="addressees">'+addressee+'</span>'+'<span class="phoness">'+phone+'</span>'+'</div>'+
                        '<div class="tt09">' +
                        '<span class="citysings">'+provine+city+area+"---"+msg.data.address+'</span>' +
                        '</div>'
                    ;
                    $(".bianji-dizhi").html(wapper);
                }else if(address_data==''){
                    $.ajax({
                        url: "/address/all",
                        type: "get",
                        dataType: "json",
                        success: function(msg){
                            if(msg.code=='200'){
                                if(msg.data==''){
                                    $(".dizhi_null").css("display","block");
                                    $(".bianji-dizhi").css("display","none");
                                }else {
                                    $(".dizhi_null").css("display","none");
                                    var addressee = msg.data[0].addressee;  //名字
                                    var provine = msg.data[0].province_name //省
                                    var city = msg.data[0].city_name //市
                                    var area = msg.data[0].area_name //县
                                    var phone = msg.data[0].telephone //手机号
                                    var wapper = '';
                                    wapper+='<div class="your-adress02">'+'<span class="addressees">'+addressee+'</span>'+'<span class="phoness">'+phone+'</span>'+'</div>'+
                                        '<div class="tt09">' +
                                        '<span class="citysings">'+provine+city+area+"---"+msg.data.address+'</span>' +
                                        '</div>'
                                    ;
                                    $(".bianji-dizhi").html(wapper);
                                }
                            }else if(msg.code=='401'){
                                window.location.href = "/view/login";
                            }
                        },
                        error:function(){
                            bombboxhints("网络超时");
                        }
                    });
                }
            }else if(msg.code=='401'){
                window.location.href = "/view/login";
            }
        },
        error:function(){
            bombboxhints("网络超时");
        }
    });

    Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

// 点击事件-----xq
    $("#order_delivery_yi").on("click","li",function () {
        // var classname = $(this).attr("class");
        var id = $(this).attr('data-id');
        var monay = $(this).attr('data-monay');
        var this_src = $(this).find(".order_delivery_img").attr("src").split("0")[1];
        if($(this).hasClass('ffc638')){
            $(this).removeClass("ffc638");
            $(this).find(".kw").removeClass("other");
            $(this).parent().find(".order_delivery_tu").removeClass("other_p");
            proidall.remove(id);
            pet_id_all.remove(id);
        }else{
            $(this).addClass("ffc638");
            $(this).find(".kw").addClass("other");
            $(this).parent().find(".order_delivery_tu").addClass("other_p");
            proidall.push(id);
            pet_id_all.push(id);
        }
        var colorlength = ($("#order_delivery_yi").find('.ffc638')).length;
        if(colorlength > 2){
            bombboxhints("抱歉，最多选择两种口味哦");
            $(this).removeClass("ffc638");  
            $(this).find(".kw").removeClass("other");
            $(this).parent().find(".order_delivery_tu").removeClass("other_p");
            proidall.remove(id);
            pet_id_all.remove(id);
            return false;
        }
        if(pet_id_all.length<=2){
            ajaxs(sele_weeks);
        }else{
            return
        }
    });

//    选择周期
    $("#sele_week").change(function(){
        sele_weeks = $(".sele_weekall option:selected").val();    //周期
        ajaxs(sele_weeks);
    });
    function ajaxs(sele_weeks){
            setTimeout(function () {
                var pet_id_alls = JSON.stringify(pet_id_all);
                $.ajax({
                    url: "/order/compute_money",
                    type: "post",
                    dataType:"json",
                    data:{
                        "pet_id":pet_id,
                        "taste":pet_id_alls,
                        "cycle":sele_weeks,
                        "coupon_id":coupon_id
                    },
                    success:function(msg){
                        console.log(msg);
                        if(msg.code=='200'){
                            console.log(coupon_money)
                            if(msg.data.money==undefined){
                                $(".total1").html("0.00");
                                $(".total").html("0.00");
                                $(".money").html("-0.00");
                            }else{
                                money = Number(msg.data.money/100);
                                c_money = msg.data.money
                                console.log(c_money);
                                if(coupon_money!=''){
                                    console.log(money);
                                   var total_money = money+Number(coupon_money);
                                   total_money = total_money.toFixed(2);
                                   console.log(total_money)
                                    $(".total1").html(total_money+"RMB");
                                    $(".total").html(money);
                                    $(".money").html("-"+coupon_money);
                                }else{
                                    $(".total1").html(money+"RMB");
                                    $(".total").html(money);
                                    $(".money").html("-0.00");
                                }
                            }
                        }else if(msg.code=='401'){
                            window.location.href = "/view/login";
                        }
                    },
                    error:function(){
                        bombboxhints("网络超时");
                    }
                })
            },500);
        setTimeout(function () {
            $.ajax({
                url: "/coupon/use_able/" + c_money,
                type: "get",
                dataType: "json",
                success: function (msg) {
                    if (msg.code == '200') {
                        if (msg.data.length == 0) {
                              $(".num").html("0张可用")
                        } else {
                              $(".num").html(msg.data.length+"张可用");
                        }
                    } else if (msg.code == '401') {
                        window.location.href = "/view/login";
                    }
                },
                error: function () {
                    bombboxhints('服务器出错');
                }
            })
        },600)
    }

//确认支付
$("#pay").on('click',function(){
    var pet_id_all = proidall;
    pet_id_all=JSON.stringify(pet_id_all);
    //支付调取数据
    var petId = $("#petId").attr("value");
    if($("#order_delivery_yi li").hasClass("ffc638")== true && $(".dizhi_null").css("display") === 'block'){
        bombboxhints("请选择您需要配送的地址");
    }else if($("#order_delivery_yi li").hasClass("ffc638")==false && $(".dizhi_null").css("display") === 'none'){
        bombboxhints("请选择您需要的口味");
    }else if($("#order_delivery_yi li").hasClass("ffc638")==false && $(".dizhi_null").css("display") === 'block'){
        bombboxhints("请选择您需要的口味和需要配送的地址");
    }else{
        // 生成订单
        $(".container_border").show();
        console.log(coupon_id)
        $.ajax({
            url: "/order/create",
            type: "post",
            async:false,
            dataType:"json",
            data:{
                "coupon_id":coupon_id,
                "pet_id":pet_id,
                "taste":pet_id_all,
                "cycle":sele_weeks,
                "area":$("#select_address .citysings").text(),
                "phone":$("#select_address .phoness").text(),
                "addressee":$("#select_address .addressees").text(),
                "coupon_id":coupon_id
            },
            success:function(res){
                if(res.code == '200'){
                    order_id = res.data.order_id;
                    window.location.href='/view/order_finish/'+order_id;
                }else if(res.code == '401'){
                    window.location.href='/view/login';
                }
            },
            error:function () {
                bombboxhints("网络超时");
            }
        });
    }
});
// 点击选择优惠券
    $(".order_coupon").click(function () {
        if($("#order_delivery_yi li").hasClass("ffc638")==false){
            bombboxhints("请选择您需要的口味");
        }else{
            c_money = parseInt(c_money);
            setTimeout(function () {
                $.ajax({
                    url: "/coupon/use_able/"+c_money,
                    type: "get",
                    dataType: "json",
                    success: function(msg) {
                        console.log(msg);
                        if(msg.code == '200'){
                            console.log(msg.data.length);
                            if(msg.data==''){
                                $(".null_bg").show();
                                $(".donotuses").hide();
                                $(".header").show();
                            }else{
                                $(".null_bg").hide();
                                $(".donotuses").show();
                                $(".header").hide();
                                var wapper='';
                                $.each(msg.data,function (key,val) {
                                    wapper+='<li class="commom">'+
                                        '<span class="coupon_id">'+val.id+'</span>'+
                                        '<span class="coupon_money">'+val.discount_money+'</span>'+
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
                            }
                        }else if(msg.code=='401'){
                            window.location.href="/view/login";
                        }
                    },
                    error:function () {
                        bombboxhints('服务器出错');
                    }
                })
            },500)
            $(".coupon_box").show();
        }
    })
    $(".back_off").click(function () {
        $(".coupon_box").hide();
    })
//跳转到收获地址页
    $(".xp-content02").click(function () {
        window.location.href="/view/address/"+pet_id;
    })
//查看详情
    $("#order_delivery_yi").on("click",".order_delivery_tu",function ()  {
          var taste_id = $(this).parent().find(".fir_show").attr("data-id");
          var prod_price = $(this).parent().find(".presentprice").val();
          console.log(taste_id);
          console.log(prod_price);
          window.location.href="/view/shop_info/"+taste_id+"/"+prod_price;
    });

    $("#order_delivery_yi").on('click','.closebt',function () {
        $(this).parent().parent().hide();
    });
    $(".show").click(function () {
        $(this).removeClass("show");
        $(this).addClass("show1");
    });
$(".header").on('click','.back_btn',function(){
    window.location.href="/view/descri";
})

    //选中优惠券
    $(".cup_list_n").on('click','.commom',function () {
        coupon_id = $(this).find(".coupon_id").html();
        coupon_money = parseInt($(this).find(".coupon_money").html())/100;
        coupon_money = Number(coupon_money);
        coupon_money = coupon_money.toFixed(2);
        var x = $(this).find("img").attr("src");
        if (x == "/static/images/choose_no.png") {
            $(this).find("img").attr("src", "/static/images/choose.png");
            $(".donotuses").find("img").attr("src","/static/images/choose_no.png");
        }
        setTimeout(function () {
            $(".coupon_box").hide();
        },2000)
        setTimeout(function () {
            var pet_id_alls = JSON.stringify(pet_id_all);
            $.ajax({
                url: "/order/compute_money",
                type: "post",
                dataType:"json",
                data:{
                    "pet_id":pet_id,  
                    "taste":pet_id_alls,
                    "cycle":sele_weeks,
                    "coupon_id":coupon_id
                },
                success:function(msg){
                    if(msg.code=='200'){
                        if(msg.data==''){
                            $(".total").html("0.00");
                            $(".total1").html("0.00");
                        }
                        money = Number(msg.data.money/100);
                        $(".total").html(money);
                        $(".money").html("-"+coupon_money);
                    }else if(msg.code=='401'){
                        window.location.href = "/view/login";
                    }
                },
                error:function(){
                    bombboxhints("网络超时");
                }
            })
        },500);
    })
    //    不选优惠券
        $(".donotuses").click(function () {
            if($(this).find("img").attr("src")== "/static/images/choose_no.png"){
                $(this).find("img").attr("src", "/static/images/choose.png");
                $(".commom").find("img").attr("src","/static/images/choose_no.png");
                coupon_id='';
                coupon_money = ''
                setTimeout(function () {
                    $(".coupon_box").hide();
                },2000)
                setTimeout(function () {
                    var pet_id_alls = JSON.stringify(pet_id_all);
                    $.ajax({
                        url: "/order/compute_money",
                        type: "post",
                        dataType:"json",
                        data:{
                            "pet_id":pet_id,
                            "taste":pet_id_alls,
                            "cycle":sele_weeks,
                            "coupon_id":coupon_id
                        },
                        success:function(msg){
                            if(msg.code=='200'){
                                if(msg.data==''){
                                    $(".total").html("0.00");
                                    $(".total1").html("0.00");
                                }
                                money = Number(msg.data.money/100);
                                $(".total").html(money);
                                $(".money").html("-0.00");
                            }else if(msg.code=='401'){
                                window.location.href = "/view/login";
                            }
                        },
                        error:function(){
                            bombboxhints("网络超时");
                        }
                    })
                },500);
            }else if($(this).find("img").attr("src")== "/static/images/choose.png"){
                    $(this).find("img").attr("src", "/static/images/choose_no.png");
                }
        })
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
            $(".coupon_box").hide();
            location.href="/view/products/"+pet_id;
        };
    }
}
productss.produs();
productss.monitor();