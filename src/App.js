import Home from "./pages/home";
import Login from "./pages/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//create the app with routes
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
