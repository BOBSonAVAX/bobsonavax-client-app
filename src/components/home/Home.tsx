import landpagepic from "../images/bobs_app_landpage.png"
import BuyComponent from "../BuyComponent";
import Footer from "../Footer";
import Stats from "../Stats";


const Home: React.FC = () => {

    return (
        <div className="w-full">

            <div className="w-full flex flex-col justify-center items-center  overflow-hidden">
                <img src={landpagepic} className="w-full min-w-[500px] pl-6 sm:pl-0" alt="bobs"></img>
                <Stats />
                <BuyComponent />
            </div>
            <Footer />
        </div>
    )
}


export default Home;