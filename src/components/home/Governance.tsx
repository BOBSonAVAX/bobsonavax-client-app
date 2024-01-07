import { useAddress, SmartContract, useSigner } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { GOV_CONTRACT_ADDY, CONTRACT_ADDRESS_BOBS } from "../../addresses/Addresses";
import bigBobsGov from "../../contracts/bigBobsGov.json"
import bobs from "../../contracts/bobs.json"
import SdkInterface from "../../interfaces/Sdk.interface";
import { HashLoader } from "react-spinners";
import { notification, Input, Modal, ConfigProvider } from "antd";
import { BigNumber, ethers } from "ethers";











type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Governance: React.FC<SdkInterface> = ({ sdk }) => {



    const address: string | undefined = useAddress();
    const signer = useSigner()
    const [api, contextHolder] = notification.useNotification();
    const [openBuy, setOpenBuy] = useState(false);
    const [userBobsBalance, setUserBobsBalance] = useState<string>("");
    const [userBigBobsBalance, setUserBigBobsBalance] = useState<string>("");
    const [bobsToBarrel, setBobsToBarrel] = useState<string>('')
    const [wenStored, setWenStored] = useState<string>('')


    let [govContract, setGovContract] = useState<SmartContract>();
    let [bobsContract, setBobsContract] = useState<SmartContract>();

    let [loadingContract, setLoadingContract] = useState<boolean>(false);
    let [loadingDeposit, setLoadingDeposit] = useState<boolean>(false);
    let [loadingWithdraw, setLoadingWithdraw] = useState<boolean>(false);
    let [depositedBobsAmount, setDepositedBobsAmount] = useState<string>('')



    function formatTimestamp(timestamp: number): string {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear().toString();

        return `${day}:${month}:${year}`;
    }



    const openNotificationWithIcon = (type: NotificationType, message: string, description: string | null) => {
        api[type]({
            message: message,
            description: description,
        });
    };



    const handleCancel = () => {
        setOpenBuy(false);
    };

    const handleOk = () => {
        setOpenBuy(false);
    };

    const showModal = () => {
        setOpenBuy(true)
    };


    const handleResetInput = () => {

        setDepositedBobsAmount('');
    };


    let onValueChange = (e: any) => {
        setDepositedBobsAmount(e.target.value.toString());
    }


    const deposit = async (amount: any) => {
        try {
            if (govContract) {
                const data = await govContract.call("deposit", [amount]);
                return data;
            }
        } catch (error: any) {
            console.error("Error during deposit:", error);
        }
    };


    const depositProcess = async (address: any, value: any, depositor: any | null) => {
        try {
            if (bobsContract) {
                setLoadingDeposit(true)

                await sdk.wallet.sign("You need to approve the governance contract before you deposit your $BOBS")

                const spenderAddress = address
                const amount = BigNumber.from(value);
                const approval = await bobsContract.call("approve", [spenderAddress, amount]);
                openNotificationWithIcon('success', "Successfully approved", `txHash: ${approval?.receipt.transactionHash}`)

                if (approval && approval.receipt) {
                    let depositTx: any = await deposit(amount)

                    if (depositTx.receipt) {
                        openNotificationWithIcon('success', "Successfully deposited", `txHash: ${depositTx?.receipt.transactionHash}`)
                        setLoadingDeposit(false)
                        handleResetInput();





                        if (govContract) {

                            let claimBigBobs = await govContract.call("claim", [])


                            if (claimBigBobs && claimBigBobs.receipt) {
                                openNotificationWithIcon('success', "Successfully claimed your bigBobs", `txHash: ${claimBigBobs?.receipt.transactionHash}`)

                                let userBigBobs = await govContract.call("balanceOf", [depositor])

                                setUserBigBobsBalance(ethers.utils.formatUnits(userBigBobs, "ether"))
                                let barrel = await govContract.call("addressToBarrel", [depositor])

                                setBobsToBarrel(ethers.utils.formatUnits(barrel[0], "ether"))



                                let userBobsBalance = await bobsContract.call("balanceOf", [depositor])
                                setUserBobsBalance(ethers.utils.formatUnits(userBobsBalance, "ether"))


                                if (userBigBobs == 0) {
                                    setWenStored("-")
                                } else {
                                    let date = formatTimestamp(parseInt(barrel[1]))
                                    setWenStored(date)
                                }
                            }


                        }

                    }
                }
            }
        } catch (error: any) {
            setLoadingDeposit(false)
            handleResetInput();
            openNotificationWithIcon('error', "Error during approval", `${error.reason}`)
        }
    };



    const withdraw = async () => {

        try {
            setLoadingWithdraw(true)
            let withdraw = await govContract?.call("withdraw", []);
            if (withdraw.receipt) {
                openNotificationWithIcon('success', "Successfully withdrawn", `txHash: ${withdraw?.receipt.transactionHash}`)

                let userBigBobs = await govContract?.call("balanceOf", [address])
                setUserBigBobsBalance(ethers.utils.formatUnits(userBigBobs, "ether"))

                let barrel = await govContract?.call("addressToBarrel", [address])
                setBobsToBarrel(ethers.utils.formatUnits(barrel[0], "ether"))

                setWenStored("-")

                let bobsData = await sdk.getContract(CONTRACT_ADDRESS_BOBS, bobs);
                setBobsContract(bobsData);
                let userBobsBalance = await bobsData.call("balanceOf", [address])
                setUserBobsBalance(ethers.utils.formatUnits(userBobsBalance, "ether"))
                setLoadingWithdraw(false)
            }


        } catch (error: any) {
            openNotificationWithIcon('error', "Error during approval", `${error}`)
            setLoadingWithdraw(false)
        }

    }







    useEffect(() => {
        const fetchContracts = async () => {
            try {
                setLoadingContract(true);

                // Fetch and set govContract
                if (sdk && address && signer && !govContract) {
                    let govData = await sdk.getContract(GOV_CONTRACT_ADDY, bigBobsGov);
                    setGovContract(govData);

                    let userBigBobs = await govData.call("balanceOf", [address])
                    setUserBigBobsBalance(ethers.utils.formatUnits(userBigBobs, "ether"))
                    let barrel = await govData.call("addressToBarrel", [address])

                    setBobsToBarrel(ethers.utils.formatUnits(barrel[0], "ether"))

                    if (userBigBobs == 0) {
                        setWenStored("-")
                    } else {
                        let date = formatTimestamp(parseInt(barrel[1]))
                        setWenStored(date)
                    }


                }

                // Fetch and set bobsContract
                if (sdk && address && signer && !bobsContract) {
                    let bobsData = await sdk.getContract(CONTRACT_ADDRESS_BOBS, bobs);
                    setBobsContract(bobsData);
                    let userBobsBalance = await bobsData.call("balanceOf", [address])
                    setUserBobsBalance(ethers.utils.formatUnits(userBobsBalance, "ether"))

                }

                setTimeout(() => { setLoadingContract(false) }, 1000)

            } catch (error) {
                console.log("Error fetching contracts: ", error);
                setLoadingContract(false);
            }
        };

        fetchContracts();

    }, [sdk, address, signer, govContract, bobsContract]);



    return (

        <ConfigProvider

            theme={{
                token: {
                    // Seed Token
                    colorPrimary: '#00b96b',
                    borderRadius: 2,
                    colorBgBase: "#171717",
                    colorText: "white",
                    colorBorder: "#ee8c3a",
                    colorTextPlaceholder: "gray"
                },
            }}


        >
            <div className="flex  px-4 py-2 text-white">
                {contextHolder}
                <div className="text-xs w-full  ">
                    {
                        loadingContract ?
                            (
                                <div className=" h-[60vh] w-full flex items-center justify-center">
                                    <HashLoader color="white" />
                                </div>
                            )
                            :
                            (

                                <div className="w-full flex flex-col items-center">

                                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-end  p-10  border border-amber-500 max-w-[1000px] mt-10 shadow-md shadow-amber-500">


                                        <div className=" text-end">
                                            <p>max Power $bigBobs</p>
                                            <p className="text-lg">80850</p>
                                        </div>




                                        <div className=" text-end">
                                            <p>your $bigBOBS</p>
                                            <p className="text-lg">{userBigBobsBalance}</p>
                                        </div>

                                        <div className=" text-end">
                                            <p>your $BOBS</p>
                                            <p className="text-lg">{parseFloat(userBobsBalance).toFixed(2)}</p>
                                        </div>

                                        <div className=" text-end">
                                            <p>your staked $BOBS</p>
                                            <p className="text-lg">{parseFloat(bobsToBarrel).toFixed(2)}</p>
                                        </div>

                                        <div className=" text-end">
                                            <p>wen staked</p>
                                            <p className="text-lg">{wenStored}</p>
                                        </div>
                                    </div>



                                    <div className="relative w-full flex flex-col items-center h-[50vh]  p-5 pt-10 ">
                                        <div className="w-full max-w-[700px] flex flex-col items-center gap-2">
                                            <p className="text-lg">Stake $BOBS, get $bigBobs</p>
                                            <Input placeholder="Amount ..." value={depositedBobsAmount} id="token-amount" name="token-amount" className="w-full max-w-96 flex justify-end items-center [&::-webkit-inner-spin-button]:appearance-none" type="number" onChange={onValueChange} />


                                            <div className=" w-full  flex justify-end max-w-96">
                                                {
                                                    parseFloat(userBobsBalance) > 0 ?
                                                        (
                                                            <div className="flex justify-end gap-2 ">
                                                                <p>{parseFloat(userBobsBalance).toFixed(2)}</p>
                                                                <button className="text-fuchsia-500 text-start ease-in-out duration-300" onClick={() => { setDepositedBobsAmount(userBobsBalance) }}>MAX</button>
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div className="flex justify-end gap-2 ">
                                                                <p>{userBobsBalance}</p>

                                                                <button className="text-fuchsia-500 text-start ease-in-out duration-300" onClick={showModal}>Buy</button>

                                                            </div>
                                                        )
                                                }
                                            </div>

                                            <div className="w-full flex justify-end max-w-96">
                                                {
                                                    + userBobsBalance > 0 &&
                                                    <button className="bg-[#ee8c3a]   w-20 h-8 flex justify-center items-center  text-[14px] rounded-md text-black hover:text-white duration-300 ease-in-out"
                                                        onClick={() => {
                                                            if (depositedBobsAmount) {
                                                                depositProcess(GOV_CONTRACT_ADDY, ethers.utils.parseUnits(depositedBobsAmount, "18"), address)
                                                            } else {
                                                                openNotificationWithIcon('warning', "No value detected", "You need to provide a value to be approved and spent")
                                                            }
                                                        }}
                                                    >{
                                                            loadingDeposit ? (<div className=""><HashLoader size={"20px"} color="white" /></div>) : (<>Deposit</>)
                                                        }
                                                    </button>
                                                }

                                                {
                                                    + userBigBobsBalance > 0 &&
                                                    <button onClick={withdraw} className="bg-[#ee8c3a]   w-20 h-8 flex justify-center items-center  text-[14px] rounded-md text-black hover:text-white duration-300 ease-in-out">
                                                        {
                                                            loadingWithdraw ? (<div className=""><HashLoader size={"20px"} color="white" /></div>) : (<>Withdraw</>)
                                                        }
                                                    </button>
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                    }
                </div >
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
            </div >
        </ConfigProvider>
    )
}


export default Governance;