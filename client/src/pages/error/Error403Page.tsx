// Error403Page.js
import React from "react";
import { Link } from "react-router-dom";

const Error403Page = () => {
  return (
    <div className="error-container">
      <div className="error-content text-center">
        <h1 className="error-heading">403 - Forbidden</h1>
        <p className="error-message">
          Oops! You are not authorized to access this page.
        </p>
        <Link to="/" className="error-link">
          Go back to loginPage
        </Link>
      </div>
    </div>
  );
};

export default Error403Page;
