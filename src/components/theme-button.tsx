"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeButton() {
  const { setTheme, theme } = useTheme();
  return theme === "dark" ? (
    <button
      className="text-gray-600 bg-gray-100 font-medium  rounded-full text-sm px-5 py-2.5 text-center fixed bottom-5 right-5"
      onClick={() => setTheme("light")}
    >
      Light
    </button>
  ) : (
    <button
      className="text-white bg-gray-600 font-medium rounded-full text-sm px-5 py-2.5 text-center fixed bottom-5 right-5"
      onClick={() => setTheme("dark")}
    >
      Dark
    </button>
  );
}
