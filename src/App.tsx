import React from "react";
import { Routes, Route } from "react-router-dom";

//styles
import "./styles/App.scss";

//components
import TheNavigation from "./components/TheNavigation";

//pages
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <div className="App">
      <header>
        <TheNavigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route index element={<Home />}></Route>
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
};
