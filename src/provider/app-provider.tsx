import React from "react";
import { useBooking, IUseBooking } from "@/hook/useBooking";

export const AppContext = React.createContext<IUseBooking>({
  initBooking: () => {},
  booking: undefined,
  place: "",
  setPlace: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContext.Provider value={useBooking()}>{children}</AppContext.Provider>
  );
}
