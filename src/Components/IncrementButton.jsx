import React from 'react';

function IncrementButton({ contract, updateCount }) {
  const handleIncrement = async () => {
    try {
      const tx = await contract.increment();
      await tx.wait(); // Wait for transaction confirmation
      if (updateCount) updateCount();
    } catch (error) {
      console.error('Error incrementing:', error);
      alert('Failed to increment. Only the owner can call this function.');
    }
  };

  return (
    <button
      className="px-4 py-2 bg-[#193472] text-white rounded hover:bg-[#242644] font-sans"
      onClick={handleIncrement}
    >
      Increment
    </button>
  );
}

export default IncrementButton;