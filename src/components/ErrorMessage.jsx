import React from 'react';


const ErrorMessage = ({ message }) => {
  return (
    <div className="errorContainer">
      <span className="errorIcon">❌</span>
      <p className="errorMessage">{message}</p>
    </div>
  );
}

export default ErrorMessage;
