<?php

function print_scripts($dirname) {
	$files = scandir($dirname);
	foreach ($files as $file) {
		if (substr($file, -3) !== '.js') {
			continue;
		}
		echo '<script src="' . $dirname . '/' . $file . '"></script>';
		echo "\n";
	}
}

function print_templates($dirname) {
	$files = scandir($dirname);
	foreach ($files as $file) {
		if (substr($file, -4) !== '.hbs') {
			continue;
		}
		$name = str_replace('_', '/', substr($file, 0, -4));
		echo '<script type="text/x-handlebars" data-template-name="' . $name . '">';
		echo "\n";
		echo file_get_contents($dirname . '/' . $file);
		echo "\n";
		echo '</script>';
		echo "\n";
	}
}