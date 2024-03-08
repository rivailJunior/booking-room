"use client";
import React, { useState } from "react";
import Datepicker, { DateRangeType } from "react-tailwindcss-datepicker";

type BookingDatePickerProps = {
  readonly onHandleChange: (value: any) => void;
  startDate?: Date;
  endDate?: Date;
  disabledDates?: DateRangeType[];
};

const BookingDatePicker = ({
  onHandleChange,
  startDate,
  endDate,
  disabledDates,
}: BookingDatePickerProps) => {
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
      // containerClassName="border-gray-300 "
      placeholder="Select the dates"
      startFrom={new Date()}
      disabledDates={
        disabledDates || [
          {
            startDate: "2000-01-01",
            endDate: new Date(),
          },
        ]
      }
      value={value}
      onChange={handleValueChange}
      inputName="bookingDates"
    />
  );
};
export { BookingDatePicker };
