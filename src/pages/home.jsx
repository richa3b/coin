import React from "react";
import  Navbar from "../components/Navbar";
import TableWithFilter from "../components/Table";

const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <TableWithFilter />
    </div>
  );
};

export default Home;
