import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CounterDisplay from './CounterDisplay';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import SetCountForm from './SetCountForm';
import contractABI from './contractABI.json';

const contractAddress = '0xYourContractAddressHere'; // Replace with your deployed address

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [count, setCount] = useState(0);

  // Connect to wallet and set up contract
  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          // Request account access via MetaMask
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(contract);
          const accounts = await provider.listAccounts();
          setAccount(accounts[0]);
          // Fetch initial count
          const currentCount = await contract.count();
          setCount(currentCount.toNumber());
        } catch (error) {
          console.error('Failed to connect wallet:', error);
        }
      } else {
        alert('Please install MetaMask!');
      }
    };
    connectWallet();
  }, []);

  // Function to update count after transactions
  const updateCount = async () => {
    if (contract) {
      const currentCount = await contract.count();
      setCount(currentCount.toNumber());
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
        <p className="text-red-500">Please connect your wallet.</p>
      )}
    </div>
  );
}

export default App;