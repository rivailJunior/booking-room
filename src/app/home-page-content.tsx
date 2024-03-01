"use client";

import { Form, GridCards } from "@/components";
import { HotelRoomEntity } from "@/domain/entity/HotelRoom.entity";
import { BookingService } from "@/domain/service/booking.ds";
import useFilterHotelRooms from "@/hook/useFilterHotelRooms";
import AppProvider from "@/provider/app-provider";
import { formType } from "@/type/search-form";
import { useRouter } from "next/navigation";

type HomePageContentProps = {
  hotelRooms: HotelRoomEntity[];
};
function Content({ hotelRooms }: HomePageContentProps) {
  const router = useRouter();

  const { filterHotelRooms, handleCardClick, booking, totalPrice } =
    useFilterHotelRooms(hotelRooms);
  const onHandleSubmitForm = (data: formType) => {
    if (!booking?.roomId) return; //TODO: call an error here (modal)
    console.log({ booking });
    router.push("/booking-checkout");
  };

  console.log("total Price", totalPrice);

  return (
    <>
      <Form onHandleSubmit={onHandleSubmitForm} />
      <GridCards cards={filterHotelRooms()} handleCardClick={handleCardClick} />
    </>
  );
}

export function HomePageContent(props: HomePageContentProps) {
  return (
    <AppProvider>
      <Content {...props} />
    </AppProvider>
  );
}
