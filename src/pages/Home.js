import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function Home() {
  // const [state, setState] = useState({ x: 10, y: 10 });
  const [rooms, setRooms] = useState();
  useEffect(() => {
    fetch(
      "http://192.168.8.100/api/vah3R1fcYAqBxF2XxRvyMT9v3fjgvqbtiWFtH9Tg/groups"
    )
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);
  console.log(rooms);
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="flex items-center justify-center w-screen h-screen text-white bg-gray-300">
        <h1>
          Control <span>panel</span>
        </h1>
        {rooms ? (
          <div className="flex flex-wrap justify-center gap-10 p-4">
            {Object.values(rooms).map((bulb, i) => (
              <button
                onClick={() => navigate("room/" + Object.keys(rooms)[i])}
                key={i}
                className="w-32 p-4 bg-red-500"
              >
                <p className="truncate ">{bulb.name}</p>
                <p>
                  {bulb.lights.length}{" "}
                  {bulb.lights.length > 1 ? "lights" : "light"}
                </p>
              </button>
            ))}
          </div>
        ) : (
          "Loading"
        )}
      </div>{" "}
    </div>
  );
}

export default Home;
