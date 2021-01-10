lastG = %%(id_idcgame)%%;
gameCat();
sliderGames();
var flag = $("[data-in='"+language+"']").attr("data-out");
$(".language-menu").find(".flag-"+flag ).parent().remove();
$(".flag:first").addClass("flag-"+flag);
setTimeout(function(){
	$("main").fadeIn();
}, 125);
$("body").on( "click", ".pauseBtn", function() {
	$(this).removeClass("pauseBtn");
    $(this).addClass("playBtn");
    scriptPause();
});
$("body").on( "click", ".playBtn", function() {
    $(this).removeClass("playBtn");
    $(this).addClass("pauseBtn");
    scriptPlay();
});
$("body").on( "click", ".pauseAudioBtn", function() {
    $(this).removeClass("pauseAudioBtn");
    $(this).addClass("playAudioBtn");
    scriptPlayAudio();
});
$("body").on( "click", ".playAudioBtn", function() {
    $(this).removeClass("playAudioBtn");
    $(this).addClass("pauseAudioBtn");
    scriptPauseAudio();
});
/*
    $("body").on("click", "main", function() {
        $("#categoriesBtn").removeClass("closeMenuBtn");
        $("#categoriesBtn").addClass("openMenuBtn");
        $("#sidenav-bar").removeClass("sidenav-opened");
        $("#sidenav-bar").addClass("sidenav-closed");
        scriptPause();
    });
*/
	$(".getAuth").find("input").keypress(function(e) {
		var t = $(this);
		if(e.which == 13) {
			t.parents(".getAuth").find("[type='submit']").click();
		}
	});
	$("body").keypress(function(e) {
		if(e.which == 27) {
			$(this).removeClass("closeMenuBtn");
			$(this).addClass("openMenuBtn");
			document.getElementById("sidenav-bar").style.width = "0";
			scriptPause();
		}
	});
	if( loadSession('token') != false ){
		$(".cUserName").text( getCookie("nick") );
		$(".cUserNameIcon").attr("title", getCookie("nick") );
		$(".logged").show();
		$(".unlogged").hide();
	}else{
		$(".unlogged").show();
		$(".logged").hide();
	}
    $("body").on( "click", ".actLogOff", function() {
		deleteSession();
	});
    $("body").on( "blur", "#register-user", function() {
		checkNick();
	});
	$('.loginForm').submit(function(e) {
		e.preventDefault();
		console.log('Logando');
		try {
			loginUser();
		}
		catch(error) {
			console.error(error);
		}
	});
	$('.registerForm').submit(function(e) {
		e.preventDefault();
		console.log('Registrando');
		try {
			registrarUser();
		}
		catch(error) {
			console.error(error);
		}
	});
$("body").on( "click", ".runLogIn", function() {
	playGame(0)
});
$('.steam-link').click(function() {
	gtag('event', 'redirect', {event_category: 'game', 'event_label': 'steam', 'value':'1'});
});