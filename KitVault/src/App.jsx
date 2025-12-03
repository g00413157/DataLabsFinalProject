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

            <Route
              path="/"
              element={
                <div className="home-page">
                  <section className="hero">
                    <h1>Welcome to KitVault</h1>
                    <p>
                      Store, browse, and manage your entire football kit collection in one beautiful place.
                    </p>
                    <a href="/collection" className="home-cta">View My Kits</a>
                  </section>


                  <section className="features">
                    <div className="feature-card">
                      <h3>📦 Organise</h3>
                      <p>Keep track of every football kit you own with full details and images.</p>
                    </div>

                    <div className="feature-card">
                      <h3>🎨 Customise</h3>
                      <p>Edit kits, update images, and expand your kit vault easily.</p>
                    </div>

                    <div className="feature-card">
                      <h3>📊 Stats</h3>
                      <p>See total value, number of kits, and deeper insights into your collection.</p>
                    </div>
                  </section>

                </div>
              }
            />


            <Route path="/collection" element={<KitList />} />
            <Route path="/add" element={<KitForm />} />
            <Route path="/edit/:id" element={<KitForm />} />
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
