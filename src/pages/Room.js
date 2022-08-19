import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useFetchData from "../util/useFetchData";

const Room = () => {
  const { slug } = useParams();

  const [lights, setLights] = useState(null);
  useEffect(() => {
    fetch(
      `http://192.168.8.100/api/vah3R1fcYAqBxF2XxRvyMT9v3fjgvqbtiWFtH9Tg/groups/${slug}`
    )
      .then((res) => res.json())
      .then((data) => setLights(data));
  }, []);
  console.log(lights);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-300">
      <div>
        {lights && <h1>Room: {lights.name}</h1>}
        {lights ? (
          <div className="flex gap-4 ">
            {lights.lights.map((l, i) => (
              <button
                onClick={() => navigate(`/room/${slug}/setting/${l}`)}
                className="w-32 py-2 bg-red-500"
                key={i}
              >
                {l}
              </button>
            ))}
          </div>
        ) : (
          "loading"
        )}
      </div>
      <div className="flex">
        <button
          className="w-20 text-black bg-gray-100 border-2 border-white"
          onClick={() =>
            fetch(
              `http://192.168.8.100/api/vah3R1fcYAqBxF2XxRvyMT9v3fjgvqbtiWFtH9Tg/groups/${slug}/action`,
              { method: "PUT", body: JSON.stringify({ on: true }) }
            )
          }
        >
          on
        </button>
        <button
          className="w-20 text-white bg-gray-900 border-2 border-white"
          onClick={() =>
            fetch(
              `http://192.168.8.100/api/vah3R1fcYAqBxF2XxRvyMT9v3fjgvqbtiWFtH9Tg/groups/${slug}/action`,
              { method: "PUT", body: JSON.stringify({ on: false }) }
            )
          }
        >
          off
        </button>
      </div>
    </div>
  );
};

export default Room;
