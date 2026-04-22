// SPDX-License-Identifier: MIT
pragma solidity 0.7.6; // ✅ IMPORTANT (must be <0.8)

contract OverflowVulnerable {
    uint8 public balance;

    function deposit(uint8 amount) public {
        balance += amount; // overflow happens here
    }
}