import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Mint, Stake, Social } from "./Pages";
import "react-toastify/dist/ReactToastify.css";
import Wlchecker from "./Pages/Wlchecker";
import { TwitterCallback } from '@ekaruz/react-social-auth';

const App = () => {
  return (
    <div className="App bg-neutral-900">
      <BrowserRouter>  
        <Routes>
          <Route path="/" element={<Stake />} />
          <Route path="/social" element={<Social />} />
          <Route path="/wlchecker" element={<Wlchecker />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/r/:invite-code" element={<Stake />} />
          <Route path="/s/:invite-code" element={<Social />} />
          <Route path="/*" element={<Mint />} />
          <Route path='/callback/twitter' element={<TwitterCallback/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
