import "./App.css";
import "./CssVariables.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Entry from "./Entry";
import Exit from "./Exit";
import Home from "./Home";
import Result from "./Result";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div
      style={{
        width: "90%",
      }}
    >
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="entry" element={<Entry />} />
          <Route path="exit" element={<Exit />} />
          <Route path="result" element={<Result />} />
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
