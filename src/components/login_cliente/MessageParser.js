// MessageParser starter code in MessageParser.js
class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("Hola")) {
        this.actionProvider.greet();
      }
  
      if (lowerCaseMessage.includes("pana")) {
        this.actionProvider.handlePana();
      }
    }
  }
  
  export default MessageParser;