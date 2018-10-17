$(document).ready(function () {
    $(".choose").click(function(){
        $(".choose option[value='']").css("display","none");
    });
    $(".que_con").click(function () {
        $(".que_con").html("");
    });


    var ques_choose = $(".choose option:selected").val();   //退货原因
    var ques_con = $(".que_con").html();                      //问题描述
    var name = $(".name").val();                              //联系人
    var tel = $(".tel").val();                                //联系电话
    $("#btn_tijiao").click(function () {
         if(ques_choose==''){
             bombboxhints("瞄~，亲选择退货原因哦");
         }else if(ques_con==''){
             bombboxhints("瞄~，亲填写退货原因哦");
         }else if(name==''){
             bombboxhints("瞄~，亲留下联系人姓名哦");
         }else if(tel==''){
             bombboxhints("瞄~，亲留下联系电话哦");
         }else{
             window.location.href="/view/apply_success.html";
         }
    })
})