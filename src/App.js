import Deck from "./components/Deck";
import "./App.css";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <AppProvider>
      <Deck />
    </AppProvider>
  );
}

export default App;
