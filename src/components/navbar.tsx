"use client";
import React from "react";
import Link from "next/link";
import { Navbar } from "flowbite-react";

export function Nav({ user }: { user?: any }) {
  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="bg-blue-500 dark:bg-gray-800 text-white "
    >
      <Link href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ">
          Home
        </span>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {user?.name && <Link href="/bookings">My Bookings</Link>}
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <span className="text-white dark:text-blue-400 mr-5">
            {user.name}
          </span>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
