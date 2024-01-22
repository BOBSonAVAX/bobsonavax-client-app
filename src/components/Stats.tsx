import React, { useEffect, useState } from "react"
import PairDexscreener from "../interfaces/PairInterface";
import Api from "../service/Api";
import Marquee from "react-fast-marquee";


const Stats: React.FC = () => {


    let [data, setData] = useState<PairDexscreener>();


    useEffect(() => {
        let getData = async () => {
            let api = new Api();
            const data = await api.fetchDexScreener();
            setData(data.pair)


        }
        if (!data) {
            getData()
        }

    }, [data])




    return (

        <Marquee className="">
            <div className="w-full overflow-hidden bg-black h-20 flex gap-20 flex-nowrap items-center justify-between md:text-xl  sm:px-10 lg:px-20">
                <div className="flex text-center gap-1">
                    <p className="min-w-24">Total supply: </p>
                    <p >808,580,858,085</p>
                </div>

                <div className="flex  text-center gap-1">
                    <p>Mcap: </p>
                    <p>$ {data?.fdv?.toLocaleString()}</p>
                </div>

                <div className="flex  text-center gap-1">
                    <p className="min-w-24">24h Volume: </p>
                    <p>$ {data?.volume?.h24.toLocaleString()}</p>
                </div>
            </div>
        </Marquee>

    )
}


export default Stats