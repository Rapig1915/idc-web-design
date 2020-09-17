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