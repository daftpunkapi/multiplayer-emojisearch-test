import React, {useState, useContext, useEffect} from "react";
import Header from "./Header";
import SearchInput from "./SearchInput";
import EmojiResults from "./EmojiResults";
import filterEmoji from "./filterEmoji";
import './App.css';
import {
  clientSocket,
  roomCount,
  liveCursors,
  joinRoom,
} from "@dpapi/react";

const cursorUrlArray = [
  "https://icons.iconarchive.com/icons/svengraph/daft-punk/256/Daft-Punk-Guyman-Off-icon.png",
  "https://icons.iconarchive.com/icons/everaldo/starwars/128/Darth-Vader-icon.png",
  "https://icons.iconarchive.com/icons/everaldo/starwars/128/clone-old-icon.png",
  "https://icons.iconarchive.com/icons/svengraph/daft-punk/256/Daft-Punk-Thomas-On-icon.png",
];

function App() {
  const [filteredEmoji, setFilteredEmoji] = useState(filterEmoji("", 20));
  const socket = useContext(clientSocket);
  joinRoom("Room1", socket);
  const usersCount = roomCount("Room1", socket);
  const cursors = liveCursors("Room1", socket);
  const [cursorUrl, setCursorUrl] = useState("");

  useEffect(() => {
    setCursorUrl(cursorUrlArray[Math.floor(Math.random() * cursorUrlArray.length)]);
  }, [socket]);

  const handleSearchChange = event => {
    setFilteredEmoji(filterEmoji(event.target.value, 20));
  };

  return (
    <div className="App">
      <h1>Number of users in the room: {usersCount}</h1>
      {cursors.map((cursor, index) => {
        if (cursor.socketId !== socket.id) {
          return (
            <div
              key={cursor.socketId || index}
              className="other-cursor"
              style={{
                left: cursor.x,
                top: cursor.y,
                backgroundImage: `url(${cursorUrl})`,
              }}
            />
          );
        } else {
          return null;
        }
      })}
      <Header />
      <SearchInput textChange={handleSearchChange} />
      <EmojiResults emojiData={filteredEmoji} />
    </div>
  );
}

export default App;
