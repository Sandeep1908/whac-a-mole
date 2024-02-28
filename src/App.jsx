
import Welcome from "./components/Welcome";
import Mode from "./components/Mode";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Multiplayer from "./components/Multiplayer";
import SinglePlayer from "./components/singleplayer/SinglePlayer";
import Main from "./components/singleplayer/Main";
import MultiplayerComponent from "./components/multiplayer/Main";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/mode" element={<Mode />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/singleplayer" element={<SinglePlayer />} />
        <Route path="/sigleplayer-game" element={<Main />} />
        <Route path="/multi-player-game" element={<MultiplayerComponent />} />


        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
