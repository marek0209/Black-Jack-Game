const calculatePoints = {
  getScore: (cards) => {
    let score = 0;
    if (cards) {
      cards.forEach((card) => {
        let tempScore = 0;
        switch (card.value) {
          case "KING":
          case "JACK":
          case "QUEEN":
            tempScore = 10;
            break;
          case "ACE":
            tempScore = 1;
            break;
          default:
            console.log("Parsuje");
            tempScore = parseInt(card.value);
        }
        score = score + tempScore;
      });
    }

    return score;
  },
};
export default calculatePoints;
