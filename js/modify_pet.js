/**
 * Created by Administrator on 2018/6/27.
 *  查看宠物信息  jack
 *
 */
'use strict';
var sex_id = '';
var type_id = '';
var weight_id = ''; //体型ID
var eating_habitsid = '';//饮食习惯
var steriliid = ''; //绝育
var food_favorite = '';//喜欢口味
var pet_typeid = ''//宠物ID
var brandid = ''//品牌
var modifyid = ''//修改ID
var tabooid = ''//忌口
var diseaseid = ''//疾病
var petids = ''//种类ID
var modify_pet = {
    initall:function(){
        modify_pet.inits();
        modify_pet.querys();
    },
    brandids:function(){
        $.ajax({
            url: "/food/brand",
            type: "get",
            async:false,
            dataType: "json",
            success: function(res) {
                var arrays = res.data;
                var list = '';
                console.log(brandid);
                $.each(arrays, function (key, val) {
                    list += '<div value='+val.id+' class="cyclic_datas">'+val.common_brand+'</div>';
                    if(brandid == val.id){
                        $("#apprers .daily_brand").html(val.common_brand);
                        $("#apprers .daily_brand").attr('value',val.id);
                    }
                });
                $("#apprers .brandEating").append(list);
            },
            error: function (res) {
                console.log(res);
            }
        });
    },
    inits:function () {
        // 猫狗主子切换
        if($(".petspeciesa").find("li").val() == '1'){
            $(".petspeciesa li:eq(0)").addClass("typemg");
        }
        $("#petspecies").on('click','li',function () {
            var _index = $(this).index();
            $("#Pet_information .mg_xuan_z").eq(_index).show().siblings().hide();
            $(this).addClass("typemg").siblings().removeClass("typemg");
        });
        // 下拉框点击显示隐藏
        $(".inputallings").on('click',function () {
            $(this).next().next().toggle();
        });
        // 点击循环的内容获取它的value值
        $("#Pet_information").on('click','.cyclic_datas',function () {
            var vals = $(this).attr('value');
            var htmls = $(this).html();
            $(this).parent().parent().find(".inputallings").attr('value',vals);
            $(this).parent().parent().find(".inputallings").html(htmls);
            $(this).parent().hide();
        });
        // 判断猫选中状态
        // $("#Pet_information").on('click','.favoritetastes',function () {
        //     if($(this).find('.taste_kou').hasClass('change_color')){
        //         $("#Pet_cat").css('background',"#69f4ce");
        //         $("#Pet_cat").css('color',"#333");
        //         $("#Pet_cat").removeAttr('disabled');
        //     }
        // });
        // // 判断狗选中状态
        // $("#Petdoginformation").on('click','.favoritetastes',function () {
        //     if($(this).find('.taste_kou').hasClass('change_color')){
        //         $("#Pet_dog").css('background',"#69f4ce");
        //         $("#Pet_dog").css('color',"#333");
        //         $("#Pet_dog").removeAttr('disabled');
        //     }
        // });

    },
    querys:function () {
        // 查看宠物信息
        $("#New_master").on('click','li',function () {
            $(".container_border").show();
            $(".nav_contentsd").html('');
            var petid = $(this).val();
            // 点击查询宠物信息ajax
            setTimeout(function() {
                $.ajax({
                    url: "/pet/"+petid,
                    type: "get",
                    async:false,
                    dataType: "json",
                    data:{},
                    success: function(res) {
                        $(".container_border").hide();
                        // 默认生日状态
                        var birdild = '';
                        var maogoutype = '';
                        var pet_type = res.pet_type;
                        var sexnan = '';
                        var sexnv = '';
                        petids = res.pet_type;//种类ID
                        sex_id = res.sex;//性别
                        type_id = res.pet_variety;//种类
                        weight_id = res.shape;//体型
                        eating_habitsid = res.food_habits;//饮食习惯
                        steriliid = res.sterili;//绝育
                        pet_typeid = res.pet_type;//宠物ID
                        brandid = res.food_brand;//主食品牌
                        modifyid = res.id;//修改ID
                        food_favorite = res.food_favorite;//喜欢的口味
                        tabooid = res.food_taboo;//忌口
                        diseaseid = res.disease;//疾病
                        if(res.age_type == '1'){
                            birdild = '岁';
                        }else if(res.age_type == '2'){
                            birdild = '月';
                        }
                        if(res.pet_type == '1'){
                            maogoutype = '/static/images/cars.png';
                            sexnan = '/static/images/carnans.png';
                            sexnv = '/static/images/cars.png';
                        }else{
                            maogoutype = '/static/images/dogs.png';
                            sexnan = '/static/images/dogs.png';
                            sexnv = '/static/images/dogsnv.png';
                        }
                        var warpper = '';
                        warpper += '<div class="title_mg">'+
                            '<ul class="petspeciesa">'+
                            '<li class="type_p typemg" value="" style="margin-left: 5.6rem;">'+
                            '<img src="'+maogoutype+'" alt="" data-id="'+pet_type+'">'+
                            '</li>'+
                            '</ul>'+
                            '</div>'+
                            '<div class="">'+
                            '<div class="allget title_nav">'+
                            '<div class="title_First">'+
                            '<ul>'+
                            <!--名称-->
                            '<li class="master_names">我的名称 <span class="english_names"> MY NAME</span></li>'+
                            '<li class="Inputboxalls">'+
                            '<input type="text" value="'+res.pet_name+'" class="Master_name commonname" onchange="value=value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,"")" onbeforepaste="clipboardData.setData("text",clipboardData.getData("text").replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,""))" maxlength="10"/>'+
                            '</li>'+
                            <!--性别-->
                            '<li class="master_names">我是 <span class="english_names"> MY SEX</span></li>'+
                            '<div class="sexcontents">'+
                            '<li class="sexselectionss">'+
                            '<img src="'+sexnan+'" alt="">'+
                            '<div class="sexselebuttons" data-id="1">小王子</div>'+
                            '</li>'+
                            '<li class="sexselectionss">'+
                            '<img src="'+sexnv+'" alt="">'+
                            '<div class="sexselebuttons" data-id="2">小公主</div>'+
                            '</li>'+
                            '</div>'+
                            <!--宠物种类-->
                            '<li class="master_names">我是一只 <span class="english_names"> MY BREED</span></li>'+
                            '<ul class="Pettype_Collection petinformations">'+
                            '</ul>'+
                            <!--生日-->
                            '<li class="master_names">我的年龄 <span class="english_names"> MY BIRTHDAY</span></li>'+
                            '<li class="Inputboxalls" style="position: relative;">'+
                            '<input type="tel" class="birthday"  value="'+res.age+'" style="width: 80%;" onKeyUp="this.value=this.value.replace(/\D/g,"")" onafterpaste="this.value=this.value.replace(/\D/g,"")" maxlength="2"/>'+
                            '<span class="inputallings kilogramnumber Birthday_date" value="'+res.age_type+'" style="width: 2rem;">'+birdild+'</span>'+
                            '<img src="/static/images/xialajiantou.png" alt="" style="margin-top: 0.75rem;width: 1rem;height: 0.5rem;position: absolute;right: 0.6rem;z-index: -1">'+
                            '<div class="Dropdown_boxs" style="width: 14%;height: 2.4rem;bottom: -2.5rem;left: 80%;">'+
                            '<div value="1" class="cyclic_datas">岁</div>'+
                            '<div value="2" class="cyclic_datas">月</div>'+
                            '</div>'+
                            '</li>'+
                            <!--体重-->
                            '<li class="master_names">我的体重 <span class="english_names"> MY WEIGHT</span></li>'+
                            '<li class="Inputboxalls">'+
                            '<input type="tel" style="width:75%;" value="'+res.weight+'" class="pet_weight commonweight" onKeyUp="this.value=this.value.replace(/\D/g,"")" onafterpaste="this.value=this.value.replace(/\D/g,"")" maxlength="2"/>'+
                            '<span class="kilogramnumber">公斤（KG）</span>'+
                            '</li>'+
                            <!--体型-->
                            '<li class="master_names">我的体型 <span class="english_names"> MY SHAPE</span></li>'+
                            '<ul class="ui-choose pet_shape Pettype_Collection">'+
                            '<li value="1" class="weight">太瘦了</li>'+
                            '<li value="2" class="weight">刚刚好</li>'+
                            '<li value="3" class="weight">丰满的</li>'+
                            '<li value="4" class="weight" style="margin: 0;">肥胖的</li>'+
                            '</ul>'+
                            <!--我期望的体重-->
                            '<li class="master_names">我期望的体重 <span class="english_names"> MY DESIRABLE BOOY WEIGHT</span></li>'+
                            '<li class="Inputboxalls">'+
                            '<input type="tel" style="width:75%;" value="'+res.expect_weight+'" class="expected_weight commonexpect" onKeyUp="this.value=this.value.replace(/\D/g,"")" onafterpaste="this.value=this.value.replace(/\D/g,"")" maxlength="2"/>'+
                            '<span class="kilogramnumber">公斤（KG）</span>'+
                            '</li>'+
                            <!--我每天运动次数-->
                            '<li class="master_names">我每天运动次数 <span class="english_names"> MY MOVEMENT TIMES</span></li>'+
                            '<li class="Inputboxalls">'+
                            '<input type="tel" style="width:88%;" value="'+res.motion_times+'" class="Movement_times commontimes" onKeyUp="this.value=this.value.replace(/\D/g,"")" onafterpaste="this.value=this.value.replace(/\D/g,"")" maxlength="2"/>'+
                            '<span class="kilogramnumber">次数</span>'+
                            '</li>'+
                            <!--我每天运动次数-->
                            '<li class="master_names">我每次的运动量 <span class="english_names"> MY EACH EXERCISE VOLUME</span></li>'+
                            '<li class="Inputboxalls">'+
                            '<input type="tel" style="width: 88%;" value="'+res.motion_distance+'" class="rangeof_motion commonrange" onKeyUp="this.value=this.value.replace(/\D/g,"")" onafterpaste="this.value=this.value.replace(/\D/g,"")" maxlength="2"/>'+
                            '<span class="kilogramnumber">公里</span>'+
                            '</li>'+
                            <!--我的饮食习惯-->
                            '<li class="master_names">我的饮食习惯 <span class="english_names"> MY EATING HABITS</span></li>'+
                            '<ul class="yinshi_uc eating_habits Pettype_Collection">'+
                            '<li value="1">非常挑剔</li>'+
                            '<li value="2">比较挑剔</li>'+
                            '<li value="3">从不挑食</li>'+
                            '</ul>'+
                            <!--我目前吃的品牌-->
                            '<li class="master_names">我目前吃的品牌 <span class="english_names"> MY FOOD BRAND</span></li>'+
                            '<li class="Inputboxalls" style="position: relative;">'+
                            '<span class="inputallings mySelect daily_brand" style="float: left;width: 92%;height: 100%;line-height: 1.97rem;"></span>'+
                            '<img src="/static/images/xialajiantou.png" alt="" style="margin-top: 0.75rem;width: 1rem;height: 0.5rem;">'+
                            '<div class="Dropdown_boxs brandEating">'+
                            '</div>'+
                            '</li>'+
                            <!--我最喜欢的肉肉-->
                            '<li class="master_names">我最喜欢的肉肉 <span class="english_names"> MY FLAVOR</span></li>'+
                            '<ul class="favorite_taste">'+
                            '<li value="" class="favoritetastes">'+
                            '<img src="/static/images/nius.png" alt="">'+
                            '<div class="taste_kou">牛肉</div>'+
                            '</li>'+
                            '<li value="" class="favoritetastes" style="margin: 0 2.4rem">'+
                            '<img src="/static/images/jis.png" alt="" style="width: 1.8rem">'+
                            '<div class="taste_kou">鸡肉</div>'+
                            '</li>'+
                            '<li value="" class="favoritetastes">'+
                            '<img src="/static/images/zhus.png" alt="">'+
                            '<div class="taste_kou">猪肉</div>'+
                            '</li>'+
                            '</ul>'+
                            <!--我最讨厌的肉肉-->
                            '<li class="master_names">我最讨厌的肉肉 <span class="english_names"> MY ALLERGEN</span></li>'+
                            '<ul class="Taboo_food">'+
                            '<li value="" class="favoritetastes">'+
                            '<img src="/static/images/nius.png" alt="">'+
                            '<div class="taste_kou">牛肉</div>'+
                            '</li>'+
                            '<li value="" class="favoritetastes" style="margin: 0 2.4rem">'+
                            '<img src="/static/images/jis.png" alt="" style="width: 1.8rem">'+
                            '<div class="taste_kou">鸡肉</div>'+
                            '</li>'+
                            '<li value="" class="favoritetastes">'+
                            '<img src="/static/images/zhus.png" alt="">'+
                            '<div class="taste_kou">猪肉</div>'+
                            '</li>'+
                            '</ul>'+
                            '<p class="prompt" style="display: none;"></p>'+
                            <!--我的绝育情况-->
                            '<li class="master_names">我的绝育情况 <span class="english_names"> MY STERILIZATION</span></li>'+
                            '<div class="sterilization">'+
                            '<li class="sterilizationss" value="0">未绝育</li>'+
                            '<li class="sterilizationss" value="1">已绝育</li>'+
                            '</div>'+
                            <!--我的身体情况-->
                            '<li class="master_names">我的身体情况 <span class="english_names"> MY HEALTHY</span></li>'+
                            '<div class="kouwei_d diseasechangs">'+
                            '<ul class="diseasess">'+
                            '<li value="" class="disease_ids">便便不成型</li>'+
                            '<li value="" class="disease_ids">免疫力差</li>'+
                            '<li value="" class="disease_ids">脱发/毛发暗淡</li>'+
                            '<li value="" class="disease_ids">口臭/异味</li>'+
                            '<li value="" class="disease_ids">牙龈不健康</li>'+
                            '<li value="" class="disease_ids">泪腺炎</li>'+
                            '</ul>'+
                            '</div>'+
                            '</ul>'+
                            '<button class="peifang peifangactive input_warpper" style="background: #9dac6f;color:white;">生成专属订制配方</button>'+
                            '</div>'+
                            '</div>'+
                            '</div>';
                        $(".nav_contentsd").html('');
                        $(".nav_contentsd").append(warpper);
                        // var eietcontent = $("#apprers").find(".pet_Sex").html();
                        // $("#apprers .eietsexreplacement").html(eietcontent);
                        // $("#apprers").on('click','.adddconsoles',function () {
                        //     var eietcontent = $(this).html();
                        //     $("#apprers .eietsexreplacement").html(eietcontent);
                        // });

                        // 调取宠物种类
                        commondata.eidt_types(pet_type);
                        modify_pet.brandids();
                    },
                    error: function (res) {
                        console.log(res);
                    }

                });
                // 调取数据信息
                mationvalue.peteidt();
            }, 100);
        });
    }
};
modify_pet.initall();