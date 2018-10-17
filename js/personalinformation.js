/**
 * Created by Administrator on 2018/6/28.
 *  个人信息
 */
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
var queryprovincedata = {
    inits:function(){
        queryprovincedata.pullprovincedata();
        queryprovincedata.countyclick();
        queryprovincedata.districtlevelclick();
        queryprovincedata.clickfillarea();
        queryprovincedata.clickselect();
        queryprovincedata.saveinformation();
    },
    // 查询用户信息
    userinformation: function () {
        $.ajax({
            url: '/user/center',
            dataType: 'json',
            type: 'get',
            success: function (res) {
                if(res.code == '200'){
                    var wapprer = '';
                    var phones = '';
                    var vals = res.data;
                    wapprer+=
                        '<li>'+
                        '<span>生日</span>'+
                        '<input type="date" value="'+vals.birthday+'" placeholder="选择生日" class="birthday"  style="height: 2.26rem;padding: 0;border-bottom: 0.025rem solid #efefef;margin-top: 0.1rem;">'+
                        '<img src="/static/images/go.png" alt="" class="imgagesall">'+
                        '</li>'+
                        '<li>' +
                        '<span>城市</span>' +
                        '<p class="biaoqianp"><span class="tishiscont" style="color: #999;">请选择城市及区域</span></p>' +
                        '<img src="/static/images/go.png" alt="" class="imgagesall">' +
                        '</li>' +
                        '<li>' +
                        '<span>职业</span>' +
                        '<input type="text" value="'+vals.job+'"  class="jobconts" maxlength="15">' +
                        '</li>';
                    $(".essential_information").append(wapprer);
                    //判断性别
                    if(vals.sex == 0){
                        $("#add_informatian .sex_nvs").addClass('changecolor');
                        sex = 0;
                    }else if(vals.sex == 1){
                        $("#add_informatian .sex_mans").addClass('changecolor');
                        sex = 1;
                    }
                    //不能输入特殊字符
                    $(".jobconts").on('change',function(){
                        $(this).val($(this).val().replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,''));
                    });

                    //判断地址
                    $("#add_informatian").find('.biaoqianp').html('<span style="margin: 0;" data-id='+vals.province_id+'>'+vals.province+'</span><span class="henggangs">-</span><span data-id='+vals.city_id+'>'+vals.city+'</span>');
                    if(vals.province == ''){
                        $(".henggangs").hide();
                    }

                    // 头像
                    var imgs = '';
                    if(vals.img == ''){
                        imgs = '/static/images/about_us.png';
                    }else{
                        imgs = vals.img;
                    }
                    phones +='<img src="'+imgs+'" alt="" id="showImg">';
                    $(".headportrait").prepend(phones);

                    // 判断是微信还是手机登录
                    if(vals.auth_type == '2'){
                        $("#add_informatian .modifyimg").hide();
                    }

                    //用户ID
                    $(".user_ids").append('<input type="text" value="'+vals.id+'" class="userid" disabled>');
                    //昵称
                    $(".usernameconts").append('<input type="text" value="'+vals.user_name+'"  class="usernames" disabled>');
                }else if(res.code == '401'){
                    window.location.href = '/view/login';
                }
            },
            error: function () {
                bombboxhints('服务器出错');
            }
        });
        $("#add_informatian").on('click','.Sex_Icon',function () {
            $(this).addClass("changecolor").siblings().removeClass("changecolor");
            sex = $(this).attr('value');
        });

        // 上传头像
        $("#uploadImg").on('change',function () {
            if($(this).val() == ''){
                return false;
            }else{
                $(".submits").click();
            }
        });

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
            error: function () {
                bombboxhints('服务器出错');
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
                            $("#add_informatian .biaoqianp").html('<span>' + objName.cityname + '</span><span>-</span><span data-id=' + countylevel + '>' + objName.countyname + '</span>');
                        } else {//判断三个
                            queryprovincedata.getCityId();
                            $(".added_choose").hide();
                            $('.added_map,.added_white').hide();
                            $("#add_informatian .biaoqianp").html('<span>' + objName.cityname + '</span><span>-</span><span>' + objName.countyname + '</span><span>-</span><span data-id=' + district + '>' + objName.districtname + '</span>')
                        }

                    })
                }
            },
            error: function () {
                bombboxhints('服务器出错');
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
                        $("#add_informatian .biaoqianp").html('<span>' + objName.cityname + '</span><span>-</span><span data-id=' + countylevel + '>' + objName.countyname + '</span>');
                    } else {//判断三个
                        $(".added_choose").hide();
                        $('.added_map,.added_white').hide();
                        queryprovincedata.getCityId();
                        $("#add_informatian .biaoqianp").html('<span>' + objName.cityname + '</span><span>-</span><span>' + objName.countyname + '</span>')
                    }
                }
            },
            error: function () {
                bombboxhints('服务器出错');
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
                $("#add_informatian .biaoqianp").html('<span data-id='+obj.province_id+'>' + objName.cityname + '</span><span>-</span><span data-id=' + countylevel + '>' + objName.countyname + '</span>');
            } else {//判断三个
                $(".added_choose").hide();
                $('.added_map,.added_white').hide();
                queryprovincedata.getCityId();
                $("#add_informatian .biaoqianp").html('<span data-id='+obj.province_id+'>' + objName.cityname + '</span><span>-</span><span data-id='+obj.city_id+'>' + objName.countyname + '</span><span>-</span><span data-id=' + district + '>' + objName.districtname + '</span>')
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
        var id = $(".city span").last().data('id');
        var ids = $(".city span").first().data('id');
        var idnth = $(".city span:eq(1)").data('id');
        obj.province_id = ids; //省
        obj.cityid = id;//县
        obj.city_id = idnth;//市
    },
    // 点击显示
    clickselect: function () {
        // $('.added_sex span').on('touchend', function () {
        //     $(this).addClass('icon-xuanze1 yellow').siblings().removeClass('icon-xuanze1 yellow');
        // });
        $('#add_informatian').on('click','p',function () {
            $('.added_map,.added_white').show();
            obj.provinceObj.refresh();
        });
        $('.added_map').on('click', function () {
            $('.added_map,.added_white').hide();
        });
        $('.suozaidiqu').on('click', function () {
            $('.added_map,.added_white').hide();
        });
    },
    // 保存个人信息
    saveinformation:function () {
        $("#saveinformation").on('click',function () {
            if($("#add_informatian .userid").val() == ''){
                bombboxhints('且慢~请输入“用户ID”再走~');
            }else if($("#add_informatian .usernames").val() == ''){
                bombboxhints('且慢~请输入“昵称”再走~');
            }else if(!$("#add_informatian .Sex_Icon").hasClass('changecolor')){
                bombboxhints('嗷呜，主银请勾选您的性别啦~');
            }else if($("#add_informatian .birthday").val() ==''){
                bombboxhints('汪？您未选“生日”哟');
            }else if($("#add_informatian .cityall").html() == ''){
                bombboxhints('喵~要留“城市地址”哟~');
            }else if($("#add_informatian .jobconts").val() == ''){
                bombboxhints('嗷呜~要填写“职业”哟~');
            }else{
                $(".container_border").show();
                var userid = $("#add_informatian .userid").val(); //用户ID
                var username = $("#add_informatian .usernames").val(); //用户昵称
                var sexs = sex;//性别
                var birthday = $("#add_informatian .birthday").val(); //用户生日
                var jobconts = $("#add_informatian .jobconts").val(); //用户职业
                var provinceid = $("#add_informatian .biaoqianp").find('span:eq(0)').attr('data-id');//省ID
                var provincename = $("#add_informatian .biaoqianp").find('span:eq(0)').html();//省名称
                var cityid = $("#add_informatian .biaoqianp").find('span:eq(2)').attr('data-id');//市ID
                var cityname = $("#add_informatian .biaoqianp").find('span:eq(2)').html();//市名称
                var headportrait = $("#showImg").attr('src');//头像路径
                var data = {
                    user_name:username,
                    sex:sexs,
                    birthday:birthday,
                    job:jobconts,
                    province_id:provinceid,
                    province:provincename,
                    city_id:cityid,
                    city:cityname,
                    img:headportrait
                };
                setTimeout(function () {
                    $.ajax({
                        url: "/user/update",
                        type: "post",
                        async:false,
                        dataType: "json",
                        data:data,
                        success: function(res) {
                            $(".container_border").hide();
                            if(res.code == '200'){
                                bombboxhints('添加成功');
                                window.location.href = '/view/my_person';
                            }else if(res.code == '401'){
                                window.location.href = '/view/login';
                            }
                        },
                        error: function () {
                            bombboxhints('服务器出错');
                        }

                    });
                },100);
            }
        })
    }
};
queryprovincedata.inits();
queryprovincedata.userinformation();


// 上传头像获取url
$('#target').on('load',function(){
    var text=$(this).contents().find("body").text();
    var j=$.parseJSON(text);
    var conts = j.data.path;
    $("#showImg").attr('src',conts);
    if(conts == undefined){
        bombboxhints("瞄~亲，图片尺寸过大哦");
        $(this).prev().find('.showimgalls').attr('src',"/static/images/about_us.png");
    }else{
        $(this).prev().find('.showimgalls').attr('src',conts);
    }
});

/*$(function() {
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = { preset: 'date' };
    opt.datetime = { preset: 'datetime' };
    opt.time = { preset: 'time' };
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 100, //开始年份
        endYear: currYear + 100 //结束年份
    };
    $("#add_informatian #appDate").mobiscroll($.extend(opt['date'], opt['default']));

});*/
