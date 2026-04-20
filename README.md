# Smart Contract Audit Checklist

A hands-on smart contract security toolkit demonstrating real-world vulnerabilities, exploits, and fixes using Hardhat.

---

##  Project Structure

smart-contract-audit-checklist/
│
├── contracts/
│   ├── Vulnerable/
│   │   ├── Reentrancy.sol
│   │   ├── AccessControl.sol
│   │   └── Overflow.sol
│   │
│   └── Fixed/
│       ├── ReentrancyFixed.sol
│       ├── AccessControlFixed.sol
│       └── OverflowFixed.sol
│
├── test/
│   ├── audit.test.js
│   ├── access.test.js
│   └── overflow.test.js
│
├── checklist/
│   └── audit-checklist.md
│
├── scripts/
│   └── analyze.js
│
└── README.md

---

## Purpose

This repository demonstrates how to:

- Identify critical smart contract vulnerabilities
- Exploit insecure implementations
- Apply secure fixes
- Validate security using automated tests

---

## Covered Vulnerabilities

---

### 1. Reentrancy Attack

#### Issue:

- External call before state update allows attacker to re-enter contract.

#### Impact:

-Funds can be drained.

#### Fix:

- Use Checks-Effects-Interactions pattern
- Use ReentrancyGuard

#### Cases:

1. Vulnerable case (attack works)
   ![Reentrancy Basic Test](assets/screenshots/reentrancy-basic.png)
2. Fixed case (attack fails)
   ![Reentrancy Fixed Test](assets/screenshots/reentrancy-fixed.png)

---

### 2. Access Control Vulnerability

#### Issue:

- Functions lack proper authorization checks.

#### Impact:

- Unauthorized users can take ownership or execute privileged actions.

#### Fix:

- Implement onlyOwner
- Use role-based access control

#### Cases:

1. Vulnerable case (attack works)
![Access Control Basic Test](assets/screenshots/partial-tests.png)
2. Fixed case (attack fails)
![Access Control Fixed Test](assets/screenshots/core-tests.png)
---

### 3. Integer Overflow

#### Issue:

- Unchecked arithmetic leads to overflow.

#### Impact:

- Incorrect balances or broken logic.

#### Fix:

- Use Solidity ≥0.8 (built-in checks)
- Avoid unchecked unless necessary

#### Cases:

1. Vulnerable case (attack works)
![Integer Overflow Basic Test](assets/screenshots/almost-full-tests.png)
2. Fixed case (attack fails)
![Integer Overflow Fixed Test](assets/screenshots/core-tests.png)
---

## Testing Strategy

Each vulnerability includes:

- Exploit test (proves vulnerability exists)
- Fix test (proves vulnerability is mitigated)

Run all tests:

npx hardhat test

---

## Setup

npm install
npx hardhat compile
npx hardhat test

---

## Audit Checklist

### Located in:

checklist/audit-checklist.md

### Includes:

- Access control review
- Reentrancy checks
- Arithmetic safety
- Gas optimization hints
- Storage layout validation

---

## Skills Demonstrated

- Smart contract security analysis
- Writing exploit simulations
- Secure Solidity development
- Hardhat testing framework
- Vulnerability reproduction & mitigation

---

## Acknowledgement

This project was developed by @bizzorotical-ank01 as part of a focused journey into smart contract security and auditing.

It is designed for educational and practical purposes, simulating real-world DeFi vulnerabilities to help developers understand:

- How security flaws occur in smart contracts
- How attackers exploit these vulnerabilities
- How to implement secure and robust fixes

This repository serves as a hands-on learning resource for developers aiming to improve their skills in smart contract security and auditing.

Feel free to explore the code and documentation in this repository.

If you have any questions or suggestions, Let's Connect, Till then GOOD LUCK BUDDY!
