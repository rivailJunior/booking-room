"use client";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

type BookingDatePickerProps = {
  onHandleChange: (value: any) => void;
};

const BookingDatePicker = ({ onHandleChange }: BookingDatePickerProps) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    onHandleChange(newValue);
    setValue(newValue);
  };

  return (
    <Datepicker
      placeholder="Select the dates"
      startFrom={new Date()}
      disabledDates={[
        {
          startDate: "2000-01-01",
          endDate: new Date(),
        },
      ]}
      value={value}
      onChange={handleValueChange}
    />
  );
};
export { BookingDatePicker };
