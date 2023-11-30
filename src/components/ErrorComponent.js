import React from "react";

const ErrorComponent = ({ errorMessage }) => {
  return (
    <div className="error-container">
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

export default ErrorComponent;
