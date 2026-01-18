// Motor Blocks
export const registerMotorBlocks = (Blockly, icons) => {
  // motor.run(port, velocity)
  Blockly.Blocks['motor_run'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 run velocity %3",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]]},
          { "type": "field_number", "name": "VELOCITY", "value": 360 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "motion_blocks",
        "tooltip": "Run motor at velocity (deg/s)"
      });
    }
  };

  // motor.absolute_position(port)
  Blockly.Blocks['motor_absolute_position'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 absolute position",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": null,
        "style": "motion_blocks",
        "tooltip": "Get motor absolute position (deg)"
      });
    }
  };

  // motor.get_duty_cycle(port)
  Blockly.Blocks['motor_get_duty_cycle'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 get duty cycle",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": null,
        "style": "motion_blocks",
        "tooltip": "Get motor duty cycle (%)"
      });
    }
  };

  // motor.relative_position(port)
  Blockly.Blocks['motor_relative_position'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 relative position",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": null,
        "style": "motion_blocks",
        "tooltip": "Get motor relative position (deg)"
      });
    }
  };

  // motor.reset_relative_position(port, position)
  Blockly.Blocks['motor_reset_relative_position'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 reset relative position to %3",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "field_number", "name": "POSITION", "value": 0 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "motion_blocks",
        "tooltip": "Reset motor relative position (deg)"
      });
    }
  };

  // motor.run_for_degrees(port, degrees, velocity)
  Blockly.Blocks['motor_run_for_degrees'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 run for %3 deg at velocity %4",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "field_number", "name": "DEGREES", "value": 90 },
          { "type": "field_number", "name": "VELOCITY", "value": 360 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "motion_blocks",
        "tooltip": "Run motor for degrees at velocity"
      });
    }
  };

  // motor.run_for_time(port, duration, velocity)
  Blockly.Blocks['motor_run_for_time'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 run for %3 ms at velocity %4",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "field_number", "name": "DURATION", "value": 1000 },
          { "type": "field_number", "name": "VELOCITY", "value": 360 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "motion_blocks",
        "tooltip": "Run motor for time at velocity"
      });
    }
  };

  // motor.run_to_absolute_position(port, position, velocity)
  Blockly.Blocks['motor_run_to_absolute_position'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 run to abs pos %3 at velocity %4",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "field_number", "name": "POSITION", "value": 0 },
          { "type": "field_number", "name": "VELOCITY", "value": 360 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "motion_blocks",
        "tooltip": "Run motor to absolute position at velocity"
      });
    }
  };

  // motor.run_to_relative_position(port, position, velocity)
  Blockly.Blocks['motor_run_to_relative_position'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 run to rel pos %3 at velocity %4",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "field_number", "name": "POSITION", "value": 0 },
          { "type": "field_number", "name": "VELOCITY", "value": 360 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "motion_blocks",
        "tooltip": "Run motor to relative position at velocity"
      });
    }
  };

  // motor.set_duty_cycle(port, pwm)
  Blockly.Blocks['motor_set_duty_cycle'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 set duty cycle %3",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] },
          { "type": "field_number", "name": "PWM", "value": 50 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "motion_blocks",
        "tooltip": "Set motor duty cycle (PWM)"
      });
    }
  };

  // motor.stop(port)
  Blockly.Blocks['motor_stop'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 stop",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "motion_blocks",
        "tooltip": "Stop motor"
      });
    }
  };

  // motor.velocity(port)
  Blockly.Blocks['motor_velocity'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 velocity",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]] }
        ],
        "output": null,
        "style": "motion_blocks",
        "tooltip": "Get motor velocity (deg/s)"
      });
    }
  };
};
