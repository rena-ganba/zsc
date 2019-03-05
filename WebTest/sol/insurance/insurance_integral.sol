/**
  Copyright (c) 2018, ZSC Dev Team
  2018-10-19: v0.00.01
 */

pragma solidity ^0.4.25;
// pragma experimental ABIEncoderV2;

import "../token/ERC20/ERC20.sol";

contract InsuranceIntegral is ERC20 {
    uint private cap_;

    constructor (uint _cap) public {
        require(cap_ > 0);
        cap_ = _cap;
    }
}
