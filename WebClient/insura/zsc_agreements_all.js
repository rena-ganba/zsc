/*
Copyright (c) 2018 ZSC Dev Team
*/

//class zscWallet
function ZSCAgreementAll(account, adr, abi) {
    this.userType;
    this.allAgrNos = 0;
    this.allAgrNames = [];
    this.allAgrStatus = [];
    this.itemTags = [];
    this.account = account;
    this.contractAdr = adr;
    this.contractAbi = JSON.parse(abi);
    this.gasPrice = bF_getGasPrice();
    this.gasLimit = bF_getGasLimit();
}

ZSCAgreementAll.prototype.numAgrs = function() {return this.allAgrNos;}
ZSCAgreementAll.prototype.getAgrName = function(index) {return this.allAgrNames[index];}
ZSCAgreementAll.prototype.getAgrStatus = function(index) {return this.allAgrStatus[index];}

ZSCAgreementAll.prototype.setUserType = function(type) {this.userType = type;}
ZSCAgreementAll.prototype.getUserType = function(type) {return this.userType;}

ZSCAgreementAll.prototype.resetAllItemTags = function(gm) {
    for (var i = 0; i < gm.agrNos; ++i) {
        gm.itemTags[i] = false;
    }
}

ZSCAgreementAll.prototype.checkAllItemTags = function(gm) {
    for (var i = 0; i < gm.agrNos; ++i) {
        if (gm.itemTags[i] == false) {
            return false;
        }
    }
    return true;
}

ZSCAgreementAll.prototype.loadAllAgreements = function(func) {
    var gm = this;
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);
    
    gm.numAllAgreements(gm, function(gm) {
       if (gm.agrNos == 0) {
            callBack();
        } else {
            gm.resetAllItemTags(gm);
            for (var i = 0; i < gm.allAgrNos; ++i) {
                gm.getAllAgreementNameByIndex(gm, i, function(gm, index) {
                    gm.getAllAgreementStatus(gm, index, function(gm, index) {
                        if (gm.checkAllItemTags(gm) == true) {
                            callBack();
                        }
                    });
                });
            }
        }
    });
}

ZSCAgreementAll.prototype.numAllAgreements= function(gm, func) {
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);
        
    myControlApi.numFactoryElements("agreement", 
        {from: gm.account},
        function(error, result){ 
            if(!error) {
                gm.allAgrNos = result.toString(10); 
                callBack(gm);
            } else {
                console.log("error: " + error);
            }
        });
}

ZSCAgreementAll.prototype.getAllAgreementNameByIndex = function(gm, index, func) {
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    myControlApi.getFactoryElementNameByIndex("agreement", index,
        {from: gm.account},
        function(error, result){ 
            if(!error) {
                gm.allAgrNames[index] = web3.toUtf8(result);
                func(gm, index);
            } else {
                console.log("error: " + error);
            }
        });
}

ZSCAgreementAll.prototype.getAllAgreementStatus = function(gm, index, func) {
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    myControlApi.getElementParameter(gm.allAgrNames[index], "status",
        {from: gm.account},
        function(error, result){ 
            if(!error) {
                gm.allAgrStatus[index] = web3.toUtf8(result);
                gm.itemTags[index] = true;
                func(gm, index);
            } else {
                console.log("error: " + error);
            }
        });
}

ZSCAgreementAll.prototype.submitPurchaseAgreement = function(elementName, func) {
    var gm = this;
    var callBack = func;
    var myControlApi = web3.eth.contract(gm.contractAbi).at(gm.contractAdr);

    myControlApi.purchaseAgreement(elementName, "TestZSC",
        {from: gm.account, gasPrice: gm.gasPrice, gas: gm.gasLimit},
        function(error, result){ 
            if(!error) {
                bF_showHashResult("PurchaseAgreementHash", result, callBack);
            } else {
                console.log("error: " + error);
            }
        });
}

