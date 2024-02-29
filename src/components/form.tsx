"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { BookingDatePicker } from ".";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  country: z.string().min(1, { message: "You should select one place!" }),
  dates: z.object({
    startDate: z.string().min(1, { message: "You should select one date!" }),
    endDate: z.string().min(1, { message: "You should select one date!" }),
  }),
});

type formType = z.infer<typeof formSchema>;

/**
 * TODO:
 * add the logic to start the booking -
 * * maybe add a context api to retrieve the data and pass it for the other page (booking page checkout)
 * add red color for the errors
 */
export function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log("submit data", data, errors);
    //TODO: call the logic to start the booking here
  };

  const onHandleChange = (value: any) => {
    setValue("dates", value);
  };

  return (
    <div className="w-full rounded-sm bg-gray-100 p-2 mb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center py-2"
      >
        <div className="flex gap-4 items-end flex-col md:flex-row">
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Where are you going?
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="country"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5"
                {...register("country")}
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="date"
              className={"block text-sm font-medium text-gray-700"}
            >
              {errors.dates
                ? "You need to select two dates"
                : "When will you go?"}
            </label>
            <div className="mt-1">
              <BookingDatePicker onHandleChange={onHandleChange} />
            </div>
          </div>
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
