// Control Flow Blocks
export const registerControlBlocks = (Blockly, icons) => {
  Blockly.Blocks['control_wait'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 wait %2 seconds",
        "args0": [
          { "type": "field_image", "src": icons.loop, "width": 20, "height": 20, "alt": "🔄" },
          { "type": "field_number", "name": "DURATION", "value": 1 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "control_blocks"
      });
    }
  };

  Blockly.Blocks['control_forever'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 forever %2",
        "args0": [
          { "type": "field_image", "src": icons.loop, "width": 20, "height": 20, "alt": "🔄" },
          { "type": "input_statement", "name": "SUBSTACK" }
        ],
        "previousStatement": null,
        "style": "control_blocks"
      });
    }
  };

  // Add more control blocks here...
};
