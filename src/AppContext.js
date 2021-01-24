import React, { createContext } from "react";
import useStateRef from "react-usestateref";

export const AppContext = createContext();

export const AppProvider = (props) => {
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
  const [showBetModal, setShowBetModal, showBetModalRef] = useStateRef(false);
  const [
    showEndOfRoundModal,
    setShowEndOfRoundModal,
    showEndOfRoundModalRef,
  ] = useStateRef(false);
  const [gameIsEnd, setGameIsEnd, gameIsEndRef] = useStateRef(false);
  const [roundWinner, setRoundWinner, roundWinnerRef] = useStateRef(undefined);
  const [userName, setUserName, userNameRef] = useStateRef(undefined);
  const gmaeState = {
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
    showBetModal,
    setShowBetModal,
    showBetModalRef,
    showEndOfRoundModal,
    setShowEndOfRoundModal,
    showEndOfRoundModalRef,
    gameIsEnd,
    setGameIsEnd,
    gameIsEndRef,
    roundWinner,
    setRoundWinner,
    roundWinnerRef,
    userName,
    setUserName,
    userNameRef,
  };
  return (
    <AppContext.Provider value={gmaeState}>
      {props.children}
    </AppContext.Provider>
  );
};
