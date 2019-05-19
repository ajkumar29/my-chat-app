import React, { Component } from "react";
import Message from "./Message";
// const DUMMY_DATA = [
//   { senderId: "peter", text: "Hey, how is it going?" },
//   { senderId: "jane", text: "im good and you?" },
//   { senderId: "peter", text: "yeah, not too bad" }
// ];

class MessageList extends Component {
  state = {};
  render() {
    return (
      <div className="message-list">
        {this.props.messages.map((message, index) => {
          return (
            <Message
              message={message.text}
              userName={message.senderId}
              key={index}
            />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
