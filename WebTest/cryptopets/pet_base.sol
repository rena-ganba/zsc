/*
 Copyright (c) 2018, ZSC Dev Team
*/

import "./pet_control.sol";

pragma solidity ^0.4.21;

contract PetBase is PetControl {

    struct PetInfo {
        uint256 genes_;
        uint64 birthTime_;
        uint64 cooldownEndBlock_;
        uint32 matronId_;
        uint32 sireId_;
        uint32 siringWithId_;
        uint16 cooldownIndex_;
        uint16 generation_;
    }

    PetInfo[] pets_;

    function PetBase() public PetControl() {}
}