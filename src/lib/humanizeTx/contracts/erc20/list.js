//TODO: create an npm script to automatically populate ERC20s
module.exports = {
    polygon:{
        USDC:       { symbol: 'USDC',      decimals: 6,    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'},
        WMATIC:     { symbol: 'WMATIC',    decimals: 18,    address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'},
        WETH:       { symbol: 'WETH',      decimals: 18,    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'},
        QUICK:      { symbol: 'Quick',     decimals: 18,    address: '0x831753dd7087cac61ab5644b308642cc1c33dc13'},
    },
    ethereum: {
        WETH:       { symbol: 'WETH',      decimals: 18,    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'},
        USDC:       { symbol: 'USDC',      decimals: 6,    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'},
        USDT:     { symbol: 'USDT',    decimals: 6,    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'},
        DAI:      { symbol: 'DAI',     decimals: 18,    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'},
        SUSHI:      { symbol: 'SUSHI',     decimals: 18,    address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2'},
        WBTC:      { symbol: 'WBTC',     decimals: 8,    address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'},
        TRUST:      { symbol: 'TRUST',     decimals: 18,    address: '0x70Cc41a7BA9101FDf402Bc0758B7C40fc704ad05'},//dunno this token, just took random onchain uniV3 swaps

        //cTokens
        cDAI:      { symbol: 'cDAI',     decimals: 8,    address: '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643'},


        //curveTokens
        curveFi_cDAI_cUSDC_USDT: { symbol: 'cDAI+cUSDC+USDT',     decimals: 18,    address: '0x9fc689ccada600b6df723d9e47d84d76664a1f23'},


        //Synthetix
        UniV2_LP_sXau_USDC: { symbol: 'UniV2_LP_sXau_USDC',     decimals: 18,    address: '0x34a0216c5057bc18e5d34d4405284564efd759b2'},

    }
}
