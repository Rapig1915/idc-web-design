<?php

// Usamos el JSON de todos los juegos (que se actualiza cada día)
$fileJuegos = file_get_contents("./assets/search/gameinfo.json");
$arrayJuegos = json_decode($fileJuegos);
$resultArray = array();

foreach ($arrayJuegos as $key=>$value) {

	if (($value->common_params->game_status != 'inactive') 
			&& ($value->common_params->game_status != 'developing') 
			&& (!empty($value->common_params->game_name)) ) 
	{
		$cat_array = array();
		if(!empty($value->common_params->game_cat1))
			$cat_array[] = $value->common_params->game_cat1;
		if(!empty($value->common_params->game_cat2))
			$cat_array[] = $value->common_params->game_cat2;
		if(!empty($value->common_params->game_cat3))
			$cat_array[] = $value->common_params->game_cat3;
		if(!empty($value->common_params->game_cat4))
			$cat_array[] = $value->common_params->game_cat4;
		if(!empty($value->common_params->game_cat5))
			$cat_array[] = $value->common_params->game_cat5;
		if(!empty($value->common_params->game_cat6))
			$cat_array[] = $value->common_params->game_cat6;

		$price = $value->common_params->game_price;
		$price_usd = $price ? ($price->USD ?? 0) : 0;
		$offer_sum = 0;
		if($value->common_params->game_offer)
		{
			foreach($value->common_params->game_offer as $offer)
			{
				$offer_sum += $offer->discount ?? 0;
			}
		}

		$data = array(
			'id_idcgame' => $value->common_params->id_idcgame,
			'name' => $value->common_params->game_name,
			'seo' => $value->common_params->game_seo,
			'square_image' => $value->store_params->square_image,
			'logo' => $value->common_params->game_logo,
			'status' => $value->common_params->game_status,
			'cat_array' => $cat_array,
			'cat1' => $value->common_params->game_cat1,
			'cat2' => $value->common_params->game_cat2,
			'cat3' => $value->common_params->game_cat3,
			'cat4' => $value->common_params->game_cat4,
			'cat5' => $value->common_params->game_cat5,
			'cat6' => $value->common_params->game_cat6,
			'price' => $price,
			'price_free' => $price_usd <= 0,
			'price_u5' => $price_usd > 0 && $price_usd <= 5,
			'price_u10' => $price_usd > 0 && $price_usd <= 10,
			'price_u25' => $price_usd > 0 && $price_usd <= 25,
			'price_u50' => $price_usd > 0 && $price_usd <= 50,
			'price_a50' => $price_usd > 50,
			'has_offer' => $offer_sum > 0,
			'offer_discount' => $offer_sum
		);

		// store
		// 2-letter hash
		// category hash
		// price hash
		// offer on-off hash

		$clave = substr($value->common_params->game_name,0,2);
		$resultArray[$clave][] = $data;

		foreach($cat_array as $cat)
			$resultArray["c_$cat"][] = $data;

		if($data['price_free'])
			$resultArray["price_free"][] = $data;
		if($data['price_u5'])
			$resultArray["price_u5"][] = $data;
		if($data['price_u10'])
			$resultArray["price_u10"][] = $data;
		if($data['price_u25'])
			$resultArray["price_u25"][] = $data;
		if($data['price_u50'])
			$resultArray["price_u50"][] = $data;
		if($data['price_a50'])
			$resultArray["price_a50"][] = $data;

		if($data['has_offer'])
			$resultArray["offer_on"][] = $data;
		else
			$resultArray["offer_off"][] = $data;
	}
}

foreach ($resultArray as $key=>$value) 
{
	$rutaLog = "./assets/search/".strtolower(str_replace(" ", "-", $key)).".json";
	$texto = json_encode($value);
	
	//ESCRIBIMOS EL FICHERO
	$result = file_put_contents($rutaLog,$texto);
	echo($result);
}