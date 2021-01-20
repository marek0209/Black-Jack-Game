import axios from "axios";
const apiService = {
  drawCard: (id, count) => {
    if (count) {
      try {
        let response = axios.get(
          `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${count}`
        );
        return response;
      } catch (err) {
        console.log(err);
      }
    }
  },
  getId: async () => {
    try {
      const resp = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
      );
      return resp.data.deck_id;
    } catch (err) {
      console.log(err);
    }
  },
};

export default apiService;
