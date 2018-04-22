/*
Copyright (c) 2018 ZSC Dev.
*/

pragma solidity ^0.4.18;

import "./wallet_base.sol";

contract WalletEth is WalletBase {

    // Constructor
    function WalletEth(bytes32 _name) public WalletBase(_name) {
        setNodeType("wallet-eth"); 
        setAsEthAccount();
    }

    function() public payable {        
        if (msg.value < (1 ether) / 100) {
            revert();
        } else {
            recordInput(msg.sender, address(this), msg.value, PlatString.tobytes32(msg.data));
        }
    }

    function getBlance(bool _locked) public only_delegate(1) constant returns (uint256) {
        if (_locked) { 
            return super.getBlance(true);
        } else {
            return this.balance;
        }
    }

    function executeTransaction(address _dest, uint256 _amount, bytes _data) public only_delegate(1) returns (uint) {
        require(checkBeforeSent(_dest, _amount));        

        if (_dest.call.value(_value)(_data)) {
            recordOut(address(this), _dest, _amount, PlatString.tobytes32(msg.data));
            return _amount;
        } else {
            return 0;
        }
    }
}
