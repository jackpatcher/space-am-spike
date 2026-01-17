// Event Blocks
export const registerEventBlocks = (Blockly, icons) => {
  Blockly.Blocks['event_whenflagclicked'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1 when %2 clicked",
        "args0": [
          { "type": "field_image", "src": icons.flag, "width": 40, "height": 40, "alt": "flag" },
          { "type": "field_image", "src": icons.flag, "width": 24, "height": 24, "alt": "flag" }
        ],
        "nextStatement": null,
        "style": "events_blocks",
        "tooltip": "Start when flag is clicked"
      });
    }
  };

  Blockly.Blocks['event_when_receive'] = {
    init: function() {
      this.jsonInit({
        "message0": "when I receive %1",
        "args0": [
          { "type": "field_input", "name": "MESSAGE", "text": "message1" }
        ],
        "nextStatement": null,
        "style": "events_blocks",
        "tooltip": "Start when message is received"
      });
    }
  };

  Blockly.Blocks['event_broadcast'] = {
    init: function() {
      this.jsonInit({
        "message0": "broadcast %1",
        "args0": [
          { "type": "field_input", "name": "MESSAGE", "text": "message1" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "events_blocks",
        "tooltip": "Send message to other blocks"
      });
    }
  };

  Blockly.Blocks['event_broadcast_and_wait'] = {
    init: function() {
      this.jsonInit({
        "message0": "broadcast %1 and wait",
        "args0": [
          { "type": "field_input", "name": "MESSAGE", "text": "message1" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "events_blocks",
        "tooltip": "Send message and wait for handlers to finish"
      });
    }
  };

  // Add more event blocks here...
};
