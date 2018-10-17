
'use strict';
var order_id = location.href.split("apply_return_good/")[1];
var advice_return = {
    uploadimgs:function(x,y,j){
        // 上传头像
        $(x).on('change',function () {
            if($(this).val() == ''){
                return false;
            }else{
                $(j).click();
                $(this).prev().hide();
            }
        });
        // 上传头像获取url
        $(y).on('load',function(){
            var text=$(this).contents().find("body").text();
            var j=$.parseJSON(text);
            var conts = j.data.path;
            if(conts == undefined){
                bombboxhints("瞄~亲，图片尺寸过大哦");
                $(this).prev().find('.showimgalls').attr('src',"/static/images/camara.png");
            }else{
                $(this).prev().find('.showimgalls').attr('src',conts);
            }
        });
    },
    inites:function () {
        // 提交意见反馈
        $("#btn_tijiao").click(function () {
            var ques_choose = $(".choose option:selected").val();   //反馈类型
            var ques_con = $(".que_con").val();                      //反馈内容
            var name = $(".name").val();
            var tel = $(".tel").val();
            var urlall = '';
            var imgall = [];
            var phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            $(".upload").find('.showimgalls').each(function(){
                urlall = $(this).attr("src");
                imgall.push(urlall);
            });
            for(var i = 0; i < imgall.length; i++) {
                if(imgall[i] == "") {
                    imgall.splice(i,1);
                    i = i - 1;
                }
            }
            if(ques_choose==''){
                bombboxhints("瞄~亲请选择退货原因哦");
            }else if(ques_con==''){
                bombboxhints("瞄~亲请填写问题描述哦");
            }else if(name==''){
                bombboxhints("瞄~亲请填写联系人哦");
            }else if(tel==''){
                bombboxhints("瞄~亲请填写联系电话哦");
            }else if(!phone.test(tel)){
                bombboxhints("瞄~亲填写正确的电话哦");
            }else{
                var data = {
                    reason:ques_choose,
                    desc:ques_con,
                    contact_person:name,
                    contact:tel,
                    img:JSON.stringify(imgall)
                };
                $.ajax({
                    url: "/order/after_service/"+order_id,
                    type: "post",
                    dataType:"json",
                    data:data,
                    success:function(res){
                        console.log(res)
                        if(res.code == '200'){
                            bombboxhints("瞄~亲提交成功");
                            setTimeout(function () {  
                                window.location.href="/view/apply_success/"+res.data.id+"/"+order_id;
                            },1000);
                        }else if(res.code == '400'){
                            bombboxhints(res.message);
                        }else if(res.code == '401'){
                            window.location.href='/view/login';
                        }
                    },
                    error:function () {
                        bombboxhints("服务器出错");
                    }
                });
            }
        })
    }
};
advice_return.inites();
advice_return.uploadimgs('#uploadimgs','#target','#submits');
advice_return.uploadimgs('#uploadimgstwo','#targettwo','#submitstwo');
advice_return.uploadimgs('#uploadimgsthree','#targetthree','#submitsthree');
advice_return.uploadimgs('#uploadimgsfour','#targetfour','#submitsfour');
advice_return.uploadimgs('#uploadimgsfive','#targetfive','#submitsfive');
advice_return.uploadimgs('#uploadimgssix','#targetsix','#submitssix');
