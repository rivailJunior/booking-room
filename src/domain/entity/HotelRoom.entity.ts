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
  bookings?: [
    {
      id: number;
      createdAt: Date;
      updatedAt: Date | null;
      hasCheckingStarted: boolean;
      hasCheckoutComplete: boolean;
      hotelId: number;
      userId: number;
      roomId: number;
      guests: string;
      checkinDate: Date;
      checkoutDate: Date;
    }
  ];
}
