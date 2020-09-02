
// cart buttons
   
$("body").on("click",".cart-btn",function(){
    var type = "rubberBand";
    var counter = ($(".shopping-cart").find("span").text()*1)+1;
    $(".shopping-cart").find("i").addClass(type);
    $(".shopping-cart").find("span").text(counter);
    $(".shopping-cart").find("span").addClass("bg-gray-900");
    $(this).closest(".game-card-rectangular").find(".inCart").addClass("d-block");
    $(this).closest(".game-card-rectangular").find(".soon").removeClass("d-block");
    $(this).closest(".card").find(".inCart").addClass("d-block");
    $(this).closest(".card").find(".soon").removeClass("d-block");
    setTimeout(function() {
        $(".shopping-cart").find("i").removeClass(type);
        $(".shopping-cart").find("span").removeClass("bg-gray-900");
    },1000);
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
});

$(".delete-filters-categories").click(function(){
    $("input[name = 'gameCategories']").prop("checked", false);
    $(".categories-title").find("button").removeClass("d-block");
    $(".categories-title").find("button").addClass("d-none");
    $(".categories-title").find("p").removeClass("text-primary");
    $(".categories-title").find("p").addClass("text-white");
    $(".allFilters-title").find(".badge").text($("#categories input:checkbox:checked").length + $("#price input:radio:checked").length);
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
});

$(".delete-filters-priceRange").click(function(){
    $("input[name = 'priceRange']").prop("checked", false);
    $(".priceRange-title").find("button").removeClass("d-block");
    $(".priceRange-title").find("button").addClass("d-none");
    $(".priceRange-title").find("p").removeClass("text-primary");
    $(".priceRange-title").find("p").addClass("text-white");
    $(".allFilters-title").find(".badge").text($("#categories input:checkbox:checked").length + $("#price input:radio:checked").length);
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

