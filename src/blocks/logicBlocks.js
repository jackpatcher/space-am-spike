// Logic Operator Blocks
export const registerLogicBlocks = (Blockly) => {
  // 102. operator_equals
  Blockly.Blocks['operator_equals'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 = %2",
        "args0": [
          { "type": "input_value", "name": "OPERAND1" },
          { "type": "input_value", "name": "OPERAND2" }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "logic_blocks",
        "tooltip": "Check if equal"
      });
    }
  };

  // 103. operator_not_equals
  Blockly.Blocks['operator_not_equals'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 ≠ %2",
        "args0": [
          { "type": "input_value", "name": "OPERAND1" },
          { "type": "input_value", "name": "OPERAND2" }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "logic_blocks",
        "tooltip": "Check if not equal"
      });
    }
  };

  // 104. operator_less_than
  Blockly.Blocks['operator_less_than'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 < %2",
        "args0": [
          { "type": "input_value", "name": "OPERAND1", "check": "Number" },
          { "type": "input_value", "name": "OPERAND2", "check": "Number" }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "logic_blocks",
        "tooltip": "Check if less than"
      });
    }
  };

  // 105. operator_greater_than
  Blockly.Blocks['operator_greater_than'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 > %2",
        "args0": [
          { "type": "input_value", "name": "OPERAND1", "check": "Number" },
          { "type": "input_value", "name": "OPERAND2", "check": "Number" }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "logic_blocks",
        "tooltip": "Check if greater than"
      });
    }
  };

  // 106. operator_less_or_equal
  Blockly.Blocks['operator_less_or_equal'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 ≤ %2",
        "args0": [
          { "type": "input_value", "name": "OPERAND1", "check": "Number" },
          { "type": "input_value", "name": "OPERAND2", "check": "Number" }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "logic_blocks",
        "tooltip": "Check if less than or equal"
      });
    }
  };

  // 107. operator_greater_or_equal
  Blockly.Blocks['operator_greater_or_equal'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 ≥ %2",
        "args0": [
          { "type": "input_value", "name": "OPERAND1", "check": "Number" },
          { "type": "input_value", "name": "OPERAND2", "check": "Number" }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "logic_blocks",
        "tooltip": "Check if greater than or equal"
      });
    }
  };

  // 108. operator_and
  Blockly.Blocks['operator_and'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 and %2",
        "args0": [
          { "type": "input_value", "name": "OPERAND1", "check": "Boolean" },
          { "type": "input_value", "name": "OPERAND2", "check": "Boolean" }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "logic_blocks",
        "tooltip": "Logical AND"
      });
    }
  };

  // 109. operator_or
  Blockly.Blocks['operator_or'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 or %2",
        "args0": [
          { "type": "input_value", "name": "OPERAND1", "check": "Boolean" },
          { "type": "input_value", "name": "OPERAND2", "check": "Boolean" }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "logic_blocks",
        "tooltip": "Logical OR"
      });
    }
  };

  // 110. operator_not
  Blockly.Blocks['operator_not'] = {
    init: function() {
      this.jsonInit({
        "message0": "not %1",
        "args0": [
          { "type": "input_value", "name": "OPERAND", "check": "Boolean" }
        ],
        "output": "Boolean",
        "style": "logic_blocks",
        "tooltip": "Logical NOT"
      });
    }
  };
};
