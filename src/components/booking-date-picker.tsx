"use client";
import React, { useState } from "react";
import Datepicker, {
  DateRangeType,
  DateType,
  DateValueType,
} from "react-tailwindcss-datepicker";

type BookingDatePickerProps = {
  readonly onHandleChange: (value: any) => void;
  startDate?: DateType;
  endDate?: DateType;
  disabledDates?: DateRangeType[];
};

const BookingDatePicker = ({
  onHandleChange,
  startDate = "",
  endDate = "",
  disabledDates,
}: BookingDatePickerProps) => {
  const [value, setValue] = useState<DateValueType>({
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
