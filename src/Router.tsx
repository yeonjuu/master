//react-router-dom
//Version 7 is little changes
//BrowerRouter / createBrowerRouter
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./pages/Coins";
import Coin from "./pages/Coin";

function Router() {
  return (
    <BrowserRouter basename="/master">
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
