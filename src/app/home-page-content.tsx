"use client";
import { Form, GridCards } from "@/components";
import { HotelRoomEntity } from "@/domain/entity/HotelRoom.entity";
import { BookingService } from "@/domain/service/booking.ds";
import useFilterHotelRooms from "@/hook/useFilterHotelRooms";
import AppProvider from "@/provider/app-provider";
import { useRouter } from "next/navigation";

type HomePageContentProps = {
  hotelRooms: HotelRoomEntity[];
};
function Content({ hotelRooms }: HomePageContentProps) {
  const router = useRouter();

  const {
    filterHotelRooms,
    handleCardClick,
    booking,
    totalPrice,
    card,
    isBtnDisabled,
  } = useFilterHotelRooms(hotelRooms);
  const onHandleSubmitForm = async () => {
    if (!booking?.roomId) return; //TODO: call an error here (modal)

    const bookingValues = {
      booking,
      card,
      totalPrice,
    };
    await fetch("http://localhost:3000/api/booking", {
      method: "POST",
      body: JSON.stringify(bookingValues),
    });
    router.push("/booking-checkout");
    router.refresh();
  };
  const filteredRooms = filterHotelRooms();
  return (
    <>
      {totalPrice ? (
        <div className="font-bold bg-slate-200 px-10 py-3 flex justify-end text-blue-500">
          <span className="text-black mr-2">Total:</span>{" "}
          {BookingService.priceFormatter().format(totalPrice)}
        </div>
      ) : null}
      <Form onHandleSubmit={onHandleSubmitForm} btnDisabled={isBtnDisabled} />
      <GridCards cards={filteredRooms} handleCardClick={handleCardClick} />
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
