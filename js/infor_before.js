/**
 * Created by Administrator on 2018/6/27.
 *  公共JS  jack
 *
 */
'use strict';
var  tel = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
var province_id = '';   //省id
var  city_id = '';      //市id
var  area_id = '';      //区域id
var  province_name = '';
var  city_name = '';
var  area_name = '';
var  pet_type = '';
var  pet_size = '';
var  infor_before = {
     infor:function () {
         $("#but_que").click(function() {
             var  person_name = $("#person_name").val();    //联系人
             var  contact_tel = $("#contact_tel").val();       //联系电话
             var area_x = $("#demo2").text();                   //所在地区
             var  address = $("#address").val();      //详细地址
             pet_type = $("#pet_ipt").val();        //宠物类型
             pet_size = $("#pet_ipta").val();           //宠物体型
             var area = area_x+"--"+address;
             if(person_name==""){
                 bombboxhints("且慢~请输入“联系人”再走~");
             }else if(contact_tel==""){
                 bombboxhints("嗷呜，主银请留下电话啦~");
             }else if(tel.test(contact_tel)==false){
                 bombboxhints("喵？手机号格式不对哦~");
             }else if(area_x=="" || area_x==  "选择所在地区"){
                 bombboxhints("汪？您未选“地区”哟");
             }else if(address==""){
                 bombboxhints("喵~要留“详细地址”哟~");
             }else if(pet_type==""){
                 bombboxhints("请您选择宠物类型");
             }else if(pet_size==""){
                 bombboxhints("请您选择宠物体型");
             }else if($("#pet_type").css("display")=="none"){
                 bombboxhints("请您选择宠物体型");
             }else{
                 setTimeout(function () {
                     $(".container_border").show();
                     $.ajax({
                         url: "/order/vipdoor",
                         type: "POST",
                         data: {
                             'person_name': person_name,
                             'phone': contact_tel,
                             'area': area,
                             'pet_type': pet_type,
                             'pet_weight': pet_size
                         },
                         dataType: "json",
                         success: function(msg){
                             $(".container_border").hide();
                             window.location.href = "/view/order_before/"+msg.data.id;
                         }
                     });
                 },1000)

             }
         });
         // 点击宠物类型跟体型的判断
         $(".pet_mg li").click(function() {
             if($(this).index()==0){
                 $(".pet_type_c").css("color","black");
                 $(".pet_type_g").css("color","#ccc9c9");
                 $(".not_choose_cat").css("background","#9DAD6C")
                 $(".not_choose_dog").css("background","white")
             }else if($(this).index()==1){
                 $(".pet_type_c").css("color","#ccc9c9");
                 $(".pet_type_g").css("color","black");
                 $(".not_choose_dog").css("background","#9DAD6C")
                 $(".not_choose_cat").css("background","white")
             }
             var sex = $(this).attr("value");
             $("#pet_ipt").val(sex);
         });
         $(".infor_before_g li").click(function() {
             $(this).children(".txt_choose").css("background","#9DAD6C");
             $(this).siblings().children(".txt_choose").css("background","#ffffff");
             $(this).children(".txt_choose").css("color","#ffffff");
             $(this).siblings().children(".txt_choose").css("color","#333333");
             var size = $(this).attr("value");
             $("#pet_ipta").val(size);

         });
         // <!--点击猫狗显示的效果-->
         $('#mao').click(function() {
             $("#pet_type").css("display", "block");
             $("#infor_before_mao").css("display", "block");
             $("#infor_before_gou").css("display", "none");
             $("#pet_ipta").attr("value","");
         })
         $('#gou').click(function() {
             $("#pet_type").css("display", "block");
             $("#infor_before_gou").css("display", "block");
             $("#infor_before_mao").css("display", "none");
             $("#pet_ipta").attr("value","");
         })
     }
};
infor_before.infor();


//三级联动
//禁止页面滑动
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
var obj = {
    provinceObj: null,
    municipalObj: null,
    countyObj: null,
    cityid:null,
    province_id:null,
    city_id:null
};
var objName = {
    cityname: null, //省
    countyname: null, //市
    districtname: null, //县
};
var sex ='';
var cityname = '';
var countylevel = '';
var district = '';
var queryprovincedata = {
    inits:function(){
        queryprovincedata.pullprovincedata();
        queryprovincedata.countyclick();
        queryprovincedata.districtlevelclick();
        queryprovincedata.clickfillarea();
        queryprovincedata.clickselect();
    },
    // 查询所有的省份信息
    queryprovince: function (callback) {
        $.ajax({
            url: '/address',
            dataType: 'json',
            type: 'get',
            success: function (res) {
                if (res.code == 200 && res.data != "") {
                    callback(res.data);
                }
            },
            error: function (res) {
                console.log(res);
            }
        })
    },

    // 查询所有市级信息
    municipalinformation: function (parent) {
        $.ajax({
            url: '/address?id=' + parent,
            dataType: 'json',
            type: 'get',
            success: function (res) {
                console.log(res);
                if (res.code == 200 && res.data != "") {
                    cityname = res.data;
                    var list = '';
                    if (parent == 2 || parent == 19 || parent == 857 || parent == 2459) {
                        $(".added_choose").hide();
                        for (var i = 0; i < cityname.length; i++) {
                            list += '<li data-id="' + cityname[i].id + '">' + cityname[i].region_name + '<span></span></li>';
                        }
                    } else {
                        for (var i = 0; i < cityname.length; i++) {
                            list += '<li data-id="' + cityname[i].id + '">' + cityname[i].region_name + '<span></span></li>';
                        }
                    }

                    $(".province_class").hide();
                    $(".municipal_class").show();
                    $(".municipal_class").html(list);
                    $(".municipal_warper").show();
                    obj.municipalObj = new IScroll('.municipal_warper');
                    // 点击选择最终地址
                    $(".confirm_all").on('click', function () {
                        // 点击关闭弹窗
                        var cityname = $(".added_choosefistrt span").text();
                        if (parent == 2 || parent == 19 || parent == 857 || parent == 2459) {//判断俩个
                            $('.added_map,.added_white').hide();
                            queryprovincedata.getCityId();
                            $(".infor_before_l #demo2").html('<span>' + objName.cityname + '</span><span>-</span><span data-id=' + countylevel + '>' + objName.countyname + '</span>');
                        } else {//判断三个
                            queryprovincedata.getCityId();
                            $(".added_choose").hide();
                            $('.added_map,.added_white').hide();
                            $(".infor_before_l #demo2").html('<span>' + objName.cityname + '</span><span>-</span><span>' + objName.countyname + '</span><span>-</span><span data-id=' + district + '>' + objName.districtname + '</span>')
                        }

                    })
                }
            },
            error: function (res) {
                console.log(res);
            }
        })
    },

    // 查询所有县级信息
    countyinformation: function (parent) {
        $.ajax({
            url: '/address?id=' + parent,
            dataType: 'json',
            type: 'get',
            success: function (res) {
                if (res.code == 200 && res.data != "") {
                    var cityname = res.data;
                    var list = '';
                    for (var i = 0; i < cityname.length; i++) {
                        list += '<li data-id="' + cityname[i].id + '">' + cityname[i].region_name + '<span></span></li>';
                    }
                    $(".municipal_class").hide();
                    $(".county_class").show();
                    $(".county_class").html(list);
                    $(".county_warper").show();
                    obj.countyObj = new IScroll(".county_warper");
                }else{
                    var cityname = $(".added_choosefistrt span").text();
                    if (parent == 2 || parent == 19 || parent == 857 || parent == 2459) {//判断俩个
                        $('.added_map,.added_white').hide();
                        queryprovincedata.getCityId();
                        $(".infor_before_l #demo2").html('<span>' + objName.cityname + '</span><span>-</span><span data-id=' + countylevel + '>' + objName.countyname + '</span>');
                    } else {//判断三个
                        $(".added_choose").hide();
                        $('.added_map,.added_white').hide();
                        queryprovincedata.getCityId();
                        $(".infor_before_l #demo2").html('<span>' + objName.cityname + '</span><span>-</span><span>' + objName.countyname + '</span>')
                    }
                }
            },
            error: function (res) {
                console.log(res);
            }
        })
    },

    // 点击选择省拉取所有市
    provincesclick: function () {
        $('#province_class').on('click', 'li', function (parent) {
            var parent = $(this).attr('data-id');
            objName.cityname = $(this).text();
            // 添加点击效果
            $(this).addClass('added_cheng').siblings().removeClass('added_cheng');
            $(this).find('span').addClass('iconfont icon-gou');
            $(this).siblings().find('span').removeClass('icon-gou');
            // 添加地址信息
            $(".added_choosefistrt").html('<span data-id="'+parent+'">' + objName.cityname + '</span>');
            $(".province_warper").hide();
            queryprovincedata.municipalinformation(parent, function (res) {});
            obj.municipalObj = new IScroll('.municipal_warper');
        })
    },

    // 点击选择市拉取所有县
    countyclick: function () {
        $('#municipal_class').on('click', 'li', function (parent) {
            var parent = $(this).attr('data-id');
            countylevel = $(this).attr('data-id');
            objName.countyname = $(this).text();
            // 添加点击效果
            $(this).addClass('added_cheng').siblings().removeClass('added_cheng');
            $(this).find('span').addClass('iconfont icon-gou');
            $(this).siblings().find('span').removeClass('icon-gou');

            // 添加地址信息
            $(".added_choosenth").show();
            $(".added_choosenth").html('<span  data-id="'+parent+'">' + objName.countyname + '</span>');
            $(".municipal_warper").hide();
            queryprovincedata.countyinformation(parent, function (res) {});
            obj.municipalObj = new IScroll('.municipal_warper');
        })
    },

    // 点击选择区级
    districtlevelclick: function () {
        $('#county_class').on('click', 'li', function () {
            district = $(this).attr('data-id');
            objName.districtname = $(this).text();
            // 添加点击效果
            $(this).addClass('added_cheng').siblings().removeClass('added_cheng');
            $(this).find('span').addClass('iconfont icon-gou');
            $(this).siblings().find('span').removeClass('icon-gou');

            // 添加地址信息
            $(".added_choosethree").show();
            $(".added_choosethree").html('<span data-id=' + district + '>' + objName.districtname + '</span>');
            if (parent == 2 || parent == 19 || parent == 857 || parent == 2459) {//判断俩个
                $('.added_map,.added_white').hide();
                queryprovincedata.getCityId();
                $(".infor_before_l #demo2").html('<span data-id='+obj.province_id+'>' + objName.cityname + '</span><span>-</span><span data-id=' + countylevel + '>' + objName.countyname + '</span>');
            } else {//判断三个
                $(".added_choose").hide();
                $('.added_map,.added_white').hide();
                queryprovincedata.getCityId();
                $(".infor_before_l #demo2").html('<span data-id='+obj.province_id+'>' + objName.cityname + '</span><span>-</span><span data-id='+obj.city_id+'>' + objName.countyname + '</span><span>-</span><span data-id=' + district + '>' + objName.districtname + '</span>')
            }
            obj.municipalObj = new IScroll('.county_warper');
        })
    },

    // 拉取所有省份信息
    pullprovincedata: function () {
        queryprovincedata.queryprovince(function (res) {
            var list = '';
            $.each(res, function (i, val) {
                list += '<li data-id="' + val.id + '">' + val.region_name + '<span></span></li>';
            });
            $(".province_class").append(list);
            queryprovincedata.provincesclick();
            obj.provinceObj = new IScroll('.province_warper');
        });
    },

    // 点击选择填写地区
    clickfillarea: function () {
        // 点击选择省区
        $(".added_choosefistrt").on('click', 'span', function () {
            $(".added_choosenth span").removeClass("added_teshu");
            $(".added_choosethree span").removeClass("added_teshu");
            $(".added_choose span").removeClass("added_teshu");
            $(this).addClass("added_teshu");
            $(".province_class").show();
            $(".municipal_class").hide();
            $(".county_class").hide();
            $(".province_warper").show();
            $(".municipal_warper").hide().find('ul li').remove();
            $(".county_warper").hide().find('ul li').remove();
            $(".added_choosenth span").remove();
            $(".added_choosethree span").remove();
            objName.countyname = "";
            objName.districtname = "";
            obj.provinceObj = new IScroll('.province_warper');
        });
        // 点击选择市级
        $(".added_choosenth").on('click', 'span', function () {
            $(".added_choosefistrt span").removeClass("added_teshu");
            $(".added_choosethree span").removeClass("added_teshu");
            $(".added_choose span").removeClass("added_teshu");
            $(this).addClass("added_teshu");
            $(".county_class").hide();
            $(".municipal_class").show();
            $(".province_class").hide();
            $(".province_warper").hide();
            $(".municipal_warper").show();
            $(".county_warper").hide();
            $(".added_choosethree span").remove();
            objName.districtname = "";
            obj.municipalObj = new IScroll('.municipal_warper');
        });
        // 点击选择县级
        $(".added_choosethree").on('click', 'span', function () {
            $(".added_choosefistrt span").removeClass("added_teshu");
            $(".added_choosenth span").removeClass("added_teshu");
            $(".added_choose span").removeClass("added_teshu");
            $(this).addClass("added_teshu");
            $(".county_class").show();
            $(".municipal_class").hide();
            $(".province_class").hide();
            $(".province_warper").hide();
            $(".municipal_warper").hide();
            $(".county_warper").show();
            obj.municipalObj = new IScroll('.county_warper');
        })
    },
    getCityId:function () {
        area_id = $(".city span").last().data('id');
        area_name = $(".city span").last().html();
        province_id = $(".city span").first().data('id');
        province_name = $(".city span").first().html();
        city_id = $(".city span:eq(1)").data('id');
        city_name = $(".city span:eq(1)").html();
        obj.province_id = province_id; //省
        obj.cityid = area_id;//县
        obj.city_id = city_id;//市
    },
    // 点击显示
    clickselect: function () {
        // $('.added_sex span').on('touchend', function () {
        //     $(this).addClass('icon-xuanze1 yellow').siblings().removeClass('icon-xuanze1 yellow');
        // });
        $('.infor_before_l').on('click','.area_x',function () {
            $('.added_map,.added_white').show();
            obj.provinceObj.refresh();
        });
        $('.added_map').on('click', function () {
            $('.added_map,.added_white').hide();
        });
        $('.suozaidiqu').on('click', function () {
            $('.added_map,.added_white').hide();
        });
    }

};
queryprovincedata.inits();

