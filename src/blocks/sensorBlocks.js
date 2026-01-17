// Sensor Blocks
export const registerSensorBlocks = (Blockly, icons) => {
  Blockly.Blocks['color_sensor'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 color sensor %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "sensor_blocks",
        "tooltip": "Read color sensor value"
      });
    }
  };

  Blockly.Blocks['distance_sensor'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 distance sensor %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "sensor_blocks",
        "tooltip": "Read distance sensor value"
      });
    }
  };

  Blockly.Blocks['force_sensor'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 force sensor %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "sensor_blocks",
        "tooltip": "Read force sensor value"
      });
    }
  };

  Blockly.Blocks['touch_sensor'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 touch sensor %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "style": "sensor_blocks",
        "tooltip": "Check if touch sensor is pressed"
      });
    }
  };

  // Add more sensor blocks here...
};
