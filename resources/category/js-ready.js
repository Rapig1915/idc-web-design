if ( typeof(AOS) == "object" ){
    AOS.init({
       disable: 'mobile' //disable the animation on mobile
    });
 }
 $('[data-toggle="tooltip"]').tooltip();
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
 $("body").on( "click", ".setModal", function() {
     var index = $(this).attr("data-index");
     var game = $(this).attr("data-game");
     var target = $(this).attr("data-target");
     doModal(index, game, target);
 });
 $("body").on( "click", ".actContent", function() {
     var target = $(this).attr("aria-controls");
     doContent( target );
 });