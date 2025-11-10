import React from "react";
import Header from "../../components/HomePage/Header";
import InfoApp from "../../components/HomePage/InfoApp";
import Footer from "../../components/HomePage/Footer";
const HomePage = () => {
  return (
    <>
      <Header></Header>
      <h1>Cái này sẽ là thẻ gì đó nè</h1>
      <p> Kiên ghi này cho nó tách footer với header trang home ra á</p>
      <InfoApp></InfoApp>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
