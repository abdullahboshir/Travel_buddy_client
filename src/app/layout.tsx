import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" data-theme="light">
        <body className={raleway.className}>
          <div>
            <div className="relative">
              <div className="absolute left-0 top-0 w-full z-20">
                <Navbar />
              </div>

              <div>{children}</div>

            </div>
            
            <div>
                <Footer />
              </div>
          </div>


        </body>
      </html>
    </SessionWrapper>
  );
}
