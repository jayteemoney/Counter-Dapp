import React, { useState } from "react";
import { ethers } from "ethers";
import CounterDisplay from "./Components/CounterDisplay";
import IncrementButton from "./Components/IncrementButton";
import DecrementButton from "./Components/DecrementButton";
import SetCountForm from "./Components/SetCountForm";
import contractABI from "./Components/contractAbi.json";

const contractAddress = "0xDe25a0a4f3205a4BE91F41F1e998DAfCe3ac2572";

function App() {
  const [Provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [count, setCount] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  // Connect to wallet
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      setIsConnecting(true);
      try {
        // Request account access via MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider for ethers v6
        setProvider(provider);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(contract);
        const address = await signer.getAddress();
        setAccount(address);
        // Fetch initial count
        const currentCount = await contract.count();
        setCount(Number(currentCount)); // Use Number() for BigNumber in ethers v6
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet: " + error.message);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("Please install MetaMask!");
      setIsConnecting(false);
    }
  };

  // Function to update count after transactions
  const updateCount = async () => {
    if (contract) {
      const currentCount = await contract.count();
      setCount(Number(currentCount)); // Use Number() for BigNumber
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Counter DApp</h1>
      {account ? (
        <>
          <p className="mb-2 text-sm">Connected account: {account}</p>
          <CounterDisplay count={count} />
          <div className="mt-4 space-x-2">
            <IncrementButton contract={contract} updateCount={updateCount} />
            <DecrementButton contract={contract} updateCount={updateCount} />
          </div>
          <SetCountForm contract={contract} updateCount={updateCount} />
        </>
      ) : (
        <div className="text-center">
          <p className="text-red-500 mb-4">Please connect your wallet.</p>
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className={`px-4 py-2 text-white rounded ${
              isConnecting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;