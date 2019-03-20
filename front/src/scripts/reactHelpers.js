import React from 'react';
import { formatThousands } from './formatData';
const getPercent = (float, dec = 2, symbol = '') => {
  return float || float === 0 ? (
    <span>
      {symbol}
      {float.toFixed(dec).replace('.', ',')}&#37;
    </span>
  ) : (
    <span>&#8208;</span>
  );
};
const getInt = int => {
  return int || int === 0 ? (
    formatThousands(Math.ceil(int))
  ) : (
    <span>&#8208;</span>
  );
};

export { getPercent, getInt };
