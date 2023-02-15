import { useState, useEffect } from "react";
import "./App.css";

async function getImage() {
  return await fetch("http://localhost:3000/generator/1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      homeScore: 1,
      awayScore: 3,
    }),
  });
}

function App() {
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    getImage()
      .then((result) => result.blob())
      .then((blob) => setImgSrc(URL.createObjectURL(blob)));
  }, []);

  return (
    <div className="App">
      <div>
        <h1>Hello World</h1>
        <img src={imgSrc} alt="" />
      </div>
    </div>
  );
}

export default App;
