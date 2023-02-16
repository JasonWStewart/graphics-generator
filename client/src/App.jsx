import "./App.css";
import FinalScore from "./components/FinalScore/FinalScore";
import MainDisplay from "./components/UI/MainDisplay";

function App() {
  return (
    <div className="App">
      <MainDisplay>
        <FinalScore></FinalScore>
      </MainDisplay>
    </div>
  );
}

export default App;
