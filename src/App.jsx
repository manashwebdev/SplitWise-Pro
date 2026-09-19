import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import TripDetails from "./pages/TripDetails";
import Analytics from "./pages/Analytics";
import Trips from "./pages/Trips";
import Settings from "./pages/Settings";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/trip/:id" element={<TripDetails />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route
        path="/trip/:id"
        element={<TripDetails />}
      />
      <Route path="/trips" element={<Trips />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;