import React, { Component } from "react";
import Message from "./Message";
import ReactDOM from "react-dom";
// const DUMMY_DATA = [
//   { senderId: "peter", text: "Hey, how is it going?" },
//   { senderId: "jane", text: "im good and you?" },
//   { senderId: "peter", text: "yeah, not too bad" }
// ];

class MessageList extends Component {
  state = {};

  //lifecycle hook just before a rerender due to update
  componentWillUpdate() {
    //Determines when to scroll
    const node = ReactDOM.findDOMNode(this);
    //ScrollTop = amount scrolled
    //CLientHeigh = height of element on display
    //scrollHEight = Height of entire element (fully scrolled)
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }
  //lifecycle hook for when rerendered on update
  componentDidUpdate() {
    //autoscroll down
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

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
