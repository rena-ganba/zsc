/**
  Copyright (c) 2018, ZSC Dev Team
  2018-10-19: v0.00.01
 */

import Receipt from '../common/receipt.js';
import Transaction from '../common/transaction_raw.js';

// private member
const account = Symbol('account');
const contractAbi = Symbol('contractAbi');
const contractAddress = Symbol('contractAddress');

//private function
const transactionProc = Symbol('transactionProc');
const notifyError = Symbol('notifyError');

export default class InsuranceIntegral {
    constructor(abi, contractAddr) {
        this[account] = web3.eth.coinbase;
        this[contractAbi] = abi;
        this[contractAddress] = contractAddr;
    }

    [notifyError](error, func) {
        console.log(error);
        if (null != func) {
            func(error);
        }
    }

    [transactionProc](handler, account, privateKey, data, error, gasRequired, func) {
        if (!error) {
            let transaction = new Transaction(account, privateKey);
            if('undefined' != typeof transaction) {
                transaction.do("transaction", data, gasRequired, handler[contractAddress], func);
            }
        } else {
            handler[notifyError](error, func);
        }
    }

    watchTransfer(func) {
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);
        let event = contractInstance.Transfer(function(error, result) {
            if (null === error) {
                for(let key in result["args"]) {
                    console.log(key + " : " + result["args"][key]);
                }

                let from = result["args"]["from"];
                let to = result["args"]["to"];
                let value = result["args"]["value"].toString(10);

                console.log("[Event]: Transfer(%s, %s, %s)", from, to, value);
                func(error, from, to, value);
            } else {
                func(error, 0, 0, 0);
            }
        });

        return event;
    }

    stopWatch(event) {
        event.stopWatching();
    }

    updateThreshold(account, privateKey, type, threshold, func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);

        contractInstance.updateThreshold.estimateGas(type, threshold, {from: account}, function(error, gasRequired) {
            handler[transactionProc](handler, account, privateKey, contractInstance.updateThreshold.getData(type, threshold), error, gasRequired, func);
        });
    }

    updateCap(account, privateKey, newCap, func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);

        contractInstance.updateCap.estimateGas(newCap, {from: account}, function(error, gasRequired) {
            handler[transactionProc](handler, account, privateKey, contractInstance.updateCap.getData(newCap), error, gasRequired, func);
        });
    }

    pause(account, privateKey, func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);

        contractInstance.pause.estimateGas({from: account}, function(error, gasRequired) {
            handler[transactionProc](handler, account, privateKey, contractInstance.pause.getData(), error, gasRequired, func);
        });
    }

    unpause(account, privateKey, func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);

        contractInstance.unpause.estimateGas({from: account}, function(error, gasRequired) {
            handler[transactionProc](handler, account, privateKey, contractInstance.unpause.getData(), error, gasRequired, func);
        });
    }

    threshold(type, func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);

        // estimate gas
        // The MetaMask Web3 object does not support synchronous methods without a callback parameter
        contractInstance.threshold.estimateGas(type, {from: this[account]}, function(error, result) {
            if(!error) {
                let gasRequired = result;
                // get gas price
                // MetaMask Web3 object does not support synchronous methods without a callback parameter
                web3.eth.getGasPrice(function(error, result) {
                    if(!error) {
                        console.log("=============== InsuranceIntegral.threshold(uint8) ===============");
                        console.log("from:    ", handler[account]);
                        console.log("gas:     ", gasRequired);
                        console.log("gasPrice:", result.toString(10));
                        console.log("==================================================================");
                        // call 'InsuranceIntegral.threshold(uint8)'
                        contractInstance.threshold.call(type, {from: handler[account], gas: gasRequired, gasPrice: result}, function(error, result) { 
                            if(!error) {
                                console.log("[Threshold]: %s", result.toString(10));
                                if (null != func) {
                                    func(null, result);
                                }
                            } else {
                                handler[notifyError](error, func);
                            }
                        });
                    } else {
                        handler[notifyError](error, func);
                    }
                });
            } else {
                handler[notifyError](error, func);
            }
        });
    }

    cap(func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);

        // estimate gas
        // The MetaMask Web3 object does not support synchronous methods without a callback parameter
        contractInstance.cap.estimateGas({from: this[account]}, function(error, result) {
            if(!error) {
                let gasRequired = result;
                // get gas price
                // MetaMask Web3 object does not support synchronous methods without a callback parameter
                web3.eth.getGasPrice(function(error, result) {
                    if(!error) {
                        console.log("=============== InsuranceIntegral.cap() ===============");
                        console.log("from:    ", handler[account]);
                        console.log("gas:     ", gasRequired);
                        console.log("gasPrice:", result.toString(10));
                        console.log("=======================================================");
                        // call 'InsuranceIntegral.cap()'
                        contractInstance.cap.call({from: handler[account], gas: gasRequired, gasPrice: result}, function(error, result) { 
                            if(!error) {
                                console.log("[Cap]: %s", result.toString(10));
                                if (null != func) {
                                    func(null, result);
                                }
                            } else {
                                handler[notifyError](error, func);
                            }
                        });
                    } else {
                        handler[notifyError](error, func);
                    }
                });
            } else {
                handler[notifyError](error, func);
            }
        });
    }

    totalSupply(func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);

        // estimate gas
        // The MetaMask Web3 object does not support synchronous methods without a callback parameter
        contractInstance.totalSupply.estimateGas({from: this[account]}, function(error, result) {
            if(!error) {
                let gasRequired = result;
                // get gas price
                // MetaMask Web3 object does not support synchronous methods without a callback parameter
                web3.eth.getGasPrice(function(error, result) {
                    if(!error) {
                        console.log("=============== InsuranceIntegral.totalSupply() ===============");
                        console.log("from:    ", handler[account]);
                        console.log("gas:     ", gasRequired);
                        console.log("gasPrice:", result.toString(10));
                        console.log("===============================================================");
                        // call 'InsuranceIntegral.totalSupply()'
                        contractInstance.totalSupply.call({from: handler[account], gas: gasRequired, gasPrice: result}, function(error, result) { 
                            if(!error) {
                                console.log("[Total]: %s", result.toString(10));
                                if (null != func) {
                                    func(null, result);
                                }
                            } else {
                                handler[notifyError](error, func);
                            }
                        });
                    } else {
                        handler[notifyError](error, func);
                    }
                });
            } else {
                handler[notifyError](error, func);
            }
        });
    }

    paused(func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);

        // estimate gas
        // The MetaMask Web3 object does not support synchronous methods without a callback parameter
        contractInstance.paused.estimateGas({from: this[account]}, function(error, result) {
            if(!error) {
                let gasRequired = result;
                // get gas price
                // MetaMask Web3 object does not support synchronous methods without a callback parameter
                web3.eth.getGasPrice(function(error, result) {
                    if(!error) {
                        console.log("=============== InsuranceIntegral.paused() ===============");
                        console.log("from:    ", handler[account]);
                        console.log("gas:     ", gasRequired);
                        console.log("gasPrice:", result.toString(10));
                        console.log("==========================================================");
                        // call 'InsuranceIntegral.paused()'
                        contractInstance.paused.call({from: handler[account], gas: gasRequired, gasPrice: result}, function(error, result) { 
                            if(!error) {
                                console.log("[Paused]: %s", result.toString(10));
                                if (null != func) {
                                    func(null, result);
                                }
                            } else {
                                handler[notifyError](error, func);
                            }
                        });
                    } else {
                        handler[notifyError](error, func);
                    }
                });
            } else {
                handler[notifyError](error, func);
            }
        });
    }
}