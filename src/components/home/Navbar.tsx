import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Avalanche } from "@thirdweb-dev/chains";


const Navbar: React.FC = () => {

    const [modalS, setModalS] = useState('compact');

    const address = useAddress();



    useEffect(() => {
        console.log(address);
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
        <div className="flex justify-end bg-[#ee8c3a] px-4 py-2">

            <div className="text-xs  ">
                <ConnectWallet

                    theme={"dark"}
                    btnTitle={"Connect wallet"}
                    modalTitle={"@BOBSonAvax"}
                    auth={{ loginOptional: false }}
                    switchToActiveChain={true}
                    modalSize={modalS == "compact" ? "compact" : "wide"}

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

        </div >
    )
}


export default Navbar;