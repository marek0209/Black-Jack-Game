import { useContext } from "react";
import { AppContext } from "../AppContext";
const RoundHistory = () => {
  const gameState = useContext(AppContext);

  return (
    <div className="roundHistoryContainer">
      <h1>Round history</h1>
      <ul className="roundHistory_list">
        {Array.from(gameState.roundHistory).map((history) => {
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
