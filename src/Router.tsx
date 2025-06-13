//react-router-dom
//Version 7 is little changes
//BrowerRouter / createBrowerRouter
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./pages/Coins";
import Coin from "./pages/Coin";
import Chart from "./pages/Chart";
import Price from "./pages/Price";

function Router() {
  return (
    <BrowserRouter basename="/master">
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
