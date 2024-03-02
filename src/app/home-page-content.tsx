"use client";

import { Form, GridCards } from "@/components";
import { HotelRoomEntity } from "@/domain/entity/HotelRoom.entity";
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
  const onHandleSubmitForm = (_: formType) => {
    if (!booking?.roomId) return; //TODO: call an error here (modal)
    console.log({ booking });
    router.push("/booking-checkout");
  };

  return (
    <>
      {totalPrice ? (
        <div className="font-bold bg-slate-200 px-10 py-3 flex justify-end text-blue-500">
          <span className="text-black mr-2">Total:</span> {totalPrice}
        </div>
      ) : null}
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
