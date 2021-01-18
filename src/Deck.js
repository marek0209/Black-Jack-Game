import React, { useEffect, useState } from "react";
import apiService from "./services/apiService";
import calculatePoints from "./services/calculatePoints";

function Deck() {
  const [deckId, setDeckId] = useState("");
  const [dealerHand, setDealerHand] = useState("");
  const [userHand, setUserHand] = useState("");
  const [gameInProgress, setGameInProgress] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [roundCounter, setRoundCounter] = useState(0);
  const [moneyState, setMoneyState] = useState(1000);
  const [bet, setBet] = useState(0);

  let id;
  const startGame = async () => {
    betAction();
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

  const hitAction = async () => {
    const { data: card } = await apiService.drawCard(deckId, 2);
    setUserHand([...userHand, card.cards[0]]);
    if (dealerScore < 17) {
      setDealerHand([...dealerHand, card.cards[1]]);
    }
    endOfRound(checkWhoWin());
  };

  const standAction = () => {
    console.log("Stand");
    setGameInProgress(false);
    endOfRound(checkWhoWin());
  };

  const doubleAction = () => {
    console.log("Double");
    setUserScore(2 * userScore);
    setGameInProgress(false);
    endOfRound(checkWhoWin());
  };

  const checkWhoWin = () => {
    if (userScore < 21 && dealerScore < 21) {
      let user = 21 - userScore;
      let dealer = 21 - dealerScore;
      if (user > dealer) {
        console.log("User lost");
        return "dealer";
      } else if (user === dealer) {
        console.log("Remis");
        return "remis";
      } else {
        console.log("User win!");
        return "user";
      }
    } else {
      if (userScore > 21) {
        if (dealerScore > 21) {
          console.log("remis");
          return "remis";
        } else {
          console.log("User lost");
          return "dealer";
        }
      } else {
        console.log("User win");
        return "user";
      }
    }
  };
  const endOfRound = (winner) => {
    setRoundCounter(roundCounter + 1);
    if (winner === "remis") {
      window.alert("Remis");
    } else {
      window.alert("The winner is " + winner);
    }
    betManagement(winner);
    startRound();
  };

  const startRound = () => {
    setUserHand([]);
    setDealerHand([]);
    setUserScore(0);
    setDealerScore(0);
    getFirstCards();
    if (roundCounter <= 5) {
      setGameInProgress(true);
      startGame();
    }
  };

  const betAction = () => {
    const userBet = (function ask() {
      var n = prompt("Bet from 1$ to 100$:");
      return isNaN(n) || +n > 100 || +n < 1 ? ask() : n;
    })();

    if (moneyState < userBet) {
      alert(" You dont have enough money! ");
      betAction();
    }
    setBet(userBet);
  };

  const betManagement = (winner) => {
    if (winner === "user") {
      console.log("User dostaje");
      setMoneyState(moneyState + 1.5 * bet);
    } else {
      console.log("User traci");
      setMoneyState(moneyState - bet);
    }
  };

  useEffect(() => {
    console.log(userHand);
    if (gameInProgress) {
      setUserScore(calculatePoints.getScore(userHand));
      setDealerScore(calculatePoints.getScore(dealerHand));
    }
  }, [setUserScore, dealerHand, gameInProgress, id, userHand]);

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
        <h1>Dealer:{dealerScore}</h1>

        {dealerHand ? (
          dealerHand.map((card) => {
            return <img key={card.code} src={card.image} alt={card.code} />;
          })
        ) : (
          <></>
        )}
        {userHand ? <h1> User cards</h1> : <></>}
        <h1>User:{userScore}</h1>
        {dealerHand ? (
          userHand.map((card) => {
            return <img key={card.key} src={card.image} alt={card.code} />;
          })
        ) : (
          <></>
        )}
        <button onClick={hitAction}>HIT</button>
        <button onClick={standAction}>STAND</button>
        <button onClick={doubleAction}>DOUBLE</button>
      </>
    );
  }
}

export default Deck;
