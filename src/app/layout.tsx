import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ThemeProvider, ThemeButton, Navbar } from "@/components";
import { getLoginCookie } from "../service/login";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Hostfully",
  description: "Make your reservation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getLoginCookie();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeButton />
          <Navbar user={user} />
          <main className="flex min-h-screen container flex-col mt-10 mb-20 text-black">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
