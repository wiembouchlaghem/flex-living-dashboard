import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard"; // Dashboard.jsx
import PropertyPage from "./pages/PropertyPage";
import Reviews from "./components/dashboard/reviews";       // nouveau composant
import Stats from "./components/dashboard/Stats";           // nouveau composant
import Footer from "./components/common/footer/footer";
import Header from "./components/common/header/header";
import BusinessHousing from "./components/publicpages/BusinessHousing";
import StayLonger from "./components/publicpages/FlexibleStays";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/property" element={<PropertyPage />} />
          <Route path="/reviews" element={<Reviews />} />   {/* nouvelle route */}
          <Route path="/stats" element={<Stats />} />       {/* nouvelle route */}
        </Routes>
      </main>
      <StayLonger />
      <BusinessHousing />
      <Footer />
    </Router>
  );
}

export default App;
