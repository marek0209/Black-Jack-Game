const calculatePoints = {
  getScore: (card, score) => {
    if (card) {
      switch (card.value) {
        case "KING":
        case "JACK":
        case "QUEEN":
          return 10;

        case "ACE":
          return score + 11 > 21 ? 1 : 11;

        default:
          return parseInt(card.value);
      }
    }

    return score;
  },
};
export default calculatePoints;
