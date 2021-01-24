import React, { useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import "./Deck.css";
import Menu from "./Menu";

import cardActions from "../actions/cardsActions";
import DealerCards from "./DealerCards";
import UserCards from "./UserCards";
import RoundHistory from "./RoundHistory";
function Deck() {
  const gameState = useContext(AppContext);

  useEffect(() => {
    window.onbeforeunload = function (event) {
      const message = "Your data will be automatically saved.";
      if (typeof event == "undefined") {
        event = window.event;
      }
      if (event) {
        event.returnValue = message;
      }
      return message;
    };
    if (!gameState.gameInProgress && localStorage.gameInProgress) {
      gameState.setDeckId(localStorage.deckId);
      gameState.setGameInProgress(true);
      gameState.setUserHand(JSON.parse(localStorage.userHand));
      gameState.setUserScore(localStorage.userScore);
      gameState.setDealerHand(JSON.parse(localStorage.dealerHand));
      gameState.setRoundHistory(JSON.parse(localStorage.roundHistory));
      gameState.setRoundCounter(parseInt(localStorage.roundCounter));
      gameState.setDealerScore(localStorage.dealerScore);
      gameState.setBet(localStorage.bet);
      gameState.setMoneyState(parseInt(localStorage.moneyState));
      gameState.setRoundHistory(JSON.parse(localStorage.roundHistory));
    }
  }, [gameState]);

  if (
    localStorage.gameInProgress === false ||
    gameState.gameInProgressRef.current === false
  ) {
    return <Menu />;
  } else {
    return (
      <>
        <div className="gameDeckContainer">
          <div className="firstSectionContainer">
            <div className="moneyContainer">
              <h1>User money: {gameState.moneyState}$</h1>
            </div>
            <div className="betContainer">
              <h1>Bet: {gameState.bet}$</h1>
            </div>
            <div className="spacer"></div>
            <div className="gameIdContainer">
              {gameState.deckId && <h1>Game id: {gameState.deckId}</h1>}
            </div>
          </div>
          <div className="secondSectionContainer">
            <div className="roundContainer">
              <h1>Round {gameState.roundCounter}</h1>
            </div>
            <div className="dealerScoreContainer">
              {/* Uncoment line bellow if debug app or develop */}
              {/* <h1>Dealer:{dealerScore}</h1> */}
            </div>
            <DealerCards />
            <div className="userScoreContainer">
              <h1>User:{gameState.userScore}</h1>
            </div>
            <UserCards />
            <div className="buttonsContainer">
              <button onClick={() => cardActions.hitAction(gameState)}>
                HIT
              </button>
              <button onClick={() => cardActions.standAction(gameState)}>
                STAND
              </button>
              <button onClick={() => cardActions.doubleAction(gameState)}>
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
