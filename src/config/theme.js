// Blockly theme configuration
export const createScratchTheme = (Blockly) => {
  return Blockly.Theme.defineTheme('scratch', {
    'base': Blockly.Themes.Classic,
    'blockStyles': {
      'motion_blocks': { 'colourPrimary': "#4C97FF", 'colourSecondary': "#4280D7", 'colourTertiary': "#3373CC" },
      'movement_blocks': { 'colourPrimary': "#FF8C1A", 'colourSecondary': "#E67E17", 'colourTertiary': "#CC6F14" },
      'events_blocks': { 'colourPrimary': "#FFD500", 'colourSecondary': "#E6C200", 'colourTertiary': "#CCAA00" },
      'control_blocks': { 'colourPrimary': "#FFAB19", 'colourSecondary': "#EC9C13", 'colourTertiary': "#CF8B17" },
      'app_blocks': { 'colourPrimary': "#9966FF", 'colourSecondary': "#855CD6", 'colourTertiary': "#774DCB" },
      'sensor_blocks': { 'colourPrimary': "#40BF4A", 'colourSecondary': "#389438", 'colourTertiary': "#2E7D32" },
      'hub_blocks': { 'colourPrimary': "#FF6680", 'colourSecondary': "#FF4D6A", 'colourTertiary': "#E63946" },
      'variable_blocks': { 'colourPrimary': "#FF4D19", 'colourSecondary': "#E64417", 'colourTertiary': "#CC3B14" },
      'logic_blocks': { 'colourPrimary': "#5CB1D6", 'colourSecondary': "#47A0C4", 'colourTertiary': "#3B8AB2" },
      'math_blocks': { 'colourPrimary': "#59C059", 'colourSecondary': "#46A846", 'colourTertiary': "#389438" },
      'text_blocks': { 'colourPrimary': "#CF63CF", 'colourSecondary': "#B854B8", 'colourTertiary': "#A045A0" }
    },
    'componentStyles': {
      'workspaceBackgroundColour': '#F9F9F9',
      'toolboxBackgroundColour': '#FFFFFF',
      'flyoutBackgroundColour': '#F9F9F9',
      'flyoutOpacity': 0.9,
      'scrollbarColour': '#CECECE',
    },
    'fontStyle': { 'family': 'Helvetica, Arial, sans-serif', 'weight': 'bold', 'size': 12 }
  });
};
