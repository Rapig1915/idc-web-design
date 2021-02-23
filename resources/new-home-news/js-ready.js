AOS.init({
	disable: 'mobile' //disable the animation on mobile
});
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
$("body").on( "click", ".actContent", function() {
	var tipo = $(this).attr("aria-controls");
	if(tipo == "recent"){
		var x = news.normal.recent;
	}else if(tipo == "popular"){
		var x = news.normal.popular;
	}else{
		var x = news[tipo]["recent"];
	}
	console.log(x);
	doContent(x,tipo);
});
/*
$("body").on( "click", ".setModal", function() {
	var index = $(this).attr("data-index");
	var tipo = $(this).attr("data-section");
	var target = $(this).attr("data-target");
	doModal(index, tipo, target);
});
*/