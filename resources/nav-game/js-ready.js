$("body").on( "click", ".openMenuBtn", function() {
	if ( window.innerWidth < 576 ){
	  $("body").addClass("noscroll");  
	}
	$(this).removeClass("openMenuBtn");
	$(this).addClass("closeMenuBtn");
	$("#sidenav-bar").removeClass("sidenav-closed");
	$("#sidenav-bar").addClass("sidenav-opened");
	scriptPlay();
  });
  $("body").on( "click", ".closeMenuBtn", function() {
	$("body").removeClass("noscroll");  
	$(this).removeClass("closeMenuBtn");
	$(this).addClass("openMenuBtn");
	$("#sidenav-bar").removeClass("sidenav-opened");
	$("#sidenav-bar").addClass("sidenav-closed");
	scriptPause();
  });
  $("body").on("click", "main", function() {
	  $("#categoriesBtn").removeClass("closeMenuBtn");
	  $("#categoriesBtn").addClass("openMenuBtn");
	  $("#sidenav-bar").removeClass("sidenav-opened");
	  $("#sidenav-bar").addClass("sidenav-closed");
	  scriptPause();
  });
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
  $("body").change("#login-user",function(){
	setCookie("nicklogin", $("#login-user").val(), 365);
  });