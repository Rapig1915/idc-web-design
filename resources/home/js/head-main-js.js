//animation idc logo while loading page
function addSlideOut(){
    $("#logoIntro").addClass("slideOutUp").addClass("fast");
    $(".bg1").css("display","none");
};

function addMenuClases(){
    $("#menu").addClass("nav-custom-after");
    $(".sidenav").addClass("sidenav-after");
    $(".btn-cta-small").css("display","block");
    $("#menu").addClass("bgDarkTexture");
	$("#menu").removeClass("bgLightTexture");
};

function deleteLayer(){
    $(".intro").css("display","none");
    $("body").css("position","relative");
    $(".shopping-cart").css("opacity","1");
};