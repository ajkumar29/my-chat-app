import React, { Component } from "react";
class RoomList extends Component {
  state = {};
  render() {
    console.log(this.props.room);

    return (
      <div className="rooms-list">
        {this.props.rooms.map(room => {
          return <li> {room.name}</li>;
        })}
      </div>
    );
  }
}

export default RoomList;
