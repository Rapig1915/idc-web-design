initOrderItems();
loadPaymentMethods();

$("body").on("click", ".btn-proceed-payment", loadUserAndProceed);

$("body").on("click", ".custom-control-input", onSelectPaymethod);

$("body").on("shown.bs.modal", ".modal-input-coupon", function(){
  $("#messageCouponCheck").text("").addClass("d-none");
  $("#inputCouponCode").val('').trigger('focus');
})

$("body").on("click", ".submit-coupon", function(){
  var code = $("#inputCouponCode").val();
  if(!code){
    $("#inputCouponCode").trigger('focus');
    $("#messageCouponCheck").text("Input valid code.").removeClass("d-none");
  }
  else{
    $.ajax({
      type:"GET",
      url:"https://admin.idcgames.com/api/pay2play/coupon",
      data: `service_type=2&id_idcuser=${loadSession('id')}&code=${code}`,
      dataType: 'text',
      async:true,
      success: function(json){
          var result = JSON.parse(json);
          if(applyCouponInBasket(result)){

            ////////////////////////////////////
            var cloneCouponBlock = $(".coupon-block.clone");
            var newCouponBlock = cloneCouponBlock.clone().removeClass("hidden").removeClass("clone");
            var dataset = [
                { cls: ".coupon-name", text: result.name },
            ];
    
            newCouponBlock = setObjectValues(newCouponBlock, dataset, true);
            $(newCouponBlock).attr("coupon_id", result.coupon_id).insertAfter(cloneCouponBlock);

            ////////////////////////////////////
          }

          console.log("Coupon check success: ", code, result);

          $(".modal-input-coupon").modal("hide");
      },
      error: function(err){  
          console.log("Error validating coupon: ", code, err.responseText || "Unknown error");
          var errMsg = 'Error occured while validating coupon.';
          try{
            errMsg = JSON.parse(err.responseText).message;
          }catch(e){}
          $("#inputCouponCode").trigger('focus');
          $("#messageCouponCheck").text(errMsg).removeClass("d-none");
      }
    });
  }
})

$("body").on("click", ".btn-remove-coupon", function(){
  var couponBlock = $(this).parent();
  var coupon_id = $(couponBlock).attr("coupon_id")*1;
  if(!coupon_id) return;

  if(confirm("Do you really want to unapply this coupon?")){
    $(couponBlock).remove();
    removeCouponInBasket(coupon_id);
  }
})

// Init coupons in basket
var basketInfo = readBasketInfo();
basketInfo.coupons.map(coupon_id => {
  var result = basketInfo.coupon_data[coupon_id];
  if(!result) return;

  var cloneCouponBlock = $(".coupon-block.clone");
  var newCouponBlock = cloneCouponBlock.clone().removeClass("hidden").removeClass("clone");
  var dataset = [
      { cls: ".coupon-name", text: result.name },
  ];

  newCouponBlock = setObjectValues(newCouponBlock, dataset, true);
  $(newCouponBlock).attr("coupon_id", result.coupon_id).insertAfter(cloneCouponBlock);
})