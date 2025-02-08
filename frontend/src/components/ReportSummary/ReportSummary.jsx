import React from 'react';
import styles from './ReportSummary.module.css';

const ReportSummary = ({ summary }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>Report Summary</h2>
    <div className={styles.grid}>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Accounts</p>
        <div className={styles.statsGrid}>
          <div>
            <p className={styles.label}>Total</p>
            <p className={styles.value}>{summary.totalAccounts}</p>
          </div>
          <div>
            <p className={styles.label}>Active</p>
            <p className={styles.value}>{summary.activeAccounts}</p>
          </div>
          <div>
            <p className={styles.label}>Closed</p>
            <p className={styles.value}>{summary.closedAccounts}</p>
          </div>
        </div>
      </div>
      
      <div className={styles.card}>
        <p className={styles.cardTitle}>Balance Overview</p>
        <div>
          <p className={styles.label}>Current Balance</p>
          <p className={styles.value}>₹{summary.currentBalanceAmount.toLocaleString()}</p>
        </div>
      </div>
      
      <div className={styles.card}>
        <p className={styles.cardTitle}>Account Types</p>
        <div className={styles.statsGrid}>
          <div>
            <p className={styles.label}>Secured</p>
            <p className={styles.value}>₹{summary.securedAccountsAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className={styles.label}>Unsecured</p>
            <p className={styles.value}>₹{summary.unsecuredAccountsAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ReportSummary;