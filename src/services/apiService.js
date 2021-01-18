import axios from "axios";
const apiService = {
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
