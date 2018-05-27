/*
Copyright (c) 2018, ZSC Dev Team
2017-12-18: v0.01
*/

pragma solidity ^0.4.21;

import "./delegate.sol";

// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
contract ERC20Interface {
    function transfer(address to, uint tokens) public returns (bool success);
    function balanceOf(address _owner) public constant returns (uint256 balance);
}

contract Recorder {
    function addLog(string _log, bool _newLine) public;
}

contract Object is Delegated {
    using SafeMath for uint;

    bytes32 private name_ = "null";
    address public logRecorder_ = 0;
    string public log_;

    // Constructor
    constructor(bytes32 _name) public { 
        name_ = _name;
        log_ = " ";
    }

    // This unnamed function is called whenever someone tries to send ether to it
    function() public payable { revert(); }

    function name() public constant returns (bytes32) { 
        checkDelegate(msg.sender, 1);
        return name_;
    }

    function setLogRecorder(address _adr) public {
        checkDelegate(msg.sender, 1);
        logRecorder_ = _adr;
    }

    function addLog(string _log, bool _newLine) public {
        checkDelegate(msg.sender, 1);
        if (logRecorder_ != 0) {
            Recorder(logRecorder_).addLog(_log, _newLine);
        }

        //for alpha test; 2018-05-26
        if (_newLine) {
            log_ = PlatString.append(log_, "\n", _log);
        } else {
            log_ = PlatString.append(log_, _log);
        } 
    }

    // ------------------------------------------------------------------------
    // Owner can transfer out any accidentally sent ERC20 tokens
    // ------------------------------------------------------------------------
    function transferAnyERC20Token(address tokenAddress, uint tokens) public returns (bool success) {
        checkOwner(msg.sender);
        return ERC20Interface(tokenAddress).transfer(msg.sender, tokens);
    }    
}
