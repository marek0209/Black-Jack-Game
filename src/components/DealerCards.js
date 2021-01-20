import { useContext } from "react";
import { AppContext } from "../AppContext";

const DealerCards = () => {
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
  return (
    <div className="dealerCardsContainer">
      {dealerHand &&
        dealerHand.map((card) => {
          return (
            <img
              className="dealerCard"
              key={card.code}
              src={card.image}
              alt={card.code}
            />
          );
        })}
    </div>
  );
};

export default DealerCards;
