"use client";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

type BookingDatePickerProps = {
  onHandleChange: (value: any) => void;
  startDate?: Date;
  endDate?: Date;
};

const BookingDatePicker = ({
  onHandleChange,
  startDate,
  endDate,
}: BookingDatePickerProps) => {
  console.log({ startDate, endDate });
  const [value, setValue] = useState({
    startDate,
    endDate,
  });

  const handleValueChange = (newValue: any) => {
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
