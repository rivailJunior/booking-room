"use client";

import { Form, GridCards } from "@/components";
import { HotelRoomEntity } from "@/domain/entity/HotelRoom.entity";
import { HotelRoomService } from "@/domain/service/hotel-rooms.ds";
import AppProvider, { AppContext } from "@/provider/app-provider";
import { useCallback, useContext } from "react";

type HomePageContentProps = {
  hotelRooms: HotelRoomEntity[];
};
function Content({ hotelRooms }: HomePageContentProps) {
  const { place } = useContext(AppContext);

  const filterHotelRooms = useCallback(() => {
    if (place.length > 3) {
      const filteredRooms = HotelRoomService.filterByPlace(hotelRooms, place);
      return filteredRooms;
    }
    return hotelRooms;
  }, [place]);

  return (
    <>
      <Form onHandleSubmit={(data) => console.log({ data })} />
      <GridCards cards={filterHotelRooms()} />
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
