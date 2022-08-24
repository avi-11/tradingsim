import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import styles from "./pages/home/Home.module.css";

import Start from "./pages/start/Start";
import Entry from "./pages/entry/Entry";
import Exit from "./pages/exit/Exit";
import Home from "./pages/home/Home";
import Result from "./pages/result/Result";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ShadeContainer from "./components/container/ShadeContainer";

function App() {
  return (
    <ShadeContainer>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="entry" element={<Entry />} />
          <Route path="exit" element={<Exit />} />
          <Route path="result" element={<Result />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Start />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ShadeContainer>
  );
}

export default App;
