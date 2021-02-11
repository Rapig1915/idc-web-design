//Tooltip
 $('[data-toggle="tooltip"]').tooltip();
 //Scroll top button
 $("a[href='#top']").click(function() {
     $("html, body").animate({ scrollTop: 0 }, "slow");
     scriptScrollPlay();
     return false;
 });
 $(window).scroll(function(){
     if ($(this).scrollTop() > 200) {
         $('.btn-scroll-to-top').fadeIn();  
     } else {
         $('.btn-scroll-to-top').fadeOut();
     }
 });

const getShuffledArr = arr => {
	const newArr = arr.slice()
	for (let i = newArr.length - 1; i > 0; i--) {
			const rand = Math.floor(Math.random() * (i + 1));
			[newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
	}
	return newArr
};

$("body").on("click",".cart-btn",function(){
	
	if(typeof(putGameInBasket) == "function" && putGameInBasket($(this).attr("id_idcgame")))
	{
		$(this).closest(".game-card-rectangular").find(".inCart").addClass("d-block");
		$(this).closest(".game-card-rectangular").find(".soon").removeClass("d-block");
		$(this).closest(".game-card-rectangular").find(".demoBadge").removeClass("d-block");
		$(this).closest(".card").find(".inCart").addClass("d-block");
		$(this).closest(".card").find(".soon").removeClass("d-block");
		$(this).closest(".card").find(".demoBadge").removeClass("d-block");
	}
});

$("body").on("click",".btn-show-more",function(){
	// if($(this).hasClass("btn-show-more-discovered"))
	// {
	// 	initDiscoveredGames($(this).attr("type"));
	// }
	// go to search page with type
	var tab = $(this).attr("type") || "";
	window.open(`/search?tab=${tab}`, "_blank");
});

//Carousel top
$("body").on('init',"#sliderhome",function(){
    $(".slick-current").find(".animatable").addClass("fadeInLeft");
    $(".slick-current").find(".animatable-custom-left").addClass("slideInLeftCustom");
    $(".slick-current").find(".animatable-custom-right").addClass("slideInRightCustom");
    $(".slick-current").find(".animatable-right").addClass("fadeInRight");
});

//<!-- slick carousel -->
$('.carousel-top-category').slick({
	centerMode: false,
	centerPadding: '10%',
	slidesToShow: 1,
	autoplay: true,
	arrows: true,
	speed: 950,
	pauseOnHover: true,
	autoplaySpeed: 8000,
	responsive: [
		{
		breakpoint: 1199.98,
		settings: {
			arrows: false
		}
		}
	]
  });

$("body").on("afterChange","#sliderhome",function(){
    $(".slick-current").find(".animatable").addClass("fadeInLeft");
    $(".slick-current").find(".animatable-custom-left").addClass("slideInLeftCustom");
    $(".slick-current").find(".animatable-custom-right").addClass("slideInRightCustom");
    $(".slick-current").find(".animatable-right").addClass("fadeInRight");
});
$("body").on("beforeChange","#sliderhome",function(){
    $(".slick-current").find(".animatable").removeClass("fadeInLeft");
    $(".slick-current").find(".animatable-custom-left").removeClass("slideInLeftCustom");
    $(".slick-current").find(".animatable-custom-right").removeClass("slideInRightCustom");
    $(".slick-current").find(".animatable-right").removeClass("fadeInRight");
});



activateSlick($('.carouselRecommended'));
activateSlick($('.carouselNews'));


// Init functions
var topSliderInited = false;
function initTopSlider(max_games=10){
	if(topSliderInited)
		return;
	
	if(!topgames || !topgames_panel) return;

	topSliderInited = true;
		
	var gameList = [];
	var datasources = [
		topgames && topgames.topLogin, 
		topgames && topgames.topCcu, 
		topgames_panel && topgames_panel["bestselling"], 
		topgames_panel && topgames_panel["new"], 
		topgames_panel && topgames_panel["upcoming"], 
	];

	var max_try = 5;
	while(gameList.length < max_games && max_try-->0){
		for(var i = 0; i < datasources.length; i ++){
			var picks = getShuffledArr(gameList.length<max_games/2 ? datasources[i].slice(0,2) : datasources[i].slice(2,5));
			var id = picks.length>0 ? picks[0] : 0;
			(id && !gameList.includes(id)) && gameList.push(id);
		}
	}

	console.log("top slider games: ", gameList);

	for(var i = 0; i < gameList.length; i ++){
		var gameID = gameList[i];

		var newGameBlock = $(`#sliderhome .carousel-item.item-${i+1}`);

		// make dataset and display		
		newGameBlock = setObjectValues(newGameBlock, makeDatasetForGame(gamedata[gameID]));
	}
	for(; i <max_games; i ++){
		$(`#sliderhome .carousel-item.item-${i+1}`).remove();
	}

	$("section").removeClass("hidden")
}

function initFeaturedGames(max_games = 20)
{
	var nMaxFeatured = 4;

	if(topgames_panel && !!topgames_panel.featured){

		const data = getShuffledArr(topgames_panel.featured);

		for(var i = 0; i < data.length && i < max_games; i ++){
			if(i >= nMaxFeatured)
				break;

			var gameID = data[i];
			var gData = gamedata[gameID];

			setObjectValues($(`#featured .small-card.featured-${i+1}`), makeDatasetForGame(gData, { ratio: '1x1', size: '1-8', quality: 0, format: 'webp' }, { ratio: '1x1', size: '1-8', quality: 0, format: 'webp' }));
		}
	}
}

function initDiscoveredGames(type /* bestselling/new/upcoming/demo */, max_games = 8)
{
	if(type !== "bestselling" && type !== "new" && type !== "upcoming" && type !== "demo")
		return;

	var objGameContainer = $(`.discovered-${type}-container`);
	//objGameContainer.find(".game-block.discovered").remove();

	var buttonShowMore = $(objGameContainer).find(`.discovered-${type}-show-more`);

	var nDisplayedGames = parseInt($(buttonShowMore).attr("n_displayed") || "0");
	var nDisplayStep = 10;

	if(topgames_panel[type] && !!topgames_panel[type] && nDisplayedGames < topgames_panel[type].length){
		for(var i = nDisplayedGames; i < topgames_panel[type].length && i < nDisplayedGames + nDisplayStep && i < max_games; i ++){
			var gameID = topgames_panel[type][i];

			if(!gamedata[gameID]) continue;

			var newGameBlock = $(".game-block.discovered.clone").clone().removeClass("hidden").removeClass("clone");

			// make dataset and display		
			newGameBlock = setObjectValues(newGameBlock, makeDatasetForGame(gamedata[gameID]));

			// add it
			$(newGameBlock).insertBefore(buttonShowMore);
		}

		nDisplayedGames += nDisplayStep;
		if(nDisplayedGames > topgames_panel[type].length)
			nDisplayedGames = topgames_panel[type].length;

		$(buttonShowMore).attr("n_displayed", nDisplayedGames);
		// if(nDisplayedGames >= topgames_panel[type].length)
		// 	$(buttonShowMore).addClass("hidden");
	}
}

function initRecommendedGames(max_games = 20)
{
	var gameCountPerPage = 6;
	var objGameContainer = $('.carouselRecommended');
	controlSlick(objGameContainer, 'unslick');
	objGameContainer.find(".carousel-page.remmended").remove();

	if(topgames && !!topgames.topCcu){
		var pageNumber = 0;
		var gameCountInCurrentPage = 0;
		
		var objCurrentPage = null;
		
		for(var i = 0; i < topgames.topCcu.length && i < max_games; i ++){
			var gameID = topgames.topCcu[i];
			var gameStatus = gamedata && gamedata[gameID] && gamedata[gameID].common_params && gamedata[gameID].common_params.game_status;
			if(!gameStatus || gameStatus === "developing" || gameStatus === "inactive")
				continue;

			// check Caresol block
			if(gameCountInCurrentPage >= gameCountPerPage || pageNumber <= 0){
				pageNumber ++;
				gameCountInCurrentPage = 0;
				objCurrentPage = $(".carousel-page.recommended.clone").clone().removeClass("hidden").removeClass("clone").addClass(`page-${pageNumber}`);
				objCurrentPage = $(objCurrentPage).appendTo(objGameContainer);
			}

			var newGameBlock = $(".game-block.recommended.clone").clone().removeClass("hidden").removeClass("clone");

			// make dataset and display
			newGameBlock = setObjectValues(newGameBlock, makeDatasetForGame(gamedata[gameID]));

			// add it
			$(newGameBlock).appendTo(objCurrentPage);
			gameCountInCurrentPage ++;
		}

		activateSlick(objGameContainer);
	}
}


function initNews()
{
	var newsCountPerPage = 2;
	var objGameContainer = $('.carouselNews');
	controlSlick(objGameContainer, 'unslick');
	objGameContainer.find(".carousel-page.news").remove();

	if(all_news && !!all_news.global && !!all_news.global.recent){
		var pageNumber = 0;
		var newsCountInCurrentPage = 0;
		
		var objCurrentPage = null;
		
		for(var i = 0; i < all_news.global.recent.length; i ++){
			var newsData = all_news.global.recent[i];

			if(newsData.kind == "Reviews")	continue;

			// check Caresol block
			if(newsCountInCurrentPage >= newsCountPerPage || pageNumber <= 0){
				pageNumber ++;
				newsCountInCurrentPage = 0;
				objCurrentPage = $(".carousel-page.news.clone").clone().removeClass("hidden").removeClass("clone").addClass(`page-${pageNumber}`);
				objCurrentPage = $(objCurrentPage).appendTo(objGameContainer);
			}

			var newsBlock = $(objCurrentPage).find(`.news-${newsCountInCurrentPage+1}`);

			// make dataset and display
			var dataset = [
				{ cls: ".anchor-news", attr: "href", value: newsData.url },
				{ cls: ".text-news-title", text: newsData.title },
				{ cls: ".text-news-game", text: newsData.gamename },
				{ cls: ".text-updated-at", text: getEllipseTimeFromPubdate(newsData.pubdate) },
				{ cls: ".gameCard-img", attr: "src", value: getNewsLogo(newsData) },
			];

			setObjectValues(newsBlock, dataset);
			newsCountInCurrentPage ++;
		}

		for(var j = newsCountInCurrentPage+1; j <= 2; j ++)
			$(objCurrentPage).find(`.news-${j}`).remove();

		activateSlick(objGameContainer);
	}
}

// Util functions
function getNewsLogo(data)
{
	var regex = /(.*)(\/)([^\/]*)$/gm
	var subst = "$1/conversions/$3";
	var regex2 = /(.*)(\.)([^\.]*)$/gm;
	var subst2 = "$1-thumb.jpg";
	var subst2b = "$1-thumb.$3";

	var image_src = firstImg(data.body);
  if ( image_src != null ){
    image_src = image_src.replace("http:", "https:");
    if ( image_src.search("storage") != -1 ) {
      return image_src.replace(regex, subst).replace(regex2, subst2);
    }else if ( image_src.search("com/resources") != -1 ) {
      return image_src.replace(regex, subst).replace(regex2, subst2b);
    }else{
      return image_src;
    }
	}
	
	return "https://image.freepik.com/free-photo/graphical-modern-digital-world-news-background_1412-442.jpg";
}

function activateSlick(elem)
{
	$(elem).slick({
		dots: true,
		infinite: true,
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
			breakpoint: 1199.98,
			settings: {
				arrows: false
			}
			}
		]
	});
}

function controlSlick(elem, command)
{
	if(!!command && $(elem).hasClass("slick-initialized"))
		$(elem).slick(command)
}

function activateSlick2(elem)
{
	$(elem).slick({
		dots: true,
		infinite: true,
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
			breakpoint: 1199.98,
			settings: {
				arrows: false
			}
			}
		]
	});
}

initTopSlider();

loadUserGames(() => {	
		initRecommendedGames();
		initFeaturedGames();

		initDiscoveredGames("bestselling");
		initDiscoveredGames("new");
		initDiscoveredGames("upcoming");
		initDiscoveredGames("demo");
});

// Load news
$.get('/assets/content/all-news.json', function(json){
	all_news = json;

	initNews();
})

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
					if(res && res.description && res.description == 'USER+HAS+NO+EMAIL'){
						showEmailRequiredModal("==(email_required_wish)==")
					}
			}
	);
})

//Menu collapsable in mobile-tabs
$("body").on("click",".textForMenu",function(){
    var theText = $(this).text();
    $("#selectedFilter").text(theText);
    $("#menuColapsable").collapse('hide');
    $(".navbar-toggler").find("i").addClass("upside-down");
});

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


//   $("body").on("hover", ".hoverthing",function(){
// 	$("#special-tooltip").css({
// 		visibility: "visible"
// 	  });
// 	}, function() {
// 	  $("#special-tooltip").css({
// 		visibility: "hidden"
// 	  });
// });

//   $(".hoverthing").hover(function() {
// 	$("#special-tooltip").css({
// 		visibility: "visible"
// 	  });
// 	}, function() {
// 	  $("#special-tooltip").css({
// 		visibility: "hidden"
// 	  });
// 	});


function queueReviewLoad(){
	const tooltips = $(".custom-tooltip")
	tooltips.map((index, tt) => {
		if(tt && $(tt).is(':visible') && $(tt).css("visibility") == "visible" && $(tt).attr("id_idcgame"))
		{
			if(typeof(loadGameReview) == "function")
				loadGameReview($(tt).attr("id_idcgame"))
		}else{
		}
	})

	setTimeout(queueReviewLoad, 1000)
}

queueReviewLoad()