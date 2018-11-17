/*
Copyright (c) 2018 ZSC Dev Team
*/

var g_controlApisFullAbi = '[{"constant":true,"inputs":[{"name":"_type","type":"bytes32"},{"name":"_adr","type":"address"}],"name":"numUnits","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_robotId","type":"uint256"}],"name":"cancelSell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitMineEnd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_isRandom","type":"bool"},{"name":"_ctgName","type":"bytes32"},{"name":"_user","type":"address"}],"name":"createUnit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPosRatio","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenSymbol","type":"bytes32"},{"name":"_dest","type":"address"},{"name":"_amount","type":"uint256"}],"name":"submitTransfer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_robotId","type":"uint256"},{"name":"_price","type":"uint256"}],"name":"publishUnit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getTokenBalanceInfoByIndex","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitUPBase","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitSeller","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitStatus","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPublicTradeableTag","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPoSModuleAddresses","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getPosRewardSP","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_robotId","type":"uint256"},{"name":"_paras","type":"bytes32[]"}],"name":"getUnitInfoById","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getUserTransactionByIndex","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitRREft","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getPosMinedSP","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitRare","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitSPMax","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitRRType","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitSellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitUPEft","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitSPCur","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitRRLevEft","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"},{"name":"_para","type":"bytes32"}],"name":"getUnitParaExtra","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_robotId","type":"uint256"}],"name":"purchaseUnit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_robotId","type":"uint256"}],"name":"claimReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_robotId","type":"uint256"},{"name":"_tokenType","type":"bytes32"},{"name":"_durationInDays","type":"uint256"}],"name":"activeUnit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitSPLev","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_symbol","type":"bytes32"}],"name":"getTokenBalanceInfoBySymbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitMineStart","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numOfTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getCategoryName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitSpec","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_type","type":"bytes32"},{"name":"_adr","type":"address"},{"name":"_index","type":"uint256"}],"name":"getUnitIdByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_robotId","type":"uint256"}],"name":"upgradeUnitSpLev","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitSPBase","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_type","type":"bytes32"},{"name":"_adr","type":"address"},{"name":"_index","type":"uint256"},{"name":"_paras","type":"bytes32[]"}],"name":"getUnitInfoByIndex","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getPosLastSP","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUserWalletAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_unitId","type":"uint256"}],"name":"getUnitSPEft","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]';

function ZSCLogin(userAccount) {
    this.admAdr = "0x7d9a51cdb9753e2101a577cd93a1c74981afa08a";
    //this.controlApisAdr;
    //this.erc721Adr;
    this.controlApisAdr = "0x7fe23fc32f206808beb5c9813995a2051be27ca2";
    this.erc721Adr = "0x8d36fcaf66503ea961742e5ddb9eb553059e26e9";
    this.userStatus;
    this.userType;
    this.controlApisFullAbi = g_controlApisFullAbi;
    this.account = userAccount;
    this.myAdmAdv = web3.eth.contract(this.getLoginAbi()).at(this.admAdr);
    this.gasPrice = bF_getGasPrice();
    this.gasLimit = bF_getGasLimit();
}

ZSCLogin.prototype.getUserName = function() { return this.userName; }
ZSCLogin.prototype.getUserNameHr = function() { return this.userNameHr; }
ZSCLogin.prototype.getUserStatus = function() { return this.userStatus; }
ZSCLogin.prototype.getUserType = function() { return this.userType; }
ZSCLogin.prototype.getErc721Adr = function() { return this.erc721Adr; }
ZSCLogin.prototype.getControlApisAdr = function() { return this.controlApisAdr; }
ZSCLogin.prototype.getControlApisFullAbi = function() { return this.controlApisFullAbi; }
ZSCLogin.prototype.getLoginAbi = function() { 
    return [{"constant":true,"inputs":[],"name":"getControlApisAdrs","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUserType","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getControlApisFullAbi","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_type","type":"bytes32"}],"name":"tryLogin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getControlApisInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_type","type":"string"}],"name":"activeByUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getUserStatus","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}];
}

ZSCLogin.prototype.tryLogin = function(userType, func){
    var gm = this;
    var callBack = func;
    var myAdmAdv = web3.eth.contract(gm.getLoginAbi()).at(gm.admAdr);
    console.log(gm.account);

    myAdmAdv.tryLogin(userType, {from: gm.account},
        function(error, result) {
        if(!error) {
            callBack(result);
            /*
            if (result == false) {
                callBack(false);
            } else {
                gm.getControlApisInfo(gm, callBack);
            }*/
        } else { 
            callBack(false);
            console.log("error: " + error);
        }
    });
}

ZSCLogin.prototype.getControlApisInfo = function(gm, func) {
    var callBack = func;
    var myAdmAdv = web3.eth.contract(gm.getLoginAbi()).at(gm.admAdr);

    myAdmAdv.getControlApisInfo({from: gm.account},
        function(error, info) {
        if(!error) { 
            gm.parserControlApisInfo(gm, info);
            callBack(true);
        } else {
            console.log("error: " + error);
        }
    } );
}

ZSCLogin.prototype.parserControlApisInfo = function(gm, urlinfo) {
    var found1 = urlinfo.indexOf("?");
    var found2 = urlinfo.indexOf("=");

    if (found1 == -1 || found2 == -1) return false;

    var len = urlinfo.length;
    var offset = urlinfo.indexOf("?");
    var newsidinfo = urlinfo.substr(offset,len)
    var newsids = newsidinfo.split("&");

    var sysAdr    = newsids[0];
    var erc721Adr = newsids[1];
    var abi       = newsids[2];

    gm.controlApisAdr     = "0x" + sysAdr.split("=")[1];
    gm.erc721Adr          = "0x" + erc721Adr.split("=")[1];
    gm.controlApisFullAbi = abi.split("=")[1];
}

ZSCLogin.prototype.activeByUser = function(type, hashLogId){
    var gm = this;
    var myAdmAdv = web3.eth.contract(gm.getLoginAbi()).at(gm.admAdr);

    myAdmAdv.activeByUser(type, 
        {from: gm.account, gasPrice: gm.gasPrice, gas: gm.gasLimit},
        function(error, ret) {
            if(!error) { 
                gm.userType = type;
                bF_showHashResult(hashLogId, ret, function(){window.location.reload(true);});
            } else { 
                console.log("error: " + error);
            }
    } );
}

ZSCLogin.prototype.getUserStatusFromAdm = function(func) {
    var gm = this;
    var callBack = func;
    var myAdmAdv = web3.eth.contract(gm.getLoginAbi()).at(gm.admAdr);

    myAdmAdv.getUserStatus(
        function(error, ret) {
            if(!error) { 
                gm.userStatus = web3.toUtf8(ret);
                callBack(gm.userStatus);
            } else { 
                console.log("error: " + error);
             }
        } );
}

ZSCLogin.prototype.getUserTypeFromAdm = function(func){
    var gm = this;
    var callBack = func;
    var myAdmAdv = web3.eth.contract(gm.getLoginAbi()).at(gm.admAdr);

    myAdmAdv.getUserType(
        function(error, ret) {
            if(!error) { 
                gm.userType = web3.toUtf8(ret);
                callBack(gm.userType);
            } else { 
                console.log("error: " + error);
             }
        } );
}



