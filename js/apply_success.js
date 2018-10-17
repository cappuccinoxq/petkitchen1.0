
var order_id = location.href.split("apply_success/")[1].split("/")[1];
var id = location.href.split("apply_success/")[1].split("/")[0];
console.log(order_id);
console.log(id);
$("#btn").click(function () {
    window.location.href="/view/record_detail/"+id+"/"+order_id;
})