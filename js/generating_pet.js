/**
 * Created by Administrator on 2018/6/27.
 *  生成宠物信息  jack
 *
 */
'use strict';
var generating_pet = {
    generating:function () {
        var contens = $(".pet_Sex").html();
        var dogcontens = $(".dogpet_Sex").html();
        $(".sexreplacement").html(contens);
        $(".dogsexreplacement").html(dogcontens);
        $("#petcatinformation").on('click','.adddconsoles',function () {
            var contens = $(this).html();
            $(".sexreplacement").html(contens);
        });
        $("#Petdoginformation").on('click','.adddconsoles',function () {
            var contens = $(this).html();
            $(".dogsexreplacement").html(contens);
        });

        // 编辑下拉框点击显示隐藏
        $("#apprers").on('click','.inputallings',function () {
            $(this).next().next().toggle();
        });
        // 下拉框失去焦点
        // $(".inputallings").on('blur',function () {
        //    $(".Dropdown_boxs").fadeOut();
        // });
        // 编辑点击循环的内容获取它的value值
        $("#apprers").on('click','.cyclic_datas',function () {
            var vals = $(this).attr('value');
            var htmls = $(this).html();
            $(this).parent().parent().find(".inputallings").attr('value',vals);
            $(this).parent().parent().find(".inputallings").html(htmls);
            $(this).parent().hide();
        });

        $("#Pet_cat").on('click',function () {
            var Pet_ids = 1;
            var Master_name = $("#petcatinformation .Master_name").val();
            var pet_Sex = sex;
            var pet_types = Petspecies;
            var birdtly = $("#petcatinformation .birthday").val();
            var pet_weight = $("#petcatinformation .pet_weight").val();
            var pet_shapes = pet_shape;
            var expected_weight = $("#petcatinformation .expected_weight").val();
            var Movement_times = $("#petcatinformation .Movement_times").val();
            var rangeof_motion = $("#petcatinformation .rangeof_motion").val();
            var daily_brand = $("#petcatinformation .daily_brand").attr('value');
            var eating_habitss = eating_habits;
            var favorite_tastes = JSON.stringify(favorite_taste);
            var taboo_foods = JSON.stringify(taboo_food);
            var Whether = sterilization;
            var diseasessa = JSON.stringify(diseasess);
            var agetype = $("#petcatinformation .Birthday_date").attr('value');
            var data = {
                pet_type: Pet_ids,  //宠物ID
                pet_name: Master_name,  //宠物名称
                sex: pet_Sex,  //宠物性别
                pet_variety: pet_types,  //宠物种类
                age:birdtly,//生日
                weight: pet_weight,  //体重
                shape: pet_shapes,  //体型
                expect_weight: expected_weight,  //期望体重
                motion_times: Movement_times,  //运动次数
                motion_distance: rangeof_motion,  //运动距离
                food_habits: eating_habitss,  //饮食习惯
                food_brand: daily_brand,  //主食品牌
                food_favorite: favorite_tastes,  //喜欢的口味
                food_taboo: taboo_foods,  //忌口食材
                sterili: Whether,  //是否绝育
                disease: diseasessa,  //疾病
                food_type:1,
                age_type:agetype
            };
            // 添加信息ajax
            if (Master_name == '') {
                mationvalue.bombboxhints('请填写您主子的名称');
            } else if (birdtly == '') {
                mationvalue.bombboxhints('请填写您主子的生日');
            } else if (pet_weight == '') {
                mationvalue.bombboxhints('请填写您主子的体重');
            } else if (expected_weight == '') {
                mationvalue.bombboxhints('请填写您期望主子的体重');
            } else if (Movement_times == '') {
                mationvalue.bombboxhints('请填写您主子的运动次数');
            } else if (rangeof_motion == '') {
                mationvalue.bombboxhints('请填写您主子的运动距离');
            } else if ($("#petcatinformation .daily_brand").html() == '') {
                mationvalue.bombboxhints('请选择您主子的食物品牌');
            } else if($("#petcatinformation .prompt").html() != ''){
                mationvalue.bombboxhints('暂时没有适合小主的口味啦~');
            } else {
                $(".container_border").show();
                setTimeout(function() {
                    $.ajax({
                        url: "/pet",
                        type: "post",
                        async: false,
                        dataType: "json",
                        data: data,
                        success: function (res) {
                            if (res.code == '200') {
                                var petsid = res.data.id;
                                window.location.href = "/view/products/"+petsid;
                                // $("input").val('');
                                // $(".pet_types option:selected").val('');
                                // $(".daily_brand option:selected").val('');
                                // $(".Staplefoodgrains option:selected").val('');
                                // $(".container_border").hide();
                            }else{
                                var conts = res.message;
                                mationvalue.bombboxhints(conts);
                            }
                        },
                        error: function (res) {
                            console.log(res);
                        }
                    });
                }, 100);
            }
        });
        // 宠物狗ajax调取
        $("#Pet_dog").on('click',function () {
            var Pet_ids = 2;
            var Master_name = $("#Petdoginformation .Master_name").val();
            var pet_Sex = dogsex;
            var pet_types = dogPetspecies;
            var birdtly = $("#Petdoginformation .birthday").val();
            var pet_weight = $("#Petdoginformation .pet_weight").val();
            var pet_shapes = dogpet_shape;
            var expected_weight = $("#Petdoginformation .expected_weight").val();
            var Movement_times = $("#Petdoginformation .Movement_times").val();
            var rangeof_motion = $("#Petdoginformation .rangeof_motion").val();
            var daily_brand = $("#Petdoginformation .daily_brand").attr('value');
            var eating_habitss = dogeating_habits;
            var favorite_tastes = JSON.stringify(dogfavorite_taste);
            var taboo_foods = JSON.stringify(dogtaboo_food);
            var Whether = dogsterilization;
            var diseasessa = JSON.stringify(dogdiseasess);
            var agetype = $("#Petdoginformation .Birthday_date").attr('value');
            var data = {
                pet_type: Pet_ids,  //宠物ID
                pet_name: Master_name,  //宠物名称
                sex: pet_Sex,  //宠物性别
                pet_variety: pet_types,  //宠物种类
                age:birdtly,//生日
                weight: pet_weight,  //体重
                shape: pet_shapes,  //体型
                expect_weight: expected_weight,  //期望体重
                motion_times: Movement_times,  //运动次数
                motion_distance: rangeof_motion,  //运动距离
                food_habits: eating_habitss,  //饮食习惯
                food_brand: daily_brand,  //主食品牌
                food_favorite: favorite_tastes,  //喜欢的口味
                food_taboo: taboo_foods,  //忌口食材
                sterili: Whether,  //是否绝育
                disease: diseasessa,  //疾病
                food_type:1,
                age_type:agetype
            };
            // 添加信息ajax
            if (Master_name == '') {
                mationvalue.bombboxhints('请填写您主子的名称');
            } else if (birdtly == '') {
                mationvalue.bombboxhints('请填写您主子的生日');
            } else if (pet_weight == '') {
                mationvalue.bombboxhints('请填写您主子的体重');
            } else if (expected_weight == '') {
                mationvalue.bombboxhints('请填写您期望主子的体重');
            } else if (Movement_times == '') {
                mationvalue.bombboxhints('请填写您主子的运动次数');
            } else if (rangeof_motion == '') {
                mationvalue.bombboxhints('请填写您主子的运动距离');
            } else if ($("#Petdoginformation .daily_brand").html() == '') {
                mationvalue.bombboxhints('请选择您主子的食物品牌');
            } else if($("#Petdoginformation .prompt").html() != ''){
                mationvalue.bombboxhints('暂时没有适合小主的口味啦~');
            } else {
                $(".container_border").show();
                setTimeout(function() {
                    $.ajax({
                        url: "/pet",
                        type: "post",
                        async: false,
                        dataType: "json",
                        data: data,
                        success: function (res) {
                            if (res.code == '200') {
                                var petsid = res.data.id;
                                window.location.href = "/view/products/"+petsid;
                                // $("input").val('');
                                // $(".pet_types option:selected").val('');
                                // $(".daily_brand option:selected").val('');
                                // $(".Staplefoodgrains option:selected").val('');
                                // $(".container_border").hide();
                            }else{
                                var conts = res.message;
                                mationvalue.bombboxhints(conts);
                            }
                        },
                        error: function (res) {
                            console.log(res);
                        }
                    });
                }, 100);
            }
        });
        // 编辑传值
        $("#apprers").on('click','.input_warpper',function () {
            var Pet_ids = pet_typeid;
            var Master_name = $("#apprers .Master_name").val();
            var pet_Sex = sex_id;
            var pet_types = type_id;
            var birdtly = $("#apprers .birthday").val();
            var pet_weight = $("#apprers .pet_weight").val();
            var pet_shapes = weight_id;
            var expected_weight = $("#apprers .expected_weight").val();
            var Movement_times = $("#apprers .Movement_times").val();
            var rangeof_motion = $("#apprers .rangeof_motion").val();
            var daily_brand = $("#apprers .daily_brand").attr('value');
            var eating_habitss = eating_habitsid;
            var favorite_tastes = JSON.stringify(food_favorite);
            var taboo_foods = JSON.stringify(tabooid);
            var Whether = steriliid;
            var diseasessa = JSON.stringify(diseaseid);
            var agetype = $("#apprers .Birthday_date").attr('value');
            var data = {
                pet_type: Pet_ids,  //宠物ID
                pet_name: Master_name,  //宠物名称
                sex: pet_Sex,  //宠物性别
                pet_variety: pet_types,  //宠物种类
                age:birdtly,//生日
                weight: pet_weight,  //体重
                shape: pet_shapes,  //体型
                expect_weight: expected_weight,  //期望体重
                motion_times: Movement_times,  //运动次数
                motion_distance: rangeof_motion,  //运动距离
                food_habits: eating_habitss,  //饮食习惯
                food_brand: daily_brand,  //主食品牌
                food_favorite: favorite_tastes,  //喜欢的口味
                food_taboo: taboo_foods,  //忌口食材
                sterili: Whether,  //是否绝育
                disease: diseasessa,  //疾病
                food_type:1,
                age_type:agetype
            };
            // 添加信息ajax
            if (Master_name == '') {
                mationvalue.bombboxhints('请填写您主子的名称');
            } else if (birdtly == '') {
                mationvalue.bombboxhints('请填写您主子的生日');
            } else if (pet_weight == '') {
                mationvalue.bombboxhints('请填写您主子的体重');
            } else if (expected_weight == '') {
                mationvalue.bombboxhints('请填写您期望主子的体重');
            } else if (Movement_times == '') {
                mationvalue.bombboxhints('请填写您主子的运动次数');
            } else if (rangeof_motion == '') {
                mationvalue.bombboxhints('请填写您主子的运动距离');
            } else if ($("#apprers .daily_brand").html() == '') {
                mationvalue.bombboxhints('请选择您主子的食物品牌');
            } else if($("#apprers .prompt").html() != ''){
                mationvalue.bombboxhints('暂时没有适合小主的口味啦~');
            } else {
                $(".container_border").show();
                setTimeout(function() {
                    $.ajax({
                        url: "/pet/"+modifyid,
                        type: "post",
                        async: false,
                        dataType: "json",
                        data: data,
                        success: function (res) {
                            if (res.code == '200') {
                                var petsid = res.data.id;
                                window.location.href = "/view/products/"+petsid;
                            }else{
                                var conts = res.message;
                                mationvalue.bombboxhints(conts);
                            }
                        },
                        error: function (res) {
                            console.log(res);
                        }
                    });
                }, 100);
            }

        });
    }
};
generating_pet.generating();