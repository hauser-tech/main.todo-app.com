import React from "react";

const DateInput = (props: any) => {
  const { errors, label, placeholder, field, required, minDate, maxDate } =
    props;

  return (
    <div className="w-full mb-6">
      <label className="custom-label" htmlFor={label}>
        {label}
        {required && <sup className="text-pureRed">*</sup>}
      </label>
      <div className="flex items-center">
        <input
          className={`custom-input ${
            errors ? "border-pureRed" : "border-gray-300"
          }`}
          placeholder={placeholder}
          type="date"
          name={label}
          id={label}
          min={minDate ? minDate : null}
          max={maxDate ? maxDate : null}
          {...field}
        />
      </div>
      {errors && <p className="text-pureRed">{errors?.message}</p>}
    </div>
  );
};

export default DateInput;
