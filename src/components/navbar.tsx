"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Modal, Navbar } from "flowbite-react";
import { LoginForm } from ".";

export function Nav({ user }: { user?: any }) {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (user && openModal) {
      setOpenModal(false);
    }
  }, [user, openModal]);

  return (
    <Navbar
      id="navbar"
      fluid={true}
      rounded={true}
      className="bg-blue-500 dark:bg-gray-800 text-white "
    >
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="md"
        className="bg-gray-100"
      >
        <Modal.Body>
          <LoginForm onHandleCancel={() => setOpenModal(false)} />
        </Modal.Body>
      </Modal>
      <Link href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ">
          Home
        </span>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {user?.name && <Link href="/bookings">My Bookings</Link>}
        {!user ? (
          <button onClick={() => setOpenModal(true)}>Login</button>
        ) : (
          <span className="text-white dark:text-blue-400 mr-5">
            {user.name}
          </span>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
