import React from "react";
import Footer from "./Footer";


const Empty: React.FC = () => {


    return (
      <div>
        <div className="w-full lg:text-xl text-center" >
          <p>Not Connected</p>
        </div>
        <div className="m-10 h-10"></div>
        <div className="m-10 h-10"></div>
        <div className="m-10 h-10"></div>
        <Footer />
      </div>

    )

}


export default Empty;