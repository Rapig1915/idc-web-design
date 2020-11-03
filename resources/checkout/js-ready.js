initOrderItems();
loadPaymentMethods();

$("body").on("click", ".btn-proceed-payment", loadUserAndProceed);