/**
 * Created by Administrator on 2018/6/27.
 *  订单详情  jack
 *
 */
var pets = location.href;
var pet_ids = pets.split("order_after/")[1];
var pet_id = pet_ids.split('/')[0];//宠物ID
var doorid = pet_ids.split('/')[1];//上门ID
var coupon_id = ''//优惠券ID
var discount_money = ''//优惠券
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
var first='';        //购买记录
var sele_weeks = $(".sele_weekall option:selected").val();
var total_price = '';//总价
var vipdingzhi = Number(15000);
var testing = 0;
var order_after = {
    inites: function () {
        $(".container_border").show();
        setTimeout(function () {
            $.ajax({
                url: "/pet/taste/" + pet_id,
                type: "get",
                dataType: "json",
                success: function (msg) {
                    if (msg.code == '200') {
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
                        if (first == 0) {
                            $("#sele_week option[value='1']").remove();
                            sele_weeks = $(".sele_weekall option:selected").val();
                        }
                        //体型判断
                        if (weight == 1) {
                            weight = "太瘦了";
                        } else if (weight == 2) {
                            weight = "刚刚好";
                        } else if (weight == 3) {
                            weight = "丰满的";
                        } else if (weight == 4) {
                            weight = "肥胖的";
                        }
                        //是否绝育
                        if (steril == 0) {
                            steril = "未绝育";
                        } else if (steril == 1) {
                            steril = "已绝育";
                        }
                    }else if(msg.code == '400'){
                        bombboxhints(msg.message);
                    }else if (msg.code == '401') {
                        window.location.href = "/view/login";
                    }
                },
                error: function () {
                    bombboxhints("网络超时");
                }
            });

            //宠物品种
            setTimeout(function () {
                $.ajax({
                    url: "/pet/type/" + pets_species,
                    type: "get",
                    dataType: "json",
                    success: function (msg) {
                        pet_types = msg.data;
                        if(pets_species == '1'){
                            for(var i=0;i<pet_types.length;i++){
                                if ((i+92) == pets_type) {
                                    pets_type = pet_types[i-1].varieties;
                                }
                            }
                        }else{
                            for(var i=0;i<pet_types.length;i++){
                                if (i == pets_type) {
                                    pets_type = pet_types[i-1].varieties;
                                }
                            }
                        }

                    },
                    error: function () {
                        bombboxhints("网络超时");
                    }
                });

                //食物类型
                // $.ajax({
                //     url: "/food/type/" + pet_id,
                //     type: "get",
                //     dataType: "json",
                //     success: function (msg) {
                //         food_types_s = msg.data;
                //         for (i in food_types_s) {
                //             if (i == food_types) {
                //                 food_types = food_types_s[i].types;
                //             }
                //         }
                //     },
                //     error: function () {
                //         bombboxhints("网络超时");
                //     }
                // });

                //宠物品牌
                $.ajax({
                    url: "/food/brand/" + pet_id,
                    type: "get",
                    dataType: "json",
                    success: function (msg) {
                        common_brand_s = msg.data;
                        for(var i=0;i<common_brand_s.length;i++){
                            if (i == common_brand) {
                                common_brand = common_brand_s[i-1].common_brand;
                            }
                        }
                    },
                    error: function () {
                        bombboxhints("网络超时");
                    }
                });
                if (age_type == 1) {
                    age_type = "岁";
                } else if (age_type == 2) {
                    age_type = "月";
                }
            }, 200);

            var wapper = "";
            setTimeout(function () {
                wapper += '<div class="order_choose_left">' +
                    '<div class="order_choose_left_xin">' +
                    '<p id="pet_name">' + pet_name + '<span id="pet_type">' + pets_type + '</span>' + '</p>' +
                    '<p>' + steril + age + age_type + '</span>' + '</p>' +
                    '<p>' + '<span>' + "体重：" + specific_weight + "kg" + '</span>' + '<span>' + "期望体重：" + expect_weight + "kg" + '</span>' + '</p>' +
                    '<p>' + '<span>' + "体型：" + weight + '</span>' + '<span>' + "相关疾病：" + pets_disease + '</span>' + '</p>' +
                    '</div>' +
                    '<div class="order_choose_left_tx">' +
                    '</div>' + '</div>' +
                    '<div class="order_choose_right">' +
                    '<p>' + '<span>' + "运动次数:" + time + '</span>' + '<span>' + "运动范围：" + motion_kilometre + '</span>' + '</p>' +
                    '<p>' + '<span>' + "喜好口味:" + pets_taste + '</span>' + '<span>' + "忌口食材:" + taboos_food + '</span>' + '</p>' +
                    '<p>' + '<span>' + "品牌:" + common_brand + '</span>' + '</p>' +
                    '</div>';
                $(".order_choose").html(wapper);
                $(".container_border").hide();
            }, 500)

        }, 100);
    },
    monaryvip: function () {
        // 是否检测  //计算价钱
        // $(".Default_icon").on('click', function () {
        //     if ($(this).find('input').val() == '0') {
        //         $(".Default_icon").html('<img src="/static/images/on.jpg">' + '<input type="hidden" value="1">');
        //         testing = 5000.00;
        //     } else {
        //         $(".Default_icon").html('<img src="/static/images/off.jpg">' + '<input type="hidden" value="0">');
        //         testing = 0;
        //     }
        //     setTimeout(function () {
        //         order_after.calculation($(".Default_icon").find('input').val(),coupon_id);
        //     }, 100);
        // });
        //点击选择优惠券
        $(".order_coupon").on('click',function () {
            $(".couponconts").show();
        });
        order_after.calculation($(".Default_icon").find('input').val(),coupon_id);

        // 提交订单
        $("#btn").on('click',function () {
            $.ajax({
                url: "/order/create_vip/"+doorid,
                type: "post",
                dataType: "json",
                data: {
                    "check_fee":0,
                    "area":$(".citysings").text(),
                    "phone":$(".phoness").text(),
                    "coupon_id":coupon_id,
                    "addressee":$(".addressees").text()
                },
                success: function (res) {
                    var order_id = res.data.order_id;
                    window.location.href = '/view/order_finish/'+order_id;
                },
                error: function () {
                    bombboxhints("网络超时");
                }
            });
        });
    },
    calculation: function (count,coupon_id) {
        $.ajax({
            url: "/order/compute_vip_money/" + doorid,
            type: "post",
            dataType: "json",
            data: {check_fee:0,coupon_id:coupon_id},
            success: function (res) {
                total_price = res.data.money;
                var coupon = '';
                var xianhsinum = Number(((total_price) / 100) - vipdingzhi + (discount_money)/100);
                xianhsinum = xianhsinum.toFixed(2);
                $("#exclusive").html('<span>￥</span><span>' + vipdingzhi + '</span>');//专属检测
                $("#freshfood").html('<span>￥</span><span>' +xianhsinum+ '</span>');//鲜食产品
                $("#coupon").html('<span>￥</span><span>'+Number(-(discount_money)/100)+'</span>');//优惠券
                $("#Totalprice").html('<span>￥</span><span>' + Number((total_price) / 100) + '</span>');//总价
            },
            error: function () {
                bombboxhints("网络超时");
            }
        });
    },
    citysall:function () {
        //地址判断
        $.ajax({
            url: "/address/getdefault",
            type: "get",
            dataType: "json",
            success: function(msg){
                if(msg.code=='200'){
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
                        wapper+='<div class="your-adress02">'+'<span class="addressees" style="width:8rem;display: inline-block;">'+addressee+'</span>'+'<span class="phoness">'+phone+'</span>'+'</div>'+
                            '<div class="tt09">' +
                            '<span class="citysings">'+provine+city+area+'</span>' +
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
                                        wapper+='<div class="your-adress02">'+'<span class="addressees" style="width:8rem;display:inline-block;">'+addressee+'</span>'+'<span class="phoness">'+phone+'</span>'+'</div>'+
                                            '<div class="tt09">' +
                                            '<span class="citysings">'+provine+city+area+'</span>' +
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
        //跳转到收获地址页
        $(".xp-content02").click(function () {
            window.location.href='/view/address/'+pet_id+'/'+doorid+'/vip';
        });
        //返回上一页
        $(".back_btn").on('click',function () {
            window.location.href = '/view/order_before/'+doorid;
        })
    },
    initss:function () {
        // $.ajax({
        //     url: "/coupon/receive/1",
        //     type: "get",
        //     dataType: "json",
        //     success: function (msg) {
        //         if(msg.code == '401') {
        //             window.location.href = "/view/login";
        //         }
        //     },
        //     error: function () {
        //         bombboxhints('服务器出错');
        //     }
        // });
        setTimeout(function () {
            $.ajax({
                url: "/coupon/use_able/"+total_price,
                type: "get",
                dataType: "json",
                success: function (msg) {
                    if (msg.code == '200') {
                        var wapper = '';
                        //判断是否为空
                        if(msg.data == ''){
                            $(".null_bg").show();
                        }else{
                            $(".null_bg").hide();
                            $.each(msg.data, function (key, val) {
                                discount_money = val.discount_money;
                                wapper += '<li class="commom">' +
                                    '<span class="coupon_id">' + val.id + '</span>' +
                                    '<p class="new_left">' +
                                    '<span class="new_left_top">' + "￥" + Number((val.discount_money) / 100) + '</span>' +
                                    '<span class="new_left_bot">' + "消费满" + val.limit_money / 100 + "减" + val.discount_money / 100 + '</span>' +
                                    '</p>' +
                                    '<p class="new_right">' +
                                    '<span class="new_right_top">' + '<span>' + '满' + val.limit_money / 100 + "元减" + val.discount_money / 100 + "元代金券" + '</span>' + '</span>' +
                                    '<span class="new_right_mid">' + '<span>' + "试用产品：" + '</span>' + '<span>' + "所有产品" + '</span>' + '</span>' +
                                    '<span class="new_right_mid">' + '<span>' + "有效期至：" + '</span>' + '<span>' + val.end_time + '</span>' + '</span>' +
                                    '</p>' +
                                    '<img src="/static/images/choose_no.png"> ' +
                                    '</li>'
                            });
                            $(".cup_list_n").append(wapper);
                        }

                    } else if (msg.code == '401') {
                        window.location.href = "/view/login";
                    }
                },
                error: function () {
                    bombboxhints('服务器出错');
                }
            })
        }, 500);
        $(".cup_list_n").on('click', '.commom', function () {
            coupon_id = $(this).find(".coupon_id").html();
            var x = $(this).find("img").attr("src");
            if (x == "/static/images/choose_no.png") {
                $(this).find("img").attr("src", "/static/images/choose.png");
                setTimeout(function () {
                    $(".couponconts").hide();
                    order_after.calculation($(".Default_icon").find('input').val(),coupon_id);
                },1000);
            }
        });
        $(".guanbiannius").on('click',function () {
            $(".couponconts").hide();
        });
        $(".donotuses").on('click',function () {
            var x = $(this).find("img").attr("src");
            if (x == "/static/images/choose_no.png") {
                $(this).find("img").attr("src", "/static/images/choose.png");
                window.location.href ='/view/order_after/'+pet_id+'/'+doorid;
            }
        })

    }
};
order_after.inites();
order_after.citysall();
order_after.monaryvip();
order_after.initss();
