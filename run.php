<?php

	ini_set("memory_limit", "-1");
	set_time_limit(0);

	$section = "home";
	if( isset($_REQUEST['section']) ){
		$section = $_REQUEST['section'];
	}

	$json = file_get_contents("relations.json");
	$relations = json_decode($json, true);
	$modelos = $relations[$section];

	if ( !isset($relations[$section]) ){ 
		echo "<h1>Not found 404</h1>";
		exit();
	}

	$file_handle = fopen('language.csv', "r");
	$lang = array();
	if ($file_handle !== FALSE) {
		while ( ($data = fgetcsv($file_handle)) !== FALSE) {
			$row = explode(';',$data[0],2);
			$index = $row[0];
			$value = $row[1];
			$lang[$index] = $value;
		}
		fclose($file_handle);
	}
	$lang['==(language)=='] = 'en';
	$lang['==(current_time)=='] = date("His");
	$lang['==(current_timestamp)=='] = date("YMDHis");


	$file_handle = fopen('vars.csv', "r");
	$vars = array();
	if ($file_handle !== FALSE) {
		while ( ($data = fgetcsv($file_handle)) !== FALSE) {
			$row = explode(';',$data[0],2);
			$index = $row[0];
			$value = $row[1];
			$vars[$index] = $value;
		}
		fclose($file_handle);
	}

	$n = '
';


// ******************************************************************** BASE 1 **********************************************************//
	// <!-- Start BASE HTML -->
		$html = '<!DOCTYPE html>'.$n.'<html lang="en">'.$n.'<head>';
	// <!-- End BASE HTML -->

	// <!-- Start GLOBAL HTML -->
		$html .= file_get_contents("resources/global/html.html").$n;
	// <!-- End GLOBAL HTML -->


// ******************************************************************** CSS **********************************************************//
	// <!-- Start GLOBAL CSS -->
		$html .= file_get_contents("resources/global/css.css").$n;
	// <!-- End GLOBAL CSS -->

	// <!-- Start SECTION CSS -->
		foreach( $modelos as $model ){
			$html .= "<style>".file_get_contents("resources/".$model."/css.css")."</style>".$n;
		}
	// <!-- End SECTION CSS -->


// ******************************************************************** JS HEAD **********************************************************//
	// <!-- Start GLOBAL JS HEAD -->
		$html .= file_get_contents("resources/global/js-head.html").$n;
	// <!-- End GLOBAL JS HEAD -->

	// <!-- Start SECTION JS HEAD -->
		foreach( $modelos as $model ){
			$html .= file_get_contents("resources/".$model."/js-head.html").$n;
		}
	// <!-- End SECTION JS HEAD -->

// ******************************************************************** BASE 2 **********************************************************//
	$html .= '</head><body>';

// ******************************************************************** HTML **********************************************************//
	// <!-- Start SECTION HTML -->
		foreach( $modelos as $model ){
			$html .= file_get_contents("resources/".$model."/html.html").$n;
		}
	// <!-- End SECTION HTML -->

// ******************************************************************** JS FOOTER **********************************************************//
	// <!-- Start GLOBAL JS FOOTER -->
		$html .= file_get_contents("resources/global/js-footer.html").$n;
	// <!-- End GLOBAL JS FOOTER -->

	// <!-- Start SECTION JS FOOTER -->
		foreach( $modelos as $model ){
			$html .= file_get_contents("resources/".$model."/js-footer.html").$n;
		}
	// <!-- End SECTION JS FOOTER -->

// ******************************************************************** BASE 3 **********************************************************//
	$html .= '<script>$( document ).ready(function() {'.$n;;

// ******************************************************************** JS ON READY **********************************************************//
	// <!-- Start GLOBAL JS HEAD -->
		$html .= file_get_contents("resources/global/js-ready.js")."\n";;
	// <!-- End GLOBAL JS HEAD -->

	// <!-- Start SECTION JS HEAD -->
		foreach( $modelos as $model ){
			$html .= file_get_contents("resources/".$model."/js-ready.js").$n;
		}
	// <!-- End SECTION JS HEAD -->

// ******************************************************************** BASE 4 **********************************************************//
	$html .= '});'.$n.'</script>'.$n.'</body>'.$n.'</html>';

// ********************************************************************  RENDER  **********************************************************//

	$html = str_replace('src="/','src="https://en.idcgames.com/',$html);
	$html = str_replace('/unilogin','https://en.idcgames.com/unilogin',$html);
	$html = str_replace('idcgames.net','idcgames.com',$html);

	try {
		if( !is_array($lang) ) {
			throw new Exception("Lang EMPTY");
		}
		$prev = strtr($html, $lang);
		echo strtr($prev, $vars);
	}catch(Exception $e) {
		echo $html;
	}
	
	
// ********************************************************************  SAVE PAGE  **********************************************************//
	if( isset($_REQUEST['save']) ){
		
	}
	
	
?>