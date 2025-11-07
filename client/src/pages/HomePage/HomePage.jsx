import React from "react";
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import ProductList from "../../components/HomePage/ListLayout";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home">
      {/* Header */}
      <Header />

      {/* Banner */}
      <section className="home__banner">
        <div className="banner__text">
          <h1>Second Hand Land</h1>
          <p>New Life for Old Things</p>
        </div>
        <div className="banner__image">
          <img src="https://i.imgur.com/ogT2Xo3.png" alt="Second Hand Land Banner" />
        </div>
      </section>

      {/* Today's Picks */}
      <section className="home__picks">
        <h2>Today's Picks</h2>
        <ProductList />
      </section>

      {/* Introduction */}
      <section className="home__about">
        <h2>What is Second Hand Land?</h2>
        <p>
          Second Hand Land is an online marketplace that breathes new life into pre-loved items. We
          believe that every object has a story to tell and deserves a second chance to shine.
        </p>

        <div className="home__about-grid">
          <div>
            <h3>Give Old Things New Life</h3>
            <p>Donate or sell your unused items so they can find new homes and new purposes.</p>
          </div>
          <div>
            <h3>Support Local & Sustainable Living</h3>
            <p>Every purchase helps reduce waste and supports sustainable consumption habits.</p>
          </div>
          <div>
            <h3>Shop Smart, Live Mindfully</h3>
            <p>Choose quality items with character while being kind to the planet.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
