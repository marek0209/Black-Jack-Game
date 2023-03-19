import React, { useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import "./Deck.css";
import Menu from "./Menu";
import cardActions from "../actions/cardsActions";
import DealerCards from "./DealerCards";
import UserCards from "./UserCards";
import RoundHistory from "./RoundHistory";
import BetModal from "./BetModal";
import EndOfRoundModal from "./EndOfRoundModal";
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
        {/* {gameState.showModal === true ? <Modal /> : <></>} */}
        <BetModal />
        <EndOfRoundModal />

        <div className=" container-fluid vh-100 d-flex flex-row deck">
          <div className="w-25 h-100 flex-column">
            <div className="w-100 h-25 d-flex flex-column align-items-center pt-4">
              <h2 className="text-center">
                User money: {gameState.moneyState}$
              </h2>
            </div>
            <div className="w-100 h-25 d-flex flex-column align-items-center justify-content-center">
              <h2 className="text-center">Bet: {gameState.bet}$</h2>
            </div>
            <div className="w-100 h-25"></div>
            <div className="w-100 h-25 d-flex flex-column align-items-center justify-content-end">
              {gameState.deckId && <h3>Game id: {gameState.deckId}</h3>}
            </div>
          </div>
          <div className="w-50 h-100 flex-column">
            <div className="my-4 d-flex flex-column justify-content-center align-items-center">
              <h2>Round {gameState.roundCounter}</h2>
            </div>
            <div className="dealerScoreContainer flex-column">
              {/* Uncoment line bellow if debug app or develop */}
              {/* <h2>Dealer:{dealerScore}</h2> */}
            </div>
            <DealerCards />
            <div className="w-100 my-4 d-flex algin-items-center justify-content-center">
              <h2>User:{gameState.userScore}</h2>
            </div>
            <UserCards />
            <div className="w-100 my-4 d-flex flex-row align-items-end justify-content-center">
              <button
                className="btn btn-secondary"
                onClick={() => cardActions.hitAction(gameState)}
              >
                HIT
              </button>
              <button
                className="btn btn-secondary ml-2"
                onClick={() => cardActions.standAction(gameState)}
              >
                STAND
              </button>
              <button
                className="btn btn-secondary ml-2"
                onClick={() => cardActions.doubleAction(gameState)}
              >
                DOUBLE
              </button>
            </div>
          </div>
          <div className="w-25 h-100 flex-column">
            <RoundHistory />
          </div>
        </div>
      </>
    );
  }
}

export default Deck;
