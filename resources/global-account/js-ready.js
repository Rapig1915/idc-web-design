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
//Carousel of tooltip
$('.carousel-tooltip').slick({
	centerMode: false,
	slidesToShow: 1,
	autoplay: true,
	arrows: false,
	speed: 950,
	pauseOnHover: true,
	autoplaySpeed: 2000,
	fade: true,
	cssEase: 'linear'
  });
//Grid buttons in wishhlist
  $(".grid-square-tab").click(function(){
    $(".grid-rectangle-tab").removeClass("active");
    $(".grid-square-tab").addClass("active");
    $(".tab-content").find(".grid-square").addClass("d-block");
    $(".tab-content").find(".grid-square").removeClass("d-none");
    $(".tab-content").find(".grid-rectangle").removeClass("d-block");
    $(".tab-content").find(".grid-rectangle").addClass("d-none");
});
$(".grid-rectangle-tab").click(function(){
    $(".grid-square-tab").removeClass("active");
    $(".grid-rectangle-tab").addClass("active");
    $(".tab-content").find(".grid-rectangle").removeClass("d-none");
    $(".tab-content").find(".grid-rectangle").addClass("d-block");
    $(".tab-content").find(".grid-square").removeClass("d-block");
    $(".tab-content").find(".grid-square").addClass("d-none");
});
//Open-close filters in mobile
$("body").on("click",".open-filters",function(){
	$(this).removeClass("open-filters");
	$(this).addClass("close-filters");
	$(".parent-container").removeClass("closed-filters");
	$(".parent-container").addClass("opened-filters");
	$(".fa-chevron-left").removeClass("close-arrow");
	$(".fa-chevron-left").addClass("open-arrow");
});
$("body").on("click",".close-filters",function(){
	$(this).removeClass("close-filters");
	$(this).addClass("open-filters");
	$(".parent-container").removeClass("opened-filters");
	$(".parent-container").addClass("closed-filters");
	$(".fa-chevron-left").removeClass("open-arrow");
	$(".fa-chevron-left").addClass("close-arrow");
});

function setWishlistedState(btn, wishlisted = false){
	// var btn = $(`.wishlist-btn[data-play="${id_idcgame}"]`);
	if(!btn) return;

	if(!wishlisted){
		$(btn).addClass("wishlist");
		$(btn).removeClass("wishlisted");
		$(btn).addClass("btn-outline-primary");
		$(btn).removeClass("btn-primary");
		$(btn).find("i").addClass("far");
		$(btn).find("i").removeClass("fas");
		$(btn).attr({
			"title" : "==(add_to_wishlist)==",
			"data-original-title" : "==(add_to_wishlist)=="
		});
	}else{
		$(btn).addClass("wishlisted");
		$(btn).removeClass("wishlist");
		$(btn).addClass("btn-primary");
		$(btn).removeClass("btn-outline-primary");
		$(btn).find("i").addClass("fas");
		$(btn).find("i").removeClass("far");
		$(btn).attr({
			"title" : "==(on_wishlist)==",
			"data-original-title" : "==(on_wishlist)=="
		}); 
	}
}

$("body").on("click",".wishlist-btn",function(){
	var gameID = $(this).attr("data-play");
	if(!gameID) return;

	var bWannaWish = $(this).hasClass("wishlist");
	makeWishRequest(gameID, '', bWannaWish,
			res => {
					console.log(`Wishing game ${gameID} success: `, res);
					$(`.wishlist-btn[data-play="${gameID}"]`).each((k,btn) => setWishlistedState(btn, bWannaWish));
					loadUserWishGames(null);
			},
			res => {
					console.log(`Wishing game ${gameID} fail: `, res);
			}
	);
});

var ModalRemoveWishlist = new bootstrap.Modal(document.getElementById('removeFromWishlist'), {
	keyboard: false
  })

 $(document.body).on('click', '.remove-btn', function(e){
	ModalRemoveWishlist.show()
});

var ModalAddReview = new bootstrap.Modal(document.getElementById('addReview'), {
	keyboard: false
})

$(document.body).on('click', '.addReview-btn', function(e){

	var gameID = $(this).attr('id_idcgame');
	ModalAddReview.show()
});

/* == >>*/
function getAndCheckData(form) {
  // let text = form.comment.value;
  let text = $('#reviewTextArea').val();
  let vote;
  let error = 0, result = true;
  if(text.length < 1) error += 1;
  let [btn1HTML, btn1State] = getAttributeOfId(btnComment1, attrSel);
  let [btn2HTML, btn2State] = getAttributeOfId(btnComment2, attrSel);

  if(btn1State != 0) vote = 1;
  else if(btn2State != 0) vote = 2;
  else error += 2;

  if(error != 0) result = false;

  return [result, {
    text, vote, error
  }]
}

$(document.body).on('submit', '#formComment', function(e){

	e.preventDefault();
	let form = e.target;
	let [result, {text, vote, error}] = getAndCheckData(form);
	if(result) {
	  createComment(vote, text);
	}
	else {
	  if(error == 1 || error == 3){
	    $(form.comment).removeClass('colorLight').addClass("alert-danger").delay(1500).queue(function(){
	      $(this).addClass("colorLight");
	      $(this).removeClass("alert-danger").dequeue();
	    });
	  }
	  if(error >= 2){
	    $(`#${btnComment1}`).addClass("alert alert-danger").delay(1500).queue(function(){
	      $(this).removeClass("alert alert-danger").dequeue();
	    });
	    $(`#${btnComment2}`).addClass("alert alert-danger").delay(1500).queue(function(){
	      $(this).removeClass("alert alert-danger").dequeue();
	    });
	  }

	}
	return;
});

loadUserGames(() => {
	loadMyGames();						
});

loadUserWishGames(() => {
	loadMyWishGames();
});