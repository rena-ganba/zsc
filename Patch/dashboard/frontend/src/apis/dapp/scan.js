'use strict';

import createError from 'http-errors';

import ECore from '../core/ecore';

class Scan {

  constructor() {
  };

  addToken(eip, token) {
    if (eip === 'erc20') {
      this.erc20Tokens.push(token);
    } else if (eip === 'erc721') {
      this.erc721Tokens.push(token);
    } else {}
  };

  async balance(eip, network, account) {
    try {
      let balance = 0;
      if (eip === 'erc20') {
        const setting = {
          network: network,
          param: 'default'
        };
      } else if (eip === 'erc721') {} else {}
      return balance;
    } catch (error) {
      throw error;
    }
  };

  async token(eip, network, tokenAddr, account) {
    try {
    } catch (error) {
      throw error;
    }
  };
}

export default Scan;
