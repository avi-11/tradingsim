import React from "react";
import NumberFormat from "react-number-format";
import "./App.css";
import { useState, useEffect } from "react";
import MadeData from "./Data";
import axios from "axios";
import {useNavigate } from 'react-router-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Entry from'./Entry';
import Exit from'./Exit';
import Home from'./Home';
import Result from './Result';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [quantitySize, setQuantitySize] = useState("");
  const [position, setPosition] = useState("");
  const [positionSize, setPositionSize] = useState("");
  const [capital, setCapital] = useState(0);
  const [marketPrice, setMarketPrice] = useState(0);
  const [volatility, SetVolatilty] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [graphRan, setGraphRan] = useState([]);
  const [alertPositionSize, setalertPositionSize] = useState(false);
  const [submitValidate, setSubmitValidate] = useState(false);
  const [chartsToDisplay, setChartsToDisplay] = useState([]);
  const[selectedDate,setSelectedDate]=useState(null);
  const[labels,setLabels]=useState([]);

  
  
  
return (
  <BrowserRouter>
  <Routes>
    
      <Route path="entry" element={<Entry />} />
        <Route path="exit" element={<Exit />} />
        <Route path="result" element={<Result />} />
        <Route path="/" element={<Home />}>
        
      
    </Route>
  </Routes>
</BrowserRouter>
)}
  
export default App;
