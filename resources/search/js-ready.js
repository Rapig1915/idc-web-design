// cart buttons
$(".custom-control-label.price-tag").each(function(index, label){
    $(label).text($(label).text().replace("{price}", $(label).attr("data-price")).replace("{symbol}", user_currency_symbol));
})

$("body").on("click",".cart-btn",function(){
    if(typeof(putGameInBasket) == "function" && putGameInBasket($(this).attr("id_idcgame")))
	{
        $(this).closest(".game-card-rectangular").find(".inCart").addClass("d-block");
        $(this).closest(".game-card-rectangular").find(".soon").removeClass("d-block");
        $(this).closest(".card").find(".inCart").addClass("d-block");
        $(this).closest(".card").find(".soon").removeClass("d-block");
	}
});

$('input[name = gameCategories]').click(function(){
    if ($("#categories input:checkbox:checked").length > 0)
    {
        $(".categories-title").find("button").removeClass("d-none");
        $(".categories-title").find("button").addClass("d-block");
        $(".categories-title").find("p").removeClass("text-white");
        $(".categories-title").find("p").addClass("text-primary");
    }
    else
    {
        $(".categories-title").find("button").removeClass("d-block");
        $(".categories-title").find("button").addClass("d-none");
        $(".categories-title").find("p").removeClass("text-primary");
        $(".categories-title").find("p").addClass("text-white");
    }

    doSearch();
});

$(".delete-filters-categories").click(function(){
    $("input[name = 'gameCategories']").prop("checked", false);
    $(".categories-title").find("button").removeClass("d-block");
    $(".categories-title").find("button").addClass("d-none");
    $(".categories-title").find("p").removeClass("text-primary");
    $(".categories-title").find("p").addClass("text-white");
    $(".allFilters-title").find(".badge").text($("#categories input:checkbox:checked").length + $("#price input:radio:checked").length);

    doSearch();
});

$('input[name = priceRange]').click(function(){
    if ($("#price input:radio:checked").length > 0)
    {
        $(".priceRange-title").find("button").removeClass("d-none");
        $(".priceRange-title").find("button").addClass("d-block");
        $(".priceRange-title").find("p").removeClass("text-white");
        $(".priceRange-title").find("p").addClass("text-primary");
    }
    else
    {
        $(".priceRange-title").find("button").removeClass("d-block");
        $(".priceRange-title").find("button").addClass("d-none");
        $(".priceRange-title").find("p").removeClass("text-primary");
        $(".priceRange-title").find("p").addClass("text-white");
    }

    doSearch();
});

$(".delete-filters-priceRange").click(function(){
    $("input[name = 'priceRange']").prop("checked", false);
    $(".priceRange-title").find("button").removeClass("d-block");
    $(".priceRange-title").find("button").addClass("d-none");
    $(".priceRange-title").find("p").removeClass("text-primary");
    $(".priceRange-title").find("p").addClass("text-white");
    $(".allFilters-title").find(".badge").text($("#categories input:checkbox:checked").length + $("#price input:radio:checked").length);

    doSearch();
});

$('#filtersList').click(function(){
    if ($("#filtersList input:checked").length > 0)
    {
        $(".allFilters-title").find("button").removeClass("d-none");
        $(".allFilters-title").find("button").addClass("d-block");
        $(".allFilters-title").find("h4").removeClass("text-white");
        $(".allFilters-title").find("h4").addClass("text-primary");
    }
    else
    {
        $(".allFilters-title").find("button").removeClass("d-block");
        $(".allFilters-title").find("button").addClass("d-none");
        $(".allFilters-title").find("h4").removeClass("text-primary");
        $(".allFilters-title").find("h4").addClass("text-white");
    }
});

$(".delete-filters-all").click(function(){
    $("input[name = 'priceRange']").prop("checked", false);
    $("input[name = 'gameCategories']").prop("checked", false);
    $(".priceRange-title").find("button").removeClass("d-block");
    $(".priceRange-title").find("button").addClass("d-none");
    $(".priceRange-title").find("p").removeClass("text-primary");
    $(".priceRange-title").find("p").addClass("text-white");
    $(".categories-title").find("button").removeClass("d-block");
    $(".categories-title").find("button").addClass("d-none");
    $(".categories-title").find("p").removeClass("text-primary");
    $(".categories-title").find("p").addClass("text-white");
    $(".allFilters-title").find("button").removeClass("d-block");
    $(".allFilters-title").find("button").addClass("d-none");
    $(".allFilters-title").find("h4").removeClass("text-primary");
    $(".allFilters-title").find("h4").addClass("text-white");
    $(".allFilters-title").find(".badge").text("0");

    doSearch();
});

$("body").on("click",'#filtersList input',function(){
    $(".allFilters-title").find(".badge").text($("#categories input:checkbox:checked").length + $("#price input:radio:checked").length);
});

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

$("body").on("click",".textForMenu",function(){
    var theText = $(this).text();
    $("#selectedFilter").text(theText);
    $("#menuColapsable").collapse('hide');
    $(".navbar-toggler").find("i").addClass("upside-down");
});

var currentSearchId = 1;

function doSearch(){
    // search games
    clearGames();

    var paramName = $("input[type=search]").val();
    var paramPrice = $("input[name=priceRange]:checked").attr("id") || ""
    var paramCategory = "";
    var selCategories = $("input[name=gameCategories]:checkbox:checked");
    for(var i = 0; i < selCategories.length; i ++)
        paramCategory += $(selCategories[i]).attr("id") + ",";

    var saveSearchId = ++ currentSearchId;
    
    $.ajax({
        type:"POST",
        url:"/assets/search/searchfilter.php",
        data: `token=${loadSession('token')}&currency=${user_currency}&name=${paramName}&category=${paramCategory}&price=${paramPrice}&has_offer=`,
        dataType: 'json',
        async:true,
        success: function(json){
            if(typeof(json) !== "undefined" && typeof(json.games) !== "undefined"){
                gamesSearchResult = json.games;
                initAll(saveSearchId);
                initWishGames();
            }else{
                console.log("Wrong data");
            }
        },
        error: function(error){  
            console.log("Search failed: ", error);
        }
    });
}

$("body").on("change","input.input-filter", doSearch);
$("body").on("click",".btn-proceed-search", doSearch);

$("body").on("click",".btn-show-more",function(){
    var tab = $(this).attr("data-tab");
    var mode = $(this).attr("data-mode");

    if(tab !== "all" && tab !== "featured" && tab !== "new" && tab !== "sale" && tab !== "upcoming")
        return;
    
    if(mode !== "square" && mode !== "rectangle")
        return;

    initGames(gamesSearchResult[tab], tab, mode);
});

function initAll(searchId)
{
    if(searchId > 0 && searchId != currentSearchId) return;

    initGames(gamesSearchResult.all.reverse(), "all", "square")
    initGames(gamesSearchResult.all, "all", "rectangle")
    initGames(gamesSearchResult.featured, "featured", "square")
    initGames(gamesSearchResult.featured, "featured", "rectangle")
    initGames(gamesSearchResult.new, "new", "square")
    initGames(gamesSearchResult.new, "new", "rectangle")
    initGames(gamesSearchResult.sale, "sale", "square")
    initGames(gamesSearchResult.sale, "sale", "rectangle")
    initGames(gamesSearchResult.upcoming, "upcoming", "square")
    initGames(gamesSearchResult.upcoming, "upcoming", "rectangle")
}

function clearGames()
{
    $(".tab-pane .game-card-square").remove();
    $(".tab-pane .game-card-rectangle").remove();
    $(".tab-pane .btn-show-more").attr("n_displayed", "");
}

function initGames(games, tab /* all/featured/new/sale/upcoming */, mode/* square/rectangle */, step_games = 9)
{
	if(tab !== "all" && tab !== "featured" && tab !== "new" && tab !== "sale" && tab !== "upcoming")
        return;
    
    if(mode !== "square" && mode !== "rectangle")
        return;

	var objGameContainer = $(`.tab-content #${tab} .grid-${mode}`);

    var buttonShowMore = $(objGameContainer).find(`.btn-show-more`);
    var buttonShowMoreWrapper = $(objGameContainer).find(".btn-show-more-wrapper");

	var nNextGameIndex = parseInt($(buttonShowMore).attr("n_displayed") || "0");
    var nDisplayStep = step_games;
    
    var wishGames = JSON.parse(loadSession("wish_games") || "[]");
    var wishGameIDs = [];
    for (i=0;i<wishGames.length;i++) {
        wishGameIDs.push(wishGames[i].IDJUEGO);
    }

	if(games && nNextGameIndex < games.length){
		for(var i = nNextGameIndex; i < games.length; i ++){
			var gameID = games[i];

            if(typeof(gamedata) == "undefined" || typeof(gamedata[gameID]) == "undefined")
                continue;

            var newGameBlock = mode === "square"
                ? $(".game-card-square.clone").clone().removeClass("hidden").removeClass("clone")
                : $(".game-card-rectangle.clone").clone().removeClass("hidden").removeClass("clone");

			// make dataset and display
            newGameBlock = setObjectValues(newGameBlock, makeDatasetForGame(gamedata[gameID]));
            if(wishGameIDs.includes(gameID*1))
                setWishlistedState($(newGameBlock).find(`.wishlist-btn[data-play="${gameID}"]`), true);

			// add it
            $(newGameBlock).insertBefore(buttonShowMoreWrapper);
            if(-- nDisplayStep <= 0) break;
		}

		nNextGameIndex = i+1;
		if(nNextGameIndex > games.length)
            nNextGameIndex = games.length;

    }
    $(buttonShowMore).attr("n_displayed", nNextGameIndex);
    if(nNextGameIndex >= games.length)
        $(buttonShowMore).addClass("hidden");
    else
        $(buttonShowMore).removeClass("hidden");
}

function initWishGames(){
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

clearGames();

$("input[type=search]").val(getQueryVariable('query') || "");
$(".btn-proceed-search").trigger("click");

switch(getQueryVariable('tab')){
    case 'featured':
        $('#featured-tab').tab('show');
        break;
    case 'new':
        $('#new-tab').tab('show');
        break;
    case 'sale':
        $('#sale-tab').tab('show');
        break;
    case 'upcoming':
        $('#upcoming-tab').tab('show');
        break;
}


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
  
//Tooltip
$('[data-toggle="tooltip"]').tooltip();