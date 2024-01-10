import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import ScrollToTop from "./components/home/ScrollToTop";
import Home from "./components/home/Home";
import Governance from "./components/Governance";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useSigner } from "@thirdweb-dev/react";
import { Signer } from "ethers";


export default function App() {

  const signer = useSigner();




  const sdk: ThirdwebSDK | undefined = signer
    ? ThirdwebSDK.fromSigner(signer as Signer, "avalanche", {
      clientId: process.env.REACT_APP_TEMPLATE_CLIENT_ID,
    })
    : undefined;



  return (


    <main className="main">
      <BrowserRouter>

        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/governance' element={sdk ? <Governance sdk={sdk} /> : null}></Route>

        </Routes>


      </BrowserRouter>


    </main>


  );
}


