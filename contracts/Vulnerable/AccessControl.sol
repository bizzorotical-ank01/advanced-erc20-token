// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AccessControlVulnerable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function mint(address to, uint256 amount) public {
    }

    function changeOwner(address newOwner) public {
        owner = newOwner;
    }
}