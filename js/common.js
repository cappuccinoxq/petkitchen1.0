/**
 * Created by Administrator on 2018/6/27.
 *  公共JS  jack
 *
 */
'use strict';
onresize = function() {
    document.documentElement.style.fontSize = innerWidth / 16 + 'px';
};
document.documentElement.style.fontSize = innerWidth / 16 + 'px';
// 弹框提示信息
function bombboxhints(res) {
    $('.promptbox').html(res);
    $('.promptbox').fadeIn();
    setTimeout(function() {
        $(".promptbox").fadeOut();
    }, 2000);
}
$(function() {
    //阻止移动端点击事件延迟
    FastClick.attach(document.body);
});