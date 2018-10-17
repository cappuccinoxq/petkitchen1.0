/**
 * Created by Administrator on 2018/6/27.
 *  消息列表  jack
 *
 */
'use strict';
var systems = {
    initsall:function () {
        $(".container_border").show();
        setTimeout(function () {
            $.ajax({
                url: "/message",
                type: "get",
                dataType:"json",
                data:{},
                success:function(res){
                    console.log(res);
                    $(".container_border").hide();
                    if(res.code == '200'){
                        var warppers = '';
                        $.each(res.data, function (key, val) {
                            var img = '';
                            if(val.read_type == '0'){
                                img = '/static/images/red.png';
                            }else{
                                img = '/static/images/white.png'; 
                            }
                            warppers+='<div class="select_order_nv">'+
                                '<p class="time">'+val.create_at+'</p>' +
                                '<div class="txt" data-id = '+val.id+'>' +
                                '<p class="txt_t"><span class="txt_t_t">'+val.title+'</span><span class="txt_t_img"><img src='+img+'></span></p>' +
                                '<p class="txt_m">'+val.content+'</p>' +
                                '<p class="txt_p"><span>查看详情</span><img src="/static/images/go.png"/></p>' +
                                '</div>'+
                                '</div>';
                        });
                        $(".information_one").append(warppers);
                        //判断已读未读
                        // $.each(res.data, function (key, val) {
                        //     if(val.read_type == '0'){
                        //         $(".txt_t_img").show();
                        //     }else{
                        //         $(".txt_t_img").hide();
                        //     }
                        // });
                        //判断有没有消息
                        if(res.data == []){
                            $(".null_bg").show();
                            $(".container_border").hide();
                        }else{
                            $(".null_bg").hide();
                        }
                    }else if(res.code=='400'){
                        $(".null_bg").show();
                    }else if(res.code == '401'){
                        window.location.href='/view/login';
                    }
                },
                error:function () {
                    bombboxhints("服务器出错");
                }
            });

        },100)
        $(".information_one").on("click",".txt",function () {
            var message_id = $(this).attr("data-id");
            window.location.href="/view/message_datail/"+message_id;
        })
    }
};
systems.initsall();