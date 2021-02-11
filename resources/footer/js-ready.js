if( getCookie("aceptado") == 1){
	$(".closeCookiesBox").removeClass("d-flex");
	$(".closeCookiesBox").addClass("d-none");
}

function queueReviewLoad(){
	const tooltips = $(".custom-tooltip")
	tooltips.map((index, tt) => {
		if(tt && $(tt).is(':visible') && $(tt).css("visibility") == "visible" && $(tt).attr("id_idcgame"))
		{
			if(typeof(loadGameReview) == "function")
				loadGameReview($(tt).attr("id_idcgame"))
		}else{
		}
	})

	setTimeout(queueReviewLoad, 1000)
}

queueReviewLoad()