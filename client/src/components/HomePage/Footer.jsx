import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <section className="about-section">
      <h2 className="about-title">
        What is Second Hand Land?
        <br />
        <a href="/about" className="about-link">
          Read our wonderfully weird story
        </a>
      </h2>

      <div className="about-grid">
        <div className="about-card">
          <h3>Give Old Things New Life</h3>
          <p>
            We believe every pre-loved item has a story worth continuing. Instead of throwing things
            away, let’s give them a second chance to be cherished.
          </p>
          <em>A small choice for you, a big step for the planet.</em>
        </div>

        <div className="about-card">
          <h3>Support Local & Sustainable Living</h3>
          <p>
            Every purchase you make supports local sellers and helps build a more sustainable way of
            living together.
          </p>
          <em>Each item carries a touch of real human connection.</em>
        </div>

        <div className="about-card">
          <h3>Shop Smart, Live Mindfully</h3>
          <p>
            Find unique, high-quality items at fair prices — because mindful shopping is something
            to be proud of.
          </p>
          <p style={{ fontWeight: 300, fontStyle: "italic", fontSize: "small" }}>
            Buy less, choose well.
          </p>
        </div>
      </div>

      <div className="help-section">
        <p>
          Have a question? <strong>We’re here to help.</strong>
        </p>
        <button className="help-btn">Go to Help Center</button>
      </div>
    </section>
  );
};

export default Footer;
