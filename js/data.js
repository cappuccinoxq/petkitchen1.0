/**
 * Created by Administrator on 2018/6/27.
 *  普通定制数据  jack
 *
 */
'use strict';
var commondata = {
    inits:function(){
        commondata.queryinformation();
    },
    // 调取宠物猫信息数据
    queryinformation:function () {
        // 调取宠物猫种类
        $.ajax({
            url: "/pet/type/1",
            type: "get",
            async:false,
            dataType: "json",
            success: function(res) {
                var arrays = res.data;
                var list = '';
                $.each(arrays, function (key, val) {
                    list += '<li data-id='+val.id+'>'+val.varieties+'</li>';
                });
                $("#petcatinformation .petinformations").append(list);
            },
            error: function (res) {
                console.log(res);
            }
        });
        // 调取宠物狗种类
        $.ajax({
            url: "/pet/type/2",
            type: "get",
            async:false,
            dataType: "json",
            success: function(res) {
                var arrays = res.data;
                var list = '';
                $.each(arrays, function (key, val) {
                    list += '<li data-id='+val.id+'>'+val.varieties+'</li>';
                });
                $("#Petdoginformation .petinformations").append(list);
            },
            error: function (res) {
                console.log(res);
            }
        });
        // 调取宠物猫品牌
        $.ajax({
            url: "/food/brand",
            type: "get",
            async:false,
            dataType: "json",
            success: function(res) {
                var arrays = res.data;
                var list = '';
                $.each(arrays, function (key, val) {
                    list += '<div value='+val.id+' class="cyclic_datas">'+val.common_brand+'</div>';
                });
                $("#petcatinformation .brandEating").append(list);
                $("#Petdoginformation .brandEating").append(list);
            },
            error: function (res) {
                console.log(res);
            }
        });
        // 调取宠物信息名称
        $.ajax({
            url: "/pet/all",
            type: "get",
            async:false,
            dataType: "json",
            success: function(res) {
                var arrays = res.data;
                var list = '';
                $.each(arrays, function (key, val) {
                    list += '<li value="'+key+'"  class="newpetinforsmation">'+val+'</li>';
                });
                $("#New_master").append(list);
            },
            error: function (res) {
                console.log(res);
            }
        });
    },
    // 编辑信息 ajax
    eidt_types:function(pet_type){
        // 调取宠物猫狗种类
        $.ajax({
            url: "/pet/type/"+pet_type,
            type: "get",
            async:false,
            dataType: "json",
            success: function(res) {
                var arrays = res.data;
                var list = '';
                $.each(arrays, function (key, val) {
                    list += '<li data-id='+val.id+'>'+val.varieties+'</li>';
                });
                $("#apprers .petinformations").append(list);
            },
            error: function (res) {
                console.log(res);
            }
        });
    },
};
commondata.inits();
