import { ethers } from "ethers";
import ABI from "./ABI.json";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

export const getContract = (address) => {
  const signer = provider.getSigner();
  return new ethers.Contract(address, ABI, signer);
};