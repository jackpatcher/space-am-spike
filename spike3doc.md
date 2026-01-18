


# SPIKE 3 Python API Coverage

## คำสั่งที่มีในระบบ (Implemented)

# SPIKE 3 Python API Coverage (2026)

This document lists all SPIKE 3 Python API commands, grouped by module, and marks each as:
- **✅ Implemented** (Blockly block exists)
- **❌ Not Implemented** (No block yet)

---

## App

### Bargraph
- bargraph.change(color, value) ✅
- bargraph.clear_all() ✅
- bargraph.get_value(color) ✅
- bargraph.hide() ✅
- bargraph.set_value(color, value) ✅
- bargraph.show(fullscreen) ✅

### Display
- display.hide() ✅
- display.image(image) ✅
- display.show(fullscreen) ✅
- display.text(text) ✅

### Linegraph
- linegraph.clear(color) ✅
- linegraph.clear_all() ✅
- linegraph.get_average(color) ✅
- linegraph.get_last(color) ✅
- linegraph.get_max(color) ✅
- linegraph.get_min(color) ✅
- linegraph.hide() ✅
- linegraph.plot(color, x, y) ✅
- linegraph.show(fullscreen) ✅

### Music
- music.play_drum(drum) ✅
- music.play_instrument(instrument, note, duration) ✅

### Sound
- sound.play(sound_name, volume=100, pitch=0, pan=0) ✅
- sound.set_attributes(volume, pitch, pan) ✅
- sound.stop() ✅

---

## Color
- color constants (BLACK, RED, etc.) ✅

---

## Color Matrix
- color_matrix.clear(port) ✅
- color_matrix.get_pixel(port, x, y) ✅
- color_matrix.set_pixel(port, x, y, (color, intensity)) ✅
- color_matrix.show(port, pixels) ✅

---

## Color Sensor
- color_sensor.color(port) ✅
- color_sensor.reflection(port) ✅
- color_sensor.rgbi(port) ✅

---

## Device
- device.data(port) ✅
- device.id(port) ✅
- device.get_duty_cycle(port) ✅
- device.ready(port) ✅
- device.set_duty_cycle(port, duty_cycle) ✅

---

## Distance Sensor
- distance_sensor.clear(port) ✅
- distance_sensor.distance(port) ✅
- distance_sensor.get_pixel(port, x, y) ✅
- distance_sensor.set_pixel(port, x, y, intensity) ✅
- distance_sensor.show(port, pixels) ✅

---

## Force Sensor
- force_sensor.force(port) ✅
- force_sensor.pressed(port) ✅
- force_sensor.raw(port) ✅

---

## Hub

### Button
- button.pressed(button) ✅

### Light
- light.color(light, color) ✅

### Light Matrix
- light_matrix.clear() ✅
- light_matrix.get_orientation() ✅
- light_matrix.get_pixel(x, y) ✅
- light_matrix.set_orientation(top) ✅
- light_matrix.set_pixel(x, y, intensity) ✅
- light_matrix.show(pixels) ✅
- light_matrix.show_image(image) ✅
- light_matrix.write(text, intensity=100, time_per_character=500) ✅

### Motion Sensor
- motion_sensor.acceleration(raw_unfiltered) ✅
- motion_sensor.angular_velocity(raw_unfiltered) ✅
- motion_sensor.gesture() ✅
- motion_sensor.get_yaw_face() ✅
- motion_sensor.quaternion() ✅
- motion_sensor.reset_tap_count() ✅
- motion_sensor.reset_yaw(angle) ✅
- motion_sensor.set_yaw_face(up) ✅
- motion_sensor.stable() ✅
- motion_sensor.tap_count() ✅
- motion_sensor.tilt_angles() ✅
- motion_sensor.up_face() ✅

### Sound
- sound.beep(freq=440, duration=500, volume=100, ...) ✅
- sound.stop() ✅
- sound.volume(volume) ✅

### Functions
- device_uuid() ✅
- hardware_id() ✅
- power_off() ✅
- temperature() ✅

---

## Math
- operator_arithmetic(num1, op, num2) ✅
- operator_random(from, to) ✅
- operator_round(num) ✅
- operator_mathop(op, num) ✅

---

## Motor
- motor.absolute_position(port) ✅
- motor.get_duty_cycle(port) ✅
- motor.relative_position(port) ✅
- motor.reset_relative_position(port, position) ✅
- motor.run(port, velocity, acceleration=1000) ✅
- motor.run_for_degrees(port, degrees, velocity) ✅
- motor.run_for_time(port, duration, velocity) ✅
- motor.run_to_absolute_position(port, position, velocity) ✅
- motor.run_to_relative_position(port, position, velocity) ✅
- motor.set_duty_cycle(port, pwm) ✅
- motor.stop(port, stop=1) ✅
- motor.velocity(port) ✅

---

## Motor Pair
- motor_pair.move(pair, steering, velocity=360, acceleration=1000) ✅
- motor_pair.move_for_degrees(pair, degrees, steering, velocity=360, ...) ✅
- motor_pair.move_for_time(pair, duration, steering, velocity=360, ...) ✅
- motor_pair.move_tank(pair, left_velocity, right_velocity, acceleration=1000) ✅
- motor_pair.move_tank_for_degrees(pair, degrees, left_velocity, right_velocity, ...) ✅
- motor_pair.move_tank_for_time(pair, left_velocity, right_velocity, duration, ...) ✅
- motor_pair.pair(pair, left_motor, right_motor) ✅
- motor_pair.stop(pair, stop=1) ✅
- motor_pair.unpair(pair) ✅

---

## Movement
- move_forward(distance) ✅
- move_backward(distance) ✅
- turn_left(degrees) ✅
- turn_right(degrees) ✅

---

## Orientation
- orientation constants (UP, RIGHT, DOWN, LEFT) ✅

---

## Runloop
- runloop.run(*functions) ✅
- runloop.sleep_ms(duration) ✅
- runloop.until(function, timeout=0) ✅

---

## Sensor
- color_sensor(port) ✅
- distance_sensor(port) ✅
- force_sensor(port) ✅
- touch_sensor(port) ✅

---

## Text
- operator_join(str1, str2) ✅
- operator_letter_of(letter, str) ✅
- operator_length(str) ✅
- operator_contains(str1, str2) ✅

---

## Variable
- data_set_variable(var, value) ✅
- data_change_variable(var, value) ✅
- data_get_variable(var) ✅
- data_create_list() ✅

---

For more details and examples, see the [SPIKE 3 Python API Docs](https://tuftsceeo.github.io/SPIKEPythonDocs/SPIKE3.html)
---
