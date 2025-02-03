import React, { useState, useEffect } from 'react';

const TransactionManagement = () => {
  // State to hold profiles, transaction details, and ledger
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [transactionType, setTransactionType] = useState('debit');
  const [source, setSource] = useState('wallet');
  const [amount, setAmount] = useState('');
  const [ledger, setLedger] = useState([]);

  // Fetch profiles and ledger from localStorage
  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem('profiles')) || [];
    const savedLedger = JSON.parse(localStorage.getItem('ledger')) || [];
    setProfiles(savedProfiles);
    setLedger(savedLedger);
  }, []);

  // Handle transaction submission
  const handleTransaction = () => {
    // Ensure all fields are filled
    if (!selectedProfile || !amount || isNaN(amount) || amount <= 0) {
      alert('Please fill in all fields correctly.');
      return;
    }

let profileToUpdate;
profiles.forEach(profile => {
  if (profile.id === selectedProfile) {
    profileToUpdate = profile;
  }
});


    if (!profileToUpdate) {
      alert('Profile not found.');
      return;
    }

    const amountValue = parseFloat(amount);

    // Handle debit and credit transactions
    let updatedProfile = { ...profileToUpdate };


    if (transactionType === 'debit') {
      // Deduct from wallet or bank
      if (source === 'wallet') {
        if (updatedProfile.wallet >= amountValue) {
          updatedProfile.wallet -= amountValue;
        } else {
          alert('Insufficient wallet balance.');
          return;
        }
      } else if (source === 'bank') {
        if (updatedProfile.bank >= amountValue) {
          updatedProfile.bank -= amountValue;
        } else {
          alert('Insufficient bank balance.');
          return;
        }
      }
    } else if (transactionType === 'credit') {
      // Add to wallet or bank
      if (source === 'wallet') {
        updatedProfile.wallet += amountValue;
      } else if (source === 'bank') {
        updatedProfile.bank += amountValue;
      }
    }

    // Update the profiles array with the modified profile
    const updatedProfiles = profiles.map(profile =>
      profile.id === selectedProfile ? updatedProfile : profile
    );

    // Update profiles in localStorage
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);

    // Log the transaction in the ledger
    const transactionLog = {
      profileId: selectedProfile,
      transactionType,
      source,
      amount: amountValue,
      timestamp: new Date().toLocaleString(),
    };

    const updatedLedger = [...ledger, transactionLog];
    localStorage.setItem('ledger', JSON.stringify(updatedLedger));
    setLedger(updatedLedger);

    // Reset the form after the transaction
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setSelectedProfile('');
    setTransactionType('debit');
    setSource('wallet');
    setAmount('');
  };

  return (
    <div>
      <h1>Transaction Management</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleTransaction(); }}>
        {/* Select Person Profile */}
        <div>
          <label htmlFor="profile">Select Profile:</label>
          <select
            id="profile"
            value={selectedProfile}
            onChange={(e) => setSelectedProfile(e.target.value)}
            required
          >
            <option value="">Select Profile</option>
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name} - {profile.vendor}
              </option>
            ))}
          </select>
        </div>

        {/* Transaction Type (Debit or Credit) */}
        <div>
          <label htmlFor="transactionType">Transaction Type:</label>
          <select
            id="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            required
          >
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </div>

        {/* Deduct from Wallet or Bank */}
        <div>
          <label htmlFor="source">Deduct from:</label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          >
            <option value="wallet">Wallet</option>
            <option value="bank">Bank</option>
          </select>
        </div>

        {/* Amount to be Transferred */}
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0.01"
          />
        </div>

        <button type="submit">Send</button>
      </form>

      <h2>Transaction Ledger</h2>
      <table>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Transaction Type</th>
            <th>Source</th>
            <th>Amount</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {ledger.map((transaction, index) => (
            <tr key={index}>
              <td>{profiles.find(profile => profile.id === transaction.profileId)?.name}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.source}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionManagement;
