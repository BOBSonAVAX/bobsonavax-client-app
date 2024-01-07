import { useEffect, useState } from "react";
import landpagepic from "../images/bobs_app_landpage.png"



const Home: React.FC = () => {



    useEffect(() => {

    }, [])

    return (
        <div className=" flex justify-end">

            <div className="w-full flex flex-col gap-10 justify-center items-center pl-5 sm:pl-0 mt-10 overflow-hidden">
                <img src={landpagepic} className="w-full min-w-[500px]"></img>


            </div>

        </div>
    )
}


export default Home;