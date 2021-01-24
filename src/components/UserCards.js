import { useContext } from "react";
import { AppContext } from "../AppContext";

const UserCards = () => {
  const gameState = useContext(AppContext);

  return (
    <div className="userCardsContainer">
      {gameState.userHand &&
        gameState.userHand.map((card) => {
          return (
            <img
              className="userCard"
              key={card.code}
              src={card.image}
              alt={card.code}
            />
          );
        })}
    </div>
  );
};

export default UserCards;
