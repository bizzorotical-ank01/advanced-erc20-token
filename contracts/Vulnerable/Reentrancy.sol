// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ReentrancyVulnerable {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

        function withdraw() public {
        uint amount = balances[msg.sender];

        require(amount > 0, "No balance");

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] = 0; // ❌ vulnerable
    }
    receive() external payable {}
}