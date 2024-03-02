import { DateTime } from "@/domain/service/dateTime.ds";
import { AppContext } from "@/provider/app-provider";
import { formType } from "@/type/search-form";
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
      checkinDate: DateTime.formatDate(data.dates.startDate),
      checkoutDate: DateTime.formatDate(data.dates.endDate),
    });
  };

  const onHandleChange = async (value: {
    startDate: string;
    endDate: string;
  }) => {
    if (value) {
      setValue("dates", value);
      clearErrors("dates");
      const checkin = DateTime.formatDate(value.startDate);
      const checkout = DateTime.formatDate(value.endDate);
      return initBooking({
        ...booking,
        checkinDate: checkin,
        checkoutDate: checkout,
      });
    }
  };

  return {
    onSubmit,
    onHandleChange,
  };
}
