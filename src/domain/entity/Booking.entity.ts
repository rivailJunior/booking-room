export interface BookingEntity {
  hotelId: number;
  roomId: number;
  userId: number;
  guests: string;
  checkinDate: Date;
  checkoutDate: Date;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  hasCheckingStarted: boolean;
  hasCheckoutComplete: boolean;
}

export type BookingProps = {
  hotelId: number;
  roomId: number;
  userId: number;
  guests: string;
  checkinDate: Date;
  checkoutDate: Date;
};
