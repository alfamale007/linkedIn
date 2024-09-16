import React, { useState, useEffect } from 'react';
import { getAccounts, createAccount, deleteAccount } from '../services/accountService';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [accountData, setAccountData] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const accountsData = await getAccounts();
    setAccounts(accountsData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAccount(accountData);
    fetchAccounts();
    setAccountData({ username: '', email: '', password: '' }); // Clear form
  };

  const handleDelete = async (id) => {
    await deleteAccount(id);
    fetchAccounts();
  };

  return (
    <div className="container">
      <h2>Accounts</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={accountData.username} onChange={handleInputChange} required />
        <input name="email" placeholder="Email" value={accountData.email} onChange={handleInputChange} required />
        <input name="password" placeholder="Password" type="password" value={accountData.password} onChange={handleInputChange} required />
        <button type="submit">Add Account</button>
      </form>

      <ul>
        {accounts.map((account) => (
          <li key={account._id}>
            {account.username} - {account.email}
            <button onClick={() => handleDelete(account._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accounts;


// import React from 'react';

// function Account() {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-semibold">Account Page</h1>
//       {/* Add content for account management here */}
//     </div>
//   );
// }

// export default Account;
