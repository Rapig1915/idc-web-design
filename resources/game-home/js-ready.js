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
if(gData.common_params && gData.common_params.demo_game){
    $("#btn-demo").removeClass("d-none").addClass("d-flex");
    var idCG = gData.common_params.id_commercial_game || 0;
    var gCG = gamedata[idCG];
    if(gCG){
        $("#btn-commercial-game").removeClass("d-none");
        $("body").on("click", "#btn-commercial-game", () => {
            gCG.common_params.game_seo && window.open(`/${gCG.common_params.game_seo}`);
        })
    }
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

function setWishlistedState(wishlisted = false){
    var btn = $(".wishlist-btn");
    if(!wishlisted){
        $(btn).addClass("wishlist");
        $(btn).removeClass("wishlisted");
        $(btn).addClass("btn-outline-secondary");
        $(btn).removeClass("btn-secondary");
        $(btn).find("i").addClass("far");
        $(btn).find("i").removeClass("fas");
        $(btn).find("span").text("==(add_to_wishlist)==");
    }else{
        $(btn).addClass("wishlisted");
        $(btn).removeClass("wishlist");
        $(btn).addClass("btn-secondary");
        $(btn).removeClass("btn-outline-secondary");
        $(btn).find("i").addClass("fas");
        $(btn).find("i").removeClass("far");
        $(btn).find("span").text("==(on_wishlist)==");    
    }
}

function makeWishRequest(id_idcgame, id_dlc, crear, cbSuccess, cbError)
{
    var res = {};
	if (isCef() > 0 ) {
		var referer = 'LAUNCHER';
	}else{
		var referer = 'WEB-'+lastG+' ('+document.baseURI+')';;
	}
	$.ajax({
		type:"POST",
        url:"/unilogin/crearUserWishJuego.php",
		data: `token=${loadSession("token")}&iIDJuego=${id_idcgame}&iIDDlc=${id_dlc}&cReferer=${referer}&crear=${crear}`,
		dataType: 'text',
		async:false,
		error: function(objeto, quepaso, otroobj){
			lastE = quepaso;
			res = {
				"rc": 500,
				"txt": "KO",
				"data": {}
            };
            
            if(cbError) cbError(res, lastE)
		},
		success: function(json){
			res = JSON.parse(json);
			if (res.rc == 200){
                if(cbSuccess) cbSuccess(res);
			}else{
				res = {
					"rc": 404,
					"txt": "KO",
					"data": {}
                };
                if(cbError) cbError(res)
            }
		}
	});
}

$("body").on("click",".wishlist",function(){
    makeWishRequest(%%(id_idcgame)%%, '', true, 
        res => {
            console.log("Wishing game success: ", res);
            setWishlistedState(true);
        },
        res => {
            console.log("Wishing game fail: ", res);
        }
    );
})
$("body").on("click",".wishlisted",function(){
    makeWishRequest(%%(id_idcgame)%%, '', false,
        res => {
            console.log("Unwishing game success: ", res);
            setWishlistedState(false);
        },
        res => {
            console.log("Unwishing game fail: ", res);
        }
    );
})

// init whitelisted state
setWishlistedState(false);
loadUserWishGames(() => {
    var wishGames = JSON.parse(loadSession("wish_games") || "[]");
    for (i=0;i<wishGames.length;i++) {
        try {
            var idGame = wishGames[i].IDJUEGO;
            if(idGame === %%(id_idcgame)%%)
                setWishlistedState(true);
        }catch(e){
            // console.log("Error gamelist: "+i);
        }
    }
});
// hide shop
var ingame_shop_enabled = "__(ingame_shop_enabled)__".toLowerCase() == "yes";
if(!ingame_shop_enabled){
    $(".nav-item.nav-shop").addClass("d-none");
    $(".btnSquare2.square-shop").addClass("d-none");
}