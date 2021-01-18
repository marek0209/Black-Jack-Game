import React, { useState } from "react";
import apiService from "./services/apiService";

function Deck() {
  const [deckId, setDeckId] = useState("");
  const [dealerHand, setDealerHand] = useState("");
  const [userHand, setUserHand] = useState("");
  const [gameInProgress, setGameInProgress] = useState(false);

  let id;
  const startGame = async () => {
    id = await apiService.getId();
    console.log(typeof id);
    setDeckId(id);
    getFirstCards(id);
    setGameInProgress(true);
  };

  const getFirstCards = async (id) => {
    if (id !== undefined) {
      apiService.drawCard(id);
      let { data: dealerCards } = await apiService.drawCard(id, 2);
      if (!dealerCards) {
        dealerCards = await apiService.drawCard(id, 2);
      }
      let { data: userCards } = await apiService.drawCard(id, 2);
      if (!userCards) {
        userCards = await apiService.drawCard(id, 2);
      }
      console.log(userCards.cards);
      console.log(dealerCards.cards);
      setUserHand(userCards.cards);
      setDealerHand(dealerCards.cards);
    }
  };

  if (gameInProgress === false) {
    return (
      <>
        Click button to start game:
        <button onClick={startGame}>START</button>
      </>
    );
  } else {
    return (
      <>
        {deckId ? <h1>Game id: {deckId}</h1> : <></>}
        {dealerHand ? <h1> Dealer cards</h1> : <></>}
        {dealerHand ? (
          dealerHand.map((card) => {
            return <img key={card.code} src={card.image} alt={card.code} />;
          })
        ) : (
          <></>
        )}
        {userHand ? <h1> User cards</h1> : <></>}
        {dealerHand ? (
          userHand.map((card) => {
            return <img key={card.key} src={card.image} alt={card.code} />;
          })
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default Deck;
