<?php

	$json = file_get_contents("sections.json");
	$sections = json_decode($json, true);

	$json = file_get_contents("models.json");
	$models = json_decode($json, true);

	$json = file_get_contents("relations.json");
	$relations = json_decode($json, true);

?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
		<meta name="description" content="IDC Launcher for GIT">
		<meta name="author" content="IDC Games">
		<meta name="keywords" content="">
		<title>IDC Launcher for GIT</title>
		<link rel="shortcut icon" href="https://es.idcgames.com/favicon.ico">
		<style>
			h1{
				text-align: center;
				background: #000;
				color: #FFF;
				padding: 8px 16px;
			}
			h2{
				background: #666;
				color: #FFF;
				padding: 8px 16px;
			}
			li{
				padding: 3px 6px;
			}
		</style>
	</head>
	<body>
		<main>
			<h1>IDC Launcher for GIT</h1>
			<section>
				<h2>SECTIONS</h2>
				<ul>
					<?php
						foreach( $sections as $sect ){
							echo '<li> '.$sect.' - <a href="run.php?section='.$sect.'" target="_blank">Test it</a></li>';
						}
					?>
				</ul>
				</section>

			<section>
				<h2>MODELS</h2>
				<ul>
					<?php
						foreach( $models as $mod ){
							echo '<li> '.$mod.' </li>';
						}
					?>
				</ul>
			</section>

			<section>
				<h2>MODELS FOR SECTION</h2>
				<ul>
					<?php
						foreach( $relations as $index => $rel ){
							echo '<li> '.$index.' <ol>';
							foreach( $rel as $model ){
								echo "<li>".$model."</li>";
							}
							echo '</ol></li>';
						}
					?>
				</ul>
			</section>
			
			<section>
				<h2> RULES </h2>
				<ul class="rules">
					<li>There are 3 JSON files: sections.json, models.json and relations.json on root path</li>
					<li>Those JSON allow to build pages like the IDC Panel </li>
					<li>There is no CRUD editor. Edit the JSONs manually if you need to update </li>
					<li>All models files should be in separate folders inside ./resources folder</li>
					<li>For each model there should be 5 files: html.html, css.css, js-head.html, js-footer.html and js-ready.js. Edit all of them like in the IDC Panel</li>
					<li>There is an empty copy of each file on ./resources</li>
					<li>If you need to add a new library, image or something, put it into new-resources folder and link it in HTML using "./new-resources/..." </li>
					<li>There are 2 CSV files: language and VARS. They contains the translations and custom vars to resolve </li>
				</ul>
			</section>
		</main>
	</body>
</html>