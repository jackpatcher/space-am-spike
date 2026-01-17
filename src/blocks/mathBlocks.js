// Math Operator Blocks
export const registerMathBlocks = (Blockly) => {
  // Combined arithmetic operator with dropdown
  Blockly.Blocks['operator_arithmetic'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 %2 %3",
        "args0": [
          { "type": "input_value", "name": "NUM1", "check": "Number" },
          { "type": "field_dropdown", "name": "OP", "options": [
            ["+", "ADD"], ["-", "SUBTRACT"], ["×", "MULTIPLY"], ["÷", "DIVIDE"], ["mod", "MOD"]
          ]},
          { "type": "input_value", "name": "NUM2", "check": "Number" }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "math_blocks",
        "tooltip": "Arithmetic operations"
      });
    }
  };

  // Random
  Blockly.Blocks['operator_random'] = {
    init: function() {
      this.jsonInit({
        "message0": "random %1 to %2",
        "args0": [
          { "type": "input_value", "name": "FROM", "check": "Number" },
          { "type": "input_value", "name": "TO", "check": "Number" }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "math_blocks",
        "tooltip": "Random number between range"
      });
    }
  };

  // Round
  Blockly.Blocks['operator_round'] = {
    init: function() {
      this.jsonInit({
        "message0": "round %1",
        "args0": [
          { "type": "input_value", "name": "NUM", "check": "Number" }
        ],
        "output": "Number",
        "style": "math_blocks",
        "tooltip": "Round to nearest integer"
      });
    }
  };

  // Math functions with dropdown
  Blockly.Blocks['operator_mathop'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 of %2",
        "args0": [
          { "type": "field_dropdown", "name": "OPERATOR", "options": [
            ["abs", "abs"], ["floor", "floor"], ["ceiling", "ceiling"],
            ["sqrt", "sqrt"], ["sin", "sin"], ["cos", "cos"],
            ["tan", "tan"], ["asin", "asin"], ["acos", "acos"],
            ["atan", "atan"], ["ln", "ln"], ["log", "log"], 
            ["e^", "exp"], ["10^", "pow10"]
          ]},
          { "type": "input_value", "name": "NUM", "check": "Number" }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "math_blocks",
        "tooltip": "Mathematical operations"
      });
    }
  };

  // Number constant
  Blockly.Blocks['math_number'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1",
        "args0": [
          { "type": "field_number", "name": "NUM", "value": 0 }
        ],
        "output": "Number",
        "style": "math_blocks",
        "tooltip": "A number"
      });
    }
  };

  // Math constants
  Blockly.Blocks['math_constant'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1",
        "args0": [
          { "type": "field_dropdown", "name": "CONSTANT", "options": [
            ["π", "PI"], ["e", "E"], ["φ", "GOLDEN_RATIO"],
            ["√2", "SQRT2"], ["√½", "SQRT1_2"], ["∞", "INFINITY"]
          ]}
        ],
        "output": "Number",
        "style": "math_blocks",
        "tooltip": "Mathematical constants"
      });
    }
  };

  // Power
  Blockly.Blocks['math_power'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 ^ %2",
        "args0": [
          { "type": "input_value", "name": "BASE", "check": "Number" },
          { "type": "input_value", "name": "EXPONENT", "check": "Number" }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "math_blocks",
        "tooltip": "Power operation"
      });
    }
  };

  // Min/Max
  Blockly.Blocks['math_minmax'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 of %2 and %3",
        "args0": [
          { "type": "field_dropdown", "name": "OP", "options": [
            ["min", "MIN"], ["max", "MAX"]
          ]},
          { "type": "input_value", "name": "A", "check": "Number" },
          { "type": "input_value", "name": "B", "check": "Number" }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "math_blocks",
        "tooltip": "Return the minimum or maximum of two numbers"
      });
    }
  };

  // Constrain
  Blockly.Blocks['math_constrain'] = {
    init: function() {
      this.jsonInit({
        "message0": "constrain %1 low %2 high %3",
        "args0": [
          { "type": "input_value", "name": "VALUE", "check": "Number" },
          { "type": "input_value", "name": "LOW", "check": "Number" },
          { "type": "input_value", "name": "HIGH", "check": "Number" }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "math_blocks",
        "tooltip": "Constrain a number between two limits"
      });
    }
  };

  // Random fraction
  Blockly.Blocks['math_random_float'] = {
    init: function() {
      this.jsonInit({
        "message0": "random fraction",
        "output": "Number",
        "style": "math_blocks",
        "tooltip": "Random fraction between 0.0 (inclusive) and 1.0 (exclusive)"
      });
    }
  };

  // Is even/odd/prime/whole/positive/negative
  Blockly.Blocks['math_number_property'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 is %2",
        "args0": [
          { "type": "input_value", "name": "NUMBER", "check": "Number" },
          { "type": "field_dropdown", "name": "PROPERTY", "options": [
            ["even", "EVEN"], ["odd", "ODD"], 
            ["prime", "PRIME"], ["whole", "WHOLE"],
            ["positive", "POSITIVE"], ["negative", "NEGATIVE"]
          ]}
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "math_blocks",
        "tooltip": "Check if a number has a property"
      });
    }
  };

  // Atan2
  Blockly.Blocks['math_atan2'] = {
    init: function() {
      this.jsonInit({
        "message0": "atan2 Y:%1 X:%2",
        "args0": [
          { "type": "input_value", "name": "Y", "check": "Number" },
          { "type": "input_value", "name": "X", "check": "Number" }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "math_blocks",
        "tooltip": "Return the arctangent of y/x"
      });
    }
  };
};
