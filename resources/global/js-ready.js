$("body").on( "click", ".playGame", function() {
	var gameId = $(this).attr("data-play");
	notLogged();
	if( loadSession('token') != false){
		if( gameId != undefined ){
			playGame(gameId );
		}
	}else{
		$("[data-target='.loginModal']:first").click();
		if( gameId != undefined ){
			$("body").on( "click", ".runLogIn", function() {
				playGame( gameId );
			});
		}
	}
});

$("body").on( "click", ".runShare", function() {
	if( $(".add_this_code").length == 0 ){
		addScript("https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5aaf8a768ead3479","add_this_code");
		setTimeout(function () {
			addScriptJS( 'var addthis_config = {data_track_clickback: false};' );
			addScriptJS( 'var addthis_share = { url: document.URL, title: document.title, description: $("head").find("meta[name=\'description\'").attr("content"),media: $("head").find("meta[property=\'og:image\'").attr("content")}' );
		}, 1500);
	}else{
		addScriptJS( 'var addthis_config = {data_track_clickback: false};' );
		addScriptJS( 'var addthis_share = { url: document.URL, title: document.title, description: $("head").find("meta[name=\'description\'").attr("content"),media: $("head").find("meta[property=\'og:image\'").attr("content")}' );
	}
});

$("body").on( "click", ".socialVote", function() {
	if( $(this).attr("data-act") == "like" ){
		$(this).siblings().removeClass("active");
		$(this).toggleClass("active");
		$(this).toggleClass("btn-outline-secondary");
	}else{
		$(this).siblings().removeClass("active");
		$(this).siblings(".socialVote").addClass("btn-outline-secondary");
		$(this).toggleClass("active");		
	}
});
$("body").on( "click", ".socialAct", function() {
	var id = $(this).attr("data-target");
	var vote = $(".socialVote.active[data-target='"+id+"']").attr("data-act");
	var text = $(".txtComment[data-target='"+id+"']").val();
	var tipo = $(this).attr("data-type");
	var gameid = $(this).attr("data-gameid");
	var gameseo = $(this).attr("data-gameseo");
	var ready = 1;
	if( vote == undefined ){
		$(".socialVote[data-target='"+id+"']").addClass("alert");
		$(".socialVote[data-target='"+id+"']").addClass("alert-danger");
		ready = 0;
	}
	if( text == undefined || text == ""){
		$(".txtComment[data-target='"+id+"']").addClass("alert");
		$(".txtComment[data-target='"+id+"']").addClass("alert-danger");
		ready = 0;
	}
	if( ready == 1 ){
		var ant = loadSession(tipo+"_"+id);
		var last = "";
		if ( ant != "" ){
			antParse = JSON.parse(ant);
			last = antParse.act;
		}
		var item = {
			'id': id,
			'act': vote,
			'extra': text,
			'type': tipo,
			'gameid': gameid,
			'gameseo': gameseo,
			'lang': language,
			'last': last
		}
		$(this).html('<i class="fas fa-spinner fa-pulse"></i>');
		var exe = socialAct(item,$(this));
	}else{
		setTimeout(function () {
			$(".alert-danger").removeClass("alert");
			$(".alert-danger").removeClass("alert-danger");
		}, 2500);
	}

});

$("body").on( "click", ".runLogIn", function() {
    $(".addComments").removeClass("d-none");
    $(".addComments").addClass("d-flex");
});
$("body").on( "click", ".runLogOff", function() {
    $(".addComments").removeClass("d-flex");
    $(".addComments").addClass("d-none");
});
$("body").on("change", ".txtComment", function() {
	var x = $(this).val();
	$(".socialAct").attr("data-extra",x);
});

$("body").on( "click", ".download", function() {
	getDownload();
});
/*
$("body").on( "click", ".buyGame", function() {
	var gameId = $(this).attr("data-play");
	if( loadSession('token') != false){
		if( gameId != undefined ){
			buyGame(gameId );
		}
	}else{
		$("[data-target='.loginModal']:first").click();
		if( gameId != undefined ){
			$("body").on( "click", ".runLogIn", function() {
				buyGame( gameId );
			});
		}
	}});
*/

/* social */
var cLogTrace = "";
if (navigator.userAgent.indexOf("idclauncher") > 0 ) {
	var referer = "LAUNCHER";
}else{
	var referer = "WEB"+lastG+' ('+document.baseURI+')';
	if ( typeof(platform) == "object" ) {
		var cLogTrace = window.innerWidth+"x"+window.innerHeight+";"+platform.os.family+" "+platform.os.version+" x"+platform.os.architecture+";"+platform.name+":"+platform.version;
	}
}
$("body").on( "click", ".btn-facebook", function(e) {
	var opt = $(this).attr("data-opt");
	var is_analytics = $(this).attr("data-analytics");
	console.log("FaceBook Login v3.8");
	if (is_analytics != "") {
		setCookie('extlogin','facebook',1);
		var game = '';
		if (game != "") {
			gtag('event', opt, {event_category: game, 'event_label': 'facebook', 'value':'1'});
		}
	}
	window.open('/unilogin/login_FB.php?game_id='+lastG+'&opt='+opt+'&referer='+referer+'&cLogTrace='+cLogTrace,'sociallogin','top=150,left=525,width=825,height=625,scrollbars=no,resizable=no,location=no,menubar=no,status=no,titlebar=no');
});
$("body").on( "click", ".btn-google", function(e) {
	var opt = $(this).attr("data-opt");
	var is_analytics = $(this).attr("data-analytics");
	console.log("Gooogle Sign-In Login");
	if (is_analytics != "") {
		setCookie('extlogin','google',1);
		var game = '';
		if (game != "") {
			gtag('event', opt, {event_category: game, 'event_label': 'google', 'value':'1'});
		}
	}
	window.open('/unilogin/login_GP.php?game_id='+lastG+'&opt='+opt+'&referer='+referer+'&cLogTrace='+cLogTrace,'sociallogin','top=150,left=525,width=825,height=625,scrollbars=no,resizable=no,location=no,menubar=no,status=no,titlebar=no');
});
$("body").on( "click", ".btn-steam", function(e) {
	var opt = $(this).attr("data-opt");
	var is_analytics = $(this).attr("data-analytics");
	console.log("Steam Login");
	if (is_analytics != "") {
		setCookie('extlogin','steam',1);
		var game = '';
		if (game != "") {
			gtag('event', opt, {event_category: game, 'event_label': 'steam', 'value':'1'});
		}
	}
	window.open('/unilogin/login_ST.php?game_id='+lastG+'&opt='+opt+'&referer='+referer+'&cLogTrace='+cLogTrace,'sociallogin','top=150,left=525,width=825,height=625,scrollbars=no,resizable=no,location=no,menubar=no,status=no,titlebar=no');
});
$("body").on( "click", ".btn-twitter", function(e) {
	var opt = $(this).attr("data-opt");
	var is_analytics = $(this).attr("data-analytics");
	console.log("Twitter Login");
	if (is_analytics != "") {
		setCookie('extlogin','twitter',1);
		var game = '';
		if (game != "") {
			gtag('event', opt, {event_category: game, 'event_label': 'twitter', 'value':'1'});
		}
	}
	window.open('/unilogin/login_TW.php?game_id='+lastG+'&opt='+opt+'&referer='+referer+'&cLogTrace='+cLogTrace,'sociallogin','top=150,left=525,width=825,height=625,scrollbars=no,resizable=no,location=no,menubar=no,status=no,titlebar=no');
});
$("body").on( "click", ".btn-twitch", function(e) {
	var opt = $(this).attr("data-opt");
	var is_analytics = $(this).attr("data-analytics");
	console.log("Twitch Login");
	if (is_analytics != "") {
		setCookie('extlogin','twitch',1);
		var game = '';
		if (game != "") {
			gtag('event', opt, {event_category: game, 'event_label': 'twitch', 'value':'1'});
		}
	}
	window.open('/unilogin/login_TC.php?game_id='+lastG+'&opt='+opt+'&referer='+referer+'&cLogTrace='+cLogTrace,'sociallogin','top=150,left=525,width=825,height=625,scrollbars=no,resizable=no,location=no,menubar=no,status=no,titlebar=no');
});
$("body").on( "click", ".btn-discord", function(e) {
	var opt = $(this).attr("data-opt");
	var is_analytics = $(this).attr("data-analytics");
	console.log("Discord Login");
	if (is_analytics != "") {
		setCookie('extlogin','discord',1);
		var game = '';
		if (game != "") {
			gtag('event', opt, {event_category: game, 'event_label': 'discord', 'value':'1'});
		}
	}
	window.open('/unilogin/login_DI.php?game_id='+lastG+'&opt='+opt+'&referer='+referer+'&cLogTrace='+cLogTrace,'sociallogin','top=150,left=525,width=825,height=625,scrollbars=no,resizable=no,location=no,menubar=no,status=no,titlebar=no');
});
$("body").on( "click", ".btn-yahoo", function(e) {
	var opt = $(this).attr("data-opt");
	var is_analytics = $(this).attr("data-analytics");
	console.log("Yahoo Login");
	if (is_analytics != "") {
		setCookie('extlogin','yahoo',1);
		var game = '';
		if (game != "") {
			gtag('event', opt, {event_category: game, 'event_label': 'yahoo', 'value':'1'});
		}
	}
	window.open('/unilogin/login_YH.php?game_id='+lastG+'&opt='+opt+'&referer='+referer+'&cLogTrace='+cLogTrace,'sociallogin','top=150,left=525,width=825,height=625,scrollbars=no,resizable=no,location=no,menubar=no,status=no,titlebar=no');
});
$("body").on( "click", ".btn-msn", function(e) {
	var opt = $(this).attr("data-opt");
	var is_analytics = $(this).attr("data-analytics");
	console.log("MSN Login");
	if (is_analytics != "") {
		setCookie('extlogin','msn',1);
		var game = '';
		if (game != "") {
			gtag('event', opt, {event_category: game, 'event_label': 'msn', 'value':'1'});
		}
	}
	window.open('/unilogin/login_MS.php?game_id='+lastG+'&opt='+opt+'&referer='+referer+'&cLogTrace='+cLogTrace,'sociallogin','top=150,left=525,width=825,height=625,scrollbars=no,resizable=no,location=no,menubar=no,status=no,titlebar=no');
});