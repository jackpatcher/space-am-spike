// Hub Blocks (LED, Display, Speaker)
export const registerHubBlocks = (Blockly, icons) => {
  Blockly.Blocks['hub_light_matrix'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 show %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "input_value", "name": "MATRIX" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Display pattern on LED matrix"
      });
    }
  };

  Blockly.Blocks['hub_display'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 display %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "input_value", "name": "TEXT", "check": "String" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Display text on hub screen"
      });
    }
  };

  Blockly.Blocks['hub_speaker'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 play sound %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "SOUND", "options": [["Beep", "BEEP"], ["Alert", "ALERT"], ["Fanfare", "FANFARE"]] }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Play sound from hub speaker"
      });
    }
  };

  Blockly.Blocks['hub_led_color'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 LED color %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_colour", "name": "COLOR", "colour": "#ff0000" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Set hub LED color"
      });
    }
  };

  // Add more hub blocks here...
};
