// App Module Blocks
export const registerAppBlocks = (Blockly, icons) => {
  // 1. app.bargraph.change(color, value)
  Blockly.Blocks['app_bargraph_change'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 bargraph change %2 to %3",
        "args0": [
          { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "COLOR", "options": [
            ["Black", "BLACK"], ["Magenta", "MAGENTA"], ["Blue", "BLUE"],
            ["Azure", "AZURE"], ["Green", "GREEN"], ["Yellow", "YELLOW"],
            ["Orange", "ORANGE"], ["Red", "RED"], ["White", "WHITE"]
          ]},
          { "type": "input_value", "name": "VALUE", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "app_blocks",
        "tooltip": "Change bargraph value"
      });
    }
  };

  // Add more app blocks here...
};
