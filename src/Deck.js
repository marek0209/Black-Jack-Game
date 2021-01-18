import React, { useState } from "react";
import apiService from "./services/apiService";

function Deck() {
  const [deckId, setDeckId] = useState("");
  let id;
  const startGame = async () => {
    id = await apiService.getId();
    console.log(typeof id);
    setDeckId(id);
  };

  return (
    <>
      Click button to start game:
      <button onClick={startGame}>START</button>
      {deckId ? <h1>Game id: {deckId}</h1> : <></>}
    </>
  );
}

export default Deck;
