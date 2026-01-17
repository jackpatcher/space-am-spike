import React, { useState, useEffect, useRef } from 'react';
import { Settings, Play, Square, Zap, FileJson, Move, Flag, Repeat, Usb, Upload, CheckCircle, XCircle, Home, Save, FolderPlus, Download } from 'lucide-react';
import { icons } from './config/icons';
import { createScratchTheme } from './config/theme';
import { boards } from './config/boards';
import { registerAllBlocks } from './blocks';

// Suppress Blockly deprecation warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('getAllVariables was deprecated')) {
    return; // Suppress this specific warning
  }
  originalWarn.apply(console, args);
};

const App = () => {
  const blocklyDivRef = useRef(null);
  const [status, setStatus] = useState("กำลังเตรียมระบบ...");
  const [isReady, setIsReady] = useState(false);
  const [pythonCode, setPythonCode] = useState("# โค้ด Python จะแสดงที่นี่");
  const workspaceRef = useRef(null);
  
  // Serial Connection State
  const [isConnected, setIsConnected] = useState(false);
  const [port, setPort] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState('esp32');
  const [baudRate, setBaudRate] = useState(115200);
  
  const boards = [
    { id: 'esp32', name: 'ESP32', color: '#4C97FF', baudRate: 115200 },
    { id: 'arduino', name: 'Arduino Uno/Nano', color: '#00979D', baudRate: 9600 },
    { id: 'pico', name: 'Raspberry Pi Pico', color: '#C51A4A', baudRate: 115200 },
    { id: 'microbit', name: 'micro:bit', color: '#00ED00', baudRate: 115200 },
    { id: 'spike', name: 'LEGO SPIKE Prime', color: '#FFAB19', baudRate: 115200 },
  ];

  const generatePythonCode = (workspace) => {
    let code = "from app import bargraph, display, linegraph, music, sound\n" +
               "import color\n" +
               "import color_matrix\n" +
               "import color_sensor\n" +
               "import distance_sensor\n" +
               "import force_sensor\n" +
               "import hub\n" +
               "from hub import port\n" +
               "import motor\n" +
               "import motor_pair\n" +
               "import runloop\n" +
               "import random\n" +
               "import math\n\n";
    
    const getInputValue = (block, inputName, defaultValue = '0') => {
      const input = block.getInputTargetBlock(inputName);
      return input ? processBlock(input).trim() : defaultValue;
    };
    
    const processBlock = (block) => {
      if (!block) return "";
      let line = "";
      const type = block.type;
      
      // Event Blocks
      if (type === 'event_whenflagclicked') {
        line = "async def main():\n";
      }
      
      // App.Bargraph Blocks
      else if (type === 'app_bargraph_change') {
        const color = block.getFieldValue('COLOR');
        const value = getInputValue(block, 'VALUE', '0');
        line = `bargraph.change(color.${color}, ${value})\n`;
      }
      else if (type === 'app_bargraph_clear_all') {
        line = "bargraph.clear_all()\n";
      }
      else if (type === 'app_bargraph_get_value') {
        const color = block.getFieldValue('COLOR');
        line = `bargraph.get_value(color.${color})`;
      }
      else if (type === 'app_bargraph_set_value') {
        const color = block.getFieldValue('COLOR');
        const value = getInputValue(block, 'VALUE', '0');
        line = `bargraph.set_value(color.${color}, ${value})\n`;
      }
      else if (type === 'app_bargraph_show') {
        const fullscreen = block.getFieldValue('FULLSCREEN') === 'TRUE';
        line = `bargraph.show(${fullscreen})\n`;
      }
      else if (type === 'app_bargraph_hide') {
        line = "bargraph.hide()\n";
      }
      
      // App.Display Blocks
      else if (type === 'app_display_image') {
        const image = block.getFieldValue('IMAGE');
        line = `display.image(display.${image})\n`;
      }
      else if (type === 'app_display_text') {
        const text = getInputValue(block, 'TEXT', '""');
        line = `display.text(${text})\n`;
      }
      else if (type === 'app_display_show') {
        const fullscreen = block.getFieldValue('FULLSCREEN') === 'TRUE';
        line = `display.show(${fullscreen})\n`;
      }
      else if (type === 'app_display_hide') {
        line = "display.hide()\n";
      }
      
      // App.Linegraph Blocks
      else if (type === 'app_linegraph_clear') {
        const color = block.getFieldValue('COLOR');
        line = `linegraph.clear(color.${color})\n`;
      }
      else if (type === 'app_linegraph_clear_all') {
        line = "linegraph.clear_all()\n";
      }
      else if (type === 'app_linegraph_get_average') {
        const color = block.getFieldValue('COLOR');
        line = `linegraph.get_average(color.${color})`;
      }
      else if (type === 'app_linegraph_get_last') {
        const color = block.getFieldValue('COLOR');
        line = `linegraph.get_last(color.${color})`;
      }
      else if (type === 'app_linegraph_get_max') {
        const color = block.getFieldValue('COLOR');
        line = `linegraph.get_max(color.${color})`;
      }
      else if (type === 'app_linegraph_get_min') {
        const color = block.getFieldValue('COLOR');
        line = `linegraph.get_min(color.${color})`;
      }
      else if (type === 'app_linegraph_hide') {
        line = "linegraph.hide()\n";
      }
      else if (type === 'app_linegraph_plot') {
        const color = block.getFieldValue('COLOR');
        const x = getInputValue(block, 'X', '0');
        const y = getInputValue(block, 'Y', '0');
        line = `linegraph.plot(color.${color}, ${x}, ${y})\n`;
      }
      else if (type === 'app_linegraph_show') {
        const fullscreen = block.getFieldValue('FULLSCREEN') === 'TRUE';
        line = `linegraph.show(${fullscreen})\n`;
      }
      
      // App.Music Blocks
      else if (type === 'app_music_play_drum') {
        const drum = block.getFieldValue('DRUM');
        line = `music.play_drum(music.${drum})\n`;
      }
      else if (type === 'app_music_play_instrument') {
        const instrument = block.getFieldValue('INSTRUMENT');
        const note = getInputValue(block, 'NOTE', '60');
        const duration = getInputValue(block, 'DURATION', '500');
        line = `music.play_instrument(music.${instrument}, ${note}, ${duration})\n`;
      }
      
      // App.Sound Blocks
      else if (type === 'app_sound_play') {
        const soundName = getInputValue(block, 'SOUND', '""');
        const volume = getInputValue(block, 'VOLUME', '100');
        line = `await sound.play(${soundName}, ${volume})\n`;
      }
      else if (type === 'app_sound_set_attributes') {
        const volume = getInputValue(block, 'VOLUME', '100');
        const pitch = getInputValue(block, 'PITCH', '0');
        const pan = getInputValue(block, 'PAN', '0');
        line = `sound.set_attributes(${volume}, ${pitch}, ${pan})\n`;
      }
      else if (type === 'app_sound_stop') {
        line = "sound.stop()\n";
      }
      
      // Color Matrix Blocks
      else if (type === 'color_matrix_clear') {
        const portVal = block.getFieldValue('PORT');
        line = `color_matrix.clear(port.${portVal})\n`;
      }
      else if (type === 'color_matrix_get_pixel') {
        const portVal = block.getFieldValue('PORT');
        const x = block.getFieldValue('X');
        const y = block.getFieldValue('Y');
        line = `color_matrix.get_pixel(port.${portVal}, ${x}, ${y})`;
      }
      else if (type === 'color_matrix_set_pixel') {
        const portVal = block.getFieldValue('PORT');
        const x = block.getFieldValue('X');
        const y = block.getFieldValue('Y');
        const colorVal = block.getFieldValue('COLOR');
        const intensity = block.getFieldValue('INTENSITY');
        line = `color_matrix.set_pixel(port.${portVal}, ${x}, ${y}, (color.${colorVal}, ${intensity}))\n`;
      }
      else if (type === 'color_matrix_show') {
        const portVal = block.getFieldValue('PORT');
        const pixels = getInputValue(block, 'PIXELS', '[]');
        line = `color_matrix.show(port.${portVal}, ${pixels})\n`;
      }
      
      // Color Sensor Blocks
      else if (type === 'color_sensor_color') {
        const portVal = block.getFieldValue('PORT');
        line = `color_sensor.color(port.${portVal})`;
      }
      else if (type === 'color_sensor_reflection') {
        const portVal = block.getFieldValue('PORT');
        line = `color_sensor.reflection(port.${portVal})`;
      }
      
      // Distance Sensor Blocks (31-35)
      else if (type === 'distance_sensor_clear') {
        const portVal = block.getFieldValue('PORT');
        line = `distance_sensor.clear(port.${portVal})\n`;
      }
      else if (type === 'distance_sensor_distance') {
        const portVal = block.getFieldValue('PORT');
        line = `distance_sensor.distance(port.${portVal})`;
      }
      else if (type === 'distance_sensor_get_pixel') {
        const portVal = block.getFieldValue('PORT');
        const x = block.getFieldValue('X');
        const y = block.getFieldValue('Y');
        line = `distance_sensor.get_pixel(port.${portVal}, ${x}, ${y})`;
      }
      else if (type === 'distance_sensor_set_pixel') {
        const portVal = block.getFieldValue('PORT');
        const x = block.getFieldValue('X');
        const y = block.getFieldValue('Y');
        const intensity = block.getFieldValue('INTENSITY');
        line = `distance_sensor.set_pixel(port.${portVal}, ${x}, ${y}, ${intensity})\n`;
      }
      else if (type === 'distance_sensor_show') {
        const portVal = block.getFieldValue('PORT');
        const pixels = getInputValue(block, 'PIXELS', '[]');
        line = `distance_sensor.show(port.${portVal}, ${pixels})\n`;
      }
      
      // Force Sensor Blocks (36-38)
      else if (type === 'force_sensor_force') {
        const portVal = block.getFieldValue('PORT');
        line = `force_sensor.force(port.${portVal})`;
      }
      else if (type === 'force_sensor_pressed') {
        const portVal = block.getFieldValue('PORT');
        line = `force_sensor.pressed(port.${portVal})`;
      }
      else if (type === 'force_sensor_raw') {
        const portVal = block.getFieldValue('PORT');
        line = `force_sensor.raw(port.${portVal})`;
      }
      
      // Hub.device Blocks (39-42)
      else if (type === 'hub_device_uuid') {
        line = `hub.device.device_uuid()`;
      }
      else if (type === 'hub_hardware_id') {
        line = `hub.device.hardware_id()`;
      }
      else if (type === 'hub_temperature') {
        line = `hub.device.temperature()`;
      }
      else if (type === 'hub_power_off') {
        const fast = block.getFieldValue('FAST') === 'TRUE';
        line = `hub.device.power_off(${fast})\n`;
      }
      
      // Hub.button Blocks (43)
      else if (type === 'hub_button_pressed') {
        const button = block.getFieldValue('BUTTON');
        line = `hub.button.${button}.pressed()`;
      }
      
      // Hub.light Blocks (44)
      else if (type === 'hub_light_color') {
        const colorVal = block.getFieldValue('COLOR');
        line = `hub.light.color(hub.light.${colorVal})\n`;
      }
      
      // Hub.light_matrix Blocks (45-52)
      else if (type === 'hub_light_matrix_clear') {
        line = `hub.light_matrix.clear()\n`;
      }
      else if (type === 'hub_light_matrix_get_orientation') {
        line = `hub.light_matrix.get_orientation()`;
      }
      else if (type === 'hub_light_matrix_get_pixel') {
        const x = block.getFieldValue('X');
        const y = block.getFieldValue('Y');
        line = `hub.light_matrix.get_pixel(${x}, ${y})`;
      }
      else if (type === 'hub_light_matrix_set_orientation') {
        const orientation = block.getFieldValue('ORIENTATION');
        line = `hub.light_matrix.set_orientation(hub.light_matrix.${orientation})\n`;
      }
      else if (type === 'hub_light_matrix_set_pixel') {
        const x = block.getFieldValue('X');
        const y = block.getFieldValue('Y');
        const brightness = block.getFieldValue('BRIGHTNESS');
        line = `hub.light_matrix.set_pixel(${x}, ${y}, ${brightness})\n`;
      }
      else if (type === 'hub_light_matrix_show') {
        const pixels = getInputValue(block, 'PIXELS', '[]');
        line = `hub.light_matrix.show(${pixels})\n`;
      }
      else if (type === 'hub_light_matrix_show_image') {
        const image = block.getFieldValue('IMAGE');
        line = `hub.light_matrix.show_image(hub.Image.${image})\n`;
      }
      else if (type === 'hub_light_matrix_write') {
        const text = getInputValue(block, 'TEXT', '""');
        line = `hub.light_matrix.write(${text})\n`;
      }
      
      // Hub.motion_sensor Blocks (53-64)
      else if (type === 'hub_motion_acceleration') {
        const raw = block.getFieldValue('RAW') === 'TRUE';
        line = `hub.motion_sensor.acceleration(${raw})`;
      }
      else if (type === 'hub_motion_angular_velocity') {
        const raw = block.getFieldValue('RAW') === 'TRUE';
        line = `hub.motion_sensor.angular_velocity(${raw})`;
      }
      else if (type === 'hub_motion_gesture') {
        line = `hub.motion_sensor.gesture()`;
      }
      else if (type === 'hub_motion_get_yaw_face') {
        line = `hub.motion_sensor.get_yaw_face()`;
      }
      else if (type === 'hub_motion_quaternion') {
        line = `hub.motion_sensor.quaternion()`;
      }
      else if (type === 'hub_motion_reset_tap_count') {
        line = `hub.motion_sensor.reset_tap_count()\n`;
      }
      else if (type === 'hub_motion_reset_yaw') {
        const angle = block.getFieldValue('ANGLE');
        line = `hub.motion_sensor.reset_yaw(${angle})\n`;
      }
      else if (type === 'hub_motion_set_yaw_face') {
        const face = block.getFieldValue('FACE');
        line = `hub.motion_sensor.set_yaw_face(hub.motion_sensor.${face})\n`;
      }
      else if (type === 'hub_motion_stable') {
        line = `hub.motion_sensor.stable()`;
      }
      else if (type === 'hub_motion_tap_count') {
        line = `hub.motion_sensor.tap_count()`;
      }
      else if (type === 'hub_motion_tilt_angles') {
        line = `hub.motion_sensor.tilt_angles()`;
      }
      else if (type === 'hub_motion_up_face') {
        line = `hub.motion_sensor.up_face()`;
      }
      
      // Hub.sound Blocks (65-67)
      else if (type === 'hub_sound_beep') {
        const frequency = block.getFieldValue('FREQUENCY');
        const duration = block.getFieldValue('DURATION');
        const waveform = block.getFieldValue('WAVEFORM');
        line = `await hub.sound.beep(${frequency}, ${duration}, hub.sound.${waveform})\n`;
      }
      else if (type === 'hub_sound_stop') {
        line = `hub.sound.stop()\n`;
      }
      else if (type === 'hub_sound_volume') {
        const volume = block.getFieldValue('VOLUME');
        line = `hub.sound.volume(${volume})\n`;
      }
      
      // Motor Blocks (68-79)
      else if (type === 'motor_absolute_position') {
        const portVal = block.getFieldValue('PORT');
        line = `motor.absolute_position(port.${portVal})`;
      }
      else if (type === 'motor_relative_position') {
        const portVal = block.getFieldValue('PORT');
        line = `motor.relative_position(port.${portVal})`;
      }
      else if (type === 'motor_reset_relative_position') {
        const portVal = block.getFieldValue('PORT');
        const position = block.getFieldValue('POSITION');
        line = `motor.reset_relative_position(port.${portVal}, ${position})\n`;
      }
      else if (type === 'motor_run') {
        const portVal = block.getFieldValue('PORT');
        const velocity = block.getFieldValue('VELOCITY');
        line = `motor.run(port.${portVal}, ${velocity})\n`;
      }
      else if (type === 'motor_run_for_degrees') {
        const portVal = block.getFieldValue('PORT');
        const degrees = block.getFieldValue('DEGREES');
        const velocity = block.getFieldValue('VELOCITY');
        line = `await motor.run_for_degrees(port.${portVal}, ${degrees}, ${velocity})\n`;
      }
      else if (type === 'motor_run_for_time') {
        const portVal = block.getFieldValue('PORT');
        const duration = block.getFieldValue('DURATION');
        const velocity = block.getFieldValue('VELOCITY');
        line = `await motor.run_for_time(port.${portVal}, ${duration}, ${velocity})\n`;
      }
      else if (type === 'motor_run_to_absolute_position') {
        const portVal = block.getFieldValue('PORT');
        const position = block.getFieldValue('POSITION');
        const velocity = block.getFieldValue('VELOCITY');
        line = `await motor.run_to_absolute_position(port.${portVal}, ${position}, ${velocity})\n`;
      }
      else if (type === 'motor_run_to_relative_position') {
        const portVal = block.getFieldValue('PORT');
        const position = block.getFieldValue('POSITION');
        const velocity = block.getFieldValue('VELOCITY');
        line = `await motor.run_to_relative_position(port.${portVal}, ${position}, ${velocity})\n`;
      }
      else if (type === 'motor_set_duty_cycle') {
        const portVal = block.getFieldValue('PORT');
        const duty = block.getFieldValue('DUTY');
        line = `motor.set_duty_cycle(port.${portVal}, ${duty})\n`;
      }
      else if (type === 'motor_stop') {
        const portVal = block.getFieldValue('PORT');
        line = `motor.stop(port.${portVal})\n`;
      }
      else if (type === 'motor_velocity') {
        const portVal = block.getFieldValue('PORT');
        line = `motor.velocity(port.${portVal})`;
      }
      else if (type === 'motor_get_duty_cycle') {
        const portVal = block.getFieldValue('PORT');
        line = `motor.get_duty_cycle(port.${portVal})`;
      }
      
      // Motor Pair Blocks (80-87)
      else if (type === 'motor_pair_pair') {
        const pair = block.getFieldValue('PAIR');
        const port1 = block.getFieldValue('PORT1');
        const port2 = block.getFieldValue('PORT2');
        line = `motor_pair.pair(motor_pair.${pair}, port.${port1}, port.${port2})\n`;
      }
      else if (type === 'motor_pair_move') {
        const pair = block.getFieldValue('PAIR');
        const steering = block.getFieldValue('STEERING');
        const velocity = block.getFieldValue('VELOCITY');
        line = `motor_pair.move(motor_pair.${pair}, ${steering}, ${velocity})\n`;
      }
      else if (type === 'motor_pair_move_for_degrees') {
        const pair = block.getFieldValue('PAIR');
        const degrees = block.getFieldValue('DEGREES');
        const steering = block.getFieldValue('STEERING');
        const velocity = block.getFieldValue('VELOCITY');
        line = `await motor_pair.move_for_degrees(motor_pair.${pair}, ${degrees}, ${steering}, ${velocity})\n`;
      }
      else if (type === 'motor_pair_move_for_time') {
        const pair = block.getFieldValue('PAIR');
        const duration = block.getFieldValue('DURATION');
        const steering = block.getFieldValue('STEERING');
        const velocity = block.getFieldValue('VELOCITY');
        line = `await motor_pair.move_for_time(motor_pair.${pair}, ${duration}, ${steering}, ${velocity})\n`;
      }
      else if (type === 'motor_pair_move_tank') {
        const pair = block.getFieldValue('PAIR');
        const leftVel = block.getFieldValue('LEFT_VELOCITY');
        const rightVel = block.getFieldValue('RIGHT_VELOCITY');
        line = `motor_pair.move_tank(motor_pair.${pair}, ${leftVel}, ${rightVel})\n`;
      }
      else if (type === 'motor_pair_move_tank_for_degrees') {
        const pair = block.getFieldValue('PAIR');
        const degrees = block.getFieldValue('DEGREES');
        const leftVel = block.getFieldValue('LEFT_VELOCITY');
        const rightVel = block.getFieldValue('RIGHT_VELOCITY');
        line = `await motor_pair.move_tank_for_degrees(motor_pair.${pair}, ${degrees}, ${leftVel}, ${rightVel})\n`;
      }
      else if (type === 'motor_pair_move_tank_for_time') {
        const pair = block.getFieldValue('PAIR');
        const duration = block.getFieldValue('DURATION');
        const leftVel = block.getFieldValue('LEFT_VELOCITY');
        const rightVel = block.getFieldValue('RIGHT_VELOCITY');
        line = `await motor_pair.move_tank_for_time(motor_pair.${pair}, ${duration}, ${leftVel}, ${rightVel})\n`;
      }
      else if (type === 'motor_pair_stop') {
        const pair = block.getFieldValue('PAIR');
        line = `motor_pair.stop(motor_pair.${pair})\n`;
      }
      
      // Control Blocks (88-95)
      else if (type === 'control_wait') {
        line = `await runloop.sleep_ms(${block.getFieldValue('DURATION')})\n`;
      }
      else if (type === 'control_forever') {
        line = "while True:\n";
        const child = block.getInputTargetBlock('SUBSTACK');
        let childCode = processStack(child);
        if (!childCode) childCode = "    pass\n";
        line += childCode.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
      }
      else if (type === 'control_repeat') {
        const times = block.getFieldValue('TIMES');
        line = `for _ in range(${times}):\n`;
        const child = block.getInputTargetBlock('SUBSTACK');
        let childCode = processStack(child);
        if (!childCode) childCode = "    pass\n";
        line += childCode.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
      }
      else if (type === 'control_repeat_until') {
        const condition = getInputValue(block, 'CONDITION', 'False');
        line = `while not (${condition}):\n`;
        const child = block.getInputTargetBlock('SUBSTACK');
        let childCode = processStack(child);
        if (!childCode) childCode = "    pass\n";
        line += childCode.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
      }
      else if (type === 'control_if') {
        const condition = getInputValue(block, 'CONDITION', 'False');
        line = `if ${condition}:\n`;
        const child = block.getInputTargetBlock('SUBSTACK');
        let childCode = processStack(child);
        if (!childCode) childCode = "    pass\n";
        line += childCode.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
      }
      else if (type === 'control_if_else') {
        const condition = getInputValue(block, 'CONDITION', 'False');
        line = `if ${condition}:\n`;
        const child1 = block.getInputTargetBlock('SUBSTACK');
        let childCode1 = processStack(child1);
        if (!childCode1) childCode1 = "    pass\n";
        line += childCode1.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
        line += "else:\n";
        const child2 = block.getInputTargetBlock('SUBSTACK2');
        let childCode2 = processStack(child2);
        if (!childCode2) childCode2 = "    pass\n";
        line += childCode2.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
      }
      else if (type === 'control_wait_until') {
        const condition = getInputValue(block, 'CONDITION', 'False');
        line = `while not (${condition}):\n    await runloop.sleep_ms(10)\n`;
      }
      else if (type === 'control_stop_all') {
        line = "return\n";
      }
      
      // Operators - Math (94-101)
      else if (type === 'operator_add') {
        const num1 = getInputValue(block, 'NUM1', '0');
        const num2 = getInputValue(block, 'NUM2', '0');
        line = `(${num1} + ${num2})`;
      }
      else if (type === 'operator_subtract') {
        const num1 = getInputValue(block, 'NUM1', '0');
        const num2 = getInputValue(block, 'NUM2', '0');
        line = `(${num1} - ${num2})`;
      }
      else if (type === 'operator_multiply') {
        const num1 = getInputValue(block, 'NUM1', '0');
        const num2 = getInputValue(block, 'NUM2', '0');
        line = `(${num1} * ${num2})`;
      }
      else if (type === 'operator_divide') {
        const num1 = getInputValue(block, 'NUM1', '0');
        const num2 = getInputValue(block, 'NUM2', '1');
        line = `(${num1} / ${num2})`;
      }
      else if (type === 'operator_arithmetic') {
        const op = block.getFieldValue('OP');
        const num1 = getInputValue(block, 'NUM1', '0');
        const num2 = getInputValue(block, 'NUM2', '1');
        if (op === 'ADD') line = `(${num1} + ${num2})`;
        else if (op === 'SUBTRACT') line = `(${num1} - ${num2})`;
        else if (op === 'MULTIPLY') line = `(${num1} * ${num2})`;
        else if (op === 'DIVIDE') line = `(${num1} / ${num2})`;
        else if (op === 'MOD') line = `(${num1} % ${num2})`;
      }
      else if (type === 'operator_random') {
        const from = getInputValue(block, 'FROM', '1');
        const to = getInputValue(block, 'TO', '10');
        line = `random.randint(${from}, ${to})`;
      }
      else if (type === 'operator_mod') {
        const num1 = getInputValue(block, 'NUM1', '0');
        const num2 = getInputValue(block, 'NUM2', '1');
        line = `(${num1} % ${num2})`;
      }
      else if (type === 'operator_round') {
        const num = getInputValue(block, 'NUM', '0');
        line = `round(${num})`;
      }
      else if (type === 'operator_mathop') {
        const op = block.getFieldValue('OPERATOR');
        const num = getInputValue(block, 'NUM', '0');
        if (op === 'abs') line = `abs(${num})`;
        else if (op === 'floor') line = `math.floor(${num})`;
        else if (op === 'ceiling') line = `math.ceil(${num})`;
        else if (op === 'sqrt') line = `math.sqrt(${num})`;
        else if (op === 'sin') line = `math.sin(${num})`;
        else if (op === 'cos') line = `math.cos(${num})`;
        else if (op === 'tan') line = `math.tan(${num})`;
        else if (op === 'asin') line = `math.asin(${num})`;
        else if (op === 'acos') line = `math.acos(${num})`;
        else if (op === 'atan') line = `math.atan(${num})`;
        else if (op === 'ln') line = `math.log(${num})`;
        else if (op === 'log') line = `math.log10(${num})`;
        else if (op === 'exp') line = `math.exp(${num})`;
        else if (op === 'pow10') line = `math.pow(10, ${num})`;
      }
      else if (type === 'math_number') {
        const num = block.getFieldValue('NUM');
        line = `${num}`;
      }
      else if (type === 'math_constant') {
        const constant = block.getFieldValue('CONSTANT');
        if (constant === 'PI') line = `math.pi`;
        else if (constant === 'E') line = `math.e`;
        else if (constant === 'GOLDEN_RATIO') line = `1.618033988749895`;
        else if (constant === 'SQRT2') line = `math.sqrt(2)`;
        else if (constant === 'SQRT1_2') line = `math.sqrt(0.5)`;
        else if (constant === 'INFINITY') line = `float('inf')`;
      }
      else if (type === 'math_power') {
        const base = getInputValue(block, 'BASE', '2');
        const exponent = getInputValue(block, 'EXPONENT', '2');
        line = `math.pow(${base}, ${exponent})`;
      }
      else if (type === 'math_minmax') {
        const op = block.getFieldValue('OP');
        const a = getInputValue(block, 'A', '0');
        const b = getInputValue(block, 'B', '0');
        if (op === 'MIN') line = `min(${a}, ${b})`;
        else if (op === 'MAX') line = `max(${a}, ${b})`;
      }
      else if (type === 'math_constrain') {
        const value = getInputValue(block, 'VALUE', '50');
        const low = getInputValue(block, 'LOW', '0');
        const high = getInputValue(block, 'HIGH', '100');
        line = `max(${low}, min(${high}, ${value}))`;
      }
      else if (type === 'math_random_float') {
        line = `random.random()`;
      }
      else if (type === 'math_number_property') {
        const number = getInputValue(block, 'NUMBER', '0');
        const property = block.getFieldValue('PROPERTY');
        if (property === 'EVEN') line = `(${number} % 2 == 0)`;
        else if (property === 'ODD') line = `(${number} % 2 == 1)`;
        else if (property === 'PRIME') line = `(${number} > 1 and all(${number} % i != 0 for i in range(2, int(${number}**0.5) + 1)))`;
        else if (property === 'WHOLE') line = `(${number} % 1 == 0)`;
        else if (property === 'POSITIVE') line = `(${number} > 0)`;
        else if (property === 'NEGATIVE') line = `(${number} < 0)`;
      }
      else if (type === 'math_atan2') {
        const y = getInputValue(block, 'Y', '0');
        const x = getInputValue(block, 'X', '0');
        line = `math.atan2(${y}, ${x})`;
      }
      
      // Operators - Comparison (102-107) - CONSOLIDATED
      else if (type === 'operator_comparison') {
        const op = block.getFieldValue('OP');
        const op1 = getInputValue(block, 'OPERAND1', '0');
        const op2 = getInputValue(block, 'OPERAND2', '0');
        if (op === 'EQ') line = `(${op1} == ${op2})`;
        else if (op === 'NEQ') line = `(${op1} != ${op2})`;
        else if (op === 'LT') line = `(${op1} < ${op2})`;
        else if (op === 'GT') line = `(${op1} > ${op2})`;
        else if (op === 'LTE') line = `(${op1} <= ${op2})`;
        else if (op === 'GTE') line = `(${op1} >= ${op2})`;
      }
      else if (type === 'operator_equals') {
        const op1 = getInputValue(block, 'OPERAND1', '0');
        const op2 = getInputValue(block, 'OPERAND2', '0');
        line = `(${op1} == ${op2})`;
      }
      else if (type === 'operator_not_equals') {
        const op1 = getInputValue(block, 'OPERAND1', '0');
        const op2 = getInputValue(block, 'OPERAND2', '0');
        line = `(${op1} != ${op2})`;
      }
      else if (type === 'operator_less_than') {
        const op1 = getInputValue(block, 'OPERAND1', '0');
        const op2 = getInputValue(block, 'OPERAND2', '0');
        line = `(${op1} < ${op2})`;
      }
      else if (type === 'operator_greater_than') {
        const op1 = getInputValue(block, 'OPERAND1', '0');
        const op2 = getInputValue(block, 'OPERAND2', '0');
        line = `(${op1} > ${op2})`;
      }
      else if (type === 'operator_less_or_equal') {
        const op1 = getInputValue(block, 'OPERAND1', '0');
        const op2 = getInputValue(block, 'OPERAND2', '0');
        line = `(${op1} <= ${op2})`;
      }
      else if (type === 'operator_greater_or_equal') {
        const op1 = getInputValue(block, 'OPERAND1', '0');
        const op2 = getInputValue(block, 'OPERAND2', '0');
        line = `(${op1} >= ${op2})`;
      }
      
      // Operators - Logic (108-110) - CONSOLIDATED
      else if (type === 'operator_logic') {
        const op = block.getFieldValue('OP');
        const op1 = getInputValue(block, 'OPERAND1', 'False');
        const op2 = getInputValue(block, 'OPERAND2', 'False');
        if (op === 'AND') line = `(${op1} and ${op2})`;
        else if (op === 'OR') line = `(${op1} or ${op2})`;
      }
      else if (type === 'operator_and') {
        const op1 = getInputValue(block, 'OPERAND1', 'False');
        const op2 = getInputValue(block, 'OPERAND2', 'False');
        line = `(${op1} and ${op2})`;
      }
      else if (type === 'operator_or') {
        const op1 = getInputValue(block, 'OPERAND1', 'False');
        const op2 = getInputValue(block, 'OPERAND2', 'False');
        line = `(${op1} or ${op2})`;
      }
      else if (type === 'operator_not') {
        const op = getInputValue(block, 'OPERAND', 'False');
        line = `(not ${op})`;
      }
      
      // Operators - Text (111-114)
      else if (type === 'operator_join') {
        const str1 = getInputValue(block, 'STRING1', '""');
        const str2 = getInputValue(block, 'STRING2', '""');
        line = `(str(${str1}) + str(${str2}))`;
      }
      else if (type === 'operator_letter_of') {
        const letter = getInputValue(block, 'LETTER', '1');
        const string = getInputValue(block, 'STRING', '""');
        line = `(${string}[${letter}-1] if 0 < ${letter} <= len(${string}) else "")`;
      }
      else if (type === 'operator_length') {
        const string = getInputValue(block, 'STRING', '""');
        line = `len(${string})`;
      }
      else if (type === 'operator_contains') {
        const str1 = getInputValue(block, 'STRING1', '""');
        const str2 = getInputValue(block, 'STRING2', '""');
        line = `(${str2} in ${str1})`;
      }
      
      // Data - Variables (115-117)
      else if (type === 'data_set_variable') {
        const varName = block.getFieldValue('VAR');
        const value = getInputValue(block, 'VALUE', '0');
        line = `${varName} = ${value}\n`;
      }
      else if (type === 'data_change_variable') {
        const varName = block.getFieldValue('VAR');
        const value = getInputValue(block, 'VALUE', '1');
        line = `${varName} = ${varName} + ${value}\n`;
      }
      else if (type === 'data_get_variable') {
        const varName = block.getFieldValue('VAR');
        line = varName;
      }
      
      // Data - Lists (118-125)
      else if (type === 'data_create_list') {
        line = `[]`;
      }
      else if (type === 'data_add_to_list') {
        const item = getInputValue(block, 'ITEM', '0');
        const listName = block.getFieldValue('LIST');
        line = `${listName}.append(${item})\n`;
      }
      else if (type === 'data_delete_from_list') {
        const index = getInputValue(block, 'INDEX', '1');
        const listName = block.getFieldValue('LIST');
        line = `${listName}.pop(${index}-1)\n`;
      }
      else if (type === 'data_insert_at_list') {
        const item = getInputValue(block, 'ITEM', '0');
        const index = getInputValue(block, 'INDEX', '1');
        const listName = block.getFieldValue('LIST');
        line = `${listName}.insert(${index}-1, ${item})\n`;
      }
      else if (type === 'data_replace_in_list') {
        const index = getInputValue(block, 'INDEX', '1');
        const listName = block.getFieldValue('LIST');
        const item = getInputValue(block, 'ITEM', '0');
        line = `${listName}[${index}-1] = ${item}\n`;
      }
      else if (type === 'data_item_of_list') {
        const index = getInputValue(block, 'INDEX', '1');
        const listName = block.getFieldValue('LIST');
        line = `${listName}[${index}-1]`;
      }
      else if (type === 'data_length_of_list') {
        const listName = block.getFieldValue('LIST');
        line = `len(${listName})`;
      }
      else if (type === 'data_contains_in_list') {
        const listName = block.getFieldValue('LIST');
        const item = getInputValue(block, 'ITEM', '0');
        line = `(${item} in ${listName})`;
      }

      // ========================================
      // NEW BLOCKS PYTHON GENERATION (126-175)
      // ========================================

      // Advanced Math Operations (126-135)
      else if (type === 'operator_power') {
        const base = getInputValue(block, 'BASE', '2');
        const exponent = getInputValue(block, 'EXPONENT', '2');
        line = `math.pow(${base}, ${exponent})`;
      }
      else if (type === 'operator_min') {
        const num1 = getInputValue(block, 'NUM1', '0');
        const num2 = getInputValue(block, 'NUM2', '0');
        line = `min(${num1}, ${num2})`;
      }
      else if (type === 'operator_max') {
        const num1 = getInputValue(block, 'NUM1', '0');
        const num2 = getInputValue(block, 'NUM2', '0');
        line = `max(${num1}, ${num2})`;
      }
      else if (type === 'operator_clamp') {
        const value = getInputValue(block, 'VALUE', '50');
        const min = getInputValue(block, 'MIN', '0');
        const max = getInputValue(block, 'MAX', '100');
        line = `max(${min}, min(${max}, ${value}))`;
      }
      else if (type === 'operator_map') {
        const value = getInputValue(block, 'VALUE', '0');
        const fromLow = getInputValue(block, 'FROM_LOW', '0');
        const fromHigh = getInputValue(block, 'FROM_HIGH', '100');
        const toLow = getInputValue(block, 'TO_LOW', '0');
        const toHigh = getInputValue(block, 'TO_HIGH', '255');
        line = `((${value} - ${fromLow}) * (${toHigh} - ${toLow}) / (${fromHigh} - ${fromLow}) + ${toLow})`;
      }
      else if (type === 'operator_constrain_angle') {
        const angle = getInputValue(block, 'ANGLE', '0');
        line = `(${angle} % 360)`;
      }
      else if (type === 'operator_radians') {
        const degrees = getInputValue(block, 'DEGREES', '0');
        line = `math.radians(${degrees})`;
      }
      else if (type === 'operator_degrees') {
        const radians = getInputValue(block, 'RADIANS', '0');
        line = `math.degrees(${radians})`;
      }
      else if (type === 'operator_percentage') {
        const percent = getInputValue(block, 'PERCENT', '50');
        const value = getInputValue(block, 'VALUE', '100');
        line = `(${percent} * ${value} / 100)`;
      }
      else if (type === 'operator_average') {
        const num1 = getInputValue(block, 'NUM1', '0');
        const num2 = getInputValue(block, 'NUM2', '0');
        line = `((${num1} + ${num2}) / 2)`;
      }

      // Advanced Text Operations (136-145)
      else if (type === 'operator_uppercase') {
        const text = getInputValue(block, 'TEXT', '""');
        line = `str(${text}).upper()`;
      }
      else if (type === 'operator_lowercase') {
        const text = getInputValue(block, 'TEXT', '""');
        line = `str(${text}).lower()`;
      }
      else if (type === 'operator_trim') {
        const text = getInputValue(block, 'TEXT', '""');
        line = `str(${text}).strip()`;
      }
      else if (type === 'operator_replace') {
        const old = getInputValue(block, 'OLD', '""');
        const text = getInputValue(block, 'TEXT', '""');
        const newText = getInputValue(block, 'NEW', '""');
        line = `str(${text}).replace(${old}, ${newText})`;
      }
      else if (type === 'operator_split') {
        const text = getInputValue(block, 'TEXT', '""');
        const delimiter = getInputValue(block, 'DELIMITER', '","');
        line = `str(${text}).split(${delimiter})`;
      }
      else if (type === 'operator_reverse_text') {
        const text = getInputValue(block, 'TEXT', '""');
        line = `str(${text})[::-1]`;
      }
      else if (type === 'operator_starts_with') {
        const text = getInputValue(block, 'TEXT', '""');
        const prefix = getInputValue(block, 'PREFIX', '""');
        line = `str(${text}).startswith(${prefix})`;
      }
      else if (type === 'operator_ends_with') {
        const text = getInputValue(block, 'TEXT', '""');
        const suffix = getInputValue(block, 'SUFFIX', '""');
        line = `str(${text}).endswith(${suffix})`;
      }
      else if (type === 'operator_substring') {
        const text = getInputValue(block, 'TEXT', '""');
        const start = getInputValue(block, 'START', '0');
        const end = getInputValue(block, 'END', '5');
        line = `str(${text})[${start}:${end}]`;
      }
      else if (type === 'operator_repeat_text') {
        const text = getInputValue(block, 'TEXT', '""');
        const times = getInputValue(block, 'TIMES', '3');
        line = `(str(${text}) * ${times})`;
      }

      // Advanced List Operations (146-155)
      else if (type === 'data_sort_list') {
        const listName = block.getFieldValue('LIST');
        const order = block.getFieldValue('ORDER');
        if (order === 'ASC') line = `${listName}.sort()\n`;
        else line = `${listName}.sort(reverse=True)\n`;
      }
      else if (type === 'data_reverse_list') {
        const listName = block.getFieldValue('LIST');
        line = `${listName}.reverse()\n`;
      }
      else if (type === 'data_shuffle_list') {
        const listName = block.getFieldValue('LIST');
        line = `random.shuffle(${listName})\n`;
      }
      else if (type === 'data_slice_list') {
        const listName = block.getFieldValue('LIST');
        const start = getInputValue(block, 'START', '0');
        const end = getInputValue(block, 'END', '5');
        line = `${listName}[${start}:${end}]`;
      }
      else if (type === 'data_index_of') {
        const item = getInputValue(block, 'ITEM', '0');
        const listName = block.getFieldValue('LIST');
        line = `(${listName}.index(${item}) + 1 if ${item} in ${listName} else -1)`;
      }
      else if (type === 'data_clear_list') {
        const listName = block.getFieldValue('LIST');
        line = `${listName}.clear()\n`;
      }
      else if (type === 'data_count_in_list') {
        const item = getInputValue(block, 'ITEM', '0');
        const listName = block.getFieldValue('LIST');
        line = `${listName}.count(${item})`;
      }
      else if (type === 'data_min_of_list') {
        const listName = block.getFieldValue('LIST');
        line = `min(${listName})`;
      }
      else if (type === 'data_max_of_list') {
        const listName = block.getFieldValue('LIST');
        line = `max(${listName})`;
      }
      else if (type === 'data_sum_of_list') {
        const listName = block.getFieldValue('LIST');
        line = `sum(${listName})`;
      }

      // Advanced Control Flow (156-165)
      else if (type === 'control_for_loop') {
        const varName = block.getFieldValue('VAR');
        const from = getInputValue(block, 'FROM', '1');
        const to = getInputValue(block, 'TO', '10');
        line = `for ${varName} in range(${from}, ${to} + 1):\n`;
        const child = block.getInputTargetBlock('DO');
        let childCode = processStack(child);
        if (!childCode) childCode = "    pass\n";
        line += childCode.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
      }
      else if (type === 'control_while_loop') {
        const condition = getInputValue(block, 'CONDITION', 'True');
        line = `while ${condition}:\n`;
        const child = block.getInputTargetBlock('DO');
        let childCode = processStack(child);
        if (!childCode) childCode = "    pass\n";
        line += childCode.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
      }
      else if (type === 'control_break') {
        line = `break\n`;
      }
      else if (type === 'control_continue') {
        line = `continue\n`;
      }
      else if (type === 'control_for_each') {
        const varName = block.getFieldValue('VAR');
        const listName = block.getFieldValue('LIST');
        line = `for ${varName} in ${listName}:\n`;
        const child = block.getInputTargetBlock('DO');
        let childCode = processStack(child);
        if (!childCode) childCode = "    pass\n";
        line += childCode.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
      }
      else if (type === 'control_switch') {
        const value = getInputValue(block, 'VALUE', '0');
        line = `# Switch statement for ${value}\n`;
        const cases = block.getInputTargetBlock('CASES');
        if (cases) line += processStack(cases);
      }
      else if (type === 'control_case') {
        const value = getInputValue(block, 'VALUE', '0');
        line = `if _switch_value == ${value}:\n`;
        const child = block.getInputTargetBlock('DO');
        let childCode = processStack(child);
        if (!childCode) childCode = "    pass\n";
        line += childCode.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
      }
      else if (type === 'control_default') {
        line = `else:\n`;
        const child = block.getInputTargetBlock('DO');
        let childCode = processStack(child);
        if (!childCode) childCode = "    pass\n";
        line += childCode.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
      }
      else if (type === 'control_try_catch') {
        line = `try:\n`;
        const tryBlock = block.getInputTargetBlock('TRY');
        let tryCode = processStack(tryBlock);
        if (!tryCode) tryCode = "    pass\n";
        line += tryCode.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
        line += `except Exception as e:\n`;
        const catchBlock = block.getInputTargetBlock('CATCH');
        let catchCode = processStack(catchBlock);
        if (!catchCode) catchCode = "    pass\n";
        line += catchCode.split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
      }
      else if (type === 'control_ternary') {
        const condition = getInputValue(block, 'CONDITION', 'True');
        const trueVal = getInputValue(block, 'TRUE', '1');
        const falseVal = getInputValue(block, 'FALSE', '0');
        line = `(${trueVal} if ${condition} else ${falseVal})`;
      }

      // Conversion & Type Blocks (166-170)
      else if (type === 'operator_to_string') {
        const value = getInputValue(block, 'VALUE', '0');
        line = `str(${value})`;
      }
      else if (type === 'operator_to_number') {
        const value = getInputValue(block, 'VALUE', '0');
        line = `float(${value})`;
      }
      else if (type === 'operator_to_boolean') {
        const value = getInputValue(block, 'VALUE', '0');
        line = `bool(${value})`;
      }
      else if (type === 'operator_is_number') {
        const value = getInputValue(block, 'VALUE', '0');
        line = `isinstance(${value}, (int, float))`;
      }
      else if (type === 'operator_is_text') {
        const value = getInputValue(block, 'VALUE', '0');
        line = `isinstance(${value}, str)`;
      }

      // Time & Date (171-175)
      else if (type === 'time_current') {
        const unit = block.getFieldValue('UNIT');
        if (unit === 'TIME') line = `time.time()`;
        else if (unit === 'MILLIS') line = `int(time.time() * 1000)`;
        else if (unit === 'SECS') line = `int(time.time())`;
        else if (unit === 'MINS') line = `int(time.time() / 60)`;
        else if (unit === 'HOURS') line = `int(time.time() / 3600)`;
      }
      else if (type === 'time_delay_ms') {
        const ms = getInputValue(block, 'MS', '1000');
        line = `await runloop.sleep_ms(${ms})\n`;
      }
      else if (type === 'time_ticks') {
        const tickType = block.getFieldValue('TYPE');
        if (tickType === 'MS') line = `time.ticks_ms()`;
        else if (tickType === 'US') line = `time.ticks_us()`;
        else if (tickType === 'CPU') line = `time.ticks_cpu()`;
      }
      else if (type === 'time_elapsed') {
        const start = getInputValue(block, 'START', '0');
        const end = getInputValue(block, 'END', '0');
        line = `(${end} - ${start})`;
      }
      else if (type === 'time_format') {
        const timeVal = getInputValue(block, 'TIME', '0');
        const format = block.getFieldValue('FORMAT');
        line = `time.strftime("${format}", time.localtime(${timeVal}))`;
      }
      
      return line;
    };
    
    const processStack = (block) => {
      let stackCode = "";
      let nextBlock = block;
      while (nextBlock) {
        stackCode += processBlock(nextBlock);
        nextBlock = nextBlock.getNextBlock();
      }
      return stackCode;
    };
    
    let hasMain = false;
    workspace.getTopBlocks(true).forEach(block => {
      const blockCode = processStack(block);
      if (block.type === 'event_whenflagclicked') {
        hasMain = true;
        code += blockCode;
        const child = block.getNextBlock();
        if (child) {
          code += processStack(child).split('\n').map(l => l ? '    ' + l : '').join('\n') + "\n";
        }
      } else {
        code += blockCode;
      }
    });
    
    if (hasMain) {
      code += "\nrunloop.run(main())\n";
    }
    
    setPythonCode(code);
  };

  useEffect(() => {
    const setupWorkspace = (Blockly) => {
      const scratchTheme = createScratchTheme(Blockly);
      
      // Register all blocks from modular files
      registerAllBlocks(Blockly, icons);

      // ========================================
      // SPIKE API BLOCKS (scaffold, 50 blocks)
      // ========================================
      // Bargraph
      Blockly.Blocks['spike_bargraph_change'] = {init: function() {this.jsonInit({"message0": "bargraph change color %1 value %2", "args0": [{"type": "input_value", "name": "COLOR", "check": "Number"}, {"type": "input_value", "name": "VALUE", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 52, "tooltip": "Change bargraph value"});}};
      Blockly.Blocks['spike_bargraph_clear_all'] = {init: function() {this.jsonInit({"message0": "bargraph clear all", "previousStatement": null, "nextStatement": null, "colour": 52, "tooltip": "Clear all bargraph values"});}};
      Blockly.Blocks['spike_bargraph_get_value'] = {init: function() {this.jsonInit({"message0": "bargraph get value color %1", "args0": [{"type": "input_value", "name": "COLOR", "check": "Number"}], "output": "Number", "colour": 52, "tooltip": "Get bargraph value"});}};
      Blockly.Blocks['spike_bargraph_set_value'] = {init: function() {this.jsonInit({"message0": "bargraph set color %1 value %2", "args0": [{"type": "input_value", "name": "COLOR", "check": "Number"}, {"type": "input_value", "name": "VALUE", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 52, "tooltip": "Set bargraph value"});}};
      Blockly.Blocks['spike_bargraph_show'] = {init: function() {this.jsonInit({"message0": "bargraph show fullscreen %1", "args0": [{"type": "input_value", "name": "FULLSCREEN", "check": "Boolean"}], "previousStatement": null, "nextStatement": null, "colour": 52, "tooltip": "Show bargraph"});}};
      Blockly.Blocks['spike_bargraph_hide'] = {init: function() {this.jsonInit({"message0": "bargraph hide", "previousStatement": null, "nextStatement": null, "colour": 52, "tooltip": "Hide bargraph"});}};
      // Display
      Blockly.Blocks['spike_display_image'] = {init: function() {this.jsonInit({"message0": "display image %1", "args0": [{"type": "input_value", "name": "IMAGE", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 60, "tooltip": "Show image on display"});}};
      Blockly.Blocks['spike_display_text'] = {init: function() {this.jsonInit({"message0": "display text %1", "args0": [{"type": "input_value", "name": "TEXT", "check": "String"}], "previousStatement": null, "nextStatement": null, "colour": 60, "tooltip": "Show text on display"});}};
      Blockly.Blocks['spike_display_show'] = {init: function() {this.jsonInit({"message0": "display show fullscreen %1", "args0": [{"type": "input_value", "name": "FULLSCREEN", "check": "Boolean"}], "previousStatement": null, "nextStatement": null, "colour": 60, "tooltip": "Show display"});}};
      Blockly.Blocks['spike_display_hide'] = {init: function() {this.jsonInit({"message0": "display hide", "previousStatement": null, "nextStatement": null, "colour": 60, "tooltip": "Hide display"});}};
      // Linegraph
      Blockly.Blocks['spike_linegraph_clear'] = {init: function() {this.jsonInit({"message0": "linegraph clear color %1", "args0": [{"type": "input_value", "name": "COLOR", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 70, "tooltip": "Clear linegraph for color"});}};
      Blockly.Blocks['spike_linegraph_clear_all'] = {init: function() {this.jsonInit({"message0": "linegraph clear all", "previousStatement": null, "nextStatement": null, "colour": 70, "tooltip": "Clear all linegraphs"});}};
      Blockly.Blocks['spike_linegraph_get_average'] = {init: function() {this.jsonInit({"message0": "linegraph get average color %1", "args0": [{"type": "input_value", "name": "COLOR", "check": "Number"}], "output": "Number", "colour": 70, "tooltip": "Get average value"});}};
      Blockly.Blocks['spike_linegraph_get_last'] = {init: function() {this.jsonInit({"message0": "linegraph get last color %1", "args0": [{"type": "input_value", "name": "COLOR", "check": "Number"}], "output": "Number", "colour": 70, "tooltip": "Get last value"});}};
      Blockly.Blocks['spike_linegraph_get_max'] = {init: function() {this.jsonInit({"message0": "linegraph get max color %1", "args0": [{"type": "input_value", "name": "COLOR", "check": "Number"}], "output": "Number", "colour": 70, "tooltip": "Get max value"});}};
      Blockly.Blocks['spike_linegraph_get_min'] = {init: function() {this.jsonInit({"message0": "linegraph get min color %1", "args0": [{"type": "input_value", "name": "COLOR", "check": "Number"}], "output": "Number", "colour": 70, "tooltip": "Get min value"});}};
      Blockly.Blocks['spike_linegraph_plot'] = {init: function() {this.jsonInit({"message0": "linegraph plot color %1 x %2 y %3", "args0": [{"type": "input_value", "name": "COLOR", "check": "Number"}, {"type": "input_value", "name": "X", "check": "Number"}, {"type": "input_value", "name": "Y", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 70, "tooltip": "Plot value on linegraph"});}};
      Blockly.Blocks['spike_linegraph_show'] = {init: function() {this.jsonInit({"message0": "linegraph show fullscreen %1", "args0": [{"type": "input_value", "name": "FULLSCREEN", "check": "Boolean"}], "previousStatement": null, "nextStatement": null, "colour": 70, "tooltip": "Show linegraph"});}};
      Blockly.Blocks['spike_linegraph_hide'] = {init: function() {this.jsonInit({"message0": "linegraph hide", "previousStatement": null, "nextStatement": null, "colour": 70, "tooltip": "Hide linegraph"});}};
      // Music
      Blockly.Blocks['spike_music_play_drum'] = {init: function() {this.jsonInit({"message0": "music play drum %1", "args0": [{"type": "input_value", "name": "DRUM", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 80, "tooltip": "Play drum sound"});}};
      Blockly.Blocks['spike_music_play_instrument'] = {init: function() {this.jsonInit({"message0": "music play instrument %1 note %2 duration %3", "args0": [{"type": "input_value", "name": "INSTRUMENT", "check": "Number"}, {"type": "input_value", "name": "NOTE", "check": "Number"}, {"type": "input_value", "name": "DURATION", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 80, "tooltip": "Play instrument sound"});}};
      // Sound
      Blockly.Blocks['spike_sound_play'] = {init: function() {this.jsonInit({"message0": "sound play name %1 volume %2 pitch %3 pan %4", "args0": [{"type": "input_value", "name": "NAME", "check": "String"}, {"type": "input_value", "name": "VOLUME", "check": "Number"}, {"type": "input_value", "name": "PITCH", "check": "Number"}, {"type": "input_value", "name": "PAN", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 90, "tooltip": "Play sound"});}};
      Blockly.Blocks['spike_sound_set_attributes'] = {init: function() {this.jsonInit({"message0": "sound set volume %1 pitch %2 pan %3", "args0": [{"type": "input_value", "name": "VOLUME", "check": "Number"}, {"type": "input_value", "name": "PITCH", "check": "Number"}, {"type": "input_value", "name": "PAN", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 90, "tooltip": "Set sound attributes"});}};
      Blockly.Blocks['spike_sound_stop'] = {init: function() {this.jsonInit({"message0": "sound stop", "previousStatement": null, "nextStatement": null, "colour": 90, "tooltip": "Stop sound"});}};
      // Color Matrix
      Blockly.Blocks['spike_color_matrix_clear'] = {init: function() {this.jsonInit({"message0": "color matrix clear port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 100, "tooltip": "Clear color matrix"});}};
      Blockly.Blocks['spike_color_matrix_get_pixel'] = {init: function() {this.jsonInit({"message0": "color matrix get pixel port %1 x %2 y %3", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "X", "check": "Number"}, {"type": "input_value", "name": "Y", "check": "Number"}], "output": "Number", "colour": 100, "tooltip": "Get color matrix pixel"});}};
      Blockly.Blocks['spike_color_matrix_set_pixel'] = {init: function() {this.jsonInit({"message0": "color matrix set pixel port %1 x %2 y %3 pixel %4", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "X", "check": "Number"}, {"type": "input_value", "name": "Y", "check": "Number"}, {"type": "input_value", "name": "PIXEL", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 100, "tooltip": "Set color matrix pixel"});}};
      Blockly.Blocks['spike_color_matrix_show'] = {init: function() {this.jsonInit({"message0": "color matrix show port %1 pixels %2", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "PIXELS", "check": "Array"}], "previousStatement": null, "nextStatement": null, "colour": 100, "tooltip": "Show color matrix pixels"});}};
      // Color Sensor
      Blockly.Blocks['spike_color_sensor_color'] = {init: function() {this.jsonInit({"message0": "color sensor color port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Number", "colour": 110, "tooltip": "Get color sensor color"});}};
      Blockly.Blocks['spike_color_sensor_reflection'] = {init: function() {this.jsonInit({"message0": "color sensor reflection port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Number", "colour": 110, "tooltip": "Get color sensor reflection"});}};
      Blockly.Blocks['spike_color_sensor_rgbi'] = {init: function() {this.jsonInit({"message0": "color sensor rgbi port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Array", "colour": 110, "tooltip": "Get color sensor RGBAI"});}};
      // Device
      Blockly.Blocks['spike_device_data'] = {init: function() {this.jsonInit({"message0": "device data port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Array", "colour": 120, "tooltip": "Get device data"});}};
      Blockly.Blocks['spike_device_id'] = {init: function() {this.jsonInit({"message0": "device id port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Number", "colour": 120, "tooltip": "Get device id"});}};
      Blockly.Blocks['spike_device_get_duty_cycle'] = {init: function() {this.jsonInit({"message0": "device get duty cycle port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Number", "colour": 120, "tooltip": "Get device duty cycle"});}};
      Blockly.Blocks['spike_device_ready'] = {init: function() {this.jsonInit({"message0": "device ready port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Boolean", "colour": 120, "tooltip": "Check device ready"});}};
      Blockly.Blocks['spike_device_set_duty_cycle'] = {init: function() {this.jsonInit({"message0": "device set duty cycle port %1 value %2", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "DUTY", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 120, "tooltip": "Set device duty cycle"});}};
      // Distance Sensor
      Blockly.Blocks['spike_distance_sensor_clear'] = {init: function() {this.jsonInit({"message0": "distance sensor clear port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 130, "tooltip": "Clear distance sensor lights"});}};
      Blockly.Blocks['spike_distance_sensor_distance'] = {init: function() {this.jsonInit({"message0": "distance sensor distance port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Number", "colour": 130, "tooltip": "Get distance in mm"});}};
      Blockly.Blocks['spike_distance_sensor_get_pixel'] = {init: function() {this.jsonInit({"message0": "distance sensor get pixel port %1 x %2 y %3", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "X", "check": "Number"}, {"type": "input_value", "name": "Y", "check": "Number"}], "output": "Number", "colour": 130, "tooltip": "Get distance sensor pixel"});}};
      Blockly.Blocks['spike_distance_sensor_set_pixel'] = {init: function() {this.jsonInit({"message0": "distance sensor set pixel port %1 x %2 y %3 intensity %4", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "X", "check": "Number"}, {"type": "input_value", "name": "Y", "check": "Number"}, {"type": "input_value", "name": "INTENSITY", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 130, "tooltip": "Set distance sensor pixel intensity"});}};
      Blockly.Blocks['spike_distance_sensor_show'] = {init: function() {this.jsonInit({"message0": "distance sensor show port %1 pixels %2", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "PIXELS", "check": "Array"}], "previousStatement": null, "nextStatement": null, "colour": 130, "tooltip": "Show distance sensor pixels"});}};
      // Force Sensor
      Blockly.Blocks['spike_force_sensor_force'] = {init: function() {this.jsonInit({"message0": "force sensor force port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Number", "colour": 140, "tooltip": "Get force sensor value"});}};
      Blockly.Blocks['spike_force_sensor_pressed'] = {init: function() {this.jsonInit({"message0": "force sensor pressed port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Boolean", "colour": 140, "tooltip": "Check force sensor pressed"});}};
      Blockly.Blocks['spike_force_sensor_raw'] = {init: function() {this.jsonInit({"message0": "force sensor raw port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Number", "colour": 140, "tooltip": "Get force sensor raw value"});}};
      // Hub Button
      Blockly.Blocks['spike_button_pressed'] = {init: function() {this.jsonInit({"message0": "button pressed %1", "args0": [{"type": "input_value", "name": "BUTTON", "check": "Number"}], "output": "Number", "colour": 150, "tooltip": "Get button press duration"});}};
      // Hub Light
      Blockly.Blocks['spike_light_color'] = {init: function() {this.jsonInit({"message0": "light color %1 color %2", "args0": [{"type": "input_value", "name": "LIGHT", "check": "Number"}, {"type": "input_value", "name": "COLOR", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 160, "tooltip": "Set hub light color"});}};
      // Hub Light Matrix
      Blockly.Blocks['spike_light_matrix_clear'] = {init: function() {this.jsonInit({"message0": "light matrix clear", "previousStatement": null, "nextStatement": null, "colour": 170, "tooltip": "Clear light matrix"});}};
      Blockly.Blocks['spike_light_matrix_get_orientation'] = {init: function() {this.jsonInit({"message0": "light matrix get orientation", "output": "Number", "colour": 170, "tooltip": "Get light matrix orientation"});}};
      Blockly.Blocks['spike_light_matrix_get_pixel'] = {init: function() {this.jsonInit({"message0": "light matrix get pixel x %1 y %2", "args0": [{"type": "input_value", "name": "X", "check": "Number"}, {"type": "input_value", "name": "Y", "check": "Number"}], "output": "Number", "colour": 170, "tooltip": "Get light matrix pixel"});}};
      Blockly.Blocks['spike_light_matrix_set_orientation'] = {init: function() {this.jsonInit({"message0": "light matrix set orientation top %1", "args0": [{"type": "input_value", "name": "TOP", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 170, "tooltip": "Set light matrix orientation"});}};
      Blockly.Blocks['spike_light_matrix_set_pixel'] = {init: function() {this.jsonInit({"message0": "light matrix set pixel x %1 y %2 intensity %3", "args0": [{"type": "input_value", "name": "X", "check": "Number"}, {"type": "input_value", "name": "Y", "check": "Number"}, {"type": "input_value", "name": "INTENSITY", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 170, "tooltip": "Set light matrix pixel intensity"});}};
      Blockly.Blocks['spike_light_matrix_show'] = {init: function() {this.jsonInit({"message0": "light matrix show pixels %1", "args0": [{"type": "input_value", "name": "PIXELS", "check": "Array"}], "previousStatement": null, "nextStatement": null, "colour": 170, "tooltip": "Show light matrix pixels"});}};
      Blockly.Blocks['spike_light_matrix_show_image'] = {init: function() {this.jsonInit({"message0": "light matrix show image %1", "args0": [{"type": "input_value", "name": "IMAGE", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 170, "tooltip": "Show built-in image"});}};
      Blockly.Blocks['spike_light_matrix_write'] = {init: function() {this.jsonInit({"message0": "light matrix write text %1 intensity %2 time per char %3", "args0": [{"type": "input_value", "name": "TEXT", "check": "String"}, {"type": "input_value", "name": "INTENSITY", "check": "Number"}, {"type": "input_value", "name": "TIME", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 170, "tooltip": "Scroll text on matrix"});}};
      // Hub Motion Sensor
      Blockly.Blocks['spike_motion_sensor_acceleration'] = {init: function() {this.jsonInit({"message0": "motion sensor acceleration raw %1", "args0": [{"type": "input_value", "name": "RAW", "check": "Boolean"}], "output": "Array", "colour": 180, "tooltip": "Get acceleration"});}};
      Blockly.Blocks['spike_motion_sensor_angular_velocity'] = {init: function() {this.jsonInit({"message0": "motion sensor angular velocity raw %1", "args0": [{"type": "input_value", "name": "RAW", "check": "Boolean"}], "output": "Array", "colour": 180, "tooltip": "Get angular velocity"});}};
      Blockly.Blocks['spike_motion_sensor_gesture'] = {init: function() {this.jsonInit({"message0": "motion sensor gesture", "output": "String", "colour": 180, "tooltip": "Get gesture"});}};
      Blockly.Blocks['spike_motion_sensor_get_yaw_face'] = {init: function() {this.jsonInit({"message0": "motion sensor get yaw face", "output": "Number", "colour": 180, "tooltip": "Get yaw face"});}};
      Blockly.Blocks['spike_motion_sensor_quaternion'] = {init: function() {this.jsonInit({"message0": "motion sensor quaternion", "output": "Array", "colour": 180, "tooltip": "Get quaternion"});}};
      Blockly.Blocks['spike_motion_sensor_reset_tap_count'] = {init: function() {this.jsonInit({"message0": "motion sensor reset tap count", "previousStatement": null, "nextStatement": null, "colour": 180, "tooltip": "Reset tap count"});}};
      Blockly.Blocks['spike_motion_sensor_reset_yaw'] = {init: function() {this.jsonInit({"message0": "motion sensor reset yaw angle %1", "args0": [{"type": "input_value", "name": "ANGLE", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 180, "tooltip": "Reset yaw angle"});}};
      Blockly.Blocks['spike_motion_sensor_set_yaw_face'] = {init: function() {this.jsonInit({"message0": "motion sensor set yaw face up %1", "args0": [{"type": "input_value", "name": "UP", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 180, "tooltip": "Set yaw face"});}};
      Blockly.Blocks['spike_motion_sensor_stable'] = {init: function() {this.jsonInit({"message0": "motion sensor stable", "output": "Boolean", "colour": 180, "tooltip": "Check if stable"});}};
      Blockly.Blocks['spike_motion_sensor_tap_count'] = {init: function() {this.jsonInit({"message0": "motion sensor tap count", "output": "Number", "colour": 180, "tooltip": "Get tap count"});}};
      Blockly.Blocks['spike_motion_sensor_tilt_angles'] = {init: function() {this.jsonInit({"message0": "motion sensor tilt angles", "output": "Array", "colour": 180, "tooltip": "Get tilt angles"});}};
      Blockly.Blocks['spike_motion_sensor_up_face'] = {init: function() {this.jsonInit({"message0": "motion sensor up face", "output": "Number", "colour": 180, "tooltip": "Get up face"});}};
      // Hub
      Blockly.Blocks['spike_device_uuid'] = {init: function() {this.jsonInit({"message0": "device uuid", "output": "String", "colour": 190, "tooltip": "Get device UUID"});}};
      Blockly.Blocks['spike_hardware_id'] = {init: function() {this.jsonInit({"message0": "hardware id", "output": "String", "colour": 190, "tooltip": "Get hardware ID"});}};
      Blockly.Blocks['spike_power_off'] = {init: function() {this.jsonInit({"message0": "power off", "previousStatement": null, "nextStatement": null, "colour": 190, "tooltip": "Power off hub"});}};
      Blockly.Blocks['spike_temperature'] = {init: function() {this.jsonInit({"message0": "temperature", "output": "Number", "colour": 190, "tooltip": "Get hub temperature"});}};
      // Motor
      Blockly.Blocks['spike_motor_absolute_position'] = {init: function() {this.jsonInit({"message0": "motor absolute position port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Number", "colour": 200, "tooltip": "Get absolute position"});}};
      Blockly.Blocks['spike_motor_get_duty_cycle'] = {init: function() {this.jsonInit({"message0": "motor get duty cycle port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Number", "colour": 200, "tooltip": "Get duty cycle"});}};
      Blockly.Blocks['spike_motor_relative_position'] = {init: function() {this.jsonInit({"message0": "motor relative position port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Number", "colour": 200, "tooltip": "Get relative position"});}};
      Blockly.Blocks['spike_motor_reset_relative_position'] = {init: function() {this.jsonInit({"message0": "motor reset relative position port %1 position %2", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "POSITION", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 200, "tooltip": "Reset relative position"});}};
      Blockly.Blocks['spike_motor_run'] = {init: function() {this.jsonInit({"message0": "motor run port %1 velocity %2 acceleration %3", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "VELOCITY", "check": "Number"}, {"type": "input_value", "name": "ACCELERATION", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 200, "tooltip": "Run motor"});}};
      Blockly.Blocks['spike_motor_run_for_degrees'] = {init: function() {this.jsonInit({"message0": "motor run for degrees port %1 degrees %2 velocity %3", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "DEGREES", "check": "Number"}, {"type": "input_value", "name": "VELOCITY", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 200, "tooltip": "Run for degrees"});}};
      Blockly.Blocks['spike_motor_run_for_time'] = {init: function() {this.jsonInit({"message0": "motor run for time port %1 duration %2 velocity %3", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "DURATION", "check": "Number"}, {"type": "input_value", "name": "VELOCITY", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 200, "tooltip": "Run for time"});}};
      Blockly.Blocks['spike_motor_run_to_absolute_position'] = {init: function() {this.jsonInit({"message0": "motor run to absolute position port %1 position %2 velocity %3", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "POSITION", "check": "Number"}, {"type": "input_value", "name": "VELOCITY", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 200, "tooltip": "Run to absolute position"});}};
      Blockly.Blocks['spike_motor_run_to_relative_position'] = {init: function() {this.jsonInit({"message0": "motor run to relative position port %1 position %2 velocity %3", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "POSITION", "check": "Number"}, {"type": "input_value", "name": "VELOCITY", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 200, "tooltip": "Run to relative position"});}};
      Blockly.Blocks['spike_motor_set_duty_cycle'] = {init: function() {this.jsonInit({"message0": "motor set duty cycle port %1 pwm %2", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}, {"type": "input_value", "name": "PWM", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 200, "tooltip": "Set duty cycle"});}};
      Blockly.Blocks['spike_motor_stop'] = {init: function() {this.jsonInit({"message0": "motor stop port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 200, "tooltip": "Stop motor"});}};
      Blockly.Blocks['spike_motor_velocity'] = {init: function() {this.jsonInit({"message0": "motor velocity port %1", "args0": [{"type": "input_value", "name": "PORT", "check": "Number"}], "output": "Number", "colour": 200, "tooltip": "Get velocity"});}};
      // Motor Pair
      Blockly.Blocks['spike_motor_pair_pair'] = {init: function() {this.jsonInit({"message0": "motor pair pair %1 left %2 right %3", "args0": [{"type": "input_value", "name": "PAIR", "check": "Number"}, {"type": "input_value", "name": "LEFT", "check": "Number"}, {"type": "input_value", "name": "RIGHT", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 210, "tooltip": "Pair motors"});}};
      Blockly.Blocks['spike_motor_pair_move'] = {init: function() {this.jsonInit({"message0": "motor pair move %1 steering %2 velocity %3 acceleration %4", "args0": [{"type": "input_value", "name": "PAIR", "check": "Number"}, {"type": "input_value", "name": "STEERING", "check": "Number"}, {"type": "input_value", "name": "VELOCITY", "check": "Number"}, {"type": "input_value", "name": "ACCELERATION", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 210, "tooltip": "Move motor pair"});}};
      Blockly.Blocks['spike_motor_pair_move_for_degrees'] = {init: function() {this.jsonInit({"message0": "motor pair move for degrees %1 degrees %2 steering %3 velocity %4", "args0": [{"type": "input_value", "name": "PAIR", "check": "Number"}, {"type": "input_value", "name": "DEGREES", "check": "Number"}, {"type": "input_value", "name": "STEERING", "check": "Number"}, {"type": "input_value", "name": "VELOCITY", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 210, "tooltip": "Move for degrees"});}};
      Blockly.Blocks['spike_motor_pair_move_for_time'] = {init: function() {this.jsonInit({"message0": "motor pair move for time %1 duration %2 steering %3 velocity %4", "args0": [{"type": "input_value", "name": "PAIR", "check": "Number"}, {"type": "input_value", "name": "DURATION", "check": "Number"}, {"type": "input_value", "name": "STEERING", "check": "Number"}, {"type": "input_value", "name": "VELOCITY", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 210, "tooltip": "Move for time"});}};
      Blockly.Blocks['spike_motor_pair_move_tank'] = {init: function() {this.jsonInit({"message0": "motor pair move tank %1 left velocity %2 right velocity %3 acceleration %4", "args0": [{"type": "input_value", "name": "PAIR", "check": "Number"}, {"type": "input_value", "name": "LEFT_VELOCITY", "check": "Number"}, {"type": "input_value", "name": "RIGHT_VELOCITY", "check": "Number"}, {"type": "input_value", "name": "ACCELERATION", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 210, "tooltip": "Tank move"});}};
      Blockly.Blocks['spike_motor_pair_move_tank_for_degrees'] = {init: function() {this.jsonInit({"message0": "motor pair move tank for degrees %1 degrees %2 left velocity %3 right velocity %4", "args0": [{"type": "input_value", "name": "PAIR", "check": "Number"}, {"type": "input_value", "name": "DEGREES", "check": "Number"}, {"type": "input_value", "name": "LEFT_VELOCITY", "check": "Number"}, {"type": "input_value", "name": "RIGHT_VELOCITY", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 210, "tooltip": "Tank move for degrees"});}};
      Blockly.Blocks['spike_motor_pair_move_tank_for_time'] = {init: function() {this.jsonInit({"message0": "motor pair move tank for time %1 left velocity %2 right velocity %3 duration %4", "args0": [{"type": "input_value", "name": "PAIR", "check": "Number"}, {"type": "input_value", "name": "LEFT_VELOCITY", "check": "Number"}, {"type": "input_value", "name": "RIGHT_VELOCITY", "check": "Number"}, {"type": "input_value", "name": "DURATION", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 210, "tooltip": "Tank move for time"});}};
      Blockly.Blocks['spike_motor_pair_stop'] = {init: function() {this.jsonInit({"message0": "motor pair stop %1", "args0": [{"type": "input_value", "name": "PAIR", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 210, "tooltip": "Stop motor pair"});}};
      Blockly.Blocks['spike_motor_pair_unpair'] = {init: function() {this.jsonInit({"message0": "motor pair unpair %1", "args0": [{"type": "input_value", "name": "PAIR", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 210, "tooltip": "Unpair motors"});}};
      // Runloop
      Blockly.Blocks['spike_runloop_run'] = {init: function() {this.jsonInit({"message0": "runloop run functions %1", "args0": [{"type": "input_value", "name": "FUNCTIONS", "check": "Array"}], "previousStatement": null, "nextStatement": null, "colour": 220, "tooltip": "Run async functions"});}};
      Blockly.Blocks['spike_runloop_sleep_ms'] = {init: function() {this.jsonInit({"message0": "runloop sleep ms %1", "args0": [{"type": "input_value", "name": "DURATION", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 220, "tooltip": "Sleep ms"});}};
      Blockly.Blocks['spike_runloop_until'] = {init: function() {this.jsonInit({"message0": "runloop until condition %1 timeout %2", "args0": [{"type": "input_value", "name": "CONDITION", "check": "Boolean"}, {"type": "input_value", "name": "TIMEOUT", "check": "Number"}], "previousStatement": null, "nextStatement": null, "colour": 220, "tooltip": "Wait until condition or timeout"});}};

      // ========================================
      // App Module Blocks (10 คำสั่งแรก)
      // ========================================
      
      // 1. app.bargraph.change(color, value)
      Blockly.Blocks['app_bargraph_change'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 bargraph change %2 to %3",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "COLOR", "options": [
                ["red", "RED"], ["green", "GREEN"], ["blue", "BLUE"], 
                ["yellow", "YELLOW"], ["orange", "ORANGE"]
              ]},
              { "type": "input_value", "name": "VALUE", "check": "Number" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Change a bargraph value"
          });
        }
      };

      // 2. app.bargraph.clear_all()
      Blockly.Blocks['app_bargraph_clear_all'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 bargraph clear all",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Clear all bargraph values"
          });
        }
      };

      // 3. app.bargraph.get_value(color)
      Blockly.Blocks['app_bargraph_get_value'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 bargraph %2 value",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "COLOR", "options": [
                ["red", "RED"], ["green", "GREEN"], ["blue", "BLUE"], 
                ["yellow", "YELLOW"], ["orange", "ORANGE"]
              ]}
            ],
            "output": "Number",
            "style": "app_blocks",
            "tooltip": "Get bargraph value for a color"
          });
        }
      };

      // 4. app.bargraph.set_value(color, value)
      Blockly.Blocks['app_bargraph_set_value'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 bargraph set %2 to %3",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "COLOR", "options": [
                ["red", "RED"], ["green", "GREEN"], ["blue", "BLUE"], 
                ["yellow", "YELLOW"], ["orange", "ORANGE"]
              ]},
              { "type": "input_value", "name": "VALUE", "check": "Number" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Set bargraph value"
          });
        }
      };

      // 5. app.bargraph.show(fullscreen)
      Blockly.Blocks['app_bargraph_show'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 bargraph show %2",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "FULLSCREEN", "options": [
                ["fullscreen", "TRUE"], 
                ["normal", "FALSE"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Show bargraph"
          });
        }
      };

      // 6. app.bargraph.hide()
      Blockly.Blocks['app_bargraph_hide'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 bargraph hide",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Hide bargraph"
          });
        }
      };

      // 7. app.display.image(image)
      Blockly.Blocks['app_display_image'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 display image %2",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "IMAGE", "options": [
                ["Robot 1", "IMAGE_ROBOT_1"], 
                ["Robot 2", "IMAGE_ROBOT_2"],
                ["Hub 1", "IMAGE_HUB_1"], 
                ["Beach", "IMAGE_BEACH"],
                ["Moon", "IMAGE_MOON"],
                ["Cave", "IMAGE_CAVE"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Display an image in the app"
          });
        }
      };

      // 8. app.display.text(text)
      Blockly.Blocks['app_display_text'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 display text %2",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "input_value", "name": "TEXT", "check": "String" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Display text in the app"
          });
        }
      };

      // 9. app.display.show(fullscreen)
      Blockly.Blocks['app_display_show'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 display show %2",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "FULLSCREEN", "options": [
                ["fullscreen", "TRUE"], 
                ["normal", "FALSE"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Show display"
          });
        }
      };

      // 10. app.display.hide()
      Blockly.Blocks['app_display_hide'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 display hide",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Hide display"
          });
        }
      };

      // ========================================
      // App.Linegraph Blocks (คำสั่งที่ 11-19)
      // ========================================

      // 11. app.linegraph.clear(color)
      Blockly.Blocks['app_linegraph_clear'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 linegraph clear %2",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "COLOR", "options": [
                ["red", "RED"], ["green", "GREEN"], ["blue", "BLUE"], 
                ["yellow", "YELLOW"], ["orange", "ORANGE"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Clear linegraph for a color"
          });
        }
      };

      // 12. app.linegraph.clear_all()
      Blockly.Blocks['app_linegraph_clear_all'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 linegraph clear all",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Clear all linegraph data"
          });
        }
      };

      // 13. app.linegraph.get_average(color)
      Blockly.Blocks['app_linegraph_get_average'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 linegraph %2 average",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "COLOR", "options": [
                ["red", "RED"], ["green", "GREEN"], ["blue", "BLUE"], 
                ["yellow", "YELLOW"], ["orange", "ORANGE"]
              ]}
            ],
            "output": "Number",
            "style": "app_blocks",
            "tooltip": "Get average value from linegraph"
          });
        }
      };

      // 14. app.linegraph.get_last(color)
      Blockly.Blocks['app_linegraph_get_last'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 linegraph %2 last",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "COLOR", "options": [
                ["red", "RED"], ["green", "GREEN"], ["blue", "BLUE"], 
                ["yellow", "YELLOW"], ["orange", "ORANGE"]
              ]}
            ],
            "output": "Number",
            "style": "app_blocks",
            "tooltip": "Get last value from linegraph"
          });
        }
      };

      // 15. app.linegraph.get_max(color)
      Blockly.Blocks['app_linegraph_get_max'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 linegraph %2 max",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "COLOR", "options": [
                ["red", "RED"], ["green", "GREEN"], ["blue", "BLUE"], 
                ["yellow", "YELLOW"], ["orange", "ORANGE"]
              ]}
            ],
            "output": "Number",
            "style": "app_blocks",
            "tooltip": "Get maximum value from linegraph"
          });
        }
      };

      // 16. app.linegraph.get_min(color)
      Blockly.Blocks['app_linegraph_get_min'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 linegraph %2 min",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "COLOR", "options": [
                ["red", "RED"], ["green", "GREEN"], ["blue", "BLUE"], 
                ["yellow", "YELLOW"], ["orange", "ORANGE"]
              ]}
            ],
            "output": "Number",
            "style": "app_blocks",
            "tooltip": "Get minimum value from linegraph"
          });
        }
      };

      // 17. app.linegraph.hide()
      Blockly.Blocks['app_linegraph_hide'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 linegraph hide",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Hide linegraph"
          });
        }
      };

      // 18. app.linegraph.plot(color, x, y)
      Blockly.Blocks['app_linegraph_plot'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 linegraph plot %2 x: %3 y: %4",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "COLOR", "options": [
                ["red", "RED"], ["green", "GREEN"], ["blue", "BLUE"], 
                ["yellow", "YELLOW"], ["orange", "ORANGE"]
              ]},
              { "type": "input_value", "name": "X", "check": "Number" },
              { "type": "input_value", "name": "Y", "check": "Number" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Plot a point on linegraph"
          });
        }
      };

      // 19. app.linegraph.show(fullscreen)
      Blockly.Blocks['app_linegraph_show'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 linegraph show %2",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "FULLSCREEN", "options": [
                ["fullscreen", "TRUE"], 
                ["normal", "FALSE"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Show linegraph"
          });
        }
      };

      // ========================================
      // App.Music Blocks (คำสั่งที่ 20)
      // ========================================

      // 20. app.music.play_drum(drum)
      Blockly.Blocks['app_music_play_drum'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 play drum %2",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "DRUM", "options": [
                ["Snare", "DRUM_SNARE"],
                ["Bass", "DRUM_BASS"],
                ["Side Stick", "DRUM_SIDE_STICK"],
                ["Crash Cymbal", "DRUM_CRASH_CYMBAL"],
                ["Open Hi-Hat", "DRUM_OPEN_HI_HAT"],
                ["Closed Hi-Hat", "DRUM_CLOSED_HI_HAT"],
                ["Tambourine", "DRUM_TAMBOURINE"],
                ["Hand Clap", "DRUM_HAND_CLAP"],
                ["Cowbell", "DRUM_COWBELL"],
                ["Bongo", "DRUM_BONGO"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Play a drum sound"
          });
        }
      };

      // 21. app.music.play_instrument(instrument, note, duration)
      Blockly.Blocks['app_music_play_instrument'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 play %2 note %3 for %4 ms",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "INSTRUMENT", "options": [
                ["Piano", "INSTRUMENT_PIANO"],
                ["Electric Piano", "INSTRUMENT_ELECTRIC_PIANO"],
                ["Organ", "INSTRUMENT_ORGAN"],
                ["Guitar", "INSTRUMENT_GUITAR"],
                ["Electric Guitar", "INSTRUMENT_ELECTRIC_GUITAR"],
                ["Bass", "INSTRUMENT_BASS"],
                ["Violin", "INSTRUMENT_VIOLIN"],
                ["Saxophone", "INSTRUMENT_SAXOPHONE"],
                ["Flute", "INSTRUMENT_FLUTE"],
                ["Steel Drum", "INSTRUMENT_STEEL_DRUM"]
              ]},
              { "type": "input_value", "name": "NOTE", "check": "Number" },
              { "type": "input_value", "name": "DURATION", "check": "Number" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Play an instrument note"
          });
        }
      };

      // ========================================
      // App.Sound Blocks (คำสั่งที่ 22-24)
      // ========================================

      // 22. app.sound.play(sound_name, volume, pitch, pan)
      Blockly.Blocks['app_sound_play'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 sound play %2 volume %3",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "input_value", "name": "SOUND", "check": "String" },
              { "type": "input_value", "name": "VOLUME", "check": "Number" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Play a sound in the app"
          });
        }
      };

      // 23. app.sound.set_attributes(volume, pitch, pan)
      Blockly.Blocks['app_sound_set_attributes'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 sound set volume %2 pitch %3 pan %4",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "input_value", "name": "VOLUME", "check": "Number" },
              { "type": "input_value", "name": "PITCH", "check": "Number" },
              { "type": "input_value", "name": "PAN", "check": "Number" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Set sound attributes"
          });
        }
      };

      // 24. app.sound.stop()
      Blockly.Blocks['app_sound_stop'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 sound stop",
            "args0": [
              { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "app_blocks",
            "tooltip": "Stop all sounds"
          });
        }
      };

      // ========================================
      // Color Matrix Blocks (คำสั่งที่ 25-28)
      // ========================================

      // 25. color_matrix.clear(port)
      Blockly.Blocks['color_matrix_clear'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 color matrix clear port %2",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "🎨" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "sensor_blocks",
            "tooltip": "Turn off all pixels on color matrix"
          });
        }
      };

      // 26. color_matrix.get_pixel(port, x, y)
      Blockly.Blocks['color_matrix_get_pixel'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 color matrix port %2 pixel x: %3 y: %4",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "🎨" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "field_number", "name": "X", "value": 0, "min": 0, "max": 2 },
              { "type": "field_number", "name": "Y", "value": 0, "min": 0, "max": 2 }
            ],
            "output": "Array",
            "style": "sensor_blocks",
            "tooltip": "Get pixel color and intensity"
          });
        }
      };

      // 27. color_matrix.set_pixel(port, x, y, color, intensity)
      Blockly.Blocks['color_matrix_set_pixel'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 color matrix port %2 set x: %3 y: %4 to %5 intensity %6",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "🎨" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "field_number", "name": "X", "value": 0, "min": 0, "max": 2 },
              { "type": "field_number", "name": "Y", "value": 0, "min": 0, "max": 2 },
              { "type": "field_dropdown", "name": "COLOR", "options": [
                ["Red", "RED"], ["Green", "GREEN"], ["Blue", "BLUE"],
                ["Yellow", "YELLOW"], ["Orange", "ORANGE"], ["White", "WHITE"]
              ]},
              { "type": "field_number", "name": "INTENSITY", "value": 10, "min": 0, "max": 100 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "sensor_blocks",
            "tooltip": "Set a pixel on color matrix"
          });
        }
      };

      // 28. color_matrix.show(port, pixels)
      Blockly.Blocks['color_matrix_show'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 color matrix port %2 show pixels %3",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "🎨" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "input_value", "name": "PIXELS", "check": "Array" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "sensor_blocks",
            "tooltip": "Show all pixels on color matrix"
          });
        }
      };

      // ========================================
      // Color Sensor Blocks (คำสั่งที่ 29-30)
      // ========================================

      // 29. color_sensor.color(port)
      Blockly.Blocks['color_sensor_color'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 color sensor port %2 color",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "🌈" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "output": "Number",
            "style": "sensor_blocks",
            "tooltip": "Get detected color"
          });
        }
      };

      // 30. color_sensor.reflection(port)
      Blockly.Blocks['color_sensor_reflection'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 color sensor port %2 reflection",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "🌈" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "output": "Number",
            "style": "sensor_blocks",
            "tooltip": "Get reflection intensity (0-100%)"
          });
        }
      };

      // ========================================
      // Distance Sensor Blocks (คำสั่งที่ 31-35)
      // ========================================

      // 31. distance_sensor.clear(port)
      Blockly.Blocks['distance_sensor_clear'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 distance sensor clear port %2",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "📏" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "sensor_blocks",
            "tooltip": "Turn off all lights in Distance Sensor"
          });
        }
      };

      // 32. distance_sensor.distance(port)
      Blockly.Blocks['distance_sensor_distance'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 distance sensor port %2 distance (mm)",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "📏" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "output": "Number",
            "style": "sensor_blocks",
            "tooltip": "Get distance in millimeters (-1 if invalid)"
          });
        }
      };

      // 33. distance_sensor.get_pixel(port, x, y)
      Blockly.Blocks['distance_sensor_get_pixel'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 distance sensor port %2 pixel x: %3 y: %4",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "📏" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "field_number", "name": "X", "value": 0, "min": 0, "max": 3 },
              { "type": "field_number", "name": "Y", "value": 0, "min": 0, "max": 3 }
            ],
            "output": "Number",
            "style": "sensor_blocks",
            "tooltip": "Get pixel intensity"
          });
        }
      };

      // 34. distance_sensor.set_pixel(port, x, y, intensity)
      Blockly.Blocks['distance_sensor_set_pixel'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 distance sensor port %2 set x: %3 y: %4 intensity %5",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "📏" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "field_number", "name": "X", "value": 0, "min": 0, "max": 3 },
              { "type": "field_number", "name": "Y", "value": 0, "min": 0, "max": 3 },
              { "type": "field_number", "name": "INTENSITY", "value": 100, "min": 0, "max": 100 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "sensor_blocks",
            "tooltip": "Set a pixel on distance sensor"
          });
        }
      };

      // 35. distance_sensor.show(port, pixels)
      Blockly.Blocks['distance_sensor_show'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 distance sensor port %2 show pixels %3",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "📏" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "input_value", "name": "PIXELS", "check": "Array" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "sensor_blocks",
            "tooltip": "Show all pixels on distance sensor"
          });
        }
      };

      // ========================================
      // Force Sensor Blocks (คำสั่งที่ 36-38)
      // ========================================

      // 36. force_sensor.force(port)
      Blockly.Blocks['force_sensor_force'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 force sensor port %2 force (dN)",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "💪" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "output": "Number",
            "style": "sensor_blocks",
            "tooltip": "Get force in decinewtons (0-100)"
          });
        }
      };

      // 37. force_sensor.pressed(port)
      Blockly.Blocks['force_sensor_pressed'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 force sensor port %2 pressed?",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "💪" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "output": "Boolean",
            "style": "sensor_blocks",
            "tooltip": "Check if force sensor is pressed"
          });
        }
      };

      // 38. force_sensor.raw(port)
      Blockly.Blocks['force_sensor_raw'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 force sensor port %2 raw value",
            "args0": [
              { "type": "field_image", "src": icons.sensor, "width": 20, "height": 20, "alt": "💪" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "output": "Number",
            "style": "sensor_blocks",
            "tooltip": "Get raw uncalibrated force value"
          });
        }
      };

      // ========================================
      // Hub.device Blocks (คำสั่งที่ 39-42)
      // ========================================

      // 39. hub.device.device_uuid()
      Blockly.Blocks['hub_device_uuid'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub device UUID",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "output": "String",
            "style": "hub_blocks",
            "tooltip": "Get unique device identifier"
          });
        }
      };

      // 40. hub.device.hardware_id()
      Blockly.Blocks['hub_hardware_id'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub hardware ID",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "output": "String",
            "style": "hub_blocks",
            "tooltip": "Get hardware identifier"
          });
        }
      };

      // 41. hub.device.temperature()
      Blockly.Blocks['hub_temperature'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub temperature (°C)",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "output": "Number",
            "style": "hub_blocks",
            "tooltip": "Get hub temperature in Celsius"
          });
        }
      };

      // 42. hub.device.power_off(fast_shutdown)
      Blockly.Blocks['hub_power_off'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub power off fast: %2",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_checkbox", "name": "FAST", "checked": false }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Turn off the hub"
          });
        }
      };

      // ========================================
      // Hub.button Blocks (คำสั่งที่ 43)
      // ========================================

      // 43. hub.button.pressed(button)
      Blockly.Blocks['hub_button_pressed'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub button %2 pressed?",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_dropdown", "name": "BUTTON", "options": [
                ["Left", "LEFT"],
                ["Right", "RIGHT"],
                ["Center", "CENTER"],
                ["Bluetooth", "BLUETOOTH"]
              ]}
            ],
            "output": "Boolean",
            "style": "hub_blocks",
            "tooltip": "Check if button is pressed"
          });
        }
      };

      // ========================================
      // Hub.light Blocks (คำสั่งที่ 44)
      // ========================================

      // 44. hub.light.color(color)
      Blockly.Blocks['hub_light_color'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub light color %2",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_dropdown", "name": "COLOR", "options": [
                ["Black", "BLACK"], ["Magenta", "MAGENTA"], ["Purple", "PURPLE"],
                ["Blue", "BLUE"], ["Azure", "AZURE"], ["Turquoise", "TURQUOISE"],
                ["Green", "GREEN"], ["Yellow", "YELLOW"], ["Orange", "ORANGE"],
                ["Red", "RED"], ["White", "WHITE"], ["Pink", "PINK"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Set hub status light color"
          });
        }
      };

      // ========================================
      // Hub.light_matrix Blocks (คำสั่งที่ 45-52)
      // ========================================

      // 45. hub.light_matrix.clear()
      Blockly.Blocks['hub_light_matrix_clear'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub light matrix clear",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Turn off all pixels"
          });
        }
      };

      // 46. hub.light_matrix.get_orientation()
      Blockly.Blocks['hub_light_matrix_get_orientation'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub light matrix orientation",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "output": "Number",
            "style": "hub_blocks",
            "tooltip": "Get display orientation"
          });
        }
      };

      // 47. hub.light_matrix.get_pixel(x, y)
      Blockly.Blocks['hub_light_matrix_get_pixel'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub light matrix pixel x: %2 y: %3",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_number", "name": "X", "value": 0, "min": 0, "max": 4 },
              { "type": "field_number", "name": "Y", "value": 0, "min": 0, "max": 4 }
            ],
            "output": "Number",
            "style": "hub_blocks",
            "tooltip": "Get pixel brightness"
          });
        }
      };

      // 48. hub.light_matrix.set_orientation(orientation)
      Blockly.Blocks['hub_light_matrix_set_orientation'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub light matrix orientation %2",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_dropdown", "name": "ORIENTATION", "options": [
                ["Up", "UP"], ["Left", "LEFT"], ["Down", "DOWN"], ["Right", "RIGHT"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Set display orientation"
          });
        }
      };

      // 49. hub.light_matrix.set_pixel(x, y, brightness)
      Blockly.Blocks['hub_light_matrix_set_pixel'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub light matrix x: %2 y: %3 brightness %4",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_number", "name": "X", "value": 0, "min": 0, "max": 4 },
              { "type": "field_number", "name": "Y", "value": 0, "min": 0, "max": 4 },
              { "type": "field_number", "name": "BRIGHTNESS", "value": 100, "min": 0, "max": 100 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Set pixel brightness (0-100)"
          });
        }
      };

      // 50. hub.light_matrix.show(pixels)
      Blockly.Blocks['hub_light_matrix_show'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub light matrix show %2",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "input_value", "name": "PIXELS", "check": "Array" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Show pixel array on display"
          });
        }
      };

      // 51. hub.light_matrix.show_image(image)
      Blockly.Blocks['hub_light_matrix_show_image'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub light matrix show image %2",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_dropdown", "name": "IMAGE", "options": [
                ["Happy", "HAPPY"], ["Sad", "SAD"], ["Angry", "ANGRY"], 
                ["Heart", "HEART"], ["Yes", "YES"], ["No", "NO"],
                ["Arrow North", "ARROW_N"], ["Arrow East", "ARROW_E"],
                ["Arrow South", "ARROW_S"], ["Arrow West", "ARROW_W"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Show predefined image"
          });
        }
      };

      // 52. hub.light_matrix.write(text)
      Blockly.Blocks['hub_light_matrix_write'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub light matrix write %2",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "input_value", "name": "TEXT", "check": "String" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Write text on display"
          });
        }
      };

      // ========================================
      // Hub.motion_sensor Blocks (คำสั่งที่ 53-63)
      // ========================================

      // 53. hub.motion_sensor.acceleration(raw)
      Blockly.Blocks['hub_motion_acceleration'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub motion acceleration raw: %2",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_checkbox", "name": "RAW", "checked": false }
            ],
            "output": "Array",
            "style": "hub_blocks",
            "tooltip": "Get acceleration [x, y, z]"
          });
        }
      };

      // 54. hub.motion_sensor.angular_velocity(raw)
      Blockly.Blocks['hub_motion_angular_velocity'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub motion angular velocity raw: %2",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_checkbox", "name": "RAW", "checked": false }
            ],
            "output": "Array",
            "style": "hub_blocks",
            "tooltip": "Get angular velocity [x, y, z]"
          });
        }
      };

      // 55. hub.motion_sensor.gesture()
      Blockly.Blocks['hub_motion_gesture'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub motion gesture",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "output": "Number",
            "style": "hub_blocks",
            "tooltip": "Get current gesture"
          });
        }
      };

      // 56. hub.motion_sensor.get_yaw_face()
      Blockly.Blocks['hub_motion_get_yaw_face'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub motion yaw face",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "output": "Number",
            "style": "hub_blocks",
            "tooltip": "Get yaw face"
          });
        }
      };

      // 57. hub.motion_sensor.quaternion()
      Blockly.Blocks['hub_motion_quaternion'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub motion quaternion",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "output": "Array",
            "style": "hub_blocks",
            "tooltip": "Get orientation as quaternion"
          });
        }
      };

      // 58. hub.motion_sensor.reset_tap_count()
      Blockly.Blocks['hub_motion_reset_tap_count'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub motion reset tap count",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Reset tap counter to zero"
          });
        }
      };

      // 59. hub.motion_sensor.reset_yaw(angle)
      Blockly.Blocks['hub_motion_reset_yaw'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub motion reset yaw %2",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_number", "name": "ANGLE", "value": 0 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Reset yaw angle"
          });
        }
      };

      // 60. hub.motion_sensor.set_yaw_face(face)
      Blockly.Blocks['hub_motion_set_yaw_face'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub motion set yaw face %2",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_dropdown", "name": "FACE", "options": [
                ["Front", "FRONT"], ["Top", "TOP"], ["Right", "RIGHT"],
                ["Bottom", "BOTTOM"], ["Back", "BACK"], ["Left", "LEFT"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Set yaw face orientation"
          });
        }
      };

      // 61. hub.motion_sensor.stable()
      Blockly.Blocks['hub_motion_stable'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub motion stable?",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "output": "Boolean",
            "style": "hub_blocks",
            "tooltip": "Check if hub is stable"
          });
        }
      };

      // 62. hub.motion_sensor.tap_count()
      Blockly.Blocks['hub_motion_tap_count'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub motion tap count",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "output": "Number",
            "style": "hub_blocks",
            "tooltip": "Get number of taps"
          });
        }
      };

      // 63. hub.motion_sensor.tilt_angles()
      Blockly.Blocks['hub_motion_tilt_angles'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub motion tilt angles",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "output": "Array",
            "style": "hub_blocks",
            "tooltip": "Get tilt angles [yaw, pitch, roll]"
          });
        }
      };

      // 64. hub.motion_sensor.up_face()
      Blockly.Blocks['hub_motion_up_face'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub motion up face",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "output": "Number",
            "style": "hub_blocks",
            "tooltip": "Get which face is up"
          });
        }
      };

      // ========================================
      // Hub.sound Blocks (คำสั่งที่ 65-67)
      // ========================================

      // 65. hub.sound.beep(frequency, duration, waveform)
      Blockly.Blocks['hub_sound_beep'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub beep freq: %2 ms: %3 wave: %4",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_number", "name": "FREQUENCY", "value": 440, "min": 0 },
              { "type": "field_number", "name": "DURATION", "value": 1000, "min": 0 },
              { "type": "field_dropdown", "name": "WAVEFORM", "options": [
                ["Sine", "SINE"], ["Square", "SQUARE"], ["Triangle", "TRIANGLE"], ["Sawtooth", "SAWTOOTH"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Play a beep sound"
          });
        }
      };

      // 66. hub.sound.stop()
      Blockly.Blocks['hub_sound_stop'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub sound stop",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Stop all sounds"
          });
        }
      };

      // 67. hub.sound.volume(volume)
      Blockly.Blocks['hub_sound_volume'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 hub sound volume %2",
            "args0": [
              { "type": "field_image", "src": icons.hub, "width": 20, "height": 20, "alt": "🎮" },
              { "type": "field_number", "name": "VOLUME", "value": 100, "min": 0, "max": 100 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "hub_blocks",
            "tooltip": "Set sound volume (0-100)"
          });
        }
      };

      // ========================================
      // Event Blocks
      // ========================================
      
      // นิยามบล็อก (Custom Blocks)
      Blockly.Blocks['event_whenflagclicked'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 when clicked",
            "args0": [
              { "type": "field_image", "src": icons.flag, "width": 20, "height": 20, "alt": "🏁" }
            ],
            "style": "events_blocks",
            "nextStatement": null
          });
        }
      };

      // ========================================
      // Motor Blocks (คำสั่งที่ 68-79)
      // ========================================

      // 68. motor.absolute_position(port)
      Blockly.Blocks['motor_absolute_position'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 motor port %2 absolute position",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "output": "Number",
            "style": "motion_blocks",
            "tooltip": "Get absolute motor position in degrees"
          });
        }
      };

      // 69. motor.relative_position(port)
      Blockly.Blocks['motor_relative_position'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 motor port %2 relative position",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "output": "Number",
            "style": "motion_blocks",
            "tooltip": "Get relative motor position in degrees"
          });
        }
      };

      // 70. motor.reset_relative_position(port, position)
      Blockly.Blocks['motor_reset_relative_position'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 motor port %2 reset position to %3",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "field_number", "name": "POSITION", "value": 0 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Reset motor relative position"
          });
        }
      };

      // 71. motor.run(port, velocity)
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

      // 72. motor.run_for_degrees(port, degrees, velocity)
      Blockly.Blocks['motor_run_for_degrees'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 motor port %2 run %3° velocity %4",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "field_number", "name": "DEGREES", "value": 360 },
              { "type": "field_number", "name": "VELOCITY", "value": 360 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Run motor for specified degrees"
          });
        }
      };

      // 73. motor.run_for_time(port, duration, velocity)
      Blockly.Blocks['motor_run_for_time'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 motor port %2 run %3 ms velocity %4",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "field_number", "name": "DURATION", "value": 1000 },
              { "type": "field_number", "name": "VELOCITY", "value": 360 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Run motor for specified time"
          });
        }
      };

      // 74. motor.run_to_absolute_position(port, position, velocity)
      Blockly.Blocks['motor_run_to_absolute_position'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 motor port %2 to position %3° velocity %4",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "field_number", "name": "POSITION", "value": 0 },
              { "type": "field_number", "name": "VELOCITY", "value": 360 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Run to absolute position"
          });
        }
      };

      // 75. motor.run_to_relative_position(port, position, velocity)
      Blockly.Blocks['motor_run_to_relative_position'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 motor port %2 to relative %3° velocity %4",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "field_number", "name": "POSITION", "value": 0 },
              { "type": "field_number", "name": "VELOCITY", "value": 360 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Run to relative position"
          });
        }
      };

      // 76. motor.set_duty_cycle(port, duty_cycle)
      Blockly.Blocks['motor_set_duty_cycle'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 motor port %2 duty cycle %3",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "field_number", "name": "DUTY", "value": 100, "min": -100, "max": 100 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Set motor duty cycle (-100 to 100)"
          });
        }
      };

      // 77. motor.stop(port)
      Blockly.Blocks['motor_stop'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 motor port %2 stop",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Stop the motor"
          });
        }
      };

      // 78. motor.velocity(port)
      Blockly.Blocks['motor_velocity'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 motor port %2 velocity",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "output": "Number",
            "style": "motion_blocks",
            "tooltip": "Get motor velocity (deg/s)"
          });
        }
      };

      // 79. motor.get_duty_cycle(port)
      Blockly.Blocks['motor_get_duty_cycle'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 motor port %2 get duty cycle",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PORT", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "output": "Number",
            "style": "motion_blocks",
            "tooltip": "Get current duty cycle"
          });
        }
      };

      // ========================================
      // Motor Pair Blocks (คำสั่งที่ 80-87)
      // ========================================

      // 80. motor_pair.pair(pair, port1, port2)
      Blockly.Blocks['motor_pair_pair'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 motor pair %2 ports %3 + %4",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PAIR", "options": [
                ["Pair 1", "PAIR_1"], ["Pair 2", "PAIR_2"], ["Pair 3", "PAIR_3"]
              ]},
              { "type": "field_dropdown", "name": "PORT1", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]},
              { "type": "field_dropdown", "name": "PORT2", "options": [
                ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Pair two motors together"
          });
        }
      };

      // 81. motor_pair.move(pair, steering, velocity)
      Blockly.Blocks['motor_pair_move'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 pair %2 move steering %3 velocity %4",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PAIR", "options": [
                ["Pair 1", "PAIR_1"], ["Pair 2", "PAIR_2"], ["Pair 3", "PAIR_3"]
              ]},
              { "type": "field_number", "name": "STEERING", "value": 0, "min": -100, "max": 100 },
              { "type": "field_number", "name": "VELOCITY", "value": 360 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Move motor pair with steering"
          });
        }
      };

      // 82. motor_pair.move_for_degrees(pair, degrees, steering, velocity)
      Blockly.Blocks['motor_pair_move_for_degrees'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 pair %2 move %3° steering %4 velocity %5",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PAIR", "options": [
                ["Pair 1", "PAIR_1"], ["Pair 2", "PAIR_2"], ["Pair 3", "PAIR_3"]
              ]},
              { "type": "field_number", "name": "DEGREES", "value": 360 },
              { "type": "field_number", "name": "STEERING", "value": 0, "min": -100, "max": 100 },
              { "type": "field_number", "name": "VELOCITY", "value": 360 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Move motor pair for degrees"
          });
        }
      };

      // 83. motor_pair.move_for_time(pair, duration, steering, velocity)
      Blockly.Blocks['motor_pair_move_for_time'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 pair %2 move %3 ms steering %4 velocity %5",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PAIR", "options": [
                ["Pair 1", "PAIR_1"], ["Pair 2", "PAIR_2"], ["Pair 3", "PAIR_3"]
              ]},
              { "type": "field_number", "name": "DURATION", "value": 1000 },
              { "type": "field_number", "name": "STEERING", "value": 0, "min": -100, "max": 100 },
              { "type": "field_number", "name": "VELOCITY", "value": 360 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Move motor pair for time"
          });
        }
      };

      // 84. motor_pair.move_tank(pair, left_velocity, right_velocity)
      Blockly.Blocks['motor_pair_move_tank'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 pair %2 tank left %3 right %4",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PAIR", "options": [
                ["Pair 1", "PAIR_1"], ["Pair 2", "PAIR_2"], ["Pair 3", "PAIR_3"]
              ]},
              { "type": "field_number", "name": "LEFT_VELOCITY", "value": 360 },
              { "type": "field_number", "name": "RIGHT_VELOCITY", "value": 360 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Tank drive with independent velocities"
          });
        }
      };

      // 85. motor_pair.move_tank_for_degrees(pair, degrees, left_velocity, right_velocity)
      Blockly.Blocks['motor_pair_move_tank_for_degrees'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 pair %2 tank %3° left %4 right %5",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PAIR", "options": [
                ["Pair 1", "PAIR_1"], ["Pair 2", "PAIR_2"], ["Pair 3", "PAIR_3"]
              ]},
              { "type": "field_number", "name": "DEGREES", "value": 360 },
              { "type": "field_number", "name": "LEFT_VELOCITY", "value": 360 },
              { "type": "field_number", "name": "RIGHT_VELOCITY", "value": 360 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Tank drive for degrees"
          });
        }
      };

      // 86. motor_pair.move_tank_for_time(pair, duration, left_velocity, right_velocity)
      Blockly.Blocks['motor_pair_move_tank_for_time'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 pair %2 tank %3 ms left %4 right %5",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PAIR", "options": [
                ["Pair 1", "PAIR_1"], ["Pair 2", "PAIR_2"], ["Pair 3", "PAIR_3"]
              ]},
              { "type": "field_number", "name": "DURATION", "value": 1000 },
              { "type": "field_number", "name": "LEFT_VELOCITY", "value": 360 },
              { "type": "field_number", "name": "RIGHT_VELOCITY", "value": 360 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Tank drive for time"
          });
        }
      };

      // 87. motor_pair.stop(pair)
      Blockly.Blocks['motor_pair_stop'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 pair %2 stop",
            "args0": [
              { "type": "field_image", "src": icons.motor, "width": 20, "height": 20, "alt": "⚙️" },
              { "type": "field_dropdown", "name": "PAIR", "options": [
                ["Pair 1", "PAIR_1"], ["Pair 2", "PAIR_2"], ["Pair 3", "PAIR_3"]
              ]}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "motion_blocks",
            "tooltip": "Stop motor pair"
          });
        }
      };

      // ========================================
      // Movement Blocks (Pink)
      // ========================================
      Blockly.Blocks['movement_move'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 move %2 for %3 %4",
            "args0": [
              { "type": "field_image", "src": icons.car, "width": 20, "height": 20, "alt": "🚗" },
              { "type": "field_dropdown", "name": "DIRECTION", "options": [["↑", "forward"], ["↓", "backward"]] },
              { "type": "field_number", "name": "AMOUNT", "value": 10 },
              { "type": "field_dropdown", "name": "UNIT", "options": [["cm", "cm"], ["rotations", "rotations"]] }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#FF6680"
          });
        }
      };

      Blockly.Blocks['movement_start'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 start moving %2",
            "args0": [
              { "type": "field_image", "src": icons.car, "width": 20, "height": 20, "alt": "🚗" },
              { "type": "field_dropdown", "name": "DIRECTION", "options": [["↑", "forward"], ["↓", "backward"]] }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#FF6680"
          });
        }
      };

      Blockly.Blocks['movement_move_direction'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 move %2 for %3 rotations",
            "args0": [
              { "type": "field_image", "src": icons.car, "width": 20, "height": 20, "alt": "🚗" },
              { "type": "field_dropdown", "name": "DIRECTION", "options": [["right 90°", "right"], ["left 90°", "left"]] },
              { "type": "field_number", "name": "ROTATIONS", "value": 10 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#FF6680"
          });
        }
      };

      Blockly.Blocks['movement_start_direction'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 start moving %2",
            "args0": [
              { "type": "field_image", "src": icons.car, "width": 20, "height": 20, "alt": "🚗" },
              { "type": "field_dropdown", "name": "DIRECTION", "options": [["right 90°", "right"], ["left 90°", "left"]] }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#FF6680"
          });
        }
      };

      Blockly.Blocks['movement_stop'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 stop moving",
            "args0": [
              { "type": "field_image", "src": icons.car, "width": 20, "height": 20, "alt": "🚗" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#FF6680"
          });
        }
      };

      Blockly.Blocks['movement_set_speed'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 set movement speed to %2 %",
            "args0": [
              { "type": "field_image", "src": icons.car, "width": 20, "height": 20, "alt": "🚗" },
              { "type": "field_number", "name": "SPEED", "value": 50, "min": 0, "max": 100 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#FF6680"
          });
        }
      };

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

      // ========================================
      // Control Blocks Advanced (คำสั่งที่ 88-95)
      // ========================================

      // 88. control_repeat
      Blockly.Blocks['control_repeat'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 repeat %2 times %3",
            "args0": [
              { "type": "field_image", "src": icons.loop, "width": 20, "height": 20, "alt": "🔄" },
              { "type": "field_number", "name": "TIMES", "value": 10, "min": 1 },
              { "type": "input_statement", "name": "SUBSTACK" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Repeat commands n times"
          });
        }
      };

      // 89. control_repeat_until
      Blockly.Blocks['control_repeat_until'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 repeat until %2 %3",
            "args0": [
              { "type": "field_image", "src": icons.loop, "width": 20, "height": 20, "alt": "🔄" },
              { "type": "input_value", "name": "CONDITION", "check": "Boolean" },
              { "type": "input_statement", "name": "SUBSTACK" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Repeat until condition is true"
          });
        }
      };

      // 90. control_if
      Blockly.Blocks['control_if'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 if %2 then %3",
            "args0": [
              { "type": "field_image", "src": icons.loop, "width": 20, "height": 20, "alt": "🔄" },
              { "type": "input_value", "name": "CONDITION", "check": "Boolean" },
              { "type": "input_statement", "name": "SUBSTACK" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "If condition then do"
          });
        }
      };

      // 91. control_if_else
      Blockly.Blocks['control_if_else'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 if %2 then %3 else %4",
            "args0": [
              { "type": "field_image", "src": icons.loop, "width": 20, "height": 20, "alt": "🔄" },
              { "type": "input_value", "name": "CONDITION", "check": "Boolean" },
              { "type": "input_statement", "name": "SUBSTACK" },
              { "type": "input_statement", "name": "SUBSTACK2" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "If-else condition"
          });
        }
      };

      // 92. control_wait_until
      Blockly.Blocks['control_wait_until'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 wait until %2",
            "args0": [
              { "type": "field_image", "src": icons.loop, "width": 20, "height": 20, "alt": "🔄" },
              { "type": "input_value", "name": "CONDITION", "check": "Boolean" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Wait until condition is true"
          });
        }
      };

      // 93. control_stop_all
      Blockly.Blocks['control_stop_all'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 stop all",
            "args0": [
              { "type": "field_image", "src": icons.loop, "width": 20, "height": 20, "alt": "🔄" }
            ],
            "previousStatement": null,
            "style": "control_blocks",
            "tooltip": "Stop all running scripts"
          });
        }
      };

      // ========================================
      // Operator Blocks - Math (คำสั่งที่ 94-101)
      // ========================================

      // 94. operator_add
      Blockly.Blocks['operator_add'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 + %2",
            "args0": [
              { "type": "input_value", "name": "NUM1", "check": "Number" },
              { "type": "input_value", "name": "NUM2", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Add two numbers"
          });
        }
      };

      // 95. operator_subtract
      Blockly.Blocks['operator_subtract'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 - %2",
            "args0": [
              { "type": "input_value", "name": "NUM1", "check": "Number" },
              { "type": "input_value", "name": "NUM2", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Subtract two numbers"
          });
        }
      };

      // 96. operator_multiply
      Blockly.Blocks['operator_multiply'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 × %2",
            "args0": [
              { "type": "input_value", "name": "NUM1", "check": "Number" },
              { "type": "input_value", "name": "NUM2", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Multiply two numbers"
          });
        }
      };

      // 97. operator_divide
      Blockly.Blocks['operator_divide'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 ÷ %2",
            "args0": [
              { "type": "input_value", "name": "NUM1", "check": "Number" },
              { "type": "input_value", "name": "NUM2", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Divide two numbers"
          });
        }
      };

      // 98. operator_random
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
            "style": "control_blocks",
            "tooltip": "Random number between range"
          });
        }
      };

      // 99. operator_mod
      Blockly.Blocks['operator_mod'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 mod %2",
            "args0": [
              { "type": "input_value", "name": "NUM1", "check": "Number" },
              { "type": "input_value", "name": "NUM2", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Modulo operation"
          });
        }
      };

      // 100. operator_round
      Blockly.Blocks['operator_round'] = {
        init: function() {
          this.jsonInit({
            "message0": "round %1",
            "args0": [
              { "type": "input_value", "name": "NUM", "check": "Number" }
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Round to nearest integer"
          });
        }
      };

      // 101. operator_mathop (abs, sqrt, etc)
      Blockly.Blocks['operator_mathop'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 of %2",
            "args0": [
              { "type": "field_dropdown", "name": "OPERATOR", "options": [
                ["abs", "abs"], ["floor", "floor"], ["ceiling", "ceiling"],
                ["sqrt", "sqrt"], ["sin", "sin"], ["cos", "cos"],
                ["tan", "tan"], ["ln", "ln"], ["log", "log"], ["e^", "exp"]
              ]},
              { "type": "input_value", "name": "NUM", "check": "Number" }
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Mathematical operations"
          });
        }
      };

      // ========================================
      // Operator Blocks - Comparison (คำสั่งที่ 102-107) - CONSOLIDATED
      // ========================================

      // Consolidated comparison block
      Blockly.Blocks['operator_comparison'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 %2 %3",
            "args0": [
              { "type": "input_value", "name": "OPERAND1" },
              { "type": "field_dropdown", "name": "OP", "options": [
                ["=", "EQ"],
                ["≠", "NEQ"],
                ["<", "LT"],
                [">", "GT"],
                ["≤", "LTE"],
                ["≥", "GTE"]
              ]},
              { "type": "input_value", "name": "OPERAND2" }
            ],
            "inputsInline": true,
            "output": "Boolean",
            "style": "control_blocks",
            "tooltip": "Compare two values"
          });
        }
      };

      // ========================================
      // Operator Blocks - Logic (คำสั่งที่ 108-110) - CONSOLIDATED
      // ========================================

      // Consolidated logic block
      Blockly.Blocks['operator_logic'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 %2 %3",
            "args0": [
              { "type": "input_value", "name": "OPERAND1", "check": "Boolean" },
              { "type": "field_dropdown", "name": "OP", "options": [
                ["and", "AND"],
                ["or", "OR"]
              ]},
              { "type": "input_value", "name": "OPERAND2", "check": "Boolean" }
            ],
            "inputsInline": true,
            "output": "Boolean",
            "style": "control_blocks",
            "tooltip": "Logical operation"
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
            "style": "control_blocks",
            "tooltip": "Logical NOT"
          });
        }
      };

      // ========================================
      // Operator Blocks - Text (คำสั่งที่ 111-114)
      // ========================================

      // 111. operator_join
      Blockly.Blocks['operator_join'] = {
        init: function() {
          this.jsonInit({
            "message0": "join %1 %2",
            "args0": [
              { "type": "input_value", "name": "STRING1", "check": "String" },
              { "type": "input_value", "name": "STRING2", "check": "String" }
            ],
            "inputsInline": true,
            "output": "String",
            "style": "control_blocks",
            "tooltip": "Join two strings"
          });
        }
      };

      // 112. operator_letter_of
      Blockly.Blocks['operator_letter_of'] = {
        init: function() {
          this.jsonInit({
            "message0": "letter %1 of %2",
            "args0": [
              { "type": "input_value", "name": "LETTER", "check": "Number" },
              { "type": "input_value", "name": "STRING", "check": "String" }
            ],
            "inputsInline": true,
            "output": "String",
            "style": "control_blocks",
            "tooltip": "Get letter at position"
          });
        }
      };

      // 113. operator_length
      Blockly.Blocks['operator_length'] = {
        init: function() {
          this.jsonInit({
            "message0": "length of %1",
            "args0": [
              { "type": "input_value", "name": "STRING", "check": "String" }
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Get string length"
          });
        }
      };

      // 114. operator_contains
      Blockly.Blocks['operator_contains'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 contains %2 ?",
            "args0": [
              { "type": "input_value", "name": "STRING1", "check": "String" },
              { "type": "input_value", "name": "STRING2", "check": "String" }
            ],
            "inputsInline": true,
            "output": "Boolean",
            "style": "control_blocks",
            "tooltip": "Check if string contains substring"
          });
        }
      };

      // ========================================
      // Data Blocks - Variables (คำสั่งที่ 115-117)
      // ========================================

      // 115. data_set_variable
      Blockly.Blocks['data_set_variable'] = {
        init: function() {
          this.jsonInit({
            "message0": "set %1 to %2",
            "args0": [
              { "type": "field_input", "name": "VAR", "text": "variable" },
              { "type": "input_value", "name": "VALUE" }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Set variable value"
          });
        }
      };

      // 116. data_change_variable
      Blockly.Blocks['data_change_variable'] = {
        init: function() {
          this.jsonInit({
            "message0": "change %1 by %2",
            "args0": [
              { "type": "field_input", "name": "VAR", "text": "variable" },
              { "type": "input_value", "name": "VALUE", "check": "Number" }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Change variable by amount"
          });
        }
      };

      // 117. data_get_variable
      Blockly.Blocks['data_get_variable'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1",
            "args0": [
              { "type": "field_input", "name": "VAR", "text": "variable" }
            ],
            "output": null,
            "style": "control_blocks",
            "tooltip": "Get variable value"
          });
        }
      };

      // ========================================
      // Data Blocks - Lists (คำสั่งที่ 118-130)
      // ========================================

      // 118. data_create_list
      Blockly.Blocks['data_create_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "create list [ ]",
            "output": "Array",
            "style": "control_blocks",
            "tooltip": "Create empty list",
            "fontColour": "#222"
          });
        }
      };

      // 119. data_add_to_list
      Blockly.Blocks['data_add_to_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "add %1 to list %2",
            "args0": [
              { "type": "input_value", "name": "ITEM" },
              { "type": "field_input", "name": "LIST", "text": "list", "spellcheck": false, "fontColour": "#222" }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Add item to list"
          });
        }
      };

      // 120. data_delete_from_list
      Blockly.Blocks['data_delete_from_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "delete %1 of list %2",
            "args0": [
              { "type": "input_value", "name": "INDEX", "check": "Number" },
              { "type": "field_input", "name": "LIST", "text": "list", "fontColour": "#222" }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Delete item from list"
          });
        }
      };

      // 121. data_insert_at_list
      Blockly.Blocks['data_insert_at_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "insert %1 at %2 of list %3",
            "args0": [
              { "type": "input_value", "name": "ITEM" },
              { "type": "input_value", "name": "INDEX", "check": "Number" },
              { "type": "field_input", "name": "LIST", "text": "list", "fontColour": "#222" }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Insert item at position"
          });
        }
      };

      // 122. data_replace_in_list
      Blockly.Blocks['data_replace_in_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "replace item %1 of list %2 with %3",
            "args0": [
              { "type": "input_value", "name": "INDEX", "check": "Number" },
              { "type": "field_input", "name": "LIST", "text": "list", "fontColour": "#222" },
              { "type": "input_value", "name": "ITEM" }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Replace item in list"
          });
        }
      };

      // 123. data_item_of_list
      Blockly.Blocks['data_item_of_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "item %1 of list %2",
            "args0": [
              { "type": "input_value", "name": "INDEX", "check": "Number" },
              { "type": "field_input", "name": "LIST", "text": "list", "fontColour": "#222" }
            ],
            "inputsInline": true,
            "output": null,
            "style": "control_blocks",
            "tooltip": "Get item from list"
          });
        }
      };

      // 124. data_length_of_list
      Blockly.Blocks['data_length_of_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "length of list %1",
            "args0": [
              { "type": "field_input", "name": "LIST", "text": "list", "fontColour": "#222" }
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Get list length"
          });
        }
      };

      // 125. data_contains_in_list
      Blockly.Blocks['data_contains_in_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "list %1 contains %2 ?",
            "args0": [
              { "type": "field_input", "name": "LIST", "text": "list", "fontColour": "#222" },
              { "type": "input_value", "name": "ITEM" }
            ],
            "inputsInline": true,
            "output": "Boolean",
            "style": "control_blocks",
            "tooltip": "Check if list contains item"
          });
        }
      };

      // ========================================
      // NEW BLOCKS - 50 Additional Commands
      // ========================================

      // Advanced Math Operations (126-135)
      
      // 126. operator_power
      Blockly.Blocks['operator_power'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 ^ %2",
            "args0": [
              { "type": "input_value", "name": "BASE", "check": "Number" },
              { "type": "input_value", "name": "EXPONENT", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Power operation"
          });
        }
      };

      // 127. operator_min
      Blockly.Blocks['operator_min'] = {
        init: function() {
          this.jsonInit({
            "message0": "min %1 %2",
            "args0": [
              { "type": "input_value", "name": "NUM1", "check": "Number" },
              { "type": "input_value", "name": "NUM2", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Minimum of two numbers"
          });
        }
      };

      // 128. operator_max
      Blockly.Blocks['operator_max'] = {
        init: function() {
          this.jsonInit({
            "message0": "max %1 %2",
            "args0": [
              { "type": "input_value", "name": "NUM1", "check": "Number" },
              { "type": "input_value", "name": "NUM2", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Maximum of two numbers"
          });
        }
      };

      // 129. operator_clamp
      Blockly.Blocks['operator_clamp'] = {
        init: function() {
          this.jsonInit({
            "message0": "clamp %1 between %2 and %3",
            "args0": [
              { "type": "input_value", "name": "VALUE", "check": "Number" },
              { "type": "input_value", "name": "MIN", "check": "Number" },
              { "type": "input_value", "name": "MAX", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Clamp value between min and max"
          });
        }
      };

      // 130. operator_map
      Blockly.Blocks['operator_map'] = {
        init: function() {
          this.jsonInit({
            "message0": "map %1 from %2 - %3 to %4 - %5",
            "args0": [
              { "type": "input_value", "name": "VALUE", "check": "Number" },
              { "type": "input_value", "name": "FROM_LOW", "check": "Number" },
              { "type": "input_value", "name": "FROM_HIGH", "check": "Number" },
              { "type": "input_value", "name": "TO_LOW", "check": "Number" },
              { "type": "input_value", "name": "TO_HIGH", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Map value from one range to another"
          });
        }
      };

      // 131. operator_constrain_angle
      Blockly.Blocks['operator_constrain_angle'] = {
        init: function() {
          this.jsonInit({
            "message0": "constrain angle %1",
            "args0": [
              { "type": "input_value", "name": "ANGLE", "check": "Number" }
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Constrain angle to 0-360"
          });
        }
      };

      // 132. operator_radians
      Blockly.Blocks['operator_radians'] = {
        init: function() {
          this.jsonInit({
            "message0": "radians %1",
            "args0": [
              { "type": "input_value", "name": "DEGREES", "check": "Number" }
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Convert degrees to radians"
          });
        }
      };

      // 133. operator_degrees
      Blockly.Blocks['operator_degrees'] = {
        init: function() {
          this.jsonInit({
            "message0": "degrees %1",
            "args0": [
              { "type": "input_value", "name": "RADIANS", "check": "Number" }
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Convert radians to degrees"
          });
        }
      };

      // 134. operator_percentage
      Blockly.Blocks['operator_percentage'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 % of %2",
            "args0": [
              { "type": "input_value", "name": "PERCENT", "check": "Number" },
              { "type": "input_value", "name": "VALUE", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Calculate percentage"
          });
        }
      };

      // 135. operator_average
      Blockly.Blocks['operator_average'] = {
        init: function() {
          this.jsonInit({
            "message0": "average of %1 %2",
            "args0": [
              { "type": "input_value", "name": "NUM1", "check": "Number" },
              { "type": "input_value", "name": "NUM2", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Average of two numbers"
          });
        }
      };

      // Advanced Text Operations (136-145)

      // 136. operator_uppercase
      Blockly.Blocks['operator_uppercase'] = {
        init: function() {
          this.jsonInit({
            "message0": "uppercase %1",
            "args0": [
              { "type": "input_value", "name": "TEXT", "check": "String" }
            ],
            "output": "String",
            "style": "control_blocks",
            "tooltip": "Convert to uppercase"
          });
        }
      };

      // 137. operator_lowercase
      Blockly.Blocks['operator_lowercase'] = {
        init: function() {
          this.jsonInit({
            "message0": "lowercase %1",
            "args0": [
              { "type": "input_value", "name": "TEXT", "check": "String" }
            ],
            "output": "String",
            "style": "control_blocks",
            "tooltip": "Convert to lowercase"
          });
        }
      };

      // 138. operator_trim
      Blockly.Blocks['operator_trim'] = {
        init: function() {
          this.jsonInit({
            "message0": "trim %1",
            "args0": [
              { "type": "input_value", "name": "TEXT", "check": "String" }
            ],
            "output": "String",
            "style": "control_blocks",
            "tooltip": "Remove spaces from both ends"
          });
        }
      };

      // 139. operator_replace
      Blockly.Blocks['operator_replace'] = {
        init: function() {
          this.jsonInit({
            "message0": "replace %1 in %2 with %3",
            "args0": [
              { "type": "input_value", "name": "OLD", "check": "String" },
              { "type": "input_value", "name": "TEXT", "check": "String" },
              { "type": "input_value", "name": "NEW", "check": "String" }
            ],
            "inputsInline": true,
            "output": "String",
            "style": "control_blocks",
            "tooltip": "Replace text"
          });
        }
      };

      // 140. operator_split
      Blockly.Blocks['operator_split'] = {
        init: function() {
          this.jsonInit({
            "message0": "split %1 by %2",
            "args0": [
              { "type": "input_value", "name": "TEXT", "check": "String" },
              { "type": "input_value", "name": "DELIMITER", "check": "String" }
            ],
            "inputsInline": true,
            "output": "Array",
            "style": "control_blocks",
            "tooltip": "Split text into list"
          });
        }
      };

      // 141. operator_reverse_text
      Blockly.Blocks['operator_reverse_text'] = {
        init: function() {
          this.jsonInit({
            "message0": "reverse %1",
            "args0": [
              { "type": "input_value", "name": "TEXT", "check": "String" }
            ],
            "output": "String",
            "style": "control_blocks",
            "tooltip": "Reverse text"
          });
        }
      };

      // 142. operator_starts_with
      Blockly.Blocks['operator_starts_with'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 starts with %2 ?",
            "args0": [
              { "type": "input_value", "name": "TEXT", "check": "String" },
              { "type": "input_value", "name": "PREFIX", "check": "String" }
            ],
            "inputsInline": true,
            "output": "Boolean",
            "style": "control_blocks",
            "tooltip": "Check if text starts with prefix"
          });
        }
      };

      // 143. operator_ends_with
      Blockly.Blocks['operator_ends_with'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 ends with %2 ?",
            "args0": [
              { "type": "input_value", "name": "TEXT", "check": "String" },
              { "type": "input_value", "name": "SUFFIX", "check": "String" }
            ],
            "inputsInline": true,
            "output": "Boolean",
            "style": "control_blocks",
            "tooltip": "Check if text ends with suffix"
          });
        }
      };

      // 144. operator_substring
      Blockly.Blocks['operator_substring'] = {
        init: function() {
          this.jsonInit({
            "message0": "substring of %1 from %2 to %3",
            "args0": [
              { "type": "input_value", "name": "TEXT", "check": "String" },
              { "type": "input_value", "name": "START", "check": "Number" },
              { "type": "input_value", "name": "END", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "String",
            "style": "control_blocks",
            "tooltip": "Get substring"
          });
        }
      };

      // 145. operator_repeat_text
      Blockly.Blocks['operator_repeat_text'] = {
        init: function() {
          this.jsonInit({
            "message0": "repeat %1 %2 times",
            "args0": [
              { "type": "input_value", "name": "TEXT", "check": "String" },
              { "type": "input_value", "name": "TIMES", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "String",
            "style": "control_blocks",
            "tooltip": "Repeat text n times"
          });
        }
      };

      // Advanced List Operations (146-155)

      // 146. data_sort_list
      Blockly.Blocks['data_sort_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "sort list %1 %2",
            "args0": [
              { "type": "field_input", "name": "LIST", "text": "list" },
              { "type": "field_dropdown", "name": "ORDER", "options": [
                ["ascending", "ASC"],
                ["descending", "DESC"]
              ]}
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Sort list"
          });
        }
      };

      // 147. data_reverse_list
      Blockly.Blocks['data_reverse_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "reverse list %1",
            "args0": [
              { "type": "field_input", "name": "LIST", "text": "list" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Reverse list"
          });
        }
      };

      // 148. data_shuffle_list
      Blockly.Blocks['data_shuffle_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "shuffle list %1",
            "args0": [
              { "type": "field_input", "name": "LIST", "text": "list" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Shuffle list randomly"
          });
        }
      };

      // 149. data_slice_list
      Blockly.Blocks['data_slice_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "slice list %1 from %2 to %3",
            "args0": [
              { "type": "field_input", "name": "LIST", "text": "list" },
              { "type": "input_value", "name": "START", "check": "Number" },
              { "type": "input_value", "name": "END", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Array",
            "style": "control_blocks",
            "tooltip": "Get slice of list"
          });
        }
      };

      // 150. data_index_of
      Blockly.Blocks['data_index_of'] = {
        init: function() {
          this.jsonInit({
            "message0": "index of %1 in list %2",
            "args0": [
              { "type": "input_value", "name": "ITEM" },
              { "type": "field_input", "name": "LIST", "text": "list" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Find index of item"
          });
        }
      };

      // 151. data_clear_list
      Blockly.Blocks['data_clear_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "clear list %1",
            "args0": [
              { "type": "field_input", "name": "LIST", "text": "list" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Clear all items from list"
          });
        }
      };

      // 152. data_count_in_list
      Blockly.Blocks['data_count_in_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "count %1 in list %2",
            "args0": [
              { "type": "input_value", "name": "ITEM" },
              { "type": "field_input", "name": "LIST", "text": "list" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Count occurrences in list"
          });
        }
      };

      // 153. data_min_of_list
      Blockly.Blocks['data_min_of_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "min of list %1",
            "args0": [
              { "type": "field_input", "name": "LIST", "text": "list" }
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Get minimum value"
          });
        }
      };

      // 154. data_max_of_list
      Blockly.Blocks['data_max_of_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "max of list %1",
            "args0": [
              { "type": "field_input", "name": "LIST", "text": "list" }
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Get maximum value"
          });
        }
      };

      // 155. data_sum_of_list
      Blockly.Blocks['data_sum_of_list'] = {
        init: function() {
          this.jsonInit({
            "message0": "sum of list %1",
            "args0": [
              { "type": "field_input", "name": "LIST", "text": "list" }
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Sum all values in list"
          });
        }
      };

      // Advanced Control Flow (156-165)

      // 156. control_for_loop
      Blockly.Blocks['control_for_loop'] = {
        init: function() {
          this.jsonInit({
            "message0": "for %1 from %2 to %3",
            "args0": [
              { "type": "field_input", "name": "VAR", "text": "i" },
              { "type": "input_value", "name": "FROM", "check": "Number" },
              { "type": "input_value", "name": "TO", "check": "Number" }
            ],
            "message1": "do %1",
            "args1": [
              { "type": "input_statement", "name": "DO" }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "For loop"
          });
        }
      };

      // 157. control_while_loop
      Blockly.Blocks['control_while_loop'] = {
        init: function() {
          this.jsonInit({
            "message0": "while %1",
            "args0": [
              { "type": "input_value", "name": "CONDITION", "check": "Boolean" }
            ],
            "message1": "do %1",
            "args1": [
              { "type": "input_statement", "name": "DO" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "While loop"
          });
        }
      };

      // 158. control_break
      Blockly.Blocks['control_break'] = {
        init: function() {
          this.jsonInit({
            "message0": "break",
            "previousStatement": null,
            "style": "control_blocks",
            "tooltip": "Break out of loop"
          });
        }
      };

      // 159. control_continue
      Blockly.Blocks['control_continue'] = {
        init: function() {
          this.jsonInit({
            "message0": "continue",
            "previousStatement": null,
            "style": "control_blocks",
            "tooltip": "Continue to next iteration"
          });
        }
      };

      // 160. control_for_each
      Blockly.Blocks['control_for_each'] = {
        init: function() {
          this.jsonInit({
            "message0": "for each %1 in list %2",
            "args0": [
              { "type": "field_input", "name": "VAR", "text": "item" },
              { "type": "field_input", "name": "LIST", "text": "list" }
            ],
            "message1": "do %1",
            "args1": [
              { "type": "input_statement", "name": "DO" }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "For each loop"
          });
        }
      };

      // 161. control_switch
      Blockly.Blocks['control_switch'] = {
        init: function() {
          this.jsonInit({
            "message0": "switch %1",
            "args0": [
              { "type": "input_value", "name": "VALUE" }
            ],
            "message1": "%1",
            "args1": [
              { "type": "input_statement", "name": "CASES" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Switch statement"
          });
        }
      };

      // 162. control_case
      Blockly.Blocks['control_case'] = {
        init: function() {
          this.jsonInit({
            "message0": "case %1",
            "args0": [
              { "type": "input_value", "name": "VALUE" }
            ],
            "message1": "do %1",
            "args1": [
              { "type": "input_statement", "name": "DO" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Case in switch"
          });
        }
      };

      // 163. control_default
      Blockly.Blocks['control_default'] = {
        init: function() {
          this.jsonInit({
            "message0": "default",
            "message1": "do %1",
            "args1": [
              { "type": "input_statement", "name": "DO" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Default case"
          });
        }
      };

      // 164. control_try_catch
      Blockly.Blocks['control_try_catch'] = {
        init: function() {
          this.jsonInit({
            "message0": "try",
            "message1": "%1",
            "args1": [
              { "type": "input_statement", "name": "TRY" }
            ],
            "message2": "except",
            "message3": "%1",
            "args3": [
              { "type": "input_statement", "name": "CATCH" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Try-catch block"
          });
        }
      };

      // 165. control_ternary
      Blockly.Blocks['control_ternary'] = {
        init: function() {
          this.jsonInit({
            "message0": "if %1 then %2 else %3",
            "args0": [
              { "type": "input_value", "name": "CONDITION", "check": "Boolean" },
              { "type": "input_value", "name": "TRUE" },
              { "type": "input_value", "name": "FALSE" }
            ],
            "inputsInline": true,
            "output": null,
            "style": "control_blocks",
            "tooltip": "Ternary operator"
          });
        }
      };

      // Conversion & Type Blocks (166-170)

      // 166. operator_to_string
      Blockly.Blocks['operator_to_string'] = {
        init: function() {
          this.jsonInit({
            "message0": "to string %1",
            "args0": [
              { "type": "input_value", "name": "VALUE" }
            ],
            "output": "String",
            "style": "control_blocks",
            "tooltip": "Convert to string"
          });
        }
      };

      // 167. operator_to_number
      Blockly.Blocks['operator_to_number'] = {
        init: function() {
          this.jsonInit({
            "message0": "to number %1",
            "args0": [
              { "type": "input_value", "name": "VALUE" }
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Convert to number"
          });
        }
      };

      // 168. operator_to_boolean
      Blockly.Blocks['operator_to_boolean'] = {
        init: function() {
          this.jsonInit({
            "message0": "to boolean %1",
            "args0": [
              { "type": "input_value", "name": "VALUE" }
            ],
            "output": "Boolean",
            "style": "control_blocks",
            "tooltip": "Convert to boolean"
          });
        }
      };

      // 169. operator_is_number
      Blockly.Blocks['operator_is_number'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 is number ?",
            "args0": [
              { "type": "input_value", "name": "VALUE" }
            ],
            "output": "Boolean",
            "style": "control_blocks",
            "tooltip": "Check if value is number"
          });
        }
      };

      // 170. operator_is_text
      Blockly.Blocks['operator_is_text'] = {
        init: function() {
          this.jsonInit({
            "message0": "%1 is text ?",
            "args0": [
              { "type": "input_value", "name": "VALUE" }
            ],
            "output": "Boolean",
            "style": "control_blocks",
            "tooltip": "Check if value is text"
          });
        }
      };

      // Time & Date (171-175)

      // 171. time_current
      Blockly.Blocks['time_current'] = {
        init: function() {
          this.jsonInit({
            "message0": "current %1",
            "args0": [
              { "type": "field_dropdown", "name": "UNIT", "options": [
                ["timestamp", "TIME"],
                ["milliseconds", "MILLIS"],
                ["seconds", "SECS"],
                ["minutes", "MINS"],
                ["hours", "HOURS"]
              ]}
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Get current time"
          });
        }
      };

      // 172. time_delay_ms
      Blockly.Blocks['time_delay_ms'] = {
        init: function() {
          this.jsonInit({
            "message0": "delay %1 milliseconds",
            "args0": [
              { "type": "input_value", "name": "MS", "check": "Number" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "Delay in milliseconds"
          });
        }
      };

      // 173. time_ticks
      Blockly.Blocks['time_ticks'] = {
        init: function() {
          this.jsonInit({
            "message0": "ticks %1",
            "args0": [
              { "type": "field_dropdown", "name": "TYPE", "options": [
                ["ms", "MS"],
                ["us", "US"],
                ["cpu", "CPU"]
              ]}
            ],
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Get system ticks"
          });
        }
      };

      // 174. time_elapsed
      Blockly.Blocks['time_elapsed'] = {
        init: function() {
          this.jsonInit({
            "message0": "elapsed time from %1 to %2",
            "args0": [
              { "type": "input_value", "name": "START", "check": "Number" },
              { "type": "input_value", "name": "END", "check": "Number" }
            ],
            "inputsInline": true,
            "output": "Number",
            "style": "control_blocks",
            "tooltip": "Calculate elapsed time"
          });
        }
      };

      // 175. time_format
      Blockly.Blocks['time_format'] = {
        init: function() {
          this.jsonInit({
            "message0": "format time %1 as %2",
            "args0": [
              { "type": "input_value", "name": "TIME", "check": "Number" },
              { "type": "field_input", "name": "FORMAT", "text": "HH:MM:SS" }
            ],
            "inputsInline": true,
            "output": "String",
            "style": "control_blocks",
            "tooltip": "Format time"
          });
        }
      };

      if (blocklyDivRef.current) { 

        // สร้าง toolbox ที่มีทุก category
        const fullToolbox = `
          <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
            <category name="app" colour="#9966FF">
              <block type="app_bargraph_change"></block>
              <block type="app_bargraph_clear_all"></block>
              <block type="app_bargraph_get_value"></block>
              <block type="app_bargraph_set_value"></block>
              <block type="app_bargraph_show"></block>
              <block type="app_bargraph_hide"></block>
              <block type="app_display_image"></block>
              <block type="app_display_text"></block>
              <block type="app_display_show"></block>
              <block type="app_display_hide"></block>
              <block type="app_linegraph_clear"></block>
              <block type="app_linegraph_clear_all"></block>
              <block type="app_linegraph_get_average"></block>
              <block type="app_linegraph_get_last"></block>
              <block type="app_linegraph_get_max"></block>
              <block type="app_linegraph_get_min"></block>
              <block type="app_linegraph_hide"></block>
              <block type="app_linegraph_plot"></block>
              <block type="app_linegraph_show"></block>
              <block type="app_music_play_drum"></block>
              <block type="app_music_play_instrument"></block>
              <block type="app_sound_play"></block>
              <block type="app_sound_set_attributes"></block>
              <block type="app_sound_stop"></block>
            </category>
            <category name="sensors" colour="#40BF4A">
              <block type="color_matrix_clear"></block>
              <block type="color_matrix_get_pixel"></block>
              <block type="color_matrix_set_pixel"></block>
              <block type="color_matrix_show"></block>
              <block type="color_sensor_color"></block>
              <block type="color_sensor_reflection"></block>
              <block type="distance_sensor_clear"></block>
              <block type="distance_sensor_distance"></block>
              <block type="distance_sensor_get_pixel"></block>
              <block type="distance_sensor_set_pixel"></block>
              <block type="distance_sensor_show"></block>
              <block type="force_sensor_force"></block>
              <block type="force_sensor_pressed"></block>
              <block type="force_sensor_raw"></block>
            </category>
            <category name="hub" colour="#FF6680">
              <block type="hub_device_uuid"></block>
              <block type="hub_hardware_id"></block>
              <block type="hub_temperature"></block>
              <block type="hub_power_off"></block>
              <block type="hub_button_pressed"></block>
              <block type="hub_light_color"></block>
              <block type="hub_light_matrix_clear"></block>
              <block type="hub_light_matrix_get_orientation"></block>
              <block type="hub_light_matrix_get_pixel"></block>
              <block type="hub_light_matrix_set_orientation"></block>
              <block type="hub_light_matrix_set_pixel"></block>
              <block type="hub_light_matrix_show"></block>
              <block type="hub_light_matrix_show_image"></block>
              <block type="hub_light_matrix_write"></block>
              <block type="hub_motion_acceleration"></block>
              <block type="hub_motion_angular_velocity"></block>
              <block type="hub_motion_gesture"></block>
              <block type="hub_motion_get_yaw_face"></block>
              <block type="hub_motion_quaternion"></block>
              <block type="hub_motion_reset_tap_count"></block>
              <block type="hub_motion_reset_yaw"></block>
              <block type="hub_motion_set_yaw_face"></block>
              <block type="hub_motion_stable"></block>
              <block type="hub_motion_tap_count"></block>
              <block type="hub_motion_tilt_angles"></block>
              <block type="hub_motion_up_face"></block>
              <block type="hub_sound_beep"></block>
              <block type="hub_sound_stop"></block>
              <block type="hub_sound_volume"></block>
            </category>
            <category name="motors" colour="#4C97FF">
              <block type="motor_absolute_position"></block>
              <block type="motor_relative_position"></block>
              <block type="motor_reset_relative_position"></block>
              <block type="motor_run"></block>
              <block type="motor_run_for_degrees"></block>
              <block type="motor_run_for_time"></block>
              <block type="motor_run_to_absolute_position"></block>
              <block type="motor_run_to_relative_position"></block>
              <block type="motor_set_duty_cycle"></block>
              <block type="motor_stop"></block>
              <block type="motor_velocity"></block>
              <block type="motor_get_duty_cycle"></block>
              <block type="motor_pair_pair"></block>
              <block type="motor_pair_move"></block>
              <block type="motor_pair_move_for_degrees"></block>
              <block type="motor_pair_move_for_time"></block>
              <block type="motor_pair_move_tank"></block>
              <block type="motor_pair_move_tank_for_degrees"></block>
              <block type="motor_pair_move_tank_for_time"></block>
              <block type="motor_pair_stop"></block>
            </category>
            <category name="movement" colour="#FF8C1A">
              <block type="movement_move"></block>
              <block type="movement_start"></block>
              <block type="movement_move_direction"></block>
              <block type="movement_start_direction"></block>
              <block type="movement_stop"></block>
              <block type="movement_set_speed"></block>
            </category>
            <category name="Events" colour="#FFBF00">
              <block type="event_whenflagclicked"></block>
            </category>
            <category name="Control" colour="#FFAB19">
              <block type="control_wait"></block>
              <block type="control_forever"></block>
              <block type="control_repeat"></block>
              <block type="control_repeat_until"></block>
              <block type="control_if"></block>
              <block type="control_if_else"></block>
              <block type="control_wait_until"></block>
              <block type="control_stop_all"></block>
            </category>
            <category name="operators" colour="#59C059">
              <block type="operator_arithmetic"></block>
              <block type="operator_random"></block>
              <block type="operator_round"></block>
              <block type="operator_mathop"></block>
              <block type="math_number"></block>
              <block type="math_constant"></block>
              <block type="math_power"></block>
              <block type="math_minmax"></block>
              <block type="math_constrain"></block>
              <block type="math_random_float"></block>
              <block type="math_number_property"></block>
              <block type="math_atan2"></block>
              <label text="Advanced Math"></label>
              <block type="operator_power"></block>
              <block type="operator_min"></block>
              <block type="operator_max"></block>
              <block type="operator_clamp"></block>
              <block type="operator_map"></block>
              <block type="operator_constrain_angle"></block>
              <block type="operator_radians"></block>
              <block type="operator_degrees"></block>
              <block type="operator_percentage"></block>
              <block type="operator_average"></block>
            </category>
            <category name="logic" colour="#5CB1D6">
              <block type="operator_comparison"></block>
              <block type="operator_logic"></block>
              <block type="operator_not"></block>
            </category>
            <category name="text" colour="#CF63CF">
              <block type="operator_join"></block>
              <block type="operator_letter_of"></block>
              <block type="operator_length"></block>
              <block type="operator_contains"></block>
              <label text="Advanced Text"></label>
              <block type="operator_uppercase"></block>
              <block type="operator_lowercase"></block>
              <block type="operator_trim"></block>
              <block type="operator_replace"></block>
              <block type="operator_split"></block>
              <block type="operator_reverse_text"></block>
              <block type="operator_starts_with"></block>
              <block type="operator_ends_with"></block>
              <block type="operator_substring"></block>
              <block type="operator_repeat_text"></block>
            </category>
            <category name="variables" colour="#FF4D19">
              <block type="data_set_variable"></block>
              <block type="data_change_variable"></block>
              <block type="data_get_variable"></block>
              <label text="Lists"></label>
              <block type="data_create_list"></block>
              <block type="data_add_to_list"></block>
              <block type="data_delete_from_list"></block>
              <block type="data_insert_at_list"></block>
              <block type="data_replace_in_list"></block>
              <block type="data_item_of_list"></block>
              <block type="data_length_of_list"></block>
              <block type="data_contains_in_list"></block>
              <label text="Advanced Lists"></label>
              <block type="data_sort_list"></block>
              <block type="data_reverse_list"></block>
              <block type="data_shuffle_list"></block>
              <block type="data_slice_list"></block>
              <block type="data_index_of"></block>
              <block type="data_clear_list"></block>
              <block type="data_count_in_list"></block>
              <block type="data_min_of_list"></block>
              <block type="data_max_of_list"></block>
              <block type="data_sum_of_list"></block>
            </category>
            <category name="advanced control" colour="#FFAB19">
              <block type="control_for_loop"></block>
              <block type="control_while_loop"></block>
              <block type="control_break"></block>
              <block type="control_continue"></block>
              <block type="control_for_each"></block>
              <block type="control_switch"></block>
              <block type="control_case"></block>
              <block type="control_default"></block>
              <block type="control_try_catch"></block>
              <block type="control_ternary"></block>
            </category>
            <category name="conversion" colour="#9966FF">
              <block type="operator_to_string"></block>
              <block type="operator_to_number"></block>
              <block type="operator_to_boolean"></block>
              <block type="operator_is_number"></block>
              <block type="operator_is_text"></block>
            </category>
            <category name="time" colour="#4C97FF">
              <block type="time_current"></block>
              <block type="time_delay_ms"></block>
              <block type="time_ticks"></block>
              <block type="time_elapsed"></block>
              <block type="time_format"></block>
            </category>
          </xml>`;

        const workspace = Blockly.inject(blocklyDivRef.current, {
          toolbox: fullToolbox,
          renderer: 'zelos', 
          theme: scratchTheme,
          zoom: { controls: true, wheel: true, startScale: 0.8 },
          grid: { spacing: 25, length: 3, colour: '#ccc', snap: true },
          trashcan: true,
          move: {
            scrollbars: true,
            drag: true,
            wheel: true
          },
          toolboxPosition: 'start'
        });

        workspaceRef.current = workspace;
        workspace.addChangeListener(() => generatePythonCode(workspace));
        setIsReady(true);
        setStatus("พร้อมใช้งาน");
        
        // เปิด category movement เป็นค่าเริ่มต้น
        setTimeout(() => {
          const toolbox = workspace.getToolbox();
          if (toolbox) {
            toolbox.selectItemByPosition(4); // movement เป็น index 4
          }
        }, 200);
      }
    };

    const loadBlockly = async () => {
      try {
        setStatus("กำลังโหลด Engine...");
        
        const loadScript = (src) => {
          return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
              resolve(); 
              return;
            }
            const s = document.createElement('script');
            s.src = src;
            s.async = false;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
          });
        };

        await loadScript('https://unpkg.com/blockly/blockly.min.js');
        
        setStatus("กำลังเตรียม Workspace...");
        
        const interval = setInterval(() => {
          if (window.Blockly) {
            clearInterval(interval);
            setupWorkspace(window.Blockly);
          }
        }, 100);

      } catch (err) {
        setStatus("เกิดข้อผิดพลาด: " + err.message);
      }
    };

    loadBlockly();
  }, []);

  // Save/Load Functions
  const saveWorkspace = () => {
    if (!workspaceRef.current) return;
    const xml = window.Blockly.Xml.workspaceToDom(workspaceRef.current);
    const xmlText = window.Blockly.Xml.domToText(xml);
    const blob = new Blob([xmlText], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spike_project.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadWorkspace = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xml';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const xmlText = event.target.result;
          const xml = window.Blockly.utils.xml.textToDom(xmlText);
          workspaceRef.current.clear();
          window.Blockly.Xml.domToWorkspace(xml, workspaceRef.current);
        } catch (error) {
          alert('ไม่สามารถเปิดไฟล์ได้: ' + error.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const newWorkspace = () => {
    if (workspaceRef.current && confirm('ต้องการสร้างโปรเจ็กต์ใหม่? (งานปัจจุบันจะหายหากยังไม่บันทึก)')) {
      workspaceRef.current.clear();
    }
  };

  // === Web Serial API Functions ===
  const connectToDevice = async () => {
    if (!navigator.serial) {
      alert('Web Serial API ไม่รองรับในเบราว์เซอร์นี้\nกรุณาใช้ Chrome, Edge หรือ Opera');
      return;
    }
    setShowConnectModal(true);
  };
  
  const handleConnectWithPort = async () => {
    try {
      const selectedPort = await navigator.serial.requestPort();
      await selectedPort.open({ baudRate });
      
      setPort(selectedPort);
      setIsConnected(true);
      setShowConnectModal(false);
      
      readFromDevice(selectedPort);
      
    } catch (error) {
      console.error('Connection error:', error);
      setIsConnected(false);
    }
  };

  const disconnectDevice = async () => {
    if (port) {
      try {
        await port.close();
        setPort(null);
        setIsConnected(false);
      } catch (error) {
        console.error('Disconnect error:', error);
      }
    }
  };

  const readFromDevice = async (devicePort) => {
    try {
      const reader = devicePort.readable.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value);
        console.log('Received:', text);
      }
    } catch (error) {
      console.error('Read error:', error);
    }
  };

  const uploadCode = async () => {
    if (!isConnected || !port) {
      alert('กรุณาเชื่อมต่อกับอุปกรณ์ก่อน');
      return;
    }

    try {
      setUploadStatus("กำลังอัพโหลด...");
      
      const writer = port.writable.getWriter();
      const encoder = new TextEncoder();
      
      await writer.write(new Uint8Array([0x03]));
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await writer.write(new Uint8Array([0x04]));
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await writer.write(encoder.encode(pythonCode + '\n'));
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await writer.write(new Uint8Array([0x04]));
      
      writer.releaseLock();
      
      setUploadStatus("อัพโหลดสำเร็จ!");
      setTimeout(() => setUploadStatus(""), 3000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus("อัพโหลดล้มเหลว");
      setTimeout(() => setUploadStatus(""), 3000);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#E9F1FC] font-sans select-none">
      <style>{`
        .blocklyToolboxDiv { display: none !important; }
        .blocklyFlyout { left: 0 !important; }
        .blocklyFlyoutBackground { display: none !important; }
        .blocklyMainBackground { stroke: none !important; }
        .blocklyScrollbarVertical { display: none !important; }
        .blocklyScrollbarHorizontal { display: none !important; }
        
        /* Enhanced text readability on blocks */
        .blocklyText {
          fill: white !important;
          stroke: rgba(0, 0, 0, 0.3) !important;
          stroke-width: 3px !important;
          paint-order: stroke fill !important;
          font-weight: 600 !important;
        }
        
        .blocklyEditableText > .blocklyText {
          fill: white !important;
          stroke: rgba(0, 0, 0, 0.3) !important;
          stroke-width: 3px !important;
        }
        
        /* Field text */
        .blocklyDropdownText {
          fill: white !important;
          stroke: rgba(0, 0, 0, 0.3) !important;
          stroke-width: 2.5px !important;
          paint-order: stroke fill !important;
          font-weight: 600 !important;
        }
        
        /* Fix white text on white background in input fields */
        .blocklyHtmlInput {
          color: #1a1a1a !important;
          font-weight: 600 !important;
          text-shadow: none !important;
        }
        
        /* Field input text (variable names, list names, etc) */
        .blocklyFieldInput {
          fill: #1a1a1a !important;
          font-weight: 600 !important;
        }
        
        /* Number input fields */
        .blocklyFieldNumber {
          fill: #1a1a1a !important;
          font-weight: 600 !important;
        }
        
        /* 3D Block Effect - Subtle but clear with beveled edges */
        .blocklyPath {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)) 
                  drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15)) !important;
          stroke: rgba(0, 0, 0, 0.15) !important;
          stroke-width: 1.5px !important;
        }
        
        .blocklyDraggable:not(.blocklyDisabled) .blocklyPath {
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.25)) 
                  drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2)) !important;
        }
        
        /* Selected block - slightly more prominent */
        .blocklySelected > .blocklyPath {
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) 
                  drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)) !important;
          stroke: rgba(0, 0, 0, 0.2) !important;
        }
        
        /* Dragging block - floating effect */
        .blocklyDragging > .blocklyPath {
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35)) 
                  drop-shadow(0 3px 6px rgba(0, 0, 0, 0.25)) !important;
        }
        
        /* Beveled 3D edges with highlight and shadow */
        .blocklyPathDark {
          stroke: rgba(0, 0, 0, 0.25) !important;
          stroke-width: 2px !important;
        }
        
        .blocklyPathLight {
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
        }
        
        /* Add subtle inner glow for depth */
        .blocklyBlockBackground {
          filter: brightness(1.05) !important;
        }
      `}</style>

      {/* Header - Clean & Modern */}
      <div className="h-16 bg-white border-b-2 border-gray-200 flex items-center px-6 justify-between shadow-sm z-50 shrink-0">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-black text-[#4C97FF] tracking-tight">SPIKE</div>
          <div className="h-8 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <button
              onClick={newWorkspace}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all text-gray-700 font-medium"
              title="โปรเจ็กต์ใหม่"
            >
              <Home size={18} />
              <span className="text-sm">Home</span>
            </button>
            <button
              onClick={loadWorkspace}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all text-gray-700 font-medium"
              title="เปิดไฟล์"
            >
              <FolderPlus size={18} />
              <span className="text-sm">เปิดไฟล์</span>
            </button>
            <button
              onClick={saveWorkspace}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all text-gray-700 font-medium"
              title="บันทึกไฟล์"
            >
              <Save size={18} />
              <span className="text-sm">บันทึก</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           {/* Connection Button - Large & Clear */}
           {!isConnected ? (
             <button 
               onClick={connectToDevice}
               className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#4C97FF] hover:bg-[#3d7dd6] shadow-lg text-white font-bold text-base transition-all hover:scale-105 hover:shadow-xl"
             >
               <Usb size={20} />
               <span>เชื่อมต่ออุปกรณ์</span>
             </button>
           ) : (
             <div className="flex items-center gap-3">
               {/* Connection Status - Clean Card */}
               <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-green-50 border-2 border-green-500">
                 <CheckCircle size={20} className="text-green-600" />
                 <div className="flex flex-col">
                   <span className="text-xs text-green-700 font-medium">เชื่อมต่อแล้ว</span>
                   <span className="text-[10px] text-green-600">Serial Port Active</span>
                 </div>
               </div>
               
               {/* Upload Button */}
               <button 
                 onClick={uploadCode}
                 className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 shadow-lg text-white font-bold transition-all hover:scale-105"
               >
                 <Upload size={18} />
                 <span>อัพโหลด</span>
               </button>
               
               {/* Disconnect Button */}
               <button 
                 onClick={disconnectDevice}
                 className="p-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all border-2 border-red-200 hover:border-red-400"
                 title="ตัดการเชื่อมต่อ"
               >
                 <XCircle size={20} />
               </button>
             </div>
           )}
           
           {/* Upload Status */}
           {uploadStatus && (
             <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-50 border-2 border-purple-400 animate-pulse">
                <Upload size={16} className="text-purple-600" />
                <span className="text-sm font-bold text-purple-700">{uploadStatus}</span>
             </div>
           )}
           
           {/* Settings Button - Large */}
           <button className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all hover:scale-105">
             <Settings size={22} className="hover:rotate-90 transition-transform duration-300" />
           </button>
        </div>
      </div>

      {/* Connect Modal - Modern & Clean */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn" onClick={() => setShowConnectModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[550px] max-h-[90vh] overflow-hidden animate-slideUp" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#4C97FF] to-[#5EA3FF] px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Usb size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">เชื่อมต่ออุปกรณ์</h2>
                  <p className="text-sm text-white/80 font-medium">เลือกบอร์ดและพอร์ตของคุณ</p>
                </div>
              </div>
              <button 
                onClick={() => setShowConnectModal(false)} 
                className="text-white hover:bg-white/20 p-2.5 rounded-xl transition-all hover:rotate-90 duration-300"
              >
                <XCircle size={26} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-8">
              {/* Board Selection */}
              <div className="mb-8">
                <label className="block text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#4C97FF] rounded-full"></span>
                  เลือกบอร์ด
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {boards.map((board) => (
                    <button
                      key={board.id}
                      onClick={() => {
                        setSelectedBoard(board.id);
                        setBaudRate(board.baudRate);
                      }}
                      className={`group relative p-5 rounded-2xl border-3 transition-all duration-300 ${
                        selectedBoard === board.id
                          ? 'border-[#4C97FF] bg-blue-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-102'
                      }`}
                    >
                      <div 
                        className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center transition-all duration-300 ${
                          selectedBoard === board.id ? 'scale-110' : 'group-hover:scale-105'
                        }`}
                        style={{ backgroundColor: board.color }}
                      >
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <div className={`text-sm font-bold transition-colors ${
                          selectedBoard === board.id ? 'text-[#4C97FF]' : 'text-gray-700'
                        }`}>
                          {board.name}
                        </div>
                      </div>
                      {selectedBoard === board.id && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle size={20} className="text-[#4C97FF] fill-blue-50" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Baud Rate Selection */}
              <div className="mb-8">
                <label className="block text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#4C97FF] rounded-full"></span>
                  Baud Rate
                </label>
                <div className="relative">
                  <select
                    value={baudRate}
                    onChange={(e) => setBaudRate(Number(e.target.value))}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#4C97FF] outline-none font-bold text-gray-700 transition-all appearance-none cursor-pointer bg-white hover:border-gray-300"
                  >
                    <option value={9600}>9600 bps</option>
                    <option value={57600}>57600 bps</option>
                    <option value={115200}>115200 bps</option>
                    <option value={230400}>230400 bps</option>
                    <option value={460800}>460800 bps</option>
                    <option value={921600}>921600 bps</option>
                  </select>
                  <Zap size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {/* Info Box */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 mb-1">เคล็ดลับ</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      กดปุ่ม "เลือกพอร์ตและเชื่อมต่อ" จากนั้นเลือก Serial Port ที่ต่ออยู่กับบอร์ดของคุณ
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Connect Button */}
              <button
                onClick={handleConnectWithPort}
                className="w-full flex items-center justify-center gap-4 px-8 py-5 rounded-2xl bg-gradient-to-r from-[#4C97FF] to-[#5EA3FF] hover:from-[#3d7dd6] hover:to-[#4C97FF] text-white font-black text-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl group"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Usb size={20} />
                </div>
                <span>เลือกพอร์ตและเชื่อมต่อ</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>

      <div className="flex flex-1 overflow-hidden">

        {/* Workspace - Clean & Spacious */}
        <div className="flex-1 relative bg-white">
          {!isReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 z-50">
               <div className="w-16 h-16 border-4 border-t-[#4C97FF] border-gray-200 rounded-full animate-spin mb-5"></div>
               <p className="text-[#4C97FF] font-bold text-base tracking-wide">{status}</p>
               <p className="text-gray-400 text-sm mt-2">กำลังโหลด Blockly Engine...</p>
            </div>
          )}
          <div ref={blocklyDivRef} className="absolute inset-0" />
        </div>

        {/* Right Panel - Clean Code Display */}
        <div className="w-[420px] bg-white border-l-2 border-gray-200 flex flex-col z-20 shadow-lg shrink-0">
           {/* Preview Area */}
           <div className="p-5 border-b-2 border-gray-200">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-300 aspect-[4/3] relative flex items-center justify-center overflow-hidden shadow-sm group">
                 
                 {/* Control Buttons */}
                 {isConnected && (
                   <div className="absolute top-3 right-3 flex gap-2 z-10">
                      <button className="w-12 h-12 rounded-xl bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-all">
                        <Play size={18} fill="currentColor"/>
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-all">
                        <Square size={18} fill="currentColor"/>
                      </button>
                   </div>
                 )}
                 
                 {/* SPIKE Logo */}
                 <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 rounded-3xl border-4 border-white shadow-xl flex items-center justify-center text-white font-black text-4xl rotate-3 hover:rotate-0 transition-transform">S</div>
                 
                 {/* Label */}
                 <div className="absolute bottom-3 left-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Preview</div>
              </div>
           </div>
           
           {/* Code Display - Modern Dark Theme */}
           <div className="flex-1 flex flex-col bg-[#1E1E1E]">
              <div className="h-12 bg-[#252526] px-5 flex items-center justify-between border-b border-[#3e3e42]">
                 <div className="flex items-center gap-3">
                    <FileJson size={18} className="text-yellow-500" />
                    <span className="text-sm font-bold text-white">Python Code</span>
                 </div>
                 <div className="text-xs text-gray-500 font-medium">MicroPython</div>
              </div>
              <div className="flex-1 p-5 overflow-auto font-mono text-[13px] leading-6">
                 <pre className="text-gray-300 whitespace-pre-wrap">
                    <code dangerouslySetInnerHTML={{ __html: pythonCode
                        .replace(/#\s/g, '<span style="color:#6A9955"># </span>')
                        .replace(/\bimport\b/g, '<span style="color:#C586C0">import</span>')
                        .replace(/\bfrom\b/g, '<span style="color:#C586C0">from</span>')
                        .replace(/\bwhile\b/g, '<span style="color:#C586C0">while</span>')
                        .replace(/\bTrue\b/g, '<span style="color:#569CD6">True</span>')
                    }} />
                 </pre>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default App;
