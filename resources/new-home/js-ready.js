console.log(`Time until OnReady: ${(new Date()).getTime()-startTime} ms`);

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
    $(".slick-current").find(".animatable-custom-gradient").addClass("bg-gradient-animation");
    $(".slick-current").find(".animatable-up").addClass("fadeInUp");
});

var speedSlick = 6000;

//<!-- slick carousel -->
$('.carousel-top').slick({
	centerMode: true,
	dots: false,
	slidesToShow: 1,
	// autoplay: false,
	//centerPadding: "0%",
	arrows: false,
	draggable: false,
	speed: 0,
	pauseOnHover: true,
	autoplaySpeed: speedSlick,
	responsive: [
		{
	      breakpoint: 769,
	      settings: {
	      	dots: true
	      }
	  	}
	]
  });
changeSlide(0);


// document.getElementById("formSearch").onsubmit = function(event) {
// 	event.preventDefault();
// 	let form = event.target;
// 	location.href = `/extra/buscar?query=${form.search.value}`;
// }
	


$("body").on("afterChange","#sliderhome",function(){
    $(".slick-current").find(".animatable").addClass("fadeInLeft");
    $(".slick-current").find(".animatable-custom-left").addClass("slideInLeftCustom");
    $(".slick-current").find(".animatable-custom-right").addClass("slideInRightCustom");
    $(".slick-current").find(".animatable-custom-gradient").addClass("bg-gradient-animation");
    $(".slick-current").find(".animatable-up").addClass("fadeInUp");
});
$("body").on("beforeChange","#sliderhome",function(){
    $(".slick-current").find(".animatable").removeClass("fadeInLeft");
    $(".slick-current").find(".animatable-custom-left").removeClass("slideInLeftCustom");
    $(".slick-current").find(".animatable-custom-right").removeClass("slideInRightCustom");
    $(".slick-current").find(".animatable-custom-gradient").removeClass("bg-gradient-animation");
    $(".slick-current").find(".animatable-up").removeClass("fadeInUp");
});


activateSlick($('.carouselWhatsGood'));
activateSlick($('.carouselRecommended'));
activateSlick($('.carouselNews'));

//Set the dimensions of the slick carousel when the tab is triggered
$("body").on('shown.bs.tab', '.anchor-tab', function (e) {
	listOfferCarousel = $(".carouselContainer");
	for(var i = 0; i < listOfferCarousel.length; i++){
		controlSlick($(listOfferCarousel[i]), 'setPosition');
	}
})

// Init functions
function initWishGames(){
	if(!topgames || !topgames_panel) return;

	loadUserWishGames(() => {
		var wishGames = JSON.parse(loadSession("wish_games") || "[]");
    for (i=0;i<wishGames.length;i++) {
        try {
            var idGame = wishGames[i].IDJUEGO;
						$(`.wishlist-btn[data-play="${idGame}"]`).each((k,btn) => setWishlistedState(btn, true));
        }catch(e){
            // console.log("Error gamelist: "+i);
        }
    }
	});
}

function initTopSlider(max_games=6){
	if(!topgames || !topgames_panel) return;
		
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
			(id && !gameList.includes(id) && gamedata[id] && gamedata[id].common_params.game_status !== "inactive") && gameList.push(id);
		}
	}

	console.log("top slider games: ", gameList);

	for(var i = 0; i < gameList.length && i < max_games; i ++){
		var gameID = gameList[i];

		// make dataset and display		
		var newGameBlock = $(`#sliderhome .carousel-item.item-${i+1}`);
		newGameBlock = setObjectValues(newGameBlock, makeDatasetForGame(gamedata[gameID]));

		var newGameSliderButton = $(`.carousel-container .carousel-btn.clone.d-none`).clone().removeClass("d-none").removeClass("clone");
		
		var urlBackSliderButton = retrieveImage(gamedata[gameID].store_params.game_banner_json, '1x1', '1-8', 0, 'webp', gamedata[gameID].store_params.game_banner_webp || gamedata[gameID].store_params.game_banner)
		var urlLogoSliderButton = retrieveImage(gamedata[gameID].common_params.game_logo_json, '1x1', '1-8', 0, 'webp', gamedata[gameID].common_params.game_logo_webp || gamedata[gameID].common_params.game_logo)
		// var urlImgSliderButton = retrieveImage(gamedata[gameID].common_params.game_logo_json, '1x1', '1-8', 0, 'webp', gamedata[gameID].common_params.game_logo_webp || gamedata[gameID].common_params.game_logo)

		newGameSliderButton = setObjectValues(newGameSliderButton, [
			{ cls: "", attr: "onclick", value: `changeSlide(${i})` },
			{ cls: "", attr: "data-slider-index", value: `${i}` },
			{ cls: ".btn-text", text: gamedata[gameID].name },
			{ cls: ".img-overlay", attr: "src", value: urlLogoSliderButton },
			{ cls: ".img-back", attr: "src", value: urlBackSliderButton },
		]);
		$(`.carousel-container .carousel-btns`).append(newGameSliderButton);
	}

	for(; i <max_games; i ++){
		$(`#sliderhome .carousel-item.item-${i+1}`).remove();
	}

	goToSlider(0);
	assignProgressbar(0);

	$("section").removeClass("hidden")
}

function initOfferGames(games, categories, all = true, max_games = 20)
{
	var offer_list = {};
	if(all) offer_list = categories;
	else offer_list[categories.name] = categories;

	var objGameContainer = $('.carouselContainer.all');

	// Create Tab
	if(!all){
		var objTabContainer = $('.offer-tab-container');
		var objTabContentContainer = $('.offer-tab-content-container');
		
		var objNewTab = $(".offer-tab.clone").clone().removeClass("hidden").removeClass("clone");
		var objNewTabContent = $(".offer-tab-content.clone").clone().removeClass("hidden").removeClass("clone");

		var catKey = categories.name.replace(/\s+/g, '').toLowerCase();
		var nameKey = categories.name.replace(/\s+/g, '_').toLowerCase();

		console.log(categories)

		setObjectValues(objNewTab, [
			{ cls: ".anchor-tab", attr: "id", value: `${catKey}-tab` },
			{ cls: ".anchor-tab", attr: "href", value: `#${catKey}` },
			{ cls: ".anchor-tab", attr: "aria-controls", value: `${catKey}` },
			{ cls: ".anchor-tab", text: `${OFFER_NAMES[nameKey] || categories.name}` },
		]);

		setObjectValues(objNewTabContent, [
			{ cls: "", attr: "aria-labelledby", value: `${catKey}-tab` },
			{ cls: "", attr: "id", value: `${catKey}` },
			{ cls: ".carouselContainer", attr: "class", value: `carouselContainer ${catKey}-tab` },
		]);

		$(objNewTab).appendTo(objTabContainer);
		objGameContainer = $(objNewTabContent).appendTo(objTabContentContainer).find(".carouselContainer");
	}

	// Init Carousel of tab content

	var gameCountPerPage = 8;
	//controlSlick(objGameContainer, 'unslick');
	objGameContainer.find(".carousel-page.offer").remove();

	if(games){
		var pageNumber = 0;
		var gameCountInCurrentPage = 0;
		
		var objCurrentPage = null;
		var objCurrentBlock = null;

		// add offer block
		for(var offer_name in offer_list){
			nameKey = offer_name.replace(/\s+/g, '_').toLowerCase();

			// check Caresol block
			if(gameCountInCurrentPage >= gameCountPerPage || pageNumber <= 0){
				pageNumber ++;
				gameCountInCurrentPage = 0;
				objCurrentPage = $(".carousel-page.offer.clone").clone().removeClass("hidden").removeClass("clone").addClass(`page-${pageNumber}`);
				objCurrentPage = $(objCurrentPage).appendTo(objGameContainer);
			}

			var newOfferBlock = 
					$(".offer-block.offer.clone").clone().removeClass("hidden").removeClass("clone");

			// make dataset and display
			var oData = offer_list[offer_name];

			if(!oData){
				continue;
			}

			newOfferBlock = setObjectValues(newOfferBlock, [
				{ cls: ".anchor-offer", attr: "href", value: "#" },
				{ cls: ".text-offer-name", text: OFFER_NAMES[nameKey] || offer_name },
				{ cls: ".text-discount-percent", text: `==(discount_param)==`.replace("{discount}", oData.max_percent) },
				{ cls: ".text-discount-prefix", text: `==(up_to_discount)==`.replace("{discount}", oData.max_percent) },
				{ cls: ".text-updated-at", text: getEllipseTimeFromTimestamp(oData.updated_at) },
				{ cls: ".offerCard-img", attr: "src", value: "" },
			]);

			// add it
			$(newOfferBlock).appendTo(objCurrentPage);

			gameCountInCurrentPage += 2;
		}
		
		// add game block
		for(var i = 0; i < games.length; i ++){
			var gameID = games[i];

			// check Caresol block
			if(gameCountInCurrentPage >= gameCountPerPage || pageNumber <= 0){
				pageNumber ++;
				gameCountInCurrentPage = 0;
				objCurrentPage = $(".carousel-page.offer.clone").clone().removeClass("hidden").removeClass("clone").addClass(`page-${pageNumber}`);
				objCurrentPage = $(objCurrentPage).appendTo(objGameContainer);
			}

			var newGameBlock = objCurrentBlock != null ? objCurrentBlock :
					$(".game-block.offer.clone").clone().removeClass("hidden").removeClass("clone");

			// make dataset and display
			var gData = gamedata[gameID];

			if(!gData || getGamePrice(gData) <= 0){
				continue;
			}

			setObjectValues(newGameBlock.find(!objCurrentBlock ? ".game-0" : ".game-1"), makeDatasetForGame(gamedata[gameID]));

			// add it
			if(!objCurrentBlock){
				$(newGameBlock).appendTo(objCurrentPage);
				objCurrentBlock = newGameBlock;
			}else{
				objCurrentBlock = null;
			}

			gameCountInCurrentPage ++;

			if(--max_games <= 0) break;
		}

		if(objCurrentBlock){
			$(objCurrentBlock).find(".game-1").remove();
		}

		activateSlick(objGameContainer);
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

function initGoodGames(max_games = 20)
{
	var gameCountPerPage = 5;
	var objGameContainer = $('.carouselWhatsGood');
	controlSlick(objGameContainer, 'unslick');
	objGameContainer.find(".carousel-page.whatsgood").remove();

	if(topgames && !!topgames.topLogin){
		var pageNumber = 0;
		var gameCountInCurrentPage = 0;
		
		var objCurrentPage = null;
		
		for(var i = 0; i < topgames.topLogin.length && i < max_games; i ++){
			var gameID = topgames.topLogin[i];
			var gameStatus = gamedata && gamedata[gameID] && gamedata[gameID].common_params && gamedata[gameID].common_params.game_status;
			if(!gameStatus || gameStatus === "developing" || gameStatus === "inactive")
				continue;

			// check Caresol block
			if(gameCountInCurrentPage >= gameCountPerPage || pageNumber <= 0){
				pageNumber ++;
				gameCountInCurrentPage = 0;
				objCurrentPage = $(".carousel-page.whatsgood.clone").clone().removeClass("hidden").removeClass("clone").addClass(`page-${pageNumber}`);
				objCurrentPage = $(objCurrentPage).appendTo(objGameContainer);
			}

			var newGameBlock = 
					gameCountInCurrentPage == 0
					? $(".game-block.whatsgood.big-card.clone").clone().removeClass("hidden").removeClass("clone")
					: $(".game-block.whatsgood.small-card.clone").clone().removeClass("hidden").removeClass("clone");

			// make dataset and display
			newGameBlock = setObjectValues(newGameBlock, makeDatasetForGame( gamedata[gameID], { ratio: '1x1', size: '1-4', quality: 0, format: 'webp' } ));

			// add it
			if(gameCountInCurrentPage == 0)
				$(newGameBlock).appendTo(objCurrentPage.find(".big-card-box"));
			else if(gameCountInCurrentPage < 3)
				$(newGameBlock).appendTo(objCurrentPage.find(".small-card-box-1"));
			else
				$(newGameBlock).appendTo(objCurrentPage.find(".small-card-box-2"));

			gameCountInCurrentPage ++;
		}

		activateSlick(objGameContainer);
	}
}

function initFeaturedGames(max_games = 20)
{
	var nMaxFeatured = 6;

	if(topgames_panel && !!topgames_panel.featured){

		const data = getShuffledArr(topgames_panel.featured);

		for(var i = 0; i < data.length && i < max_games; i ++){
			if(i >= nMaxFeatured)
				break;

			var gameID = data[i];
			var gData = gamedata[gameID];

			setObjectValues($(`#featured .gameCard.featured-${i+1}`), makeDatasetForGame(gData, { ratio: '1x1', size: '1-8', quality: 0, format: 'webp' }, { ratio: '1x1', size: '1-8', quality: 0, format: 'webp' }));
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
	
	return "https://cdn.idcgames.com/resources/idcgames/news_default.jpg";
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
	
	if(topgames_panel && topgames_panel.offer && topgames_panel.offer_categories){
		initOfferGames(topgames_panel.offer, topgames_panel.offer_categories, true);
		for(var offer_name in topgames_panel.offer_categories)
		{
			initOfferGames(
				topgames_panel.offer_categories[offer_name].games,
				{ name: offer_name, max_percent: topgames_panel.offer_categories[offer_name].max_percent, updated_at: topgames_panel.offer_categories[offer_name].updated_at },
				false
			);
		}
	}

	initRecommendedGames();
	initGoodGames();
	initFeaturedGames();

	initDiscoveredGames("bestselling");
	initDiscoveredGames("new");
	initDiscoveredGames("upcoming");
	initDiscoveredGames("demo");


	initWishGames();
})

// Load news
$.get('./assets/content/all-news.json', function(json){
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

// carousel for tooltip
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

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
});