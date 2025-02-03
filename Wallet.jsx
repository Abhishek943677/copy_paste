import React, { useState, useEffect } from 'react';

const Wallet = () => {
  // Initialize state from localStorage if available, or set to 0
  const [wallet, setWallet] = useState(() => {
    const savedWallet = localStorage.getItem('wallet');
    return savedWallet ? parseFloat(savedWallet) : 0;
  });

  const [bank, setBank] = useState(() => {
    const savedBank = localStorage.getItem('bank');
    return savedBank ? parseFloat(savedBank) : 0;
  });

  const [total, setTotal] = useState(() => {
    const savedTotal = localStorage.getItem('total');
    return savedTotal ? parseFloat(savedTotal) : 0;
  });

  // Separate edit states for Wallet and Bank
  const [isEditingWallet, setIsEditingWallet] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);

  // Handle wallet input change
  const handleWalletChange = (e) => {
    setWallet(parseFloat(e.target.value) || 0);
  };

  // Handle bank input change
  const handleBankChange = (e) => {
    setBank(parseFloat(e.target.value) || 0);
  };

  // Calculate the total
  const calculateTotal = () => {
    const totalAmount = wallet + bank;
    setTotal(totalAmount);

    // Save values to localStorage
    localStorage.setItem('wallet', wallet);
    localStorage.setItem('bank', bank);
    localStorage.setItem('total', totalAmount);
  };

  // Handle save button click
  const handleSave = () => {
    calculateTotal();
    setIsEditingWallet(false);
    setIsEditingBank(false);
  };

  // Handle edit button click for Wallet
  const handleEditWallet = () => {
    setIsEditingWallet(true);
  };

  // Handle edit button click for Bank
  const handleEditBank = () => {
    setIsEditingBank(true);
  };

  return (
    <div>
      <h1>Wallet Management</h1>

      {/* Wallet Input */}
      <div>
        <label htmlFor="wallet">Wallet: </label>
        <input
          type="number"
          id="wallet"
          value={wallet}
          onChange={handleWalletChange}
          disabled={!isEditingWallet}
        />
        <button onClick={handleEditWallet} disabled={isEditingWallet}>
          Edit
        </button>
        <button onClick={handleSave} disabled={!isEditingWallet && !isEditingBank}>
          Save
        </button>
      </div>

      {/* Bank Input */}
      <div>
        <label htmlFor="bank">Bank: </label>
        <input
          type="number"
          id="bank"
          value={bank}
          onChange={handleBankChange}
          disabled={!isEditingBank}
        />
        <button onClick={handleEditBank} disabled={isEditingBank}>
          Edit
        </button>
        <button onClick={handleSave} disabled={!isEditingWallet && !isEditingBank}>
          Save
        </button>
      </div>

      {/* Display Total */}
      <div>
        <h3>Total: {total}</h3>
      </div>
    </div>
  );
};

export default Wallet;
