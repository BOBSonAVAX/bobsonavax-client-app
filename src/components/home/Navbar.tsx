import { ConnectWallet } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Avalanche } from "@thirdweb-dev/chains";
import { useNavigate } from "react-router-dom";

import logo from "../images/bobs.jpg"
import dexscreener from "../images/dexscreener.jpg"
import twitter from "../images/X_logo_2023_(white).png"
import tg from "../images/tg.png"
import { GithubOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons"
import { ConfigProvider, Modal, Drawer } from 'antd';
import Marquee from "react-fast-marquee";




const Navbar: React.FC = () => {

    const navigate = useNavigate();

    const [modalS, setModalS] = useState('compact');
    //const address = useAddress();


    const [open, setOpen] = useState(false);
    const [openBuy, setOpenBuy] = useState(false);


    const showModal = () => {
        setOpen(false)
        setOpenBuy(true)
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    const handleCancel = () => {
        setOpenBuy(false);
    };

    const handleOk = () => {
        setOpenBuy(false);
    };


    let goHome = () => {
        navigate('/')
        setOpen(false)
    }




    let goToGov = () => {
        navigate('/governance')
        setOpen(false)
    }


    useEffect(() => {

        const handleResize = () => {

            if (window.innerWidth >= 768) {
                setModalS('wide');
            } else {
                setModalS('compact');
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };



    }, []);




    return (


        <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: '#00b96b',
                    borderRadius: 2,
                    colorBgBase: "#171717",
                    colorText: "white",
                    fontFamily: "Play"
                },
            }}
        >
            <div className="w-full   flex justify-between items-center bg-black h-24 px-4 py-2 md:px-20 text-black">
                <MenuOutlined className="mr-4 text-2xl cursor-pointer text-white lg:hidden" onClick={showDrawer} />
                <img src={logo} alt="BOBS Logo" className=" cursor-pointer shadow-2xlr w-14 h-14  rounded-full border-2 border-black -bottom-10 md:-bottom-16 left-10 md:left-24 lg:left-60 lg:-bottom-24 hover:rotate-90 ease-in-out duration-300"></img>
                <div className=" w-full  px-5 hidden lg:flex  gap-5 font-semibold text-lg justify-center text-white">
                    <button onClick={goHome} className="hover:text-white ease-in-out duration-300">Home</button>
                    <button onClick={goToGov} className="hover:text-white ease-in-out duration-300">Governance</button>
                    <button className="hover:text-white ease-in-out duration-300" onClick={showModal}>Buy</button>
                </div>
                <div className="text-xs w-full  flex items-center justify-end">
                    <ConnectWallet
                        theme={"dark"}
                        btnTitle={"Connect wallet"}
                        modalTitle={"@BOBSonAvax"}
                        auth={{ loginOptional: false }}
                        switchToActiveChain={true}
                        modalSize={modalS === "compact" ? "compact" : "wide"}
                        style={{ color: "white", backgroundColor: "black", fontSize: "small" }}
                        welcomeScreen={() =>
                            <div style={{ height: '100%', justifyContent: "center", alignItems: "center", width: "100%", display: "flex", flexDirection: "column", textAlign: "center" }}>
                                <img className="w-36 h-36 mb-10" src={"https://bobsonavax.com/favicon.ico"} alt="BOBS logo"></img>
                                <p className=" w-full text-2xl">Welcome to $BOBS World</p>
                                <p className="w-full text-md mt-2 text-gray-500">Connect your wallet to get started</p>
                            </div>
                        }
                        termsOfServiceUrl="https://...."
                        privacyPolicyUrl="https://...."
                        modalTitleIconUrl={
                            "https://bobsonavax.com/favicon.ico"
                        }
                        supportedTokens={{
                            [Avalanche.chainId]: [
                                {
                                    address: "0xf5f3216E9fed36F8cCf08D310FEc6FBf7f06200f",
                                    name: "BOBS",
                                    symbol: "BOBS",
                                    icon: "https://bobsonavax.com/favicon.ico"
                                }
                            ]
                        }}

                        displayBalanceToken={{
                            [Avalanche.chainId]: "0xf5f3216E9fed36F8cCf08D310FEc6FBf7f06200f"
                        }}




                    />



                </div>

            </div>

            <Marquee className="bg-green-600">
                If you ain't holding $BOBS, then what are you holding?
            </Marquee>


            <Modal
                open={openBuy}
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


            <Drawer
                title="MENU"
                placement="left"
                closable={true}
                onClose={onClose}
                open={open}
                key={"left"}
                closeIcon={<CloseOutlined style={{ color: 'white' }} />}
            >
                <div className="w-full h-full flex flex-col justify-between">
                    <div className=" w-full  mt-10 text-gray-400    px-5 flex flex-col  gap-5 font-semibold text-lg justify-center">
                        <button className="hover:text-white text-start ease-in-out duration-300" onClick={goHome}>Home</button>
                        <button onClick={goToGov} className=" text-start hover:text-white ease-in-out duration-300">Governance</button>
                        <button className="hover:text-white text-start ease-in-out duration-300" onClick={showModal}>Buy</button>
                        <p className=" text-start text-white ease-in-out duration-300 mt-20">Coming soon ...</p>
                        <button className=" text-start ease-in-out duration-300">Docs</button>
                    </div>
                    <div className="flex w-full items-center justify-center">
                        <div className=" flex justify-center items-center  gap-4 mr-4">
                            <a className="" href="https://twitter.com/BOBSonAVAX" target="_blank" rel="noreferrer">
                                <div className="w-10 h-10 rounded-md  bg-black p-1 ">
                                    <img src={twitter} alt="Twitter Logo"></img>
                                </div>
                            </a>
                            <a className="" href="https://t.me/avax_bobs" target="_blank" rel="noreferrer">
                                <div className="w-10 h-10 rounded-md  bg-black p-1">
                                    <img src={tg} alt="Telegram Logo"></img>
                                </div>
                            </a>
                            <a className="" href="https://dexscreener.com/avalanche/0x8d59f25a2a31f80d12dda8d6cee125684ea1d019" target="_blank" rel="noreferrer" >
                                <div className="w-10 h-10 rounded-md   bg-black ">
                                    <img src={dexscreener} className="rounded-md" alt="Dexscreener Logo"></img>
                                </div>
                            </a>
                            <a className="" href="https://github.com/BOBSonAVAX" target="_blank" rel="noreferrer">
                                <div className=" w-10 h-10 bg-black rounded-md flex justify-center items-center">
                                    <GithubOutlined className="text-3xl  text-white" alt="Github logo" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </Drawer>

        </ConfigProvider >
    )
}


export default Navbar;