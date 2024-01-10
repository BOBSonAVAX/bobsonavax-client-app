import { useEffect, useState } from "react";
import landpagepic from "../images/bobs_app_landpage.png"
import BuyComponent from "../BuyComponent";
import Footer from "../Footer";
import Statistics from "../Statistics";


const Home: React.FC = () => {



    useEffect(() => {

    }, [])

    return (
        <div className="w-full">

            <div className="w-full flex flex-col justify-center items-center  overflow-hidden">
                <img src={landpagepic} className="w-full min-w-[500px] pl-6 sm:pl-0"></img>
                <Statistics />
                <BuyComponent />
            </div>
            <Footer />
        </div>
    )
}


export default Home;