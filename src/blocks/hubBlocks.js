// Hub Blocks (LED, Display, Speaker)
export const registerHubBlocks = (Blockly, icons) => {
  // 1. button.pressed(button)
  Blockly.Blocks['hub_button_pressed'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 button pressed %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "BUTTON", "options": [["Left", "LEFT"], ["Right", "RIGHT"]] }
        ],
        "output": "Number",
        "style": "hub_blocks",
        "tooltip": "Get button pressed duration"
      });
    }
  };

  // 2. light.color(light, color)
  Blockly.Blocks['hub_light_color'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 light color %2 %3",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "LIGHT", "options": [["Power", "POWER"], ["Connect", "CONNECT"]] },
          { "type": "field_dropdown", "name": "COLOR", "options": [["Black", "BLACK"], ["Magenta", "MAGENTA"], ["Blue", "BLUE"], ["Azure", "AZURE"], ["Green", "GREEN"], ["Yellow", "YELLOW"], ["Orange", "ORANGE"], ["Red", "RED"], ["White", "WHITE"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Set hub light color"
      });
    }
  };

  // 3. light_matrix.clear()
  Blockly.Blocks['hub_light_matrix_clear'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 light matrix clear",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Clear light matrix"
      });
    }
  };

  // 4. light_matrix.get_orientation()
  Blockly.Blocks['hub_light_matrix_get_orientation'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 light matrix get orientation",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "output": "Number",
        "style": "hub_blocks",
        "tooltip": "Get light matrix orientation"
      });
    }
  };

  // 5. light_matrix.get_pixel(x, y)
  Blockly.Blocks['hub_light_matrix_get_pixel'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 light matrix get pixel x %2 y %3",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "input_value", "name": "X", "check": "Number" },
          { "type": "input_value", "name": "Y", "check": "Number" }
        ],
        "output": "Number",
        "style": "hub_blocks",
        "tooltip": "Get light matrix pixel value"
      });
    }
  };

  // 6. light_matrix.set_orientation(top)
  Blockly.Blocks['hub_light_matrix_set_orientation'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 light matrix set orientation %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "TOP", "options": [["Up", "UP"], ["Right", "RIGHT"], ["Down", "DOWN"], ["Left", "LEFT"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Set light matrix orientation"
      });
    }
  };

  // 7. light_matrix.set_pixel(x, y, intensity)
  Blockly.Blocks['hub_light_matrix_set_pixel'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 light matrix set pixel x %2 y %3 value %4",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "input_value", "name": "X", "check": "Number" },
          { "type": "input_value", "name": "Y", "check": "Number" },
          { "type": "input_value", "name": "INTENSITY", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Set light matrix pixel value"
      });
    }
  };

  // 8. light_matrix.show(pixels)
  Blockly.Blocks['hub_light_matrix_show'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 light matrix show pixels %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "input_value", "name": "PIXELS", "check": "Array" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Show all light matrix pixels"
      });
    }
  };

  // 9. light_matrix.show_image(image)
  Blockly.Blocks['hub_light_matrix_show_image'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 light matrix show image %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "IMAGE", "options": [["Happy", "IMAGE_HAPPY"], ["Smile", "IMAGE_SMILE"], ["Sad", "IMAGE_SAD"], ["Confused", "IMAGE_CONFUSED"], ["Angry", "IMAGE_ANGRY"], ["Asleep", "IMAGE_ASLEEP"], ["Surprised", "IMAGE_SURPRISED"], ["Silly", "IMAGE_SILLY"], ["Fabulous", "IMAGE_FABULOUS"], ["Meh", "IMAGE_MEH"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Show image on light matrix"
      });
    }
  };

  // 10. light_matrix.write(text, intensity, time_per_character)
  Blockly.Blocks['hub_light_matrix_write'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 light matrix write %2 intensity %3 time %4",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "input_value", "name": "TEXT", "check": "String" },
          { "type": "input_value", "name": "INTENSITY", "check": "Number" },
          { "type": "input_value", "name": "TIME", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Write text on light matrix"
      });
    }
  };

  // 11. motion_sensor.acceleration(raw_unfiltered)
  Blockly.Blocks['hub_motion_sensor_acceleration'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motion sensor acceleration raw %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_checkbox", "name": "RAW", "checked": false }
        ],
        "output": "Array",
        "style": "hub_blocks",
        "tooltip": "Get acceleration values"
      });
    }
  };

  // 12. motion_sensor.angular_velocity(raw_unfiltered)
  Blockly.Blocks['hub_motion_sensor_angular_velocity'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motion sensor angular velocity raw %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_checkbox", "name": "RAW", "checked": false }
        ],
        "output": "Array",
        "style": "hub_blocks",
        "tooltip": "Get angular velocity values"
      });
    }
  };

  // 13. motion_sensor.gesture()
  Blockly.Blocks['hub_motion_sensor_gesture'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motion sensor gesture",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "output": "Number",
        "style": "hub_blocks",
        "tooltip": "Get gesture value"
      });
    }
  };

  // 14. motion_sensor.get_yaw_face()
  Blockly.Blocks['hub_motion_sensor_get_yaw_face'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motion sensor get yaw face",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "output": "Number",
        "style": "hub_blocks",
        "tooltip": "Get yaw face"
      });
    }
  };

  // 15. motion_sensor.quaternion()
  Blockly.Blocks['hub_motion_sensor_quaternion'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motion sensor quaternion",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "output": "Array",
        "style": "hub_blocks",
        "tooltip": "Get quaternion values"
      });
    }
  };

  // 16. motion_sensor.reset_tap_count()
  Blockly.Blocks['hub_motion_sensor_reset_tap_count'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motion sensor reset tap count",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Reset tap count"
      });
    }
  };

  // 17. motion_sensor.reset_yaw(angle)
  Blockly.Blocks['hub_motion_sensor_reset_yaw'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motion sensor reset yaw %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "input_value", "name": "ANGLE", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Reset yaw angle"
      });
    }
  };

  // 18. motion_sensor.set_yaw_face(up)
  Blockly.Blocks['hub_motion_sensor_set_yaw_face'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motion sensor set yaw face %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "UP", "options": [["Top", "TOP"], ["Front", "FRONT"], ["Right", "RIGHT"], ["Bottom", "BOTTOM"], ["Back", "BACK"], ["Left", "LEFT"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Set yaw face"
      });
    }
  };

  // 19. motion_sensor.stable()
  Blockly.Blocks['hub_motion_sensor_stable'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motion sensor stable",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "output": "Boolean",
        "style": "hub_blocks",
        "tooltip": "Check if hub is stable"
      });
    }
  };

  // 20. motion_sensor.tap_count()
  Blockly.Blocks['hub_motion_sensor_tap_count'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motion sensor tap count",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "output": "Number",
        "style": "hub_blocks",
        "tooltip": "Get tap count"
      });
    }
  };
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

  // 21. motion_sensor.tilt_angles()
  Blockly.Blocks['hub_motion_sensor_tilt_angles'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motion sensor tilt angles",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "output": "Array",
        "style": "hub_blocks",
        "tooltip": "Get tilt angles (pitch, roll)"
      });
    }
  };

  // 22. motion_sensor.up_face()
  Blockly.Blocks['hub_motion_sensor_up_face'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motion sensor up face",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "output": "String",
        "style": "hub_blocks",
        "tooltip": "Get up face direction"
      });
    }
  };

  // 23. sound.beep(freq, duration, volume)
  Blockly.Blocks['hub_sound_beep'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 sound beep freq %2 duration %3 volume %4",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "input_value", "name": "FREQ", "check": "Number" },
          { "type": "input_value", "name": "DURATION", "check": "Number" },
          { "type": "input_value", "name": "VOLUME", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Play beep sound"
      });
    }
  };

  // 24. sound.stop()
  Blockly.Blocks['hub_sound_stop'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 sound stop",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Stop sound playback"
      });
    }
  };

  // 25. sound.volume(volume)
  Blockly.Blocks['hub_sound_volume'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 sound set volume %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "input_value", "name": "VOLUME", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Set sound volume"
      });
    }
  };

  // 26. device_uuid()
  Blockly.Blocks['hub_device_uuid'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 device uuid",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "output": "String",
        "style": "hub_blocks",
        "tooltip": "Get device UUID"
      });
    }
  };

  // 27. hardware_id()
  Blockly.Blocks['hub_hardware_id'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 hardware id",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "output": "String",
        "style": "hub_blocks",
        "tooltip": "Get hardware ID"
      });
    }
  };

  // 28. power_off()
  Blockly.Blocks['hub_power_off'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 power off",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Power off hub"
      });
    }
  };

  // 29. temperature()
  Blockly.Blocks['hub_temperature'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 temperature",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" }
        ],
        "output": "Number",
        "style": "hub_blocks",
        "tooltip": "Get hub temperature (°C)"
      });
    }
  };

  // 30. motor_pair.move(pair, steering, ...)
  Blockly.Blocks['hub_motor_pair_move'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor pair %2 move steering %3",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "PAIR", "options": [["A+B", "A+B"], ["C+D", "C+D"]] },
          { "type": "input_value", "name": "STEERING", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Move motor pair with steering"
      });
    }
  };

  // 31. motor_pair.move_for_degrees(pair, degrees, steering, ...)
  Blockly.Blocks['hub_motor_pair_move_for_degrees'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor pair %2 move for %3 deg steering %4",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "PAIR", "options": [["A+B", "A+B"], ["C+D", "C+D"]] },
          { "type": "field_number", "name": "DEGREES", "value": 90 },
          { "type": "input_value", "name": "STEERING", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Move motor pair for degrees with steering"
      });
    }
  };

  // 32. motor_pair.move_for_time(pair, duration, steering, ...)
  Blockly.Blocks['hub_motor_pair_move_for_time'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor pair %2 move for %3 ms steering %4",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "PAIR", "options": [["A+B", "A+B"], ["C+D", "C+D"]] },
          { "type": "field_number", "name": "DURATION", "value": 1000 },
          { "type": "input_value", "name": "STEERING", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Move motor pair for time with steering"
      });
    }
  };

  // 33. motor_pair.move_tank(pair, left_velocity, right_velocity, ...)
  Blockly.Blocks['hub_motor_pair_move_tank'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor pair %2 move tank left %3 right %4",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "PAIR", "options": [["A+B", "A+B"], ["C+D", "C+D"]] },
          { "type": "input_value", "name": "LEFT", "check": "Number" },
          { "type": "input_value", "name": "RIGHT", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Move tank with left/right velocity"
      });
    }
  };

  // 34. motor_pair.move_tank_for_degrees(pair, degrees, left_velocity, right_velocity, ...)
  Blockly.Blocks['hub_motor_pair_move_tank_for_degrees'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor pair %2 move tank for %3 deg left %4 right %5",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "PAIR", "options": [["A+B", "A+B"], ["C+D", "C+D"]] },
          { "type": "field_number", "name": "DEGREES", "value": 90 },
          { "type": "input_value", "name": "LEFT", "check": "Number" },
          { "type": "input_value", "name": "RIGHT", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Move tank for degrees with left/right velocity"
      });
    }
  };

  // 35. motor_pair.move_tank_for_time(pair, left_velocity, right_velocity, duration, ...)
  Blockly.Blocks['hub_motor_pair_move_tank_for_time'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor pair %2 move tank for %3 ms left %4 right %5",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "PAIR", "options": [["A+B", "A+B"], ["C+D", "C+D"]] },
          { "type": "field_number", "name": "DURATION", "value": 1000 },
          { "type": "input_value", "name": "LEFT", "check": "Number" },
          { "type": "input_value", "name": "RIGHT", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Move tank for time with left/right velocity"
      });
    }
  };

  // 36. motor_pair.pair(pair, left_motor, right_motor)
  Blockly.Blocks['hub_motor_pair_pair'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor pair %2 pair left %3 right %4",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "PAIR", "options": [["A+B", "A+B"], ["C+D", "C+D"]] },
          { "type": "field_dropdown", "name": "LEFT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"]] },
          { "type": "field_dropdown", "name": "RIGHT", "options": [["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Pair two motors as a motor pair"
      });
    }
  };

  // 37. motor_pair.stop(pair, ...)
  Blockly.Blocks['hub_motor_pair_stop'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor pair %2 stop",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "PAIR", "options": [["A+B", "A+B"], ["C+D", "C+D"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Stop motor pair"
      });
    }
  };

  // 38. motor_pair.unpair(pair)
  Blockly.Blocks['hub_motor_pair_unpair'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 motor pair %2 unpair",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "field_dropdown", "name": "PAIR", "options": [["A+B", "A+B"], ["C+D", "C+D"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Unpair motor pair"
      });
    }
  };

  // 39. runloop.run(*functions)
  Blockly.Blocks['hub_runloop_run'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 runloop run functions %2",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "input_value", "name": "FUNCTIONS", "check": "Array" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Run multiple functions in runloop"
      });
    }
  };

  // 40. runloop.sleep_ms(duration)
  Blockly.Blocks['hub_runloop_sleep_ms'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 runloop sleep %2 ms",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "input_value", "name": "DURATION", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Sleep for duration in ms"
      });
    }
  };

  // 41. runloop.until(function, timeout)
  Blockly.Blocks['hub_runloop_until'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 runloop until function %2 timeout %3 ms",
        "args0": [
          { "type": "field_image", "src": icons.hub, "width": 40, "height": 40, "alt": "hub" },
          { "type": "input_value", "name": "FUNCTION", "check": "Function" },
          { "type": "input_value", "name": "TIMEOUT", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "hub_blocks",
        "tooltip": "Run until function returns true or timeout"
      });
    }
  };
};
