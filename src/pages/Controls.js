import ColorConverter from "cie-rgb-color-converter";
import { throttle } from "lodash";
import Slider from "react-input-slider";

import { useEffect, useMemo, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

const Btn = ({ r, g, b, bri }) => {
  let xy = ColorConverter.rgbToXy(r, g, b);
  const [color, setColor] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(
      `http://192.168.8.100/api/vah3R1fcYAqBxF2XxRvyMT9v3fjgvqbtiWFtH9Tg/lights/${id}/state`,
      { method: "PUT", body: JSON.stringify({ xy: [color.x, color.y], bri }) }
    );
  }, [color]);
  return (
    <button
      style={{ backgroundColor: `rgb(${r},${g},${b})` }}
      onClick={() => setColor(xy)}
      className="w-10 h-10 rounded-full"
    />
  );
};

function Controls() {
  const [brightness, setBrightness] = useState({ x: 20 });
  const [room, setRoom] = useState(null);

  console.log(room);
  function changeHandler({ x }) {
    setBrightness((brightness) => ({ ...brightness, x }));
  }
  const { id } = useParams();
  const url = `http://192.168.8.100/api/vah3R1fcYAqBxF2XxRvyMT9v3fjgvqbtiWFtH9Tg/lights/${id}/state`;

  const throttleChangeHandler = useMemo(() => throttle(changeHandler, 110), []);
  useEffect(() => {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify({ bri: Math.floor(brightness.x * 2.55) }),
    });
  }, [brightness]);
  const navigate = useNavigate();
  return (
    <div className="">
      <h1>light:</h1>
      <div className="flex items-center justify-center w-screen h-screen text-white bg-gray-300">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-12 h-12 p-4 bg-gray-500 rounded-full"
        >
          {"<"}
        </button>
        <div className="flex flex-col items-center justify-evenly h-96 w-96 ">
          <button
            className="w-20 p-2 rounded-sm bg-gradient-to-r from-purple-400 to-pink-200"
            onClick={() =>
              fetch(
                `http://192.168.8.100/api/vah3R1fcYAqBxF2XxRvyMT9v3fjgvqbtiWFtH9Tg/lights/${id}/state`,
                { method: "PUT", body: JSON.stringify({ effect: "colorloop" }) }
              )
            }
          >
            party
          </button>
          <div className="flex flex-wrap gap-4">
            <Btn r={239} g={68} b={68} bri={brightness.x} />
            <Btn r={59} g={130} b={246} bri={brightness.x} />
            <Btn r={88} g={28} b={135} bri={brightness.x} />
          </div>
          <div className="flex">
            <button
              className="w-20 text-black bg-gray-100 border-2 border-white"
              onClick={() =>
                fetch(
                  `http://192.168.8.100/api/vah3R1fcYAqBxF2XxRvyMT9v3fjgvqbtiWFtH9Tg/lights/${id}/state`,
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
                  `http://192.168.8.100/api/vah3R1fcYAqBxF2XxRvyMT9v3fjgvqbtiWFtH9Tg/lights/${id}/state`,
                  { method: "PUT", body: JSON.stringify({ on: false }) }
                )
              }
            >
              off
            </button>
          </div>

          <Slider
            xmin={1}
            xmax={99}
            x={brightness.x}
            onChange={throttleChangeHandler}
            styles={{
              track: {
                backgroundColor: "#cecece",
                height: "2px",
              },
              active: {
                backgroundColor: `rgba(${239},${68},${68},0.${brightness.x})`,
              },
              thumb: {
                width: 15,
                height: 15,
              },
              disabled: {
                opacity: 0.5,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Controls;
