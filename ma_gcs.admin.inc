<?php

/**
 * @file
 * This is another file that serves as a stub file for the many Examples modules
 * in the
 *
 * @link http://drupal.org/project/examples Examples for Developers Project
 *       @endlink
 *       which you can download and experiment with.
 *      
 *       One might say that examples.module is an example of documentation.
 *       However,
 *       note that the example submodules define many doxygen groups, which may
 *       or
 *       may not be a good strategy for other modules.
 */

/**
 * switching to clean phpdocumentor theme
 */
function ma_gcs_admin() {
  $form = array();
  
  for ($i = 1; $i < 9; $i++) {
    $form['ma_gcs_color' . $i] = array(
      '#type' => 'textfield', 
      '#title' => 'color #' . $i, 
      '#default_value' => variable_get('ma_gcs_color' . $i, '#101010'), 
      '#size' => 8, 
      '#description' => t("Default Color # " . $i), 
      '#required' => FALSE
    );
  }
  
  return system_settings_form($form);
}

/**
 * Validates correct format of url.
 */
function ma_gcs_admin_validate($form, &$form_state) {
  
  for ($i = 1; $i < 9; $i++) {
    if (!empty($form_state['values']['ma_gcs_color' . $i])) {
      $colorclean = $form_state['values']['ma_gcs_color' . $i];
      if (substr($colorclean, 0, 1) === '#') {
        // $cleanstr = substr($colorclean, 1);.
      }
      else {
        unset($form_state['values']['ma_gcs_color' . $i]);
        $form_state['values']['ma_gcs_color' . $i] = '#' . $colorclean;
      }
    }
  }
}
