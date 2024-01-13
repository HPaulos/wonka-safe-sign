import React, { useEffect, useState } from "react";
import Home from "./pages/home";
import WonkaLogin from "./pages/wonka-login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseWonkaApp from "./util/firebase-wonka-app";
import PaymentPage from "./pages/paymentPage";

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebaseWonkaApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} /> */}
        <Route path="/" element={<Home />} /> 
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/login" element={<WonkaLogin />} />
      </Routes>
    </Router>
  );
}

export default App;