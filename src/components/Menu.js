import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import logic from "../actions/logic";
import cardActions from "../actions/cardsActions";
import apiService from "../services/apiService";

const Menu = () => {
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

  const startGame = async () => {
    let id;
    logic.betAction(state);
    id = await apiService.getId();
    setDeckId(id);
    cardActions.getFirstCards(id, state);
    setGameInProgress(true);
  };

  return (
    <div className="menuContainer">
      <h1>Black jack game</h1>
      <h2>Click button to start game:</h2>
      <button onClick={startGame}>START</button>
      <h2>Ranking</h2>
      <ul className="rank_list">
        {localStorage.rank &&
          Array.from(JSON.parse(localStorage.rank)).map((rankRecord) => {
            return (
              <li className="rank_record" key={rankRecord.name}>
                {rankRecord.name} -- {rankRecord.score}
              </li>
            );
          })}
      </ul>
      <h3>If you want to reset the ranking click button bellow and click f5</h3>
      <button onClick={logic.resetRanking}>RESET</button>
    </div>
  );
};
export default Menu;
