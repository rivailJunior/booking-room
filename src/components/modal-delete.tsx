"use client";
import { Modal } from "flowbite-react";
import React from "react";

type ModalDeleteProps = {
  item: any;
  handleConfirm: (item: any) => void;
  handleCancel: () => void;
};

export function ModalDelete({
  item,
  handleConfirm,
  handleCancel,
}: ModalDeleteProps) {
  return (
    <Modal size="xl" show={!!item?.id}>
      <Modal.Header onClick={handleCancel}>
        Cancel Booking - {item?.id}
      </Modal.Header>
      <Modal.Body className="gap-6 flex flex-col dark:text-white text-gray-500">
        <p>Please be aware of our hotel cancellation policy.</p>
        <p>
          Cancellations made within 72 hours of the check-in date may not be
          eligible for a full refund.
        </p>
        <p>
          Cancellations made well in advance of the check-in date may be
          eligible for a full or partial refund, depending on the specific terms
          of your booking.
        </p>
        <p>
          We recommend reviewing the terms of your booking for specific details.
          If you have any questions or need further assistance, please contact
          our reservation department, and we will be happy to assist you. Thank
          you for choosing our hotel, and we look forward to providing you with
          exceptional service.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-2 justify-end w-full">
          <button
            className="px-8 py-3 text-white rounded shadow  bg-red-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <form action={handleConfirm}>
            <input type="hidden" name="id" value={item?.id} />
            <button className="px-8 py-3 text-white rounded shadow  bg-blue-500">
              Confirm
            </button>
          </form>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
