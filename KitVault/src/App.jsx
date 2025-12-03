import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

import KitList from "./components/KitList";
import KitForm from "./components/KitForm";
import KitDetails from "./components/KitDetails";
import KitStats from "./components/KitStats";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to KitVault</h1>} />
            <Route path="/collection" element={<KitList />} />
            <Route path="/add" element={<KitForm />} />
            <Route path="/kits/:id" element={<KitDetails />} />
            <Route path="/stats" element={<KitStats />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
