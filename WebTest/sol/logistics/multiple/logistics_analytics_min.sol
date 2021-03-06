/**
  Copyright (c) 2018, ZSC Dev Team
  2018-10-19: v0.00.01
 */

pragma solidity ^0.4.25;
// pragma experimental ABIEncoderV2;

import "../../common/delegate.sol";

contract LogisticsAnalyticsMin is Delegate {

    /** @desc total count */
    uint private sum_;

    /** @desc uint(index) => string(num name) */
    mapping(uint => string) private nums_;

    /** @desc string(num name) => uint(index) */
    mapping(string => uint) private ids_;

    /** @desc string(num name) => bool(exist flag) */
    mapping(string => bool) private exists_;

    /** @desc string(num name) => bytes32(parcels)
      *       srcCountry(uint16) + destCountry(uint16) + startTime(uint64) + endTime(uint64)
      * @eg   srcCountry(Russia: 0x0283) +
      *       destCountry(China: 0x009c) +
      *       startTime(2018-12-31 23:59:59: 0x000000005c015e80) +
      *       endTime(2018-12-01 00:00:00: 0x000000005c2a3cff)
      *       0x0283009c000000005c015e80000000005c2a3cff
      */
    mapping(string => bytes32) private parcels_;

    /**************************************************************************************/

    /** @desc uint(time id: month/day) => (bytes32(city) => uint(amounts)) */
    mapping(uint => mapping(bytes32 => uint)) private cityTimeParcelAmounts_;

    /** @desc bytes32(city) => uint(amounts) */
    mapping(bytes32 => uint) private citySumParcelAmounts_;

    // Constructor
    constructor() public {}

    modifier _onlyAdminOrHigher() {
        require(checkDelegate(msg.sender, 2));
        _;
    }

    function _add(string _num) private {
        nums_[sum_] = _num;
        ids_[_num] = sum_;

        sum_ ++;

        exists_[_num] = true;
    }

    /** [desc] Update parcel base info.
      * [param] _num: num of parcel.
      * [param] _parcel: base info of parcel.
      * [return] none.
      */
    function update(string _num, bytes32 _parcel) external _onlyAdminOrHigher {
        // check param
        require(0 != bytes(_num).length);
        require(bytes32(0) != _parcel);

        if (!exists_[_num]) {
            // add num
            _add(_num);
        }

        // update parcel
        parcels_[_num] = _parcel;
    }

    /** [desc] Add parcels' amounts by city and time id.
      * [param] _citys: city array.
      * [param] _timeIds: time Id array.
      * [param] _amounts: parcels' amount array.
      * [return] none.
      */
    function addParcelAmount(bytes32[] _citys, uint[] _timeIds, uint[] _amounts) external _onlyAdminOrHigher {
        uint length = _citys.length;

        // check param
        require((0 != length) && (length == _timeIds.length) && (length == _amounts.length));

        for (uint i=0; i<length; i++)  {
            citySumParcelAmounts_[_citys[i]] += _amounts[i];
            cityTimeParcelAmounts_[_timeIds[i]][_citys[i]] += _amounts[i];
        }
    }

    /** [desc] Get number of parcels.
      * [return] number of parcels.
      */
    function number() external view returns (uint) {
        return sum_;
    }

    /** [desc] Get parcels' base info array.
      * [param] _index: start index of parcels.
      * [param] _count: count of parcels.
      * [return] base info array of parcels.
      */
    function get(uint _index, uint _count) external view returns (bytes32[]) {
        uint i = 0;
        uint count = 0;
        bytes32[] memory parcels;
        string memory num = "";

        // check param
        require(sum_ > _index);
        require(0 < _count);

        if (sum_ < _index + _count) {
            count = sum_ - _index;
        } else {
            count = _count;
        }

        parcels = new bytes32[](count);

        for (i=0; i<count; i++) {
            num = nums_[i+_index];
            parcels[i] = parcels_[num];
        }

        return parcels;
    }

    /** [desc] Get parcels' amounts by city and time id.
      * [param] _citys: city array.
      * [param] _timeIds: time Id array.
      * [return] parcels' amount array.
      */
    function getParcelAmount(bytes32[] _citys, uint[] _timeIds) external view returns (uint[]) {
        uint i = 0;
        uint length = _citys.length;
        uint[] memory amounts;

        require(0 != length);
        amounts = new uint[](length);

        if (0 == _timeIds.length) {
            for(i=0; i<length; i++) {
                amounts[i] = citySumParcelAmounts_[_citys[i]];
            }
        } else {
            require(length == _timeIds.length);

            for(i=0; i<length; i++) {
                amounts[i] = cityTimeParcelAmounts_[_timeIds[i]][_citys[i]];
            }
        }

        return amounts;
    }
}
