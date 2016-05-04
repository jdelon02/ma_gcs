<?php

/**
 * @file
 */

/**
 * Implements hook_action_info().
 *
 * Declares information about actions.
 *
 * Any module can define actions, and then call actions_do() to make those
 * actions happen in response to events. The trigger module provides a user
 * interface for associating actions with module-defined triggers, and it makes
 * sure the core triggers fire off actions when their events happen.
 *
 * An action consists of two or three parts:
 * - an action definition (returned by this hook)
 * - a function which performs the action (which by convention is named
 * MODULE_description-of-function_action)
 * - an optional form definition function that defines a configuration form
 * (which has the name of the action function with '_form' appended to it.)
 *
 * The action function takes two to four arguments, which come from the input
 * arguments to actions_do().
 *
 * @return array array
 *         An associative array of action descriptions. The keys of the array
 *         are the names of the action functions, and each corresponding value
 *         is an associative array with the following key-value pairs:
 *         - 'type': The type of object this action acts upon.
 *         Core actions have types 'node', 'user', 'comment', and 'system'.
 *         - 'label': The human-readable name of the action, which should be
 *         passed through the t() function for translation.
 *         - 'configurable': If FALSE, then the action doesn't require any extra
 *         configuration. If TRUE, then your module must define a form function
 *         with the same name as the action function with '_form' appended
 *         (e.g., the form for 'node_assign_owner_action' is
 *         'node_assign_owner_action_form'.)
 *         This function takes $context as its only parameter, and is paired
 *         with the usual _submit function, and possibly a _validate function.
 *         - 'triggers': An array of the events (that is, hooks) that can
 *         trigger this action. For example: array('node_insert',
 *         'user_update').
 *         You can also declare support for any trigger by returning
 *         array('any')
 *         for this value.
 *         - 'behavior': (optional) A machine-readable array of behaviors of
 *         this action, used to signal additionally required actions that may
 *         need to be triggered. Currently recognized behaviors by Trigger
 *         module:
 *         - 'changes_property': If an action with this behavior is assigned to
 *         a trigger other than a "presave" hook, any save actions also assigned
 *         to this trigger are moved later in the list. If no save action is
 *         present, one will be added.
 *         Modules that are processing actions (like Trigger module) should take
 *         special care for the "presave" hook, in which case a dependent "save"
 *         action should NOT be invoked.
 *        
 *         @ingroup actions
 *        
 */
function module_name_action_info() {
  return array(
    'module_name_' => array(
      'description' => t(''),
      'type' => '',
      'configurable' => ,
      'hooks' => array(
        '' => array(),
      )
    )
  );
}