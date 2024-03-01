"use client";

import { Form, GridCards } from "@/components";
import { HotelRoomEntity } from "@/domain/entity/HotelRoom.entity";
import useFilterHotelRooms from "@/hook/useFilterHotelRooms";
import AppProvider from "@/provider/app-provider";
import { formType } from "@/type/search-form";

type HomePageContentProps = {
  hotelRooms: HotelRoomEntity[];
};
function Content({ hotelRooms }: HomePageContentProps) {
  const { filterHotelRooms } = useFilterHotelRooms(hotelRooms);
  const onHandleSubmitForm = (data: formType) => {
    console.log({ data });
  };
  return (
    <>
      <Form onHandleSubmit={onHandleSubmitForm} />
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
