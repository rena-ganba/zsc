/*
 Copyright (c) 2018 ZSC Dev Team
*/

import Receipt from './receipt.js';
import Transaction from './transaction_raw.js';

// private member
const account = Symbol('account');

const contractAbi = Symbol('contractAbi');
const contractAddress = Symbol('contractAddress');

export default class LogisticsCore {
    constructor(_abi, _contractAddr) {
        this[account] = web3.eth.coinbase;
        this[contractAbi] = _abi;
        this[contractAddress] = _contractAddr; 
    }

    setup(_account, _key, _coreAddr, _analyticsAddr, _func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);
        let data = contractInstance.setup.getData(_coreAddr, _analyticsAddr);

        contractInstance.setup.estimateGas(_coreAddr, _analyticsAddr, {from: _account}, function(error, result) {
            if (!error) {
                let transaction = new Transaction(_account, _key);
                if('undefined' != typeof transaction) {
                    transaction.do("transaction", data, result, handler[contractAddress], _func);
                }
            } else {
                console.log(error);
                if (null != _func) {
                    _func(error);
                }
            }
        });
    }

    getLogisticsInfo(_num, _func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);

        // estimate gas
        // The MetaMask Web3 object does not support synchronous methods without a callback parameter
        contractInstance.getLogisticsInfo.estimateGas(_num, {from: this[account]}, function(error, result) {
            if(!error) {
                let gasRequired = result;
                // get gas price
                // MetaMask Web3 object does not support synchronous methods without a callback parameter
                web3.eth.getGasPrice(function(error, result) {
                    if(!error) {
                        console.log("============= Logistics.getLogisticsInfo(string) ==============");
                        console.log("from:    ", handler[account]);
                        console.log("gas:     ", gasRequired);
                        console.log("gasPrice:", result.toString(10));
                        console.log("===============================================================");
                        // call 'Logistics.getLogisticsInfo(string)'
                        contractInstance.getLogisticsInfo.call(_num, {from: handler[account], gas: gasRequired, gasPrice: result}, function(error, result) { 
                            if(!error) {
                                console.log("[Parcel]:", result);
                                if (null != _func) {
                                    _func(null, result);
                                }
                            } else {
                                console.log(error);
                                if (null != _func) {
                                    _func(error);
                                }
                            }
                        });
                    } else {
                        console.log(error);
                        if (null != _func) {
                            _func(error);
                        }
                    }
                });
            } else {
                console.log(error);
                if (null != _func) {
                    _func(error);
                }
            }
        });
    }

    number(_direction, _srcCountry, _destCountry, _startTime, _endTime, _func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);

        // estimate gas
        // The MetaMask Web3 object does not support synchronous methods without a callback parameter
        contractInstance.number.estimateGas(_direction, _srcCountry, _destCountry, _startTime, _endTime, {from: this[account]}, function(error, result) {
            if(!error) {
                let gasRequired = result;
                // get gas price
                // MetaMask Web3 object does not support synchronous methods without a callback parameter
                web3.eth.getGasPrice(function(error, result) {
                    if(!error) {
                        console.log("===== Logistics.number(uint8, uint16, uint16, uint64, uint64) =====");
                        console.log("from:    ", handler[account]);
                        console.log("gas:     ", gasRequired);
                        console.log("gasPrice:", result.toString(10));
                        console.log("===================================================================");
                        // call 'Logistics.number(uint8, uint16, uint16, uint64, uint64)'
                        contractInstance.number.call(_direction, _srcCountry, _destCountry, _startTime, _endTime, {from: handler[account], gas: gasRequired, gasPrice: result}, function(error, result) { 
                            if(!error) {
                                console.log("[Number]:", result);
                                if (null != _func) {
                                    _func(null, result);
                                }
                            } else {
                                console.log(error);
                                if (null != _func) {
                                    _func(error);
                                }
                            }
                        });
                    } else {
                        console.log(error);
                        if (null != _func) {
                            _func(error);
                        }
                    }
                });
            } else {
                console.log(error);
                if (null != _func) {
                    _func(error);
                }
            }
        });
    }

    numbers(_direction, _mulMatch, _condition, _func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[contractAbi]).at(this[contractAddress]);

        // estimate gas
        // The MetaMask Web3 object does not support synchronous methods without a callback parameter
        contractInstance.numbers.estimateGas(_direction, _mulMatch, _condition, {from: this[account]}, function(error, result) {
            if(!error) {
                let gasRequired = result;
                // get gas price
                // MetaMask Web3 object does not support synchronous methods without a callback parameter
                web3.eth.getGasPrice(function(error, result) {
                    if(!error) {
                        console.log("========== Logistics.numbers(uint8, bool, bytes32[]) ==========");
                        console.log("from:    ", handler[account]);
                        console.log("gas:     ", gasRequired);
                        console.log("gasPrice:", result.toString(10));
                        console.log("===============================================================");
                        // call 'Logistics.numbers(uint8, bool, bytes32[])'
                        contractInstance.numbers.call(_direction, _mulMatch, _condition, {from: handler[account], gas: gasRequired, gasPrice: result}, function(error, result) { 
                            if(!error) {
                                console.log("[Numbers]:", result);
                                if (null != _func) {
                                    _func(null, result);
                                }
                            } else {
                                console.log(error);
                                if (null != _func) {
                                    _func(error);
                                }
                            }
                        });
                    } else {
                        console.log(error);
                        if (null != _func) {
                            _func(error);
                        }
                    }
                });
            } else {
                console.log(error);
                if (null != _func) {
                    _func(error);
                }
            }
        });
    }
}