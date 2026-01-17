// Central block registration system
import { registerAppBlocks } from './appBlocks';
import { registerMotorBlocks } from './motorBlocks';
import { registerMovementBlocks } from './movementBlocks';
import { registerControlBlocks } from './controlBlocks';
import { registerEventBlocks } from './eventBlocks';
import { registerSensorBlocks } from './sensorBlocks';
import { registerHubBlocks } from './hubBlocks';
import { registerVariableBlocks } from './variableBlocks';
import { registerLogicBlocks } from './logicBlocks';
import { registerMathBlocks } from './mathBlocks';
import { registerTextBlocks } from './textBlocks';

export const registerAllBlocks = (Blockly, icons) => {
  registerEventBlocks(Blockly, icons);
  registerMotorBlocks(Blockly, icons);
  registerMovementBlocks(Blockly, icons);
  registerControlBlocks(Blockly, icons);
  registerAppBlocks(Blockly, icons);
  registerSensorBlocks(Blockly, icons);
  registerHubBlocks(Blockly, icons);
  registerVariableBlocks(Blockly, icons);
  registerLogicBlocks(Blockly, icons);
  registerMathBlocks(Blockly, icons);
  registerTextBlocks(Blockly, icons);
};
