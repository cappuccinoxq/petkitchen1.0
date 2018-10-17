/**
 * Created by Administrator on 2018/6/27.
 *  修改收货地址  jack
 *
 */
'use strict';
function bombboxhints(res) {
    $('.promptbox').html(res);
    $('.warpperts').fadeIn();
    setTimeout(function() {
        $(".warpperts").fadeOut();
    }, 2000);
}
var province_id = '';   //省id
var  city_id = '';      //市id
var  area_id = '';      //区域id
var  province_name = '';
var  city_name = '';
var  area_name = '';
var addressee = '';
var telephone = '';
var address = '';
var addresss = location.href;
var addddd_id = addresss.split("address/")[1].split("/")[0];
var add_id = addresss.split("address/")[1].split("/")[1];
var id = '';
// 获取修改信息
var modify = {
    init:function () {
        //获取到地址详情

        $.ajax({
            url: "/address/info/"+addddd_id,
            type: "get",
            async:false,
            dataType: "json",
            success: function(res) {
                console.log(res);
                addressee = res.data.addressee;
                telephone = res.data.telephone;
                address = res.data.address;
                city_name = res.data.city_name;
                province_name = res.data.province_name;
                area_name = res.data.area_name;
                var default_address = res.data.default_address;
                province_id = res.data.province_id;
                city_id = res.data.city_id;
                area_id = res.data.area_id;
                $("#ipt").attr("value", addressee);
                $("#ipu").attr("value",telephone);
                $($("#demo2")).html(province_name+city_name+area_name);
                $("#demo_di").attr("value",address);
                if(default_address==1){
                    $("input[type='checkbox']").attr('checked',"true");
                }else if(default_address==2){
                    $("input[type='checkbox']").attr('checked',"false");
                }

            },
            error: function (res) {
                console.log(res);
            }

        });
        //判断点击默认(设为)地址的传过来的数据
        $(".submit_save").click(function() {
            var val=$("input[type='checkbox']").is(':checked');
            var name = $("#ipt").val();
            var names = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z_]){1,20}$/;
            var phone = $("#ipu").val();
            var phones = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            var verificationcode = $("#demo2").html();
            var passwords = $("#demo_di").val();
            if(name == ''||!names.test(name)){
                bombboxhints('且慢~请输入“收件人”再走~');
            }else if(phone == ''||!phones.test(phone)){
                bombboxhints('嗷呜，主银请留下电话啦~');
            }else if(verificationcode == ''){
                bombboxhints('汪？您未选“地区”哟');
            }else if(passwords ==''){
                bombboxhints('喵~要留“详细地址”哟~');
            }else{
                var name = $("#ipt").val();     //收货人姓名
                var phone = $("#ipu").val();     //手机号
                // var region = $("#demo2").val();
                var address = $("#demo_di").val();
                //是否设为默认
                if(val==true){  //设为默认 ---调两次接口
                    $.ajax({
                        url: "/address",
                        type: "post",
                        async:false,
                        dataType: "json",
                        data:{
                            "addressee":name,
                            "telephone":phone,
                            "province_id":province_id,
                            "province_name":province_name,
                            "city_id":city_id,
                            "city_name":city_name,
                            "area_id":area_id,
                            "area_name":area_name,
                            "address":address,
                            "id":addddd_id
                        },
                        success: function(res) {
                            console.log(res);
                            id = res.data.id;
                        },
                        error: function (res) {
                            console.log(res);
                        }
                    });
                    setTimeout(function () {
                        $.ajax({
                            url: "/address/setdefault/"+id,
                            type: "get",
                            async:false,
                            dataType: "json",
                            success: function(res) {
                                if(res.code=="200"){
                                    bombboxhints('编辑成功');
                                    window.location.replace(document.referrer);
                                }else if(res.code=="401"){
                                    window.location.href="/view/login.html";
                                }
                            },
                            error: function (res) {
                                bombboxhints('网络超时');
                            }

                        });
                    },500)

                }else if(val==false){   //未设为默认  --调一次接口
                    $.ajax({
                        url: "/address",
                        type: "post",
                        async:false,
                        dataType: "json",
                        data:{
                            "addressee":name,
                            "telephone":phone,
                            "province_id":province_id,
                            "province_name":province_name,
                            "city_id":city_id,
                            "city_name":city_name,
                            "area_id":area_id,
                            "area_name":area_name,
                            "address":address,
                            "id":addddd_id
                        },
                        success: function(res) {
                            if(res.code=="200"){
                                bombboxhints('编辑成功');
                                window.location.replace(document.referrer);
                            }else if(res.code=="401"){
                                window.location.href="/view/login.html";
                            }
                        },
                        error: function (res) {
                            bombboxhints('网络超时');
                        }
                    });
                }
            }
        });
    }
};
//返回
$(".back_btn").click(function () {
    window.location.replace(document.referrer);
})
//点击复选框的样式
$(".choose_moren").click(function () {
    $(".choose_moren").toggleClass("choose_moren_cho");
})
modify.init();
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
                            $(".member_gl #demo2").html('<span>' + objName.cityname + '</span><span>-</span><span data-id=' + countylevel + '>' + objName.countyname + '</span>');
                        } else {//判断三个
                            queryprovincedata.getCityId();
                            $(".added_choose").hide();
                            $('.added_map,.added_white').hide();
                            $(".member_gl #demo2").html('<span>' + objName.cityname + '</span><span>-</span><span>' + objName.countyname + '</span><span>-</span><span data-id=' + district + '>' + objName.districtname + '</span>')
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
                        $(".member_gl #demo2").html('<span>' + objName.cityname + '</span><span>-</span><span data-id=' + countylevel + '>' + objName.countyname + '</span>');
                    } else {//判断三个
                        $(".added_choose").hide();
                        $('.added_map,.added_white').hide();
                        queryprovincedata.getCityId();
                        $(".member_gl #demo2").html('<span>' + objName.cityname + '</span><span>-</span><span>' + objName.countyname + '</span>')
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
                $(".member_gl #demo2").html('<span data-id='+obj.province_id+'>' + objName.cityname + '</span><span>-</span><span data-id=' + countylevel + '>' + objName.countyname + '</span>');
            } else {//判断三个
                $(".added_choose").hide();
                $('.added_map,.added_white').hide();
                queryprovincedata.getCityId();
                $(".member_gl #demo2").html('<span data-id='+obj.province_id+'>' + objName.cityname + '</span><span>-</span><span data-id='+obj.city_id+'>' + objName.countyname + '</span><span>-</span><span data-id=' + district + '>' + objName.districtname + '</span>')
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
        $('.member_gl').on('click','.area_x',function () {
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

