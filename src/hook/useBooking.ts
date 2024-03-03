import { BookingEntity } from "@/domain/entity/Booking.entity";
import { useState } from "react";

export interface IUseBooking {
  initBooking: (bookingData: Partial<BookingEntity>) => void;
  booking: Partial<BookingEntity> | undefined;
  place: string;
  setPlace: (place: string) => void;
}

export function useBooking(): IUseBooking {
  const [booking, initBooking] = useState<Partial<BookingEntity>>();
  const [place, setPlace] = useState<string>("");

  return {
    initBooking,
    booking,
    place,
    setPlace,
  };
}
