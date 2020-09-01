setTimeout(function() {
    if( getCookie("intro") == 1 || navigator.userAgent.indexOf("idclauncher") > 0 ){
        blackMenu();
        $("#intro").addClass("d-none");
        $("body").addClass("d-block");
        $("body").addClass("blackbody");
        $("body").css("position","relative");
    }else{
        actIntro();
        setCookie("intro",1,365);
    }
},50);
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
/*
$("body").on("slide.bs.carousel","#sliderhome",function(){
	$(".animatable").addClass("fadeInLeft");
	$(".animatable-custom-left").addClass("slideInLeftCustom");
	$(".animatable-custom-right").addClass("slideInRightCustom");
	$(".animatable-custom-gradient").addClass("bg-gradient-animation");
	$(".animatable-up").addClass("fadeInUp");
});
*/
$("body").on("slid.bs.carousel","#sliderhome",function(){
	$(".animatable").addClass("fadeInLeft");
	$(".animatable-up").addClass("fadeInUp");
	$(".carousel-item.active").find(".animatable-custom-left").addClass("slideInLeftCustom2");
	$(".carousel-item.active").find(".animatable-custom-right").addClass("slideInRightCustom2");
});
$('#sliderhome').carousel({
  pause: false
});
$("body").on( "click", ".runLogIn", function() {
     myGames();
});
if ( typeof(AOS) == "object" ){
   AOS.init({
      disable: 'mobile' //disable the animation on mobile
   });
}