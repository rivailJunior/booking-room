export interface HotelRoomEntity {
  id: number;
  hotelId: number;
  description: string;
  pictures: string;
  dayPrice: number;
  hotel?: {
    id: number;
    name: string;
  };
}
