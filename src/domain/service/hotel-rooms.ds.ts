import dayjs from "dayjs";
import { HotelRoomEntity } from "../entity/HotelRoom.entity";
import { DateTime } from "./dateTime.ds";

export class HotelRoomService {
  static filterByPlace(hotelRooms: HotelRoomEntity[], place: string) {
    const filteredRooms = hotelRooms.filter((room) => {
      return room?.hotel?.name.toUpperCase().includes(place.toUpperCase());
    });
    return filteredRooms;
  }

  static filterByDates(
    startDate: Date,
    endDate: Date,
    hotelRooms: HotelRoomEntity[]
  ) {
    const filterRooms = hotelRooms.filter((room) => {
      return room?.bookings?.every((booking) => {
        return (
          !DateTime.isBetween(
            dayjs(booking?.checkinDate).toDate(),
            dayjs(booking?.checkoutDate).toDate(),
            startDate
          ) &&
          !DateTime.isBetween(
            dayjs(booking?.checkinDate).toDate(),
            dayjs(booking?.checkoutDate).toDate(),
            endDate
          )
        );
      });
    });
    return filterRooms;
  }
}
