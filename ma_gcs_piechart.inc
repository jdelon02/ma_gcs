<?php

/**
 * Attributes form element for random Shortcode.
 *
 * Used by shortcode_wysiwyg module to add form elements for attributes.
 */

function ma_gcs_shortcode_piechart_attributes($form, &$form_state) {

	$form['piechart-link'] = array(
			'#name' => t('link'),
			'#title' => t('Enter pie Sheets URL'),
			'#type' => 'textfield',
			'#states' => array(
					'visible' => array(
							':input[name="shortcode"]' => array('value' => 'piechart'),
					),
			),
	);

	$form['piechart-title'] = array(
			'#name' => t('title'),
			'#title' => t('Enter A Pie Chart Title'),
			'#type' => 'textfield',
			'#size' => 40,
			'#states' => array(
					'visible' => array(
							':input[name="shortcode"]' => array('value' => 'piechart'),
					),
			),
	);

	$form['piechart-subtitle'] = array(
			'#name' => t('subtitle'),
			'#title' => t('Enter A Sub-Title'),
			'#type' => 'textfield',
			'#size' => 40,
			'#states' => array(
					'visible' => array(
							':input[name="shortcode"]' => array('value' => 'piechart'),
					),
			),
	);

	// To make the fieldset collapsible
	$form['piechart-set'] = array(
			'#type' => 'fieldset',
			'#title' => t('Colors'),
			'#collapsible' => FALSE, // Added
			'#collapsed' => FALSE,  // Added
			'#states' => array(
					'visible' => array(
							':input[name="shortcode"]' => array('value' => 'piechart'),
					),
			),
	);

	for($i = 1; $i < 9; $i++) {
		$form ['piechart-set']['piechart-col' . $i] = array (
				'#name' => t('col'.$i),
				'#type' => 'textfield',
				'#title' => t('Color #' . $i),
				'#default_value' => variable_get('ma_gcs_color' . $i, ''),
				'#size' => 8,
				'#states' => array(
						'visible' => array(
								':input[name="shortcode"]' => array('value' => 'piechart'),
						),
				),
		);
	}

	return $form;
}

/**
 *
 * $attrs = shortcode_attrs(array(
 *     'attribute' => 'default_value_goes_here'
 * ),
 */
function ma_gcs_shortcode_piechart($attrs) {
	
	$attrs = shortcode_attrs ( array (
			'link' => '',
			'title' => '',
			'subtitle' => '',
			'col1' => variable_get('ma_gcs_color1'),
      'col2' => variable_get('ma_gcs_color2'),
      'col3' => variable_get('ma_gcs_color3'),
      'col4' => variable_get('ma_gcs_color4'),
      'col5' => variable_get('ma_gcs_color5'),
      'col6' => variable_get('ma_gcs_color6'),
      'col7' => variable_get('ma_gcs_color7'),
      'col8' => variable_get('ma_gcs_color8'),
	), $attrs );
	
	return theme ( 'shortcode_piechart', array (
			'link' => $attrs ['link'],
			'title' => $attrs ['title'],
			'subtitle' => $attrs ['subtitle'],
			'col1' => $attrs['col1'],
      'col2' => $attrs['col2'],
      'col3' => $attrs['col3'],
      'col4' => $attrs['col4'],
      'col5' => $attrs['col5'],
      'col6' => $attrs['col6'],
      'col7' => $attrs['col7'],
      'col8' => $attrs['col8'],
	) );
}

/**
 * This function uses the attributes passed in to return the HTML of this shortcode.
 */
function theme_shortcode_piechart($vars) {
	$thisisrandom = generateRandomString ();
	$linkme = $vars ['link'];
	$titleme = $vars ['title'];
	$subtitle = $vars ['subtitle'];
	$colors = array();
	for($x = 1; $x < 9; $x++) {
		$thiscolor = check_plain($vars['col'.$x]);
		$colors[$x] = $thiscolor;
	}
	$strColors = implode(",",$colors);
	//drupal_add_js ( array ('magcs' => array ('colors' => $colors)), 'setting' );
	$returnstring = '<div class="shortcodes" id="' 
		. $thisisrandom . '" data-type="piechart"  data-link="' 
		. $linkme . '" data-title="' 
		. $titleme . '" data-subtitle="' 
		. $subtitle . '" data-id="' 
		. $thisisrandom . '" data-colors="' 
		. $strColors . '" style="width: 900px; height: 500px;"></div>';
	
	return $returnstring;
}


