// Sensor Blocks
export const registerSensorBlocks = (Blockly, icons) => {
  // 1. color_matrix.clear(port)
  Blockly.Blocks['color_matrix_clear'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 color matrix clear %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensor_blocks",
        "tooltip": "Clear color matrix"
      });
    }
  };

  // 2. color_matrix.get_pixel(port, x, y)
  Blockly.Blocks['color_matrix_get_pixel'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 color matrix get pixel %2 x %3 y %4",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "input_value", "name": "X", "check": "Number" },
          { "type": "input_value", "name": "Y", "check": "Number" }
        ],
        "output": "Array",
        "style": "sensor_blocks",
        "tooltip": "Get color matrix pixel value"
      });
    }
  };

  // 3. color_matrix.set_pixel(port, x, y, (color, intensity))
  Blockly.Blocks['color_matrix_set_pixel'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 color matrix set pixel %2 x %3 y %4 value %5",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "input_value", "name": "X", "check": "Number" },
          { "type": "input_value", "name": "Y", "check": "Number" },
          { "type": "input_value", "name": "PIXEL", "check": "Array" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensor_blocks",
        "tooltip": "Set color matrix pixel value"
      });
    }
  };

  // 4. color_matrix.show(port, pixels)
  Blockly.Blocks['color_matrix_show'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 color matrix show %2 pixels %3",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "input_value", "name": "PIXELS", "check": "Array" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensor_blocks",
        "tooltip": "Show all color matrix pixels"
      });
    }
  };

  // 5. color_sensor.reflection(port)
  Blockly.Blocks['color_sensor_reflection'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 color sensor reflection %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": "Number",
        "style": "sensor_blocks",
        "tooltip": "Get color sensor reflection"
      });
    }
  };

  // 6. color_sensor.rgbi(port)
  Blockly.Blocks['color_sensor_rgbi'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 color sensor rgbi %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": "Array",
        "style": "sensor_blocks",
        "tooltip": "Get color sensor RGBI values"
      });
    }
  };

  // 7. device.data(port)
  Blockly.Blocks['device_data'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 device data %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": "Array",
        "style": "sensor_blocks",
        "tooltip": "Get device data"
      });
    }
  };

  // 8. device.id(port)
  Blockly.Blocks['device_id'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 device id %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": "Number",
        "style": "sensor_blocks",
        "tooltip": "Get device id"
      });
    }
  };

  // 9. device.get_duty_cycle(port)
  Blockly.Blocks['device_get_duty_cycle'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 device get duty cycle %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": "Number",
        "style": "sensor_blocks",
        "tooltip": "Get device duty cycle"
      });
    }
  };

  // 10. device.ready(port)
  Blockly.Blocks['device_ready'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 device ready %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": "Boolean",
        "style": "sensor_blocks",
        "tooltip": "Check if device is ready"
      });
    }
  };

  // 11. device.set_duty_cycle(port, duty_cycle)
  Blockly.Blocks['device_set_duty_cycle'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 device set duty cycle %2 value %3",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "input_value", "name": "DUTY", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensor_blocks",
        "tooltip": "Set device duty cycle"
      });
    }
  };

  // 12. distance_sensor.clear(port)
  Blockly.Blocks['distance_sensor_clear'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 distance sensor clear %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensor_blocks",
        "tooltip": "Clear distance sensor"
      });
    }
  };

  // 13. distance_sensor.distance(port)
  Blockly.Blocks['distance_sensor_distance'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 distance sensor distance %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": "Number",
        "style": "sensor_blocks",
        "tooltip": "Get distance sensor value"
      });
    }
  };

  // 14. distance_sensor.get_pixel(port, x, y)
  Blockly.Blocks['distance_sensor_get_pixel'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 distance sensor get pixel %2 x %3 y %4",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "input_value", "name": "X", "check": "Number" },
          { "type": "input_value", "name": "Y", "check": "Number" }
        ],
        "output": "Number",
        "style": "sensor_blocks",
        "tooltip": "Get distance sensor pixel value"
      });
    }
  };

  // 15. distance_sensor.set_pixel(port, x, y, intensity)
  Blockly.Blocks['distance_sensor_set_pixel'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 distance sensor set pixel %2 x %3 y %4 value %5",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "input_value", "name": "X", "check": "Number" },
          { "type": "input_value", "name": "Y", "check": "Number" },
          { "type": "input_value", "name": "INTENSITY", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensor_blocks",
        "tooltip": "Set distance sensor pixel value"
      });
    }
  };

  // 16. distance_sensor.show(port, pixels)
  Blockly.Blocks['distance_sensor_show'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 distance sensor show %2 pixels %3",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "input_value", "name": "PIXELS", "check": "Array" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "sensor_blocks",
        "tooltip": "Show all distance sensor pixels"
      });
    }
  };

  // 17. force_sensor.force(port)
  Blockly.Blocks['force_sensor_force'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 force sensor force %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": "Number",
        "style": "sensor_blocks",
        "tooltip": "Get force sensor value"
      });
    }
  };

  // 18. force_sensor.pressed(port)
  Blockly.Blocks['force_sensor_pressed'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 force sensor pressed %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": "Boolean",
        "style": "sensor_blocks",
        "tooltip": "Check if force sensor is pressed"
      });
    }
  };

  // 19. force_sensor.raw(port)
  Blockly.Blocks['force_sensor_raw'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 force sensor raw %2",
        "args0": [
          { "type": "field_image", "src": icons.sensor, "width": 40, "height": 40, "alt": "sensor" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": "Number",
        "style": "sensor_blocks",
        "tooltip": "Get force sensor raw value"
      });
    }
  };
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
