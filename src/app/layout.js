import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next/Sanity Template",
  description: "A template for building a website with Next.js and Sanity.io",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
