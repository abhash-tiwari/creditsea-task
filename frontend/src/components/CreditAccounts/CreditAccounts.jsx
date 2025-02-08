import React from 'react';
import styles from './CreditAccounts.module.css';

const CreditAccounts = ({ accounts }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>Credit Accounts</h2>
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Bank</th>
            <th>Account Number</th>
            <th>Current Balance</th>
            <th>Amount Overdue</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td>{account.bankName}</td>
              <td>{account.accountNumber}</td>
              <td className={styles.amount}>₹{account.currentBalance.toLocaleString()}</td>
              <td className={`${styles.amount} ${account.amountOverdue > 0 ? styles.negative : styles.positive}`}>
                ₹{account.amountOverdue.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CreditAccounts;