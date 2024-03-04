import { HotelRoomEntity } from "@/domain/entity/HotelRoom.entity";
import { BookingService } from "@/domain/service/booking.ds";
import { DateTime } from "@/domain/service/dateTime.ds";
import { HotelRoomService } from "@/domain/service/hotel-rooms.ds";
import { AppContext } from "@/provider/app-provider";
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
    if (!card?.id) return 0;
    const isValidCheckin =
      booking?.checkinDate && DateTime.isValid(booking?.checkinDate as Date);
    const isValidCheckout =
      booking?.checkinDate && DateTime.isValid(booking?.checkoutDate as Date);

    if (card && !isValidCheckin && !isValidCheckout) {
      return BookingService.priceFormatter().format(card?.dayPrice);
    }

    if (isValidCheckin && isValidCheckout) {
      return BookingService.calculate(
        DateTime.formatDate(booking?.checkinDate as Date),
        DateTime.formatDate(booking?.checkoutDate as Date),
        card?.dayPrice
      );
    }
    return 0;
  }, [booking, card]);

  const isBtnDisabled = () => {
    return (
      !place ||
      !booking?.roomId ||
      !DateTime.isValid(booking?.checkinDate as Date) ||
      !DateTime.isValid(booking?.checkoutDate as Date) ||
      !booking?.checkinDate ||
      !booking?.checkoutDate
    );
  };

  return {
    filterHotelRooms,
    handleCardClick,
    booking,
    totalPrice,
    card,
    isBtnDisabled: isBtnDisabled(),
  };
}
