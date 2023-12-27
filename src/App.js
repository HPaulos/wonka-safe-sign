import Home from "./pages/home";
import WonkaLogin from "./pages/wonka-login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//create the app with routes
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<WonkaLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
