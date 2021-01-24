import { useContext } from "react";
import { AppContext } from "../AppContext";

const DealerCards = () => {
  const gameState = useContext(AppContext);

  return (
    <div className="dealerCardsContainer">
      {gameState.dealerHand &&
        gameState.dealerHand.map((card) => {
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
