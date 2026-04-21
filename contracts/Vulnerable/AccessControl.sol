// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AccessControlVulnerable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // anyone can call this
    function mint(address to, uint256 amount) public {
        // imagine mint logic here
    }

    // anyone can steal ownership
    function changeOwner(address newOwner) public {
        owner = newOwner;
    }
}