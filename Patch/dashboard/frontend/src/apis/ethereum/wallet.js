'use strict';

class Wallet {
  constructor() {
    this.listener = false;
    this.account = undefined;
    this.networkId = undefined;
    // state:
    // 1. unstalled
    // 2. installed
    // 3. enabled
    this.state = 'unstalled';
  };
  async enable() {
    try {
    } catch (reason) {
    }
  };

  addListener(vm) {
    // if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    if (typeof window.ethereum !== 'undefined') {
    } else {}
  };

  info() {
    // if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    if (typeof window.ethereum !== 'undefined') {
    } else {
    }
}

export default Wallet;
