<?php
	include 'functions.php';
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Dex</title>
	<link rel="stylesheet" href="app/styles/app.css">
	<base href="/dex/">
</head>
<body>

<div class="Overflow"></div>

<section id="tpl">
	<?php
		print_templates('app/templates');
	?>
</section>

<section id="js">
	<script src="vendor/jquery/dist/jquery.js"></script>
	<script src="vendor/handlebars/handlebars.js"></script>
	<script src="vendor/ember/ember.js"></script>
	<script src="vendor/ember-data/ember-data.js"></script>
	<script src="vendor/ember-localstorage-adapter/localstorage_adapter.js"></script>
	<script src="vendor/lodash/dist/lodash.js"></script>
	<script src="vendor/converType.js"></script>

	<script src="app/app.js"></script>
	<script src="app/router.js"></script>

	<?php
		print_scripts('app/controllers');
		print_scripts('app/models');
		print_scripts('app/routes');
		print_scripts('app/serializers');
		print_scripts('app/views');
	?>
</section>
</body>
</html>