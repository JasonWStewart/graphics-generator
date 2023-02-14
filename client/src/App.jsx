import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(0);

  async function getImage() {
    return await fetch("http://localhost:3000/generator/1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        homeScore: 5,
        awayScore: 3,
      }),
    });
  }

  useEffect(() => {
    getImage()
      .then((res) => res.blob())
      .then((blob) => setImage(URL.createObjectURL(blob)));
  }, []);

  return (
    <div className="App">
      <div>
        <img src={image} />
      </div>
    </div>
  );
}

export default App;
