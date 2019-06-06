import './App.css';
import MessageList from './component/MessageList';
import NewRoomForm from './component/NewRoomForm';
import RoomList from './component/RoomList';
import SendMessageForm from './component/SendMessageForm';
import Chatkit from '@pusher/chatkit-client';
import { instanceLocator, tokenLocator } from './config';
import React, { Component } from 'react';
import { join } from 'path';
class App extends Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      rooms: [],
      joinableRooms: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: 'AJ',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenLocator
      })
    });
    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.getRooms();
      this.subscribeToRoom();
    });
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        this.setState({ roomId: room.id });
        this.getRooms();
      });
  }

  getRooms() {
    this.currentUser.getJoinableRooms().then(joinableRooms => {
      this.setState({
        joinableRooms: joinableRooms,
        rooms: this.currentUser.rooms
      });
    });
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text: text,
      roomId: this.state.roomId
    });
  }

  createRoom(roomName) {
    this.currentUser
      .createRoom({ name: roomName })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log('error with creating room: ', err));
  }

  render() {
    return (
      <div className='app'>
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.rooms]}
        />
        <MessageList
          messages={this.state.messages}
          roomId={this.state.roomId}
        />
        <SendMessageForm
          sendMessage={this.sendMessage}
          disabled={!this.state.roomId}
        />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;
