import { useEffect } from "react";
import { LP_CONTRACT } from "../../contracts/Addresses"
import { Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";



const Home: React.FC = () => {

    const address = useAddress();

    const { contract } = useContract(LP_CONTRACT)

    // const {
    //     data: contractSwap,
    //     isLoading: isContractLoading
    // } = useContractRead(contract, "approve")




    useEffect(() => {
        console.log(contract);
        if (address) {
            console.log(address);
        }

    }, [address])

    return (
        <div className=" flex justify-end">

            <div>

            </div>

        </div>
    )
}


export default Home;