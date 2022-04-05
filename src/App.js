import React from "react";
import Header from "../src/Component/Header";
import Airlines from "./Component/Airlines";
import Pagination from "./Component/Pagination";
import Card from "./UI/Card";

const App = () => {
  return (
    <div className="content">
      <Header />
      <Card>
        <Airlines />
      </Card>
      <Pagination />
    </div>
  );
};

export default App;
