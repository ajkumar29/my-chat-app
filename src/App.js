import "./App.css";
import MessageList from "./component/MessageList";
import NewRoomForm from "./component/NewRoomForm";
import RoomList from "./component/RoomList";
import SendMessageForm from "./component/SendMessageForm";
import Chatkit from "@pusher/chatkit-client";
import { instanceLocator, tokenLocator } from "./config";
import React, { Component } from "react";
import { join } from "path";
class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      rooms: [],
      joinableRooms: []
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: "AJ",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenLocator
      })
    });
    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.currentUser
        .getJoinableRooms()
        .then(joinableRooms => {
          this.setState({
            joinableRooms: joinableRooms,
            rooms: this.currentUser.rooms
          });
        })
        .catch(err => console.log("Error on retrieving rooms", err));
      currentUser.subscribeToRoom({
        roomId: currentUser.rooms[0].id,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text: text,
      roomId: "21185977"
    });
  }

  render() {
    return (
      <div className="app">
        <RoomList rooms={[...this.state.joinableRooms, ...this.state.rooms]} />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
