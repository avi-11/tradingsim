import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import styles from "./pages/home/Home.module.css";

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
      <div className={styles.homeDetailContainer}>
        <h2>Home</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </p>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="entry" element={<Entry />} />
          <Route path="exit" element={<Exit />} />
          <Route path="result" element={<Result />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ShadeContainer>
  );
}

export default App;
