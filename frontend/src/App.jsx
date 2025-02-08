import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import BasicDetails from './components/BasicDetails/BasicDetails';
import ReportSummary from './components/ReportSummary/ReportSummary';
import CreditAccounts from './components/CreditAccounts/CreditAccounts';
import styles from './App.module.css';

const App = () => {
  const [reportData, setReportData] = useState(() => {
    const savedReport = localStorage.getItem('creditReport');
    return savedReport ? JSON.parse(savedReport) : null;
  });

  useEffect(() => {
    if (reportData) {
      localStorage.setItem('creditReport', JSON.stringify(reportData));
    } else {
      localStorage.removeItem('creditReport');
    }
  }, [reportData]);

  const handleUploadSuccess = (data) => {
    setReportData(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Credit Report Dashboard</h1>
        
        {!reportData && (
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        )}

        {reportData && (
          <div className={styles.report}>
            <BasicDetails details={reportData.basicDetails} />
            <ReportSummary summary={reportData.reportSummary} />
            <CreditAccounts accounts={reportData.creditAccounts} />
            
            <button
              onClick={() => setReportData(null)}
              className={styles.button}
            >
              Upload Another Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;