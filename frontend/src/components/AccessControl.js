import { useState } from "react";
import { ethers } from "ethers";

import attackJson from "../abi/AccessControlAttack.json";
import vulnerableJson from "../abi/AccessControlVulnerable.json";

const attackAbi = attackJson.abi;
const vulnerableAbi = vulnerableJson.abi;

// 🔥 IMPORTANT: use YOUR deployed addresses
const ATTACK_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const VULNERABLE_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

function AccessControl() {
  const [status, setStatus] = useState("");

  const handleAttack = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // contracts
      const attackerContract = new ethers.Contract(
        ATTACK_ADDRESS,
        attackAbi,
        signer
      );

      const vulnerableContract = new ethers.Contract(
        VULNERABLE_ADDRESS,
        vulnerableAbi,
        signer
      );

      const user = await signer.getAddress();

      // 🔍 BEFORE
      const ownerBefore = await vulnerableContract.owner();
      console.log("Owner BEFORE:", ownerBefore);

      // 🔥 ATTACK
      const tx = await attackerContract.attack();
      console.log("TX:", tx.hash);

      await tx.wait();

      // 🔍 AFTER
      const ownerAfter = await vulnerableContract.owner();
      console.log("Owner AFTER:", ownerAfter);

      if (ownerAfter.toLowerCase() === user.toLowerCase()) {
        setStatus("✅ Ownership stolen successfully 💀");
      } else {
        setStatus("❌ Attack failed (owner unchanged)");
      }

    } catch (err) {
      console.error(err);

      if (err.reason) {
        setStatus(err.reason);
      } else {
        setStatus("❌ Transaction failed");
      }
    }
  };

  return (
    <div>
      <h2>Access Control Attack</h2>

      <button onClick={handleAttack}>
        Steal Ownership
      </button>

      <p>{status}</p>
    </div>
  );
}

export default AccessControl;