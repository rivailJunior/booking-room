"use client";
import { HotelRoomEntity } from "@/domain/entity/HotelRoom.entity";
import Image from "next/image";
import { useState } from "react";

function imageHelper(src: string) {
  return `/rooms/${src}`;
}

type GridCardsProps = {
  cards: HotelRoomEntity[] | undefined;
  handleCardClick: (card: HotelRoomEntity) => void;
};

export function GridCards({ cards, handleCardClick }: GridCardsProps) {
  const [cardId, setCardId] = useState(0);
  return (
    <div className="grid md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cards?.map((card, index) => (
        <div
          key={index}
          className={
            "p-4 bg-gray-100 rounded-lg shadow-sm" +
            (cardId === card.id
              ? " border-2 border-blue-500 dark:border-cyan-500"
              : "")
          }
          onClick={() => {
            setCardId(card.id);
            handleCardClick(card);
          }}
        >
          <Image
            width={400}
            height={200}
            src={imageHelper(card?.pictures)}
            alt={card.description}
            className="rounded-lg w-full object-cover h-48 md:h-64 lg:h-96"
          />
          <div className="pt-2">
            <h3 className="text-md font-semibold text-gray-800">
              {card.description}
            </h3>
            <p className="mt-2 text-gray-600">$ {card.dayPrice}</p>
            <p className="mt-2 text-gray-600">{card.hotel?.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
