// App Module Blocks
export const registerAppBlocks = (Blockly, icons) => {
  // 10. app.linegraph.clear(color)
  Blockly.Blocks['app_linegraph_clear'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 linegraph clear %2",
        "args0": [
          { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "COLOR", "options": [
            ["Black", "BLACK"], ["Magenta", "MAGENTA"], ["Blue", "BLUE"],
            ["Azure", "AZURE"], ["Green", "GREEN"], ["Yellow", "YELLOW"],
            ["Orange", "ORANGE"], ["Red", "RED"], ["White", "WHITE"]
          ]}
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "app_blocks",
        "tooltip": "Clear linegraph for color"
      });
    }
  };

  // 11. app.linegraph.clear_all()
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
        "tooltip": "Clear all linegraph values"
      });
    }
  };

  // 12. app.linegraph.get_average(color)
  Blockly.Blocks['app_linegraph_get_average'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 linegraph get average %2",
        "args0": [
          { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "COLOR", "options": [
            ["Black", "BLACK"], ["Magenta", "MAGENTA"], ["Blue", "BLUE"],
            ["Azure", "AZURE"], ["Green", "GREEN"], ["Yellow", "YELLOW"],
            ["Orange", "ORANGE"], ["Red", "RED"], ["White", "WHITE"]
          ]}
        ],
        "output": "Number",
        "style": "app_blocks",
        "tooltip": "Get linegraph average by color"
      });
    }
  };

  // 13. app.linegraph.get_last(color)
  Blockly.Blocks['app_linegraph_get_last'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 linegraph get last %2",
        "args0": [
          { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "COLOR", "options": [
            ["Black", "BLACK"], ["Magenta", "MAGENTA"], ["Blue", "BLUE"],
            ["Azure", "AZURE"], ["Green", "GREEN"], ["Yellow", "YELLOW"],
            ["Orange", "ORANGE"], ["Red", "RED"], ["White", "WHITE"]
          ]}
        ],
        "output": "Number",
        "style": "app_blocks",
        "tooltip": "Get last linegraph value by color"
      });
    }
  };

  // 14. app.linegraph.get_max(color)
  Blockly.Blocks['app_linegraph_get_max'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 linegraph get max %2",
        "args0": [
          { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "COLOR", "options": [
            ["Black", "BLACK"], ["Magenta", "MAGENTA"], ["Blue", "BLUE"],
            ["Azure", "AZURE"], ["Green", "GREEN"], ["Yellow", "YELLOW"],
            ["Orange", "ORANGE"], ["Red", "RED"], ["White", "WHITE"]
          ]}
        ],
        "output": "Number",
        "style": "app_blocks",
        "tooltip": "Get max linegraph value by color"
      });
    }
  };

  // 15. app.linegraph.get_min(color)
  Blockly.Blocks['app_linegraph_get_min'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 linegraph get min %2",
        "args0": [
          { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "COLOR", "options": [
            ["Black", "BLACK"], ["Magenta", "MAGENTA"], ["Blue", "BLUE"],
            ["Azure", "AZURE"], ["Green", "GREEN"], ["Yellow", "YELLOW"],
            ["Orange", "ORANGE"], ["Red", "RED"], ["White", "WHITE"]
          ]}
        ],
        "output": "Number",
        "style": "app_blocks",
        "tooltip": "Get min linegraph value by color"
      });
    }
  };

  // 16. app.linegraph.hide()
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

  // 17. app.linegraph.plot(color, x, y)
  Blockly.Blocks['app_linegraph_plot'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 linegraph plot %2 x %3 y %4",
        "args0": [
          { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "COLOR", "options": [
            ["Black", "BLACK"], ["Magenta", "MAGENTA"], ["Blue", "BLUE"],
            ["Azure", "AZURE"], ["Green", "GREEN"], ["Yellow", "YELLOW"],
            ["Orange", "ORANGE"], ["Red", "RED"], ["White", "WHITE"]
          ]},
          { "type": "input_value", "name": "X", "check": "Number" },
          { "type": "input_value", "name": "Y", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "app_blocks",
        "tooltip": "Plot value on linegraph"
      });
    }
  };

  // 18. app.linegraph.show(fullscreen)
  Blockly.Blocks['app_linegraph_show'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 linegraph show fullscreen %2",
        "args0": [
          { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_checkbox", "name": "FULLSCREEN", "checked": false }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "app_blocks",
        "tooltip": "Show linegraph fullscreen"
      });
    }
  };
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
        "message0": "%1 bargraph get value %2",
        "args0": [
          { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_dropdown", "name": "COLOR", "options": [
            ["Black", "BLACK"], ["Magenta", "MAGENTA"], ["Blue", "BLUE"],
            ["Azure", "AZURE"], ["Green", "GREEN"], ["Yellow", "YELLOW"],
            ["Orange", "ORANGE"], ["Red", "RED"], ["White", "WHITE"]
          ]}
        ],
        "output": "Number",
        "style": "app_blocks",
        "tooltip": "Get bargraph value by color"
      });
    }
  };

  // 4. app.bargraph.hide()
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

  // 5. app.bargraph.set_value(color, value)
  Blockly.Blocks['app_bargraph_set_value'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 bargraph set %2 to %3",
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
        "tooltip": "Set bargraph value"
      });
    }
  };

  // Add more app blocks here...

  // 6. app.display.hide()
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
        "tooltip": "Hide app display"
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
            ["Robot 1", "IMAGE_ROBOT_1"], ["Robot 2", "IMAGE_ROBOT_2"], ["Robot 3", "IMAGE_ROBOT_3"],
            ["Robot 4", "IMAGE_ROBOT_4"], ["Robot 5", "IMAGE_ROBOT_5"], ["Hub 1", "IMAGE_HUB_1"],
            ["Hub 2", "IMAGE_HUB_2"], ["Hub 3", "IMAGE_HUB_3"], ["Hub 4", "IMAGE_HUB_4"],
            ["Amusement Park", "IMAGE_AMUSEMENT_PARK"], ["Beach", "IMAGE_BEACH"], ["Haunted House", "IMAGE_HAUNTED_HOUSE"],
            ["Carnival", "IMAGE_CARNIVAL"], ["Bookshelf", "IMAGE_BOOKSHELF"], ["Playground", "IMAGE_PLAYGROUND"],
            ["Moon", "IMAGE_MOON"], ["Cave", "IMAGE_CAVE"], ["Ocean", "IMAGE_OCEAN"],
            ["Polar Bear", "IMAGE_POLAR_BEAR"], ["Park", "IMAGE_PARK"], ["Random", "IMAGE_RANDOM"]
          ]}
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "app_blocks",
        "tooltip": "Show image on app display"
      });
    }
  };

  // 8. app.display.show(fullscreen)
  Blockly.Blocks['app_display_show'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 display show fullscreen %2",
        "args0": [
          { "type": "field_image", "src": icons.app, "width": 20, "height": 20, "alt": "⚙️" },
          { "type": "field_checkbox", "name": "FULLSCREEN", "checked": false }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "app_blocks",
        "tooltip": "Show app display fullscreen"
      });
    }
  };

  // 9. app.display.text(text)
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
        "tooltip": "Show text on app display"
      });
    }
  };
};
