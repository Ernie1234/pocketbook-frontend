import React, { forwardRef } from "react";

interface CustomNumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (value: number) => void; // Custom change handler
  value: number; // Value should be a number
}

const CustomNumberInput = forwardRef<HTMLInputElement, CustomNumberInputProps>(
  ({ onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      // Call onChange with the parsed number
      if (!isNaN(newValue)) {
        onChange(newValue); // Call onChange with the valid number
      } else {
        onChange(0); // Fallback to 0 if the value is NaN
      }
    };

    return (
      <input
        ref={ref}
        type="number"
        value={value}
        onChange={handleChange}
        style={{
          appearance: "none", // Remove default arrows
          MozAppearance: "textfield", // Remove default arrows in Firefox
        }}
        {...props}
      />
    );
  }
);

// Display name for debugging
CustomNumberInput.displayName = "CustomNumberInput";

export default CustomNumberInput;
