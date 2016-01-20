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

print_r(ma_gcs_shortcode_info());
print_r(_ma_gcs_formbuild('Pie'));
function _ma_gcs_formbuild($type) {
	$key = $type;
	$value = $key.'Chart';
	$form['' . $value . '-link'] = array(
		'#name' => ('link'),
		'#title' => ("Enter $key Sheets URL"),
		'#type' => 'textfield',
		'#states' => array(
			'visible' => array(
				':input[name="shortcode"]' => array("value" => "$value"),
			),
		),
	);

	$form['' . $value . '-title'] = array(
		'#name' => ('title'),
		'#title' => ("Enter A $key Chart Title"),
		'#type' => 'textfield',
		'#size' => 40,
		'#states' => array(
			'visible' => array(
				':input[name="shortcode"]' => array('value' => "$value"),
			),
		),
	);

	$form['' . $value . '-subtitle'] = array(
		'#name' => ('subtitle'),
		'#title' => ('Enter a Sub-Title'),
		'#type' => 'textfield',
		'#size' => 40,
		'#states' => array(
			'visible' => array(
				':input[name="shortcode"]' => array('value' => "$value"),
			),
		),
	);

	// To make the fieldset collapsible
	$form['' . $value . '-set'] = array(
		'#type' => 'fieldset',
		'#title' => ('Colors'),
		'#collapsible' => FALSE, // Added
		'#collapsed' => FALSE,  // Added
		'#states' => array(
			'visible' => array(
				':input[name="shortcode"]' => array('value' => "$value"),
			),
		),
	);

	for($i = 1; $i < 9; $i++) {
		$form ['' . $value . '-set']['' . $value . '-col' . $i] = array (
			'#name' => ('col'.$i),
			'#type' => 'textfield',
			'#title' => ('Color #' . $i),
			'#default_value' => 'ma_gcs_color' . $i, '',
			'#size' => 8,
			'#states' => array(
				'visible' => array(
					':input[name="shortcode"]' => array('value' => "$value"),
				),
			),
		);
	}

	return $form;
}



