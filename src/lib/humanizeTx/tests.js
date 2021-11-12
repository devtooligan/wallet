const contractsManager = require("./contractsManager");

let txs = [
    {
        from: "0x5891f2A88311408A52289903df30175885626003",
        to: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
        data: "0x7ff36ab5000000000000000000000000000000000000000000000018a823de1886a6b9f20000000000000000000000000000000000000000000000000000000000000080000000000000000000000000a29a414a809e2fe93f7ce2bb746d6449ad577fe900000000000000000000000000000000000000000000000000000000c31a7c7700000000000000000000000000000000000000000000000000000000000000030000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f000000000000000000000000229b1b6c23ff8953d663c4cbb519717e323a0a84",
        value: 1e18
    },
    {
        from: "0x5891f2A88311408A52289903df30175885626003",
        to: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
        data: "0x18cbafe500000000000000000000000000000000000000000000000000040de4b7427fd60000000000000000000000000000000000000000000000002ad4aaa419ed574000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000003707aa64a35fe74dd4a21bdca160071929f6512a00000000000000000000000000000000000000000000000000000000c31ab27e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f6190000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    },
    {
        from:"0x5891f2A88311408A52289903df30175885626003",
        to:"0x831753dd7087cac61ab5644b308642cc1c33dc13",
        data:"0xa9059cbb0000000000000000000000004c66edbb7fd0567036482d09640ea55cb205bc0b00000000000000000000000000000000000000000000000098a7d9b8314c0000"
    },
    {
        from:"0x5891f2A88311408A52289903df30175885626003",
        to:"0x831753dd7087cac61ab5644b308642cc1c33dc13",
        data:"0x095ea7b3000000000000000000000000a5E0829CaCEd8fFDD4De3c43696c57F7D7A678ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    },
];

contractsManager.init();
//return;
let i = 0;
for(let tx of txs){
    console.log(i++ + " : " + contractsManager.getSummary({chainId:137, id:"polygon"}, tx));
}
