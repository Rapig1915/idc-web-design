$("body").on( "click", ".runLogIn", function() {
	loadUserData();
});
$("body").on("click",".submit_pass",function(){
if( $("#newPassword").val() != $("#newPasswordRepeat").val() ){
	$("#password_not_match").removeClass("d-none");
}else{
	var code = {};
	code["actual"] = $("#actualPassword").val();
	code["newp"] = $("#newPassword").val();
	changePass(code);
}
});
$("body").on("click",".submit_codep",function(){
var code = $("#verifyPassword").val();
confirmPass(code);
});

$("body").on("click",".submit_mail",function(){
var mail = $("#inputEmail").val();
sendMail(mail);
});
$("body").on("click",".submit_mailn",function(){
var mail = $("#inputEmailNew").val();
sendMailN(mail);
});
$("body").on("click",".submit_code",function(){
var code = $("#verifyEmail").val();
confirmMail(code);
});

$("body").on("click",".togglepass",function(){
if( $(".fa-eye").length > 0 ){
	$(".fa-eye").addClass("fa-eye-slash");
	$(".fa-eye").removeClass("fa-eye");
	$(".passinput").attr("type","text");
}else{
	$(".fa-eye-slash").addClass("fa-eye");
	$(".fa-eye-slash").removeClass("fa-eye-slash");
	$(".passinput").attr("type","password");
}
});
/*
$("body").on( "click", ".btn-social", function() {
$(".socialerror").addClass("d-none");
});
*/
$("body").on( "click", ".unsocial", function() {
var data = $(this).attr("data-id");
removeSocial(data);
});
$("body").on( "click", "#chargeMoney", function() {
$(".modalCharge").find("iframe").attr("src",'https://www.idcgames.com/createWoloTrans.php?idUsuarioIDC='+loadSession("id")+'&idioma='+language+'&game_id=0&gamerLevel=3');
});
$("body").on( "click", "#redeemCode", function() {
redeemCode();
});
$("body").on( "click", ".setModal", function() {
var index = $(this).attr("data-index");
var game = $(this).attr("data-game");
var target = $(this).attr("data-target");
doModal(index, game, target);
});
$('.rechargeModal').on('hide.bs.modal', function(e) {    
setTimeout(function(){ loadUserData(); }, 1500);
});