
$("body").on("click",".cart-btn",function(){
	
	if(typeof(putGameInBasket) == "function" && putGameInBasket($(this).attr("id_idcgame")))
	{
		$(this).closest(".game-card-rectangular").find(".inCart").addClass("d-block");
		$(this).closest(".game-card-rectangular").find(".soon").removeClass("d-block");
		$(this).closest(".card").find(".inCart").addClass("d-block");
		$(this).closest(".card").find(".soon").removeClass("d-block");
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

//<!-- slick carousel -->
$('.carousel-top').slick({
	centerMode: true,
	centerPadding: '10%',
	slidesToShow: 1,
	autoplay: true,
	arrows: true,
	speed: 950,
	pauseOnHover: true,
	autoplaySpeed: 6000,
  });


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
var topSliderInited = false;
function initTopSlider(max_games=5){
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

	var alternative = topgames_panel && topgames_panel.featured;

	for(var i = 0; i < datasources.length; i ++){
		var data = (datasources[i]&&datasources[i].length) ? datasources[i] : alternative;
		var ind = Math.min(1, Math.floor(Math.random()*2));
		if(ind >= data.length) ind = data.length-1;
		gameList.push(data[ind]);
	}

	for(var i = 0; i < datasources.length; i ++){
		var data = (datasources[i]&&datasources[i].length) ? datasources[i] : alternative;
		var ind = Math.min(4,Math.floor(Math.random()*3)+2);
		if(ind >= data.length) ind = data.length-1;
		gameList.push(data[ind]);
	}

	// datasources.map(src => {
	// 	if(src && src.length > 0){
	// 		for(var i = 0; i < src.length && i < max_games; i ++){
	// 			if(!gameList.includes(src[i]) && gamedata[src[i]]){
	// 				gameList.push(src[i]);
	// 				max_games--;
	// 				break;
	// 			}
	// 		}
	// 	}
	// })

	for(var i = 0; i < gameList.length; i ++){
		var gameID = gameList[i];

		var newGameBlock = $(`#sliderhome .carousel-item.item-${i+1}`);

		// make dataset and display		
		newGameBlock = setObjectValues(newGameBlock, makeDatasetForGame(gamedata[gameID]));
	}
	for(; i <max_games; i ++){
		$(`#sliderhome .carousel-item.item-${i+1}`).remove();
	}
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

		setObjectValues(objNewTab, [
			{ cls: ".anchor-tab", attr: "id", value: `${catKey}-tab` },
			{ cls: ".anchor-tab", attr: "href", value: `#${catKey}` },
			{ cls: ".anchor-tab", attr: "aria-controls", value: `${catKey}` },
			{ cls: ".anchor-tab", text: `${categories.name}` },
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
				{ cls: ".text-offer-name", text: offer_name },
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
			newGameBlock = setObjectValues(newGameBlock, makeDatasetForGame(gamedata[gameID], gameCountInCurrentPage == 0));

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
		const getShuffledArr = arr => {
				if (arr.length === 1) {return arr};
				const rand = Math.floor(Math.random() * arr.length);
				return [arr[rand], ...getShuffledArr(arr.filter((_, i) => i != rand))];
		};

		const data = getShuffledArr(topgames_panel.featured);

		for(var i = 0; i < data.length && i < max_games; i ++){
			if(i >= nMaxFeatured)
				break;

			var gameID = data[i];

			var gData = gamedata[gameID];

			var dataset = [
				{ cls: "", attr: "href", value: `/${gData.common_params.game_seo}` },
				{ cls: ".gameCard-img", attr: "src", value: getFeaturedSquareImage(gData) },
				{ cls: ".card-img-overlay", attr: "src", value: gData.common_params.game_logo },
			];

			setObjectValues($(`#featured .gameCard.featured-${i+1}`), dataset);
		}
	}
}

function initDiscoveredGames(type /* bestselling/new/upcoming */, max_games = 20)
{
	if(type !== "bestselling" && type !== "new" && type !== "upcoming")
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

loadUserGames(() => {
	
	// Load topgames json and init page
	$.get('./idcjson/topgames.json', function(json){
		topgames = json;

		initTopSlider();
		initRecommendedGames();
		initGoodGames();
	})

	$.get('./idcjson/topgames-panel.json', function(json){
		topgames_panel = json;

		initTopSlider();
		initFeaturedGames();
		initDiscoveredGames("bestselling");
		initDiscoveredGames("new");
		initDiscoveredGames("upcoming");

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
	})

	// Load news
	$.get('./assets/content/all-news.json', function(json){
		all_news = json;

		initNews();
	})

});

