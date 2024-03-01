import { HotelRoomEntity } from "@/domain/entity/HotelRoom.entity";
import { BookingService } from "@/domain/service/booking.ds";
import { HotelRoomService } from "@/domain/service/hotel-rooms.ds";
import { AppContext } from "@/provider/app-provider";
import dayjs from "dayjs";
import { useCallback, useContext, useMemo, useState } from "react";

export default function useFilterHotelRooms(hotelRooms: HotelRoomEntity[]) {
  const { place, booking, initBooking } = useContext(AppContext);
  const [card, setCard] = useState<HotelRoomEntity>({} as HotelRoomEntity);

  const handleCardClick = (card: HotelRoomEntity) => {
    initBooking({ ...booking, roomId: card.id });
    setCard(card);
  };

  const filterHotelRooms = useCallback(() => {
    let filteredRooms: HotelRoomEntity[] = hotelRooms;
    if (place.length > 2) {
      filteredRooms = HotelRoomService.filterByPlace(filteredRooms, place);
    }
    if (booking?.checkinDate && booking?.checkoutDate) {
      filteredRooms = HotelRoomService.filterByDates(
        booking.checkinDate,
        booking.checkoutDate,
        filteredRooms
      );
    }
    return filteredRooms;
  }, [hotelRooms, place, booking]);

  const totalPrice = useMemo(() => {
    if (booking?.checkinDate && booking?.checkoutDate) {
      return BookingService.calculate(
        dayjs(booking?.checkinDate).toDate(),
        dayjs(booking?.checkoutDate).toDate(),
        card?.dayPrice
      );
    }
    return 0;
  }, [booking, card]);

  return {
    filterHotelRooms,
    handleCardClick,
    booking,
    totalPrice,
  };
}
