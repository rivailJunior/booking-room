"use client";
import Link from "next/link";

import { Navbar } from "flowbite-react";
import React from "react";

export function Nav() {
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
        <Link href="/bookings">My Bookings</Link>
        <Link href="/login">Login</Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
