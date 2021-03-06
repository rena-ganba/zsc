/*
Copyright (c) 2018 ZSC Dev Team
*/

function sF_showHashResult(elementID, hash) {
    web3.eth.getTransactionReceipt(hash, 
    function(error, result){ 
        if(!error) {
            var show;
            if (result == null) {
                show =  "(pending)" + hash ;
                sF_showHashResult(elementID, hash);
            } else {
                if (result.status == 0) {
                    show = "(failure)" + hash;
                } else {
                    show = "(succeeded)" + hash ;
                }
            }
            document.getElementById(elementID).innerText = show;
        } else {
            console.log("error: " + error);
        }
    });
}

function sF_registerListenerToLogRecorder(logRecorderAdr, listener, listenerName, hashID) {
    var myContract = web3.eth.contract(cC_getContractAbi("LogRecorder"));
    var myLogRecorder = myContract.at(logRecorderAdr);
    var account = web3.eth.accounts[0];

    myLogRecorder.registerListener(listener, listenerName, 
        {from: account, gas: cC_getGasLimit(743), gasPrice: cC_getGasPrice(30)},
        function(error, result){ 
            if(!error) sF_showHashResult(hashID, result);
            else console.log("error: " + error);
        });
}  

function sF_setLogRecorderToListener(logRecorderAdr, listener,listenerName, hashID) {
    var myContract = web3.eth.contract(cC_getContractAbi(listenerName));
    var myListener = myContract.at(listener);
    var account = web3.eth.accounts[0];

    myListener.setLogRecorder(logRecorderAdr, 
        {from: account, gas: cC_getGasLimit(743), gasPrice: cC_getGasPrice(30)},
        function(error, result){ 
            if(!error) sF_showHashResult(hashID, result);
            else console.log("error: " + error);
        });
}  

function sF_initSystemModule(module, extra, adrs, zscTokenAdr, hashID) {
    var AdmAdvAdr = adrs[0];
    var PosAdvAdr = adrs[1];
    var WalletManagerAdr = adrs[2];
    var DBDatabaseAdr = adrs[3];
    var FactoryProAdr = adrs[4];
    var FactoryRecAdr = adrs[5];
    var FactoryTmpAdr = adrs[6];
    var FactoryAgrAdr = adrs[7];
    var ControlApisAdr = adrs[8];

    if (module == "AdmAdv") {

    } else if (module == "PosAdv") {
        sF_initPosAdv(PosAdvAdr, ControlApisAdr, hashID);
    } else if (module == "DBDatabase") {
        sF_initWalletManager(DBDatabaseAdr, ControlApisAdr, WalletManagerAdr, hashID);
    } else if (module == "DBDatabase") {
        sF_initDatabase(DBDatabaseAdr, [FactoryProAdr, FactoryRecAdr, FactoryTmpAdr, FactoryAgrAdr], ControlApisAdr, hashID);
    } else if (module == "ControlApisAdv") {
        if (extra == "DBDatabase") {
            sF_setDatabaseAdr(DBDatabaseAdr, ControlApisAdr, hashID);
        } else if (extra == "WalletManager") {
            sF_setWalletManager(WalletManagerAdr, ControlApisAdr, hashID);
        } else if (extra == "AdmAdv") {
            sF_setAdm(AdmAdvAdr, ControlApisAdr, hashID);
        } else if (extra == "PosAdv") {
            sF_setPos(PosAdvAdr, zscTokenAdr, ControlApisAdr, hashID);
        } else {
            var factoryAdr;
            if (extra == "FactoryPro") factoryAdr = FactoryProAdr;
            else if (extra == "FactoryRec") factoryAdr = FactoryRecAdr;
            else if (extra == "FactoryTmp") factoryAdr = FactoryTmpAdr;
            else if (extra == "FactoryAgr") factoryAdr = FactoryAgrAdr;
            sF_addFactory(extra, factoryAdr, ControlApisAdr, hashID + extra);
        }
    } else {
        var factoryAdr;
        if (module == "FactoryPro") factoryAdr = FactoryProAdr;
        else if (module == "FactoryRec") factoryAdr = FactoryRecAdr;
        else if (module == "FactoryTmp") factoryAdr = FactoryTmpAdr;
        else if (module == "FactoryAgr") factoryAdr = FactoryAgrAdr;

        sF_initFactory(module, factoryAdr, DBDatabaseAdr, ControlApisAdr, hashID + module);
    }
}

function sF_initPosAdv(PosAdvAdr, ControlApisAdr, hashID) {
    var myContract = web3.eth.contract(cC_getContractAbi("PosAdv"));
    var myPosAdv = myContract.at(PosAdvAdr);
    myPosAdv.initPos(ControlApisAdr, 
        {from: account, gas: cC_getGasLimit(743), gasPrice: cC_getGasPrice(30)},
        function(error, result){ 
            if(!error) sF_showHashResult(hashID, result);
            else console.log("error: " + error);
        });
}

function sF_initWalletManager(DBDatabaseAdr, ControlApisAdr, WalletManagerAdr, hashID) {
    var myContract = web3.eth.contract(cC_getContractAbi("WalletManager"));
    var myPosAdv = myContract.at(WalletManagerAdr);
    myPosAdv.initPos(ControlApisAdr, DBDatabaseAdr, 
        {from: account, gas: cC_getGasLimit(743), gasPrice: cC_getGasPrice(30)},
        function(error, result){ 
            if(!error) sF_showHashResult(hashID, result);
            else console.log("error: " + error);
        });
}


function sF_initDatabase(DBDatabaseAdr, Factoroies, ControlApisAdr, hashID) {
    var myContract = web3.eth.contract(cC_getContractAbi("DBDatabase"));
    var myDatabase = myContract.at(DBDatabaseAdr);
    myDatabase.initDatabase(Factoroies, ControlApisAdr, 
        {from: account, gas: cC_getGasLimit(743), gasPrice: cC_getGasPrice(30)},
        function(error, result){ 
            if(!error) sF_showHashResult(hashID, result);
            else console.log("error: " + error);
        });
}  


function sF_initFactory(FactoryModule, FactoryAdr, DBDatabaseAdr, ControlApisAdr, hashID) {
    var myContract = web3.eth.contract(cC_getContractAbi(FactoryModule));
    var myFactory= myContract.at(FactoryAdr);
    myFactory.initFactory(ControlApisAdr, DBDatabaseAdr, 
        {from: account, gas: cC_getGasLimit(743), gasPrice: cC_getGasPrice(30)},
        function(error, result){ 
            if(!error) sF_showHashResult(hashID, result);
            else console.log("error: " + error);
        });
}  

function sF_setAdm(AdmAdvAdr, ControlApisAdr, hashID) {
    var myContract = web3.eth.contract(cC_getContractAbi("ControlApisAdv"));
    var myControlApi= myContract.at(ControlApisAdr);
    myControlApi.setAdm(AdmAdvAdr, 
        {from: account, gas: cC_getGasLimit(743), gasPrice: cC_getGasPrice(30)},
        function(error, result){ 
            if(!error) sF_showHashResult(hashID, result);
            else console.log("error: " + error);
        });
} 

function sF_setWalletManager(WalletManagerAdr, ControlApisAdr, hashID) {
    var myContract = web3.eth.contract(cC_getContractAbi("ControlApisAdv"));
    var myControlApi= myContract.at(ControlApisAdr);
    myControlApi.setWalletManger(WalletManagerAdr, 
        {from: account, gas: cC_getGasLimit(743), gasPrice: cC_getGasPrice(30)},
        function(error, result){ 
            if(!error) sF_showHashResult(hashID, result);
            else console.log("error: " + error);
        });
} 

function sF_setPos(PosAdvAdr, zscTokenAddress,  ControlApisAdr, hashID) {
    var myContract = web3.eth.contract(cC_getContractAbi("ControlApisAdv"));
    var myControlApi= myContract.at(ControlApisAdr);
    myControlApi.setAdm(PosAdvAdr, zscTokenAddress, 
        {from: account, gas: cC_getGasLimit(743), gasPrice: cC_getGasPrice(30)},
        function(error, result){ 
            if(!error) sF_showHashResult(hashID, result);
            else console.log("error: " + error);
        });
} 

function sF_setDatabaseAdr(DBDatabaseAdr, ControlApisAdr, hashID) {
    var myContract = web3.eth.contract(cC_getContractAbi("ControlApisAdv"));
    var myControlApi= myContract.at(ControlApisAdr);
    myControlApi.setDatabaseAdr(DBDatabaseAdr, 
        {from: account, gas: cC_getGasLimit(743), gasPrice: cC_getGasPrice(30)},
        function(error, result){ 
            if(!error) sF_showHashResult(hashID, result);
            else console.log("error: " + error);
        });
}  

function sF_addFactory(factoryType, FactoryAdr, ControlApisAdr, hashID) {
    var myContract = web3.eth.contract(cC_getContractAbi("ControlApisAdv"));
    var myControlApi= myContract.at(ControlApisAdr);
    myControlApi.addFactory(factoryType, FactoryAdr, 
        {from: account, gas: cC_getGasLimit(743), gasPrice: cC_getGasPrice(30)},
        function(error, result){ 
            if(!error) sF_showHashResult(hashID, result);
            else console.log("error: " + error);
        });
}  

////////////////
var sF_logerModuleAdr;
var sF_logMap = new Map();
var sF_logIndexMap = new Map();

function sF_changeLogerModule(adr) {
    sF_logerModuleAdr = adr;
}

function sF_refreshGetLog(logRecorderAdr, adr, elementID) {
    var myContract = web3.eth.contract(cC_getContractAbi("LogRecorder"));
    var myLogRecorder = myContract.at(logRecorderAdr);
    var account = web3.eth.accounts[0];

    var text = sF_logMap.get(adr);
    var index = sF_logIndexMap.get(adr);

    myLogRecorder.printLog(adr, index,
    function(error, result){ 
        if(!error) {
            if (result != "null") {
                //console.log(result);
                sF_logMap.set(adr, text + result + "\n");
                index++;
                sF_logIndexMap.set(adr, index);
            }
            if (adr != sF_logerModuleAdr) {
                document.getElementById(elementID).innerText = "";
            } else {
                document.getElementById(elementID).innerText = sF_logMap.get(adr);
            }
        }
        else console.log("error: " + error);
    });
}

function sF_initSystemLog(logRecorderAdr, adrs, elementID, initialModuleIndex) {
    sc_logerModuleAdr = adrs[initialModuleIndex];
    for (var i = 0; i < adrs.length; ++i) {
        sF_logMap.set(adrs[i], "");
        sF_logIndexMap.set(adrs[i], 0);
        window.setInterval("sF_refreshGetLog('" + logRecorderAdr + "', '" + adrs[i] + "', '" + elementID + i + "')", 1000);
    }
}

////////////////////////////////////////////
function sF_setControlAbisAdvAbi(ControlApisAdr,  hashID) {
    var myContract = web3.eth.contract(cC_getContractAbi("ControlApisAdv"));
    var myControlApi= myContract.at(ControlApisAdr);
    var account = web3.eth.accounts[0];
    var data = cC_getContractAbiString('ControlApisAdv');

    myControlApi.setFullAbi(data, 
        {from: account, gas: cC_getGasLimit(743), gasPrice: cC_getGasPrice(30)},
        function(error, result){ 
            if(!error) sF_showHashResult(hashID, result);
            else console.log("error: " + error);
        });
}  


