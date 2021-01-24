import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { useForm } from "react-hook-form";
const Modal = () => {
  const [showError, setShowError] = useState(false);
  const gameState = useContext(AppContext);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    if (gameState.moneyState < data) {
      setShowError(true);
    } else {
      gameState.setShowModal(false);
      setShowError(false);
    }
  };
  console.log(errors);
  if (gameState.showModal === true) {
    return (
      <div className="modal custom-bet-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Bet</h5>
            </div>
            <div className="modal-body">
              {showError ? (
                <p>You don't have enough money enter correct value :</p>
              ) : (
                <p>Please enter your bet:</p>
              )}
              <form>
                <input
                  type="number"
                  placeholder="bet"
                  name="bet"
                  ref={register({
                    required: true,
                    max: 100,
                    min: 1,
                    maxLength: 3,
                  })}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit(onSubmit)}
              >
                Get bet
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

export default Modal;
