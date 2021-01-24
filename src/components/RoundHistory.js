import { useContext } from "react";
import { AppContext } from "../AppContext";
const RoundHistory = () => {
  const gameState = useContext(AppContext);

  return (
    <div className="w-100 h-100 d-flex flex-column pt-4">
      <h2 className="text-center">Round history</h2>
      <ul className="list-group">
        {Array.from(gameState.roundHistory).map((history) => {
          return (
            <li
              className="group-list-item custom-list-item"
              key={history.round}
            >
              round {history.round} -- {history.winner}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RoundHistory;
