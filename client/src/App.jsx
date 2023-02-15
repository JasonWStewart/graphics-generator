import { useState } from "react";
import "./App.css";
import useFetchImage from "./hooks/useFetchImage";

function App() {
  const [imageRequest, setImageRequest] = useState({
    homeScore: 0,
    awayScore: 0,
    homeTeam: "Hanworth-Villa",
    awayTeam: "Leatherhead",
  });

  const { data, loading, error } = useFetchImage("http://localhost:3000/generator/1", imageRequest);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setImageRequest((previousRequest) => {
      return { ...previousRequest, [name]: value };
    });
  };

  return (
    <div className="App">
      <div>
        <h1>{loading ? "loading" : "hello world"}</h1>
        <div>
          <input
            type="number"
            name="homeScore"
            id="homeScore"
            min="0"
            step="1"
            onChange={handleInputChange}
            placeholder="0"
          />
          <input
            type="number"
            name="awayScore"
            id="awayScore"
            min="0"
            step="1"
            onChange={handleInputChange}
            placeholder="0"
          />
          <button>GO!</button>
        </div>
        <img className={loading ? "loading" : ""} src={data} alt="" />
      </div>
    </div>
  );
}

export default App;
