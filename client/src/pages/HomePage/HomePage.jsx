import React from "react";
import Header from "../../components/HomePage/Header";
import InfoApp from "../../components/HomePage/InfoApp";
import Footer from "../../components/HomePage/Footer";
import CategoryGrid from "../../components/HomePage/Category/CategoryGrid";
import HeroSection from "../../components/HomePage/HeroSection";
import ProductGrid from "../../components/HomePage/TodayPick/ProductGrid";
const HomePage = () => {
  return (
    <>
      <Header></Header>
      <HeroSection></HeroSection>
      <CategoryGrid></CategoryGrid>
      <ProductGrid></ProductGrid>
      <InfoApp></InfoApp>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
