<?php 

function _ma_gcs_base_variables() {
  return array(
    'link' => '',
    'title' => '',
    'subtitle' => '',
    'col1' => '',
    'col2' => '',
    'col3' => '',
    'col4' => '',
    'col5' => '',
    'col6' => '',
    'col7' => '',
    'col8' => '',
  );
}    

function ma_gcs_theme() {
		
  return array(
    'shortcode_piechart' => array(
      'variables' => _ma_gcs_base_variables(),   
    ),
  	'shortcode_barchart' => array(
  		'variables' => _ma_gcs_base_variables(),
 # 			'isstacked' => '',
  	),
  		 
  	'shortcode_columnchart' => array(
  		'variables' => _ma_gcs_base_variables(),
 # 			'isstacked' => '',
  	),
  	'shortcode_tablechart' => array(
  		'variables' => _ma_gcs_base_variables(),
  #			'legal1' => '',
  #			'legal2' => '',
  	),	
  );
}
$array=ma_gcs_theme();
print_r ($array);

function _ma_gcs_chart_types() {
	return array(
			'Pie' => 'piechart',
			'Bar' => 'barchart',
			'Column' => 'columnchart',
			'Table' => 'tablechart'
	);
}
function ma_gcs_shortcode_info() {
	$chartarray=_ma_gcs_chart_types();
	foreach ($chartarray as $key => $value) {
		
		$attcallback = 'ma_gcs_shortcode_' . $value . '_attributes';
		$proccallback = 'ma_gcs_shortcode_' . $value . '';
		$shortcodes[''. $value .''] = array(
				'title' => ('Google ' . $key . ' Chart'),
				'description' => ('Embed a Google ' . $key . ' Chart.'),
				'attributes callback' => $attcallback,
				'process callback' => $proccallback,
				'tips callback' => 'ma_gcs_shortcode_tip'
		);
	}
	return $shortcodes;
}

function ma_gcs_shortcode_barchart_attributes($form, &$form_state) {
	$barform = _ma_gcs_formbuild('Bar');
	$stacked = array(
			'True' => t('True'),
			'False' => t('False'),
	);
	$barform['barchart-isstacked']['#name'] = t('isstacked');
	$barform['barchart-isstacked']['#title'] = t('Is this a Stacked Chart');
	$barform['barchart-isstacked']['#type'] = 'select';
	$barform['barchart-isstacked']['#description'] = t('this only applies to bar and column charts');
	$barform['barchart-isstacked']['#options'] = $stacked;
	$barform['barchart-isstacked']['#options']['#states'] = array(
			'visible' => array(
					':input[name="shortcode"]' => array('value' => 'barchart'),
			),
	);
	return $barform;
}

print_r(ma_gcs_shortcode_info());
$attrs = array (
		
);
$ma_gcs_color1 = 'blue';
$ma_gcs_color2 = 'green';
$ma_gcs_color3 = 'red';
$ma_gcs_color4 = 'orange';
$ma_gcs_color5 = 'hazel';
$ma_gcs_color6 = 'aqua';
$ma_gcs_color7 = 'me';
$ma_gcs_color8 = 'you';

function _getcolors() {
	$col = array();
	for($x = 1; $x < 9; $x++) {
		$col[$x] = "ma_gcs_color$x";
	}
	return $col;
}
function shortcode_attrs($pairs, $atts) {
	$atts = (array)$atts;
	$out = array();
	foreach ($pairs as $name => $default) {
		if ( array_key_exists($name, $atts) )
			$out[$name] = $atts[$name];
			else
				$out[$name] = $default;
	}
	return $out;
}
function ma_gcs_shortcode_piechart() {
	$attrs =  array (
			'link' => '',
			'title' => '',
			'subtitle' => '',
	);
	for($x = 1; $x < 9; $x++) {
		$attrs += array("col$x" => "ma_gcs_color$x");
	}
	
	$themearray = array ();
	foreach ($attrs as $key => $value) {
		$themearray += array("$key" => "$value");
	}
	
	//return theme ( 'shortcode_piechart', array ( $themearray ));
	
	return $themearray;
}

print_r (ma_gcs_shortcode_piechart());


