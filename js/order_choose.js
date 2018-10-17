/**
 * Created by Administrator on 2018/6/27.
 *  商品挑选  jack
 *
 */
var ordrs = location.href;
var order_ids = ordrs.split("order_choose/")[1];
var pet_id = order_ids.split('/')[1];//宠物ID
var order_id = order_ids.split('/')[0];//订单ID
var proid = '';
var proidall= [];
var order_no = location.search;
var order_nos = order_no.split("=");
var order_noa = order_nos[order_nos.length-1];
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
var order_chooses = {
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
                    } else if (msg.code == '401') {
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
                //                 food_types = food_types_s[i];
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
                wapper += '<div class="order_choose_left" style="border: 0">' +
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
    inits:function () {
        $.ajax({
            url: "/order/taste/"+order_id,
            type: "get",
            async: false,
            dataType: "json",
            success: function(msg){
                if(msg.code == '200'){
                    var conts = msg.data;
                    var wappers ="";
                    $.each(conts,function(key,val){
                        proid = val.id;
                        var product_taste = val.product_taste;
                        var imgall = '';
                        if(product_taste == "牛肉"){
                            imgall='/static/images/order_delivery_05.png';
                        }else if(product_taste == "猪肉"){
                            imgall='/static/images/order_delivery_01.png';
                        }else if(product_taste == "鸡肉"){
                            imgall='/static/images/order_delivery_03.png';
                        }
                        wappers +='<div class="shopping_hang">'+
                            '<li class="fir_show" data-id='+proid+'>'+
                            '<img src='+imgall+' class="order_delivery_img" />'+
                            '<p class="kw">'+val.main_components.split(",").join("<br>")+'</p>'+
                            '</li>'+
                            '</div>';
                    });
                    $(".order_delivery_yi").html(wappers);
                }else if(msg.code == '400'){
                    bombboxhints(msg.message);
                }else if(msg.code == '400'){
                    window.location.href= "/view/login";
                }
            }
        });

        $("#order_delivery_yi").on("click","li",function () {
            var id = $(this).attr('data-id');
            var this_src = $(this).find(".order_delivery_img").attr("src").split("0")[1];
            if($(this).hasClass('ffc638')){
                $(this).removeClass("ffc638");
                $(this).find(".kw").removeClass("other");
                proidall.remove(id);
            }else{
                $(this).addClass("ffc638");
                $(this).find(".kw").addClass("other");
                proidall.push(id);
            }
            var colorlength = ($("#order_delivery_yi").find('.ffc638')).length;
            if(colorlength > 2){
                bombboxhints("抱歉，最多选择两种口味哦");
                $(this).removeClass("ffc638");
                $(this).find(".order_delivery_tu").removeClass("other");
                proidall.remove(id);
                if(this_src=="3.png"){
                    $(this).find("img").attr("src","/static/images/order_delivery_03.png");
                }else if(this_src=="1.png"){
                    $(this).find("img").attr("src","/static/images/order_delivery_01.png");
                }else if(this_src=="5.png"){
                    $(this).find("img").attr("src","/static/images/order_delivery_05.png");
                }
            }
        });

        $(".submit").click(function () {
            if(proidall.length==0){
                bombboxhints("且慢！请先选择您的口味哦");
            }else{
                $(".container_border").show();   //加载页
                setTimeout(function () {
                    $.ajax({
                        url: "/order/set_taste/"+order_id,
                        type: "POST",
                        async: false,
                        data:{
                            "taste":JSON.stringify(proidall)
                        },
                        dataType: "json",
                        success: function(msg){
                            if(msg.code == "200"){
                                window.location.href= "/view/order_finish/"+order_id;
                            }else if(msg.code == "400"){
                                bombboxhints(msg.message);
                            }else if(msg.code == "401"){
                                window.location.href= "/view/login";
                            }
                        }
                    })
                },100);
            }
        });
    }
};
order_chooses.inits();
order_chooses.inites();