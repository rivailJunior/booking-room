"use client";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BookingDatePicker } from ".";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppContext } from "@/provider/app-provider";

const formSchema = z.object({
  country: z.string().min(1, { message: "You should select one place!" }),
  dates: z.object({
    startDate: z.string().min(1, { message: "You should select one date!" }),
    endDate: z.string().min(1, { message: "You should select one date!" }),
  }),
});

type formType = z.infer<typeof formSchema>;

type FormProps = {
  onHandleSubmit: (value: formType) => void;
};

/**
 * TODO:
 * [x] - add the logic to start the booking -
 * * maybe add a context api to retrieve the data and pass it for the other page (booking page checkout)
 * [] - add the logic to validate submit just when the user select place, dates and choose one option card
 * * the button should be disable and after all the validations the button should be enabled
 * add red color for the errors
 */
export function Form({ onHandleSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });
  const countryFieldValue: string = watch("country");

  const { initBooking, setPlace } = useContext(AppContext);

  const onSubmit = (data: any) => {
    onHandleSubmit(data);
    initBooking({
      checkinDate: data.dates.startDate,
      checkoutDate: data.dates.endDate,
    });
  };

  const onHandleChange = (value: any) => {
    setValue("dates", value);
  };

  useEffect(() => {
    if (countryFieldValue) {
      setPlace(countryFieldValue);
    }
  }, [countryFieldValue, setPlace]);

  return (
    <div className="w-full rounded-sm bg-gray-100 p-2 mb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center py-2"
      >
        <div className="flex gap-4 items-end flex-col md:flex-row">
          <InputWrapper label="Where are you going?">
            <input
              type="text"
              id="country"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5"
              {...register("country")}
            />
          </InputWrapper>
          <InputWrapper label="When will you go?">
            <BookingDatePicker onHandleChange={onHandleChange} />
          </InputWrapper>
          <div>
            <button
              type="submit"
              className="bg-blue-500 py-2.5 rounded-lg px-5 text-white"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function InputWrapper({
  children,
  label,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
