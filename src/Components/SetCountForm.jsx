import React, { useState } from 'react';

function SetCountForm({ contract, updateCount }) {
  const [newCount, setNewCount] = useState('');

  const handleSetCount = async () => {
    try {
      const tx = await contract.setCount(newCount);
      await tx.wait();
      if (updateCount) updateCount();
      setNewCount(''); // Clear input
    } catch (error) {
      console.error('Error setting count:', error);
      alert('Failed to set count.');
    }
  };

  return (
    <div className="mt-4 flex space-x-2">
      <input
        type="number"
        value={newCount}
        onChange={(e) => setNewCount(e.target.value)}
        placeholder="Set new count"
        className="px-2 py-1 border rounded"
      />
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleSetCount}
      >
        Set Count
      </button>
    </div>
  );
}

export default SetCountForm;