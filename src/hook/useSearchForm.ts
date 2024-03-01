import { AppContext } from "@/provider/app-provider";
import { formType } from "@/type/search-form";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";

export default function useSearchForm(
  onHandleSubmit: (data: formType) => void,
  setValue: any,
  clearErrors: any,
  countryFieldValue: string
) {
  const { initBooking, setPlace, booking } = useContext(AppContext);

  useEffect(() => {
    if (countryFieldValue) {
      setPlace(countryFieldValue);
    }
    if (countryFieldValue === "") {
      setPlace("");
    }
  }, [countryFieldValue, setPlace]);

  const onSubmit = (data: formType) => {
    onHandleSubmit(data);
    initBooking({
      checkinDate: dayjs(data.dates.startDate).toDate(),
      checkoutDate: dayjs(data.dates.endDate).toDate(),
    });
  };

  const onHandleChange = async (value: {
    startDate: string;
    endDate: string;
  }) => {
    if (value) {
      setValue("dates", value);
      clearErrors("dates");
      return initBooking({
        ...booking,
        checkinDate: dayjs(value.startDate).toDate(),
        checkoutDate: dayjs(value.endDate).toDate(),
      });
    }
  };

  return {
    onSubmit,
    onHandleChange,
  };
}
