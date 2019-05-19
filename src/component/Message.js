import React, { Component } from "react";

function Message(props) {
  return (
    <div key={props.index} className="message">
      <div className="message-username"> {props.userName} </div>
      <div className="message-text">{props.message}</div>
    </div>
  );
}
/* class Message extends Component {
  state = {};
  render() {
    return (
      <div key={this.props.index} className="message">
        <div className="message-username"> {this.props.userName} </div>
        <div className="message-text">{this.props.message}</div>
      </div>
    );
  }
} */

export default Message;
