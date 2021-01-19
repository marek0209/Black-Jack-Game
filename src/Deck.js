import React, { useEffect } from "react";
import apiService from "./services/apiService";
import calculatePoints from "./services/calculatePoints";

function Deck() {
  var useStateRef = require("react-usestateref");
  const [deckId, setDeckId, deckIdRef] = useStateRef("");
  const [dealerHand, setDealerHand, dealerHandRef] = useStateRef("");
  const [userHand, setUserHand, userHandRef] = useStateRef("");
  const [gameInProgress, setGameInProgress, gameInProgressRef] = useStateRef(
    false
  );
  const [userScore, setUserScore, userScoreRef] = useStateRef(0);
  const [dealerScore, setDealerScore, dealerScoreRef] = useStateRef(0);
  const [roundCounter, setRoundCounter, roundCounterRef] = useStateRef(1);
  const [moneyState, setMoneyState, moneyStateRef] = useStateRef(1000);
  const [bet, setBet, betRef] = useStateRef(0);
  const [roundHistory, setRoundHistory, roundHistoryRef] = useStateRef([]);

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
      setUserScore(sumFirstTwoCardValue(userCards.cards, userScore));
      setDealerScore(sumFirstTwoCardValue(dealerCards.cards, dealerScore));
      setUserHand(userCards.cards);
      setDealerHand(dealerCards.cards);
      saveGameToLocalStorage();
    }
  };

  const sumFirstTwoCardValue = (cards, score) => {
    let tempScore = 0;
    cards.forEach((card) => {
      tempScore += calculatePoints.getScore(card, score);
    });
    return tempScore;
  };

  const hitAction = async () => {
    const { data: card } = await apiService.drawCard(deckId, 2);
    setUserScore(
      userScore + calculatePoints.getScore(card.cards[0], userScore)
    );
    setUserHand([...userHand, card.cards[0]]);
    if (dealerScoreRef.current < 17 && userScoreRef.current < 21) {
      console.log("Dealer bierze");
      setDealerHand([...dealerHand, card.cards[1]]);
      setDealerScore(
        dealerScore + calculatePoints.getScore(card.cards[1], dealerScore)
      );
    }
    saveGameToLocalStorage();
    if (userScoreRef.current > 21 || dealerScoreRef.current > 21) {
      saveGameToLocalStorage();
      endOfRound(checkWhoWin());
    }
  };

  const standAction = () => {
    console.log("Stand");
    setGameInProgress(false);
    saveGameToLocalStorage();
    endOfRound(checkWhoWin());
  };

  const doubleAction = () => {
    console.log("Double");
    setUserScore(2 * userScore);
    setGameInProgress(false);
    saveGameToLocalStorage();
    endOfRound(checkWhoWin());
  };

  const checkWhoWin = () => {
    console.log(
      "Check win at score: " +
        userScoreRef.current +
        " " +
        dealerScoreRef.current
    );
    if (userScoreRef.current < 21 && dealerScoreRef.current < 21) {
      let user = 21 - userScoreRef.current;
      let dealer = 21 - dealerScoreRef.current;
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
      if (userScoreRef.current > 21) {
        if (dealerScoreRef.current > 21) {
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
    let history = { winner: winner, round: roundCounter };
    if (roundHistory) {
      setRoundHistory([...roundHistory, history]);
    } else {
      setRoundHistory([history]);
    }

    if (winner === "remis") {
      window.alert("Remis");
    } else {
      window.alert("The winner is " + winner);
    }

    betManagement(winner);
    if (roundCounter >= 5) {
      endOfGame();
    } else {
      saveGameToLocalStorage();
      startRound();
    }
  };

  const startRound = () => {
    if (roundCounterRef.current <= 5) {
      betAction();
      setGameInProgress(true);
      setUserHand([]);
      setDealerHand([]);
      setUserScore(0);
      setDealerScore(0);
      getFirstCards(deckId);
      saveGameToLocalStorage();
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
  // JSON.stringify(yourArray);
  const endOfGame = () => {
    clearLocalStorage();
    alert("Game is end, you played 5 round");
    setRoundCounter(1);
    setGameInProgress(false);
    localStorage.setItem("gameInProgress", false);
    setRoundHistory([]);

    //Saving  rank
    let newRank = moneyStateRef.current;
    let oldRank = undefined;
    let tempRank = undefined;
    if (localStorage.rank === undefined || localStorage.rank.length === 0) {
      tempRank = [newRank];
      tempRank = JSON.stringify(tempRank);
      console.log(tempRank);
      localStorage.setItem("rank", tempRank);
    } else {
      oldRank = JSON.parse(localStorage.rank);
      oldRank.push(newRank);
      tempRank = JSON.stringify(oldRank);
      localStorage.setItem("rank", tempRank);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("deckId");
    localStorage.removeItem("dealerHand");
    localStorage.removeItem("userHand");
    localStorage.removeItem("dealerScore");
    localStorage.removeItem("userScore");
    localStorage.removeItem("roundHistory");
    localStorage.removeItem("moneyState");
    localStorage.removeItem("bet");
    localStorage.removeItem("roundCounter");
  };
  const saveGameToLocalStorage = () => {
    localStorage.setItem("deckId", deckIdRef.current);
    localStorage.setItem("dealerHand", JSON.stringify(dealerHandRef.current));
    localStorage.setItem("userHand", JSON.stringify(userHandRef.current));
    localStorage.setItem("dealerScore", dealerScoreRef.current);
    localStorage.setItem("userScore", userScoreRef.current);
    localStorage.setItem("gameInProgress", true);
    localStorage.setItem(
      "roundHistory",
      JSON.stringify(roundHistoryRef.current)
    );
    localStorage.setItem("roundCounter", roundCounterRef.current);
    localStorage.setItem("moneyState", moneyStateRef.current);
    localStorage.setItem("bet", betRef.current);
  };

  useEffect(() => {
    if (!gameInProgress && localStorage.gameInProgress === true) {
      console.log("Use effect");
      setDeckId(localStorage.deckId);
      setGameInProgress(localStorage.gameInProgress);
      setUserHand(JSON.parse(localStorage.userHand));
      setUserScore(localStorage.userScore);
      setDealerHand(JSON.parse(localStorage.dealerHand));
      setRoundHistory(JSON.parse(localStorage.roundHistory));
      setRoundCounter(parseInt(localStorage.roundCounter));
      setDealerScore(localStorage.dealerScore);
      setBet(localStorage.bet);
      setMoneyState(localStorage.moneyState);
      setRoundHistory(JSON.parse(localStorage.roundHistory));
    }
  }, [
    setGameInProgress,
    setUserHand,
    setUserScore,
    setDealerHand,
    setRoundHistory,
    setDealerScore,
    setBet,
    setMoneyState,
    gameInProgress,
  ]);
  if (gameInProgressRef.current === false) {
    return (
      <>
        Click button to start game:
        <button onClick={startGame}>START</button>
      </>
    );
  } else {
    return (
      <>
        <h1>Round {roundCounter}</h1>
        <h1>User money: {moneyState}</h1>
        <h1>Round history</h1>
        {Array.from(roundHistory).map((history) => {
          return (
            <li key={history.round}>
              round {history.round} -- {history.winner}
            </li>
          );
        })}

        {deckId && <h1>Game id: {deckId}</h1>}
        {dealerHand && <h1> Dealer cards</h1>}
        <h1>Dealer:{dealerScore}</h1>

        {dealerHand &&
          dealerHand.map((card) => {
            return <img key={card.code} src={card.image} alt={card.code} />;
          })}

        {userHand && <h1> User cards</h1>}
        <h1>User:{userScore}</h1>
        {userHand &&
          userHand.map((card) => {
            return <img key={card.code} src={card.image} alt={card.code} />;
          })}
        <button onClick={hitAction}>HIT</button>
        <button onClick={standAction}>STAND</button>
        <button onClick={doubleAction}>DOUBLE</button>
      </>
    );
  }
}

export default Deck;
