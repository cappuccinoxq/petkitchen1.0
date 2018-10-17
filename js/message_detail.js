var id = location.href.split("message_datail/")[1];  
console.log(id);
$.ajax({
    url: "/readmess/"+id,
    type: "get",
    dataType:"json",
    data:{},
    success:function(res){
        console.log(res);
        $(".container_border").hide();
        if(res.code == '200'){
            if(res.data==''){
                $(".null_bg").show();
            }else{
                var wapper = '';
                wapper += '<p class="tit">'+res.data.title+'</p>'+
                    '<p class="time">'+res.data.create_at+'</p>'+
                    '<p class="content">'+res.data.content+'</p>'
                $(".information_one").html(wapper);
            }

        }else if(res.code == '401'){
            window.location.href='/view/login';
        }
    },
    error:function () {
        bombboxhints("服务器出错");
    }
});