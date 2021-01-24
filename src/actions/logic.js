import cardActions from "./cardsActions";

const logic = {
  clearLocalStorage: () => {
    localStorage.removeItem("deckId");
    localStorage.removeItem("dealerHand");
    localStorage.removeItem("userHand");
    localStorage.removeItem("dealerScore");
    localStorage.removeItem("userScore");
    localStorage.removeItem("roundHistory");
    localStorage.removeItem("moneyState");
    localStorage.removeItem("bet");
    localStorage.removeItem("roundCounter");
    localStorage.removeItem("gameInProgress");
  },
  saveGameToLocalStorage: (state) => {
    localStorage.setItem("deckId", state.deckIdRef.current);
    localStorage.setItem(
      "dealerHand",
      JSON.stringify(state.dealerHandRef.current)
    );
    localStorage.setItem("userHand", JSON.stringify(state.userHandRef.current));
    localStorage.setItem("dealerScore", state.dealerScoreRef.current);
    localStorage.setItem("userScore", state.userScoreRef.current);
    localStorage.setItem("gameInProgress", true);
    localStorage.setItem(
      "roundHistory",
      JSON.stringify(state.roundHistoryRef.current)
    );
    localStorage.setItem("roundCounter", state.roundCounterRef.current);
    localStorage.setItem("moneyState", state.moneyStateRef.current);
    localStorage.setItem("bet", state.betRef.current);
  },
  resetRanking: () => {
    localStorage.removeItem("rank");
  },
  endOfGame: (state) => {
    alert("Game is end, you played 5 round");
    let userName = (function ask() {
      var a = prompt("Please enter name for rank");
      return a;
    })();

    //Saving  rank
    let newRank = { score: state.moneyStateRef.current, name: userName };
    let oldRank = undefined;
    let tempRank = undefined;
    function compare(a, b) {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    }

    if (localStorage.rank === undefined || localStorage.rank.length === 0) {
      tempRank = [newRank];
      tempRank = JSON.stringify(tempRank);
      localStorage.setItem("rank", tempRank);
    } else {
      oldRank = JSON.parse(localStorage.rank);
      oldRank.push(newRank);
      oldRank.sort(compare);
      tempRank = JSON.stringify(oldRank);
      localStorage.setItem("rank", tempRank);
    }
    logic.clearLocalStorage();

    state.setRoundCounter(1);
    state.setRoundHistory([]);
  },
  startRound: (state) => {
    if (state.roundCounterRef.current <= 5) {
      logic.betAction(state);
      state.setGameInProgress(true);
      state.setUserHand([]);
      state.setDealerHand([]);
      state.setUserScore(0);
      state.setDealerScore(0);
      cardActions.getFirstCards(state.deckId, state);
      logic.saveGameToLocalStorage(state);
    }
  },

  betAction: (state) => {
    state.setShowModal(true);
  },

  betManagement: (winner, state) => {
    if (winner === "user") {
      state.setMoneyState(state.moneyState + 1.5 * state.bet);
    } else {
      state.setMoneyState(state.moneyState - state.bet);
    }
  },
  checkWhoWin: (state) => {
    if (state.userScoreRef.current < 21 && state.dealerScoreRef.current < 21) {
      let user = 21 - state.userScoreRef.current;
      let dealer = 21 - state.dealerScoreRef.current;
      if (user > dealer) {
        return "dealer";
      } else if (user === dealer) {
        return "remis";
      } else {
        return "user";
      }
    } else {
      if (state.userScoreRef.current > 21) {
        if (state.dealerScoreRef.current > 21) {
          return "remis";
        } else {
          return "dealer";
        }
      } else {
        return "user";
      }
    }
  },
  endOfRound: (winner, state) => {
    state.setRoundCounter(state.roundCounter + 1);
    let history = { winner: winner, round: state.roundCounter };

    if (state.roundHistory.length !== 0) {
      state.setRoundHistory([...state.roundHistory, history]);
    } else {
      state.setRoundHistory([history]);
    }

    if (winner === "remis") {
      window.alert("Remis");
    } else {
      window.alert("The winner is " + winner);
    }

    logic.betManagement(winner, state);
    if (state.roundCounter >= 5) {
      logic.endOfGame(state);
    } else {
      logic.saveGameToLocalStorage(state);
      logic.startRound(state);
    }
  },
};

export default logic;
