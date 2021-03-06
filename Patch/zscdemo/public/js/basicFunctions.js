/*
Copyright (c) 2018 ZSC Dev Team
*/


function bF_getEthAccount() {
    //console.log(web3.eth.accounts[0])
    var account = web3.eth.accounts[0];
    //if (account == undefined) alert("Need to login in MetaMask!!");
    return account;
}

function bF_getGasPrice() {
    return 30 * 1000000000; //30 * gwei
}

function bF_getGasLimit(limit) {
    return 600 * 10**4; //limits * 1 million
}

function bF_showHashResult(elementID, hash, func) {
    web3.eth.getTransactionReceipt(hash, 
    function(error, result){ 
        if(!error) {
            var show;
            if (result == null) {
                show =  "(pending)" + hash ;
                bF_showHashResult(elementID, hash, func);
            } else {
                if (result.status == 0) {
                    show = "(failure)" + hash;
                } else {
                    show = "(succeeded)" + hash ;
                    func();
                }
            }
            document.getElementById(elementID).innerText = show;
        } else {
            console.log("error: " + error);
        }
    });
}
