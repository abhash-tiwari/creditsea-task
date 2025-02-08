import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import styles from './FileUpload.module.css';

const FileUpload = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDragging(false);
    setError('');
    
    const file = e.dataTransfer.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.xml')) {
      setError('Please upload an XML file');
      return;
    }
    
    await uploadFile(file);
  }, []);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await uploadFile(file);
  };

  const uploadFile = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUploadSuccess(data.report);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ''} ${uploading ? styles.uploading : ''}`}
      >
        <input
          type="file"
          accept=".xml"
          onChange={handleFileSelect}
          className={styles.input}
          id="file-upload"
        />
        <label htmlFor="file-upload" className={styles.label}>
          <Upload className={styles.icon} />
          <p className={styles.text}>
            Drag and drop your XML file here or click to browse
          </p>
        </label>
      </div>
      
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      
      {uploading && (
        <div className={styles.uploading}>
          Uploading and processing file...
        </div>
      )}
    </div>
  );
};

export default FileUpload;