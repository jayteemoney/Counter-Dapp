import React from 'react';

function CounterDisplay({ count }) {
  return <p className="text-xl font-semibold mb-4 text-center">Current count: {count}</p>;
}

export default CounterDisplay;