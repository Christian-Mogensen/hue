import React, { useState } from "react";
import ColorConverter from "cie-rgb-color-converter";
import { useEffect } from "react";

const Btn = () => {
  let xy = ColorConverter.rgbToXy(239, 68, 68);
  const [color, setColor] = useState([]);
  useEffect(() => {
    fetch(
      "192.168.8.104/api/vah3R1fcYAqBxF2XxRvyMT9v3fjgvqbtiWFtH9Tg/lights/49/state",
      { method: "PUT", body: JSON.stringify({ xy: [color.x, color.y] }) }
    );
  }, [color]);
  return (
    <button
      onClick={() => setColor(xy)}
      className="w-10 h-10 bg-red-500 rounded-full"
    >
      {" "}
    </button>
  );
};

const Settings = () => {
  return (
    <div className="w-screen h-screen bg-gray-800 text-white flex justify-center items-center">
      <Btn />
    </div>
  );
};

export default Settings;
