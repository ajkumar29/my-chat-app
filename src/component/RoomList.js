import React, { Component } from "react";
class RoomList extends Component {
  state = {};
  render() {
    console.log(this.props.room);
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
    //orderedRooms to ensure they appear in one order in list. Doesnt keep jumping when joining rooms
    return (
      <div className="rooms-list">
        <ul>
          <h3>Room List</h3>
          {orderedRooms.map(room => {
            const active = this.props.roomId === room.id ? "active" : "";
            return (
              <li key={room.id} className={"room " + active}>
                {" "}
                <a onClick={() => this.props.subscribeToRoom(room.id)} href="#">
                  {" "}
                  # {room.name}{" "}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RoomList;
