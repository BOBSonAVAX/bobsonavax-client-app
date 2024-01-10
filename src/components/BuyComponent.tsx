import { useState } from "react";
import { Modal, ConfigProvider } from 'antd';


const BuyComponent: React.FC = () => {



    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };


    return (
        <div className="buycomp relative h-[400px] bg-white  md:h-[80vh] lg:h-[50vh]  w-full">



            <button onClick={showModal} className="w-full h-[400px] md:h-[80vh] lg:h-[50vh]">
            </button>


            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token
                        colorPrimary: '#00b96b',
                        borderRadius: 2,
                        colorBgBase: "#171717",
                        colorText: "white",

                    },
                }}
            >
                <Modal
                    open={open}
                    title="REDIRECT CONFIRMATION"

                    footer={() => (
                        <div className="flex justify-end">

                            <button onClick={handleCancel} className="bg-red-500 ml-2  py-2 text-white px-3 rounded-md hover:bg-red-400 ease-in-out duration-300">Cancel</button>
                            <a href="https://traderjoexyz.com/avalanche/trade?outputCurrency=0xf5f3216E9fed36F8cCf08D310FEc6FBf7f06200f" target="_blank" rel="noreferrer">
                                <button onClick={handleOk} className="bg-amber-600 ml-2  py-2 text-white px-3 hover:text-white hover:bg-amber-500 rounded-md ease-in-out duration-300 ">Confirm</button>
                            </a>
                        </div>
                    )}
                >
                    <div className="w-full py-20">
                        <div className="w-full  flex flex-col text-center justify-center">
                            <p className="">You are being redirected to the swap page</p>
                            <p className="">on TraderJoeXYZ</p>

                        </div>

                        <div className="w-full  flex flex-col text-center justify-center mt-10">
                            <p className="">full website link:</p>
                            <p>https://traderjoexyz.com/avalanche/trade?outputCurrency=0xf5f3216E9fed36F8cCf08D310FEc6FBf7f06200f</p>
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>



        </div>
    )
}


export default BuyComponent;