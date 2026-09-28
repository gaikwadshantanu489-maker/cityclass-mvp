import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CityClass — The City Is Your Classroom",
  description: "Turn the world around you into an interactive learning experience."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}