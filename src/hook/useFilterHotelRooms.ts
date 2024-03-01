import { HotelRoomEntity } from "@/domain/entity/HotelRoom.entity";
import { HotelRoomService } from "@/domain/service/hotel-rooms.ds";
import { AppContext } from "@/provider/app-provider";
import React, { useCallback, useContext } from "react";

export default function useFilterHotelRooms(hotelRooms: HotelRoomEntity[]) {
  const { place, booking } = useContext(AppContext);
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
  return {
    filterHotelRooms: filterHotelRooms,
  };
}
