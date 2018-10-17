/**
 * Created by Administrator on 2018/6/28.
 *  普通定制数据取值
 */
'use strict';
// 宠物猫
var pet_shape = 1;
var eating_habits = 1;
var favorite_taste = [];
var taboo_food = [];
var diseasess = [];
var sex = 1;//性别
var Petspecies = 93; //宠物种类
var sterilization = 0;//是否绝育

// 宠物狗
var dogpet_shape = 1;
var dogeating_habits = 1;
var dogfavorite_taste = [];
var dogtaboo_food = [];
var dogdiseasess = [];
var dogsex = 1;//性别
var dogPetspecies = 1; //宠物种类
var dogsterilization = 0;//是否绝育

// 编辑
var eidtfavorite_taste = food_favorite;
var eidttaboo_food = [];
var eidtdiseasess = diseaseid;
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
var mationvalue = {
    init:function(){
        mationvalue.petcat();
        mationvalue.petdog();
    },
    // 宠物猫信息
    petcat:function () {
        // 选择性别
        var toggleDiv = document.querySelectorAll("#petcatinformation .sexcontents div");
        for(var i=0; i<toggleDiv.length;i++){
            toggleDiv[i].index=i;
            toggleDiv[i].onclick =function(){
                for(var j = 0 ;j<toggleDiv.length;j++){
                    toggleDiv[j].className = "sexselebuttons";
                }
                toggleDiv[this.index].className = "sexselebuttons change_color";
            }
        }
        $("#petcatinformation .sexselebuttons").on('click',function () {
            sex = $(this).attr('data-id');
        });
        // 默认宠物种类
        if($("#petcatinformation .petinformations").find("li").val() == '0'){
            $("#petcatinformation .petinformations li:eq(0)").addClass("change_color");
        }
        // 选择宠物种类
        $("#petcatinformation .petinformations").on('click','li',function () {
            $(this).addClass("change_color").siblings().removeClass("change_color");
            Petspecies = $(this).attr('data-id');
            var pethtml = $(this).html();
            $("#petcatinformation .Lookatmores").html(pethtml);
            $("#petcatinformation .Pettype_Collection").addClass('Add_properties');
            $("#petcatinformation .Takeupconts").hide();
            $("#petcatinformation .Lookatmores").show();
        });
        // 默认宠物体型
        if($("#petcatinformation .pet_shape").find("li").val() == '1'){
            $("#petcatinformation .pet_shape li:eq(0)").addClass("change_color");
        }
        $("#petcatinformation .pet_shape").on('click','li',function () {
            $(this).addClass("change_color").siblings().removeClass("change_color");
            pet_shape = $(this).val();
        });
        // 默认宠物饮食习惯
        if($("#petcatinformation .eating_habits").find("li").val() == '1'){
            $("#petcatinformation .eating_habits li:eq(0)").addClass("change_color");
        }
        $("#petcatinformation .eating_habits").on('click','li',function () {
            $(this).addClass("change_color").siblings().removeClass("change_color");
            eating_habits = $(this).val();
        });
        // 喜欢的口味
        $("#petcatinformation .favorite_taste").on('click','li',function () {
            var data = $(this).find('.taste_kou').html();
            if($(this).find('.taste_kou').hasClass('change_color')){
                $(this).find('.taste_kou').removeClass("change_color");
                favorite_taste.remove(data);
            }else{
                $(this).find('.taste_kou').addClass("change_color");
                favorite_taste.push(data);
            }
        });

        // 忌口食材
        $("#petcatinformation .Taboo_food").on('click','li',function () {
            // 添加颜色
            var data = $(this).find('.taste_kou').html();
            if($(this).find('.taste_kou').hasClass('change_color')){
                $(this).find('.taste_kou').removeClass("change_color");
                taboo_food.remove(data);
            }else{
                $(this).find('.taste_kou').addClass("change_color");
                taboo_food.push(data);
            }
            var colorlength = ($("#petcatinformation .Taboo_food").find('.change_color')).length;
            if(colorlength > 2){
                $("#petcatinformation .prompt").html('哎呀，暂时没有适合小主的口味啦~');
                $("#petcatinformation .prompt").show();
            }else{
                $("#petcatinformation .prompt").hide();
                $("#petcatinformation .prompt").html('');
            }
        });

        // 绝育情况
        // 默认宠物绝育情况
        if($("#petcatinformation .sterilization").find("li").val() == '0'){
            $("#petcatinformation .sterilization li:eq(0)").addClass("change_color");
        }
        $("#petcatinformation .sterilization").on('click','li',function () {
            $(this).addClass("change_color").siblings().removeClass("change_color");
            sterilization = $(this).val();
        });

        // 疾病
        $("#petcatinformation .diseasess").on('click','li',function () {
            var data = $(this).html();
            if($(this).hasClass('change_color')){
                $(this).removeClass("change_color");
                diseasess.remove(data);
            }else{
                $(this).addClass("change_color");
                diseasess.push(data);
            }
        });
    },
    // 宠物狗信息
    petdog:function () {
        var toggleDiv = document.querySelectorAll("#Petdoginformation .sexcontents div");
        for(var i=0; i<toggleDiv.length;i++){
            toggleDiv[i].index=i;
            toggleDiv[i].onclick =function(){
                for(var j = 0 ;j<toggleDiv.length;j++){
                    toggleDiv[j].className = "sexselebuttons";
                }
                toggleDiv[this.index].className = "sexselebuttons change_color";
            }
        }
        // 性别
        $("#Petdoginformation .sexselebuttons").on('click',function () {
            dogsex = $(this).attr('data-id');
        });
        // 默认宠物种类
        if($("#Petdoginformation .petinformations").find("li").val() == '0'){
            $("#Petdoginformation .petinformations li:eq(0)").addClass("change_color");
        }
        // 选择宠物种类
        $("#Petdoginformation .petinformations").on('click','li',function () {
            $(this).addClass("change_color").siblings().removeClass("change_color");
            dogPetspecies = $(this).attr('data-id');
            var pethtml = $(this).html();
            $("#Petdoginformation .Lookatmores").html(pethtml);
            $("#Petdoginformation .Pettype_Collection").addClass('Add_properties');
            $("#Petdoginformation .Takeupconts").hide();
            $("#Petdoginformation .Lookatmores").show();
        });
        // 默认宠物体型
        if($("#Petdoginformation .pet_shape").find("li").val() == '1'){
            $("#Petdoginformation .pet_shape li:eq(0)").addClass("change_color");
        }
        $("#Petdoginformation .pet_shape").on('click','li',function () {
            $(this).addClass("change_color").siblings().removeClass("change_color");
            dogpet_shape = $(this).val();
        });
        // 默认宠物饮食习惯
        if($("#Petdoginformation .eating_habits").find("li").val() == '1'){
            $("#Petdoginformation .eating_habits li:eq(0)").addClass("change_color");
        }
        $("#Petdoginformation .eating_habits").on('click','li',function () {
            $(this).addClass("change_color").siblings().removeClass("change_color");
            dogeating_habits = $(this).val();
        });
        // 喜欢的口味
        $("#Petdoginformation .favorite_taste").on('click','li',function () {
            var data = $(this).find('.taste_kou').html();
            if($(this).find('.taste_kou').hasClass('change_color')){
                $(this).find('.taste_kou').removeClass("change_color");
                dogfavorite_taste.remove(data);
            }else{
                $(this).find('.taste_kou').addClass("change_color");
                dogfavorite_taste.push(data);
            }
        });

        // 忌口食材
        $("#Petdoginformation .Taboo_food").on('click','li',function () {
            // 添加颜色
            var data = $(this).find('.taste_kou').html();
            if($(this).find('.taste_kou').hasClass('change_color')){
                $(this).find('.taste_kou').removeClass("change_color");
                dogtaboo_food.remove(data);
            }else{
                $(this).find('.taste_kou').addClass("change_color");
                dogtaboo_food.push(data);
            }
            var colorlength = ($("#Petdoginformation .Taboo_food").find('.change_color')).length;
            if(colorlength > 2){
                $("#Petdoginformation .prompt").html('哎呀，暂时没有适合小主的口味啦~');
                $("#Petdoginformation .prompt").show();
            }else{
                $("#Petdoginformation .prompt").hide();
                $("#Petdoginformation .prompt").html('');
            }
        });

        // 绝育情况
        // 默认宠物绝育情况
        if($("#Petdoginformation .sterilization").find("li").val() == '0'){
            $("#Petdoginformation .sterilization li:eq(0)").addClass("change_color");
        }
        $("#Petdoginformation .sterilization").on('click','li',function () {
            $(this).addClass("change_color").siblings().removeClass("change_color");
            dogsterilization = $(this).val();
        });

        // 疾病
        $("#Petdoginformation .diseasess").on('click','li',function () {
            var data = $(this).html();
            if($(this).hasClass('change_color')){
                $(this).removeClass("change_color");
                dogdiseasess.remove(data);
            }else{
                $(this).addClass("change_color");
                dogdiseasess.push(data);
            }
        });
    },
    // 编辑信息
    peteidt:function () {
        var toggleDiv = document.querySelectorAll("#apprers .sexcontents div");
        for(var i=0; i<toggleDiv.length;i++){
            toggleDiv[i].index=i;
            toggleDiv[i].onclick =function(){
                for(var j = 0 ;j<toggleDiv.length;j++){
                    toggleDiv[j].className = "sexselebuttons";
                }
                toggleDiv[this.index].className = "sexselebuttons change_color";
            }
        }
        // 默认性别
        if(sex_id == '1'){
            $("#apprers .sexselectionss:eq(0) .sexselebuttons").addClass("change_color");
        }else{
            $("#apprers .sexselectionss:eq(1) .sexselebuttons").addClass("change_color");
        }
        // 性别
        $("#apprers .sexselebuttons").on('click',function () {
            sex_id = $(this).attr('data-id');
        });
        // 默认宠物种类
        if(petids == '1'){
            $("#apprers .petinformations li").eq((type_id)-93).addClass("change_color");
        }else{
            $("#apprers .petinformations li").eq((type_id)-1).addClass("change_color");
        }

        // 选择宠物种类
        $("#apprers .petinformations").on('click','li',function () {
            $(this).addClass("change_color").siblings().removeClass("change_color");
            type_id = $(this).attr('data-id');
        });
        // 默认宠物体型
        if(weight_id == weight_id){
            $("#apprers .pet_shape li").eq((weight_id)-1).addClass("change_color");
        }
        $("#apprers .pet_shape").on('click','li',function () {
            $(this).addClass("change_color").siblings().removeClass("change_color");
            weight_id = $(this).val();
        });
        // 默认宠物饮食习惯
        if(eating_habitsid == eating_habitsid){
            $("#apprers .eating_habits li").eq((eating_habitsid)-1).addClass("change_color");
        }
        $("#apprers .eating_habits").on('click','li',function () {
            $(this).addClass("change_color").siblings().removeClass("change_color");
            eating_habitsid = $(this).val();
        });
        // 喜欢的口味默认
        if(food_favorite.length!=''){
            $.each(food_favorite, function (key, val) {
                if(val == '牛肉'){
                    $("#apprers .favoritetastes:eq(0) .taste_kou").addClass("change_color");
                }else if(val == '鸡肉'){
                    $("#apprers .favoritetastes:eq(1) .taste_kou").addClass("change_color");
                }else if(val == '猪肉'){
                    $("#apprers .favoritetastes:eq(2) .taste_kou").addClass("change_color");
                }
            });
        }

        // 喜欢的口味
        $("#apprers .favorite_taste").on('click','li',function () {
            var data = $(this).find('.taste_kou').html();
            if($(this).find('.taste_kou').hasClass('change_color')){
                $(this).find('.taste_kou').removeClass("change_color");
                food_favorite.remove(data);
            }else{
                $(this).find('.taste_kou').addClass("change_color");
                food_favorite.push(data);
            }
        });
        // 忌口默认
        if(tabooid.length!=0){
            $.each(tabooid, function (key, val) {
                if(val == '牛肉'){
                    $("#apprers .Taboo_food li:eq(0) .taste_kou").addClass("change_color");
                }else if(val == '鸡肉'){
                    $("#apprers .Taboo_food li:eq(1) .taste_kou").addClass("change_color");
                }else if(val == '猪肉'){
                    $("#apprers .Taboo_food li:eq(2) .taste_kou").addClass("change_color");
                }
            });
        }

        // 忌口食材
        $("#apprers .Taboo_food").on('click','li',function () {
            // 添加颜色
            var data = $(this).find('.taste_kou').html();
            if($(this).find('.taste_kou').hasClass('change_color')){
                $(this).find('.taste_kou').removeClass("change_color");
                tabooid.remove(data);
            }else{
                $(this).find('.taste_kou').addClass("change_color");
                tabooid.push(data);
            }
            var colorlength = ($("#apprers .Taboo_food").find('.change_color')).length;
            if(colorlength > 2){
                $("#apprers .prompt").html('哎呀，暂时没有适合小主的口味啦~');
                $("#apprers .prompt").show();
            }else{
                $("#apprers .prompt").hide();
                $("#apprers .prompt").html('');
            }
        });

        // 绝育情况
        // 默认宠物绝育情况
        if(steriliid == '0'){
            $("#apprers .sterilization li:eq(0)").addClass("change_color");
        }else{
            $("#apprers .sterilization li:eq(1)").addClass("change_color");
        }
        $("#apprers .sterilization").on('click','li',function () {
            $(this).addClass("change_color").siblings().removeClass("change_color");
            steriliid = $(this).val();
        });
        // 疾病默认
        if(diseaseid.length!=0){
            $.each(diseaseid, function (key, val) {
                if(val == '便便不成型'){
                    $("#apprers .diseasess li:eq(0)").addClass("change_color");
                }else if(val == '免疫力差'){
                    $("#apprers .diseasess li:eq(1)").addClass("change_color");
                }else if(val == '脱发/毛发暗淡'){
                    $("#apprers .diseasess li:eq(2)").addClass("change_color");
                }else if(val == '口臭/异味'){
                    $("#apprers .diseasess li:eq(3)").addClass("change_color");
                }else if(val == '牙龈不健康'){
                    $("#apprers .diseasess li:eq(4)").addClass("change_color");
                }else if(val == '泪腺炎'){
                    $("#apprers .diseasess li:eq(5)").addClass("change_color");
                }
            });
        }
        // 疾病
        $("#apprers .diseasess").on('click','li',function () {
            var data = $(this).html();
            if($(this).hasClass('change_color')){
                $(this).removeClass("change_color");
                diseaseid.remove(data);
            }else{
                $(this).addClass("change_color");
                diseaseid.push(data);
            }
        });
    },
    // 弹框提示信息
    bombboxhints:function (res) {
        $('.promptbox').html(res);
        $('.promptbox').fadeIn();
        setTimeout(function() {
            $(".promptbox").fadeOut();
        }, 2000);
    }

};
mationvalue.init();
