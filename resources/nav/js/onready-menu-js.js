$(document).ready(function(){
    //On ready js
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
    
    $('#searchBox').submit(function(e){
        e.preventDefault();
        return false;
    });
    
    $('#searchBox').keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });
    
    $('#searchBox').keyup(function(){
        var value = $(this).val();
        if (value.length >= 2) { 
    
            var searchString = value.substring(0,2).toLowerCase();
            var gameList = $.getJSON( "./assets/search/" + searchString + ".json", function( data ) {
            
                $('#searched_game').show();
                $('#searched_game').html('');
                var encontrado = false;
            
                $.each( data, function( item, field ) {
                
                    var gameName = field.name.toLowerCase();
                    var searchGame = gameName.substring(0,value.length).toLowerCase();
                    var searchedGame = value.toLowerCase();
                                    
                    if (searchedGame == searchGame) 
                    {
                        encontrado = true;
                        var texto = '<div class="item" style="width:100%; text-align:right; padding-right:10px; height:60px;"><a href="./' + field.seo + '"><img src="' + field.logo + '" style="max-height:60px; float:left;">' + field.name + '<br/><br/>';
                        if (field.cat1 != "") {
                            texto = texto + '<span class="cat" style="border: 1px solid #000;padding: 4px;border-radius: 20px;background: #0A0A0A;font-size: x-small;">' + field.cat1 + '</span> ';
                        }
                        if (field.cat2 != "") {
                            texto = texto + '<span class="cat" style="border: 1px solid #000;padding: 4px;border-radius: 20px;background: #0A0A0A;font-size: x-small;">' + field.cat2 + '</span> ';
                        }
                        if (field.cat3 != "") {
                            texto = texto + '<span class="cat" style="border: 1px solid #000;padding: 4px;border-radius: 20px;background: #0A0A0A;font-size: x-small;">' + field.cat3 + '</span> ';
                        }
                        if (field.cat4 != "") {
                            texto = texto + '<span class="cat" style="border: 1px solid #000;padding: 4px;border-radius: 20px;background: #0A0A0A;font-size: x-small;">' + field.cat4 + '</span> ';
                        }
                        if (field.cat5 != "") {
                            texto = texto + '<span class="cat" style="border: 1px solid #000;padding: 4px;border-radius: 20px;background: #0A0A0A;font-size: x-small;">' + field.cat5 + '</span> ';
                        }
                        if (field.cat6 != "") {
                            texto = texto + '<span class="cat" style="border: 1px solid #000;padding: 4px;border-radius: 20px;background: #0A0A0A;font-size: x-small;">' + field.cat6 + '</span> ';
                        }
                        texto = texto + '</a></div>';
                        $('#searched_game').append(texto);
                    }
                    });
                
                if (!encontrado) {
                    $('#searched_game').html(' Not Games Found ');
                }
                
            })
            .fail(function() {
                console.log( "error" );
            })
            .always(function() {
            });
        }
        else {
            $('#searched_game').hide();
        }
    });
    $("body").change("#login-user",function(){
        setCookie("nicklogin", $("#login-user").val(), 365);
    });
})