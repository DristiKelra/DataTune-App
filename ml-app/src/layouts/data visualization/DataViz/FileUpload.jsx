// Example file upload component
import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileUpload(file);
  };

  return (
    <input type="file" onChange={handleFileChange} />
  );
};

export default FileUpload;
