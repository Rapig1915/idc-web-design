initOrderItems();
loadPaymentMethods();

$("body").on("click", ".btn-proceed-payment", loadUserAndProceed);

$("body").on("click", ".custom-control-input", onSelectPaymethod);