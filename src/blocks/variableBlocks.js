// Variable and Data Blocks
export const registerVariableBlocks = (Blockly) => {
  // 115. data_set_variable
  Blockly.Blocks['data_set_variable'] = {
    init: function() {
      this.jsonInit({
        "message0": "set %1 to %2",
        "args0": [
          { "type": "field_input", "name": "VAR", "text": "variable" },
          { "type": "input_value", "name": "VALUE" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "Set variable value"
      });
    }
  };

  // 116. data_change_variable
  Blockly.Blocks['data_change_variable'] = {
    init: function() {
      this.jsonInit({
        "message0": "change %1 by %2",
        "args0": [
          { "type": "field_input", "name": "VAR", "text": "variable" },
          { "type": "input_value", "name": "VALUE", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "Change variable by amount"
      });
    }
  };

  // 117. data_get_variable
  Blockly.Blocks['data_get_variable'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1",
        "args0": [
          { "type": "field_input", "name": "VAR", "text": "variable" }
        ],
        "output": null,
        "style": "variable_blocks",
        "tooltip": "Get variable value"
      });
    }
  };

  // 118. data_create_list
  Blockly.Blocks['data_create_list'] = {
    init: function() {
      this.jsonInit({
        "message0": "create list [ ]",
        "output": "Array",
        "style": "variable_blocks",
        "tooltip": "Create empty list"
      });
    }
  };

  // 119. data_add_to_list
  Blockly.Blocks['data_add_to_list'] = {
    init: function() {
      this.jsonInit({
        "message0": "add %1 to list %2",
        "args0": [
          { "type": "input_value", "name": "ITEM" },
          { "type": "field_input", "name": "LIST", "text": "list" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "Add item to list"
      });
    }
  };

  // 120. data_delete_from_list
  Blockly.Blocks['data_delete_from_list'] = {
    init: function() {
      this.jsonInit({
        "message0": "delete %1 of list %2",
        "args0": [
          { "type": "input_value", "name": "INDEX", "check": "Number" },
          { "type": "field_input", "name": "LIST", "text": "list" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "Delete item from list"
      });
    }
  };

  // 121. data_insert_at_list
  Blockly.Blocks['data_insert_at_list'] = {
    init: function() {
      this.jsonInit({
        "message0": "insert %1 at %2 of list %3",
        "args0": [
          { "type": "input_value", "name": "ITEM" },
          { "type": "input_value", "name": "INDEX", "check": "Number" },
          { "type": "field_input", "name": "LIST", "text": "list" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "Insert item at position"
      });
    }
  };

  // 122. data_replace_in_list
  Blockly.Blocks['data_replace_in_list'] = {
    init: function() {
      this.jsonInit({
        "message0": "replace item %1 of list %2 with %3",
        "args0": [
          { "type": "input_value", "name": "INDEX", "check": "Number" },
          { "type": "field_input", "name": "LIST", "text": "list" },
          { "type": "input_value", "name": "ITEM" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "Replace item in list"
      });
    }
  };

  // 123. data_item_of_list
  Blockly.Blocks['data_item_of_list'] = {
    init: function() {
      this.jsonInit({
        "message0": "item %1 of list %2",
        "args0": [
          { "type": "input_value", "name": "INDEX", "check": "Number" },
          { "type": "field_input", "name": "LIST", "text": "list" }
        ],
        "inputsInline": true,
        "output": null,
        "style": "variable_blocks",
        "tooltip": "Get item from list"
      });
    }
  };

  // 124. data_length_of_list
  Blockly.Blocks['data_length_of_list'] = {
    init: function() {
      this.jsonInit({
        "message0": "length of list %1",
        "args0": [
          { "type": "field_input", "name": "LIST", "text": "list" }
        ],
        "output": "Number",
        "style": "variable_blocks",
        "tooltip": "Get list length"
      });
    }
  };

  // 125. data_contains_in_list
  Blockly.Blocks['data_contains_in_list'] = {
    init: function() {
      this.jsonInit({
        "message0": "list %1 contains %2 ?",
        "args0": [
          { "type": "field_input", "name": "LIST", "text": "list" },
          { "type": "input_value", "name": "ITEM" }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "variable_blocks",
        "tooltip": "Check if list contains item"
      });
    }
  };
};
