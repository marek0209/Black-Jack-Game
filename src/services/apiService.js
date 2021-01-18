import axios from "axios";
const apiService = {
  drawCard: (id) => {
    try {
      console.log("Getting cards for id:" + id);
      let response = axios.get(
        `https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`
      );
      console.log(response.cards);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getId: async () => {
    try {
      const resp = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
      );
      console.log(resp.data.deck_id);
      return resp.data.deck_id;
    } catch (err) {
      console.log(err);
    }
  },
};

export default apiService;
