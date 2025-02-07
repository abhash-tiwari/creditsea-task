import React from 'react';
import { User, Phone, CreditCard, AlertCircle } from 'lucide-react';
import styles from './BasicDetails.module.css';

const BasicDetails = ({ details }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>Basic Details</h2>
    <div className={styles.grid}>
      <div className={styles.item}>
        <User className={styles.icon} />
        <div>
          <p className={styles.label}>Name</p>
          <p className={styles.value}>{details.name}</p>
        </div>
      </div>
      <div className={styles.item}>
        <Phone className={styles.icon} />
        <div>
          <p className={styles.label}>Mobile</p>
          <p className={styles.value}>{details.mobilePhone}</p>
        </div>
      </div>
      <div className={styles.item}>
        <CreditCard className={styles.icon} />
        <div>
          <p className={styles.label}>PAN</p>
          <p className={styles.value}>{details.pan}</p>
        </div>
      </div>
      <div className={styles.item}>
        <AlertCircle className={styles.icon} />
        <div>
          <p className={styles.label}>Credit Score</p>
          <p className={styles.value}>{details.creditScore || 'N/A'}</p>
        </div>
      </div>
    </div>
  </div>
);

export default BasicDetails;