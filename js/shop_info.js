/**
 * Created by Administrator on 2018/8/16.
 *  商品详情  jack
 *
 */
'use strict';
// 轮播图
var swiper = new Swiper('.swiper-container', {
    loop : true,
    autoplay:2000,
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
});
var ordrs = location.href;
var petids = ordrs.split("shop_info/")[1];
var petid = petids.split('/')[0];//口味ID
var price = petids.split('/')[1];//钱数
var pay_types = petids.split('/')[2];//钱数
var flavor = '';//口味
var imgs = '';//产品详情图
var commoditydetails = {
    conts:function () {
         // 狗(鸡肉)
         if(petid == '3'){
             flavor = '鸡肉味';
             imgs = '/static/images/dog_j.jpg';
         }else if(petid == '8'){
             flavor = '猪肉味';
             imgs = '/static/images/dog_z.jpg';
         }else if(petid == '9'){
             flavor = '牛肉味';
             imgs = '/static/images/dog_n.jpg';
         }else if(petid == '10'){
             flavor = '鸡肉味';
             imgs = '/static/images/cat_j.jpg';
         }else if(petid == '11'){
             flavor = '猪肉味';
             imgs = '/static/images/cat_z.jpg';
         }else if(petid == '6'){
             flavor = '牛肉味';
             imgs = '/static/images/cat_n.jpg';
         }
         if(pay_types == '1'){
             if(petid == '15'){
                 flavor = '猪肉味';
                 imgs = '/static/images/cat_z.jpg';
             }else if(petid == '18'){
                 flavor = '牛肉味';
                 imgs = '/static/images/cat_n.jpg';
             }else if(petid == '19'){
                 flavor = '鸡肉味';
                 imgs = '/static/images/cat_j.jpg';
             }
         }else{
             if(petid == '15'){
                 flavor = '猪肉味';
                 imgs = '/static/images/dog_z.jpg';
             }else if(petid == '18'){
                 flavor = '牛肉味';
                 imgs = '/static/images/dog_n.jpg';
             }else if(petid == '19'){
                 flavor = '鸡肉味';
                 imgs = '/static/images/dog_j.jpg';
             }
         }
         var wapper = '';
         wapper+='<p class="name">壹爱厨房的定制食谱</p>' +
             '<p class="txt"><span class="money">￥'+Number(price/100)+'/g</span><span class="taste">'+flavor+'</span></p>' +
             '<p class="wuliu"><span>运费：</span><span>免运费</span></p>' +
             '<img class="taste_img" src="'+imgs+'">';
         $(".content").append(wapper);
    }
};
commoditydetails.conts();
