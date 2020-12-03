setTimeout(function() {
    $("#main").show();
    $("footer").show();
    if ( typeof(AOS) == "object" ){
       AOS.init({
          disable: 'mobile' //disable the animation on mobile
       });
    }
},250);

$(window).scroll(function() {
	if (!isScrolling) {
		runFunctions();
	}
	if ($("#menu").offset().top > 600) {
	   whiteMenu();
	} else {
	   blackMenu();
	}
});

$("body").on( "click", ".videohide", function() {
  $(".videoshow").removeClass("d-none");
  $(".videohide").fadeOut();
  var video = $('video')[0];
  video.load();
  video.play();
});

$('.videoModal').on('hide.bs.modal', function(e) {    
    var $if = $(e.delegateTarget).find('iframe');
    var src = $if.attr("src");
    $if.attr("src", '/empty.html');
    $if.attr("src", src);
});
$('[data-toggle="tooltip"]').tooltip({
    delay: {
        show: 800,
        hide: 0,
    }
});
$("body").on( "click", ".setModal", function() {
	var index = $(this).attr("data-index");
	var tipo = $(this).attr("data-section");
	var target = $(this).attr("data-target");
	doModal(index, tipo, target);
});

if( $(".progressItem").length > 0 ) {
 timeout = setInterval(function(){ actTime(); }, 1000);
}

var gData = gamedata[%%(id_idcgame)%%];
var gPrice = getGamePrice(gData);
var dataset = makeDatasetForGame(gData) || [];
var sGame = getGameStatus(gData);
dataset.push({ cls: ".btn-free-to-play", hide: true });
// if(gPrice > 0 && gameStatus[thisStatus].purchasable == 1){
if(sGame && sGame.purchasable){
    dataset.push({ cls: "#btn-cta", hide: true });
}else{
    dataset.push({ cls: "#btn-cta-shopping", hide: true });
}

if(sGame && sGame.playable){ // playable check : production && (f2p playable || p2p bought)
    $(".controlGame").text("==(play_now_txt)==");
    $(".controlGame").addClass("playGame");
}else if(sGame){
    var text = gameStatus[thisStatus].name;
    $(".controlGame").text(text);
}else{
    $(".controlGame").text("Null");
}

setObjectValues($("#main .game-block"), dataset);

$("body").on("click",".cart-btn",function(){
    // $(this).closest(".game-card-rectangular").find(".inCart").addClass("d-block");
    // $(this).closest(".game-card-rectangular").find(".soon").removeClass("d-block");
    // $(this).closest(".card").find(".inCart").addClass("d-block");
    // $(this).closest(".card").find(".soon").removeClass("d-block");

    if(typeof(putGameInBasket) == "function")
    {
        putGameInBasket($(this).attr("data-play"));
    }
})

$("body").on("click",".wishlist",function(){
    $(this).addClass("wishlisted");
    $(this).removeClass("wishlist");
    $(this).addClass("btn-secondary");
    $(this).removeClass("btn-outline-secondary");
    $(this).find("i").addClass("fas");
    $(this).find("i").removeClass("far");
    $(this).find("span").text("On wishlist");

})
$("body").on("click",".wishlisted",function(){
    $(this).addClass("wishlist");
    $(this).removeClass("wishlisted");
    $(this).addClass("btn-outline-secondary");
    $(this).removeClass("btn-secondary");
    $(this).find("i").addClass("far");
    $(this).find("i").removeClass("fas");
    $(this).find("span").text("Add to your wishlist");
})

// hide shop
var ingame_shop_enabled = "__(ingame_shop_enabled)__".toLowerCase() == "yes";
if(!ingame_shop_enabled){
    $(".nav-item.nav-shop").addClass("d-none");
    $(".btnSquare2.square-shop").addClass("d-none");
}