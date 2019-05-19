import "./App.css";
import MessageList from "./component/MessageList";
import NewRoomForm from "./component/NewRoomForm";
import RoomList from "./component/RoomList";
import SendMessageForm from "./component/SendMessageForm";
import Chatkit from "@pusher/chatkit-client";
import { instanceLocator, tokenLocator } from "./config";
import React, { Component } from "react";
class App extends Component {
  state = {};

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: "AJ",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenLocator
      })
    });
    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: currentUser.rooms[0].id,
        hooks: {
          onMessage: message => {
            console.log("message.text", message.text);
          }
        }
      });
    });
  }

  render() {
    return (
      <div className="app">
        <RoomList />
        <MessageList />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
