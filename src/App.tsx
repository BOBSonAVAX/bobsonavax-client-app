import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import ScrollToTop from "./components/home/ScrollToTop";
import Home from "./components/home/Home";



export default function App() {
  return (


    <main className="main">
      <BrowserRouter>

        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />}></Route>

        </Routes>


      </BrowserRouter>


    </main>


  );
}
