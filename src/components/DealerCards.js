import { useContext } from "react";
import { AppContext } from "../AppContext";

const DealerCards = () => {
  const gameState = useContext(AppContext);

  return (
    <div className="w-100 h-25 d-flex align-item-flex-end justify-content-center p-1">
      {gameState.dealerHand &&
        gameState.dealerHand.map((card) => {
          return (
            <img
              className="gameCard"
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
