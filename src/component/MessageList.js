import React, { Component } from 'react';
import Message from './Message';
import ReactDOM from 'react-dom';
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
    //ClientHeight = height of element on display
    //scrollHeight = Height of entire element (fully scrolled)
    // +100 acts as a buffer. if nearly at the bottom , then autoscroll activated
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
    if (!this.props.roomId) {
      return (
        <div className='message-list'>
          <div className='join-room'>&larr; Join a room!</div>
        </div>
      );
    }
    return (
      <div className='message-list'>
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
