import React from "react";
import Classes from "./Input.module.scss";

const Input = ({ label, name, value, onChange, onBlur, error, type }) => {
  return (
    <div className={Classes.wrapper}>
      <label className={Classes.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={Classes.input}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
      />
      {error && <p className={Classes.error}>{error}</p>}
    </div>
  );
};

export default Input;
