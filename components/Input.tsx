import React from "react";

const Input = (props: any) => {
  const {
    value,
    setValue,
    errors,
    label,
    placeholder,
    type,
    icon,
    iconSize,
    showPassword,
    setShowPassword,
    field,
    required,
  } = props;

  return (
    <div className="w-full mb-6">
      <label className="custom-label" htmlFor={label}>
        {label}
        {required && <sup className="text-pureRed">*</sup>}
      </label>
      <div className="flex items-center">
        {field ? (
          <input
            className={`custom-input ${
              errors ? "border-pureRed" : "border-gray-300"
            }`}
            placeholder={placeholder}
            type={type ? (showPassword ? "text" : type) : "text"}
            name={label}
            id={label}
            {...field}
          />
        ) : (
          <input
            className={`custom-input ${
              errors ? "border-pureRed" : "border-gray-300"
            }`}
            placeholder={placeholder}
            type={type ? (showPassword ? "text" : type) : "text"}
            name={label}
            id={label}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        )}

        {icon && (
          <props.icon
            className="cursor-pointer ml-2"
            size={iconSize || 30}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      {errors && <p className="text-pureRed">{errors?.message}</p>}
    </div>
  );
};

export default Input;
