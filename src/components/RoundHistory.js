import { useContext } from "react";
import { AppContext } from "../AppContext";
const RoundHistory = () => {
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
  ] = useContext(AppContext);

  let state = {
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
  };

  return (
    <div className="roundHistoryContainer">
      <h1>Round history</h1>
      <ul className="roundHistory_list">
        {Array.from(state.roundHistory).map((history) => {
          return (
            <li key={history.round}>
              round {history.round} -- {history.winner}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RoundHistory;
