/*
Copyright (c) 2018 ZSC Dev Team
*/

pragma solidity ^0.4.18;

import "./plat_string.sol";
import "./object.sol";
import "./control_info.sol";

contract DBFactory is Object { 
    function getBindedDB() public only_delegate constant returns (address);
    function createNode(bytes32 _node) public returns (address);
}

contract DBDatabase is Object { 
    function getNode(bytes32 _name) public only_delegate constant returns (address);
    function getNodeNameByAddress(address _adr) public only_delegate constant returns (bytes32);
    function numNodes() public only_delegate constant returns (uint);
    function getNodeNameByIndex(uint _index) public only_delegate constant returns (bytes32);
}

contract DBNode is Object {
    function getEntityType() public only_delegate constant returns (bytes32);
    function getBlance(bytes32 _name, address _adr) public only_delegate constant returns (uint256);

    function setActivated(bool _activated) only_delegate public;
    function getActivated() public only_delegate constant returns (bool);

    function addParameter(bytes32 _parameter) public only_delegate returns (bool);
    function removeParameter(bytes32 _parameter) public only_delegate returns (bool);
    function setParameter(bytes32 _parameter, string _value) public only_delegate returns (bool);
    function numParameters() public only_delegate constant returns (uint);
    function getParameterNameByIndex(uint _index) public only_delegate constant returns (bytes32);

    function executeEtherTransaction(address _dest, uint256 _value, bytes _data) public only_delegate returns (bool);
    function executeERC20Transaction(address _tokenAdr, address _dest, uint256 _value, bytes _data) public only_delegate returns (bool);

    function bindEntity(address _adr) only_delegate public;
    function numBindedEntities(bytes32 _type) public only_delegate constant returns (uint);
    function getBindedEntityNameByIndex(bytes32 _type, uint _index) public only_delegate constant returns (bytes32);
}

contract ControlBase is Object, ControlInfo {   
    mapping(uint => bytes32) private factoryTypes_;
    mapping(bytes32 => address) private factories_;
    mapping(bytes32 => address) private bindedDBs_;

    modifier factroy_exist(bytes32 _name) {require(factories_[_name] != 0); _;}
    modifier factroy_notexist(bytes32 _name) {require(factories_[_name] == 0); _;}
    modifier db_exist(bytes32 _name) {require(bindedDBs_[_name] != 0); _;}

    function ControlBase(bytes32 _name) public Object(_name) {
        factoryTypes_[1] = "provider";
        factoryTypes_[2] = "receiver";
        factoryTypes_[3] = "template";
        factoryTypes_[4] = "agreement";
    }

    function mapType(uint _type) internal constant returns (bytes32) { return factoryTypes_[_type]; }

    function addFactory(bytes32 _name, address _adr) internal factroy_notexist(_name) {
        require(_adr != 0);
        factories_[_name] = _adr;
        bindedDBs_[_name] = DBFactory(_adr).getBindedDB();

        addLog("Added factory: ", true);
        addLog(PlatString.bytes32ToString(_name), false);
    }

    function getDBFactory(bytes32 _name) internal factroy_exist(_name) constant returns (DBFactory) {
        return DBFactory(factories_[_name]);
    }

    function getDBDatabase(bytes32 _name) internal db_exist(_name) constant returns (DBDatabase) { 
        return DBDatabase(bindedDBs_[_name]);
    }

    function getDBNodeAddress(bytes32 _db, bytes32 _node) internal constant returns (address) {
        return getDBDatabase(_db).getNode(_node);
    }

    function getDBNodeName(bytes32 _db, address _adr) internal constant returns (bytes32) {
        return getDBDatabase(_db).getNodeNameByAddress(_adr);
    }

    function getDBNode(bytes32 _db, bytes32 _node) internal constant returns (DBNode) {
        address nd = getDBNodeAddress(_db, _node);
        require (nd != 0);        
        return DBNode(nd);
    }

    function createFactoryNode(bytes32 _factory, bytes32 _user, bytes32 _node, bytes32 extra, address _sender) internal returns (address) {
        address adr;
        if (_factory == "provider" || _factory == "receiver") {
            adr = getDBFactory(_factory).createNode(_node);
            registerEntityRecorder(_user, adr, _sender);
        } else if (_factory == "template" || _factory == "agreement" ) {
            adr = getDBFactory(_factory).createNode(_node);
            registerEntityRecorder(_node, adr, _sender);
        }
        
        if (_factory == "template") {
            registerHolder(_node, _sender);
        } else if (_factory == "agreement") {
            registerHolder(_node, _sender);
            duplicateNode("template", extra, "agreement", _node);
        }
        return adr;
    }

    function operateNodeParameter(bytes32 _db, bytes32 _operation, bytes32 _node, bytes32 _parameter, string _value) internal returns (bool) {
        bool ret;
        string memory str = ""; 
        str = PlatString.append(str, PlatString.bytes32ToString(_node), " : " );
        str = PlatString.append(str, PlatString.bytes32ToString(_parameter), " : " , _value);
        if (_operation == "add") {
            str = PlatString.append("addNodeParameter - ", str);
            ret = getDBNode(_db, _node).addParameter(_parameter);
        } else if (_operation == "set") {
            str = PlatString.append("setNodeParameter - ", str);
            ret = getDBNode(_db, _node).setParameter(_parameter, _value);
        }        
        addLog(str, true);
        return ret;
    }

    function duplicateNode(bytes32 _factorySrc, bytes32 _nodeSrc, bytes32 _factoryDst, bytes32 _nodeDst) internal factroy_exist(_factorySrc) factroy_exist(_factoryDst) returns (bool) {
        address nodeSrc = address(getDBNode(_factorySrc, _nodeSrc));
        address nodeDst = address(getDBNode(_factoryDst, _nodeDst));

        if (nodeSrc == address(0)) return false;
        if (nodeDst == address(0)) return false;
        
        bytes32 tempPara;
        string memory tempValue; 

        uint paraNos = DBNode(nodeSrc).numParameters();
        for (uint i = 0; i < paraNos; ++i) {
            tempPara = DBNode(nodeSrc).getParameterNameByIndex(i);
            tempValue = getControlInfoParameterValue(_nodeSrc, tempPara);

            DBNode(nodeDst).addParameter(tempPara);
            DBNode(nodeDst).setParameter(tempPara, tempValue);
        }
        return true;
    }

}
