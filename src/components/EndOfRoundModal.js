import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import { useForm } from "react-hook-form";
import logic from "../actions/logic";

const EndOfRoundModal = () => {
  const gameState = useContext(AppContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    gameState.setShowEndOfRoundModal(false);
    if (data && gameState.gameIsEnd === true) {
      gameState.setUserName(data.nick);
      logic.endOfGame(gameState);
    }
  };
  if (gameState.showEndOfRoundModal === true) {
    return (
      <div className="modal custom-bet-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">The result</h5>
            </div>
            <div className="modal-body">
              {gameState.gameIsEnd ? (
                <p>
                  Game is end,
                  {gameState.roundWinner === "remis"
                    ? "remis"
                    : "last round win : " + gameState.roundWinner}
                  <br />
                  Please enter your nick for ranking :
                  <input
                    type="text"
                    placeholder="nick"
                    name="nick"
                    ref={register}
                  />
                </p>
              ) : (
                <p>
                  {gameState.roundWinner === "remis"
                    ? "The result of round is remis"
                    : "The round win: " + gameState.roundWinner}
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit(onSubmit)}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default EndOfRoundModal;
