//animation idc logo while loading page
$(document).ready(function() {
    setTimeout(addSlideOut, 3500);
    setTimeout(addMenuClases, 4000).slow;
    setTimeout(deleteLayer, 5000).slow;

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

    //Carousel top
    $("body").on("slide.bs.carousel","#sliderhome",function(){
        $(".animatable").addClass("fadeInLeft");
        $(".animatable-custom-left").addClass("slideInLeftCustom");
        $(".animatable-custom-right").addClass("slideInRightCustom");
        $(".animatable-custom-gradient").addClass("bg-gradient-animation");
        $(".animatable-up").addClass("fadeInUp");
    });
    $('#sliderhome').carousel({
        interval: 5000,
        pause: false
    })

    $('.carouselOffers').slick({
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
    $('.carouselOffer1').slick({
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
    $('.carouselOffer2').slick({
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
    $('.carouselWhatsGood').slick({
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
    $('.carouselRecommended').slick({
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
    $('.carouselNews').slick({
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

    //Set the dimensions of the slick carousel when the tab is triggered
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $(".carouselOffers").slick('setPosition');
        $(".carouselOffer1").slick('setPosition');
        $(".carouselOffer2").slick('setPosition');
    })
});

