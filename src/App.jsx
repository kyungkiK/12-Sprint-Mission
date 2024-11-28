import Items from "./components/Items/index";
import Board from "./components/Board";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<Board />} />
      <Route path="/items" element={<Items />} />
    </Routes>
  );
}

export default App;
