<?php

/**
 * Attributes form element for random Shortcode.
 *
 * Used by shortcode_wysiwyg module to add form elements for attributes.
 */

function ma_gcs_barchart_attributes($form, &$form_state) {
  
  $form['barchart-link'] = array(
      '#name' => t('link'),
      '#title' => t('Enter Google Sheets URL'),
      '#type' => 'textfield',
      '#states' => array(
          'visible' => array(
              ':input[name="shortcode"]' => array('value' => 'barchart'),
          ),
      ),
  );

  $form['barchart-title'] = array(
      '#name' => t('title'),
      '#title' => t('Enter A Chart Title'),
      '#type' => 'textfield',
      '#states' => array(
          'visible' => array(
              ':input[name="shortcode"]' => array('value' => 'barchart'),
          ),
      ),
  );

  $form['barchart-subtitle'] = array(
      '#name' => t('subtitle'),
      '#title' => t('Enter A Sub-Title'),
      '#type' => 'textfield',
      '#states' => array(
          'visible' => array(
              ':input[name="shortcode"]' => array('value' => 'barchart'),
          ),
      ),
  );

  for($i = 1; $i < 9; $i++) {
    $form ['barchart-col' . $i] = array (
        '#name' => t('col'.$i),
        '#type' => 'textfield',
        '#title' => t('Color #' . $i),
        '#default_value' => variable_get('ma_gcs_color' . $i, ''),
        '#size' => 8,
        '#states' => array(
            'visible' => array(
                ':input[name="shortcode"]' => array('value' => 'barchart'),
            ),
        ),
    );
  }
  $stacked = array(
      'True' => t('True'),
      'False' => t('False'),
  );
  $form['barchart-isstacked'] = array(
      '#name' => t('isstacked'),
      '#title' => t('Is this a Stacked Chart'),
      '#type' => 'select',
      '#description' => t('this only applies to bar and column charts'),
      '#options' => $stacked,
      '#states' => array(
          'visible' => array(
              ':input[name="shortcode"]' => array('value' => 'barchart'),
          ),
      ),
  );
  //firep($form, 'some form');
  return $form;
}

/**
 * Define our process callback function for our [button] shortcode. This
 * takes in our shortcode attributes from the shortcode and if empty, sets the property
 * to the default value stated in this function.  We then pass in our attributes to the
 * theme() function which outputs the HTML.
 *
 * $attrs = shortcode_attrs(array(
 *     'attribute' => 'default_value_goes_here'
 * ),
 */
function ma_gcs_shortcode_barchart($attrs) {
  $attrs = shortcode_attrs(
    array(
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
      'isstacked' => '',
    ),
    $attrs
  );


  return theme('shortcode_barchart', 
    array(
      'link' => $attrs['link'],
      'title' => $attrs['title'],
      'subtitle' => $attrs['subtitle'],
      'col1' => $attrs['col1'],
      'col2' => $attrs['col2'],
      'col3' => $attrs['col3'],
      'col4' => $attrs['col4'],
      'col5' => $attrs['col5'],
      'col6' => $attrs['col6'],
      'col7' => $attrs['col7'],
      'col8' => $attrs['col8'],
      'isstacked' => $attrs['isstacked'],
    )
  );
}

/**
 * This function uses the attributes passed in to return the HTML of this shortcode.
 */
function theme_shortcode_barchart($vars) {
  //dpm($vars);
  $thisisrandom = generateRandomString();
  $linkme = $vars['link'];
  $titleme = $vars['title'];
  $subtitle = $vars['subtitle'];
  $col1 = $vars['col1'];
  $col2 = $vars['col2'];
  $col3 = $vars['col3'];
  $col4 = $vars['col4'];
  $col5 = $vars['col5'];
  $col6 = $vars['col6'];
  $col7 = $vars['col7'];
  $col8 = $vars['col8'];
  $stackme = $vars['isstacked'];

  $colors = array(
      'col1' => check_plain($col1),
      'col2' => check_plain($col2),
      'col3' => check_plain($col3),
      'col4' => check_plain($col4),
      'col5' => check_plain($col5),
      'col6' => check_plain($col6),
      'col7' => check_plain($col7),
      'col8' => check_plain($col8),
  );

  drupal_add_js(
      array(
          'ma_gcs' => array(
              'colors' => $colors,
          )
      ),
      'setting'
  );
  $returnstring = '<div class="shortcodes" id="' . $thisisrandom
  . '" data-link="' . $linkme
  . '" data-title="' . $titleme
  . '" data-subtitle="' . $subtitle
  . '" data-id="' . $thisisrandom
  . '" data-col1="' . $col1
  . '" data-col2="' . $col2
  . '" data-col3="' . $col3
  . '" data-col4="' . $col4
  . '" data-col5="' . $col5
  . '" data-col6="' . $col6
  . '" data-col7="' . $col7
  . '" data-col8="' . $col8
  . '" data-isstacked="' . $stackme
  . '" style="width: 900px; height: 500px;"></div>';

  return $returnstring;
  //return '<div class="shortcodes" id="' . $thisisrandom . '" data-type= "'. $typeme . '" data-link="' . $linkme . '" data-title="' . $titleme . '" data-subtitle="' . $subtitle . '" data-id="' . $thisisrandom . '" data-col1="' . $col1 . '" data-col2="' . $col2 . '" data-col3="' . $col3 . '" data-col4="' . $col4 . '" data-col5="' . $col5 . '" data-col6="' . $col6 . '"  data-col7="' . $col7 . '"  data-col8="' . $col8 . '" style="width: 900px; height: 500px;"></div>';
}

/**
 * This function outputs some tips to the user beneath the WYSIWYG editor so they know
 * what the shortcode does and how to use it.
 */
function ma_gcs_shortcode_barchart_tip($format, $long) {
  $output = array();
  $output[] = '<p><strong>' . t('[barchart link="http://URLhere.com"][/barchart]') . '</strong> ';
  if ($long) {
    $output[] = t('Outputs a link that is displayed as a barchart.') . '</p>';
  }
  else {
    $output[] = t('Outputs text that links to a URL.') . '</p>';
  }

  return implode(' ', $output);
}
