import React, { Component } from "react";

const DUMMY_DATA = [
  { senderId: "peter", text: "Hey, how is it going?" },
  { senderId: "jane", text: "im good and you?" },
  { senderId: "peter", text: "yeah, not too bad" }
];

class MessageList extends Component {
  state = {};
  render() {
    return (
      <div className="message-list">
        {DUMMY_DATA.map((message, index) => {
          return (
            <div key={index} className="message">
              <div className="message-username"> {message.senderId} </div>
              <div className="message-text">{message.text}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MessageList;
