import { HotelRoomEntity } from "../entity/HotelRoom.entity";

export class HotelRoomService {
  static filterByPlace(hotelRooms: HotelRoomEntity[], place: string) {
    const filteredRooms = hotelRooms.filter((room) => {
      return room?.hotel?.name.toUpperCase().includes(place.toUpperCase());
    });
    return filteredRooms;
  }
}
