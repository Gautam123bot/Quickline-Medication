import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Loginpage from "./pages/Loginpage";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import Ambulance from "./pages/Ambulance";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router path="/Health-Plus">
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
