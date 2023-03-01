import React, { useEffect } from "react";

const Alert = ({ type, msg, showAlert }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      showAlert({
        show: false,
        type: "",
        msg: "",
      });
    }, 2500);

    return () => clearTimeout(timeOut);
  });

  return (
    <div>
      <p className={`alert alert-${type}`}>{msg}</p>
    </div>
  );
};

export default Alert;
