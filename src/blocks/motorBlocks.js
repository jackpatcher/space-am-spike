// Motor Blocks
export const registerMotorBlocks = (Blockly, icons) => {
  // motor.run(port, velocity)
  Blockly.Blocks['motor_run'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor port %2 run velocity %3",
        "args0": [
          { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "PORT", "options": [
            ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
          ]},
          { "type": "field_number", "name": "VELOCITY", "value": 360 }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "motion_blocks",
        "tooltip": "Run motor at velocity (deg/s)"
      });
    }
  };

  // Add more motor blocks here...
};
