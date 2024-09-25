import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// calculateProfitLoss.js - Utility function to calculate profit or loss for a trade

const calculateProfitOrLoss = (entryPrice: number, exitPrice: number, tradeAmount: number, direction: 'CALL' | 'PUT') => {
  const priceDifference = exitPrice - entryPrice;

  const isProfitable = direction === 'CALL' ? priceDifference > 0 : priceDifference < 0;

  return isProfitable ? tradeAmount * Math.abs(priceDifference) : -tradeAmount;
};

export default calculateProfitOrLoss;
