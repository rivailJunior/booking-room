"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { BookingDatePicker } from ".";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProps, formSchema, formType } from "@/type/search-form";
import useSearchForm from "@/hook/useSearchForm";

export function Form({ onHandleSubmit, btnDisabled }: FormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });
  const countryFieldValue: string = watch("country");

  const { onSubmit, onHandleChange } = useSearchForm(
    onHandleSubmit,
    setValue,
    clearErrors,
    countryFieldValue
  );

  return (
    <div className="w-full rounded-sm bg-gray-100 p-2 mb-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex ">
        <div className="flex gap-4 items-end flex-col md:flex-row w-full px-4 py-4">
          <InputWrapper
            label="Where are you going?"
            error={errors.country?.message}
          >
            <input
              type="text"
              id="country"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5"
              {...register("country")}
            />
          </InputWrapper>
          <InputWrapper label="When will you go?" error={errors.dates?.message}>
            <BookingDatePicker onHandleChange={onHandleChange} />
          </InputWrapper>
          <div>
            <button
              type="submit"
              disabled={btnDisabled}
              className={
                "py-2.5 rounded-lg px-5 text-white " +
                (btnDisabled ? "bg-blue-200" : "bg-blue-500")
              }
            >
              Continue
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
  error,
}: {
  label: string;
  error: any;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        {children}
        {error && (
          <>
            <p
              id="filled_error_help"
              className="mt-2 text-xs text-red-600 dark:text-red-400"
            >
              <span className="font-medium">{error}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
