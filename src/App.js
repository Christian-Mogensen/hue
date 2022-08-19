import { Route, Routes } from "react-router-dom";
import "./index.css";
import Controls from "./pages/Controls";
import Home from "./pages/Home";
import Room from "./pages/Room";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:slug" element={<Room />} />
        <Route path="/room/:slug/setting/:id" element={<Controls />} />
      </Routes>
    </div>
  );
}

export default App;
