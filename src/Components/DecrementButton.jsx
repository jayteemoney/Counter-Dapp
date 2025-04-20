import React from 'react';

function DecrementButton({ contract, updateCount }) {
  const handleDecrement = async () => {
    try {
      const tx = await contract.decrement();
      await tx.wait();
      if (updateCount) updateCount();
    } catch (error) {
      console.error('Error decrementing:', error);
      alert('Failed to decrement. Only the owner can call this function.');
    }
  };

  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      onClick={handleDecrement}
    >
      Decrement
    </button>
  );
}

export default DecrementButton;