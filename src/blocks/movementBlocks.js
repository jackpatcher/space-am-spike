// Movement Blocks (for robots/vehicles)
export const registerMovementBlocks = (Blockly, icons) => {
  Blockly.Blocks['move_forward'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 move forward %2 cm",
        "args0": [
          { "type": "field_image", "src": icons.car, "width": 40, "height": 40, "alt": "car" },
          { "type": "input_value", "name": "DISTANCE", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "movement_blocks",
        "tooltip": "Move forward by distance"
      });
    }
  };

  Blockly.Blocks['move_backward'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 move backward %2 cm",
        "args0": [
          { "type": "field_image", "src": icons.car, "width": 40, "height": 40, "alt": "car" },
          { "type": "input_value", "name": "DISTANCE", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "movement_blocks",
        "tooltip": "Move backward by distance"
      });
    }
  };

  Blockly.Blocks['turn_left'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 turn left %2 degrees",
        "args0": [
          { "type": "field_image", "src": icons.car, "width": 40, "height": 40, "alt": "car" },
          { "type": "input_value", "name": "DEGREES", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "movement_blocks",
        "tooltip": "Turn left by degrees"
      });
    }
  };

  Blockly.Blocks['turn_right'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 turn right %2 degrees",
        "args0": [
          { "type": "field_image", "src": icons.car, "width": 40, "height": 40, "alt": "car" },
          { "type": "input_value", "name": "DEGREES", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "movement_blocks",
        "tooltip": "Turn right by degrees"
      });
    }
  };

  Blockly.Blocks['stop_moving'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 stop",
        "args0": [
          { "type": "field_image", "src": icons.car, "width": 40, "height": 40, "alt": "car" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "movement_blocks",
        "tooltip": "Stop all movement"
      });
    }
  };

  Blockly.Blocks['set_speed'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 set speed %2 %",
        "args0": [
          { "type": "field_image", "src": icons.car, "width": 40, "height": 40, "alt": "car" },
          { "type": "input_value", "name": "SPEED", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "movement_blocks",
        "tooltip": "Set movement speed (0-100%)"
      });
    }
  };

  // Add more movement blocks here...
};
