/**
 * Created by Administrator on 2018/6/27.
 *  普通定制
 *
 */
'use strict';
var customization = {
    init:function(){
        customization.displayeffect();
        customization.newmasterswitch();
    },
    // 逐条信息展示效果
    displayeffect:function(){
        // 猫是否有疾病//
        $("#Pet_information").on('click','.Choicedisease',function () {
            if($(this).attr('value') == '0'){
                $(".diseasechangs").fadeIn();
            }else{
                $(".diseasechangs").fadeOut();
            }
        });
        // 狗是否有疾病
        $("#Petdoginformation").on('click','.Choicedisease',function () {
            if($(this).attr('value') == '0'){
                $(".diseasechangs").fadeIn();
            }else{
                $(".diseasechangs").fadeOut();
            }
        });
        // 编辑时猫狗是否有疾病
        $("#apprers").on('click','.Choicedisease',function () {
            if($(this).attr('value') == '0'){
                $(".diseasechangs").fadeIn();
            }else{
                $(".diseasechangs").fadeOut();
            }
        });
        //宠物名称
        $(".commonname").on('change',function () {
            var name = $(this).val();
            if($(this).val()!=''){
                $(".commonchongwus").html(name);
            }
        });
        // 编辑时宠物名称改变
        $("#apprers").on('change','.commonname',function () {
            var name = $(this).val();
            if($(this).val()!=''){
                $("#apprers .commonchongwus").html(name);
            }
        });
        // 点击隐藏已接受的数据 （性别）
        $("#apprers").on('click','.pet_Sex',function () {
            $(".accepteddata").hide();
        });
        // 点击隐藏已接收数据（种类）
        $("#apprers").on('click','.pet_types',function () {
            $(".acceptezhomngs").hide();
        });
        // 点击隐藏已接收数据（绝育）
        $("#apprers").on('click','.Whether',function () {
            $(".sterilization").hide();
        });
        // 点击隐藏已接收数据（品牌）
        $("#apprers").on('click','.daily_brand',function () {
            $(".foodbrandd").hide();
        });
        // 点击隐藏已接收数据（主粮）
        $("#apprers").on('click','.Staplefoodgrain',function () {
            $(".petstaplefood").hide();
        });
        // 点击新主子和主子的切换
        $(".addzhuziings").on('click',function () {
            $(this).addClass('xinzhu');
            $("#New_master li").removeClass('xinzhu');
        });
        $("#New_master").on('click','li',function () {
            $(this).addClass('xinzhu').siblings().removeClass("xinzhu");
            $(".addzhuziings").removeClass('xinzhu');
        })
    },
    // 新主子切换
    newmasterswitch:function(){
        $(".addzhuziings").on('click',function () {
            $("#Pet_information").show();
            $("#apprers").hide();
            $(".yincangs").show();
        });
        $("#New_master").on('click','li',function () {
            $("#Pet_information").hide();
            $("#apprers").show();
            $(".yincangs").hide();
            // $(this).addClass("xinzhu").siblings().removeClass("xinzhu");
        });

        // 品牌查看更多
        $(".Lookatmores").on('click',function () {
            $(this).prev().removeClass('Add_properties');
            $(this).hide();
            $(this).next().show();
        });
        // 品牌收起
        $(".Takeupconts").on('click',function () {
            $(this).prev().prev().addClass('Add_properties');
            $(this).hide();
            $(this).prev().show();
        })
    },
};

customization.init();