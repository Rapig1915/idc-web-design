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

$("body").on("click",".cart-btn", function(){
	
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
	if($(this).hasClass("btn-show-more-discovered"))
	{
		// initDiscoveredGames($(this).attr("type"));
		renderShowMore($(this).attr("type"));
	}
	// go to search page with type
	// var tab = $(this).attr("type") || "";
	// window.open(`/==(url_search)==?tab=${tab}`, "_blank");
});

//Carousel top
$("body").on('init',"#sliderhome",function(){
    $(".slick-current").find(".animatable").addClass("fadeInLeft");
    $(".slick-current").find(".animatable-custom-left").addClass("slideInLeftCustom");
    $(".slick-current").find(".animatable-custom-right").addClass("slideInRightCustom");
    $(".slick-current").find(".animatable-right").addClass("fadeInRight");
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

function isCat(gData, catName){
	if(!gData || !gData.common_params) return;
	return gData.common_params.game_cat1 == catName || gData.common_params.game_cat2 == catName || gData.common_params.game_cat3 == catName || gData.common_params.game_cat4 == catName || gData.common_params.game_cat5 == catName;
}

function isTag(gData, tagName){

}
// Init functions
var topSliderInited = false;

function initTopSlider(max_games=10){
	if(topSliderInited)
		return;
	
	$('#remove-me').remove();

	if(!topgames || !topgames_panel) return;

	topSliderInited = true;
		
	var gameList = [];
	var datasources = [
		topgames && topgames.topLogin.filter(x => isCat(gamedata[x], "##(name)##")),
		topgames && topgames.topCcu.filter(x => isCat(gamedata[x], "##(name)##")), 
		topgames_panel && topgames_panel["bestselling"].filter(x => isCat(gamedata[x], "##(name)##")), 
		topgames_panel && topgames_panel["new"].filter(x => isCat(gamedata[x], "##(name)##")), 
		topgames_panel && topgames_panel["upcoming"].filter(x => isCat(gamedata[x], "##(name)##")), 
	];

	console.log(datasources)

	var max_try = 5;
	while(gameList.length < max_games && max_try-->0){
		for(var i = 0; i < datasources.length; i ++){
			var picks = getShuffledArr(gameList.length<max_games/2 ? datasources[i].slice(0,2) : datasources[i].slice(2,5));
			var id = picks.length>0 ? picks[0] : 0;
			// if(!isCat(gamedata[id], "##(name)##")) continue;
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

	$("section").removeClass("hidden")
}

function getValid4FeaturedGameIDS(_data=[], bFilter=true){

	let nMaxFeatured = 4;
	let iArr = [];

	for(var i = 0; i < _data.length; i ++){
		var gData = gamedata[_data[i]];

		// if(bFilter) if(!isCat(gData, "##(name)##")) continue;

		if(bFilter){
			if(isCat(gData, "##(name)##")){

				iArr.push(_data[i]);
				if(--nMaxFeatured <= 0) break;
			}			
		}else{

			iArr.push(_data[i]);
			if(--nMaxFeatured <= 0) break;
		}
	}

	return iArr;
}

function initFeaturedGames(max_games = 20)
{
	var nMaxFeatured  = 4;
	var gameIDs = [];

	if(topgames_panel && !!topgames_panel.featured){

		const data = getShuffledArr(topgames_panel.featured);

		//Get available count
		gameIDs = getValid4FeaturedGameIDS(data);

		switch(gameIDs.length){

			case 4: 
				gameIDs = gameIDs.slice(0, gameIDs.length);	
			break;

			case 2:
				$('.featured-2').addClass('d-none');
				$('.featured-4').addClass('d-none');
				gameIDs = gameIDs.slice(0, gameIDs.length);	
			break;

			case 1:
				$('#featured').find(">:first-child").removeClass('col-xl-6').addClass('col-xl-12');
				$('.featured-2').addClass('d-none');
				$('.featured-3').addClass('d-none');
				$('.featured-4').addClass('d-none');
				gameIDs = gameIDs.slice(0, gameIDs.length);	
			break;

			case 3:	
				$('.featured-2').addClass('d-none');
				$('.featured-4').addClass('d-none');
				gameIDs = gameIDs.slice(0, 2);
			break;	

			case 0:
				$('#mark-featured').addClass('d-none');
				$('#mark-others').removeClass('d-none');
				gameIDs = getShuffledArr(topgames_panel.bestselling);

				if(gameIDs.length < 4){
					var _gameIDs = getShuffledArr(topgames_panel.new);
				}

				gameIDs = gameIDs.concat(_gameIDs).slice(0, 4);							
			break;			
		}

		for(var i = 0; i < gameIDs.length; i ++){
			var gData = gamedata[ gameIDs[i] ];

			i = (gameIDs.length == 2 && i == 1) ? i+1 : i; 

			setObjectValues( $(`#featured .small-card.featured-${i+1}`), makeDatasetForGame(gData, { ratio: '1x1', size: '1-8', quality: 0, format: 'webp' }, { ratio: '1x1', size: '1-8', quality: 0, format: 'webp' }));
			if(--nMaxFeatured <= 0) return;
		}

	}
}

/*==>> Topgame global param */
function addEverythingToTopgamesPNL(field="everything"){

	let _resultArr = [];	

	for (var key in gamedata) {

	  if (gamedata.hasOwnProperty(key)) {
	    var _game = gamedata[key];

	    if( _game.common_params.game_status === 'production'  		||
	    	_game.common_params.game_status === 'coming_soon' 		||
	    	_game.common_params.game_status === 'closed_beta' 		||
	    	_game.common_params.game_status === 'play_early_access' ||
	    	_game.common_params.game_status === 'open_beta' 		||
	    	_game.common_params.game_status === 'limited_beta' 		||
	    	_game.common_params.game_status === 'not_in_idc'){

	    	if( isCat(_game, "##(name)##") ) {

	    		_resultArr.push(key);
	    		// _resultArr.push(_game.common_params.game_id);
	    	}
	    }
	  }
	}

	topgames_panel[`${field}`] = _resultArr.reverse();
}

//
function initDiscoveredGames(type, max_games=8){

	if(type !== "bestselling" && type !== "new" && type !== "upcoming" && type !== "demo" && type !== "everything") return;
	
	$('#everything').find('.remove-me').remove();

	let oLists = topgames_panel[type];

	var objGameContainer = $(`.discovered-${type}-container`);

	var buttonShowMore = $(objGameContainer).find(`.discovered-${type}-show-more`);

	let nShown = 0; let nIth = 0;

	for(var i = 0; i < oLists.length; i ++){

		var gameID = oLists[i];

		if(!gamedata[gameID]) continue;

		if(!isCat(gamedata[gameID], "##(name)##")) continue;

		var newGameBlock = null;
		if( nShown < max_games){

			newGameBlock = $(".game-block.discovered.clone").clone().removeClass("hidden").removeClass("clone").addClass(`card-div-${i}`);
			nShown ++; 
			nIth=i;
		}else{

			newGameBlock = $(".game-block.discovered.clone").clone().removeClass("hidden").removeClass("clone").removeClass('d-flex').addClass('d-none').addClass(`card-div-${i}`);
		}

		// make dataset and display		
		newGameBlock = setObjectValues(newGameBlock, makeDatasetForGame(gamedata[gameID]));

		// add it
		$(newGameBlock).insertBefore(buttonShowMore);
	}

	$(buttonShowMore).attr("nIth", nIth+1);
	if(nShown==0 || nIth+1 >= oLists.length || nShown < max_games) $(buttonShowMore).removeClass('d-flex').addClass('d-none');
}

function renderShowMore(type, max_games=8){

	if(type !== "bestselling" && type !== "new" && type !== "upcoming" && type !== "demo" && type !== "everything") return;

	var buttonShowMore = $(`.discovered-${type}-container`).find(`.discovered-${type}-show-more`);

	let oLists = topgames_panel[type];

	let nIth = parseInt($(buttonShowMore).attr("nIth") || "0");

	let nShown = 0;

	for (let i = nIth; (i < oLists.length && nShown < max_games) ; i++ ) {

		let card_div_dom = $(buttonShowMore).parent().find(`.card-div-${i}`);

		if($(card_div_dom).length){

			$(card_div_dom).removeClass('d-none').addClass('d-flex');

			nShown ++;
			nIth=i;
		}
	}

	$(buttonShowMore).attr("nIth", nIth+1);
	if(nShown==0 || nIth+1 >= oLists.length || nShown < max_games) $(buttonShowMore).removeClass('d-flex').addClass('d-none');
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
		
		for(var i = 0; i < topgames.topCcu.length; i ++){
			var gameID = topgames.topCcu[i];
			var gameStatus = gamedata && gamedata[gameID] && gamedata[gameID].common_params && gamedata[gameID].common_params.game_status;
			if(!gameStatus || gameStatus === "developing" || gameStatus === "inactive")
				continue;

			if(!isCat(gamedata[gameID], "##(name)##")) continue;

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

			if(max_games-- <= 0)
			 break;
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

	// var image_src = firstImg(data.body);
	// if ( image_src != null ){
	//   image_src = image_src.replace("http:", "https:");
	//   if ( image_src.search("storage") != -1 ) {
	//     return image_src.replace(regex, subst).replace(regex2, subst2);
	//   }else if ( image_src.search("com/resources") != -1 ) {
	//     return image_src.replace(regex, subst).replace(regex2, subst2b);
	//   }else{
	//     return image_src;
	//   }
	// }
	
	return firstImg(data.body) || "https://cdn.idcgames.com/resources/idcgames/news_default.jpg";
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
		//Add everything field to the topgames_panel global param
		addEverythingToTopgamesPNL('everything');

		initRecommendedGames();
		initFeaturedGames();

		initDiscoveredGames("everything");
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