const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with:", deployer.address);

  // Deploy vulnerable contract
  const Vulnerable = await ethers.getContractFactory("ReentrancyVulnerable");
  const vulnerable = await Vulnerable.deploy();
  await vulnerable.waitForDeployment();

  const vulnerableAddress = await vulnerable.getAddress();
  console.log("Vulnerable deployed to:", vulnerableAddress);

  // FUND IT PROPERLY
  await deployer.sendTransaction({
    to: vulnerableAddress,
    value: ethers.parseEther("5"),
  });

  console.log("Funded vulnerable contract with 5 ETH");

  // Deploy attacker
  const Attacker = await ethers.getContractFactory("Attacker");
  const attacker = await Attacker.deploy(vulnerableAddress);
  await attacker.waitForDeployment();

  const attackerAddress = await attacker.getAddress();
  console.log("Attacker deployed to:", attackerAddress);
}

// ✅ THIS WAS MISSING
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});