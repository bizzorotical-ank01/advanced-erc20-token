const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Access Control Attack", function () {
  let deployer, attacker, contract;

  beforeEach(async function () {
    [deployer, attacker] = await ethers.getSigners();

    const Vulnerable = await ethers.getContractFactory("AccessControlVulnerable");
    contract = await Vulnerable.deploy();
    await contract.waitForDeployment();
  });

  // Vulnerable test (already working)
  it("attacker should take ownership", async function () {
    await contract.connect(attacker).changeOwner(attacker.address);
    expect(await contract.owner()).to.equal(attacker.address);
  });

  //  (fixed contract test)
  it("should FAIL when attacker tries to take ownership", async function () {
    const Fixed = await ethers.getContractFactory("AccessControlFixed");
    const fixed = await Fixed.deploy();
    await fixed.waitForDeployment();

    await expect(
      fixed.connect(attacker).changeOwner(attacker.address)
    ).to.be.reverted;
  });

});