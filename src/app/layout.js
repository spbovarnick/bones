import { Rubik, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const rubik = Rubik({ subsets: ["latin"] });

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], variable: "--font-code" });

export const metadata = {
  title: "Next/Sanity Template",
  description: "A template for building a website with Next.js and Sanity.io",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sourceCodePro.variable}>
      <body className={rubik.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
