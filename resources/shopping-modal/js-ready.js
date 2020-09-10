if(typeof(refreshCartCount) == 'function'){
  refreshCartCount();
}

$('.shoppingCartModal').on('shown.bs.modal', initCartItems);

$("body").on("click", ".btn-checkout", function(){
  window.location.href = "/checkout";
})

$("body").on("click", ".btn-remove-cart-item", function(){
  var id_idcgame = $(this).attr("id_idcgame");
  if(id_idcgame && typeof(removeGameFromBasket) == 'function'){
    removeGameFromBasket(id_idcgame);
    initCartItems();

    $(`.cart-btn[id_idcgame=${id_idcgame}]`).closest(".card-body").find(".inCart").removeClass("d-block");
  }
})

function initCartItems()
{
  var cartInfo = calcCartPrice();

	var objGameContainer = $('.shoppingCartModal .cart-item-container');
	objGameContainer.find(".cart-item-game").remove();

	if(cartInfo && !!cartInfo.games){
    $(".text-item-count").text(cartInfo.count);
    $(".text-discount-price").text(`${cartInfo.simbol} ${cartInfo.discount}`);
    $(".text-price").text(`${cartInfo.simbol} ${cartInfo.price}`);

		for(var i = 0; i < cartInfo.games.length; i ++){
			var gameID = cartInfo.games[i].gameID;
      var newGameBlock = $(".cart-item-game.clone").clone().removeClass("hidden").removeClass("clone");

      var dataset = makeDatasetForGame(gamedata[gameID]);
      dataset.push({ cls: ".btn-remove-cart-item", attr: "id_idcgame", value: gameID });
      
			newGameBlock = setObjectValues(newGameBlock, dataset, true);
			$(newGameBlock).appendTo(objGameContainer);
    }
  } 
}