import React, { useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import apiService from "../services/apiService";
import calculatePoints from "../services/calculatePoints";
import "./Deck.css";
import Menu from "./Menu";

import cardActions from "../actions/cardsActions";
import DealerCards from "./DealerCards";
import UserCards from "./UserCards";
import RoundHistory from "./RoundHistory";
function Deck() {
  const [
    deckId,
    setDeckId,
    deckIdRef,
    dealerHand,
    setDealerHand,
    dealerHandRef,
    userHand,
    setUserHand,
    userHandRef,
    gameInProgress,
    setGameInProgress,
    gameInProgressRef,
    userScore,
    setUserScore,
    userScoreRef,
    dealerScore,
    setDealerScore,
    dealerScoreRef,
    roundCounter,
    setRoundCounter,
    roundCounterRef,
    moneyState,
    setMoneyState,
    moneyStateRef,
    bet,
    setBet,
    betRef,
    roundHistory,
    setRoundHistory,
    roundHistoryRef,
  ] = useContext(AppContext);
  const state = {
    deckId,
    setDeckId,
    deckIdRef,
    dealerHand,
    setDealerHand,
    dealerHandRef,
    userHand,
    setUserHand,
    userHandRef,
    gameInProgress,
    setGameInProgress,
    gameInProgressRef,
    userScore,
    setUserScore,
    userScoreRef,
    dealerScore,
    setDealerScore,
    dealerScoreRef,
    roundCounter,
    setRoundCounter,
    roundCounterRef,
    moneyState,
    setMoneyState,
    moneyStateRef,
    bet,
    setBet,
    betRef,
    roundHistory,
    setRoundHistory,
    roundHistoryRef,
  };

  useEffect(() => {
    window.onbeforeunload = function (event) {
      var message = "Your data will be automatically saved.";
      if (typeof event == "undefined") {
        event = window.event;
      }
      if (event) {
        event.returnValue = message;
      }
      return message;
    };
    if (!gameInProgress && localStorage.gameInProgress) {
      setDeckId(localStorage.deckId);
      setGameInProgress(true);
      setUserHand(JSON.parse(localStorage.userHand));
      setUserScore(localStorage.userScore);
      setDealerHand(JSON.parse(localStorage.dealerHand));
      setRoundHistory(JSON.parse(localStorage.roundHistory));
      setRoundCounter(parseInt(localStorage.roundCounter));
      setDealerScore(localStorage.dealerScore);
      setBet(localStorage.bet);
      setMoneyState(parseInt(localStorage.moneyState));
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
    setRoundCounter,
    setDeckId,
  ]);

  if (
    localStorage.gameInProgress === false ||
    gameInProgressRef.current === false
  ) {
    return <Menu />;
  } else {
    return (
      <>
        <div className="gameDeckContainer">
          <div className="firstSectionContainer">
            <div className="moneyContainer">
              <h1>User money: {moneyState}$</h1>
            </div>
            <div className="betContainer">
              <h1>Bet: {bet}$</h1>
            </div>
            <div className="spacer"></div>
            <div className="gameIdContainer">
              {deckId && <h1>Game id: {deckId}</h1>}
            </div>
          </div>
          <div className="secondSectionContainer">
            <div className="roundContainer">
              <h1>Round {roundCounter}</h1>
            </div>
            <div className="dealerScoreContainer">
              {/* Uncoment line bellow if debug app or develop */}
              {/* <h1>Dealer:{dealerScore}</h1> */}
            </div>
            <DealerCards />
            <div className="userScoreContainer">
              <h1>User:{userScore}</h1>
            </div>
            <UserCards />
            <div className="buttonsContainer">
              <button onClick={() => cardActions.hitAction(state)}>HIT</button>
              <button onClick={() => cardActions.standAction(state)}>
                STAND
              </button>
              <button onClick={() => cardActions.doubleAction(state)}>
                DOUBLE
              </button>
            </div>
          </div>
          <div className="thirdSectionContainer">
            <RoundHistory />
          </div>
        </div>
      </>
    );
  }
}

export default Deck;
