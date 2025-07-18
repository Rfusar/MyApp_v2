import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/mylib/sidebar/init";
import Navbar from "@/mylib/navbar/init";
import Login from "@/mylib/login/init";
import { ModalProvider } from "@/context/popup";

export const metadata: Metadata = {
  title: "My Business APP",
  description: "",
};

// Definizione del font
const geist = Geist({ subsets: ["latin"], weight: "400" });
const online = true

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-gray-600 max-h-screen max-w-screen overflow-hidden text-black ${geist.className}`}>
        {online ? (
            <div className="flex flex-row h-screen w-screen bg-white">
                <Sidebar />
                <div className="h-screen w-full">
                    <Navbar />
                    <ModalProvider>
                        {children}
                    </ModalProvider>
                </div>
            </div>
        ) : (
            <Login/>
        )}
      </body>
    </html>
  );
}
