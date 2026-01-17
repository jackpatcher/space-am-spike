// Text Blocks
export const registerTextBlocks = (Blockly) => {
  // 111. operator_join
  Blockly.Blocks['operator_join'] = {
    init: function() {
      this.jsonInit({
        "message0": "join %1 %2",
        "args0": [
          { "type": "input_value", "name": "STRING1", "check": "String" },
          { "type": "input_value", "name": "STRING2", "check": "String" }
        ],
        "inputsInline": true,
        "output": "String",
        "style": "text_blocks",
        "tooltip": "Join two strings"
      });
    }
  };

  // 112. operator_letter_of
  Blockly.Blocks['operator_letter_of'] = {
    init: function() {
      this.jsonInit({
        "message0": "letter %1 of %2",
        "args0": [
          { "type": "input_value", "name": "LETTER", "check": "Number" },
          { "type": "input_value", "name": "STRING", "check": "String" }
        ],
        "inputsInline": true,
        "output": "String",
        "style": "text_blocks",
        "tooltip": "Get letter at position"
      });
    }
  };

  // 113. operator_length
  Blockly.Blocks['operator_length'] = {
    init: function() {
      this.jsonInit({
        "message0": "length of %1",
        "args0": [
          { "type": "input_value", "name": "STRING", "check": "String" }
        ],
        "output": "Number",
        "style": "text_blocks",
        "tooltip": "Get string length"
      });
    }
  };

  // 114. operator_contains
  Blockly.Blocks['operator_contains'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 contains %2 ?",
        "args0": [
          { "type": "input_value", "name": "STRING1", "check": "String" },
          { "type": "input_value", "name": "STRING2", "check": "String" }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "text_blocks",
        "tooltip": "Check if string contains substring"
      });
    }
  };
};
