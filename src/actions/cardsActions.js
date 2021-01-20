import apiService from "../services/apiService";
import calculatePoints from "../services/calculatePoints";
import logic from "../actions/logic";

const cardActions = {
  getFirstCards: async (id, state) => {
    if (id !== undefined) {
      apiService.drawCard(id);
      let { data: dealerCards } = await apiService.drawCard(id, 2);
      if (!dealerCards) {
        dealerCards = await apiService.drawCard(id, 2);
      }
      let { data: userCards } = await apiService.drawCard(id, 2);
      if (!userCards) {
        userCards = await apiService.drawCard(id, 2);
      }
      dealerCards.cards[0].image =
        "https://cdn.pixabay.com/photo/2012/05/07/18/52/card-game-48980_960_720.png";
      state.setUserScore(
        cardActions.sumFirstTwoCardValue(userCards.cards, state.userScore)
      );
      state.setDealerScore(
        cardActions.sumFirstTwoCardValue(dealerCards.cards, state.dealerScore)
      );
      state.setUserHand(userCards.cards);
      state.setDealerHand(dealerCards.cards);
      logic.saveGameToLocalStorage(state);
    }
  },

  sumFirstTwoCardValue: (cards, score) => {
    let tempScore = 0;
    cards.forEach((card) => {
      tempScore += calculatePoints.getScore(card, score);
    });
    return tempScore;
  },

  hitAction: async (state) => {
    console.log(state);
    if (state.deckId) {
      const { data: card } = await apiService.drawCard(state.deckId, 2);
      state.setUserScore(
        state.userScore +
          calculatePoints.getScore(card.cards[0], state.userScore)
      );
      state.setUserHand([...state.userHand, card.cards[0]]);
      if (
        state.dealerScoreRef.current < 17 &&
        state.userScoreRef.current < 21
      ) {
        state.setDealerHand([...state.dealerHand, card.cards[1]]);
        state.setDealerScore(
          state.dealerScore +
            calculatePoints.getScore(card.cards[1], state.dealerScore)
        );
      }
      logic.saveGameToLocalStorage(state);
      if (
        state.userScoreRef.current > 21 ||
        state.dealerScoreRef.current > 21
      ) {
        logic.saveGameToLocalStorage(state);
        logic.endOfRound(logic.checkWhoWin(state), state);
      }
    } else {
      cardActions.hitAction();
    }
  },

  standAction: (state) => {
    state.setGameInProgress(false);
    logic.saveGameToLocalStorage(state);
    logic.endOfRound(logic.checkWhoWin(state), state);
  },

  doubleAction: (state) => {
    state.setUserScore(2 * state.userScore);
    state.setGameInProgress(false);
    logic.saveGameToLocalStorage(state);
    logic.endOfRound(logic.checkWhoWin(state), state);
  },
};
export default cardActions;
