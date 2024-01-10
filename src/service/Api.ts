class Api {


    fetchDexScreener = async () => {
        try {
            const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/avalanche/0x8D59F25a2a31F80d12Dda8D6CeE125684eA1D019')
            const data = await response.json()
            return data

        } catch (error) {
            console.log(error);
        }
    }



}

export default Api;