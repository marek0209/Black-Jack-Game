import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import logic from "../actions/logic";
import cardActions from "../actions/cardsActions";
import apiService from "../services/apiService";
import Modal from "./Modal";

const Menu = () => {
  const gameState = useContext(AppContext);

  const startGame = async () => {
    let id;
    logic.betAction(gameState);
    id = await apiService.getId();
    gameState.setDeckId(id);
    cardActions.getFirstCards(id, gameState);
    gameState.setGameInProgress(true);
  };

  return (
    <div className="vh-100 container fluid d-flex flex-column">
      <h1 className="text-center my-4">Black jack game</h1>
      <h3 className="text-center mt-4">Click button to start game:</h3>
      <button
        className="btn btn-secondary align-self-center my-4"
        onClick={startGame}
      >
        START
      </button>
      <h2 className="text-center">Ranking</h2>
      <ul className="list-group">
        {localStorage.rank &&
          Array.from(JSON.parse(localStorage.rank)).map((rankRecord) => {
            return (
              <li
                className="list-group-item custom-list-item"
                key={rankRecord.name}
              >
                <h5>
                  {" "}
                  {rankRecord.name} -- {rankRecord.score}
                </h5>
              </li>
            );
          })}
      </ul>
      <h3 className="text-center my-2">
        If you want to reset the ranking click button bellow and click f5
      </h3>
      <button
        className="btn btn-secondary align-self-center my-4"
        onClick={logic.resetRanking}
      >
        RESET
      </button>
    </div>
  );
};
export default Menu;
